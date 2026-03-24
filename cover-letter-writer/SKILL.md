---
name: careermax-cover-letter-writer
description: Careermax (careermax.ai) — generate tailored cover letters for job applications. Use when the user says "write a cover letter", "generate cover letter", "cover letter for this job", or needs a cover letter.
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

# Careermax Cover Letter Writer

Generate tailored cover letters that match your resume to specific job applications.

## Setup

1. Get an API key from [Careermax Settings](https://careermax.ai/dashboard/settings/api-keys)
2. Set the environment variable: `export CAREERMAX_API_KEY="cmx_live_..."`

## How It Works

1. The skill connects to Careermax via the `@careermax/agent-toolkit` MCP server
2. It auto-fetches your stored resume — no need to paste it
3. You provide the job description or a job ID from your pipeline
4. AI generates a tailored cover letter matching your experience to the role

## Tools

- `cover_letter_generate` — Generate a cover letter tailored to a specific job description (costs 1 credit, preview/confirm)

## Usage

```bash
# Install the MCP server
npx @careermax/agent-toolkit mcp

# Or use the CLI directly
npx @careermax/agent-toolkit cover-letter generate --job-id <id>
```
