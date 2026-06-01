# 알림 채널 설정

## 목적

`agent-platform`은 작업 완료, 실패, 승인 필요, 스펙 구체화 필요, 장시간 진행 업데이트 같은 이벤트를 Slack, Discord, Microsoft Teams로 보낼 수 있다. 실제 웹훅 URL은 credential이므로 저장소에 저장하지 않고, 설정 파일에는 환경변수 이름만 저장한다.

## 설정 파일

- 기본 설정: `agent-platform/configs/integrations/notification-channels.json`
- 예시 환경변수 파일: `agent-platform/configs/integrations/notification-secrets.example.env`

기본 상태에서는 모든 channel의 `enabled`가 `false`다. 사용할 provider의 channel만 `true`로 바꾼 뒤, 해당 `webhook_url_env` 환경변수에 실제 웹훅 URL을 넣는다.

```bash
export AGENT_PLATFORM_DISCORD_WEBHOOK_URL="https://discord.com/api/webhooks/..."
export AGENT_PLATFORM_SLACK_WEBHOOK_URL="https://hooks.slack.com/services/..."
export AGENT_PLATFORM_TEAMS_WEBHOOK_URL="https://..."
```

## 명령

`agent-platform/`에서 실행한다.

```bash
PYTHONPATH=src python3 -m agent_platform.cli check-notifications configs/integrations/notification-channels.json
PYTHONPATH=src python3 -m agent_platform.cli check-notifications configs/integrations/notification-channels.json --require-secrets
PYTHONPATH=src python3 -m agent_platform.cli notify configs/integrations/notification-channels.json --event work_completed --title "작업 완료" --message "검증까지 끝났습니다." --severity info --dry-run
PYTHONPATH=src python3 -m agent_platform.cli notify configs/integrations/notification-channels.json --event clarification_needed --title "스펙 구체화 필요" --message "Q1=<answer>" --severity warning --dry-run
PYTHONPATH=src python3 -m agent_platform.cli notify configs/integrations/notification-channels.json --event work_completed --title "작업 완료" --message "검증까지 끝났습니다." --severity info --send
```

`--dry-run`은 provider별 payload preview만 반환한다. 실제 메시지를 보내려면 `--send`를 명시해야 한다.

`clarification_needed`는 스펙이 애매하거나 스펙/소스가 다를 때 사용한다. 메시지에는 사용자가 그대로 답할 수 있는 질문 ID와 답변 형식을 포함해야 한다.

## Provider 메모

- Slack: 공식 incoming webhook 문서는 JSON `text` payload POST를 기본으로 설명한다.
- Discord: Execute Webhook은 `content` 같은 메시지 필드가 필요하다. 기본 payload는 `allowed_mentions.parse=[]`로 accidental mention을 막는다.
- Teams: Microsoft 365 Connector는 migration/deprecation 리스크가 있으므로 새 설정은 Workflows webhook URL을 우선한다. `payload_style`은 `message_card`, `simple_text`, `adaptive_card` 중 선택할 수 있다.

## Secret 규칙

- 저장소에 실제 `webhook_url`, `token`, `secret`, `bearer_token`, `bot_token`, `incoming_webhook` 값을 넣지 않는다.
- config에는 환경변수 이름만 둔다.
- `check-notifications --require-secrets`는 enabled channel의 환경변수 존재 여부를 검사한다.
- 환경변수 값이 바뀌면 config를 수정하지 말고 shell, direnv, secret manager에서 값을 교체한다.
