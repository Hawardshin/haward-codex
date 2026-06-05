# 사용자 요청 요약: shared workspace resource cache

- 원문 요지: `개발`
- 맥락 해석: 앞선 데스크톱 앱 속도, 메모리, OS 자원 활용, 탭 이동 지연 개선 요구를 이어서 실제 플랫폼 코드를 더 개선하라는 지시.
- 적용 범위: `platform-desktop-app`의 resident desktop/source runtime panel이 같은 native workspace warmup/source catalog prepare를 중복 실행하지 않도록 최적화.
- 완료 기준: 구현, 테스트, customer build, internal package, 기록, commit, push.
