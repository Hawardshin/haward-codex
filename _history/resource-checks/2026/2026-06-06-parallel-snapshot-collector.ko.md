# Parallel Snapshot Collector 리소스 체크

## 리소스 영향

- Node worker threads: collect 중 bounded worker pool 생성 후 종료
- document workers: 최대 6
- source workers: 최대 4
- 환경 변수 `WORKSPACE_MONITOR_PARALLEL=0`으로 비활성화 가능
- Tauri package: Cargo/Tauri build CPU와 disk 사용

## 정리 계획

- worker pool은 task 완료 시 terminate한다.
- package 후 developer snapshot 복구 collect를 실행한다.
- dev server를 띄우는 경우 종료 후 포트 확인한다.

## 결과

- worker pool 기반 collect 완료.
- desktop package 완료.
- package 후 developer snapshot 복구 collect 완료.
- 이번 작업은 별도 dev server를 띄우지 않았다.
