<p align="center">
  <img src="assets/icon.svg" width="72" height="72" alt="CareerMax">
</p>

<h1 align="center">CareerMax for AI assistants</h1>

<p align="center">
  Run your job search from Claude, ChatGPT, Hermes or any agent that speaks MCP.<br>
  CareerMax finds jobs, fills out and submits applications, and keeps your applicant inbox. Your assistant ranks the jobs, drafts the messages and helps you prepare.
</p>

<p align="center">
  <a href="https://careermax.ai/ai-agent">Website</a> ·
  <a href="#claude">Claude</a> ·
  <a href="#chatgpt">ChatGPT</a> ·
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
| **"Help me find a job"** | Share your résumé, or describe your experience. Your assistant drafts your whole profile (job preferences, the facts employers ask for, your applicant email and daily outreach), shows it once for your approval, then shows today's best jobs. |
| **"Run my CareerMax job search brief"** | Today's new jobs, ranked against your real experience with one line on why each fits, plus anything waiting on you. Pick the ones you want. With daily outreach on, it also suggests 3 new companies a day worth reaching out to, with up to 10 people to contact at each. The same brief also comes as two weekday briefs you can schedule (see below). |
| **"Apply to the first two"** | CareerMax fills each application in a cloud browser while you watch progress. Your assistant drafts answers to any employer questions for you to accept, then reviews the finished application with you before it's sent (when Review before submit is on). |
| **"Find someone at Acme who could refer me"** | CareerMax finds the right people, you pick who to contact, and your assistant drafts a short email and LinkedIn note for each. When you ask it to send an email, CareerMax sends it from your CareerMax applicant address and replies come to your CareerMax inbox. LinkedIn notes are yours to copy; they are never sent for you. |
| **"Build my Storybank"** | A short conversation that turns your past wins into reusable interview stories. |
| **"Help me prepare for my interview on Thursday"** | A one-screen brief: the company, likely questions and which of your stories to use. |

You stay in charge. CareerMax only applies to jobs you pick, never submits without your approval unless you turned off **Review before submit** in the app, and never sends a message you haven't approved. Nothing that costs credits runs without your go-ahead: an application costs 1 credit, a contact search 1 (refunded when nobody is found), and each daily outreach company 1 (free when nobody is found). Interview prep, where your assistant researches the company with its own web search, and the Storybank use no credits.

The free CareerMax plan includes a guided first run: setup, a real application and a referral. New jobs every day, applications and referrals after that need a CareerMax plan.

## Your briefs every weekday

CareerMax works best as two short weekday briefs, set up as scheduled tasks in your assistant:

- **Apply brief**, in the evening (7 PM by default): new jobs that match you and anything that needs you. Prompt: *Run my CareerMax apply brief*
- **Outreach brief**, in the morning (10 AM by default): people to contact and notes ready to send. Prompt: *Run my CareerMax outreach brief*

*Run my CareerMax job search brief* still runs the full brief any time. A scheduled brief never applies, submits or sends anything on its own; it gets everything ready for you to approve.

## Install

You need a CareerMax account. If you don't have one, you can create it when you connect.

### Claude

**Claude apps (web, desktop, mobile)**
1. Open **Customize → Plugins** and add CareerMax. Until the directory listing is live, open **Customize → Connectors**, select **+**, choose **Add custom connector**, name it CareerMax and paste `https://mcp.careermax.ai/mcp`.
2. Sign in to CareerMax when asked.
3. Say **"Help me find a job"**.

The plugin adds the six skills in `skills/` on top of the connector. Without them Claude still knows the workflows from the server.

To schedule the briefs on a paid Claude plan, open **Scheduled**, select **New task**, then **Set up manually**, and create one task for each prompt (*Run my CareerMax apply brief* and *Run my CareerMax outreach brief*) on weekdays at the time you want. Otherwise, say either prompt whenever you like.

**Claude Code**
```bash
/plugin marketplace add rahulphenomenon/careermax-skills
/plugin install careermax@careermax
```

### ChatGPT

1. Find **CareerMax** in the ChatGPT plugins directory and install it. Until the listing is live, open **Plugins** in the sidebar, select **Add**, then **Add custom MCP server**, name it CareerMax, paste `https://mcp.careermax.ai/mcp` as the **Server URL** with **Authentication** left on **OAuth**, then select **Create as a plugin**.
2. Sign in to CareerMax when asked.
3. Say **"@CareerMax run my job search brief"**. Pick jobs in the card that opens beside the chat.

To schedule the briefs, ask ChatGPT, for example "Every weekday at 7 PM, run my CareerMax apply brief" and "Every weekday at 10 AM, run my CareerMax outreach brief". In ChatGPT Work you can also ask CareerMax to let you know when an application needs you.

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

Then sign in from a terminal with `hermes mcp login careermax` and ask Hermes for your job search brief.

### Any other agent

1. Install the skills: `npx skills add rahulphenomenon/careermax-skills`
2. Connect the remote MCP server `https://mcp.careermax.ai/mcp` (Streamable HTTP, OAuth 2.1 sign-in with your CareerMax account).
3. Ask for your job search brief.

## What's in this repository

| Path | For |
| --- | --- |
| `skills/` | Six workflow skills in the [Agent Skills](https://agentskills.io) format, shared by every assistant |
| `.claude-plugin/` | Claude plugin manifest, icon and the marketplace for `/plugin marketplace add` |
| `.mcp.json` | MCP server for the Claude plugin |
| `plugin.json`, `mcp.json` | ChatGPT plugin package in the Agent Plugins format (`node scripts/build-chatgpt.mjs` builds the upload) |
| `scripts/validate.mjs` | Checks that every manifest lists the same skills and server |

## Privacy and support

CareerMax acts only on the account you sign in with. Nothing is submitted or sent without your approval or your Review before submit setting. Read the [privacy policy](https://careermax.ai/privacy) and [terms](https://careermax.ai/terms). For help, email [support@careermax.ai](mailto:support@careermax.ai).

Coming from the older `@careermax/agent-toolkit` and API keys? You no longer need either. Remove the old `careermax` skill and install this one; sign-in now happens in your assistant.

## License

[MIT](LICENSE) © Ramen Labs LLC
