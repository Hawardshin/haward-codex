# Spec: 데스크톱 전용 UI 경계

## 목표

설치형 데스크톱 앱의 모바일 UI 전환을 제품 요구사항에서 제거하고, 최소 창 크기와 renderer 최소 캔버스를 고정해 activity rail, 작업대, 터미널, 코드 편집 표면이 데스크톱 밀도를 유지하게 한다.

## 범위

- Tauri main window 기본/최소 크기 상향
- renderer 전역 최소 폭/높이 token 추가
- 720px/420px 모바일 전용 CSS 제거
- surface audit와 scroll/readiness 테스트를 1280x800 데스크톱 최소 창 기준으로 변경
- 현재 요구사항 문서에서 모바일 acceptance 제거

## 비범위

- compact desktop fallback 전체 삭제
- 레이아웃 컴포넌트 대규모 분리
- OS별 public signing/notarization 변경

## 결정

- 제품 최소 창: `1280x800`
- 기본 실행 창: `1440x900`
- 모바일 viewport QA는 제품 acceptance가 아니다.
- 브라우저 preview에서도 renderer root는 `--desktop-app-min-width`와 `--desktop-app-min-height`를 유지한다.
