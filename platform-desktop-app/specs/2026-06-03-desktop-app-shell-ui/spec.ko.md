# 데스크톱 앱 셸 UI 스펙

## 목표

`workspace-monitor` 기반 화면을 설치형 플랫폼의 실제 데스크톱 앱 셸처럼 보이도록 재구성한다.

## 범위

- 앱 titlebar
- 좌측 activity rail
- 보조 sidebar
- 설정 대화상자
- 홈 화면 정보 구조 축소
- 반응형 CSS 조정

## 결정

- UI 구현은 기존 `workspace-monitor`에 유지한다.
- `platform-desktop-app/src`에 새 프론트엔드 앱을 만들지 않는다.
- 외부 오픈소스 앱은 직접 클론/복사하지 않고 패턴 참고로만 사용한다.
- 설정 변경은 모달 대화상자에서 처리한다.

## 성공 기준

- 기본 화면이 데스크톱 앱 셸처럼 보인다.
- view/language/pinned 설정이 설정 대화상자 안에 있다.
- overview가 모든 패널을 펼치지 않고 주요 흐름 중심으로 축소된다.
- TypeScript check, test, build가 통과한다.
