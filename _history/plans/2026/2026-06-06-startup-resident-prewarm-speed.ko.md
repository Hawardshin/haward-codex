# 작업 계획: startup resident prewarm 속도 최적화

## 분류

- 소유 프로젝트: `platform-desktop-app`
- 작업 모드: `standard`
- view mode: `superadmin_developer`
- install mode: `developer`

## 근거

- 사용자는 탭 이동 지연을 다시 지적했고, 데스크톱 앱의 RAM/CPU 활용을 요구했다.
- 기존 bounded resident work는 hidden mounted panel cap을 세웠지만, 첫 전환의 mount 비용은 여전히 남았다.

## 실행 계획

1. 공식 React/Next/MDN 문서로 memo, lazy/preload, idle task 근거를 확인한다.
2. resident cap은 유지하고 startup idle prewarm만 추가한다.
3. hidden 상태의 overview retention을 제외한다.
4. Tool Studio에 memo boundary와 stable callbacks를 적용한다.
5. renderer/desktop/Rust/Tauri package 검증을 실행한다.
6. 성능 수치, tradeoff, 산출물을 기록하고 커밋/푸시한다.

## 수용 기준

- p95 section switch latency가 이전 bounded baseline보다 낮아야 한다.
- mounted/resident panel count는 5를 넘지 않아야 한다.
- 내부 `.app`와 `.dmg` 패키징 검증이 통과해야 한다.
