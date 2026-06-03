# Web Search: Claw Code Reference Transfer

## 목적

- 사용자 요청 `UR-2026-06-04-002`에 따라 `Hawardshin/claw-code`를 공개 자료 기준으로 확인하고, 현재 플랫폼에 전이할 수 있는 구조와 기능을 분류한다.

## 검색 및 확인

- Query: `site:github.com/Hawardshin/claw-code claw-code GitHub`
- Query: `Hawardshin claw-code GitHub license README`
- 확인 URL:
  - `https://github.com/Hawardshin/claw-code`
  - `https://github.com/Hawardshin/claw-code/blob/main/README.md`
  - `https://github.com/Hawardshin/claw-code/blob/main/CLAW.md`
  - `https://github.com/Hawardshin/claw-code/blob/main/PARITY.md`

## 확인 결과

- 공개 GitHub 페이지와 raw README/CLAW/PARITY 문서는 접근 가능했다.
- 직접 clone은 `Your repository is disabled` 403 오류로 실패했다.
- license 파일은 직접 검증하지 못했다.

## 적용 판단

- 소스 복사, UI asset 복사, binary 설치, dependency 추가는 하지 않는다.
- 공개 문서에서 확인되는 제품/아키텍처 패턴만 clean-room 방식으로 전이한다.
- 전이 대상:
  - optional `claw-code-cli` guest adapter
  - slash command와 team orchestration을 플랫폼 command/task pipe로 흡수하는 패턴
  - skills/MCP/runtime manifest와 parity gap을 readiness/registry로 관리하는 패턴
  - clone/license 제한을 setup guidance와 reference limitation에 표시

## 약한 근거 및 제외

- clone이 막혀 있어 실제 구현 소스, license, 패키지 설치 방법은 확정 근거로 쓰지 않았다.
- 라이선스가 검증되기 전까지 bundling, source copy, auto-install은 제외한다.
