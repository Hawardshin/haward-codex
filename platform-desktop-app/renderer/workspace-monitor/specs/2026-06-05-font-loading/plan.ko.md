# 구현 계획

1. 웹 검색과 npm metadata로 Pretendard 패키지 후보를 확인한다.
2. 설치 전 감사 기록과 registry entry를 남긴다.
3. 프로젝트 로컬 의존성으로 공식 `pretendard@1.3.9`를 설치한다.
4. `app/layout.tsx`에 dynamic subset CSS를 전역 import한다.
5. body 기본 line-height와 smoothing을 보강한다.
6. 폰트 import, package metadata, dynamic subset CSS, base typography defaults를 Node test로 고정한다.
7. workspace-monitor와 platform desktop 검증, 정적 export 브라우저 smoke, audit, config contract, diff check를 실행한다.
