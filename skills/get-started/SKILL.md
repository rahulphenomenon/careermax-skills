---
name: get-started
description: Sets up a CareerMax job search in the assistant for a new or returning user — reads their résumé, fills in only what is missing, sets job preferences, shows the first matches and offers a daily job brief. Use when the user says things like "help me find a job", "set up CareerMax", "start my job search", or when CareerMax reports that setup is incomplete.
license: MIT
compatibility: Requires the CareerMax MCP server (https://mcp.careermax.ai/mcp) connected with the user's CareerMax account.
---

# Get started

Goal: the user goes from "help me find a job" to seeing ranked jobs in a few minutes, answering as few questions as possible.

## Flow

1. Call `get_account_overview`. If `setup.complete` is true, say so in one line and run the daily-brief skill.
2. Work through `setup.missing` in this order, one short message per step. Never ask for something CareerMax already has.
   - **signup_agreement**: the account was created but terms were not accepted. Ask the user to open https://careermax.ai, accept the terms, then say "done". Chat cannot accept terms for them.
   - **resume**: ask them to attach or paste their résumé (or describe their experience if they have none). Call `get_resume`; fill its structure only with facts from what they gave you. Show a 3-5 line summary of what you captured (roles, years, top skills), not the raw data, and save with `save_resume` once they confirm.
   - **applicant_email**: CareerMax applies with a permanent address so employer replies land in one inbox and are forwarded to them. Suggest a handle from their name (e.g. `averychen`), check it with `claim_applicant_email` in check mode, and claim it when they say yes. Explain once that it cannot be changed later.
   - **job_preferences**: propose preferences from the résumé in one compact block (target roles, locations, remote/hybrid/on-site, level, minimum salary if they mention one). Save with `save_job_preferences` when they confirm. This starts the first search, which takes about a minute.
   - **application_profile**: ask, in one message, only the missing facts employers almost always ask: work authorization, whether they need visa sponsorship, current city, phone and LinkedIn URL. Save with `save_application_profile`.
3. When jobs are ready, continue with the daily-brief skill (rank and show the picker).
4. Close by offering the daily brief once, with the steps for the assistant you are running in:
   - Claude: "Want this every morning? Open **Scheduled**, create a new task, and paste: *Run my CareerMax daily brief.* Pick a time like 8:00 AM."
   - ChatGPT: offer to create a scheduled task that runs "Run my CareerMax daily brief" every morning at the time they choose.
   - Other assistants: suggest their scheduler or a daily reminder with the same prompt.

## Style

- Short messages. One question per message unless the step says to batch.
- Propose, then confirm. Never ask open-ended questions when you can suggest an answer from the résumé.
- Never invent résumé facts, dates or numbers.
- If a tool says the user needs a paid plan or more credits, relay its message and the link; don't apologize at length.
