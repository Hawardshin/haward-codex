# 계획: 민감 파일 경계와 최상위 폴더 논리 계층

## 작업 모드

- `governance`

## 근거

- OWASP Secrets Management: secret 중앙화, 접근 제어, audit, rotation.
- OWASP DevSecOps: secret이 repository history에 들어가기 전 차단.
- GitHub Secure your secrets: secret scanning과 push protection.
- 1Password Developer: secret reference와 `op run`.
- Nx Folder Structure: monorepo folder structure는 계획과 scope 그룹화가 필요하다.

## 단계

1. 민감 파일 boundary config를 추가한다.
2. `_private/` AI default-deny 정책과 운영 안내를 추가한다.
3. workspace index와 monitor collector가 `_private/` 내용을 읽지 않도록 보강한다.
4. privacy audit 도구를 추가한다.
5. root structure policy에 논리 계층을 추가한다.
6. 요구사항, 스펙, 히스토리, 평가, 모니터 snapshot을 갱신한다.
7. 검증 후 커밋하고 push한다.
