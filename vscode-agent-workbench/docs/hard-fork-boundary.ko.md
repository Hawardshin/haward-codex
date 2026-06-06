# VS Code 하드 포크 경계

날짜: 2026-06-06

## 결정

`microsoft/vscode` 원본은 `vscode-agent-workbench/source/`에 직접 클론해 수정한다. 다만 바깥 워크스페이스 Git에는 원본 전체를 추적하지 않는다.

## 이유

- VS Code 원본, `node_modules`, Electron build output은 매우 크다.
- 원본 저장소 자체가 별도 Git 히스토리를 갖고 있다.
- 바깥 워크스페이스는 프로젝트 방향, 요구사항, 검증, 설치 감사, 재적용 패치만 추적해도 충분히 재현 가능하다.
- 사용자의 요청처럼 소스 기반으로 직접 작업하려면 실제 clone과 commit은 필요하다.

## 운영 규칙

- 소스 변경은 먼저 `source/` 내부 브랜치에서 커밋한다.
- 완료된 slice는 `git format-patch`로 `patches/`에 저장한다.
- 바깥 저장소에는 `source/`를 커밋하지 않는다.
- source refresh나 rebase는 `configs/source-baseline.json`을 먼저 갱신한 뒤 검증한다.

## 다음 통합 후보

- workspace timeline을 실제 Agent Workspace run record와 연결
- CLI/terminal adapter 상태를 VS Code activity view로 노출
- platform root 자동 감지와 설정 동기화
- native process/pipe 실행 결과를 VS Code task/problem/terminal surface에 연결
- marketplace/service endpoint와 public redistribution gate 분리
