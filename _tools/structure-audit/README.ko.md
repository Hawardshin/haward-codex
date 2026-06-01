# Structure Audit

루트 폴더가 등록된 프로젝트인지, 공유 운영 폴더인지, AI assistant runtime adapter인지, 로컬 전용 폴더인지 검사하고, 등록된 프로젝트의 top-level 폴더가 등록부에 설명되어 있는지 확인하는 도구다.

## 입력

- `_ops/projects/root-structure-policy.json`
- `_ops/projects/registry.json`
- `.gitignore`
- 저장소 루트의 1단계 디렉터리
- 등록된 프로젝트의 1단계 디렉터리

## 출력

- root directory classification
- 등록되지 않은 root folder gap
- 등록된 프로젝트의 `README.md` 누락 gap
- local-only folder의 `.gitignore` 누락 gap
- runtime adapter folder classification
- generated output pattern의 `.gitignore` 누락 gap
- 등록된 프로젝트의 top-level folder inventory
- `project_specific_home`에 설명되지 않은 프로젝트 top-level folder warning

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
- 새 AI assistant runtime adapter folder를 만들면 `_ops/projects/root-structure-policy.json`의 `runtime_adapter_dirs`와 `_ops/assistant-runtimes/adapter-registry.json`에 먼저 추가한다.
- 프로젝트 내부에 새 durable top-level folder를 만들면 해당 프로젝트의 `project_specific_home`에 추가한다.
- 생성물 폴더는 `_ops/projects/root-structure-policy.json`의 `generated_output_dirs`와 `.gitignore`에 함께 반영한다.
- `_private/`와 `outputs/`는 local-only로만 사용하며 durable knowledge source로 쓰지 않는다.
- project artifact는 `outputs/`가 아니라 owning project의 `artifacts/` 아래에 둔다.
