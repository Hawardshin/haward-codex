# Architecture-First Coding Research Note

## Summary

Source-code work is not complete with implementation-pattern research alone. Before implementation, compare at least two architecture candidates and record why the selected structure fits the current project scope and quality attributes.

## Key References

- [AWS Well-Architected Framework](https://docs.aws.amazon.com/wellarchitected/latest/framework/welcome.html): quality attributes and architecture review questions
- [Azure Architecture Center](https://learn.microsoft.com/azure/architecture/): architecture styles, reference architectures, and design patterns
- [Google Cloud Architecture Framework](https://cloud.google.com/architecture/framework): system design and operational quality attributes
- [arc42](https://arc42.org/): architecture documentation template
- [C4 model](https://c4model.info/): context/container/component/code views
- [SEI Views and Beyond](https://www.sei.cmu.edu/library/views-and-beyond-the-sei-approach-for-architecture-documentation/): view-based architecture documentation

## Repository Application

- `complete-coding-research` now treats missing architecture references, options, and decision notes as gaps.
- `coding-research-profile.json` and `source-registry.json` now include architecture reference sources.
- `_docs/architecture-first-coding-policy.ko.md` was added as durable policy.

## Reuse Caution

Vendor architecture frameworks mix general principles with cloud-specific assumptions and product choices. For future projects, do not copy them directly; choose architecture based on project scope, operating model, data flow, security, performance, and testing needs.

