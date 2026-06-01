# Runtime Adapter 템플릿

## 사용할 때

새 AI 코딩 도구가 자체 instruction 파일, rule 폴더, workflow 형식을 요구할 때 사용한다.

## 작성 체크리스트

- 공식 문서 URL:
- instruction 파일 경로:
- rule/workflow 경로:
- 자동으로 항상 읽히는지:
- path scope 또는 glob 지원:
- memory/compaction 이후 재로드 방식:
- 명령 실행 권한 모델:
- sandbox 또는 project boundary:
- secret/local file 보호 방식:
- 이 저장소에서 참조할 공통 원칙 파일:
- 검증 명령:

## Adapter 본문 지침

실제 adapter 본문은 영어로 작성한다. 길게 정책을 복사하지 말고 다음처럼 참조한다.

```md
# Runtime Adapter

Use the shared operating principles in <shared-principles-path>.
Use the repository rules in <canonical-instructions-path>.
This file is a thin adapter for <runtime-name>; do not fork durable policy here.

Before substantial work:
- run web-first intake
- load durable memory anchors
- select the work mode
- verify project boundaries
- update requirements/specs/history/evaluation when required
- run verification before close-out

Runtime caveats:
- <permission/sandbox/memory limitation>
```

