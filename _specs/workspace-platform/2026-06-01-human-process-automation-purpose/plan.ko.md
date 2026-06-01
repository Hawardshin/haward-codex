# 계획: 인간 프로세스 자동화 목적

## 작업 모드

- `governance`

## 근거

- Google SRE toil 문서는 반복적이고 자동화 가능한 수작업을 줄여 장기적인 engineering work에 시간을 쓰는 기준을 제공한다.
- Google SRE workbook의 toil 제거 논리는 반복 작업을 식별, 정량화, 위험/ROI와 함께 개선하라는 근거를 제공한다.
- IBM LiveAction 연구는 사용자가 반복 작업을 인식하지 못해도 실제 사용 데이터에는 자동화 가능한 반복 행동이 존재한다는 점을 보여준다.
- IBM RPA와 Microsoft process/task mining 문서는 반복 업무를 인간 행동 모델과 프로세스 데이터에서 찾아 자동화 기회로 바꾸는 방향을 설명한다.

## 단계

1. 웹 검색과 기존 문서를 확인한다.
2. 요구사항 기준선, 변경 기록, 검토 기록을 갱신한다.
3. 철학, identity, README, governance 문서를 갱신한다.
4. persistent instructions, AGENTS, memory bootstrap에 목적을 반영한다.
5. 스펙, 연구 노트, 계획, 요청 요약, trace, work summary, timing record를 작성한다.
6. config, memory, docs, naming, structure, grounding, evaluator, work-timer를 검증한다.
7. 의미 있는 변경 단위로 commit하고 push한다.

## 병목 후보

- 문서가 여러 계층에 걸쳐 있어 같은 목적을 서로 다른 표현으로 일관되게 맞추는 작업이 가장 오래 걸릴 수 있다.
- 새 규칙이 “자동화를 무조건 늘리자”로 오해되지 않게 검증/rollback 경계를 같이 반영해야 한다.
