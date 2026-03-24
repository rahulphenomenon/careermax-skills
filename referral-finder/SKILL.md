---
name: careermax-referral-finder
description: Find potential referrals at target companies and draft outreach messages. Use when the user says "find a referral", "who can refer me", "draft outreach", "reach out to someone at", "networking", or wants to connect with people at a company.
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

# Careermax Referral Finder

Find potential referrals at target companies and draft personalized outreach messages.

## Setup

1. Get an API key from [Careermax Settings](https://careermax.ai/dashboard/settings/api-keys)
2. Set the environment variable: `export CAREERMAX_API_KEY="cmx_live_..."`

## How It Works

1. The skill connects to Careermax via the `@careermax/agent-toolkit` MCP server
2. Search for potential referrals at a target company — AI finds relevant people based on your profile and target role
3. View your bookmarked contacts from previous searches
4. Generate personalized outreach messages tailored to the recipient and your background

## Tools

- `mentors_search` — Search for potential referrals at a target company (costs 1 credit, preview/confirm)
- `mentors_bookmarks` — View your bookmarked contacts from previous searches
- `outreach_generate` — Draft a personalized outreach message to a specific contact (costs 1 credit, preview/confirm)

## Usage

```bash
# Install the MCP server
npx @careermax/agent-toolkit mcp

# Or use the CLI directly
npx @careermax/agent-toolkit mentors search --company Stripe --role "Software Engineer"
npx @careermax/agent-toolkit mentors bookmarks
npx @careermax/agent-toolkit outreach generate --mentor-id <id>
```
