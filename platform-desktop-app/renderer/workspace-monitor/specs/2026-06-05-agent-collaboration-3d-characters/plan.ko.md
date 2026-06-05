# Agents 3D Collaboration Characters 계획

## 순서

1. 웹/패키지 metadata로 React Three Fiber, Drei, Three.js 호환성과 라이선스를 확인한다.
2. 설치 감사 초안을 만들고 프로젝트 로컬 pnpm 의존성으로 설치한다.
3. Agents 세부 Collaboration panel에만 mount되는 3D scene 컴포넌트를 추가한다.
4. CSS로 desktop/mobile scene 크기, dark surface foreground, HUD 위치를 안정화한다.
5. 정적 테스트로 dependency, dynamic import, ready marker, canvas 옵션, responsive CSS를 고정한다.
6. `test`, `check`, `build`, `build:customer`, `perf:budget`, in-app Browser, Playwright pixel smoke를 실행한다.
7. 설치 감사, 요구사항, 스펙, 평가, 요청 추적을 업데이트한다.

## 선택한 구현

- 언어/런타임: TypeScript/React/Next.js
- 대안 비교:
  - 직접 Three.js imperative scene: 이미 Tool Studio에 있으나 React component lifecycle과 data-driven scene 조합이 길어진다.
  - React Three Fiber/Drei: React state/data 구조에 맞고 lazy component boundary를 만들기 쉬워 이번 Agents 장면에 선택한다.
- 아키텍처 비교:
  - Agents 기본 화면에 3D 장면 노출: 시각적으로 강하지만 REQ-WM-038의 채팅 우선 원칙과 충돌한다.
  - Agents 세부 Collaboration surface에 3D 장면 배치: 기본 화면을 보존하면서 사용자가 협업 이해를 원할 때 큰 작업면을 제공하므로 선택한다.

## 리스크와 제어

- WebGL chunk 증가: `next/dynamic`으로 세부 disclosure 내부에만 mount하고 `perf:budget`을 실행한다.
- 모바일 깨짐: 390px Playwright smoke와 screenshot으로 확인한다.
- 공개 snapshot 데이터 없음: canvas 대신 empty state를 보여준다.
