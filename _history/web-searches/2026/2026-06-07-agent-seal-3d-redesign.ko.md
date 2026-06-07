# 2026-06-07 물개형 3D 에이전트 참고 검색

## 요청

- 기존 3D 에이전트가 사람형이고 못생겼으므로, 팔다리 없이 둥글고 실제 물개에 가까운 귀여운 3D 에이전트로 바꾼다.

## 검색

- `NOAA Fisheries harbor seal rounded head flippers body description`
- `The Marine Mammal Center harbor seal rounded head flippers description`
- `harbor seal body shape fusiform flippers rounded head`

## 확인한 출처

- NOAA Fisheries, Harbor Seal: https://www.fisheries.noaa.gov/species/harbor-seal
- The Marine Mammal Center, Harbor Seal: https://www.marinemammalcenter.org/animal-care/learn-about-marine-mammals/pinnipeds/harbor-seal

## 반영

- NOAA 설명에서 true seal은 짧은 앞지느러미가 있고 외부 귀 덮개가 없다는 형태 기준을 확인했다.
- NOAA 설명에서 harbor seal은 짧은 snout, 회색/은색/탄색 계열 fur, speckling/spots 패턴이 있다는 점을 확인했다.
- 3D 구현은 사람형 귀, 손, 발, 바이저, 가슴 패널을 제거하고 둥근 몸통, 둥근 머리, 짧은 앞지느러미, 뒤지느러미, 꼬리, 수염, 점무늬, 작은 상태 태그로 치환한다.

## 불확실성

- 정확한 생물학적 모델링이 아니라 제품 UI 캐릭터 목적의 low-poly/primitive Three.js 표현이다.
- 참고 출처는 실제 물개 특징을 잡는 기준으로 사용했고, 시각 스타일은 기존 앱의 어두운 작업면과 상태 색상 체계에 맞췄다.
