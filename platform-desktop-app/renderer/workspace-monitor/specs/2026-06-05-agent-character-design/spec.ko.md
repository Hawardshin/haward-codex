# Agent Character Design 스펙

## 요구사항

- REQ-WM-072: Agents 협업 장면과 Tool Studio 캐릭터 맵은 공통 로봇형 디자인 언어를 공유해야 한다.

## 설계

- Agents `AgentCharacter`는 ground shadow, role halo, feet, torso, chest panel, visor, antenna, status light, workload meter를 갖는다.
- Tool Studio manual Three.js character는 같은 방향의 visor, chest panel, status light, role halo를 갖는다.
- 색은 기존 status/role palette를 유지하고, 발광은 status 식별을 위한 보조 디테일로만 사용한다.
- 기존 offscreen/reduced-motion pause 로직은 유지한다.

## 비목표

- GLB/외부 asset 추가
- 새 라이브러리 설치
- 과한 캐릭터 motion
