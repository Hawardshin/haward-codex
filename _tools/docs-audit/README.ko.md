# Docs Audit

## 목적

`_docs/` 문서가 category 폴더에 들어가 있는지, 필수 문서가 빠지지 않았는지, 한영 companion 문서가 유지되는지 확인하는 도구다.

## 입력

- `_docs/registry.json`
- `_docs/` 아래 Markdown 파일

## 출력

- category별 문서 수
- root에 잘못 놓인 Markdown gap
- registry에 등록된 필수 문서 누락 gap
- category include pattern과 맞지 않는 문서 gap
- `.ko.md`/`.en.md` companion 누락 gap

## 실행

저장소 루트에서 실행한다.

```bash
python3 _tools/docs-audit/src/docs_audit.py --check
```

## 검증

```bash
python3 -m unittest discover -s _tools/docs-audit/tests
```

## 운영 규칙

- `_docs` 아래 새 문서는 category 폴더에 넣는다.
- 새 category가 필요하면 `_docs/registry.json`을 먼저 갱신한다.
- 중요한 durable 문서는 한영 companion을 함께 둔다.
- `_docs` 구조를 바꾼 뒤에는 workspace index와 monitor snapshot도 갱신한다.
