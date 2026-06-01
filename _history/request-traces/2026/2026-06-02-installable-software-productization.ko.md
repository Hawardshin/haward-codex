# 요청-결과 추적: 설치형 소프트웨어 제품화

## 요청

- ID: `UR-2026-06-02-004`
- 요약: 플랫폼을 Visual Studio 같은 설치형 소프트웨어 구조로 만들고 싶다는 요청.

## 결과

- `platform-desktop-app/` 새 루트 프로젝트를 만들었다.
- desktop distribution registry를 만들었다.
- 설치형 소프트웨어 정책, workflow, prompt를 추가했다.
- `REQ-WS-050`과 project-local requirements/specs를 추가했다.
- 실제 dependency 설치는 하지 않았다.

## 산출물

- `platform-desktop-app/README.md`
- `platform-desktop-app/configs/desktop-distribution-registry.json`
- `platform-desktop-app/docs/product-boundary.ko.md`
- `platform-desktop-app/docs/packaging-strategy.ko.md`
- `_docs/policies/installable-software-policy.ko.md`
- `_ops/workflows/63-installable-software-productization.md`
- `_ops/prompts/93-installable-software-productization.md`
- `platform-desktop-app/specs/2026-06-02-installable-desktop/`

## 평가

- 평가 파일: `_history/evaluations/2026/2026-06-02-installable-software-productization.ko.md`

## 커밋

- 예정: 검증 후 기록
