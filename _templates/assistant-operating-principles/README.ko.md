# Assistant Operating Principles 템플릿

## 목적

이 템플릿은 특정 AI 코딩 도구에 묶이지 않는 운영 원칙을 새 프로젝트나 다른 저장소에 복사해 사용할 때 쓴다.

## 파일

- `principles.ko.md`: 사람이 읽는 한국어 원칙 템플릿
- `principles.en.md`: 실제 assistant instruction으로 쓰기 좋은 영어 원칙 템플릿
- `runtime-adapter.ko.md`: 도구별 adapter를 만들 때 확인할 한국어 체크리스트
- `runtime-adapter.en.md`: 도구별 adapter instruction 템플릿

## 사용 순서

1. `principles.en.md`를 대상 저장소의 공통 원칙 문서로 복사한다.
2. 대상 도구가 요구하는 파일명으로 `runtime-adapter.en.md`를 얇게 변환한다.
3. 도구별 공식 문서로 instruction loading, rule scope, permissions, sandbox, memory 동작을 확인한다.
4. 공통 원칙은 한 곳에서 유지하고, 도구별 adapter는 공통 원칙을 참조하게 만든다.

