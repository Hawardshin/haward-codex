# 2026-06-06 desktop dev/run fix 평가

## 평가 대상

README build/run failure fix.

## 완료 기준

- `desktop:dev`가 실제 app startup까지 진행한다.
- internal/dev 실행은 updater public release gate에 막히지 않는다.
- 빌드된 `.app`을 여는 명령이 문서화되고 스크립트로 제공된다.
- 최종 package와 smoke가 통과한다.

## 현재 결과

- `desktop:dev`: 통과. `GET / 200`.
- `desktop:run:internal -- --dry-run`: 통과.
- `desktop:doctor`: 통과. public release warning만 남음.
- `cargo check`: 통과.
- `platform-desktop-app test`: 통과. tests 24개.
- `workspace-monitor collect/check/test/build`: 통과. renderer tests 70개, Next static build 완료.
- `desktop:package:internal`: 통과. `.app`/DMG 생성, codesign verify, hdiutil verify 완료.
- `desktop:run:internal`: 통과. 패키지 앱 프로세스 실제 기동 확인 후 종료.

## 결론

README 기준 local/internal 개발 실행, 패키징, 패키지 실행 경로는 정상화됐다. 공개 배포는 서명, 공증, updater, clean-machine smoke 입력이 없어 readiness warning으로 남지만 이번 README local/internal 실행 실패와는 분리된 배포 게이트다.
