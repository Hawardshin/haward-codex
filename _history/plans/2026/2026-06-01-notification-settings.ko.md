# 계획 기록: 플랫폼 알림 설정

## 요청

- 플랫폼 전체 작업에서 Slack, Discord, Microsoft Teams 알림을 설정 파일로 켜고 끌 수 있게 한다.
- 실제 토큰이나 웹훅 URL은 사용자가 넣을 수 있어야 한다.

## 작업 모드

- `governance`
- 이유: 새 cross-project platform capability이고, 설정/CLI/secret 처리 방식이 앞으로 반복 사용될 운영 구조다.

## 조사와 근거

- Slack incoming webhook 공식 문서: JSON `text` payload를 webhook URL로 POST.
- Discord Execute Webhook 공식 문서: `content` 등 메시지 필드 필요, mention 제어 고려.
- Microsoft Teams 공식 문서: Workflows webhook 우선, 기존 Microsoft 365 Connector deprecation/migration 리스크.
- Python 공식 문서: `urllib.request`로 외부 dependency 없이 HTTP POST 가능.
- 내부 근거: 기존 platform helper 구조는 `src/agent_platform/<capability>/`, CLI는 `agent_platform.cli`, 설정은 self-documenting config contract를 따른다.

## 결정

- 설정 파일: `agent-platform/configs/integrations/notification-channels.json`
- secret 처리: 저장소에는 `webhook_url_env`만 저장하고 실제 값은 환경변수로 주입한다.
- 구현: Python 표준 라이브러리 기반 `agent_platform.integrations.notifications`.
- CLI:
  - `check-notifications`: 설정과 secret policy 검증
  - `notify`: 기본 dry-run, `--send`일 때만 실제 발송
- Teams: 기본 `message_card`, 필요 시 `simple_text` 또는 `adaptive_card`로 전환 가능하게 한다.

## 검증 계획

- notification 단위 테스트와 전체 테스트 실행
- config contract와 notification config CLI 검증
- notify dry-run smoke test
- coding research readiness, memory bootstrap, grounding, work evaluation 실행
- workspace index와 task board 재생성

