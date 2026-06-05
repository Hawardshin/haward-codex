# 스펙: Activity Rail Intuitiveness

## 목표

- 주요 목적지 이동을 아이콘 기억에 의존하지 않고 라벨 인식으로 선택하게 한다.
- 기본 레일, 확장 레일, 모바일 상단 레일 모두에서 현재 위치와 이동 대상이 즉시 읽히게 한다.
- 레일 라벨을 추가해도 클릭 타깃, 수평 overflow, 기존 빠른 섹션 전환 성능을 해치지 않는다.

## 요구사항

- 기본 데스크톱 레일은 76px 폭 안에서 아이콘과 짧은 라벨을 함께 보여야 한다.
- nav destination 버튼은 아이콘/라벨 2행 구조를 사용하고 라벨은 `text-overflow: ellipsis`, `white-space: nowrap`으로 깨지지 않아야 한다.
- 확장 레일은 아이콘+라벨을 가로 정렬로 유지한다.
- 720px 이하 상단 레일과 420px 이하 가로 스크롤 레일에서도 목적지 라벨은 시각적으로 유지되어야 한다.
- brand, operator center, settings 아이콘 버튼은 명시적 `aria-label`을 가져야 한다.

## 제외

- 전체 내비게이션 정보구조 재설계
- 목적지 수 변경 또는 pinned section 저장 로직 변경
- command palette 검색 구조 변경
