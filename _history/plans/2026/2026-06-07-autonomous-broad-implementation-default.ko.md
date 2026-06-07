# 계획: 자율 넓은 구현 기본값

## 목표

향후 사용자가 `계속 구현`, `이어서 구현`, `빼먹은거 구현`, `부족한 부분 구현`, `넓게 구현` 같은 후속 명령을 보낼 때 좁은 단일 수정으로 멈추지 않고, 넓은 자율 multi-slice 구현 루프로 처리하게 한다.

## 단계

1. 공식 문서와 현재 저장소 지침을 확인한다.
2. 루트 `AGENTS.md`와 지속 지시 문서에 continuation phrase 해석 규칙을 추가한다.
3. 메모리 부트스트랩 manifest의 persistent instruction 설명에 새 정책을 반영한다.
4. 요청, 검색, 계획, 평가, trace, timing 기록을 남긴다.
5. `docs-audit`, `check-memory-bootstrap`, `check-config-contract`, `git diff --check`로 검증한다.

## 경계

- 이번 변경은 운영 규칙과 기록만 바꾼다.
- 플랫폼 런타임 TypeScript/Rust 기능 코드는 이 요청의 직접 대상이 아니므로 수정하지 않는다.
- 현재 worktree의 기존 staged/untracked 변경은 유지하고 되돌리지 않는다.
