# 웹 검색 기록: Agent Identity Labels

## 검색

- Material Design avatar badge label UI identify user role icon label official
- Apple Human Interface Guidelines labels icons badges identify controls official
- Nielsen Norman Group icon labels usability recognition interface
- site:nngroup.com icon labels improve usability recognition rather than recall

## 확인한 출처

- Apple Human Interface Guidelines: https://developer.apple.com/design/human-interface-guidelines/
  - 명확한 visual hierarchy와 플랫폼 관례를 유지하는 기준을 확인했다.
- Material Design icons: https://m1.material.io/style/icons.html
  - 아이콘은 단순하고 일관된 형태로 이해를 돕는 보조 신호로 써야 한다는 방향을 확인했다.
- NN/g Heuristic 6: https://www.nngroup.com/articles/recognition-and-recall/
  - 사용자가 기억하지 않고 인식할 수 있게 정보와 option을 보이게 해야 한다는 기준을 확인했다.
- Visa Product Design System Avatar: https://design.visa.com/components/avatar/usage
  - avatar는 사용자나 profile 식별을 돕는 요소이며, label/badge와 함께 쓰는 방향을 참고했다.

## 계획 영향

- 캐릭터 크기는 줄이되, 식별 정보는 모양 기억에 맡기지 않고 code, compact name, color dot으로 분리한다.
- desktop은 캐릭터 위에 작은 name label을 둔다.
- mobile은 캐릭터 위 label을 code chip으로 줄이고, 별도 horizontal identity strip으로 code와 name을 대응시킨다.
- Tool Studio는 캐릭터가 기능 모드이므로 하단 legend로 모드 이름을 바로 노출한다.
