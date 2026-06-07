# 요구사항 변경: 기본 사용자 인터페이스 단순화

## 변경 요약

- `REQ-WS-061`: 현재 기본 `view_mode`를 `superadmin_developer`에서 `user`로 변경한다.
- `REQ-WM-011`: Workspace Monitor view mode selector의 기본값을 사용자 보기로 변경한다.
- `REQ-WM-076`: 기본 사용자 보기는 작업 요청 입력, 자동 실행 시작, 실행 상태, 결과 확인만 전면에 둔다.

## 배경

사용자가 플랫폼 사용법이 복잡하고 커스텀 기능이 전면에 노출되어 첫 실행이 어렵다고 보고했다. 따라서 고급 기능은 삭제하지 않고 developer 또는 `superadmin_developer` 보기로 이동시키며, 사용자 기본 화면은 작업 시작과 결과 확인 중심으로 줄인다.

## 검증

- `check-view-modes`
- `check-config-contract`
- Workspace Monitor renderer tests/check/build
- omission/resource/evaluation records
