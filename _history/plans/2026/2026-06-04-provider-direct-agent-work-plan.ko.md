# Provider Direct Agent Work Plan

## 요청

- `UR-2026-06-04-007`: 연결된 Gemini, Claude, ChatGPT 계정을 기반으로 실제 작업도 수행한다.

## 결정

- provider API 직접 실행을 추가한다.
- 외부 CLI는 optional fallback lane으로 유지한다.
- 작업 결과는 기존 task-run store에 저장해 축적 데이터 구조와 연결한다.
- raw secret은 task-run record, UI report, support bundle에 저장하지 않는다.

## 대안 비교

- Direct provider API command
  - 장점: 외부 CLI 설치 없이 연결 계정으로 즉시 작업 가능, 앱이 실행 기록을 직접 소유.
  - 단점: provider별 API schema drift와 모델명 변경 대응 필요.
  - 선택.
- CLI-only execution
  - 장점: 이미 구현된 terminal/task-run path 재사용.
  - 단점: 사용자의 “계정 기반 실제 작업” 요구와 “바로 쓰기” UX를 충족하지 못함.
  - fallback으로 유지.
- Consumer web login embed
  - 장점: 사용자에게 친숙한 로그인 화면.
  - 단점: 쿠키/session 보관 위험과 공식 제3자 앱 패턴 부재.
  - 제외.

## 검증 계획

- Rust compile: `cargo check`
- Renderer type/layout checks
- Desktop tests/check
- Customer build
- Config contract checks
- Browser smoke for Search Agent Work Chat provider controls
- Omission/resource/evaluation 기록
