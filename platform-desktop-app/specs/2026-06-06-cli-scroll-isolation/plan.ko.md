# 계획: CLI 스크롤 겹침 제거

## 단계

1. 웹 검색과 기존 설정/CLI CSS 구조 확인.
2. 요구사항과 스펙을 최소 기록으로 남긴다.
3. 설정 모달 backdrop과 panel의 scroll ownership을 수정한다.
4. CLI setup guide와 Agent CLI Cockpit button grid를 wrap 가능한 구조로 조정한다.
5. 정적 테스트에 scroll ownership 회귀 계약을 추가한다.
6. collect, check, test, build, Playwright smoke, internal package를 실행한다.
7. omission/resource/evaluation/history를 기록하고 commit/push한다.

## 리스크

- Backdrop scroll 제거로 작은 창에서 dialog가 잘릴 수 있다.
- 대응: dialog 높이를 viewport padding을 뺀 값으로 계산하고, 본문 panel이 스크롤을 소유하게 한다.

## 결정

- 새 runtime resource를 만들지 않는다.
- 이 변경은 UI layout fix이며 CLI process graph나 pipe contract를 변경하지 않는다.
