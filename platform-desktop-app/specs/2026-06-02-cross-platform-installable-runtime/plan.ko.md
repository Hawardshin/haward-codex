# 구현 계획

## work_mode

`governance`

## 단계

1. 웹 검색으로 Tauri, Apple notarization, Microsoft Windows packaging, AI coding CLI 공식 문서를 확인한다.
2. 기존 `platform-desktop-app`, runtime language registry, CLI adapter registry를 검토한다.
3. 전문가 토론/의사결정 문서를 작성한다.
4. Windows execution profile을 추가한다.
5. Desktop distribution registry와 README를 선택된 Tauri-first 구조로 갱신한다.
6. Tauri scaffold와 readiness test를 추가한다.
7. 요구사항과 traceability를 갱신한다.
8. JSON/config/test 검증을 실행한다.
9. 누락, 리소스, CLI pipeline, hallucination/evaluation 기록을 남긴다.

## 병렬화 판단

조사와 문서 정리는 병렬 가능하지만, registry/README/spec/source scaffold는 같은 파일 경계를 바꾸므로 직렬로 처리한다.

## 설치 판단

이번 변경에서는 Rust/Tauri dependency를 설치하지 않는다. 현재 머신에 Rust가 없으며, 글로벌 또는 프로젝트 dependency 설치는 별도 설치 감사 기록과 rollback 계획이 필요하다.

