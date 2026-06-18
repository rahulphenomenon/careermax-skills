# CareerMax Skills

Use [CareerMax](https://careermax.ai) from AI agents such as Claude Code,
Codex, Gemini CLI, and OpenClaw.

The primary `careermax` skill covers the supported agent workflows:

- Review career context, credits, and action costs
- Manage the job application pipeline
- Review and improve resumes and generate cover letters
- Prepare for interviews and create voice-practice sessions
- Find referrals and draft outreach
- Analyze LinkedIn and build learning plans

The public agent toolkit does not expose auto-apply.

## Install

```sh
npx skills add rahulphenomenon/careermax-skills --skill careermax
```

The focused skills remain available as compatibility entry points for one
release, but new installations should use the primary `careermax` skill.

## Setup

1. Sign in to CareerMax and open Settings > API Keys.
2. Create a dedicated agent API key and copy it.
3. Set it through your agent's secure environment configuration as
   `CAREERMAX_API_KEY`.
4. Configure the MCP server:

   ```sh
   npx -y @careermax/agent-toolkit mcp
   ```

5. Verify the connection with a read-only request such as "list my pipeline."

Never paste the API key into a chat message.

## How It Works

The skills use the
[`@careermax/agent-toolkit`](https://www.npmjs.com/package/@careermax/agent-toolkit)
MCP server to access the user's connected CareerMax account. Lasting pipeline
changes and interview-session creation require explicit confirmation. Draft
generation and read-only requests can proceed directly.

See the [CareerMax AI agent guide](https://careermax.ai/ai-agent) and
[OpenClaw guide](https://careermax.ai/openclaw) for platform-specific setup.
