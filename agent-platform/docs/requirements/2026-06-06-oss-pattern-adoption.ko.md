# Requirements: OSS Pattern Adoption Gate

작성일: 2026-06-06
프로젝트: `agent-platform`

## 목적

현재 플랫폼의 근본 구조, 사용성, 사용자 AI 활용 능력을 개선할 수 있는 오픈소스 구조 패턴을 조사하고, 직접 코드 반입이나 다른 언어 하이브리드 모듈 도입이 누락 없이 검토되도록 검증 가능한 게이트를 만든다.

## 요구사항

- R1. 웹 우선 조사와 GitHub 1차 출처 확인을 통해 트렌딩/고스타 AI agent platform 레포의 구조 신호를 기록한다.
- R2. GitHub stars, trending, 커뮤니티 반응은 채택 신호로만 쓰고, 사실/적합성 증거로 단독 사용하지 않는다.
- R3. 소스 레포, 라이선스 posture, inspected paths, reusable patterns, caveats를 구조화한 설정 파일을 제공한다.
- R4. 최소 2개 이상의 언어/runtime 선택지, 아키텍처 선택지, 폴더 구조 선택지를 비교하고 선택 근거를 남긴다.
- R5. 직접 code import는 license review, pinned commit, attribution, tests, rollback, human checkpoint 없이는 막는다.
- R6. TypeScript, Rust, Go, C# 등 다른 언어 모듈은 독립 build boundary, interface contract, validation, rollback plan 뒤에서만 허용한다.
- R7. 이번 구현은 외부 dependency 설치나 코드 복사 없이 Python-native validator와 CLI로 먼저 적용한다.
- R8. README, OSS integration 문서, tests, close-out history를 업데이트한다.

## 비범위

- 외부 레포 코드를 직접 복사하지 않는다.
- 새 dependency를 설치하지 않는다.
- 플랫폼 데스크톱 UI, runtime sidecar, provider adapter 구현은 이번 slice에서 만들지 않는다.

## 수용 기준

- `check-oss-pattern-adoption` CLI가 새 설정 파일을 검사하고 ready 상태를 반환한다.
- self-documenting config 계약이 통과한다.
- 직접 import와 hybrid module 관련 실패 케이스가 단위 테스트로 보호된다.
- 전체 테스트 결과에서 이번 변경과 무관한 기존 실패는 분리해 기록한다.
