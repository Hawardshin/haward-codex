# 런타임 조사/설계 프로세스 조사

## 질문

Rust, Go, Tauri, Wails, Electron 같은 런타임 선택을 어떻게 조사하고 설계 기록으로 남길 것인가?

## 판단

런타임 선택은 단순 기술 비교가 아니라 architecture decision이다. 따라서 공식 문서 조사, 후보 아키텍처 설계, decision record, prototype measurement plan이 함께 있어야 한다.

## 참고 근거

- ADR 자료는 중요한 아키텍처 결정을 context와 consequences와 함께 남기는 방식을 제공한다.
- Thoughtworks는 lightweight ADR을 future maintainer와 oversight에 유용한 결정 기록 방식으로 설명한다.
- Google Cloud architecture framework는 시스템 구축 시 architecture documentation이 future design decisions를 돕는다고 설명한다.

## 적용 구조

1. 문제와 컴포넌트 경계를 정의한다.
2. 공식 문서, ADR/architecture 참고, 오픈소스 구현, 이슈/토론, 반대 사례를 분리해 조사한다.
3. 최소 두 후보 설계를 비교한다.
4. ADR-style 결정 기록을 남긴다.
5. 성능/packaging 이유가 있으면 prototype measurement plan을 작성한다.
6. 설치가 필요하면 설치 감사 기록을 먼저 만든다.

## 적용 파일

- `agent-platform/configs/runtime/language-decision-registry.json`
- `_ops/workflows/64-runtime-language-research-design.md`
- `_ops/prompts/94-runtime-language-research-design.md`
- `_templates/runtime-language-decision/runtime-language-decision.ko.md`
