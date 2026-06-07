# 런타임 init 상태 가시성 웹 검색

- 날짜: 2026-06-07
- 요청 요약: Codex/CLI init이 실제로 됐는데 사용자가 완료 여부를 알기 어렵다는 문제를 개선.
- 검색 목적: 상태 가시성 UX 원칙을 확인하고 로컬 UI 수정 방향을 정하기.

## 확인한 출처

- Nielsen Norman Group heuristic summary 자료: https://media.nngroup.com/media/articles/attachments/Heuristic_Summary1_A4_compressed.pdf
  - 신뢰도: UX 휴리스틱 공식 요약 자료
  - 확인 내용: 시스템 상태는 적절하고 시기적절한 피드백으로 사용자에게 보여야 한다.

## 계획 영향

- 임시 액션 피드백만으로는 init 완료 여부를 놓칠 수 있으므로, 상단 빠른 시작 영역에 항상 남는 `Runtime init status` 카드를 추가한다.
- 성공/진행/실패 상태를 같은 위치에 표시하고, 세션 ID/파이프라인 ID/실행 기록으로 이어지는 단서를 남긴다.

## 불확실성

- 실제 Codex CLI 세션의 긴 실행 상태는 터미널/실행 기록 폴링에 의존한다. 이번 작업은 init 완료 가시성에 초점을 맞췄다.
