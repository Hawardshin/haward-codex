# 요구사항 변경: Positive Vision Agent

## 변경

`REQ-WS-065`를 추가한다.

플랫폼은 어려운 작업에서 “어떻게든 해내자”는 요청을 근거 있는 긍정적 비전과 실행 경로로 바꾸는 `positive-vision-agent`를 제공해야 한다.

## 이유

사용자는 긍정적인 비전을 제시하는 전문가를 요청했다. 기존 `timekeeper-agent`가 시간 압박을 다루지만, 시간 압박 속에서 사기, 가능성, agency, 실행 경로를 함께 잡아주는 역할은 별도로 필요하다.

## 수용 기준

- 에이전트 설정과 문서가 존재한다.
- 출력 계약에 원하는 미래 상태, agency, pathways, if-then 계획, risk truth, fallback이 포함된다.
- 정책에 unsupported guarantee, risk hiding, verification bypass 금지가 포함된다.
- 검증과 평가가 통과한다.
