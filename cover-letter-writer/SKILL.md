---
name: careermax-cover-letter-writer
description: Deprecated compatibility entry point for CareerMax cover-letter workflows. Install and use the primary careermax skill instead.
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

# CareerMax Cover Letter Writer (Deprecated)

This focused skill has moved to the primary `careermax` skill and remains only
for one transition release.

Install the primary skill:

```sh
npx skills add rahulphenomenon/careermax-skills --skill careermax
```

Use the primary skill for cover-letter drafts and all other supported CareerMax
agent workflows.
