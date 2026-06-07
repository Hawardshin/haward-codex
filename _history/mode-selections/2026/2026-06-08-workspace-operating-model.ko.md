# Mode Selection

## 선택

- `work_mode`: `ship_first`
- `view_mode`: `superadmin_developer`
- `install_mode`: `developer`

## 이유

요청은 제품 방향, UI, 데이터 모델, 프로젝트 경계, 검증 기록을 동시에 바꾸는 의미 있는 구현 작업이다. 사용자에게 바로 보이는 개선이 필요하므로 `ship_first`로 구현을 먼저 진행하되, 요구사항/스펙/검증 기록을 남긴다.

## 적용한 워크플로

- web-first intake
- memory bootstrap 시뮬레이션
- large-scope decomposition 시뮬레이션
- desktop user flow design 기준 적용
- project boundary management 기준 적용
- omission/resource close-out 준비

## 비적용

- 설치/전역 dependency 변경 없음.
- 민감 파일 접근 없음.
- destructive Git 조작 없음.
