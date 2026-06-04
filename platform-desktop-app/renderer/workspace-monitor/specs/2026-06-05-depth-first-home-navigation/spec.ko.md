# 스펙: Depth First Home Navigation

## 목표

- Workspace Monitor의 Overview 탭이 여러 기능 패널을 한 번에 담는 얕은 대시보드처럼 동작하지 않게 한다.
- 기본 홈은 기능 선택 메뉴 역할만 하고, 실제 기능 내용은 한 단계 들어간 단일 기능 화면에서만 보여준다.
- 사용자가 한 탭 안에서 여러 기능을 동시에 해석하지 않도록, 탭보다 깊은 drill-down 구조를 기본으로 둔다.

## 요구사항

- Overview 기본 상태는 홈 히어로와 기능 선택 메뉴만 보여준다.
- 핵심 기능 상세, 설정 점검, 루트 툴, 실행 순서, 결정함, 작업 지표, 제품 구조, 최근 기록, 옵션 상태는 각각 별도 `#home-depth-*` drill-down 화면에서 하나씩 열린다.
- drill-down 화면은 뒤로가기 컨트롤을 제공하고, 같은 화면에 다른 기능 패널을 함께 노출하지 않는다.
- 기존 탭형 핵심 기능 컴포넌트는 단일 기능 상세 컴포넌트로 바뀌어야 한다.
- desktop/tablet/mobile viewport에서 메뉴와 drill-down 화면이 수평 overflow 없이 동작해야 한다.

## 제외

- 전체 앱 routing 구조 변경
- Desktop, Source, Agents 탭 내부의 전체 워크벤치 재설계
- snapshot schema 변경
