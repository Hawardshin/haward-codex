# 사용자 요청 요약: Workbench lazy boundary 확장

## 요약

사용자는 이전 성능 개선의 후속으로 남은 것들을 모두 처리하라고 요청했다. 맥락상 탭 전환 지연, renderer mount/import 비용, 데스크톱 자원 활용, 자동 build/package 요구를 포함한다.

## 해석

- 이전 `MonitorShell` root-boundary 평가에서 후속으로 남긴 Desktop runtime 및 Agents panel boundary를 구현 대상으로 삼는다.
- 단순 스타일 변경이 아니라 lazy chunk, resident/prewarm, button feedback 측정을 포함한 구조 변경으로 처리한다.
- 구현 후 build/package를 직접 실행한다.
