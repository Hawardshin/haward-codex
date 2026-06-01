# Capability Governance

## Purpose

스킬과 도구를 무분별하게 늘리지 않고, 반복 가치가 있는 작업만 재사용 가능한 자산으로 승격한다.

## When to Create a Skill

Create or update a skill when work repeatedly needs:

- domain-specific rules that are easy to forget
- a multi-step workflow with validation requirements
- a specialized tool integration pattern
- project-specific operating knowledge that should guide future agents

Skill source should be tracked under `_skills/<skill-name>/`.

If the skill must be active in Codex, install it into `$CODEX_HOME/skills` after checking permissions. The tracked source in this repository remains the source of truth.

Skill work must run the skill lifecycle checks: create/update source, record trigger examples, run quick validation, run `agent-platform validate-skill`, forward-test realistic scenarios when useful, capture improvement ideas, and include skill targets in work evaluation.

## When to Create a Tool

Create a tool when work repeatedly needs deterministic execution:

- generating files from structured inputs
- validating repository rules
- converting Markdown to HTML or other formats
- rendering previews
- checking project health
- checking claim grounding and hallucination risk
- normalizing, scoring, and reporting large source bundles

Shared tools belong under `_tools/<tool-name>/`. Project-specific tools belong under `project-name/tools/`.

Start tools inside the project that needs them. Promote to `_tools/` only when the tool is useful across projects or clearly belongs to the shared workspace.

Prefer Python for shared tools unless another runtime is clearly more appropriate.

If a mature open-source dependency makes the tool or skill better and reduces maintenance cost, install it in the owning project/tool scope. Follow [_docs/policies/open-source-installation-policy.ko.md](open-source-installation-policy.ko.md) before installation.

## When to Create a Template

Create a template when the repeated value is structure rather than execution:

- project skeletons
- HTML artifact shells
- work log entries
- spec documents

Templates belong under `_templates/`.

## When to Create a Research Note

Create a research note when internet research or external references are likely to reduce future work or improve future decisions.

Research notes belong under `_research/topics/<topic>/`.

## When to Create an Evaluation Agent

Create or update an evaluation agent when a repeated quality gate should block close-out.

Examples:

- `work-evaluator-agent`: compares the initial instruction with actual work.
- `knowledge-skeptic-agent`: validates internal knowledge-base references before reuse.
- `hallucination-guard-agent`: checks factual claims against evidence before publication.

## Minimum Documentation

Every reusable capability must state:

- purpose
- when to use it
- inputs
- outputs
- main command or activation path
- validation and improvement path

## Avoid

- creating a skill for one-off instructions
- creating a script before the workflow is understood
- hiding important project state inside a tool without documenting it
- moving project-specific behavior into shared tools before cross-project reuse is clear
- installing global capabilities without tracking their source in this repository
- installing open-source dependencies without dependency tracking, license/security review, verification, and rollback
- reimplementing mature open-source functionality without a concrete reason
