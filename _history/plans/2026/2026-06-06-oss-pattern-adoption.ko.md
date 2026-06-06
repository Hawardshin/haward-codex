# Plan Evidence: OSS Pattern Adoption Gate

## 근거

- 현재 `agent-platform`은 Python CLI, deterministic validators, JSON configs, unittest 중심이다.
- 기존 OSS 기능은 dependency candidate scoring까지만 제공한다.
- 사용자는 단순 리서치가 아니라 적용과 구현 누락 방지를 요구했다.
- GitHub primary source inspection에서 agent lifecycle, state/checkpoint, typed tools/providers, productized monorepo split, sandbox/runtime, hybrid provider module patterns가 반복적으로 관찰됐다.

## 실행 계획

1. 기존 `agent_platform.oss` 경계에 pattern adoption validator를 추가한다.
2. CLI로 config contract와 pattern adoption contract를 함께 검사한다.
3. template config에 조사한 repo, pattern, language, architecture, folder, clone/import, hybrid module decisions를 기록한다.
4. tests로 direct import/hybrid module gate를 보호한다.
5. README와 OSS integration 문서에 명령과 정책을 연결한다.

## 결정

이번 slice는 외부 code import와 dependency install 없이 Python-native validator로 구현한다. 직접 feature clone은 특정 target, license review, pinned commit, attribution, tests, rollback, human checkpoint가 생길 때만 다음 slice로 진행한다.
