# 요구사항 검토: 플랫폼 알림 설정

## 검토 대상

- `REQ-WS-025`

## 검토 결과

- 상태: 승인
- 작업 모드: `governance`
- 범위: `agent-platform/`의 공통 통합 기능

## 검토 메모

- 이 요구사항은 단일 프로젝트 산출물이 아니라 플랫폼 운영 전반의 이벤트 알림 기능이므로 workspace/platform 기준선에 포함한다.
- secret은 git에 저장하지 않는 것을 수용 기준으로 둔다.
- Teams는 Microsoft 365 Connector의 변화가 있어 Workflows webhook URL을 우선하도록 문서화한다.
- 실제 발송은 `--send`를 명시할 때만 하도록 하고, 기본은 dry-run으로 검증한다.

## 승인된 수용 기준

- 설정 파일에서 provider별 channel을 켜고 끌 수 있다.
- 환경변수 이름만 저장하고 실제 secret 값은 저장하지 않는다.
- CLI로 설정 검증과 dry-run 발송 검증을 할 수 있다.
- 단위 테스트가 provider payload, secret guard, disabled/filtered channel 동작을 검증한다.

