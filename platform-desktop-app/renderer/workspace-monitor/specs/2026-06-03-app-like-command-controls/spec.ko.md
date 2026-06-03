# 스펙: 앱형 Command Controls

## 목적

Workspace Monitor는 실제 앱처럼 많은 기능을 빠르게 찾고 실행할 수 있어야 한다. 핵심 rail과 grouped tabs만으로는 기능 수가 늘어날수록 반복 이동이 느려지므로, 전역 command palette와 pinned/recent quick controls를 추가한다.

## 범위

- `app-control-bar`를 추가해 command palette, pinned sections, recent sections를 노출한다.
- command palette는 섹션, view mode, language mode, 문서 category filter, 주요 quick action을 검색하고 실행한다.
- pinned sections는 브라우저 `localStorage`에 저장하되, 사용 불가 환경에서는 조용히 degrade한다.
- recent sections는 현재 session state로 유지한다.
- keyboard listener는 mount 시 등록하고 unmount 시 제거한다.
- view mode에 허용되지 않은 section은 pinned/recent controls에서 숨긴다.

## 비목표

- 서버 저장소나 원격 사용자 설정 저장소를 추가하지 않는다.
- 고객 snapshot redaction을 client-side UI 숨김으로 대체하지 않는다.
- 별도 command palette 라이브러리를 설치하지 않는다.
- 이번 slice에서 모든 panel을 모듈 분리하지 않는다.

## 수용 기준

- `app-control-bar`가 command trigger, pinned controls, recent controls를 렌더링한다.
- command palette에서 section/view/language/category/action을 실행할 수 있다.
- keyboard event listener가 cleanup된다.
- localStorage 실패 시 앱이 깨지지 않는다.
- `npm test`, `npm run check`, `npm run build`, `npm run perf:budget`, customer bundle validation, static export smoke가 통과한다.
