# CareerMax Skills

Agent skills for [CareerMax AI](https://careermax.ai) — all the tools you need to land your next job.

Use CareerMax with AI agents like Claude Code, Codex, Gemini CLI, and OpenClaw to search jobs, track applications, review resumes, write cover letters, prepare for interviews, find referrals, and close skill gaps.

## Skills

| Skill | Install | What it does |
|-------|---------|-------------|
| **Job Pipeline Tracker** | `npx skills add rahulphenomenon/careermax-skills/job-pipeline-tracker` | Track applications, update statuses, manage your job board |
| **Resume Reviewer** | `npx skills add rahulphenomenon/careermax-skills/resume-reviewer` | Get AI feedback on your resume and optimize sections |
| **Cover Letter Writer** | `npx skills add rahulphenomenon/careermax-skills/cover-letter-writer` | Generate tailored cover letters for job applications |
| **Interview Prep** | `npx skills add rahulphenomenon/careermax-skills/interview-prep` | Mock interviews, company research, and past feedback |
| **Referral Finder** | `npx skills add rahulphenomenon/careermax-skills/referral-finder` | Find referrals at target companies and draft outreach |
| **Skill Gap Analysis** | `npx skills add rahulphenomenon/careermax-skills/skill-gap-analysis` | Learning plans, resources, and quizzes for target roles |

## Setup

1. Sign in to CareerMax and open Settings > API Keys.
2. Create a new API key and copy it. The key starts with `cmx_live_` and is shown only once.
3. Set the environment variable:
   ```sh
   export CAREERMAX_API_KEY="cmx_live_..."
   ```
4. Install any skill above, or install them all:
   ```sh
   npx skills add rahulphenomenon/careermax-skills/job-pipeline-tracker
   npx skills add rahulphenomenon/careermax-skills/resume-reviewer
   npx skills add rahulphenomenon/careermax-skills/cover-letter-writer
   npx skills add rahulphenomenon/careermax-skills/interview-prep
   npx skills add rahulphenomenon/careermax-skills/referral-finder
   npx skills add rahulphenomenon/careermax-skills/skill-gap-analysis
   ```

## AI Agent Guides

- [CareerMax AI agent guide](https://careermax.ai/ai-agent): use CareerMax with Claude Code, Codex, Gemini CLI, and other agent tools.
- [CareerMax OpenClaw guide](https://careermax.ai/openclaw): install CareerMax as an OpenClaw skill and run job-search workflows from your agent.

## How it works

Each skill connects to CareerMax via the [`@careermax/agent-toolkit`](https://www.npmjs.com/package/@careermax/agent-toolkit) MCP server. All processing happens server-side on the same backend as the CareerMax web app. Your data stays in your account.

Read operations are free. Write operations use a preview/confirm pattern — you see a summary and credit cost before anything executes.
