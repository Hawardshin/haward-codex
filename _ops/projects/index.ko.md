# 프로젝트 인덱스

원본 데이터: [registry.json](registry.json)
루트 구조 정책: [root-structure-policy.json](root-structure-policy.json)
AI assistant runtime adapter: [../assistant-runtimes/adapter-registry.json](../assistant-runtimes/adapter-registry.json)

| 프로젝트 | 상태 | 유형 | 목적 | 경계 |
| --- | --- | --- | --- | --- |
| `agent-platform/` | active | core-platform | 에이전트 구축 플랫폼 중심 프로젝트 | 플랫폼 공통 기능은 여기, 도메인 실험은 별도 루트 프로젝트 |
| `presentation-agent/` | active | domain-agent-project | 발표 자료와 발표 스킬을 위한 전용 프로젝트 | 발표 레퍼런스, 에셋, 변환 도구, 산출물은 이 프로젝트 안에 둔다 |
| `platform-desktop-app/` | active | installable-desktop-product | 설치형 데스크톱 제품화 프로젝트 | OS별 설치, 배포, 업데이트, 개인정보/secret 검토와 Next.js renderer UI는 이 프로젝트 안에 둔다 |
| `vscode-agent-workbench/` | active | source-hard-fork-workbench | VS Code Code - OSS 소스를 Agent Workspace Code로 하드 포크하는 작업대 | 전체 source clone은 local-only로 두고, 커밋/패치/검증/기록을 이 프로젝트에 둔다 |

## 최상위 폴더 논리 계층

| 계층 | 폴더 | 의미 |
| --- | --- | --- |
| 프로젝트 계층 | `agent-platform/`, `presentation-agent/`, `platform-desktop-app/`, `vscode-agent-workbench/` | 독립 목적과 라이프사이클이 있는 루트 프로젝트 |
| 운영 제어 계층 | `_ops/`, `_docs/`, `_requirements/`, `_specs/`, `_history/` | 작업 흐름, 정책, 요구사항, 스펙, 평가, 히스토리 |
| 지식/재사용 계층 | `_philosophy/`, `_research/`, `_skills/`, `_templates/`, `_tools/`, `_archive/` | 재사용 지식, 도구, 템플릿, 스킬, 철학, 보관 프로젝트 |
| 런타임 어댑터 계층 | `.claude/`, `.cursor/`, `.agents/` | AI 도구별 얇은 adapter |
| 보호 로컬 계층 | `_private/` | 민감 파일과 private scratch. AI 기본 접근 금지 |
| 생성 로컬 계층 | `outputs/` | 임시 출력. 지속 산출물은 프로젝트 `artifacts/`로 이동 |

## 운영 규칙

- 새 관심사가 독립 목적과 산출물을 가지면 새 루트 프로젝트로 만든다.
- 새 코딩 프로젝트는 먼저 `_tools/coding-project-bootstrap/`으로 dry-run plan을 확인하고, root project일 때만 `--register`로 등록한다.
- 프로젝트 전용 파일은 해당 프로젝트 폴더 안에 둔다.
- 여러 프로젝트에서 재사용될 때만 `_tools/`, `_templates/`, `_docs/`, `_ops/`로 승격한다.
- `_private/`와 `outputs/`는 local-only ignored folder이며 프로젝트나 지식 베이스가 아니다. 특히 `_private/` 내부는 AI가 기본적으로 직접 읽거나 색인하지 않는다.
- `.claude/`, `.cursor/`, `.agents/`는 runtime adapter folder이며 프로젝트가 아니다.
- 프로젝트 내부 durable top-level folder는 `registry.json`의 `project_specific_home`에 설명한다.
- 루트 폴더, 프로젝트 등록부, 프로젝트 top-level folder, 예약 폴더, generated-output 규칙을 바꾸면 `python3 _tools/structure-audit/src/structure_audit.py --check`를 실행한다.
- 프로젝트를 만들거나 상태가 바뀌면 이 인덱스와 `registry.json`을 업데이트한다.
