# 작업 요약: VS Code 하드 포크 워크스페이스

날짜: 2026-06-06

`microsoft/vscode`를 clone해 `Agent Workspace Code` 하드 포크의 첫 source slice를 만들었다. 제품 identity와 built-in Agent Workspace extension을 직접 소스에 넣고 compile/CLI/app launch smoke를 통과했다.

전체 source clone은 outer repo에서 ignore하고, durable 추적은 source commit과 patch로 남겼다. Node 24.15.0과 source npm dependencies 설치는 설치 감사 기록에 남겼으며, upstream dependency audit 경고는 자동 fix 없이 리스크로 기록했다.
