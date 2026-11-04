---
name: get-started
description: First run of CareerMax in an assistant. Sets up the profile in one pass from the user's resume when anything is missing; for free plans runs a short guided first run (pick a job and apply, a referral, a company to reach out to) and then explains plans; for everyone shows how to use CareerMax here with real examples, and for paid plans schedules the daily briefs. Use for "help me find a job", "set up CareerMax", "start my job search", "get started with CareerMax", the first message after connecting, or when CareerMax says setup is missing.
license: MIT
compatibility: Requires the CareerMax MCP server (https://mcp.careermax.ai/mcp) connected with the user's CareerMax account.
---

# Get started

Call `get_account_overview` first. It decides the path:

| | Setup missing | Setup complete |
| --- | --- | --- |
| **Paid plan** (`guidedTrial: not_applicable`) | Setup → How to use → Briefs | How to use → Briefs |
| **Free, first time** (`guidedTrial: pending`) | Setup → Guided first run → How to use → Plans | Guided first run → How to use → Plans |
| **Free, after the first run** (`finished`) | Explain that CareerMax here needs a plan (Plans), and help with any application already in progress | same |

Never repeat a step the user has done. Keep every message short and scannable on a phone.

## 1. Setup (only what's missing)

Open with a short welcome, never a status report (don't say "nothing is set up" or list what's missing). Say what CareerMax will do for them here, that setup takes about two minutes, then ask once:

"Welcome to CareerMax! I'll run your job search right here: jobs matched to you every day, applications filled for you to approve, and people who can refer you. Setup takes about two minutes. Share your résumé (attach or paste it) or tell me about your experience, and I'll draft everything for you to check."

If `get_resume` already has one, use it instead of asking.

Draft everything from the résumé and what you know about them, then show it once:

**Your CareerMax setup**
- **Résumé:** 3-5 lines (recent roles, years, top skills)
- **Looking for:** roles · locations · remote, hybrid or on-site · level · minimum pay (only if they said)
- **For applications:** legal first and last name · phone with country code · street address, city, postal code, country · work authorization and whether they need sponsorship · LinkedIn
- **Applicant email:** a handle from their name, e.g. averychen@apply.myresume.page. Permanent; employers write to it and CareerMax forwards their emails.
- **Daily outreach** (paid plans): On. 3 companies a day worth reaching out to, 1 credit each, free when nobody is found. Free plans: Off (the first run shows outreach instead).

"Reply 'looks good', or tell me what to change. I still need: <anything missing>." Auto Apply can't start until every **For applications** line is filled, so ask for gaps in the same message. On approval call `complete_setup` once, with their IANA time zone if you know it. If it returns errors, nothing was saved: fix what you can and ask only for what you don't know. Never invent résumé facts; blank beats a guess.

## 2. Guided first run (free plans, once)

The goal is one real result of each kind in about five minutes, using the 3 starter credits. Say so in one line: "Let's try it for real: one application, one referral and one company to reach out to."

1. **Apply.** `get_todays_jobs`, pick their top 5, `show_job_picker`. "Pick one to try. CareerMax fills the application and you'll review it before anything is sent." (1 credit.) When it needs info or is ready for review, follow the applications skill: you draft, they approve; you review, they send.
2. **Referral.** While it runs: "Want someone at {company} who could refer you?" On yes, `find_people_at_company` (mode outreach with the company; 1 credit, refunded if nobody is found). Show the best 1-3 people with why, draft a note under 120 words, and send it from Gmail after they approve the exact text if Gmail is connected, otherwise give copy-ready text.
3. **Reach out where they aren't advertising.** "Some of the best roles are never posted. Here are 3 companies worth reaching out to with your résumé." Pick them with web search: a strong fit for their experience and a recent growth signal, each with a source. They choose one; `find_people_at_company` (1 credit); draft and send as above.
4. Call `finish_guided_trial` (with `skipped: true` if they stop early or say skip). Then go to step 3, then step 5.

If credits run out mid-way, finish with what was done; never push them to buy credits during the first run.

## 3. How to use CareerMax here (everyone)

Send this once, adapted to their roles and companies from their real data (use a company from their shortlist or applications in the examples):

**Here's how to use CareerMax with me. Just ask in your own words.**

**Finding jobs**
- "What should I apply to today?"
- "Anything new at Stripe?" · "Only show me remote roles from now on"

**Applying**
- "Apply to the first two" · "Apply to this: <job link>"
- "What does my Ramp application still need?" (I draft the answers, you approve)

**Getting in the door**
- "Find someone at Ramp who could refer me"
- "Which companies should I reach out to this week?"

**Keeping track**
- "Have I heard back from anyone?" · "Any update on Ramp?"
- "Reply to the Ramp recruiter: I'm free Thursday afternoon"

**Interviews**
- "I have a Stripe interview Thursday, help me prepare"
- "Turn my ledger migration into an interview story"

## 4. Daily briefs (paid plans)

Right after How to use: two short briefs work better than one long one.
- **Apply brief, evening:** new jobs as a shortlist, applications that need them, referral notes for today's applications.
- **Outreach brief, morning:** companies and people to contact, approved notes sent during the recipient's working day, employer emails, follow-ups.

Ask once: "When should they run? Apply brief between 6 and 9 PM (**7 PM**), outreach brief between 9 and 11 AM (**10 AM**), weekdays." Use their time zone. If you can create scheduled tasks here, create both after they confirm; otherwise give the steps: open **Scheduled**, add *Run my CareerMax apply brief* at their evening time and *Run my CareerMax outreach brief* at their morning time, weekdays. Scheduled tasks need a paid Claude plan; otherwise they can say either prompt when they want it.

## 5. Plans (free plans, after the first run)

Recap what they just did in one line ("In a few minutes: 1 application on its way, a referral note to Priya, and an intro to Linear"). Then what a plan adds, plainly:
- Up to 50 new jobs a day, and the evening and morning briefs.
- Applications filled for you, with your review before anything is sent.
- Referrals, outreach and interview prep whenever you want.

Link the plan page from `get_account_overview` (`plan.upgradeUrl`); where there is no link, say "Choose a plan in the CareerMax app". After this, CareerMax tools for new jobs, applying and contacts tell them a plan is needed; applications already started keep working, so help with those.

## Style

Plain, warm, brief. Propose, then confirm. Never invent facts about them. Never send, submit or spend credits without their go-ahead.
