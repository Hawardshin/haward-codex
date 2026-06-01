# 요구사항 변경: 플랫폼 알림 설정

## 변경 ID

- `REQ-WS-025`

## 출처 요청

- `UR-2026-06-01-007`

## 변경 내용

- Slack, Discord, Microsoft Teams 알림을 플랫폼 공통 설정 파일에서 켜고 끌 수 있어야 한다.
- 실제 토큰, 웹훅 URL, secret 값은 저장소에 넣지 않고 사용자가 환경변수로 주입해야 한다.
- 설정 파일은 사람이 열어봐도 provider, event, severity, secret 처리 방식을 이해할 수 있어야 한다.
- 기본 실행은 dry-run으로 두어 테스트와 평가 중 외부 메시지가 실수로 발송되지 않게 한다.

## 근거

- Slack 공식 문서는 incoming webhook URL로 JSON `text` payload를 POST하는 방식을 설명한다.
- Discord 공식 문서는 incoming webhook 실행 시 `content` 같은 메시지 필드가 필요하다고 설명한다.
- Microsoft Teams는 기존 Microsoft 365 Connector가 deprecation 흐름에 있으므로 새 설정은 Workflows webhook URL을 우선하도록 문서화한다.

## 검증

- notification 설정 파일이 self-documenting config contract를 통과해야 한다.
- enabled channel이 secret 환경변수를 요구할 수 있어야 한다.
- inline secret 필드는 gap으로 판정해야 한다.
- dry-run은 실제 네트워크 호출 없이 provider별 payload preview를 반환해야 한다.

