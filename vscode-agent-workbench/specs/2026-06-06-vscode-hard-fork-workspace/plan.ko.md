# 구현 계획

날짜: 2026-06-06

## 단계

1. 공식 VS Code 소스와 빌드/라이선스 경계를 확인한다.
2. `vscode-agent-workbench/source`에 upstream을 clone한다.
3. Node 24.15.0을 준비하고 source dependency를 설치한다.
4. 하드 포크용 source branch를 만든다.
5. `product.json`의 Code - OSS 정체성을 Agent Workspace Code로 분리한다.
6. `extensions/agent-workspace` 내장 확장을 추가한다.
7. extension compilation 목록에 새 확장을 등록한다.
8. source compile과 CLI/app launch smoke를 수행한다.
9. source commit을 만들고 바깥 repo patch를 생성한다.
10. 요구사항, 스펙, 설치 감사, provenance, 리소스/누락/평가 기록을 남긴다.

## 후속 slice

- platform root 자동 감지와 설정 동기화
- Agent Workspace run timeline provider
- CLI adapter status provider
- native PTY/process/pipe bridge
- workspace decision inbox view
- hard-fork branding/signing/distribution gate
