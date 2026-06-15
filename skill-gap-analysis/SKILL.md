---
name: careermax-skill-gap-analysis
description: Deprecated compatibility entry point for CareerMax learning workflows. Install and use the primary careermax skill instead.
version: 0.2.0
metadata:
  openclaw:
    requires:
      env:
        - CAREERMAX_API_KEY
      bins:
        - npx
    primaryEnv: CAREERMAX_API_KEY
    homepage: https://careermax.ai
---

# CareerMax Skill Gap Analysis (Deprecated)

This focused skill has moved to the primary `careermax` skill and remains only
for one transition release.

Install the primary skill:

```sh
npx skills add rahulphenomenon/careermax-skills --skill careermax
```

Use the primary skill for learning workflows and all other supported CareerMax
agent workflows.
