# 계획: 런타임 조사/설계

## 근거 요약

- ADR 관련 자료는 중요한 아키텍처 결정을 맥락과 결과와 함께 남기는 방식을 설명한다.
- Thoughtworks는 lightweight ADR을 evolutionary architecture의 결정 기록 방식으로 소개한다.
- Google Cloud architecture framework는 architecture documentation이 future design decisions를 돕는다고 설명한다.
- 기존 language decision registry는 언어 방향과 측정 gate를 이미 갖고 있으므로, 이를 조사/설계 workflow와 template로 확장한다.

## 실행 순서

1. `REQ-WS-052`를 추가한다.
2. language decision registry에 research/design process와 decision/prototype contract를 추가한다.
3. runtime language policy에 조사/설계 절차를 추가한다.
4. workflow, prompt, ADR-style template을 추가한다.
5. prompt router와 operations index에서 찾을 수 있게 한다.
6. 히스토리, 조사, 평가, 타이밍 기록을 작성한다.
7. 검증 후 커밋하고 push한다.

## 위험과 대응

- 위험: 결정 기록이 너무 무거워져 작은 작업이 느려질 수 있다.
- 대응: meaningful blast radius가 있을 때 후보 설계/ADR을 요구하고, 작은 작업은 간단 기록으로 처리한다.
- 위험: 커뮤니티 신호를 사실 증명으로 오해할 수 있다.
- 대응: 공식 문서와 로컬 측정은 factual anchor, 커뮤니티 신호는 risk/adoption signal로 분리한다.
