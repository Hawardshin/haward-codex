# Agent Character Design 스펙

## 요구사항

- REQ-WM-072: Agents 협업 장면과 Tool Studio 캐릭터 맵은 공통 로봇형 디자인 언어를 공유해야 한다.
- REQ-WM-073: 캐릭터는 너무 현실적이거나 장비처럼 딱딱하지 않고, 귀여운 동물형 마스코트 실루엣을 가져야 한다.
- REQ-WM-074: 캐릭터는 더 작은 화면 점유율을 가져야 하며, 사용자는 어떤 에이전트/모드인지 즉시 식별할 수 있어야 한다.

## 설계

- Agents `AgentCharacter`는 ground shadow, role halo, feet, torso, chest panel, visor, antenna, status light, workload meter를 갖는다.
- Tool Studio manual Three.js character는 같은 방향의 visor, chest panel, status light, role halo를 갖는다.
- Agents/Tool Studio 캐릭터는 공통으로 ear, inner ear, muzzle, cheek, tail을 가져 귀엽고 추상적인 동물형 마스코트 느낌을 만든다.
- 귀여운 인상은 현실적인 동물 묘사보다 큰 머리, 짧고 둥근 몸통, 작은 손발, 작은 점눈, 작은 코, 낮은 muzzle, 볼 디테일로 만든다.
- visor와 chest panel은 얼굴보다 강하게 보이지 않는 보조 상태 신호로 축소해, 캐릭터가 장비 UI보다 마스코트로 먼저 읽히게 한다.
- Agents desktop 3D scene은 작은 캐릭터 위에 agent code와 compact name label을 표시한다.
- Agents mobile 3D scene은 캐릭터 위 label을 code chip으로 축소하고, 별도 horizontal identity strip으로 code와 compact name을 대응시킨다.
- Tool Studio character map은 character scale을 줄이고, 모드별 색상 dot과 label legend를 캔버스 하단에 표시한다.
- 색은 기존 status/role palette를 유지하고, 발광은 status 식별을 위한 보조 디테일로만 사용한다.
- 기존 offscreen/reduced-motion pause 로직은 유지한다.

## 비목표

- GLB/외부 asset 추가
- 새 라이브러리 설치
- 과한 캐릭터 motion
- 현실적인 동물 해부학, 털, 과한 얼굴 표정
