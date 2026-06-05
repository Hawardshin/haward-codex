# 계획: 탭 상주 선마운트 최적화

## 단계

1. 현재 탭 렌더링 조건과 기존 `MountedSectionPanel` 사용 범위를 확인한다.
2. resident section state, idle mount plan, pointerdown pre-resident 처리를 추가한다.
3. 모든 주요 탭의 조건부 렌더를 resident panel로 치환한다.
4. hidden resident panel의 layout 격리를 CSS로 보강한다.
5. 문자열 기반 계약 테스트를 새 resident preload 구조에 맞게 갱신한다.
6. workspace-monitor 단위 검증 후 전체 앱 검증과 내부 패키징 빌드를 실행한다.

## 위험과 대응

- 초기 CPU spike: idle callback과 timeout fallback으로 섹션을 순차 마운트한다.
- 숨김 탭 부작용: launch request와 active surface flag를 현재 탭으로 제한한다.
- DOM 메모리 증가: 사용자가 요구한 전환 성능 개선을 위해 의도적으로 허용하되, resident count를 DOM attribute로 노출한다.
- JSX 대규모 래핑 오류: `tsc --noEmit`과 monitor tests로 즉시 검출한다.

## 롤백

`residentSectionIds`, `residentSectionMountPlan`, `shouldRenderSection`와 각 `MountedSectionPanel` 치환을 되돌리고 기존 section equality 조건으로 복구한다.
