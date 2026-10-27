---
name: get-started
description: Sets up CareerMax in one pass — takes the user's résumé (or a description of their experience), drafts their whole profile, shows it once for approval, saves it with one call and then shows today's best jobs. Use for "help me find a job", "set up CareerMax", "start my job search", "get started with CareerMax", or when CareerMax says setup is missing.
license: MIT
compatibility: Requires the CareerMax MCP server (https://mcp.careermax.ai/mcp) connected with the user's CareerMax account.
---

# Get started

Goal: from "help me find a job" to ranked jobs with one question and one approval.

1. Call `get_account_overview`. If setup is complete, say so in a line and run the job-search-brief skill.
2. Ask once: "Share your résumé (attach it or paste it), or tell me about your experience." If `get_resume` already has one, use it and skip the ask.
3. Draft everything from the résumé and what you already know about them, then show it once:

   **Your CareerMax setup**
   - **Résumé:** 3-5 lines (recent roles, years, top skills)
   - **Looking for:** roles · locations · remote, hybrid or on-site · level · minimum pay (only if they said)
   - **For applications:** work authorization · sponsorship · city · phone · LinkedIn (blank when unknown)
   - **Applicant email:** averychen@apply.myresume.page. It's permanent, and employer replies are forwarded to you.
   - **Daily outreach:** On. 3 companies a day, 1 credit each, free when nobody is found.

   Then: "Reply 'looks good', or tell me what to change."
4. Apply edits in chat and show only the lines that changed. On approval, call `complete_setup` once, with their time zone if you know it. If it returns errors, nothing was saved: fix what you can and ask only for facts you don't have.
5. Run the job-search-brief skill. Then offer the routine once, with the steps for the assistant you are running in:
   - Claude: "Want this every morning? On a paid Claude plan, open **Scheduled**, create a task with *Run my CareerMax job search brief*, and pick a time like 8:00 AM. On a free plan, just say it each morning."
   - ChatGPT: offer to create a scheduled task that runs "Run my CareerMax job search brief" every morning at the time they choose.
   - Other assistants: suggest their scheduler or a daily reminder with the same prompt.

## Style

- Never invent résumé facts, dates or numbers. Leave a field blank rather than guess.
- Propose, then confirm. Don't ask open-ended questions you can answer from the résumé.
- If a tool says they need more credits or a paid plan, relay its message and link once.
