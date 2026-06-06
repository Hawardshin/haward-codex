# 추적성: CLI 스크롤 겹침 제거

| 요구 | 구현 대상 | 검증 |
| --- | --- | --- |
| 설정 본문만 세로 스크롤 | `globals.css` `.settings-dialog-backdrop`, `.settings-tab-panel` | `tool-studio.test.mjs` |
| CLI 내부 scroll 제거 | `globals.css` `.cli-adapter-setup-guide`, `.cli-setup-stepper`, `.cli-command-copy-row` | `tool-studio.test.mjs`, Playwright smoke |
| Cockpit command stack 안정화 | `globals.css` `.agent-cli-command-stack` | `tool-studio.test.mjs`, Playwright smoke |
| 긴 명령 줄바꿈 | `globals.css` code/small/button span wrapping | visual smoke |
| 자동 빌드/패키징 | package scripts | validation record |
