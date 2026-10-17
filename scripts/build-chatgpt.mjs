#!/usr/bin/env node

import { cp, mkdir, readFile, readdir, rm, stat, writeFile } from "node:fs/promises";
import { spawnSync } from "node:child_process";
import { dirname, join, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const buildRoot = join(root, ".build");
const staging = join(buildRoot, "careermax");
const archive = join(buildRoot, "careermax-chatgpt-plugin-1.0.0.zip");
// Only these paths ship in the ChatGPT package; repo files for other hosts stay out.
const PACKAGE_PATHS = ["plugin.json", "mcp.json", "skills/", "assets/", "LICENSE"];
const PLUGIN_SCHEMA = "https://agent-plugins.org/schemas/1.0.0/plugin.schema.json";
const MCP_SCHEMA = "https://agent-plugins.org/schemas/1.0.0/mcp.schema.json";
const SECRET_NAME = /(^|\/)(\.env(?:\.|$)|.*(?:secret|private[-_.]?key|credentials?).*|.*\.(?:pem|p12|pfx|key))$/i;

function fail(message) {
  throw new Error(message);
}

function insideRoot(path) {
  const rel = relative(root, path);
  return rel !== "" && !rel.startsWith(`..${sep}`) && rel !== ".." && !rel.includes(`${sep}..${sep}`);
}

async function inventory(directory, base = directory) {
  const output = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    if (entry.name === ".build" || entry.name === ".git" || entry.name === "node_modules") continue;
    const absolute = join(directory, entry.name);
    const rel = relative(base, absolute).split(sep).join("/");
    if (!insideRoot(absolute)) fail(`Path escapes plugin root: ${rel}`);
    if (entry.isSymbolicLink()) fail(`Symlinks are not allowed in the package: ${rel}`);
    if (entry.isDirectory()) output.push(...await inventory(absolute, base));
    else if (entry.isFile()) output.push({ absolute, rel });
    else fail(`Unsupported package entry: ${rel}`);
  }
  return output;
}

function checkedHttps(value, label) {
  let url;
  try { url = new URL(value); } catch { fail(`${label} must be a valid URL`); }
  if (url.protocol !== "https:" || url.username || url.password || /localhost|example\.(com|org|net)|invalid/i.test(url.hostname)) {
    fail(`${label} must be a deployable public HTTPS URL, not a placeholder`);
  }
  return url.toString();
}

function checkedText(value, label, maxLength) {
  if (typeof value !== "string" || !value.trim() || value.length > maxLength) {
    fail(`${label} must be non-empty and at most ${maxLength} characters`);
  }
}

