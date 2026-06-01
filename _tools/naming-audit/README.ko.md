# Naming Audit 도구

## 목적

`_ops/naming/naming-policy.json`에 정의된 네이밍 규칙 중 기계적으로 확인 가능한 규칙을 검사한다.

## 명령

```bash
python3 _tools/naming-audit/src/naming_audit.py --check
```

JSON 보고서만 볼 때:

```bash
python3 _tools/naming-audit/src/naming_audit.py
```

## 검사 범위

- root project name/path
- reserved operational directory name
- runtime adapter directory name
- `_tools/*` folder name
- `_skills/*` folder name
- `_docs` Markdown file slug
- shared/project spec directory date slug
- Python source package/module names under `src/`
- JSON config file names and top-level `name`/`id` values

## 출력

- `status`: `clean` 또는 `naming_rework_required`
- `gaps`: 수정해야 하는 이름 규칙 위반
- `warnings`: 참고할 비차단 항목
- `checked`: 검사 개수 요약
