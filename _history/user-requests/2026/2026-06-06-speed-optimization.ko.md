# 사용자 요청 요약: 속도 최적화

## 원 요청

사용자는 데스크톱 앱의 탭 전환이 여전히 느리며, OS/CPU/RAM 같은 데스크톱 자원을 적극적으로 활용해 근본적으로 속도를 개선하라고 요청했다. 구현 후 매번 사용자가 직접 빌드하지 않도록 자동으로 빌드와 패키징까지 끝내는 것도 지속 요구사항이다.

## 해석한 수용 기준

- 탭 전환 시 첫 mount 지연을 줄인다.
- 모든 탭을 무제한 마운트해 장기 메모리 비용을 키우지 않는다.
- 핵심 탭은 시작 후 유휴 시간에 미리 준비한다.
- 불필요한 hidden rerender를 줄인다.
- renderer test/check/build, section performance audit, desktop test/check, internal package build를 모두 실행한다.
