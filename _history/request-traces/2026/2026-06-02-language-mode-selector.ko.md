# 요청-결과 추적: Language Mode Selector

## 요청

- ID: `UR-2026-06-02-032`
- 요약: 한글 모드와 영어 모드를 추가해 Workspace Monitor와 문서 브라우저에서 한국어 문서만 또는 영어 문서만 볼 수 있게 한다.

## 요구사항

- `REQ-WS-072`
- `REQ-WM-015`

## 결과

- `language_mode` 공통 개념을 추가했다.
- 기본값은 `all`로 두고, `ko`, `en` 단일 언어 모드를 추가했다.
- Workspace Monitor toolbar에서 `전체`, `한국어만`, `English Only`를 선택할 수 있게 했다.
- 문서, 히스토리, 최근 히스토리, summary metric이 같은 언어 렌즈를 사용하게 했다.
- `language_mode`를 `view_mode`, `work_mode`, `install_mode`, source code language filter와 분리했다.
- selector가 redaction 또는 보안 경계가 아니라는 점을 요구사항과 README에 명시했다.

## 산출물

- `agent-platform/configs/access/language-mode-registry.json`
- `agent-platform/configs/memory/bootstrap-manifest.json`
- `workspace-monitor/scripts/collect-workspace.mjs`
- `workspace-monitor/lib/snapshot.ts`
- `workspace-monitor/components/MonitorShell.tsx`
- `workspace-monitor/tests/collector.test.mjs`
- `workspace-monitor/docs/requirements/2026-06-01-workspace-monitor.ko.md`
- `workspace-monitor/specs/2026-06-02-language-mode-selector/`
- `_requirements/baselines/2026-05-31-workspace-platform.ko.md`
- `_docs/instructions/persistent-instructions.ko.md`
- `AGENTS.md`

## 검증

- `PYTHONPATH=src python3 -m agent_platform.cli check-config-contract configs/access/language-mode-registry.json`
- `PYTHONPATH=src python3 -m agent_platform.cli check-memory-bootstrap configs/memory/bootstrap-manifest.json`
- core shared settings `check-config-contract`
- `npm run collect`
- `npm test`
- `npm run check`
- `npm run build`
- `npm run dev -- --port 3100` 후 `curl` smoke check

## 평가

- `_history/evaluations/2026/2026-06-02-language-mode-selector.ko.md`

## 커밋

- close-out 후 기록
