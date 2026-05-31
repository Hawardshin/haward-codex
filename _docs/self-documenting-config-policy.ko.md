# 자가 설명형 설정 파일 정책

## 목적

설정 파일은 단순히 값만 담는 파일이 아니라, 사용자가 그 파일만 열어도 무엇을 참고했고 어떤 구조 규칙을 따르는지 이해할 수 있어야 한다.

## 적용 대상

- `agent-platform/configs/` 아래의 공유 설정 파일
- 여러 에이전트가 반복해서 참고하는 source registry, research profile, memory manifest
- 프로젝트 공통 규칙이나 실행 기준을 담는 JSON 설정 파일

## 필수 구조

공유 설정 JSON은 다음 top-level 필드를 둔다.

- `schema_version`: 설정 구조 버전
- `name`: 설정의 안정적인 이름
- `purpose`: 이 설정이 존재하는 이유
- `reader_guide`: 사람이 파일을 읽는 순서와 갱신 조건
- `reference_links`: 참고한 내부 문서와 외부 링크
- `structure_rules`: 이 설정을 유지하는 구조 규칙
- `field_guide`: 중요한 필드의 의미와 필수 여부

## 참고 링크 규칙

- 외부 URL은 `title`, `url`, `source_type`, `used_for`, `last_checked`를 기록한다.
- 내부 문서는 `title`, `path`, `source_type`, `used_for`, `last_checked`를 기록한다.
- 링크는 단순 북마크가 아니라 "이 설정에서 무엇을 위해 참고하는지"를 반드시 설명한다.
- 소셜/커뮤니티 신호는 발견 또는 adoption signal로만 쓰고, 단독 사실 근거로 쓰지 않는다.

## 구조 규칙

- 중요한 정책이나 판단 기준은 설정 파일 내부의 `structure_rules`에도 남긴다.
- 사람이 읽는 설명은 `reader_guide`와 `field_guide`에 둔다.
- 검증 가능한 규칙은 Python CLI로 검사한다.
- 새 공유 설정 파일을 만들거나 중요한 설정을 바꾸면 아래 명령을 실행한다.

```bash
PYTHONPATH=src python3 -m agent_platform.cli check-config-contract <config.json>
```

## 현재 필수 검사 대상

```bash
PYTHONPATH=src python3 -m agent_platform.cli check-config-contract \
  configs/memory/bootstrap-manifest.json \
  configs/research/source-registry.json \
  configs/research/research-agent-profile.json \
  configs/research/coding-research-profile.json
```

## 근거

- JSON Schema annotation의 `title`, `description`, `examples`처럼 검증 외 설명 메타데이터를 두면 스키마와 설정이 self-documenting해진다.
- Configuration as Code는 설정 변경을 버전 관리, 검증, 리뷰 가능한 단위로 만든다.
- 이 저장소에서는 배포 환경 변수보다 에이전트 운영 규칙과 연구 기준 설정이 중요하므로, 설정 파일 안에 참고 링크와 구조 규칙을 직접 둔다.
