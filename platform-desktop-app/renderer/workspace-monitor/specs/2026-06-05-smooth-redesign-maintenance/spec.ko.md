# 스펙: Smooth Redesign Maintenance

## 목표

- 사용자가 여러 탭을 열었을 때 active 상태와 버튼 press feedback이 즉시 보이게 한다.
- 탭, 메뉴, 다이얼로그, 세부 작업면 전환을 하나의 motion token 체계로 통일한다.
- 누적 history와 관리자 기록이 초기 snapshot payload를 과도하게 키우지 않게 한다.
- 한국어 기본 UI에서 고노출 문구가 영어와 어색하게 섞이지 않게 한다.

## 요구사항

- `MonitorShell`의 즉시 피드백과 first-paint scheduling helper는 재사용 가능한 `lib/motion.ts`로 분리한다.
- 전환 CSS는 `opacity`/`transform` 중심이어야 하며 `prefers-reduced-motion` 기존 정책을 유지한다.
- Tool Studio, command palette, Operator Center, agent detail workspace는 같은 motion token을 사용한다.
- `_history` 계열 문서는 rendered markdown HTML 전체가 아니라 `admin-summary` preview만 snapshot에 포함한다.
- snapshot 문서에는 `previewMode`, `htmlTruncated`, `sourceBytes` metadata가 있어야 한다.
- 일반 `check`에서 history payload 예산을 검증한다.
- 한국어 모드의 Operator Center와 task run 로그 안내는 한국어 중심으로 표시한다.
- Operator Center 내부 섹션도 브라우저 audit 대상이어야 한다.
- History timeline 문서 목록은 날짜 카드 내부에서 bounded scroll pane으로 분리되어야 한다.
- disclosure/summary처럼 버튼 외 클릭 타깃도 최소 작업 타깃 크기를 만족해야 한다.

## 제외

- Agent runtime 실행 속도 개선.
- public signing, notarization, updater, clean-machine installer smoke.
- 모든 repo 문서의 전면 번역 교정.
