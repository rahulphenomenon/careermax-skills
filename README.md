<p align="center">
  <img src="assets/icon.svg" width="72" height="72" alt="CareerMax">
</p>

<h1 align="center">CareerMax: run your job search from Claude</h1>

<p align="center">
  Job search skills and a remote MCP server for Claude, ChatGPT, Hermes and any agent that speaks MCP.<br>
  CareerMax finds jobs that match your resume every day and fills out the applications you pick. Your assistant shortlists the jobs, drafts referral and outreach notes, and helps you prepare for interviews.
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
| **"Help me find a job"** | Share your resume, or describe your experience. Your assistant drafts your whole profile (job preferences, everything employers ask on applications, your applicant email and daily outreach), shows it once for your approval, shows today's best jobs, then sets up your daily briefs at times you pick. |
| **"Run my CareerMax job search brief"** | Your top 5 new jobs, each with one line on why it fits your real experience, every other match under **View all**, and anything waiting on you. Tick the ones you want and apply. With daily outreach on, it also suggests 3 new companies a day worth reaching out to, with the people to contact there. |
| **"Show me more jobs"** | The next 10 jobs, newly posted ones first: up to 50 new jobs a day on a paid CareerMax plan. Your queue is the same in Claude, the CareerMax app and on the web. |
| **"Apply to the first two"** | CareerMax fills each application in a cloud browser while you watch progress. Answer any employer questions in chat and review before anything is sent. |
| **"Find someone at Acme who could refer me"** | CareerMax finds the right people and your assistant drafts a short note for you to approve and send. |
| **"Build my Storybank"** | Your assistant suggests the moments on your resume worth turning into interview stories, coaches each one (evidence, ownership, structure, outcome) and saves it in STAR form. |
| **"Help me prepare for my interview on Thursday"** | Free company and role research with sources, then a one-screen brief: the company in 60 seconds, likely interview questions matched to your stories, and questions to ask. |

You stay in charge. CareerMax only applies to jobs you pick, never submits without your approval unless you turned off **Review before submit** in the app, and never sends a message you haven't approved. Credits are shown before anything is spent: an application costs 1 credit, a contact search 1 (refunded when nobody is found) and each daily outreach company 1 (free when nobody is found). Interview research and your Storybank are free.

## Install

You need a CareerMax account. If you don't have one, you can create it when you connect.

### Claude

**Claude apps (web, desktop, mobile)**
1. Open **Customize → Plugins** and add CareerMax. Until the directory listing is live, open **Settings → Connectors → Add custom connector** and paste `https://mcp.careermax.ai/mcp`.
2. Sign in to CareerMax when asked.
3. Say **"Help me find a job"**.

The plugin adds the six skills below on top of the connector. Without them Claude still knows the workflows from the server.

On a paid Claude plan, setup schedules two weekday briefs at times you pick: *Run my CareerMax apply brief* in the evening (6-9 PM) and *Run my CareerMax outreach brief* in the morning (9-11 AM). To add them yourself, open **Scheduled** and create a task for each. On a free plan, say either prompt when you want it.

**Claude Code**
```bash
/plugin marketplace add rahulphenomenon/careermax-skills
/plugin install careermax@careermax
```

### ChatGPT

1. Find **CareerMax** in the ChatGPT plugins directory and install it. Until the listing is live, open **Settings → Apps**, turn on **Developer mode** under Advanced settings, choose **Create app** and paste `https://mcp.careermax.ai/mcp`.
2. Sign in to CareerMax when asked.
3. Say **"@CareerMax run my job search brief"**. Pick jobs in the card that opens beside the chat.

Ask ChatGPT to schedule your apply brief in the evening and your outreach brief in the morning. In ChatGPT Work you can also ask CareerMax to let you know when an application needs you.

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

Then sign in from a terminal with `hermes mcp login careermax` and ask Hermes for your job search brief.

### Any other agent

1. Install the skills: `npx skills add rahulphenomenon/careermax-skills`
2. Connect the remote MCP server `https://mcp.careermax.ai/mcp` (Streamable HTTP, OAuth 2.1 sign-in with your CareerMax account).
3. Ask for your job search brief.

## MCP server

`https://mcp.careermax.ai/mcp` · Streamable HTTP · OAuth 2.1 sign-in with your CareerMax account (no API keys).

| Workflow | Tools |
| --- | --- |
| Setup | `get_account_overview`, `complete_setup`, `get_resume`, `save_resume`, `save_job_preferences`, `save_application_profile`, `claim_applicant_email`, `set_daily_outreach` |
| Jobs | `get_todays_jobs`, `show_job_picker`, `find_more_jobs`, `update_jobs`, `add_job_from_link` |
| Applications | `apply_to_jobs`, `get_job_applications`, `get_application`, `answer_application`, `submit_application`, `cancel_application` |
| People | `find_people_at_company`, `find_outreach_contacts` |
| Inbox | `get_employer_emails`, `reply_to_employer_email` |
| Interviews | `list_interview_stories`, `save_interview_story`, `research_company_for_interview` |

In hosts that support MCP Apps, the job picker and applications tools show interactive cards; everywhere else they answer in text.

## FAQ

**Can Claude apply to jobs for me?** Yes. You pick the jobs; CareerMax fills out each employer's application in a cloud browser, asks you anything it doesn't know, and with Review before submit on shows you the finished application before it's sent.

**Which job sites does it work with?** Jobs come from employer career sites on the applicant tracking systems CareerMax can apply through, so every job you see is one it can apply to for you.

**Is it free?** Creating a CareerMax account is free and comes with a first set of matches. Applying and finding people use credits; daily jobs come with a paid plan. Interview research, your Storybank and drafting messages are free.

**Does it work with ChatGPT, Hermes or other agents?** Yes. The same MCP server and skills work in any MCP client; see Install above.

## What's in this repository

| Path | For |
| --- | --- |
| `skills/` | Six workflow skills in the [Agent Skills](https://agentskills.io) format, shared by every assistant |
| `.claude-plugin/` | Claude plugin and the marketplace for `/plugin marketplace add` |
| `.mcp.json` | MCP server for the Claude plugin |
| `plugin.json`, `mcp.json` | ChatGPT plugin package in the Agent Plugins format (`node scripts/build-chatgpt.mjs` builds the upload) |
| `server.json` | Entry for the [official MCP Registry](https://registry.modelcontextprotocol.io) |
| `scripts/validate.mjs` | Checks that every manifest lists the same skills and server |

## Privacy and support

CareerMax acts only on the account you sign in with. Read the [privacy policy](https://careermax.ai/privacy) and [terms](https://careermax.ai/terms). For help, email [support@careermax.ai](mailto:support@careermax.ai).

Coming from the older `@careermax/agent-toolkit` and API keys? You no longer need either. Remove the old `careermax` skill and install this one; sign-in now happens in your assistant.

## License

[MIT](LICENSE) © Ramen Labs LLC
