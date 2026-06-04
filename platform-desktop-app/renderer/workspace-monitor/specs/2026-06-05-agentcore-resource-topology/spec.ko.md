# AgentCore Resource Topology 스펙

## 요구사항

- REQ-WM-049: AgentCore Quick Builder는 선택된 capability 묶음을 AgentCore식 리소스 토폴로지와 생명주기로 표시해야 한다.

## 사용자 결과

- 사용자는 capability bundle을 선택한 직후 Runtime, Memory, Gateway, Built-in Tools, Identity, Policy, Observability, Evaluations 같은 리소스 배치를 확인한다.
- 사용자는 Create, Configure, Invoke, Observe, Evaluate 흐름을 한 줄 생명주기로 본다.
- 각 리소스 카드는 선택된 capability, local capability ID, lifecycle handoff를 보여준다.
- 720px 이하 화면에서는 lifecycle과 resource card가 수평 overflow 없이 접힌다.

## 비목표

- 실제 AWS AgentCore 리소스 생성
- AWS 계정 권한 부여 또는 connector 인증
- 기존 agent proposal 생성 로직의 실행 엔진 교체
