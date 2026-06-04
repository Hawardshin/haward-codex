# 계획: Responsive Workflow Layout

1. 웹 접근성/UX 기준을 확인한다.
2. 고정 높이 shell, 3열 titlebar, 고정 열 home grid를 식별한다.
3. shell/viewport를 자연스러운 페이지 reflow로 바꾼다.
4. 홈 보조 정보를 details 기반 progressive disclosure로 이동한다.
5. scroll contract 검사와 responsive Browser smoke로 overflow를 확인한다.
6. typography scale token을 만들고 임의 font-size 값을 제거한다.
7. visible text의 computed font-size가 scale 안에 있는지 다중 viewport로 확인한다.
8. 에이전트 코어 채팅을 중앙 대화 로그와 하단 composer 구조로 재배치하고, provider/model/context는 보조 컨트롤로 낮춘다.
