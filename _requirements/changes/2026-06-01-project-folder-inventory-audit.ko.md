# 프로젝트 폴더 인벤토리 감사 요구사항 변경

## 변경 요약

- 변경일: 2026-06-01
- 변경 유형: 요구사항 추가
- 추가 요구사항: `REQ-WS-027`
- 작업 모드: `governance`

## 변경 내용

등록된 프로젝트의 durable top-level folder는 `_ops/projects/registry.json`의 `project_specific_home`에 설명되어야 한다. 생성물 폴더와 파일 pattern은 `_ops/projects/root-structure-policy.json`의 `generated_output_dirs`에 기록하고 `.gitignore`에서도 무시되어야 한다.

## 변경 근거

루트 폴더 분류는 이미 자동 감사되고 있었지만, 프로젝트 내부 top-level folder가 등록부에 설명되어 있는지 확인하지 못했다. 이 경우 `public/`, `data/`, `specs/` 같은 폴더가 시간이 지나면서 소유 의미를 잃을 수 있다.

## 검증 기준

- `structure-audit`가 등록된 프로젝트별 top-level folder inventory를 출력한다.
- `project_specific_home`에 없는 durable top-level folder는 warning으로 보고한다.
- `generated_output_dirs` pattern이 `.gitignore`에 없으면 gap으로 보고한다.
- 현재 저장소 구조는 warning과 gap 없이 통과해야 한다.

