# Structure Audit

루트 폴더가 등록된 프로젝트인지, 공유 운영 폴더인지, 로컬 전용 폴더인지 검사하는 도구다.

## 입력

- `_ops/projects/root-structure-policy.json`
- `_ops/projects/registry.json`
- `.gitignore`
- 저장소 루트의 1단계 디렉터리

## 출력

- root directory classification
- 등록되지 않은 root folder gap
- 등록된 프로젝트의 `README.md` 누락 gap
- local-only folder의 `.gitignore` 누락 gap

## 실행

저장소 루트에서 실행한다.

```bash
python3 _tools/structure-audit/src/structure_audit.py --check
```

## 검증

```bash
python3 -m unittest discover -s _tools/structure-audit/tests
```

## 운영 규칙

- 새 root project를 만들면 `_ops/projects/registry.json`에 등록한 뒤 이 도구를 실행한다.
- 새 예약 운영 폴더를 만들면 `_ops/projects/root-structure-policy.json`에 먼저 추가한다.
- `_private/`와 `outputs/`는 local-only로만 사용하며 durable knowledge source로 쓰지 않는다.
- project artifact는 `outputs/`가 아니라 owning project의 `artifacts/` 아래에 둔다.
