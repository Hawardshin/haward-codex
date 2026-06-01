# 웹 검색 기록: 도구 독립 AI assistant 운영 원칙

## 검색 목적

- Codex 중심의 운영 규칙을 Claude Code, Cursor, Antigravity, 기타 AI assistant에서도 재사용 가능한 원칙 템플릿으로 바꾸기 위한 외부 근거를 확인했다.
- 각 도구가 프로젝트별 instruction/rule 파일을 어떻게 발견하고 읽는지 확인해, 공통 원칙과 runtime adapter를 분리하는 구조가 타당한지 판단했다.

## 검색 쿼리

- `Claude Code project instructions CLAUDE.md official documentation`
- `Cursor rules project instructions .cursor/rules official documentation`
- `Google Antigravity agent instructions project rules documentation`
- `OpenAI Codex AGENTS.md repository instructions official documentation`
- `site:cursor.com/docs rules .cursor/rules Project Rules Cursor`
- `site:antigravity.google/docs rules workflows .agents/rules markdown official`
- `site:antigravity.google/docs projects isolated settings security policies official`
- `OpenAI Codex AGENTS.md official documentation`
- `Cursor project rules .cursor/rules mdc alwaysApply official docs`
- `Google Antigravity .agents/rules workspace rules official`
- `Antigravity IDE .agents rules workspace global rules docs`

## 확인한 출처

| 출처 | URL | 확인 내용 | 신뢰도 | 적용 |
| --- | --- | --- | --- | --- |
| Claude Code memory documentation | https://code.claude.com/docs/en/memory | Claude Code는 프로젝트 메모리와 `CLAUDE.md`를 통해 장기 instruction을 읽는다. | 높음, 공식 문서 | `CLAUDE.md`와 `.claude/rules/`를 thin adapter로 추가 |
| Cursor rules documentation | https://docs.cursor.com/context/rules | Cursor는 `.cursor/rules`의 project rule을 사용하며 rule type과 glob/alwaysApply 같은 메타데이터를 가진다. | 높음, 공식 문서 | `.cursor/rules/workspace-operating-principles.mdc` 추가 |
| Google Antigravity IDE rules documentation | https://antigravity.google/docs/ide-rules?hl=sv | Antigravity는 workspace/project rule과 agent instruction 파일을 통해 agent 행동을 조정한다. | 높음, 공식 문서 | `.agents/rules/workspace-operating-principles.md` 추가 |
| Google Antigravity projects documentation | https://www.antigravity.google/docs/projects | Antigravity project/workspace는 격리된 설정과 정책을 프로젝트 단위로 관리한다. | 높음, 공식 문서 | runtime adapter를 프로젝트가 아닌 도구별 설정 root로 분류 |
| AGENTS.md format | https://agents.md/ | 여러 coding agent가 `AGENTS.md`를 프로젝트 instruction 파일로 사용할 수 있게 하는 공개 형식이다. | 중간에서 높음, 공개 형식 문서 | 기존 `AGENTS.md`는 Codex entrypoint이면서 공통 원칙을 가리키는 adapter로 유지 |

## 약한 출처 또는 보류한 출처

- 비공식 블로그와 Q&A는 이번 작업에서 직접 사용하지 않았다. 목적이 각 도구의 rule 발견 경로 확인이었기 때문에 공식 문서를 우선했다.
- Antigravity 문서는 현 시점에서 공식 사이트의 언어 파라미터가 붙은 URL로 확인했다. 같은 문서의 지역화나 URL 구조는 바뀔 수 있으므로 registry에는 접근일과 함께 보관한다.

## 계획에 준 영향

- 각 도구별 instruction 파일을 정책 원본으로 복제하지 않고, `_docs/operating-models/tool-agnostic-agent-operating-model.*.md`와 `_ops/assistant-runtimes/adapter-registry.json`을 공통 원본으로 삼는다.
- `AGENTS.md`, `CLAUDE.md`, `.claude/rules/`, `.cursor/rules/`, `.agents/rules/`는 공통 원칙을 가리키는 thin adapter로 둔다.
- root structure audit에는 `.claude`, `.cursor`, `.agents`를 프로젝트가 아닌 `runtime_adapter` folder class로 추가한다.
- workspace monitor는 runtime adapter와 assistant operating principle template 문서를 수집해, 어떤 도구에서 어떤 규칙이 활성화되는지 볼 수 있게 한다.

## 불확실성

- 각 도구의 rule 파일 탐색 방식은 제품 업데이트에 따라 바뀔 수 있다.
- 이 저장소의 실제 실행 환경이 Codex가 아닌 다른 도구로 바뀔 때는 해당 도구의 최신 공식 문서로 adapter registry를 재검증해야 한다.
- Instruction 파일만으로 정책이 강제되는 것은 아니므로 중요한 규칙은 config contract, audit, tests, human review로 보완해야 한다.

## 공개 판단 요약

도구별 rule 파일은 필요하지만, 같은 운영 원칙을 여러 도구 파일에 복사하면 곧 divergence가 생긴다. 따라서 공통 정책과 원칙은 `_docs/`, `_ops/`, `_requirements/`, `_specs/`, `_history/`, `agent-platform/configs/`에 두고, Codex/Claude/Cursor/Antigravity 파일은 그 원칙을 읽게 하는 얇은 어댑터로 관리한다.
