# 설치형 앱 사용자 플로우 조사 메모

## 요약

설치형 에이전트 플랫폼의 UX는 설정을 모두 끝내는 wizard보다 빠른 첫 가치가 중요하다. 공식 디자인 가이드는 온보딩을 짧고 선택 가능하며 맥락 중심으로 만들 것을 권한다. 데스크톱 배포 문서는 signing, updater, installer, OS별 packaging을 별도 release gate로 다룬다.

## 적용 원칙

- 첫 실행은 워크스페이스 대시보드 도착을 목표로 한다.
- 선택 기능은 capability card로 미루고, 누락된 기능만 비활성화한다.
- 권한, 파일 접근, 네트워크, CLI 실행은 필요한 순간에 설명한다.
- 사용자 모드는 작업과 히스토리 중심으로 단순하게 둔다.
- 개발자/슈퍼어드민 모드는 raw config, validator, release gate, source provenance를 볼 수 있어야 한다.
- 질문 대기 때문에 전체 작업을 멈추지 않도록 decision inbox를 사용한다.

## 주요 출처

- Apple Human Interface Guidelines: Onboarding: https://developer.apple.com/design/human-interface-guidelines/onboarding
- Microsoft Fluent 2: Onboarding: https://fluent2.microsoft.design/onboarding/
- Tauri v2 Distribute: https://v2.tauri.app/distribute/
- Tauri v2 Updater: https://v2.tauri.app/plugin/updater/
- Electron Forge: https://www.electronforge.io/
- Electron utilityProcess: https://www.electronjs.org/docs/latest/api/utility-process

## 한계

- 실제 desktop shell이나 installer 구현은 하지 않았다.
- 실제 사용성 테스트는 필요하다.
- OS별 installer 검증은 추후 dependency 설치와 prototype 이후 진행해야 한다.
