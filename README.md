<p align="center">
  <img src="assets/icon.svg" width="72" height="72" alt="CareerMax">
</p>

<h1 align="center">CareerMax for AI assistants</h1>

<p align="center">
  Run your job search from Claude, ChatGPT, Hermes or any agent that speaks MCP.<br>
  CareerMax finds jobs and fills out applications. Your assistant ranks the jobs, drafts the messages and helps you prepare.
</p>

<p align="center">
  <a href="https://careermax.ai/ai-agent">Website</a> ·
  <a href="#claude">Claude</a> ·
  <a href="#chatgpt">ChatGPT</a> ·
  <a href="#muse">Muse</a> ·
  <a href="#hermes">Hermes</a> ·
  <a href="#any-other-agent">Other agents</a>
</p>

```bash
npx skills add rahulphenomenon/careermax-skills
```

## What you can do

Every workflow has the same shape: your assistant proposes, you decide, CareerMax does it, and your assistant reports back.

| Say | What happens |
| --- | --- |
| **"Help me find a job"** | Share your résumé. Your assistant fills in your CareerMax profile, asks only what's missing, sets your job preferences and shows your first matches. |
| **"Run my CareerMax daily brief"** | Today's new jobs, ranked against your real experience with one line on why each fits, plus anything waiting on you. Pick the ones you want. |
| **"Apply to the first two"** | CareerMax fills each application in a cloud browser while you watch progress. Answer any employer questions in chat and review before anything is sent. |
| **"Find someone at Acme who could refer me"** | CareerMax finds the right people and your assistant drafts a short note for you to approve and send. |
| **"Build my Storybank"** | A short conversation that turns your past wins into reusable interview stories. |
| **"Help me prepare for my interview on Thursday"** | A one-screen brief: the company, likely questions and which of your stories to use. |

You stay in charge. CareerMax only applies to jobs you pick, never submits without your approval unless you turned off **Review before submit** in the app, and never sends a message you haven't approved. Credits are shown before anything is spent: an application costs 1 credit, a contact search 1 (refunded when nobody is found), and company research 5.

## Install

You need a CareerMax account. If you don't have one, you can create it when you connect.

### Claude

**Claude apps (web, desktop, mobile)**
1. Open **Customize → Plugins** and add CareerMax. Until the directory listing is live, open **Settings → Connectors → Add custom connector** and paste `https://mcp.careermax.ai/mcp`.
2. Sign in to CareerMax when asked.
3. Say **"Help me find a job"**.

The plugin adds the six skills below on top of the connector. Without them Claude still knows the workflows from the server.

To get your brief every morning, open **Scheduled**, create a new task with the prompt *Run my CareerMax daily brief*, and pick a time.

**Claude Code**
```bash
/plugin marketplace add rahulphenomenon/careermax-skills
/plugin install careermax@careermax
```

### ChatGPT

1. Find **CareerMax** in the ChatGPT plugins directory and install it. Until the listing is live, open **Settings → Apps**, turn on **Developer mode** under Advanced settings, choose **Create app** and paste `https://mcp.careermax.ai/mcp`.
2. Sign in to CareerMax when asked.
3. Say **"@CareerMax run my daily brief"**. Pick jobs in the card that opens beside the chat.

Ask ChatGPT to run your daily brief every morning to create a scheduled task. In ChatGPT Work you can also ask CareerMax to let you know when an application needs you.

### Muse

CareerMax is coming to Muse's connector directory. Once it's listed:
1. In Muse, open **Settings → Connectors** and connect **CareerMax**.
2. Sign in to CareerMax when asked.
3. Say *What are today's best jobs for me on CareerMax?* Muse shows jobs as a numbered list, so reply with the numbers you want.

Muse asks you to confirm every action that spends credits, submits an application or sends an email.

### Hermes

```bash
hermes skills tap add rahulphenomenon/careermax-skills
```

Add the CareerMax server to `~/.hermes/config.yaml`:

```yaml
mcp_servers:
  careermax:
    url: "https://mcp.careermax.ai/mcp"
    auth: oauth
```

Then sign in from a terminal with `hermes mcp login careermax` and ask Hermes for your daily brief.

### Any other agent

1. Install the skills: `npx skills add rahulphenomenon/careermax-skills`
2. Connect the remote MCP server `https://mcp.careermax.ai/mcp` (Streamable HTTP, OAuth 2.1 sign-in with your CareerMax account).
3. Ask for your daily brief.

## What's in this repository

| Path | For |
| --- | --- |
| `skills/` | Six workflow skills in the [Agent Skills](https://agentskills.io) format, shared by every assistant |
| `.claude-plugin/` | Claude plugin and the marketplace for `/plugin marketplace add` |
| `.mcp.json` | MCP server for the Claude plugin |
| `plugin.json`, `mcp.json` | ChatGPT plugin package in the Agent Plugins format (`node scripts/build-chatgpt.mjs` builds the upload) |
| `scripts/validate.mjs` | Checks that every manifest lists the same skills and server |

## Privacy and support

CareerMax acts only on the account you sign in with. Read the [privacy policy](https://careermax.ai/privacy) and [terms](https://careermax.ai/terms). For help, email [support@careermax.ai](mailto:support@careermax.ai).

Coming from the older `@careermax/agent-toolkit` and API keys? You no longer need either. Remove the old `careermax` skill and install this one; sign-in now happens in your assistant.

## License

[MIT](LICENSE) © Ramen Labs LLC
