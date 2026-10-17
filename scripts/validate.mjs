#!/usr/bin/env node
// Validates every host package in this repo against the shared skills folder:
// Agent Skills frontmatter, the Claude plugin + marketplace, and the Agent
// Plugins root manifest used by ChatGPT. Run: node scripts/validate.mjs
import { readFile, readdir, lstat } from "node:fs/promises";
import { join, resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const problems = [];
const fail = (message) => problems.push(message);
const json = async (path) => JSON.parse(await readFile(join(root, path), "utf8"));

function frontmatter(text) {
  const match = /^---\n([\s\S]*?)\n---\n/.exec(text);
  if (!match) return null;
  const fields = {};
  for (const line of match[1].split("\n")) {
    const at = line.indexOf(": ");
    if (at > 0) fields[line.slice(0, at)] = line.slice(at + 2);
  }
  return fields;
}

const skillIds = (await readdir(join(root, "skills"), { withFileTypes: true }))
  .filter((entry) => entry.isDirectory()).map((entry) => entry.name).sort();
if (skillIds.length === 0) fail("No skills found in skills/");

for (const id of skillIds) {
  const path = join("skills", id, "SKILL.md");
  if ((await lstat(join(root, path))).isSymbolicLink()) fail(`${path} must not be a symlink`);
  const text = await readFile(join(root, path), "utf8");
  const fields = frontmatter(text);
  if (!fields) { fail(`${path}: missing frontmatter`); continue; }
  if (fields.name !== id) fail(`${path}: name "${fields.name}" must match folder "${id}"`);
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(fields.name ?? "") || fields.name.length > 64) fail(`${path}: invalid name`);
  if (!fields.description || fields.description.length > 1024) fail(`${path}: description must be 1-1024 characters`);
  if (fields.compatibility && fields.compatibility.length > 500) fail(`${path}: compatibility over 500 characters`);
  if (text.split("\n").length > 500) fail(`${path}: keep SKILL.md under 500 lines`);
}

// One MCP endpoint everywhere.
const endpoints = new Set();
const claudeMcp = await json(".mcp.json");
endpoints.add(claudeMcp.mcpServers?.careermax?.url);
const openaiMcp = await json("mcp.json");
endpoints.add(openaiMcp.mcpServers?.careermax?.url);
// The Agent Plugins root manifest (plugin.json + mcp.json) must stay within the shared schema.
const servers = Object.values(openaiMcp.mcpServers ?? {});
for (const server of servers) {
  const extra = Object.keys(server).filter((key) => !["type", "url", "headers"].includes(key));
  if (extra.length) fail(`mcp.json server has fields outside the Agent Plugins schema: ${extra.join(", ")}`);
}
if (endpoints.size !== 1) fail(`MCP endpoints disagree: ${[...endpoints].join(", ")}`);
for (const url of endpoints) {
  if (!url || !/^https:\/\/[^/]+\/mcp$/.test(url)) fail(`MCP endpoint must be an https URL ending in /mcp: ${url}`);
}

// Versions agree across hosts.
const claude = await json(".claude-plugin/plugin.json");
const marketplace = await json(".claude-plugin/marketplace.json");
const openai = await json("plugin.json");
const versions = new Set([claude.version, openai.version, ...marketplace.plugins.map((p) => p.version)]);
if (versions.size !== 1) fail(`Plugin versions disagree: ${[...versions].join(", ")}`);

// ChatGPT onboarding skill exists.
const onboarding = openai.extensions?.["com.openai"]?.onboardingSkill;
if (onboarding && !skillIds.includes(onboarding.split("/").at(-2))) fail(`ChatGPT onboardingSkill not found: ${onboarding}`);

if (problems.length) {
  for (const problem of problems) console.error(`✗ ${problem}`);
  process.exitCode = 1;
} else {
  console.log(`✓ ${skillIds.length} skills and the Claude and Agent Plugins (ChatGPT) manifests are consistent (${[...endpoints][0]})`);
}
