# 작업 평가: Language Mode Selector

## 결과

- 상태: `ready_to_close`
- 작업 모드: `governance`
- 재작업 필요: 없음
- 설치 발생: 없음
- skill 작업: 없음
- resource risk: 없음
- CLI pipeline 변경: 없음

## 초기 지시와 결과 비교

- 요청: Workspace Monitor와 플랫폼 문서 표시에서 한글 모드와 영어 모드를 추가해 한국어만 또는 영어만 볼 수 있게 한다.
- 결과: `language_mode` 공통 개념, `language-mode-registry.json`, Workspace Monitor `languageModeCatalog`, toolbar selector, 문서/히스토리/metric 언어 필터를 구현했다.
- 추가 반영: 요구사항, 스펙, persistent instructions, memory bootstrap, README, user request summary, request trace, work summary, timing, omission, grounding 기록을 갱신했다.

## 검증

- 통과: `check-config-contract configs/access/language-mode-registry.json`
- 통과: `check-memory-bootstrap configs/memory/bootstrap-manifest.json`
- 통과: core shared settings `check-config-contract`
- 통과: `workspace-monitor` `npm run collect`
- 통과: `workspace-monitor` `npm test` 10개
- 통과: `workspace-monitor` `npm run check`
- 통과: `workspace-monitor` `npm run build`
- 통과: omission guard `coverage_ready`
- 통과: grounding guard `ready_to_publish`
- 통과: work timer check `ready`
- 통과: local `curl` smoke check에서 `전체`, `한국어만`, `English Only`, `languageModeCatalog` 렌더링 확인
- 통과: `python3 _tools/workspace-index/src/workspace_index.py`
- 통과: `python3 _tools/docs-audit/src/docs_audit.py --check`
- 통과: `python3 _tools/naming-audit/src/naming_audit.py --check`
- 통과: 최종 `npm run collect`, 최종 `npm run build`

## 근거와 출처

- Next.js Internationalization: https://nextjs.org/docs/app/building-your-application/routing/internationalization
- Next.js Static Exports: https://nextjs.org/docs/pages/guides/static-exports
- W3C BCP 47 language tags: https://www.w3.org/International/articles/bcp47/index.en
- 내부 근거:
  - `_history/web-searches/2026/2026-06-02-language-mode-selector.ko.md`
  - `_history/plans/2026/2026-06-02-language-mode-selector.ko.md`
  - `workspace-monitor/specs/2026-06-02-language-mode-selector/`

## 남은 개선 아이디어

- Browser 또는 Playwright가 사용 가능할 때 client-side interaction test를 추가한다.
- monitor filter가 더 늘어나면 audience/language/publication/project lens를 공통 helper로 묶는 것을 검토한다.

## 평가 입력

- `_history/evaluations/2026/2026-06-02-language-mode-selector-evaluation-input.json`
