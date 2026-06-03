# 에이전트 플랫폼 기능 아키텍처 계획

## 순서

1. 제품 기능 레지스트리를 추가하고 요구사항/제품 경계/README/배포 레지스트리에 연결한다.
2. Workspace Monitor collector를 확장해 기능 레이어를 snapshot과 customer snapshot에 넣는다.
3. Overview에 Product Feature Architecture 패널을 별도 컴포넌트로 추가한다.
4. readiness/test/check-config-contract를 통해 primary/supporting 역할을 검증한다.
5. 운영 기록, 평가, 요청 추적, work summary를 남긴 뒤 커밋/푸시한다.

## 구조 결정

- UI 컴포넌트는 `components/features/` 아래로 분리한다.
- collector 기능은 `scripts/lib/product-feature-architecture.mjs`로 분리한다.
- 모니터링은 기존 섹션을 유지하되 label/purpose와 첫 화면에서 supporting observability로 내려 표현한다.
