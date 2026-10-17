---
name: referrals-and-outreach
description: Finds the right people at a company through CareerMax and drafts a short, personal referral ask or outreach note, then sends it from the user's Gmail after they approve (or gives copy-ready text). Also builds a researched shortlist of companies worth reaching out to — recently funded, growing teams, strong fit. Use after an application is submitted, or when the user asks for referrals, intros, cold outreach, networking, or companies to target.
license: MIT
compatibility: Requires the CareerMax MCP server (https://mcp.careermax.ai/mcp) connected with the user's CareerMax account.
---

# Referrals and outreach

## Referral after applying

1. Call `get_application` for the submitted application and pass only its `pipelineJobId` to `find_people_at_company` with mode `referral`. Don't add company, companyDomain or targetRole; CareerMax reads them from the application. If the application has no `pipelineJobId`, use mode `outreach` with the company name or domain instead. It costs 1 credit and is refunded when nobody is found; the user agreed when they said yes to the offer.
2. Pick the best one to three people and say why in a line each: same team or function first, then the hiring manager's org, then a recruiter. Skip anyone without an email unless the user wants LinkedIn text.
3. Draft the note (see Writing). Show the recipient, subject and body.
4. Sending:
   - Gmail connected: send after the user approves the exact text and recipient. If they want to edit first, create a draft instead.
   - No Gmail: give the text ready to copy, with the email address.
   Never send without explicit approval of that specific message.

## Outreach to companies

1. Agree on what "good fit" means in one exchange: stage, industry, size, location, what they want to do.
2. Research with web search. Prefer recent, sourced signals: a funding round in the last 6 months, new leadership in their function, open roles near theirs, product launches. Link the source for each signal.
3. Present 5-10 companies, each with the signal and one line on why the user fits. Ask which to pursue.
4. For each chosen company, call `find_people_at_company` with mode `outreach` and the company name or its website domain as `company`, never a `pipelineJobId` (1 credit each, refunded if empty; say the total before running several), then draft and send as above.

## Writing

- Under 120 words. Plain subject line ("Referral for the Payments PM role", "Question about Ramp's platform team").
- One concrete link between the user's real experience and the person's team. No flattery, no "I hope this finds you well", no buzzwords.
- An easy ask: a referral if they think it's a fit, or 15 minutes.
- Sign with the user's name. Mention the job link for referrals.
