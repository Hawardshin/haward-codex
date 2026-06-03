# 계획: 사용자 관점 품질 Gate

## 범위

- 소유 영역: 공유 지속 지시 `_docs/instructions/`, memory bootstrap `agent-platform/configs/memory/`
- 작업 모드: `standard`
- 설치 모드: 해당 없음
- 보기 모드: 해당 없음

## Memory Bootstrap

- hot anchor: `_docs/instructions/persistent-instructions.md`
- hot anchor: `_docs/instructions/persistent-instructions.ko.md`
- hot anchor: `_docs/instructions/persistent-instructions.en.md`
- hot anchor: `agent-platform/configs/memory/bootstrap-manifest.json`

## 작업 단계

1. Web-first intake로 사용자 중심 설계/사용성/접근성 기준을 확인한다.
2. 지속 지시 문서 한/영/공통 파일에 사용자 관점 품질 gate를 추가한다.
3. memory bootstrap manifest에 해당 gate를 hot anchor 용도로 추가한다.
4. 요청/검색/평가/누락 점검/작업 시간 기록을 남긴다.
5. docs audit, config contract, JSON 검증, diff check를 통과시킨다.

## 비범위

- 이번 변경은 데스크톱 앱 UI 자체를 추가 구현하지 않는다.
- 다음 제품 workbench slice에서는 이 gate를 적용해 사용자 목표/첫 행동/피드백/혼란 지점/성공 근거를 별도로 점검한다.
