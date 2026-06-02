# 웹 검색 기록: 전체 워크스페이스 완성도 감사

## 질의

- `software project health audit checklist technical debt unfinished work best practices`
- `monorepo repository structure governance documentation consistency audit best practices`
- `GitHub Issues planning technical debt tracking best practices docs`
- `continuous integration testing documentation project quality audit best practices`
- `OpenTelemetry tracing spans operation timing official documentation`
- `Nx folder structure monorepo official docs`

## 확인한 출처

- GitHub Docs, Planning and tracking work: https://docs.github.com/en/issues/tracking-your-work-with-issues/learning-about-issues/planning-and-tracking-work-for-your-team-or-project
- Nx Docs, Folder Structure: https://nx.dev/docs/concepts/decisions/folder-structure
- OpenTelemetry Trace API: https://opentelemetry.io/docs/specs/otel/trace/api
- Technical Debt Management in OSS Projects: https://arxiv.org/abs/2212.05537
- Comments or Issues: Where to Document Technical Debt?: https://arxiv.org/abs/2408.15109

## 반영

- 미완/기술부채 신호는 발견 후 추적 가능한 요구사항, 스펙, 평가 기록으로 남긴다.
- 모노레포 구조는 폴더 목적과 scope가 명시되어야 하므로 `structure-audit` false positive를 줄이고 `workspace-health`의 검증 범위를 넓혔다.
- 작업 health는 단일 명령이 아니라 문서, 구조, 보안, 설정, 테스트, 브라우저 검증, 빌드를 묶은 gate로 관리한다.
- 타이밍/병목은 phase 단위로 남겨야 하므로 work timing record를 유지한다.

## 불확실성

- 외부 출처는 일반 원칙을 제공한다. 실제 수용 기준은 현재 레포의 도구와 사용자의 운영 규칙에 맞춰 결정했다.
