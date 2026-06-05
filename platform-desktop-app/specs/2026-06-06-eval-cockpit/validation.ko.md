# 검증 계획: AI EVAL cockpit

## 실행할 검증

- `PYTHONPATH=src python3 -m agent_platform.cli check-config-contract ../agent-platform/configs/access/view-mode-registry.json`
- `npm --prefix platform-desktop-app run check`
- `npm --prefix platform-desktop-app run test`
- `npm --prefix platform-desktop-app/renderer/workspace-monitor run test`
- `npm --prefix platform-desktop-app/renderer/workspace-monitor run build`
- `npm --prefix platform-desktop-app run package:internal`
- Browser smoke로 EVAL 탭과 Tool Studio 렌더 확인

## 수동 확인 포인트

- EVAL 탭이 navigation에 표시된다.
- EVAL 탭 진입 시 현재 작업 점수와 오픈소스 후보가 보인다.
- 평가 기록 버튼이 문서 탭의 evaluation 필터로 이어진다.
- Tool Studio 3D 캐릭터 화면 문구와 scene token이 물개형으로 바뀐다.

## 결과

- `PYTHONPATH=src python3 -m agent_platform.cli check-config-contract ../agent-platform/configs/access/view-mode-registry.json`: 통과
- `PYTHONPATH=src python3 -m agent_platform.cli check-config-contract ../platform-desktop-app/configs/product-feature-registry.json ../platform-desktop-app/configs/open-source-feature-reference-registry.json`: 통과
- `npm --prefix platform-desktop-app run check`: 통과
- `npm --prefix platform-desktop-app run test`: 통과, 24 tests
- `npm --prefix platform-desktop-app/renderer/workspace-monitor run test`: 통과, 69 tests
- `npm --prefix platform-desktop-app/renderer/workspace-monitor run build`: 통과
- `npm --prefix platform-desktop-app run package:internal`: 통과
- Browser smoke: EVAL active section, 4 score cards, OpenAI Evals/Inspect AI/Langfuse/promptfoo/DeepEval/Phoenix/Opik 후보 확인
- Browser smoke: Tool Studio 물개형 heading, canvas ready, console error/warn 0건
- close-out 문서 반영 후 `npm --prefix platform-desktop-app run package:internal` 재실행: 통과
- final Browser smoke: EVAL active section, Tool Studio active section, 물개형 canvas ready, console error/warn 0건

## 산출물

- `/Users/shinjoungeun/Desktop/Obsidian/brain/codex/platform-desktop-app/src-tauri/target/release/bundle/macos/Agent Workspace Platform.app`
- `/Users/shinjoungeun/Desktop/Obsidian/brain/codex/platform-desktop-app/src-tauri/target/release/bundle/dmg/Agent Workspace Platform_0.1.0_aarch64.dmg`
