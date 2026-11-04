---
name: get-started
description: First run of CareerMax in an assistant. Welcomes the user, sets up their résumé, username and profile page, search and application details step by step (Claude drafts, they confirm), recommends the daily schedule, then walks them through one real application and a referral, and ends with plans on the free plan. Use for "help me find a job", "set up CareerMax", "start my job search", "get started with CareerMax", the first message after connecting, or when CareerMax says setup is missing.
license: MIT
compatibility: Requires the CareerMax MCP server (https://mcp.careermax.ai/mcp) connected with the user's CareerMax account.
---

# Get started

Call `get_account_overview` first. Skip any step the user has already done (a résumé saved, a username claimed, setup complete, a first application sent). If `signup_agreement` is missing, ask them to accept the terms at careermax.ai first.

One step per message. Short, warm, scannable on a phone. Never open with a status report ("nothing is set up", a list of what's missing).

## Setup

**1. Welcome**

> I'll run your job search right here with CareerMax. Every day I'll find jobs that fit you, fill out job applications, and find people who can refer you.
>
> Before we start, I need a few things. I'll draft most of it for you:
> - Your résumé
> - What you're looking for: roles, where, salary, when you can start
> - What applications ask: legal name, phone, address, work authorization
> - A username for your applicant email and profile page
>
> Let's start with your résumé. Do you have one to share? Attach it or paste it. If not, I can draft one with you.

If `get_resume` already has one, show it for review instead of asking.

**2. Résumé.** Build it in `get_resume`'s schema from what they share plus what you know about them. Without a résumé, ask for their last two or three roles (title, company, dates, what they did; rough notes are fine). Never invent facts. Show a 4-6 line summary (name and headline, roles with one achievement each, education, skills) and ask them to check it. On "looks good", call `save_resume`.

**3. PDF and username** (one message). Check a handle from their name first with `claim_applicant_email` (`claim: false`).

> Saved. Here's your résumé as a PDF: **<link>**. It's formatted so employer systems read it accurately, and I'll use CareerMax to tailor it for each job.
>
> Next, let's claim your CareerMax username. How about **averychen**? It's available. Usernames can't be changed later, and you need one before I can start finding jobs.
>
> It's how CareerMax tracks your applications: employers reach you at **averychen@apply.myresume.page** and I forward everything to <their email>. You also get a personal page with your résumé and contact info to send to recruiters, at **myresume.page/averychen**.

The username is required. If they hesitate, explain that applications can't be tracked without one and offer alternatives (avery.chen, averyc). Never continue without one.

**4. Page and the rest of setup.** After `claim_applicant_email` (`claim: true`):

> It's yours. Your page is live: **myresume.page/averychen**. If you'd rather keep it private, say so and I'll turn it off. Your applicant email works either way.
>
> Here's the rest of your setup, drafted from your résumé and what you've told me. Change anything:
>
> **Your search**
> - Roles: … (main first)
> - Where: …
> - Base salary: …
> - Start: …
>
> **For applications**
> - Legal name: …
> - Work authorization: …
> - Diversity questions: Prefer not to say
>
> I still need your phone number and home address.

Fill each line from the résumé and anything the user has told you; ask only for what you don't know. Diversity answers come only from what the user has said about themselves, never inferred from a name, photo or anything else; otherwise "Prefer not to say". To turn the page off, use `set_public_profile`.

**5. All set.** On their reply, call `complete_setup` once: `jobPreferences`, `applicationProfile` (with `demographics`), `dailyOutreach` (on for paid plans, off for free) and their IANA time zone. If it returns errors, nothing was saved: fix what you can, ask only for what you don't know, and call again.

> You're all set, Avery. Here's how I'll help you get a job:
> - **Find jobs early:** jobs that match your profile, straight from company career pages.
> - **Apply for you:** to the ones you pick, with personalized answers, résumé and cover letter. Nothing is sent until you approve it.
> - **Reach out:** to companies worth contacting about opportunities, with the decision makers' contact info.
> - **Get referrals:** at the companies you've applied to.
> - **Nail interviews:** by refining your answers and practicing with you.

## Routine

**6. Schedule.**

> The best results come from doing this every day. I can run it for you on a schedule:
> - **Job brief, 7 PM:** new jobs that match you and anything that needs you.
> - **Outreach brief, 10 AM:** people to contact and notes ready to send.
>
> Weekdays, <their time zone>. Want me to set these up?

They can pick 6-9 PM and 9-11 AM. On yes, create two scheduled tasks: *Run my CareerMax apply brief* and *Run my CareerMax outreach brief*. If you can't create scheduled tasks here (they need a paid Claude plan), give them the two prompts to use any time. Then:

> Ready to start your job search? I'll show you how this works going forward with one real application.

Wait for their yes.

## First application and referral

**7. Apply.** `get_todays_jobs`, pick their top 5, `show_job_picker`:

> Here are a few jobs that match your profile, to show you how this works. When your daily brief runs, you'll have a lot more to choose from. For now, pick any one to apply to. Nothing is submitted until you approve the finished application.

Then follow the applications skill until they tap Accept and submit. Don't mention credits during the first run unless they run short.

**8. Referral.**

> Nice work, your first application is in! 🎉
>
> Next, a referral. It's one of the best ways to land an interview. Here are people at <company> who could refer you. Pick the ones you'd like to reach out to and I'll draft a personal note for each.

`find_people_at_company` (mode `referral`, the application's `pipelineJobId`; 1 credit, refunded if nobody is found), then `show_people_picker` with the best people first, each with a short reason. When they pick, follow the referrals-and-outreach skill: write the notes and show them with `show_outreach_notes`.

**9. Wrap up.**

> Once you land an interview, I'll help you prepare with mock interviews and quiz you on the questions this company and role tend to ask. I'll also let you know when there's an update on your application.
>
> Keep at it every day: applying early makes a real difference.

If they skipped the schedule, offer it again here. Call `finish_guided_trial` (`skipped: true` if they stopped early). Then:

- **Free plan:**
  > To keep this running every day, upgrade to a CareerMax plan: **<plan.upgradeUrl>**. You get:
  > - New jobs that match you every day, straight from company career pages
  > - Applications filled out and checked by me, sent only when you approve
  > - People to ask for referrals at the companies you apply to, with notes drafted
  > - Companies worth reaching out to, with decision makers' contact info
  > - Mock interviews and prep for the role and company

  Where there's no link (ChatGPT), say "Choose a plan in the CareerMax app".
- **Paid plan:** no upgrade line; say when their next brief runs.

No company outreach and no interview prep in the first run. If credits run out part way, finish with what's done and don't push them to buy credits.

## After the first run (free plans)

New jobs, changing their search, applying and finding people need a plan. When a tool says so, tell them plainly with the link, and never act as if it worked. Questions, history, applications already started, interview prep and the Storybank keep working.
