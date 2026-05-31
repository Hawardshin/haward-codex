# 지속 지시

이 문서는 앞으로도 계속 적용해야 하는 사용자 지시를 한국어로 정리한다.

## 활성 지시

- 이 저장소는 개인 에이전트 구축 플랫폼을 위한 monorepo로 운영한다.
- 별도 프로젝트는 루트의 `kebab-case` 폴더로 관리한다.
- 프로젝트별 파일은 해당 프로젝트 폴더 안에만 둔다.
- 새 관심사나 독립 라이프사이클이 생기면 새 루트 프로젝트로 만들고 `_ops/projects/`에 등록한다.
- 의미 있는 변경 단위가 끝날 때마다 커밋한다.
- 커밋 후 별도 지시가 없으면 즉시 `origin/main`에 push한다.
- 의미 있는 작업을 닫기 전 초기 사용자 지시와 결과를 평가하고, 실제 gap은 재작업한다.
- 평가 전에는 완료 작업을 요약하고 관련 이전 작업이나 강한 레퍼런스를 확인한다.
- 의미 있는 작업의 최종 평가는 `_history/evaluations/YYYY/` 아래 파일로 저장한다.
- 중요한 계획을 세우는 과정은 `_history/plans/YYYY/` 아래 파일로 저장한다.
- 작업 히스토리는 `_history/YYYY/YYYY-MM-DD.md`에 기록한다.
- 나중에 문서만 보고도 한 일을 쉽게 파악할 수 있도록 `_history/work-summaries/YYYY/` 아래 빠른 작업 요약을 유지한다.
- `_ops/`를 프롬프트, 워크플로, 맵을 위한 운영 허브로 사용한다.
- 진행 중인 에이전트와 병렬 작업은 `_ops/coordination/`에서 추적한다.
- 인터넷 조사와 외부 레퍼런스 중 재사용 가치가 있는 내용은 `_research/`에 기록한다.
- 에이전트와 플랫폼 운영의 근본 철학은 `_philosophy/`에 기록한다.
- 모든 새 사용자 지시는 계획, 저장소 탐색, 파일 수정 전에 웹 검색을 먼저 수행한다.
- `_ops/prompts/`의 모든 재사용 프롬프트 실행도 웹 검색을 먼저 수행한다.
- 의미 있는 웹 검색 기록은 `_history/web-searches/YYYY/`에 저장하고 작업 평가 입력에 `web_search_record_targets`를 포함한다.
- 검색 판단 과정은 검색어, 확인한 출처, 제외한 약한 출처, 계획에 반영한 인사이트, 남은 불확실성 형태의 공개 판단 요약으로 텍스트에 남긴다. 내부 추론 원문은 저장하지 않는다.
- 웹 검색이 무관하거나 불가능하면 그 사실을 기록하고 로컬 검증을 강화해 진행한다.
- 웹 검색 후 로컬 계획 전에 `memory-bootstrap-agent`로 필수 메모리 anchor를 확인하고 hot context를 읽는다.
- durable rule, 출처 설정, 프롬프트, 워크플로, 프로젝트 경계, 평가 루프가 바뀌면 `agent-platform/configs/memory/bootstrap-manifest.json`도 갱신한다.
- 조사나 계획 작업은 공식 문서, 논문, 오픈소스 repo, 외국 기술 블로그, 조사 아티클, 커뮤니티/소셜 신호, 반대 사례를 폭넓게 수집한다.
- 좋아요, 공유, 댓글, GitHub stars, Hacker News 점수, Reddit 활동, LinkedIn 반응은 adoption 신호로만 보고 단독 사실 근거로 쓰지 않는다.
- 폭넓은 출처 수집이 반복되거나 출처 묶음 점수화/보고서가 필요하면 `_tools/source-collector/`를 사용한다.
- 지식 베이스 내용은 틀릴 수 있다고 가정하고, 근거로 사용하기 전 `knowledge-skeptic-agent`로 검증한다.
- 중요한 계획은 AI의 내부 추정만으로 세우지 않고, 웹 검색과 다른 검색 채널을 통해 인사이트를 도출한 뒤 수립한다.
- `research-insight-planner-agent`는 플랫폼의 핵심 조사 에이전트이며 Perplexity식 answer engine으로 취급한다.
- 일반 조사 계획은 `research_profile_paths`에 `agent-platform/configs/research/research-agent-profile.json`을 기록하고, `answer_engine_stages`와 `citation_requirements`를 포함해야 한다.
- 조사 에이전트는 `query_understanding`, `search_retrieval`, `source_ranking`, `evidence_extraction`, `synthesis`, `citation_grounding`, `skeptic_review` 단계를 거친다.
- 출처는 종합 전에 순위화하고, citation은 증명 자체가 아니라 검증 핸들로 취급한다.
- `research-insight-planner-agent`를 쓰는 작업은 `plan_history_targets`를 지정하고 계획 변경 이력을 남긴다.
- 코딩/API/라이브러리/아키텍처/성능/디버깅/보안/마이그레이션 조사는 구현 전에 `coding-research-agent`로 출처, 선택지, 추천안, 위험, 검증 계획, 표준 종료 질문을 확인한다.
- 코딩 조사는 `source_types`를 명시하고 최소 3개 이상의 `other`가 아닌 서로 다른 출처 유형을 사용해야 한다.
- 코딩 조사는 어떤 출처 레지스트리나 리서치 프로필 설정을 참고했는지 `reference_config_paths`로 기록해야 한다.
- 소스 코드를 작성하는 에이전트는 구현 전 관련 오픈소스 저장소, 참고 구현, 잘 작성된 코드 구조와 테스트를 조사하고 `code_reference_sources`, `code_reference_notes`로 기록해야 한다.
- 공유 설정 파일은 `reader_guide`, `reference_links`, `structure_rules`, `field_guide`를 포함해 파일 하나만 열어도 참고 링크와 구조 규칙을 이해할 수 있어야 한다.
- 중요한 공유 설정 파일을 만들거나 바꾸면 `config-contract-agent`로 자기 설명 계약을 검사한다.
- 최종 산출물에 사실 주장이 포함되면 `hallucination-guard-agent`로 근거를 검증한다.
- 근거 없는 사실 주장은 검증하거나, 삭제하거나, 불확실성으로 명시한다.
- 긴 대화 맥락은 저장소 문서와 히스토리 로그로 압축한다.
- 반복 워크플로는 필요할 때 템플릿, 도구, 스킬, 프롬프트, 워크플로로 승격한다.
- 탐색 구조가 바뀌면 저장소 맵과 프롬프트 맵을 갱신한다.
- `work-evaluator-agent`를 기본 종료 평가 에이전트로 사용한다.
- 의미 있는 작업의 평가 입력에는 `work_summary_targets`를 포함한다.
- 에이전트 구현, 오케스트레이션, 백엔드 자동화, 평가, 재사용 로컬 도구는 Python을 우선한다.
- 작업에 맞는 성숙하고 유지보수되는 오픈소스 도구와 라이브러리를 우선 검토한다.
- 성숙한 오픈소스 도구나 라이브러리가 작업에 맞으면 설치를 피하지 말고 프로젝트/도구 범위에 설치해 사용할 수 있다.
- 오픈소스 설치 전에는 설치 범위, 정확한 설치 명령, dependency 기록 파일, 보안 검토, 라이선스 검토, 검증 방법, rollback 계획을 남긴다.
- 실제 설치, 업그레이드, 제거, 전역 환경 변경이 발생하면 `_history/installations/YYYY/`에 설치 감사 기록을 만들고 `_ops/installations/registry.json`에 인덱싱한다.
- 설치가 실제로 발생한 작업의 평가 입력에는 `installation_occurred=true`와 `installation_record_targets`를 포함한다.
- 전역 설치는 피하고, 꼭 필요하면 이유와 제거 방법을 문서화하고 필요한 권한 승인을 받는다.
- 유용한 인터넷 조사 내용은 출처 URL, 접근일, 요약, 신뢰도, 적용 가능성과 함께 문서화한다.
- 브라우저 렌더링, 시각 계층, 대시보드, 인터랙티브 리뷰가 유용하면 HTML 산출물을 검토한다.
- 사용자가 읽는 문서와 히스토리는 한국어를 기본으로 작성한다.
- 실제 실행 프롬프트 본문은 영어로 작성한다.
- 중요한 지속 정책, 워크플로, 프로젝트 설명은 한국어/영어 병렬 문서를 만든다.

## 유지 규칙

사용자가 앞으로도 적용해야 할 지시를 주면 이 문서와 영어 companion 문서, 그리고 관련 운영 문서를 같은 변경 단위에서 업데이트한다.
