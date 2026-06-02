# 2026-06-03 설치/동기화 기록: 커스텀 스킬 자동 적용

## 상태

- 상태: installed
- 설치 대상: `create-validated-skill` 동기화, `presentation-reference-curator` 신규 설치
- 소유 프로젝트/도구: workspace custom skills
- 설치 범위: skill
- 환경 경로:
  - `/Users/shinjoungeun/.codex/skills/create-validated-skill`
  - `/Users/shinjoungeun/.codex/skills/presentation-reference-curator`

## 설치 이유

- 사용자가 커스텀 스킬 자동 적용이 잘 안 되는 것 같다고 보고했다.
- 진단 결과 `presentation-reference-curator`는 레포 원본만 있고 Codex 설치본이 없었다.
- `create-validated-skill`은 source 설명을 개선한 뒤 설치본과 drift가 생겼으므로 재동기화가 필요했다.

## 설치 전 조사

| 출처 | 확인일 | 사용한 이유 |
| --- | --- | --- |
| OpenAI Academy: Using skills | 2026-06-03 | 스킬 설명이 관련성 인식에 쓰이고 설치 후 자동/명시 사용될 수 있음을 확인 |
| OpenAI Academy: Plugins and skills | 2026-06-03 | Codex에서 스킬이 작업 playbook 역할을 하고 명시 호출할 수 있음을 확인 |
| `_skills/registry.md` | 2026-06-03 | repository-managed custom skill 원본 목록 확인 |
| `/Users/shinjoungeun/.codex/skills/` | 2026-06-03 | 실제 Codex 설치본 목록 확인 |
| `agent-platform/configs/skills/skill-activation-registry.json` | 2026-06-03 | source/install/trigger/drift 검사 기준 |

## 설치 계획

- 정확한 설치 명령:
  - `cp _skills/create-validated-skill/SKILL.md /Users/shinjoungeun/.codex/skills/create-validated-skill/SKILL.md`
  - `cp -R _skills/presentation-reference-curator /Users/shinjoungeun/.codex/skills/`
- dependency 기록 파일:
  - `_skills/create-validated-skill/SKILL.md`
  - `_skills/create-validated-skill/agents/openai.yaml`
  - `_skills/presentation-reference-curator/SKILL.md`
  - `_skills/presentation-reference-curator/agents/openai.yaml`
- lock/SBOM 상태: 해당 없음. 외부 패키지 설치가 아니라 repository source copy.
- 예상 변경 파일: `$CODEX_HOME/skills` 아래 두 스킬 폴더.
- 권한 승인 필요 여부: 사용자가 현재 작업에서 개선/설치 권한을 부여했고, 작업은 local user Codex skill path에 한정된다.

## 보안/라이선스 검토

- 보안 검토: 외부 네트워크 패키지 설치 없음. `_private/`를 읽지 않음. 민감 파일/브라우저 쿠키/토큰을 사용하지 않음.
- 라이선스 검토: 내부 개인 workspace 산출물. 외부 코드 포함 없음.
- 유지보수 신호: source of truth는 `_skills/`; activation registry와 checker로 installed copy drift를 검사한다.
- 알려진 위험: Codex 내부 자동 선택 알고리즘은 레포에서 통제할 수 없다. 이번 기록은 설치 가능성과 trigger clarity를 검증하는 경계까지 다룬다.

## 설치 후 실제 결과

- 실행한 명령:
  - `cp _skills/create-validated-skill/SKILL.md /Users/shinjoungeun/.codex/skills/create-validated-skill/SKILL.md`
  - `cp -R _skills/presentation-reference-curator /Users/shinjoungeun/.codex/skills/`
- 설치된 버전: 이 작업 커밋의 `_skills/` source copy
- 변경된 파일:
  - `/Users/shinjoungeun/.codex/skills/create-validated-skill/SKILL.md`
  - `/Users/shinjoungeun/.codex/skills/presentation-reference-curator/SKILL.md`
  - `/Users/shinjoungeun/.codex/skills/presentation-reference-curator/agents/openai.yaml`
- 생성/갱신된 lock 파일: 없음
- 검증 명령과 결과:
  - 사전 `check-skill-activation`: `presentation-reference-curator` 설치 누락과 `create-validated-skill` drift를 보고함.
  - 설치 후 `check-skill-activation`: `ready`, `installed_ready_count=2`, `drift_free_count=2`
  - `quick_validate.py _skills/create-validated-skill`: `Skill is valid!`
  - `quick_validate.py _skills/presentation-reference-curator`: `Skill is valid!`

## Rollback

- `presentation-reference-curator` 제거: `rm -rf /Users/shinjoungeun/.codex/skills/presentation-reference-curator`
- `create-validated-skill` 제거: `rm -rf /Users/shinjoungeun/.codex/skills/create-validated-skill`
- 복구: 필요한 커밋의 `_skills/<skill-name>/` 원본을 다시 `$CODEX_HOME/skills/`로 복사한다.
- 복구 검증: `PYTHONPATH=src python3 -m agent_platform.cli check-skill-activation configs/skills/skill-activation-registry.json`

## 연결

- 설치 레지스트리: `_ops/installations/registry.json`
- activation registry: `agent-platform/configs/skills/skill-activation-registry.json`
- 스킬 registry: `_skills/registry.md`
- 평가 입력: `_history/evaluations/2026/2026-06-03-skill-auto-activation-evaluation-input.json`
- 커밋: pending
