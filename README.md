# CareerMax Skills

Agent skills for [CareerMax](https://careermax.ai) — all the tools you need to land your next job.

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

1. Get an API key from [CareerMax Settings](https://careermax.ai/dashboard/settings/api-keys)
2. Set the environment variable:
   ```sh
   export CAREERMAX_API_KEY="cmx_live_..."
   ```
3. Install any skill above, or install them all:
   ```sh
   npx skills add rahulphenomenon/careermax-skills/job-pipeline-tracker
   npx skills add rahulphenomenon/careermax-skills/resume-reviewer
   npx skills add rahulphenomenon/careermax-skills/cover-letter-writer
   npx skills add rahulphenomenon/careermax-skills/interview-prep
   npx skills add rahulphenomenon/careermax-skills/referral-finder
   npx skills add rahulphenomenon/careermax-skills/skill-gap-analysis
   ```

## How it works

Each skill connects to CareerMax via the [`@careermax/agent-toolkit`](https://www.npmjs.com/package/@careermax/agent-toolkit) MCP server. All processing happens server-side on the same backend as the CareerMax web app. Your data stays in your account.

Read operations are free. Write operations use a preview/confirm pattern — you see a summary and credit cost before anything executes.
