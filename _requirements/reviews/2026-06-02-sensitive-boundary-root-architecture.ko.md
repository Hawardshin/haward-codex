# 요구사항 검토: 민감 파일 경계와 최상위 폴더 논리 계층

## 검토 결과

- 상태: 승인
- 요구사항: `REQ-WS-074`
- 적용 범위: `agent-platform`, `_ops`, `_docs`, `_tools`, `workspace-monitor`

## 수용 기준

- 민감 파일 경계 설정 파일이 자기 설명 구조를 가진다.
- `_private/`는 git ignore, workspace index, monitor snapshot에서 내용이 제외된다.
- privacy audit가 `_private/` 내용을 읽지 않고 경계를 검증한다.
- 시작 워크플로와 prompt router에서 민감 파일 처리를 찾을 수 있다.
- 최상위 폴더는 논리 계층으로 설명된다.

## 위험과 제어

- 위험: `_private/` 위치만 있고 AI 접근 금지가 약하면 오히려 민감 파일 수집 지점이 된다.
- 제어: 기본 접근 금지, redacted extract 우선, 명시적 1회 허가, privacy audit, snapshot/public release gate.
