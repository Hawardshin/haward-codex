# 웹 검색 기록: 플랫폼 발표 팩

## 검색 목적

현재 workspace platform을 발표할 때 빠지는 내용 없이 구조화하기 위해 기술 발표 스토리텔링, 슬라이드 디자인, 발표 자료 평가 기준을 확인했다.

## 검색 일시

- 날짜: 2026-06-01
- 작업 모드: `standard`

## 검색 쿼리

- `technical presentation structure storytelling best practices evidence design slides audience developer platform`
- `presentation design best practices technical architecture platform overview slide deck storytelling`
- `Nancy Duarte presentation storytelling structure technical presentation best practices`

## 확인한 주요 출처

| 출처 | 유형 | 확인 내용 | 적용 |
| --- | --- | --- | --- |
| Duarte presentation structure resources, https://www.duarte.com/training/presentation-formula/ | 전문 발표 교육/프레임워크 | 좋은 발표는 현재 상태와 가능 상태 사이를 오가며 청중에게 변화의 이유를 보여준다. | 전체 플랫폼 발표를 “채팅에서 사라지는 판단”에서 “문서화된 AI 작업 OS”로 이동하는 이야기로 구성 |
| Duarte blog on presentation story techniques, https://www.duarte.com/blog/move-presentation-audience-with-story-techniques-in-presentations/ | 전문 발표 아티클 | 스토리 구조와 Big Idea를 통해 설득 흐름을 만든다. | 각 덱의 첫 슬라이드는 topic label이 아니라 claim으로 시작 |
| Harvard Catalyst slide guidance, https://catalyst.harvard.edu/writing-communication-center/visualize-science/slides/ | 대학 커뮤니케이션 가이드 | assertion-evidence 구조와 cognitive overload 회피를 권장한다. | 한 슬라이드에 하나의 주장과 하나의 proof object를 우선 |
| MIT AeroAstro Communication Lab slide design, https://mitcommlab.mit.edu/aeroastro/commkit/slide-design/ | 대학 커뮤니케이션 가이드 | 기술 발표에서는 청중과 목적에 맞는 detail 수준, 시각적 집중, distraction 최소화가 중요하다. | 화면에는 핵심 주장, 상세 설명은 speaker notes에 배치 |
| Pitch presentation structure guide, https://pitch.com/guides/presentation/structure-your-presentation | 발표 도구 가이드 | audience와 takeaway를 중심으로 deck 구조를 정한다. | 전체 덱과 프로젝트별 덱을 분리해 청중이 필요한 단위로 선택 가능하게 구성 |

## 약한 출처와 제외

- 일반 SEO형 “best PPT template” 글은 디자인 영감으로만 보고 근거로 사용하지 않았다.
- Reddit/커뮤니티 조언은 발견 신호로만 보고, 이번 덱의 사실 근거로 사용하지 않았다.

## 계획 영향

- 전체 플랫폼 덱은 문제, 전환, 운영 루프, 프로젝트 포트폴리오, 실행 방법 순서로 구성한다.
- 프로젝트별 덱은 같은 형식을 유지하되 각 프로젝트의 목적, 범위, 주요 파일, 산출물, 검증, 다음 행동을 별도로 다룬다.
- 상세한 운영 항목은 화면 본문보다 speaker notes에 더 많이 넣어 누락을 줄인다.
- HTML 덱은 기존 `presentation_agent.html_deck` renderer를 사용해 발표자 노트, 진행률, 키보드 이동을 포함한다.

## 불확실성

- 실제 발표 시간과 청중이 아직 정해지지 않았다. 따라서 덱은 “긴 전체 설명과 프로젝트별 분리 발표”에 맞춘 기본 준비본이며, 발표 시간에 따라 축약 버전을 따로 만들 수 있다.
