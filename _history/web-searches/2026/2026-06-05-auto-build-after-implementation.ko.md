# 웹 검색 기록: 구현 완료 후 자동 빌드 규칙

## 요청

- 사용자가 매번 직접 빌드하지 않도록, 구현이 끝나면 에이전트가 빌드까지 자동으로 실행하라는 지속 지시를 남기는 작업.

## 검색

- `software development best practice run build before delivery after implementation`

## 확인한 출처

- Octopus Deploy, "Do You Build Your Binaries Once?", https://octopus.com/blog/build-your-binaries-once
- AWS Well-Architected Framework, "Test and validate changes", https://docs.aws.amazon.com/wellarchitected/latest/framework/ops_dev_integ_test_val_chg.html
- CloudBees, "Continuous Integration Best Practices", https://www.cloudbees.com/continuous-delivery/continuous-integration-best-practices
- The Twelve-Factor App, "Build, release, run", https://www.12factor.net/build-release-run

## 판단

- 외부 자료는 구현 변경을 전달하기 전 build/test 검증을 자동화된 품질 gate로 두는 방향을 지지한다.
- 이번 요청은 특정 CI/CD 설계 변경이 아니라 Codex 작업 종료 습관 변경이므로, 로컬 durable instruction과 close-out rule에 반영하는 것이 적절하다.
- 빌드 명령이 없거나 변경 범위 밖인 docs-only 작업에는 대체 검증과 예외 사유 기록을 허용한다.

## 계획 반영

- persistent instructions와 `AGENTS.md`에 구현 완료 후 build/package 자동 실행 규칙을 추가한다.
- memory bootstrap에서 해당 지시가 hot context로 계속 로드되도록 설명을 갱신한다.
- 이번 작업 자체는 source implementation이 아니라 운영 규칙 문서 변경이므로 docs/config 검증을 수행한다.
