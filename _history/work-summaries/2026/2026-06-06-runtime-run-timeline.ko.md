# Runtime Run Timeline 작업 요약

- 요청: 플랫폼을 계속 개발하고, 데스크톱 앱의 실행/결정/작업 흐름을 더 직접적으로 볼 수 있게 개선.
- 구현: Desktop Runtime의 `실행 기록과 결정함` 영역에 `Run Timeline` 패널을 추가해 결정, 활성 세션, task-run, pipeline, output event를 한 타임라인으로 묶었다.
- 성능 판단: 새 계산은 `runRecordsOpen`이 열릴 때만 수행하고 기존 runtime 상태를 재사용해 탭 이동 비용을 늘리지 않도록 했다.
- 추가 보강: customer build 뒤 다시 package할 때 developer snapshot check가 실패하지 않도록 desktop pipeline 시작부에 developer snapshot collect 단계를 추가했다.
- 검증: TypeScript/check/test, config contract, Browser smoke, customer build, readiness check, `package:internal` 통과.
- 산출물: 내부 macOS `.app`와 `.dmg`가 생성되고 codesign/hdiutil 검증을 통과했다.
