# 웹 검색 기록: Agents 3D Collaboration Characters

- 날짜: 2026-06-05
- 요청 요지: 에이전트끼리 작업하는 UI를 3D 캐릭터화하고 오픈소스를 설치해 진행한다.

## 검색어

- `@react-three/fiber official documentation React Three Fiber`
- `@react-three/drei official documentation drei react three fiber`
- `three.js official documentation animation loop instanced mesh`
- `npm @react-three/fiber peerDependencies React 19`

## 확인한 출처

- React Three Fiber docs: `https://r3f.docs.pmnd.rs/getting-started/introduction`
- Drei docs: `https://drei.docs.pmnd.rs/getting-started/introduction`
- Three.js docs: `https://threejs.org/docs/`
- React Three Fiber npm metadata: `https://www.npmjs.com/package/@react-three/fiber`
- Drei npm metadata: `https://www.npmjs.com/package/@react-three/drei`

## 판단

- React Three Fiber는 React component lifecycle과 WebGL scene을 결합하기에 적합해 Agents collaborationBoard 데이터를 scene node로 직접 매핑할 수 있다.
- Drei는 line/float 등 scene helper를 제공해 직접 Three.js imperative 코드를 늘리는 비용을 줄인다.
- npm metadata 기준 `@react-three/fiber@9.6.1`은 React 19.2.x와 Three 0.184.x 범위에 맞고, `@react-three/drei@10.7.7`도 같은 조합에 맞는다.
- 두 패키지는 npm metadata 기준 MIT license다.

## 계획 영향

- Tool Studio의 기존 imperative Three.js scene은 그대로 두고, Agents Collaboration에는 React Three Fiber/Drei scene을 별도 컴포넌트로 둔다.
- 기본 Agents chat을 방해하지 않도록 `agentDetailsOpen` 이후에만 dynamic import/mount한다.
- canvas nonblank pixel smoke와 mobile overflow smoke를 close-out gate로 둔다.
