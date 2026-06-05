# 사용자 요청 요약: 실제 메모리와 OS 자원을 더 적극적으로 사용

- 날짜: 2026-06-05
- 요약: 사용자는 기존 OS cache 구현도 충분히 공격적이지 않다고 보고, 데스크톱 앱의 장점을 살려 실제 앱 메모리와 운영체제 자원을 최대한 활용하라고 요구했다.
- 반영: Tauri startup background warmup, renderer bootstrap warmup, 512 files/128MB bounded memory preload, UI memory status.
- 지속 지시: 구현 완료 후 자동 빌드까지 수행.
