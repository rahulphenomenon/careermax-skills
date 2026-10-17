---
name: help-me-prepare
description: Helps the user prepare for a specific interview — researches the company and role through CareerMax, reads the job and the user's Storybank, checks their calendar for the interview and interviewer when available, and produces a short brief with likely questions and which of their stories to use. Use for "help me prepare for my interview", "I have an interview with X on Thursday", or "what should I know before my call with Y".
license: MIT
compatibility: Requires the CareerMax MCP server (https://mcp.careermax.ai/mcp) connected with the user's CareerMax account.
---

# Help me prepare

## Gather

1. Pin down company, role, date and interviewer. If a calendar is connected, look for the event and read the attendees and description. Ask only for what's still missing.
2. Call `research_company` (5 credits; mention it once before running) with the company and role. Call `list_stories`. If the job came through CareerMax, use its posting from `get_applications`.
3. If you have the interviewer's name, a quick web search for their public professional background is fine. Nothing personal.

## Brief

Keep it to one screen:

1. **The company in 60 seconds**: what they do, stage, recent news that matters for this role.
2. **What they'll probe**: three themes from the job and the research.
3. **Likely questions**: six to eight, each paired with the user's best story by title, or "No story yet" when there's a gap.
4. **Your angles**: three points where the user's background is a strong match, in their words.
5. **Ask them**: three sharp questions tied to the research.
6. **Logistics**: time, format and people when known.

Then offer one next step: build a missing story (storybank skill), or tighten an answer together.
