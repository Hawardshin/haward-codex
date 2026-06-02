# 계획 기록: 민감 파일 경계와 최상위 폴더 아키텍처

## 작업 모드

- `governance`

## 분해

- 보안 경계: `_private/sensitive/`, 외부 secret manager, AI default-deny, redacted extract 우선.
- 생성물 경계: repository map, Workspace Monitor snapshot, source collector, public artifact, installer에서 `_private/` 제외.
- 구조 경계: 루트 폴더를 논리 계층으로 설명.

## 실행 계획

1. 웹 근거를 확인한다.
2. 요구사항 `REQ-WS-074`를 추가한다.
3. 민감 파일 boundary config와 정책/운영 안내를 추가한다.
4. workspace index와 monitor collector에서 `_private/`를 제외한다.
5. privacy audit 도구를 추가한다.
6. root structure policy와 인덱스 문서에 논리 계층을 추가한다.
7. 검증, 평가, 커밋, push를 수행한다.

## 병렬화 판단

공유 정책, 설정, generated map, monitor snapshot, git 상태를 함께 수정하므로 병렬 실행하지 않는다.
