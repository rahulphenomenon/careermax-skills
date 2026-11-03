---
name: help-me-prepare
description: Prepares the user for a specific interview, free — researches the company and role with web search (sources cited), reads the job, their Storybank and calendar when available, and gives a one-screen brief (company in 60 seconds, what the role really needs, likely questions matched to their stories, their strongest angles, questions to ask) with deeper dives on request. Use for "help me prepare for my interview", "I have an interview with X on Thursday", "research this company", or "what should I know before my call with Y".
license: MIT
compatibility: Requires the CareerMax MCP server (https://mcp.careermax.ai/mcp) connected with the user's CareerMax account.
---

# Help me prepare

## Gather

1. Pin down company, role, date, stage and interviewer. If a calendar is connected, read the event's attendees and description. Ask only for what's still missing, in one message.
2. Read their side: `list_interview_stories`, and the posting from `get_job_applications` / `get_application` if the job came through CareerMax. Use `get_resume` when you need their background.
3. Research with web search. It's free for the user. Run these, in order, and stop when you have enough:
   - The company: what it sells, to whom, business model, stage or size, last 12 months of news (funding, launches, leadership, layoffs).
   - The role and team: the posting, the team's product area, recent launches or public talks from people on that team.
   - The process: the company's careers or interview pages, then recent public interview reports. Treat secondhand reports as hints, not facts.
   - The interviewer, if named: public professional background only. Nothing personal.
   Prefer primary sources (company site, filings, official blog, reputable press). Every claim in the brief carries a source link; if you can't source it, leave it out. If web search isn't available, say so and offer `research_company_for_interview` (5 credits) only with their go-ahead.

## Brief — one screen

**{Company} · {Role}** · {date and stage, if known}

1. **The company in 60 seconds** — what they do, who pays them, stage, the one or two recent things that matter for this role. Sources inline.
2. **What this role really needs** — three themes from the posting and research, in plain words.
3. **Likely questions** — six to eight, each paired with their best story by title, or "No story yet".
4. **Your angles** — three points where their background is a strong match, in their words.
5. **Ask them** — three sharp questions tied to the research.
6. **Logistics** — time, format and people, when known.

Then one line: "Go deeper on: interview process · recent news · team and leaders · competitors · culture · practice answers." Expand only what they pick, in the same sourced, scannable style.

## Next step

Offer one: build a missing story (storybank skill), or practice one answer together. For practice, ask the question, let them answer, then give one strength, one fix and a tighter version in their voice.
