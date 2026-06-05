# 요구사항: Rust 데스크톱 자원 최적화

## 사용자 요구

소스 탭 전환과 코드 편집 워크플로가 렌더러에서 늦게 불러오는 방식 때문에 느리게 느껴진다. 데스크톱 앱의 장점에 맞게 Rust/Tauri 쪽에서 CPU와 RAM을 실제로 사용해 워크스페이스 파일 목록과 주요 텍스트 내용을 선제 준비해야 한다.

## 기능 요구사항

- Workspace Monitor의 native source workspace 경로는 Rust 프로세스 메모리에 텍스트 파일 cache를 준비한다.
- cache 준비는 단일 스레드 반복 작업에만 의존하지 않고 CPU parallelism을 사용한다.
- 메모리 예산은 고정 상수만 보지 않고 OS의 사용 가능 RAM을 반영한다.
- UI는 OS cache, 병렬 worker 수, 메모리 budget, native scan/preload 시간을 노출한다.
- 구현 완료 후 내부 `.app`/`.dmg` 패키징 빌드까지 자동 실행한다.

## 비기능 요구사항

- cache는 bounded memory budget 안에서 동작해야 한다.
- OS 자원 사용량은 Rust report field와 renderer 표시로 추적 가능해야 한다.
- 새 dependency는 project-local Rust dependency로 제한하고 설치 기록, 라이선스, rollback을 남긴다.
- 기존 public/customer snapshot과 readiness test 계약이 깨지면 안 된다.

## 제외

- 파일 watcher 기반 live invalidation은 이번 범위에서 제외한다.
- 전체 저장소 파일을 무제한으로 RAM에 올리는 동작은 제외한다.
