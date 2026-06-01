# 런타임 조사/설계 웹 검색 기록

## 요청

효율적인 언어 방향을 정할 때 조사도 하고, 그 과정을 설계해 달라는 요청.

## 검색어

- `Architecture Decision Records ADR official documentation Michael Nygard`
- `Thoughtworks Technology Radar lightweight architecture decision records ADR`
- `Google Cloud architecture framework system design decisions official documentation`
- `Microsoft Architecture Center design review checklist official documentation`

## 확인한 출처

- ADR GitHub: ADR과 architectural knowledge management 참고 모음.
- Thoughtworks Lightweight Architecture Decision Records: context와 consequences를 짧게 기록하는 결정 기록 관행.
- Google Cloud Well-Architected Framework: architecture documentation이 future design decisions에 필요하다는 관점.
- 관련 Reddit/개인 글은 실무 신호로만 보았고 정책 근거로 직접 쓰지 않았다.

## 계획 반영

- 런타임 선택은 source research에서 끝나지 않고 candidate design, ADR draft, prototype measurement plan으로 이어진다.
- workflow와 prompt를 따로 만들어 다음 작업에서 반복할 수 있게 한다.
- template을 만들어 후보 설계와 결정 기록이 같은 형식으로 남도록 한다.

## 제외한 약한 출처

- 일반 블로그와 Reddit 글은 채택/실무 신호로만 보고, 결정 기록 구조의 근거는 ADR/Thoughtworks/architecture framework 중심으로 잡았다.

## 남은 불확실성

- 실제 런타임 선택에서는 프로젝트별 로컬 prototype 측정값이 필요하다.
