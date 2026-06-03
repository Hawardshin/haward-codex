# 저장소 구조 거버넌스

## 목적

이 문서는 루트 폴더가 늘어날 때 프로젝트, 공통 운영 자산, 로컬 전용 scratch, 생성 산출물이 서로 섞이지 않게 하는 기준이다.

## 현재 판단

- `agent-platform/`, `presentation-agent/`, `platform-desktop-app/`는 등록된 root project다.
- `_docs/`, `_ops/`, `_history/`, `_requirements/`, `_specs/`, `_research/`, `_skills/`, `_templates/`, `_tools/`, `_philosophy/`, `_archive/`는 shared operational folder다.
- `.claude/`, `.cursor/`, `.agents/`는 runtime adapter folder다. 프로젝트가 아니며 tool-specific rule entrypoint만 담는다.
- `_private/`와 `outputs/`는 로컬 전용 ignored folder다. 이 둘은 durable source of truth가 아니다.
- 프로젝트별 지속 산출물은 root `outputs/`가 아니라 owning project의 `artifacts/` 아래에 둔다.

## 발견한 개선점

1. 기존 규칙은 underscore folder를 대체로 reserved folder로 설명했지만, `_private/` 같은 로컬 전용 예외를 설명하지 않았다.
2. root `outputs/`가 비어 있더라도 이름만으로는 durable artifact 위치인지 transient output인지 구분이 어려웠다.
3. 프로젝트 경계 검토는 문서 중심이었고, root folder를 기계적으로 확인하는 deterministic check가 없었다.
4. desktop renderer가 `_history`와 프로젝트 문서는 보여주지만 `_docs`와 `_philosophy` 같은 구조 규칙 문서를 snapshot에 포함하지 않아 전체 구조 파악이 덜 직접적이었다.
5. 최초 감사는 root folder 중심이라 프로젝트 내부 top-level folder가 등록부에 설명되어 있는지 확인하지 못했다.

## 적용한 구조

- root folder class를 `_ops/projects/root-structure-policy.json`에서 관리한다.
- root folder audit는 `_tools/structure-audit/`가 맡는다.
- `.gitignore`는 `_private/`, `outputs/`, build output, TypeScript build metadata를 명시적으로 제외한다.
- 프로젝트 경계 workflow는 local-only scratch와 generated output을 별도 분류로 다룬다.
- `platform-desktop-app/renderer/workspace-monitor`는 `_docs`와 `_philosophy`를 문서 category로 수집한다.
- `structure-audit`는 등록된 프로젝트의 top-level folder inventory를 생성하고, `project_specific_home`에 없는 durable folder를 warning으로 보고한다.
- `generated_output_dirs`에 선언한 pattern은 `.gitignore`에도 반영되어야 하며, 누락되면 gap으로 처리한다.
- runtime adapter folder는 `_ops/projects/root-structure-policy.json`의 `runtime_adapter_dirs`에 등록되어야 한다.
- runtime adapter의 실제 도구별 의미는 `_ops/assistant-runtimes/adapter-registry.json`에서 관리한다.

## 변경 금지 기준

- 등록된 프로젝트를 옮기거나 이름을 바꾸는 구조 변경은 별도 migration plan 없이 하지 않는다.
- 기존 히스토리, 요구사항, 평가 파일을 새 구조에 맞추기 위해 대량 이동하지 않는다.
- `_private/` 내용은 요구사항, 평가, 근거, 지식 베이스에 연결하지 않는다.
- root `outputs/`에 남은 산출물을 최종 결과로 보고하지 않는다.

## 검증 명령

```bash
python3 _tools/structure-audit/src/structure_audit.py --check
python3 _tools/workspace-index/src/workspace_index.py
python3 _tools/task-board/src/task_board.py
```
