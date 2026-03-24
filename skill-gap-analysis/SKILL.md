---
name: careermax-skill-gap-analysis
description: Careermax (careermax.ai) — identify skill gaps for target roles with learning plans, resources, and quizzes. Use when the user says "what skills do I need", "skill gap", "learning plan", "study for role", "quiz me", "prepare for role", or wants to upskill for a target position.
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

# Careermax Skill Gap Analysis

Identify skill gaps for your target roles, get personalized learning plans, curated resources, and skill quizzes.

## Setup

1. Get an API key from [Careermax Settings](https://careermax.ai/dashboard/settings/api-keys)
2. Set the environment variable: `export CAREERMAX_API_KEY="cmx_live_..."`

## How It Works

1. The skill connects to Careermax via the `@careermax/agent-toolkit` MCP server
2. View your personalized learning plan based on your profile and target roles
3. Generate curated learning resources for specific topics or skill areas
4. Take quizzes to test your knowledge and track progress over time

## Tools

- `learning_plan` — View your personalized learning plan based on target roles
- `learning_quizzes` — List past quiz sessions and scores
- `learning_resources` — Generate curated learning resources for a topic (costs 5 credits, preview/confirm)
- `learning_quiz` — Generate a skill quiz on a specific topic (costs 1 credit, preview/confirm)

## Usage

```bash
# Install the MCP server
npx @careermax/agent-toolkit mcp

# Or use the CLI directly
npx @careermax/agent-toolkit learning plan
npx @careermax/agent-toolkit learning resources --topic "system design"
npx @careermax/agent-toolkit learning quiz --topic "distributed systems"
npx @careermax/agent-toolkit learning quizzes
```
