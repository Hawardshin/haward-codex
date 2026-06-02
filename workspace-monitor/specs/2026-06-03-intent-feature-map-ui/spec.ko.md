# 스펙: Intent Feature Map UI

## 상태

- 상태: `implemented`
- 날짜: 2026-06-03
- 소유 프로젝트: `workspace-monitor/`
- 요구사항: `REQ-WM-021`
- 출처 요청: `UR-2026-06-03-016`

## 문제

사용자 의도 155개를 기능군과 Now/Next/Later 후보로 정리한 기록이 문서로만 남아 있으면 다음 구현 우선순위를 앱 안에서 바로 판단하기 어렵다.

## 동작

- snapshot collector는 `_history/intent-feature-maps/2026/2026-06-03-user-intent-feature-map.ko.md`를 읽어 `intentFeatureMap` 객체를 생성한다.
- `intentFeatureMap`은 총 의도 수, 기능 축 수, Now/Next/Later 후보 수, 12개 기능 축, 로드맵 후보, 출처/한계 요약을 포함한다.
- Workspace Monitor는 developer/superadmin 보기에서 `Intent Map` 섹션을 보여준다.
- Overview는 압축 패널로 의도 수, 기능 축, Now 후보, Next/Later 후보를 보여준다.
- 고객 설치용 customer snapshot은 내부 히스토리 기반 `intentFeatureMap`을 비운다.

## 비범위

- 원문 채팅 전문 보존
- `_private/` 또는 민감 로컬 파일 열람
- customer snapshot에서 내부 기능 지도 노출
- roadmap 후보 자동 실행

