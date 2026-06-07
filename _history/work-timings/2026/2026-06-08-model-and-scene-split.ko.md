# Work Timing: model and scene split

- 날짜: 2026-06-08

| Phase | 대략 시간 | 기록 |
| --- | ---: | --- |
| web-first intake | 5분 | React, TypeScript, Three.js official docs 확인 |
| inventory/spec records | 10분 | 요구/스펙/작업/검증 기록 생성 |
| type model split | 25분 | snapshot/desktop type model 분리와 import fix |
| scene hook split | 15분 | ToolStudio Three.js effect hook 추출 |
| validation | 20분 | test/check/build, renderer build 재시도 |
| closeout records | 10분 | omission/resource/evaluation/trace/summary 갱신 |

## Bottleneck

Next.js production build를 병렬로 실행하면 같은 build state에서 lock 충돌이 발생한다. 이후 build validation은 직렬 실행한다.
