# 라이선스와 출처 정책

## 원칙

- 불법 다운로드나 출처 불명 SVG 저장을 하지 않는다.
- 기본 사용 자산은 `scripts/generate_svg_assets.py`가 만든 내부 생성 SVG다.
- 외부 오픈소스 SVG는 후보로만 기록하고, 실제 파일 저장 전에는 현재 라이선스, 출처 URL, 접근일, attribution, 상표/브랜드 제한, public 배포 가능 여부를 기록한다.

## 현재 자산 상태

- `assets/svg/generated/`의 600개 SVG는 외부 SVG 파일을 복사하지 않고 레포 내부 generator로 생성했다.
- public 배포 전에는 저장소 소유자가 최종 라이선스를 명시해야 한다.
- 외부 후보는 `data/asset-registry.json`의 `external_source_candidates`에 기록되어 있으며, `downloaded=false`다.
- 현재 후보군에는 Lucide, Heroicons, Tabler Icons, Bootstrap Icons, Google Material Symbols, OpenMoji, Font Awesome Free가 포함된다.

## 사용 금지

- 유료 템플릿, 상용 PPT, 브랜드 asset, marketplace asset을 출처 없이 복사하지 않는다.
- “비슷한 느낌”을 만들더라도 특정 유료/브랜드 디자인을 그대로 추적해 복제하지 않는다.
- 외부 SVG를 저장할 경우 license file이나 attribution record 없이 저장하지 않는다.

## 외부 후보를 실제 저장할 때 필요한 기록

- 원천 URL
- license 이름과 license URL
- 접근일
- attribution 필요 여부
- public/private 사용 가능 범위
- 수정 가능 여부
- 상표/브랜드 제한
- 저장한 파일 목록
