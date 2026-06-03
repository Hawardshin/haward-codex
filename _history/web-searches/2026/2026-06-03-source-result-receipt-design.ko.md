# Web Search: Source Result Receipt Design

## Queries

- `Fluent 2 status message validation result panel design desktop app`
- `Carbon Design System notification inline status result panel usage`
- `Atlassian Design System section message status lozenge empty state result UI`

## Checked Sources

- Carbon Notification usage: https://carbondesignsystem.com/components/notification/usage/
- Atlassian Designing messages: https://atlassian.design/foundations/content/designing-messages/
- Atlassian Button/Icon status references found through design-system search: https://atlassian.design/components/button/

## Plan Impact

- Source 저장 결과를 긴 텍스트 리스트가 아니라 inline result/receipt surface로 재구성했다.
- 결과 화면에 상태 hero, summary strip, 개별 result card, status lozenge, backup path receipt를 분리했다.
- 결과 문구는 과한 설명 대신 저장 상태, 최근 파일, 용량, 백업 상태처럼 사용자가 판단에 쓰는 정보 중심으로 줄였다.

## Weak Sources Ignored

- Reddit, 비공식 UI 팁, 오래된 PDF는 discovery signal로만 보고 구현 근거에는 포함하지 않았다.

## Uncertainty

- 이번 변경은 Source 저장 결과 surface에 한정한다. 전체 앱의 모든 결과/알림/receipt pattern 통합은 별도 design-system extraction 작업으로 남는다.
