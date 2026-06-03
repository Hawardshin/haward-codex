# 웹 검색 기록: 미뤄진 작업 커버리지 감사

- 날짜: 2026-06-03
- 작업 모드: `governance`
- 관련 요청: `UR-2026-06-03-037`

## 검색 쿼리

- `requirements traceability audit backlog deferred work software product management official guidance`
- `NIST SP 800-53 SA-11 Developer Testing and Evaluation official requirements traceability`
- `Atlassian backlog refinement official requirements traceability deferred work product management official`
- `site:atlassian.com/agile/project-management backlog refinement Atlassian`

## 확인한 출처

| 출처 | URL | 신뢰도 | 사용 방식 |
| --- | --- | --- | --- |
| NIST Cybersecurity and Privacy Reference Tool / SP 800-53 SA-11 | https://csrc.nist.gov/projects/cprt/catalog#/cprt/framework/version/SP_800_53_5_1_1/home?element=SA-11 | 높음, 공식 `.gov` | 의미 있는 소프트웨어 작업은 테스트/평가 증거를 남겨야 한다는 보조 근거로 사용 |
| Atlassian Backlog Refinement Guide | https://www.atlassian.com/agile/scrum/backlog-refinement | 중간, vendor guidance | deferred/backlog 항목을 명시적으로 검토, 우선순위화, 준비 상태화해야 한다는 보조 근거로 사용 |

## 약한 출처와 제외

- 일반 블로그, SEO성 요구사항 추적성 글, 비공식 템플릿 사이트는 로컬 히스토리/소스 증거보다 약하므로 계획 근거로 쓰지 않았다.
- 웹 검색은 절차/관리 방식의 보조 확인에만 사용했다. 실제 gap 판정은 `_history/`, `platform-desktop-app/specs/`, `platform-desktop-app/configs/`, readiness/test, 대표 source를 기준으로 했다.

## 계획 영향

- deferred work를 채팅 답변으로만 두지 않고 `platform-desktop-app/configs/product-gap-registry.json`에 gap ID, priority, acceptance criteria, recommended next slice로 고정한다.
- 검증 증거를 `check-config-contract`, `check-omissions`, `platform-desktop-app test/check`와 평가 기록에 남긴다.

## 불확실성

- 외부 출처는 이 프로젝트의 구체적인 Agent Factory 구현 여부를 판단할 수 없다.
- 공개 배포 readiness는 signing/notarization/updater/clean-machine smoke 자산이 필요한 외부 gate라 이번 감사에서 완료 처리할 수 없다.
