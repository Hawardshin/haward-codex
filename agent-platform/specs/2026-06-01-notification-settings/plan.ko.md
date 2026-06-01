# 구현 계획: 플랫폼 알림 설정

## 근거

- Slack 공식 문서: incoming webhook URL에 JSON `text` payload를 POST한다.
- Discord 공식 문서: Execute Webhook은 `content` 등 메시지 필드 중 하나가 필요하다.
- Microsoft Teams 공식 문서: 새 incoming webhook 설정은 Workflows 템플릿으로 만들 수 있고, Microsoft 365 Connector는 deprecation/migration 리스크가 있다.
- Python 공식 문서: `urllib.request.Request`와 `urlopen`으로 JSON POST를 구현할 수 있다.
- 기존 저장소 구조: platform helper는 `src/agent_platform/<capability>/`, CLI는 `agent_platform.cli`, 검증은 `tests/`에 둔다.

## 구현 전략

1. `configs/integrations/notification-channels.json`에 self-documenting 설정을 만든다.
2. `src/agent_platform/integrations/notifications.py`에 설정 검증, payload 생성, dry-run, 실제 POST 함수를 둔다.
3. CLI에 `check-notifications`와 `notify`를 추가한다.
4. 단위 테스트로 secret guard, provider payload, channel filter, dry-run/send sender injection을 검증한다.
5. README와 문서에 사용법과 secret 처리 방식을 기록한다.
6. history, request trace, evaluation을 남기고 커밋/push한다.

## 리스크와 대응

- Teams webhook payload compatibility: `payload_style`을 `message_card`, `simple_text`, `adaptive_card`로 선택 가능하게 두고 기본 문서에서 Workflows URL을 권장한다.
- secret 노출 위험: config validator가 inline secret field를 gap으로 처리한다.
- 테스트 중 외부 발송 위험: 기본 dry-run과 sender injection test로 네트워크 호출 없이 검증한다.

