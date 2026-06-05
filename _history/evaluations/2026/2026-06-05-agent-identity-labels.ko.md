# 평가: Agent Identity Labels

## 결론

- 통과. 캐릭터는 더 작아졌고, desktop/mobile에서 어떤 에이전트나 모드인지 식별할 수 있는 label/legend가 추가되었다.

## 확인

- Agents desktop은 캐릭터 위에 112px compact label을 표시한다.
- Agents mobile은 캐릭터 위 label을 28px code chip으로 줄이고, horizontal identity strip에서 code와 compact name을 연결한다.
- Tool Studio는 캐릭터 scale을 0.82로 줄이고, 네 모드 legend를 표시한다.
- desktop/mobile Playwright screenshot QA에서 canvas ready, label/legend count, overflowX 0을 확인했다.

## 남은 리스크

- mobile identity strip은 공간을 아끼기 위해 가로 스크롤형이다.
- 8개 이상 agent는 현재 scene 한도와 동일하게 앞 8개만 표시된다.
