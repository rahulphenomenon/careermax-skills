---
name: job-search-brief
description: Runs the CareerMax job search brief — picks the user's top 5 from today's ranked jobs with a one-line reason each and shows the picker (with every other job under View all and Find more jobs), lists applications and employer emails that need them, and runs daily outreach. Has an evening apply mode and a morning outreach mode for the two scheduled briefs. Use for "run my CareerMax job search brief", "run my CareerMax apply brief", "run my CareerMax outreach brief", "what's new in my job search", "today's jobs", "find me jobs", "show me more jobs", and scheduled runs.
license: MIT
compatibility: Requires the CareerMax MCP server (https://mcp.careermax.ai/mcp) connected with the user's CareerMax account.
---

# Job search brief

The user should be able to decide what to apply to in under two minutes, usually on their phone.

## Which brief

| Prompt | Sections |
| --- | --- |
| "Run my CareerMax apply brief" (evening) | Jobs → Needs you → Referrals |
| "Run my CareerMax outreach brief" (morning) | Outreach → Inbox → Follow-ups |
| Anything else ("job search brief", "today's jobs", "find me jobs") | Jobs → Needs you → Outreach |

Always start with `get_account_overview`. If setup is missing, switch to the get-started skill.

## Jobs

1. `get_todays_jobs`. Jobs come best first with CareerMax's fit score, match tags and any concern.
   - `refreshing`: say today's jobs are being found, wait briefly and call again (at most twice).
   - `needs_preferences`: switch to the get-started skill.
2. Choose the **top 5** against their real background, not just the score. Deal-breakers (cap at 40, and name them): needs sponsorship the job doesn't offer, on-site somewhere they won't move to, pay clearly below their floor, two or more levels off.
   - `reason`: under 15 words, the specific link to something real ("Your Stripe ledger work maps to their payments team"). No generic praise.
   - `concern`: only for a real gap.
3. `show_job_picker` with those 5 in your order. The card shows them, lists every other queued job under **View all**, and has **Find more jobs**.
4. One headline and the top three in a sentence each: "14 new jobs today; 3 stand out." Then "Tick the ones you want and tap Apply, or open View all for the rest."

When they ask for more ("more jobs", "anything else?"), call `find_more_jobs`, then `show_job_picker` with your top picks among the new ones. Relay its message as is when it adds nothing (daily limit, caught up, free plan).

If cards don't render, list the 5 numbered with the reason, say how many more are queued, and ask which numbers to apply to.

## Needs you

If `needsYou.applications` > 0, call `get_job_applications` and give each one a line (job, what's needed). Unread employer emails go in Inbox below, or here in the full brief.

## Referrals (apply brief)

For applications submitted since the last brief, offer referral notes: find people with `find_people_at_company` (mode referral; 1 credit each, refunded when nobody is found; ask before running more than one) and show them with `show_people_picker`. Draft notes for the people they pick with `show_outreach_notes`. Never send on a scheduled run.

## Outreach (outreach brief and full brief, when it's on)

- If `outreach.today` has companies, the brief already ran today: show them again and search nothing.
- Otherwise pick the companies as the server instructions describe and call `find_outreach_contacts` once.
- Show each company as a short block:

  **Acme** · acme.com
  Hiring two senior product designers after a Series B in August ([source](https://example.com)).
  - Priya Shah, Design Director: leads the team you'd join.
  - Sam Lee, Staff Product Designer: your fintech work overlaps theirs.
  - Jo Park, Recruiter: owns design hiring.

- People order: hiring manager or team lead in their function, then senior peers, then recruiters. Skip anyone without an email unless nobody else fits.
- Offer one note: "Want me to draft a note to Priya?" Under 120 words, one concrete link to their experience, an easy ask, signed with their name.
- In the morning brief, offer to send referral and outreach notes they approved but haven't sent yet (`send_outreach_email`, one person at a time), during the recipient's working day.

## Inbox (outreach brief)

`get_employer_emails`: one line per email that needs them, newest first, with a drafted reply offered for each. Send only with `reply_to_employer_email` after they approve the exact text.

## Follow-ups (outreach brief)

From `get_job_applications`, applications submitted 7 or more days ago with no employer reply: suggest one short follow-up for the best one or two, nothing more.

## Scheduled runs

Nobody may be reading yet. Do the same steps, keep it scannable, end with the picker (apply brief) or the companies and drafts (outreach brief), and don't ask questions that need an answer now. Never send anything on a scheduled run. Daily outreach was approved when the user turned it on.

## Style

Plain, warm, brief. No hype, no exclamation marks, no recap of what the card already shows.
