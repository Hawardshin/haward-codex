# Omission Check

- 요청 반영:
  - UI 직관성: 첫 실행, init 상태, 계정 설정, 작업공간, 데이터 경계, CLI 연결 패널의 문구를 단순화했다.
  - 설정 단순화: Provider login guide를 접을 수 있는 `<details>`로 변경했다.
  - 긴 버튼 텍스트: 주요 런타임/설정 버튼의 화면 라벨을 축약하고 `aria-label`/`title`에 상세 설명을 남겼다.
  - 동기화 체감: 기존 공통 settings runtime sync hook과 action feedback 계약을 유지하며 버튼/상태 표시를 정리했다.
  - 색상/다크모드: 기존 color token contrast tests를 유지하고 새 CSS는 token 기반으로 추가했다.
- 미처리 사유:
  - public signing/notarization/updater credentials는 사용자 비밀값과 외부 배포 설정이 필요하므로 구현하지 않았다.
  - 기능 삭제는 사용성 근거와 영향 분석 없이 진행하지 않았다.
- 검증: 모든 기록된 check/test/build/package gate 통과.
