---
name: daily-brief
description: Runs the CareerMax daily job brief — fetches today's jobs, scores each one against the user's background and preferences, shows a ranked picker so they can choose what to apply to, and lists anything waiting on them (application questions, reviews, employer emails). Use for "what's new", "show me today's jobs", "find me jobs", "run my CareerMax daily brief", and scheduled morning runs.
license: MIT
compatibility: Requires the CareerMax MCP server (https://mcp.careermax.ai/mcp) connected with the user's CareerMax account.
---

# Daily brief

The user should be able to decide what to apply to in under two minutes, usually on their phone.

## Flow

1. Call `get_account_overview` and `get_todays_jobs`.
   - `refreshing`: tell the user today's jobs are being found, wait briefly and call `get_todays_jobs` again (at most twice).
   - `needs_preferences`: switch to the get-started skill.
   - No jobs: say so plainly and skip to step 4.
2. Score every job 0-100 against the user's résumé, profile and preferences. Use only facts you have; never invent experience.
   - Role and level fit (40): title, seniority, scope versus their history.
   - Skills and experience (30): their real experience against the must-haves.
   - Logistics (20): location and work model, pay against their floor, sponsorship and work authorization.
   - Signals (10): company stage and relevance, recency.
   - Deal-breakers cap the score at 40 and must be named: needs sponsorship but the job doesn't sponsor, on-site somewhere they won't move to, pay clearly below their floor, two or more levels off.
   - `reason`: under 15 words, the specific link between the job and something real in their background ("Your Stripe ledger work maps to their payments team"). No generic praise, and don't repeat title, pay or location; the card shows them.
   - `concern`: one line only when there is a real gap or deal-breaker.
3. Call `show_job_picker` with every job, highest score first. The card lets the user tick jobs and tap Apply; it checks credits and shows live progress.
   Then write a short message: one headline line ("14 new jobs today; 3 stand out."), the top three in a sentence each, and "Tick the ones you want and tap Apply." If the assistant can't show cards (for example in a terminal agent), list the top jobs as a numbered list with score and reason, and ask which numbers to apply to.
4. Needs you: if `needsYou.applications` > 0, call `get_applications` and mention each one in a line (job, what's needed). If `needsYou.unreadEmployerEmails` > 0, call `get_employer_emails`, summarize each new email in a line and offer to draft replies.
5. When the user names jobs in chat instead of using the card, call `apply_to_jobs` with those item IDs and continue with the applications skill.

## Scheduled runs

When this runs on a schedule there may be nobody reading yet. Do the same steps, keep the message scannable, and end with the picker. Don't ask questions that need an immediate answer.

## Style

Plain, warm, brief. No hype words, no exclamation marks, no recap of what the card already shows.
