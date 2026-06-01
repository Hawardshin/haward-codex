# CLI Pipeline 파일/아티팩트 Handoff 웹 검색 기록

## 검색 시간

- 날짜: 2026-06-02
- 작업 모드: `governance`

## 검색어

- `Python tempfile official documentation NamedTemporaryFile TemporaryDirectory cleanup`
- `Node.js fs official documentation streams file system`
- `OWASP Path Traversal file path validation guide`
- `CWE-22 Improper Limitation of a Pathname to a Restricted Directory path traversal`

## 확인한 출처

- Python `tempfile`: https://docs.python.org/3/library/tempfile.html
- Node.js `fs`: https://nodejs.org/api/fs.html
- OWASP Path Traversal: https://owasp.org/www-community/attacks/Path_Traversal
- CWE-22: https://cwe.mitre.org/data/definitions/22

## 약한 출처 제외

- 일반 블로그, SEO성 보안 페이지, 오래된 PDF mirror, Reddit Q&A는 이번 요구사항의 핵심 근거로 쓰지 않았다.

## 계획 반영

- temporary artifact는 cleanup policy를 필수로 둔다.
- file stream/write는 크기 제한과 validation을 artifact 계약에 둔다.
- path traversal 방지를 위해 artifact path는 workspace-relative로 제한하고 absolute path, drive prefix, backslash, `~`, `..`를 거부한다.
- `mode=file` 또는 `mode=artifact` pipe는 `artifact_id`를 명시적으로 참조하게 한다.

## 불확실성

- 실제 runner가 없으므로 파일 open/close, deletion, stream backpressure 측정은 이번 변경의 범위가 아니다. 추후 runner 구현 시 `resource-guard-agent`로 실제 lifecycle/measurement를 추가해야 한다.

## 공개 판단 요약

파일 handoff는 단순히 “출력 파일 경로를 하나 적는다”로 충분하지 않다. 프로세스 그래프의 일부로 artifact를 등록하고, 경로 경계, 크기, 생성자/소비자, 정리/보존, 출처, 검증을 함께 기록해야 나중에 설치형 플랫폼이나 local daemon이 같은 규칙을 강제할 수 있다.
