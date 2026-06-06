# VS Code 하드 포크 워크스페이스 계획 기록

날짜: 2026-06-06

## 실행 계획

1. 공식 소스와 라이선스/빌드 경계를 확인한다.
2. 새 root project `vscode-agent-workbench/`를 만든다.
3. `microsoft/vscode`를 `source/`에 clone한다.
4. Node 24.15.0과 npm dependencies를 설치한다.
5. 하드 포크 branch를 만들고 product identity를 바꾼다.
6. Agent Workspace built-in extension을 추가한다.
7. compile과 launch smoke를 실행한다.
8. source commit과 patch를 만든다.
9. outer workspace에는 patch, 기록, 검증 스크립트만 추적한다.
10. 설치/리소스/누락/evaluation 기록 후 commit/push한다.

## 첫 slice 완료 기준

- `Agent Workspace Code` identity가 source에 반영된다.
- Activity Bar에 Agent Workspace view가 추가된다.
- VS Code source compile이 통과한다.
- patch를 통해 변경을 재적용할 수 있다.
