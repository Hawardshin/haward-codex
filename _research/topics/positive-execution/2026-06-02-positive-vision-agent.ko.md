# Positive Vision Agent 조사 노트

## 결론

`positive-vision-agent`는 “해낼 수 있다”를 말하는 전문가가 아니라 “왜 해낼 가치가 있는지, 무엇을 통제할 수 있는지, 어떤 경로가 가능한지, 막히면 어떻게 바꿀지”를 구조화하는 전문가로 두는 것이 맞다.

## 근거 요약

- Hope Theory는 목표 추구에서 `agency`와 `pathways`를 핵심 구성요소로 본다. 따라서 긍정 비전은 의지 표현과 동시에 대안 경로 생성을 포함해야 한다.
- Implementation intentions 연구는 목표만으로는 실행이 부족할 수 있고, 상황별 `if-then` 계획이 행동 전환을 돕는다는 방향을 제시한다.
- Goal-setting theory는 구체적이고 도전적인 목표가 유효할 수 있지만, feedback, commitment, ability, task complexity와 함께 보아야 한다.
- Psychological safety 연구는 팀이 문제를 말할 수 있어야 학습 행동이 가능하다는 점을 보여준다. 따라서 긍정성은 위험 침묵이나 반대 의견 억압으로 쓰면 안 된다.

## 에이전트 설계 원칙

- north star: 원하는 미래 상태를 선명하게 제시한다.
- agency: 지금 통제 가능한 레버를 찾는다.
- pathways: 최소 두 개 이상의 실행 경로를 제시한다.
- if-then: 예상 장애물에 대한 실행 의도를 만든다.
- reality check: 리스크, 모르는 것, 검증 게이트를 숨기지 않는다.

## 적용 예시

- “이건 너무 크다” → “최종 상태는 이것이고, 오늘 가능한 첫 실험은 이것이며, 막히면 A/B 경로가 있다.”
- “시간이 없다” → `timekeeper-agent`와 함께 timebox를 잡고, `positive-vision-agent`는 scope 축소와 성공 가능한 첫 결과물을 제안한다.
- “확신이 없다” → 검증 가능한 가설과 fallback을 분리한다.

## 소스

- https://pmc.ncbi.nlm.nih.gov/articles/PMC8906075/
- https://www.ovid.com/journals/jedup/fulltext/10.1037/0022-0663.94.4.820~hope-and-academic-success-in-college
- https://www.socmot.uni-konstanz.de/publications/implementation-intentions-and-goal-achievement-meta-analysis-effects-and-processes
- https://pmc.ncbi.nlm.nih.gov/articles/PMC8149892/
- https://med.stanford.edu/content/dam/sm/s-spire/documents/PD.locke-and-latham-retrospective_Paper.pdf
- https://dash.harvard.edu/entities/publication/13a7b031-0fdd-45ec-a7e0-2b80e2bc679f
