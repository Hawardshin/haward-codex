# 평가: Open Source Feature Radar

## 결과

요청한 “가능하면 기능 추가, 설치 필요하면 설치”에 대해 기능별 오픈소스 research를 Product Structure 안의 `오픈소스 기능 레이더`로 승격했다. 새 dependency 설치는 필요하지 않았다.

## 구현 평가

- 오픈소스 후보 repo와 install policy가 `open-source-feature-reference-registry.json`에 self-documenting config로 고정됐다.
- Workspace Monitor snapshot에 `openSourceFeatureReferences`가 추가되어 developer/customer snapshot 모두에서 계약이 명확해졌다.
- Customer snapshot은 내부 reference link와 watch target을 제거한다.
- Product Structure 화면에서 6개 high-priority layer card와 설치 정책 badge가 표시된다.

## 검증

- config contract 통과.
- workspace-monitor test/check/perf/build 통과.
- platform-desktop-app test/check 통과.
- Browser DOM smoke와 Playwright screenshot smoke 통과.
- `corepack pnpm run desktop:package:internal` 통과, `.app`와 `.dmg` 생성 및 검증 완료.

## 설치 평가

- `installation_occurred=false`
- 새 package/CLI/MCP/global install 없음.
- 후속으로 실제 repo clone 또는 dependency 설치가 필요할 때는 installation audit와 rollback plan이 먼저 필요하다.

## 잔여 리스크

- public release는 기존처럼 Developer ID signing, notarization, signed updater, clean-machine smoke가 필요하다.
- 후보 repo의 라이선스/보안 검토는 아직 후보 단계이며, 코드를 복사하거나 dependency를 추가하기 전 별도 검토가 필요하다.
