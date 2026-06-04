# 2026-06-05 Desktop Install Build Pipeline Request

## Summary

사용자는 이전 설치 보강 이후, 설치와 빌드 방법 자체를 전면 변경해도 된다고 지시했다.

## Interpreted Requirement

- 처음 설치와 반복 검증을 분리한다.
- 반복 빌드에서 불필요한 의존성 설치, browser install, 중복 renderer build를 줄인다.
- 내부 Tauri 패키징은 안전한 customer bundle audit를 유지해야 한다.
- 공개 배포 signing/notarization/updater/clean-machine gate는 별도 release 작업으로 남긴다.
