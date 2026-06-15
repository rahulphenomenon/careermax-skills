---
name: careermax-skill-gap-analysis
description: Identify skill gaps for target roles with learning plans, resources, and quizzes. Use when the user says "what skills do I need", "skill gap", "learning plan", "study for role", "quiz me", "prepare for role", or wants to upskill for a target position.
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

# CareerMax Skill Gap Analysis

Use the primary `careermax` skill for shared conversation, security, confirmation,
and error-recovery rules.

## Workflow

1. Clarify the role the user is preparing for.
2. Use `get_learning_plan` to review an existing plan when available.
3. Use `generate_learning_resources` for role-focused resources.
4. Use `generate_quiz` when the user wants to test themselves, and
   `list_quiz_sessions` to review prior results.

Explain recommendations in terms of the user's target role and avoid presenting
a generated quiz score as a formal credential.

## CLI

```bash
npx @careermax/agent-toolkit learning plan
npx @careermax/agent-toolkit learning resources --role "Software Engineer"
npx @careermax/agent-toolkit learning quiz --role "Software Engineer" --company Stripe
npx @careermax/agent-toolkit learning quizzes
```
