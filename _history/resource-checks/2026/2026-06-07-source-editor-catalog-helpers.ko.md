# 2026-06-07 소스 에디터 catalog helper 분리 리소스 점검

## 리스크

- 새 long-running process, socket, worker, timer를 추가하지 않았다.
- 변경은 순수 catalog 계산 helper와 React memo 호출 교체다.

## 확인

- 기존 warmup poll과 source draft timer 수명 관리에는 손대지 않았다.
- 내부 패키징은 통과했으며 새 dev server 포트나 새 장기 실행 프로세스는 추가하지 않았다.

## 결론

- `resource_risk_occurred`: `false`
