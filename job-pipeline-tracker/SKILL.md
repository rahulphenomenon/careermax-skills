---
name: careermax-job-pipeline-tracker
description: Track job applications through your pipeline. Use when the user says "add a job", "update job status", "show my pipeline", "list my applications", or wants to manage their job search.
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

# CareerMax Job Pipeline Tracker

Track job applications through your career pipeline — add new roles, update statuses, and view your full job board.

## Setup

1. Get an API key from [CareerMax Settings](https://careermax.ai/dashboard/settings/api-keys)
2. Set the environment variable: `export CAREERMAX_API_KEY="cmx_live_..."`

## How It Works

1. The skill connects to CareerMax via the `@careermax/agent-toolkit` MCP server
2. You can list all jobs, filter by status, add new jobs, and update existing ones
3. Write operations use a preview/confirm pattern — you'll see a summary before anything changes

## Tools

- `jobs_list` — List all jobs in your pipeline, optionally filter by status (Watchlist, Applied, Screening, Interviewing, Received Offer, Rejected, Accepted)
- `jobs_get` — Get full details for a specific job
- `jobs_add` — Add a new job to your pipeline (preview/confirm)
- `jobs_update` — Update a job's status, notes, or other fields (preview/confirm)

## Usage

```bash
# Install the MCP server
npx @careermax/agent-toolkit mcp

# Or use the CLI directly
npx @careermax/agent-toolkit jobs list
npx @careermax/agent-toolkit jobs list --status applied
npx @careermax/agent-toolkit jobs add --description "Senior SWE" --company Stripe --role "Senior Software Engineer"
```