async function main() {
  const plugin = JSON.parse(await readFile(join(root, "plugin.json"), "utf8"));
  const mcp = JSON.parse(await readFile(join(root, "mcp.json"), "utf8"));
  if (plugin.$schema !== PLUGIN_SCHEMA) fail("plugin.json uses the wrong Agent Plugins schema");
  if (mcp.$schema !== MCP_SCHEMA) fail("mcp.json uses the wrong Agent Plugins MCP schema");
  if (plugin.version !== "1.0.0") fail("plugin.json version must match the archive version");

  const openai = plugin.extensions?.["com.openai"];
  const ui = openai?.interface;
  if (!ui) fail("OpenAI interface metadata is missing");
  checkedText(ui.displayName, "displayName", 30);
  checkedText(ui.shortDescription, "shortDescription", 30);
  checkedText(ui.longDescription, "longDescription", 4000);
  checkedText(ui.developerName, "developerName", 80);
  checkedText(ui.category, "category", 120);
  if (!Array.isArray(ui.capabilities) || ui.capabilities.length > 20 ||
      ui.capabilities.some((value) => typeof value !== "string" || !value.trim() || value.length > 120)) {
    fail("capabilities must contain at most 20 non-empty labels of at most 120 characters");
  }
  for (const [field, value] of Object.entries({
    websiteURL: ui.websiteURL,
    supportURL: ui.supportURL,
    privacyPolicyURL: ui.privacyPolicyURL,
    termsOfServiceURL: ui.termsOfServiceURL,
  })) checkedHttps(value, field);
  if (!Array.isArray(ui.defaultPrompt) || ui.defaultPrompt.length !== 3 ||
      ui.defaultPrompt.some((value) => typeof value !== "string" || !value.trim() || value.length > 128)) {
    fail("Exactly three non-empty starter prompts of at most 128 characters are required");
  }
  if (openai.review?.test_cases?.positive?.length !== 5 || openai.review?.test_cases?.negative?.length !== 3) {
    fail("Review metadata requires exactly five positive and three negative cases");
  }
  for (const [kind, cases] of Object.entries(openai.review.test_cases)) {
    for (const [index, testCase] of cases.entries()) {
      checkedText(testCase.description, `${kind} test ${index + 1} description`, 4000);
      checkedText(testCase.prompt, `${kind} test ${index + 1} prompt`, 4000);
      checkedText(testCase.expected_behavior, `${kind} test ${index + 1} expected_behavior`, 4000);
      if (kind === "positive") checkedText(testCase.tools_triggered, `positive test ${index + 1} tools_triggered`, 4000);
    }
  }
  const demoRecordingUrl = process.env.CAREERMAX_PLUGIN_DEMO_RECORDING_URL?.trim() || openai.review?.demo_recording_url;
  if (demoRecordingUrl) openai.review.demo_recording_url = checkedHttps(demoRecordingUrl, "Demo recording URL");

  const server = mcp.mcpServers?.careermax;
  if (!server || server.type !== "streamable-http") fail("The CareerMax streamable HTTP MCP server is missing");
  const endpoint = process.env.CAREERMAX_PLUGIN_MCP_URL?.trim() || server.url;
  server.url = checkedHttps(endpoint, "CareerMax MCP endpoint");
  if (!server.url.endsWith("/mcp")) fail("CareerMax MCP endpoint must end in /mcp");
  const auth = server.extensions?.["com.openai"]?.auth;
  if (!auth || auth.type !== "oauth") fail("The CareerMax MCP server must declare OpenAI OAuth authentication");
  if (!Array.isArray(auth.baseScopes) || !auth.baseScopes.includes("careermax:events")) {
    fail("CareerMax OAuth baseScopes must request event monitoring permission");
  }
  auth.resource = new URL(server.url).origin;

  const files = await inventory(root);
  for (const file of files) {
    if (SECRET_NAME.test(file.rel)) fail(`Possible secret file is not allowed: ${file.rel}`);
  }
  const declared = [ui.logo, ui.composerIcon, openai.onboardingSkill];
  for (const path of declared) {
    if (typeof path !== "string" || !path.startsWith("./")) fail(`Invalid declared resource path: ${path}`);
    const target = resolve(root, path);
    if (!insideRoot(target)) fail(`Declared resource escapes plugin root: ${path}`);
    const info = await stat(target).catch(() => null);
    if (!info?.isFile()) fail(`Declared resource is missing: ${path}`);
  }
  const svg = await readFile(resolve(root, ui.logo), "utf8");
  const dimensions = svg.match(/<svg\b[^>]*\bwidth="(\d+)"[^>]*\bheight="(\d+)"/u);
  if (!dimensions || dimensions[1] !== dimensions[2] || Number(dimensions[1]) < 48) {
    fail("SVG logo must declare equal numeric width and height of at least 48 pixels");
  }
  for (const file of files.filter(({ rel }) => rel.endsWith("/SKILL.md"))) {
    const text = await readFile(file.absolute, "utf8");
    if (!/^---\nname: [a-z0-9-]+\ndescription: .+?\n(?:[a-z-]+: .+\n)*---\n/s.test(text)) fail(`Invalid skill frontmatter: ${file.rel}`);
  }

  await rm(buildRoot, { recursive: true, force: true });
  await mkdir(staging, { recursive: true });
  for (const file of files.filter(({ rel }) => PACKAGE_PATHS.some((path) => rel === path || rel.startsWith(path)))) {
    const destination = join(staging, file.rel);
    await mkdir(dirname(destination), { recursive: true });
    await cp(file.absolute, destination);
  }
  await writeFile(join(staging, "plugin.json"), `${JSON.stringify(plugin, null, 2)}\n`);
  await writeFile(join(staging, "mcp.json"), `${JSON.stringify(mcp, null, 2)}\n`);
  const zip = spawnSync("zip", ["-X", "-q", "-r", archive, "."], { cwd: staging, encoding: "utf8" });
  if (zip.status !== 0) fail(`zip failed: ${zip.stderr || zip.stdout}`);
  await rm(staging, { recursive: true, force: true });

  const dependencies = [];
  if (!demoRecordingUrl) {
    dependencies.push("Add a reviewer-accessible demo recording URL in the submission dashboard or plugin review metadata before review.");
  }
  await writeFile(join(buildRoot, "submission-dependencies.json"), `${JSON.stringify({ archive, dependencies }, null, 2)}\n`);
  console.log(`Built ${archive}`);
  for (const dependency of dependencies) console.warn(`SUBMISSION DEPENDENCY: ${dependency}`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
});
