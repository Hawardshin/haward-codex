# 연구 노트: 제한된 역질문 루프

## 요약

모호한 지시는 좋은 결과를 방해한다. 하지만 에이전트가 계속 질문만 하면 작업 속도가 떨어진다. 좋은 구조는 “필요할 때만 묻고, 짧게 묻고, 답이 없으면 가정/기본값/선작업/보류로 수렴”하는 것이다.

## 적용 원칙

- 질문은 결과를 바꾸는 핵심 불확실성에만 사용한다.
- 보통 1회, 많아도 2회 이내로 질문한다.
- 한 round에 최대 3개만 묻는다.
- 질문마다 결정 영향을 밝히거나 선택지를 제공한다.
- 로컬 파일, 스펙, 검색, 테스트로 해결할 수 있는 것은 사용자에게 묻지 않는다.
- 답이 없으면 합리적 가정, 추천 기본값, 선작업 후 확인, 명시적 보류 중 하나를 선택한다.

## 재사용 가치

이 정책은 앞으로 애매한 지시를 받을 때 “질문해야 하는가?”와 “언제 질문을 멈춰야 하는가?”를 결정하는 기준으로 쓴다.

## 출처

- https://learn.microsoft.com/en-us/microsoft-copilot-studio/guidance/cux-disambiguate-intent
- https://help.openai.com/en/articles/6654000-best-practices-for-prompt-engineering-with-the-openai-api
- https://learn.microsoft.com/en-us/azure/ai-foundry/openai/concepts/prompt-engineering
- https://ojs.aaai.org/index.php/HCOMP/article/view/21996
- https://arxiv.org/abs/2212.07769
