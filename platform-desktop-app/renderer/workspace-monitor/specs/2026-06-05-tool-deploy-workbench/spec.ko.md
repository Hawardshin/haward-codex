# Tool Deploy Workbench 스펙

## 요구사항

- REQ-WM-051: Tool Studio의 `툴 배포` 화면은 전용 배포 작업대를 제공해야 한다.

## 사용자 결과

- 사용자는 `툴 배포` 모드에서 Local Registry, AgentCore Gateway, Desktop Bundle target을 선택한다.
- 선택 target에 따라 release target, artifact, deployment command, preflight checklist, auth/observability, rollback plan이 즉시 바뀐다.
- 주요 액션은 `사전점검 실행`, `패키지 빌드`, `Registry 반영`, `배포 계획 복사`로 분리된다.
- 860px 이하 화면에서는 target, canvas, action 영역이 한 열로 접혀 수평 overflow를 만들지 않는다.

## 비목표

- 실제 cloud 배포 실행
- credential provider 생성 또는 권한 부여
- registry 파일 직접 수정
