# 웹 검색 기록: 두 데스크톱 앱 제품 경계

- 날짜: 2026-06-08
- 요청 요약: 사용자가 분리된 두 제품이 모두 데스크톱 앱이라고 명확히 함.

## 검색

- `Tauri documentation multiple windows desktop app workspace monorepo`
- `Tauri v2 documentation multiwindow desktop app`
- `Electron documentation application architecture multiple windows desktop app`

## 확인한 출처

- Tauri capabilities for different windows and platforms: https://tauri.app/learn/security/capabilities-for-windows-and-platforms/
- Tauri process model: https://tauri.app/concept/process-model/
- Electron process model: https://www.electronjs.org/docs/latest/tutorial/process-model
- Electron product overview: https://www.electronjs.org/

## 계획 영향

- 두 번째 제품을 `agent-platform/` 내부 설정으로만 두지 않고 `agent-tool-desktop-app/`라는 별도 desktop product home으로 등록한다.
- `agent-platform/`은 사용자-facing 앱이 아니라 reusable engine and contract layer로 표현한다.
- 실제 runtime shell 구현은 보안, credential, install, model storage, resource cleanup gate를 가진 후속 slice로 남긴다.
