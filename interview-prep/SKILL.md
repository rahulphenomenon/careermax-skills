---
name: careermax-interview-prep
description: Prepare for interviews with mock sessions, company research, and past feedback. Use when the user says "prep for interview", "practice interview", "research company", "mock interview", "interview feedback", or is preparing for an upcoming interview.
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

# CareerMax Interview Prep

Use the primary `careermax` skill for shared conversation, security, confirmation,
and error-recovery rules.

## Workflows

- Review prior practice with `list_interviews` and `get_interview_feedback`.
- Research a company with `get_company_prep` or `generate_company_prep`.
- Create a clickable voice-practice link with `create_interview_session`.

Creating an interview session is a lasting action. First call
`create_interview_session` with the intended role, company, round, and duration.
Show the returned details, ask the user whether to create that exact session,
and only repeat the call with its `confirmationToken` after they agree. Return
the resulting URL as a clickable link. If auth is required, tell the user they
will be asked to sign in.

Company research is not an interview-session request. When intent is unclear,
ask which outcome the user wants.

## CLI

```bash
npx @careermax/agent-toolkit interviews list
npx @careermax/agent-toolkit interviews create --role "Software Engineer" --company Stripe
npx @careermax/agent-toolkit company-prep generate --company Stripe --role "Software Engineer"
```
