---
name: job-search-brief
description: Runs the CareerMax job search brief — ranks today's new jobs against the user's experience with a one-line reason each, shows a picker so they choose what to apply to, adds today's outreach companies and the people to contact there when daily outreach is on, and lists anything waiting on them. Use for "run my CareerMax job search brief", "my job search brief", "what's new in my job search", "today's jobs", "find me jobs", and scheduled morning runs.
license: MIT
compatibility: Requires the CareerMax MCP server (https://mcp.careermax.ai/mcp) connected with the user's CareerMax account.
---

# Job search brief

The user should be able to decide what to apply to in under two minutes, usually on their phone. The server instructions carry the flow; this adds the finish.

## Jobs

1. `get_account_overview` and `get_todays_jobs`.
   - `refreshing`: say today's jobs are being found, wait briefly and call `get_todays_jobs` again (at most twice).
   - `needs_preferences` or setup missing: switch to the get-started skill.
2. Score against their real background. Deal-breakers (cap at 40, and name them): needs sponsorship the job doesn't offer, on-site somewhere they won't move to, pay clearly below their floor, two or more levels off.
   - `reason`: the specific link to something real, such as "Your Stripe ledger work maps to their payments team". No generic praise.
   - `concern`: only for a real gap.
3. `show_job_picker` with every job, best first. Then one headline ("14 new jobs today; 3 stand out."), the top three in a sentence each, and "Tick the ones you want and tap Apply."

## Outreach (when it's on)

- If `outreach.today` has companies, the brief already ran today: show them again and search nothing.
- Otherwise pick the companies as the server instructions describe and call `find_outreach_contacts` once.
- Show each company as a short block:

  **Acme** · acme.com
  Hiring two senior product designers after a Series B in August ([source](https://example.com)).
  - Priya Shah, Design Director: leads the team you'd join.
  - Sam Lee, Staff Product Designer: your fintech work overlaps theirs.
  - Jo Park, Recruiter: owns design hiring.

- People order: hiring manager or team lead in their function, then senior peers, then recruiters. Skip anyone without an email unless nobody else fits.
- End with one offer: "Want me to draft a note to Priya?" The note is under 120 words, makes one concrete link to their experience, has an easy ask, and is signed with their name. Send from Gmail only after they approve the exact text; otherwise give copy-ready text.

## Needs you

If `needsYou.applications` > 0, call `get_job_applications` and give each one a line (job, what's needed). If `needsYou.unreadEmployerEmails` > 0, call `get_employer_emails`, summarize each in a line and offer to draft replies.

## Scheduled runs

Nobody may be reading yet. Do the same steps, keep it scannable, end with the picker and the outreach companies, and don't ask questions that need an answer now. Daily outreach was approved when the user turned it on.

## Style

Plain, warm, brief. No hype, no exclamation marks, no recap of what the card already shows.
