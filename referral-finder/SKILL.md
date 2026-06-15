---
name: careermax-referral-finder
description: Find potential referrals at target companies and draft outreach messages. Use when the user says "find a referral", "who can refer me", "draft outreach", "reach out to someone at", "networking", or wants to connect with people at a company.
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

# CareerMax Referral Finder

Use the primary `careermax` skill for shared conversation, security, confirmation,
and error-recovery rules.

## Workflow

1. Clarify the target company and the kind of contact the user wants.
2. Use `search_mentors`, or `list_bookmarked_mentors` for saved contacts.
3. Let the user choose a relevant person.
4. Use `generate_outreach` with that person's name, title, and company, plus
   the user's goal. Return a draft for the user to edit and send themselves.

Do not claim CareerMax contacted anyone or secured a referral.

## CLI

```bash
npx @careermax/agent-toolkit mentors search --company Stripe --role "Software Engineer"
npx @careermax/agent-toolkit mentors bookmarks
npx @careermax/agent-toolkit outreach generate --mentor-name "Avery Chen" --mentor-title "Engineering Manager" --mentor-company Stripe --type referral --user-role "Software Engineer"
```
