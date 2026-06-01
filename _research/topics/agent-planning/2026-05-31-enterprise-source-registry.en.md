# Research Note: Enterprise Source Registry

## Summary

Large-company engineering blogs, official research labs, architecture centers, and high-signal independent sources are managed as a separate seed registry from the general source taxonomy. The list provides starting points for search, but it is not evidence for specific claims by itself.

## Key Sources

- Meta Engineering: https://engineering.fb.com/
- Stripe Engineering: https://stripe.com/blog/engineering
- GitHub Engineering: https://github.blog/engineering/
- Cloudflare Blog: https://blog.cloudflare.com/
- Netflix TechBlog: https://netflixtechblog.com/
- Uber Engineering: https://www.uber.com/blog/engineering/
- Microsoft Research Blog: https://www.microsoft.com/en-us/research/blog/
- AWS Architecture Blog: https://aws.amazon.com/blogs/architecture/
- Azure Architecture Center: https://learn.microsoft.com/azure/architecture/
- Google Cloud Architecture Framework: https://cloud.google.com/architecture/framework
- Google Research Blog: https://research.google/blog/
- OpenAI Research: https://openai.com/science/
- Anthropic Research: https://www.anthropic.com/research

## Decision

- Machine-readable registry: `agent-platform/configs/research/enterprise-source-registry.json`
- Human-readable summary list: `_research/source-lists/enterprise-high-quality-sites.en.md`
- Management policy: `_docs/policies/enterprise-source-list-policy.en.md`

## Application

When enterprise/high-quality sources seed research or coding research, record `enterprise-source-registry.json` in `research_profile_paths` or `reference_config_paths`.

## Caveat

Large-company examples are high signal, but their scale and organization assumptions may not fit local projects. Adapt the principle, not the complexity.
