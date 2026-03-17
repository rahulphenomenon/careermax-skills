---
name: careermax-resume-reviewer
description: Get AI-powered resume feedback and optimization. Use when the user says "review my resume", "improve my resume", "optimize my resume", "what's wrong with my resume", or wants resume advice.
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

# CareerMax Resume Reviewer

Get AI-powered feedback on your resume and optimize specific sections for target roles.

## Setup

1. Get an API key from [CareerMax Settings](https://careermax.ai/dashboard/settings/api-keys)
2. Set the environment variable: `export CAREERMAX_API_KEY="cmx_live_..."`

## How It Works

1. The skill connects to CareerMax via the `@careermax/agent-toolkit` MCP server
2. It reads your stored resume from CareerMax — no need to upload anything
3. AI analyzes your resume and provides structured feedback on content, formatting, and impact
4. You can also optimize specific text sections with targeted suggestions

## Tools

- `resume_get` — View your current resume data
- `resume_review` — Run an AI review of your resume, optionally tailored to a specific job (costs 1 credit, preview/confirm)
- `resume_optimize` — Optimize a specific section of your resume text (costs 1 credit, preview/confirm)

## Usage

```bash
# Install the MCP server
npx @careermax/agent-toolkit mcp

# Or use the CLI directly
npx @careermax/agent-toolkit resume get
npx @careermax/agent-toolkit resume review
npx @careermax/agent-toolkit resume review --job-id <id>
```
