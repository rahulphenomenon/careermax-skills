---
name: careermax-cover-letter-writer
description: Generate tailored cover letters for job applications. Use when the user says "write a cover letter", "generate cover letter", "cover letter for this job", or needs a cover letter.
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

# CareerMax Cover Letter Writer

Use the primary `careermax` skill for shared conversation, security, confirmation,
and error-recovery rules.

## Workflow

1. Ask which pipeline role the user means when it is ambiguous.
2. Use `get_job` to review its company, role, and description when helpful.
3. Use `generate_cover_letter` with a job ID or job description.
4. Return the draft in a readable format and invite specific revisions. Do not
   imply that CareerMax submitted the application.

CareerMax can use the user's stored resume when resume text is omitted. If no
resume is available, explain how to add one at `https://careermax.ai/resume`.

## CLI

```bash
npx @careermax/agent-toolkit cover-letter generate --job-id <id>
```
