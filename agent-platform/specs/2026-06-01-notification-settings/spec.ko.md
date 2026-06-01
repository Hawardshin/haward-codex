# 스펙: 플랫폼 알림 설정

## 목표

플랫폼 작업 중 완료, 실패, 승인 필요, 장시간 진행 업데이트 같은 이벤트를 Slack, Discord, Microsoft Teams로 보낼 수 있는 설정 기반 알림 구조를 만든다.

## 요구사항

- `REQ-WS-025`

## 수용 기준

- `agent-platform/configs/integrations/notification-channels.json`에서 전역 알림과 provider별 channel을 켜고 끌 수 있다.
- 설정 파일에는 실제 토큰, 웹훅 URL, secret을 저장하지 않고 환경변수 이름만 저장한다.
- Discord, Slack, Teams payload 차이를 Python 모듈에서 deterministic하게 생성한다.
- 기본 실행은 dry-run이며, 실제 발송은 CLI에서 `--send`를 명시해야 한다.
- enabled channel의 secret 환경변수를 요구하는 검증 모드를 제공한다.
- inline secret 필드를 설정에 넣으면 검증 gap으로 처리한다.
- 단위 테스트와 CLI smoke test로 동작을 확인한다.

## 제외 범위

- 실제 사용자 webhook URL 입력 또는 provider UI 설정 자동화
- OAuth app 설치 플로우
- 메시지 retry queue, background worker, rate limit scheduler
- 알림 수신 내역 DB 저장

