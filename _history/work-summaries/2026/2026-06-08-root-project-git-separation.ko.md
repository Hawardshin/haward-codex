# 작업 요약: root project Git 분리

- 날짜: 2026-06-08

## 완료

- 여섯 registered root project를 private GitHub repository로 분리했다.
- root repository를 `.gitmodules`와 submodule gitlink 중심의 superproject 구조로 전환했다.
- project-local generated output은 각 child repository `.gitignore`로 정리하고 push했다.
- `_ops/projects/registry.json`에 repository metadata를 추가했다.
- 요구사항, spec, validation, trace, omission/resource/evaluation 기록을 추가했다.

## 결과

루트 workspace는 이제 project source를 직접 들고 있는 단일 monorepo가 아니라, 각 project repository를 모아 보여주는 운영 superproject 역할을 한다.

## 남은 일

- 새 환경에서 private submodule 권한을 확인하는 onboarding guide/diagnostic.
- desktop app의 실제 Git clone/import/create wizard.
- 필요할 경우 root history rewrite 여부 검토.
