# Tool Usage Integration 구현 계획

1. 공식 문서 기반 조사 기록을 남긴다.
2. 도구 사용 루프 registry를 만든다.
3. snapshot collector와 customer sanitizer를 추가한다.
4. snapshot 타입을 확장한다.
5. Tool Studio에 playbook 리스트와 상세 패널을 붙인다.
6. product feature registry의 Root Tool Management 자산에 연결한다.
7. collector/UI/customer snapshot 테스트를 추가한다.
8. collect, check, test, build, desktop package를 실행한다.

## 결정

별도 새 탭 대신 Tool Studio 내부에 붙였다. 사용자가 “툴과 사용 방식”을 요청했기 때문에, 도구를 만드는 화면과 도구를 사용하는 작업 루프가 같은 작업대에 있어야 한다.
