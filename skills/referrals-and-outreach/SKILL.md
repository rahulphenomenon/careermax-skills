---
name: referrals-and-outreach
description: Finds the right people at a company through CareerMax, lets the user pick who to contact, and drafts a short, personal email and LinkedIn note for each, sent from their CareerMax address after they approve (or copied). Also builds a researched shortlist of companies worth reaching out to — recently funded, growing teams, strong fit. Use after an application is submitted, or when the user asks for referrals, intros, cold outreach, networking, or companies to target.
license: MIT
compatibility: Requires the CareerMax MCP server (https://mcp.careermax.ai/mcp) connected with the user's CareerMax account.
---

# Referrals and outreach

## Referral after applying

1. Call `read_application` for the submitted application and pass only its `pipelineJobId` to `find_people_at_company` with mode `referral`. Don't add company, companyDomain or targetRole; CareerMax reads them from the application. If the application has no `pipelineJobId`, use mode `outreach` with the company name or domain instead. It costs 1 credit and is refunded when nobody is found; the user agreed when they said yes to the offer.
2. Call `show_people_picker` with the `searchId` and the best people first, each with a reason under 12 words: same team or function first, then the hiring manager's org, then a recruiter. The user selects who to contact; the card asks you to draft notes for them.
3. Draft the notes (see Writing) and call `show_outreach_notes`: an email (subject and body) for anyone with an email address, and a LinkedIn note under 300 characters for anyone with a LinkedIn profile. The card shows each draft with the address or profile, Copy, Open LinkedIn, and Send email when CareerMax can send it. For edits, call it again with the changes.
4. Sending: `send_outreach_email` sends one email from the user's CareerMax address, with the exact subject and body on the card, only when they ask for that person (their card message counts). Replies land in their CareerMax inbox and are forwarded to them. LinkedIn notes are never sent for them: they copy the note and open the profile. Never send on a scheduled run; the morning outreach brief offers notes to send during the recipient's working day.

## Outreach to companies

Daily outreach in the job search brief already suggests 3 new companies a day with people to contact (`find_outreach_contacts`); if it's off and the user wants that routine, offer to turn it on with `set_daily_outreach`. For a one-off list beyond that:

1. Agree on what "good fit" means in one exchange: stage, industry, size, location, what they want to do.
2. Research with web search. Prefer recent, sourced signals: a funding round in the last 6 months, new leadership in their function, open roles near theirs, product launches. Link the source for each signal.
3. Present 5-10 companies, each with the signal and one line on why the user fits. Ask which to pursue.
4. For each chosen company, call `find_people_at_company` with mode `outreach` and the company name or its website domain as `company`, never a `pipelineJobId` (1 credit each, refunded if empty; say the total before running several), then pick, draft and send as above.

## Writing

- Under 120 words. Plain subject line ("Referral for the Payments PM role", "Question about Ramp's platform team").
- One concrete link between the user's real experience and the person's team. No flattery, no "I hope this finds you well", no buzzwords.
- An easy ask: a referral if they think it's a fit, or 15 minutes.
- Sign with the user's name. Mention the job link for referrals.
