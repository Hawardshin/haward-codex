# 누락 방지 점검: AI EVAL cockpit

## 사용자 요구 대응

- AI 평가 기능: EVAL 탭 추가 완료
- 현재 작업 EVAL 보고서: 점수 strip과 current report card 추가
- 히스토리 비교: 평가/검색/요약/trace/timing 분포 추가
- 토큰 수/툴 사용 비교: token/tool comparability와 tool signal grid 추가
- 오픈소스 EVAL 기능: 후보 레지스트리와 UI 후보 목록 추가
- 캐릭터 물개 사용: Tool Studio 3D scene heading/aria/part names를 seal로 변경
- 탭 전환 지연 완화: EVAL resident/preload 대상 추가
- 구현 후 빌드 자동 실행: internal package까지 완료

## 검증 누락 여부

- tests: 통과
- build: 통과
- internal package: 통과
- Browser smoke: 통과
- commit/push: 이 기록 작성 후 수행

## 제외한 항목

- 외부 EVAL runner 실제 설치/실행은 설치 감사가 필요한 후속 작업으로 제외했다.
- 공개 배포 readiness는 signing/notarization/updater/clean-machine smoke blocker가 유지된다.
