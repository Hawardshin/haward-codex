# 계획: 공개 Impress 템플릿 수집과 HTML 참조화

1. 웹 검색으로 무료 PPT/ODF 템플릿 원천, 다운로드 가능성, 라이선스 조건을 확인한다.
2. 라이선스가 명확한 upstream archive를 다운로드하고, 제한 약관 후보는 metadata-only로 제외한다.
3. `presentation-agent` 내부에 공개 템플릿 수집기를 추가한다.
4. 수집기로 `.otp` 파일, 썸네일, 템플릿별 HTML 참조 페이지, 전체 갤러리, registry를 생성한다.
5. README, research, source notes, history, timing, evaluation을 업데이트한다.
6. 단위 테스트, browser test, JSON 검증, workspace 검증, grounding/evaluation을 실행한다.
