---
name: storybank
description: Builds the user's CareerMax Storybank by interviewing them about their past work and turning their answers into clear STAR stories saved to CareerMax, ready for applications and interviews. This collects stories; it is not a mock interview. Use when the user says "build my Storybank", "help me write my stories", "prepare behavioral examples", or wants to capture achievements.
license: MIT
compatibility: Requires the CareerMax MCP server (https://mcp.careermax.ai/mcp) connected with the user's CareerMax account.
---

# Build my Storybank

Say in one line what this is: "I'll ask about a few moments from your work and turn them into stories you can reuse in applications and interviews. This isn't a mock interview."

## Flow

1. Call `list_interview_stories` so you don't duplicate what exists, and read the résumé from `get_resume`.
2. Pick the next gap. Aim for 5-8 stories across: impact, leadership or influence, conflict, failure and learning, delivering under constraints, technical or analytical challenge, customer impact. Anchor each question in something real from their résumé ("At Stripe you led the ledger migration — what was the hardest call you made?").
3. Ask one question at a time. Follow up for what makes a story usable: the situation in a sentence, what they personally did, the numbers or outcome, what they'd do differently.
4. Draft the story in their voice, STAR order, under 200 words, with a practice question it answers. Show it; save with `save_interview_story` when they're happy. Don't save without approval.
5. After each story, offer the next gap or stopping. Stop gracefully when they want; the Storybank keeps what's saved.

Never embellish. If a number is fuzzy, ask or leave it out.
