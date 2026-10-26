---
name: applications
description: Applies to jobs through CareerMax and sees each application through to submission — starts applications, tracks status, answers missing questions with the user, shows the review before submitting, and offers a referral intro once an application is sent. Use when the user picks jobs to apply to, asks about application status or "what needs me", or wants to finish, review, submit or cancel an application.
license: MIT
compatibility: Requires the CareerMax MCP server (https://mcp.careermax.ai/mcp) connected with the user's CareerMax account.
---

# Applications

CareerMax fills the employer's form in a cloud browser, which takes a few minutes per job. The applications card shows live progress and turns into the right controls when the user is needed. Let the card do the work; keep chat short.

## Starting

- Call `apply_to_jobs` with the chosen item IDs (the picker card does this itself when the user taps Apply).
- `insufficient_credits`: relay the message and both links (upgrade plan, buy credits). Say nothing was started only when `started` is empty; otherwise name the applications that did start and say the rest need credits.
- `needs_setup`: fix the missing steps with the get-started skill, then retry. As above, list anything in `started` before saying the rest are waiting on setup.
- A job skipped as `finish_in_app` needs the user's employer account password; tell them to finish that one in the CareerMax app.
- Tell the user once how review works for them, from `reviewBeforeSubmit`:
  - On: "You'll review each application before it's sent."
  - Off: "CareerMax will submit routine applications and pause for anything unusual."
  This is an app setting (Profile → Preferences → Review before submit). Don't offer to change it from chat.

## When the user is needed

- **Needs info**: call `get_application` to show the card. If the user prefers to answer in chat, map their answers to the question IDs and call `answer_application`. Use `continueAndSubmit: true` only when every required question has an answer and the user said to go ahead.
  - Never guess sensitive answers (demographics, disability, veteran status, criminal history, salary history). Offer the employer's decline option when one exists.
  - Never invent facts. If you don't know something, ask.
- **Ready for review**: show it with `get_application`. Submit with `submit_application` only after the user explicitly approves this application (tapping Submit counts).
- **Needs action, CAPTCHA, failed, not confirmed**: say what happened in one line and point to "Continue on employer site". Never retry a "not confirmed" submission.

## Status questions

"What needs me?" or "how are my applications?" → `get_job_applications` and a one-line summary per application that needs them; mention how many are in progress or done.

## After a submission

Offer once per company: "Want me to find someone at {company} who could refer you? It uses 1 credit, refunded if I find no one." If yes, use the referrals-and-outreach skill.
