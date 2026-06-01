# CLI Pipeline 파일/아티팩트 Handoff 리서치 노트

## 핵심 인사이트

CLI pipeline에서 pipe만으로 충분하지 않은 경우가 있다. 큰 출력, 중간 캐시, 변환 산출물, 로그, 리포트는 파일 또는 artifact로 남는다. 이때 artifact를 검증 없이 두면 경로 탈출, 정리 누락, stale output, 과도한 용량, 출처 불명 데이터가 생길 수 있다.

## 적용 원칙

- `artifact_id`로 pipe edge와 artifact record를 연결한다.
- path는 workspace-relative로 제한한다.
- 임시성 artifact는 cleanup policy를 둔다.
- 보존 artifact는 retention policy를 둔다.
- required artifact는 size bound와 validation을 둔다.
- input artifact는 provenance를 둔다.

## 출처

- Python `tempfile`: https://docs.python.org/3/library/tempfile.html
- Node.js `fs`: https://nodejs.org/api/fs.html
- OWASP Path Traversal: https://owasp.org/www-community/attacks/Path_Traversal
- CWE-22: https://cwe.mitre.org/data/definitions/22
