# 웹 검색 기록: 플랫폼 알림 설정

## 요청 요약

- Slack, Discord, Microsoft Teams 알림을 플랫폼 설정 파일로 켜고 끄며, 실제 토큰이나 웹훅 URL은 사용자가 넣을 수 있게 하는 기능을 추가한다.

## 검색어

- `Slack incoming webhooks official documentation 2026`
- `Discord developer documentation execute webhook`
- `Microsoft Teams incoming webhook workflow official documentation connector retirement Power Automate`
- `Python urllib.request official documentation Request urlopen`

## 확인한 출처

| 출처 | 유형 | 확인일 | 사용한 이유 |
| --- | --- | --- | --- |
| Slack Developer Docs: Sending messages using incoming webhooks, `https://docs.slack.dev/messaging/sending-messages-using-incoming-webhooks/` | official | 2026-06-01 | Slack incoming webhook가 JSON `text` payload를 받는다는 구현 근거 |
| Discord Developer Docs: Webhook Resource / Execute Webhook, `https://docs.discord.com/developers/resources/webhook#execute-webhook` | official | 2026-06-01 | Discord webhook payload에 `content` 등 메시지 필드가 필요하고 mention 제어가 필요하다는 근거 |
| Microsoft Support: Send messages in Teams using incoming webhooks, `https://support.microsoft.com/en-US/Workflows/send-messages-in-teams-using-incoming-webhooks` | official | 2026-06-01 | Teams Workflows 기반 webhook 설정과 Adaptive/Message card 지원 확인 |
| Microsoft Learn: Manage Microsoft 365 connectors and custom connectors, `https://learn.microsoft.com/en-us/microsoftteams/m365-custom-connectors` | official | 2026-06-01 | Microsoft 365 Connector deprecation과 Workflows webhook 우선 권장 근거 |
| Python Docs: `urllib.request`, `https://docs.python.org/3/library/urllib.request.html` | official | 2026-06-01 | 외부 dependency 없이 HTTP POST를 구현할 수 있는 표준 라이브러리 근거 |

## 약한 출처 또는 보조 신호

- Reddit와 vendor 문서가 Teams connector migration 문제를 다수 언급했지만, 구현 결정에는 공식 Microsoft 문서만 사용했다.
- 커뮤니티 글은 Teams migration 리스크 발견 신호로만 취급하고 사실 근거로 쓰지 않았다.

## 계획에 반영한 내용

- 실제 webhook URL은 credential이므로 설정 파일에는 저장하지 않고 환경변수 이름만 저장한다.
- 기본 CLI 실행은 dry-run으로 두고 실제 발송은 `--send`를 명시할 때만 수행한다.
- Teams channel은 Workflows webhook URL을 우선 추천하고, payload style을 `message_card`, `simple_text`, `adaptive_card`로 선택 가능하게 둔다.
- Python 표준 라이브러리만 사용해 추가 설치 없이 구현한다.

## 불확실성

- Teams Workflows의 구체 payload 요구는 tenant와 workflow template에 따라 다를 수 있다. 그래서 설정에서 payload style을 선택할 수 있게 하고 실제 발송 전 dry-run과 provider별 테스트를 요구한다.

## 공개 판단 요약

- 이 작업은 최신 provider 정책의 영향을 받으므로 공식 문서 기반으로 설계한다.
- secret 값은 저장소에 남기지 않는 구조가 가장 안전하며, 사용자 입력은 환경변수로 받는 것이 적합하다.

