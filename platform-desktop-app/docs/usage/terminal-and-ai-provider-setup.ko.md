# 터미널과 AI 제공자 설정 사용법

## 목적

데스크톱 앱에서 터미널을 실제 작업 도구로 쓰고, GPT/OpenAI와 Gemini/Google을 빠르게 연결하기 위한 사용자 절차를 고정한다.

## 터미널 세팅

1. 앱을 실행한 뒤 하단 `터미널` 버튼을 연다.
2. `시작` 탭에서 어댑터, 작업 폴더, 초기 입력을 확인한다.
3. 실제 OS 셸이 필요하면 `PTY` 탭에서 `PTY 셸 시작`을 누른다.
4. PTY 화면에서는 검색, 이전/다음 검색, 선택 복사, 붙여넣기, 화면 정리, 화면 맞춤, 빠른 명령을 사용한다.
5. 자주 쓰는 경로는 `시작` 탭의 작업 폴더 선택지에서 먼저 고르고, 필요한 경우 직접 입력한다.

## 터미널 단축키

- `Cmd/Ctrl+F`: PTY 출력 검색 입력으로 이동
- `Cmd/Ctrl+Shift+C`: 선택 영역 복사, 선택이 없으면 현재 출력 복사
- `Cmd/Ctrl+Shift+V`: 클립보드 내용을 PTY에 붙여넣기
- `Cmd/Ctrl+L`: PTY 화면 정리

## GPT/OpenAI 설정

1. `설정` > `초기화` > `계정 연결`을 연다.
2. `GPT / OpenAI` 카드에서 `로그인/키 발급`을 누른다.
3. 열린 OpenAI Platform API keys 페이지에서 대상 계정으로 로그인하고 프로젝트 API key를 만든다.
4. 앱의 `GPT / OpenAI` row에 계정 메모와 API key를 붙여넣고 `저장`을 누른다.
5. 저장되면 `작업 기본값`을 눌러 Agent 작업의 기본 제공자로 선택한다.

OpenAI API는 공식적으로 API key 인증을 사용한다. 이 앱은 ChatGPT 웹 세션 쿠키나 비공식 브라우저 토큰을 저장하지 않는다.

## Gemini/Google 설정

1. `설정` > `초기화` > `계정 연결`을 연다.
2. `Gemini / Google` 카드에서 `로그인/키 발급`을 누른다.
3. 열린 Google AI Studio API keys 페이지에서 대상 Google 계정으로 로그인하고 Gemini API key를 만든다.
4. 앱의 `Gemini / Google` row에 계정 메모와 API key를 붙여넣고 `저장`을 누른다.
5. 저장되면 `작업 기본값`을 눌러 Agent 작업의 기본 제공자로 선택한다.

Gemini API의 가장 단순한 로컬 개발 인증 경로는 API key다. Vertex AI OAuth 또는 Application Default Credentials는 별도 production provider flow로 다룬다.

## 보안 경계

- 저장된 키는 로컬 앱 설정 저장소에만 기록되고 UI와 report에는 원문이 남지 않는다.
- 공개 배포 전에는 OS keychain 저장소로 교체해야 한다.
- 지원 번들이나 customer snapshot에는 원문 credential을 포함하지 않는다.
- provider CLI 실행 시에는 matching adapter에만 `OPENAI_API_KEY` 또는 `GEMINI_API_KEY`를 환경변수로 주입한다.

## 공식 근거

- OpenAI API authentication: https://platform.openai.com/docs/api-reference/authentication
- OpenAI project API keys: https://platform.openai.com/docs/api-reference/project-api-keys
- Gemini API keys: https://ai.google.dev/gemini-api/docs/api-key
- Vertex AI authentication: https://docs.cloud.google.com/vertex-ai/docs/authentication
