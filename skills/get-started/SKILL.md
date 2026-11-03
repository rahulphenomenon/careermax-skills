---
name: get-started
description: Sets up CareerMax in one pass — takes the user's resume (or a description of their experience), drafts their whole profile including every detail Auto Apply needs, shows it once for approval, saves it with one call, shows today's best jobs, then sets up the two daily briefs at times the user picks. Use for "help me find a job", "set up CareerMax", "start my job search", "get started with CareerMax", or when CareerMax says setup is missing.
license: MIT
compatibility: Requires the CareerMax MCP server (https://mcp.careermax.ai/mcp) connected with the user's CareerMax account.
---

# Get started

Goal: from "help me find a job" to a shortlist they can apply from, with one question, one approval and one choice of times.

## 1. Check what exists

Call `get_account_overview`. If setup is complete, say so in a line and run the job-search-brief skill. If `get_resume` already has a résumé, use it and skip the ask in step 2.

## 2. Ask once

"Share your résumé (attach it or paste it), or tell me about your experience."

## 3. Draft everything, show it once

Draft from the résumé and what you already know about them. Auto Apply can't start until every **For applications** line is filled, so draft all of them now; leave a line blank only when you truly don't know it, and ask for those in the same message.

**Your CareerMax setup**
- **Résumé:** 3-5 lines (recent roles, years, top skills)
- **Looking for:** roles · locations · remote, hybrid or on-site · level · minimum pay (only if they said)
- **For applications:** legal first and last name · phone with country code · street address, city, postal code, country · work authorization and whether they need sponsorship · LinkedIn
- **Applicant email:** a handle from their name, e.g. averychen@apply.myresume.page. It's permanent; employers write to it and CareerMax forwards their emails.
- **Daily outreach:** On. 3 companies a day worth reaching out to, 1 credit each, free when nobody is found.
- **How applying works:** applications use 1 credit each. With Review before submit on (the default), they see every application before it's sent.

Then: "Reply 'looks good', or tell me what to change. I still need: <missing items>."

## 4. Save

Apply edits in chat and show only the lines that changed. On approval call `complete_setup` once, with their IANA time zone if you know it. If it returns errors, nothing was saved: fix what you can and ask only for facts you don't have.

## 5. First brief

Run the job-search-brief skill (full brief).

## 6. Set up the daily briefs

Offer the routine once. Two short briefs work better than one long one:

- **Apply brief, evening** — today's new jobs as a shortlist, applications that need them, referral notes drafted for today's submissions. Evenings are when most people have time, and it catches jobs within a day of posting.
- **Outreach brief, morning** — today's outreach companies and people, approved notes sent during the recipient's working day, employer emails, follow-ups.

Ask one question with ranges, defaults in bold: "When should they run? Apply brief between 6 and 9 PM (**7 PM**), outreach brief between 9 and 11 AM (**10 AM**), weekdays." Use their time zone.

Then set them up for the assistant you're running in:
- **Claude:** if you can create scheduled tasks here, create both after they confirm. Otherwise give the steps: open **Scheduled**, create a task with *Run my CareerMax apply brief* at their evening time, and a second with *Run my CareerMax outreach brief* at their morning time, weekdays. Scheduled tasks need a paid Claude plan; on a free plan they can say either prompt when they want it.
- **ChatGPT:** create both scheduled tasks at their chosen times after they confirm.
- **Other assistants:** suggest their scheduler, or a reminder with the same two prompts.

## Style

- Never invent résumé facts, dates or numbers. Blank beats a guess.
- Propose, then confirm. Don't ask open questions you can answer from the résumé.
- If a tool says they need more credits or a paid plan, relay its message and link once.
