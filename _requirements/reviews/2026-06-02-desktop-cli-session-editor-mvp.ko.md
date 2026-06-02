# 요구사항 검토: Desktop CLI Session / Source Editor MVP

## 검토 결과

- 승인: `PDA-REQ-020`, `PDA-REQ-021`, `PDA-UX-014`
- 보강: `PDA-REQ-020`은 defer 시 감지된 질문을 `_ops/coordination/human-decision-inbox.json`에 저장하는 구현까지 포함한다.
- 이유: 사용자의 부족 구현 요청에 직접 대응하고, 기존 multi-CLI desktop spec의 다음 단계와 일치한다.

## 통제

- shell plugin, PTY, xterm.js, Monaco는 설치하지 않는다.
- adapter 실행은 allowlist로 제한한다.
- source editing은 workspace boundary, protected directory denial, symlink escape denial, backup write를 요구한다.
- Rust compile은 Rust toolchain 설치 전까지 readiness warning으로 남긴다.
