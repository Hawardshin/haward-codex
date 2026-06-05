# 요구사항: AI EVAL cockpit 사용성 개선

## 사용자 요구

사용자는 전체적인 사용성, 성능, UI, 기능 개선을 계속 요구했고, 특히 히스토리, 토큰 수, 어떤 툴을 사용했는지, 점수 비교, AI 평가 기능, 오픈소스 EVAL 기능을 탭으로 추가해 현재 작업 평가와 보고서에 적용하라고 요청했다. 또한 Tool Studio 캐릭터는 물개를 사용하라고 요청했다.

## 기능 요구사항

- Workspace Monitor에 `eval` 섹션을 추가하고 사용자/개발자/슈퍼어드민 뷰 모드에서 접근 가능하게 한다.
- EVAL 섹션은 현재 작업 점수, 근거 커버리지, 툴 사용 기록, 토큰/비용 추적 가능성을 한 화면에 보여준다.
- EVAL 섹션은 평가 기록, 웹 검색 기록, 작업 요약, request trace, work timing, 요구사항/스펙 기록을 비교한다.
- 오픈소스 EVAL 후보를 레지스트리에 반영하고 UI에서 후보/패턴을 볼 수 있게 한다.
- 외부 EVAL runner 설치는 이번 slice에서 하지 않고, 설치 감사와 라이선스/보안 검토가 필요한 후보로 남긴다.
- Tool Studio 3D 캐릭터는 일반 캐릭터가 아니라 물개형 파츠와 명칭을 사용한다.

## 비기능 요구사항

- 탭 이동 지연을 줄이기 위해 EVAL 섹션은 resident/preload 대상에 포함한다.
- EVAL UI는 기본 HTML 버튼/목록처럼 보이지 않도록 기존 디자인 토큰과 명확한 점수/상태 스타일을 사용한다.
- 사용자 뷰에서 EVAL은 보이지만 프로젝트/히스토리/구조/문서/요구사항 같은 운영자 전용 섹션은 계속 숨긴다.
- 기존 탭, 런타임, 문서 필터, Tool Studio 동작을 깨지 않는다.
- 구현 후 테스트, 빌드, 내부 패키징까지 자동으로 실행한다.

## 제외

- promptfoo, DeepEval, Phoenix, Opik, Langfuse, Inspect AI, OpenAI Evals, Ragas 설치와 실행 통합은 후속 설치 감사가 필요하다.
- 공개 배포용 signing, notarization, updater, clean-machine smoke는 기존 public release blocker로 유지한다.
