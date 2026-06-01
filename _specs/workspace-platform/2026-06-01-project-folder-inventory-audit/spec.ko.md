# 프로젝트 폴더 인벤토리 감사 스펙

## 목표

등록된 프로젝트 내부의 durable top-level folder가 `_ops/projects/registry.json`에 설명되어 있는지 확인하고, generated output pattern이 `.gitignore`와 일치하는지 자동 검증한다.

## 요구사항

- `REQ-WS-027`

## 범위

- `_tools/structure-audit/` 기능 확장
- `_ops/projects/registry.json`의 `project_specific_home` 보강
- `_ops/projects/root-structure-policy.json`의 `generated_output_dirs` 보강
- 관련 운영 문서와 히스토리 갱신

## 비범위

- 프로젝트 폴더 대량 이동
- 기존 히스토리/요구사항/평가 파일 재배치
- generated output 삭제

## 수용 기준

- 감사 결과에 `project_inventories`가 포함된다.
- durable top-level folder가 registry에 없으면 warning이 나온다.
- generated output pattern이 `.gitignore`에 없으면 gap이 나온다.
- 현재 저장소는 gap/warning 없이 통과한다.

