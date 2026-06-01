# 추적성: 질문/지시 품질 게이트

| 항목 | 연결 |
| --- | --- |
| 사용자 요청 | `UR-2026-06-01-032` |
| 요구사항 | `REQ-WS-043` |
| 변경 기록 | `_requirements/changes/2026-06-01-prompt-instruction-quality.ko.md` |
| 검토 기록 | `_requirements/reviews/2026-06-01-prompt-instruction-quality.ko.md` |
| 설정 | `agent-platform/configs/usage/ai-usage-gap-profile.json`, `agent-platform/configs/memory/bootstrap-manifest.json` |
| 운영 문서 | `_docs/operating-models/ai-usage-gap-operating-model.ko.md`, `_docs/instructions/persistent-instructions.ko.md`, `_ops/workflows/59-bridge-ai-usage-gap.md`, `_ops/prompts/89-bridge-ai-usage-gap.md` |
| 웹 검색 기록 | `_history/web-searches/2026/2026-06-01-prompt-instruction-quality.ko.md` |
| 리서치 노트 | `_research/topics/agent-planning/2026-06-01-prompt-instruction-quality.ko.md` |
| 계획 기록 | `_history/plans/2026/2026-06-01-prompt-instruction-quality.ko.md` |
| 평가 | `_history/evaluations/2026/2026-06-01-prompt-instruction-quality.ko.md` |

## 근거 연결

- 명확한 지시와 출력 형식: OpenAI, Anthropic, Microsoft 공식 prompt guidance
- 검증과 grounding: Microsoft prompt guidance, 기존 hallucination prevention/evaluation 구조
- bias 관리: NIST AI RMF Generative AI Profile, NIST bias guidance
- 확률적 language model framing: Stanford CS224N language modeling lecture
