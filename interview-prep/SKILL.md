---
name: careermax-interview-prep
description: Prepare for interviews with mock sessions, company research, and past feedback. Use when the user says "prep for interview", "practice interview", "research company", "mock interview", "interview feedback", or is preparing for an upcoming interview.
version: 0.1.1
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

# Careermax Interview Prep

Prepare for interviews with AI mock sessions, company research, and feedback from past practice.

## Setup

1. Get an API key from [Careermax Settings](https://careermax.ai/dashboard/settings/api-keys)
2. Set the environment variable: `export CAREERMAX_API_KEY="cmx_live_..."`

## How It Works

1. The skill connects to Careermax via the `@careermax/agent-toolkit` MCP server
2. You can create mock interview sessions for specific roles and companies — this returns a URL you open in the browser to start the voice interview
3. Company prep generates research briefs with key facts, culture insights, and likely interview topics
4. Review feedback from past interview sessions to track improvement

## Tools

- `interviews_list` — List past and upcoming interview sessions
- `interviews_feedback` — Get detailed AI feedback from a specific interview session
- `interviews_create` — Create a new mock interview session for a role and company (free to create, credits deducted when you click Start in browser, preview/confirm)
- `company_prep_get` — View existing company research
- `company_prep_generate` — Generate a company research brief for interview prep (costs 5 credits, preview/confirm)

## Usage

```bash
# Install the MCP server
npx @careermax/agent-toolkit mcp

# Or use the CLI directly
npx @careermax/agent-toolkit interviews list
npx @careermax/agent-toolkit interviews create --role "Software Engineer" --company Stripe
npx @careermax/agent-toolkit company-prep generate --company Stripe --role "Software Engineer"
```
