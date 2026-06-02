# 계획 근거: 공개 Impress 템플릿 수집

## 계획 결론

원본 파일을 실제로 저장해야 하는 요청이므로, 무료 템플릿 갤러리의 단순 다운로드보다 재배포 가능성이 명확한 공개 repository archive를 우선 사용한다.

## 근거

- `dohliam/libreoffice-impress-templates`는 collection README별 license note가 있어 raw storage 판단을 기록할 수 있다.
- LibreTemplates는 무료 다운로드가 가능하지만 license page가 재배포를 제한하므로 raw storage에 부적합하다.
- Canva, Slidesgo, MiriCanvas 등은 디자인 참고로 유용하지만 item-level terms 확인 전까지 원본 대량 저장에 부적합하다.
- 로컬에 LibreOffice/`soffice`가 없어 고화질 변환을 주장할 수 없으므로 HTML reference-only 변환으로 범위를 낮춰야 한다.

## 구현 선택

- Python 수집기를 만들어 반복 실행 가능하게 한다.
- ODF template directory를 `.otp`로 패키징한다.
- 썸네일과 추출 텍스트를 HTML 카드로 만든다.
- registry에 source/provenance/license/local file/html path를 모두 남긴다.
