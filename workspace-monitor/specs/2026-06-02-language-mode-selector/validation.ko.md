# 검증: Workspace Monitor Language Mode Selector

## 예정 검증

- `cd agent-platform && PYTHONPATH=src python3 -m agent_platform.cli check-config-contract configs/access/language-mode-registry.json`
- `cd workspace-monitor && npm run collect`
- `cd workspace-monitor && npm test`
- `cd workspace-monitor && npm run check`
- `cd workspace-monitor && npm run build`

## 수용 기준

- 생성 snapshot에 `languageModeCatalog`가 포함된다.
- 기본 language mode는 `all`이다.
- toolbar에서 전체, 한국어만, 영어만을 선택할 수 있다.
- 한국어만 모드는 `ko` 문서만, 영어만 모드는 `en` 문서만 보여준다.
- `unknown` 문서는 전체 모드에서만 보인다.
- language mode가 source code programming language filter와 충돌하지 않는다.

## 실행 결과

- 통과: `cd agent-platform && PYTHONPATH=src python3 -m agent_platform.cli check-config-contract configs/access/language-mode-registry.json`
- 통과: `cd agent-platform && PYTHONPATH=src python3 -m agent_platform.cli check-memory-bootstrap configs/memory/bootstrap-manifest.json`
- 통과: core shared settings `check-config-contract`
- 통과: `cd workspace-monitor && npm run collect`
- 통과: `cd workspace-monitor && npm test`
- 통과: `cd workspace-monitor && npm run check`
- 통과: `cd workspace-monitor && npm run build`
- 통과: `npm run dev -- --port 3100` 후 `curl` smoke check에서 `전체`, `한국어만`, `English Only`, `languageModeCatalog` 렌더링 확인
