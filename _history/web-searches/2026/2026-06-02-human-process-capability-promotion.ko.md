# 웹 검색 기록: Human Process Capability Promotion

## 요청

- 요청 ID: `UR-2026-06-02-030`
- 사용자 요약: capability promotion과 아이디어 평가가 “직접 사람이 하는 것처럼” 동작해야 한다.
- 작업 모드: `governance`

## 검색어

- `human-centered AI workflow automation human in the loop official guidance task analysis`
- `AI agents human in the loop workflow design official guidance`
- `human-centered design AI systems NIST human in the loop automation guidance`
- `design thinking workflow empathy define ideate prototype test official`

## 확인한 출처

| 출처 | 유형 | 확인 내용 | 반영 |
| --- | --- | --- | --- |
| NIST Human Centered Design | 공식/표준 성격 | 사용자, 작업, 환경 이해와 요구사항, 설계, 평가가 인간 중심 설계 활동의 핵심이다. | capability promotion 전에 목표, 맥락, 작업 산출물을 먼저 모델링하도록 반영 |
| NIST AI Use Taxonomy | 공식 연구/분류 | 인간-AI 상호작용은 인간 목표와 결과를 기준으로 task/activity를 분해해야 한다. | generated idea가 사용자 문구가 아니라 human process step에서 나오도록 반영 |
| IDEO Design Thinking Process | 방법론 레퍼런스 | 문제 framing, 영감 수집, synthesis, 아이디어 생성, tangible prototype, test, story 흐름을 제시한다. | “사람처럼”을 목표 정의, 조사, 합성, 선택지 비교, 검증, 인수인계로 정리 |
| Open Practice Library Human-in-the-Loop | 실무 레퍼런스 | 위험 수준별로 human review gate를 두고, 사람이 검토/승인/수정할 지점을 명시한다. | 고위험 판단은 human checkpoint로 남긴다는 기존 규칙 보강 |

## 제외하거나 약하게 본 출처

- 일반 블로그와 뉴스성 글은 현재 durable rule 변경에는 공식/표준 성격 자료보다 약해 보아 보조 신호로만 취급했다.
- Reddit 등 커뮤니티 논의는 이번 변경의 근거로 직접 쓰지 않았다.

## 계획 반영 인사이트

- “사람처럼”은 인간 말투를 흉내 내는 것이 아니라, 유능한 사람이 실제로 남기는 작업 순서와 산출물을 재현하는 것이다.
- capability promotion은 idea generation 전에 `human_process_model`을 기록해야 한다.
- generated idea는 사용자 문구만 보지 않고, 구체적인 human process step을 줄이거나 안정화하는 방향이어야 한다.
- human checkpoint는 자동화를 막는 장치가 아니라 위험·권한·책임이 남는 지점을 명시하는 장치다.

## 남은 불확실성

- 실제 자동 scoring UI나 background worker는 아직 구현하지 않았다. 이번 변경은 durable contract와 문서/설정 보강이다.

