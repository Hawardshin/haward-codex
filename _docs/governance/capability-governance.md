# Capability Governance

## Purpose

스킬과 도구를 무분별하게 늘리지 않고, 반복 가치가 있는 작업만 재사용 가능한 자산으로 승격한다. 핵심 기준은 “만들 수 있는가”가 아니라 “사람의 반복 작업과 시간을 실제로 줄이는가”다.

## Automation Philosophy

자동화 후보는 먼저 사람의 실제 프로세스로 설명되어야 한다.

- 어떤 사람이 어떤 순서로 조사, 비교, 판단, 실행, 검증을 하는가?
- 그 과정 중 반복되는 입력, 판단, 명령, 변환, 검증은 무엇인가?
- 자동화했을 때 절약되는 시간과 줄어드는 오류는 무엇인가?
- 자동화가 실패했을 때 사람이 어디서 개입하고 어떻게 되돌릴 수 있는가?

이 질문에 답하지 못하면 새 도구나 스킬보다 문서화, 체크리스트, 프롬프트 개선이 먼저다.

## Bounded Black-Box Promotion

플랫폼은 작업 중 반복, 병목, 누락, 검증 실패, 수동 재작업을 발견하면 capability 후보를 자동으로 만들 수 있다. 다만 이것은 완전한 블랙박스가 아니다.

- 사용자 경험은 자동 개선처럼 보일 수 있다.
- 내부에는 관찰 신호, 후보, 기존 자산 확인, 기각한 더 가벼운 대안, 위험도, 검증, rollback 또는 disablement, 평가, 커밋/push trace가 남아야 한다.
- 기능 승격 순서는 `prompt`, `workflow`, `template`, `tool`, `skill`, `agent`, `project_feature`다.
- destructive change, secret, 권한, 설치, 비용, public 배포, 보안/개인정보, irreversible migration은 human checkpoint 없이 자동 실행하지 않는다.

구체적인 source of truth는 `agent-platform/configs/orchestration/capability-promotion-registry.json`과 `_ops/workflows/75-capability-promotion.md`다.

## When to Create a Skill

Create or update a skill when work repeatedly needs:

- domain-specific rules that are easy to forget
- a multi-step workflow with validation requirements
- a specialized tool integration pattern
- project-specific operating knowledge that should guide future agents
- a human process that has been observed, documented, and proven worth reducing

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
- reducing a measured bottleneck in `_history/work-timings/`

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
- expected human time or repetition reduced
- human judgment, verification, and rollback boundaries

## Avoid

- creating a skill for one-off instructions
- creating a script before the workflow is understood
- hiding important project state inside a tool without documenting it
- moving project-specific behavior into shared tools before cross-project reuse is clear
- installing global capabilities without tracking their source in this repository
- installing open-source dependencies without dependency tracking, license/security review, verification, and rollback
- reimplementing mature open-source functionality without a concrete reason
