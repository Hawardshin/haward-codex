# Spec: Runtime Customization Layer

## 범위

- `DesktopPreferences`에 `runtimeCustomization`을 추가한다.
- renderer에서 `RuntimeCustomizationPanel`을 추가해 provider, terminal, quick command 설정을 편집한다.
- provider 기본 모델 선택과 provider 작업 실행은 커스텀 기본 모델을 우선한다.
- Rust provider 실행은 provider별 커스텀 base URL을 endpoint 생성에 사용한다.
- native PTY 시작은 커스텀 셸과 시작 명령을 반영한다.
- 테스트는 커스텀 설정이 저장/렌더링/실행 경로에 연결되어 있는지 정적 계약으로 검증한다.

## 비범위

- 새 secret store, OAuth, keychain, provider별 OAuth flow.
- external CLI 자동 설치.
- 모바일 UI 대응. 현재 데스크톱 최소 창 크기 정책 안에서 처리한다.

## 수용 기준

- 설정 섹션 id `customization`이 execution 탭에 존재한다.
- `data-runtime-customization-panel`이 렌더링된다.
- provider model/base URL input은 provider id별 data attribute를 가진다.
- terminal shell/startup command와 quick command input이 존재한다.
- Rust `normalize_runtime_customization`이 저장값을 보정한다.
- Rust provider API 호출이 `provider_endpoint(base_url, ...)`를 통해 endpoint를 만든다.
