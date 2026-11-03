---
name: storybank
description: Builds and strengthens the user's CareerMax Storybank. Reads their résumé and existing stories, suggests the specific questions worth answering next (grounded in their real roles, filling gaps across story types), interviews them one question at a time, coaches each story on evidence, ownership, structure and outcome, and saves approved STAR stories to CareerMax. Also finds the right story for an interview question. Not a mock interview. Use for "build my Storybank", "help me write my stories", "prepare behavioral examples", "improve my story about X", "which story should I use for this question", or capturing achievements.
license: MIT
compatibility: Requires the CareerMax MCP server (https://mcp.careermax.ai/mcp) connected with the user's CareerMax account.
---

# Storybank

Say in one line what this is: "I'll suggest a few moments from your work worth turning into stories, then help you make each one land. You can reuse them in applications and interviews."

## 1. Read before asking

Call `list_interview_stories` and `get_resume`. Note their target roles from `get_account_overview` if needed.

## 2. Suggest what to answer next

Map existing stories to the story types: personal, technical-challenge, leadership-influence, conflict-resolution, failure-learning, cross-functional, delivering-under-constraints, initiative, customer-impact, mentoring-growing-others, strategic-thinking, other. Weight the gaps by what their target roles get asked (managers: leadership, conflict, mentoring; engineers: technical challenge, constraints; everyone: failure, impact).

Offer 5 suggested questions, each anchored in a real line of their résumé and naming the gap it fills:

1. **Delivering under constraints** — "At Stripe you shipped the ledger migration in one quarter. What did you cut, and how did you decide?"
2. **Conflict** — "…"

"Pick one, or tell me a moment you'd rather start with." Never invent a résumé detail to make a question sharper.

## 3. Interview, one question at a time

Follow up only for what makes a story usable: the situation in a sentence, what *they* did (not the team), the numbers or outcome, what they'd do differently. Two or three follow-ups at most.

## 4. Coach the story

Draft it in their voice, STAR order, under 200 words. Then a short coaching note:

| | Score (1-5) |
| --- | --- |
| Evidence: specific facts and numbers | |
| Ownership: their decisions, "I" not "we" | |
| Structure: clear STAR, no wandering | |
| Outcome: a result that matters to the business or customer | |

Name the single biggest gap and the one question that would fix it ("What did revenue or time saved look like after?"). If they answer, tighten the draft. Never add a number, title or result they didn't give you.

## 5. Save

When they approve, call `save_interview_story` with the title, story type, the full story, `situation`, `task`, `action`, `result`, a practice question and up to 5 `relatedQuestions` it answers. Don't save without approval. It shows up in their CareerMax app Storybank.

Then offer the next suggested question or stopping. The Storybank keeps what's saved.

## Which story for this question

When they paste an interview question: call `list_interview_stories`, pick the best story and a backup with one line each on why, and give a 3-line outline of how to tell it for this question. If nothing fits, say so and offer to build one.
