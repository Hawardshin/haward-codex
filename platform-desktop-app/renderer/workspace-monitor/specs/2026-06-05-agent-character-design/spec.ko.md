# Agent Character Design 스펙

## 요구사항

- REQ-WM-072: Agents 협업 장면과 Tool Studio 캐릭터 맵은 공통 로봇형 디자인 언어를 공유해야 한다.
- REQ-WM-073: 캐릭터는 너무 현실적이거나 장비처럼 딱딱하지 않고, 귀여운 동물형 마스코트 실루엣을 가져야 한다.

## 설계

- Agents `AgentCharacter`는 ground shadow, role halo, feet, torso, chest panel, visor, antenna, status light, workload meter를 갖는다.
- Tool Studio manual Three.js character는 같은 방향의 visor, chest panel, status light, role halo를 갖는다.
- Agents/Tool Studio 캐릭터는 공통으로 ear, inner ear, muzzle, cheek, tail을 가져 귀엽고 추상적인 동물형 마스코트 느낌을 만든다.
- 색은 기존 status/role palette를 유지하고, 발광은 status 식별을 위한 보조 디테일로만 사용한다.
- 기존 offscreen/reduced-motion pause 로직은 유지한다.

## 비목표

- GLB/외부 asset 추가
- 새 라이브러리 설치
- 과한 캐릭터 motion
- 현실적인 동물 해부학, 털, 과한 얼굴 표정
