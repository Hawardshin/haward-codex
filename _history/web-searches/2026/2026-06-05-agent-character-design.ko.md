# 웹 검색 기록: Agent Character Design

## 검색

- Apple Human Interface Guidelines motion animation user control official
- Material Design motion choreography character animation official
- Three.js official MeshStandardMaterial emissive roughness metalness docs
- WCAG animation from interactions pause stop hide official

## 확인한 출처

- Apple HIG Motion: https://developer.apple.com/design/human-interface-guidelines/motion
  - 움직임은 의도와 피드백을 도와야 하며 사용자 안정감을 해치지 않아야 한다는 방향을 확인했다.
- Material Design Motion: https://m3.material.io/styles/motion/overview
  - motion은 사용자 초점을 안내해야 하며 과하면 산만해진다는 기준을 확인했다.
- Three.js MeshStandardMaterial docs: https://threejs.org/docs/#api/en/materials/MeshStandardMaterial
  - roughness, metalness, emissive를 통해 PBR 기반 표면과 발광 디테일을 조절할 수 있음을 확인했다.
- WCAG Pause, Stop, Hide: https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html
  - 지속적 움직임은 사용자가 제어할 수 있어야 한다는 접근성 기준을 확인했다.

## 계획 영향

- 캐릭터는 장식성보다 역할/상태 인지가 되도록 visor, chest/status detail, role halo를 추가한다.
- 애니메이션 강도는 기존 수준을 유지하고, offscreen/reduced-motion pause 계약은 유지한다.
