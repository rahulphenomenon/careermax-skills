---
name: careermax-resume-reviewer
description: Get AI-powered resume feedback and optimization. Use when the user says "review my resume", "improve my resume", "optimize my resume", "what's wrong with my resume", or wants resume advice.
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

# CareerMax Resume Reviewer

Use the primary `careermax` skill for shared conversation, security, confirmation,
and error-recovery rules.

## Workflow

- Use `get_resume` to check whether the user has a stored resume.
- Use `review_resume` for structured feedback.
- Use `optimize_resume_text` when the user wants a specific section or bullet
  rewritten for a target role.

Ask before changing the user's wording, preserve facts, and clearly label
suggested text. CareerMax does not currently return a newly tailored resume as a
PDF through this integration. If no resume is stored, ask the user to add one at
`https://careermax.ai/resume`.

## CLI

```bash
npx @careermax/agent-toolkit resume show
npx @careermax/agent-toolkit resume review
npx @careermax/agent-toolkit resume optimize --text "Led a team." --target-role "Engineering Manager"
```
