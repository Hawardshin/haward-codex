# 연구 메모: Desktop User Improvements

- 날짜: 2026-06-02
- 신뢰도: 중간. 공식 문서와 제품 신호를 분리해서 사용했다.

## 요약

사용자 측면의 다음 개선은 자동화 실행력을 늘리는 것보다 설정, 결정, 의도 선택을 쉽게 만드는 쪽이 더 안전하고 효과적이다.

## 적용한 판단

- CLI 설치는 보안과 환경 편차가 크므로 자동 설치보다 setup guide와 verification command가 먼저다.
- HITL decision은 단순 “나중에 답변”이 아니라 answer type, 답변 본문, 상태 변경, history 기록이 필요하다.
- session prompt는 사용자가 매번 새로 쓰기보다 `User Task`, `Platform Improvement`, `Knowledge Accumulation`, `Review & Verify` 같은 프리셋으로 시작하는 것이 빠르다.

## 한계

- 실제 provider auth UX는 아직 구현하지 않았다.
- 공식 설치 링크는 UI 안내용이며 앱이 설치 명령을 실행하지 않는다.
- OpenCode는 최종 UI 링크를 `https://opencode.ai/docs/cli/`로 두고, `https://opencli.co/cli/opencode`는 package discovery 보조 신호로만 사용했다.
