# 작업 요약: Tool Studio Depth Navigation

- Tool Studio의 flat mode rail 위에 parent stage rail을 추가했다.
- `제작 준비` parent는 `툴 만들기`, `파이썬 환경` child mode만 보여준다.
- `출시 관리` parent는 `툴 배포`, `툴만 관리` child mode만 보여준다.
- 세부 mode 선택, 단축키, requested mode 진입 시 parent stage를 자동 동기화한다.
- 데스크톱/모바일 smoke에서 child mode count 2와 overflow 0을 확인했다.
