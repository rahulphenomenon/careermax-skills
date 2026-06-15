---
name: careermax-job-pipeline-tracker
description: Track job applications through your pipeline. Use when the user says "add a job", "update job status", "show my pipeline", "list my applications", or wants to manage their job search.
version: 0.2.0
metadata:
  openclaw:
    requires:
      env:
        - CAREERMAX_API_KEY
      bins:
        - npx
    primaryEnv: CAREERMAX_API_KEY
    homepage: https://careermax.ai
---

# CareerMax Job Pipeline Tracker

Use the primary `careermax` skill for shared conversation, security, confirmation,
and error-recovery rules.

## Workflows

- Use `list_jobs` to show pipeline records and `get_job` for full details.
- Use `add_job` to save a role the user is tracking.
- Use `update_job` to change a saved role's status, notes, company, title, or link.

Adding or updating a pipeline record is a lasting action. First call the tool
without a confirmation token. Show the returned details and ask whether to save
that exact record or change. Only repeat the call with its `confirmationToken`
after the user agrees. Never interpret "tell me about this role" as "save this
role," and never imply that CareerMax applied to the role.

## CLI

```bash
npx @careermax/agent-toolkit jobs list --status Applied
npx @careermax/agent-toolkit jobs add --description "Senior SWE role" --company Stripe --role "Senior Software Engineer"
npx @careermax/agent-toolkit jobs update <id> --status Interviewing
```
