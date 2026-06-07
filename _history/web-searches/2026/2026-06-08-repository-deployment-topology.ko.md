# 웹 검색 기록: 저장소/배포 토폴로지

## 질의

- Git submodules documentation deployment checkout --recurse-submodules official
- GitHub Actions checkout submodules official documentation
- Git subtree split official documentation git-subtree
- GitHub release multiple repositories submodules deployment best practices official

## 확인한 출처

- https://git-scm.com/docs/gitsubmodules.html
- https://github.com/actions/checkout
- https://docs.github.com/en/repositories/releasing-projects-on-github/about-releases
- https://docs.github.com/en/get-started/using-git/splitting-a-subfolder-out-into-a-new-repository

## 반영

Submodule은 control repo가 특정 커밋을 고정하는 데 적합하지만, release CI가 모든 submodule을 암묵적으로 checkout한다고 가정하면 배포가 복잡해진다. 따라서 고객용 desktop app은 `platform-desktop-app` 저장소 자체를 release root로 삼고, 루트 workspace는 submodule pointer와 cross-project 기록을 관리하는 control plane으로 낮춘다.

`actions/checkout`는 submodule checkout을 명시 옵션으로 다루므로, 앱 release job은 unrelated submodule checkout을 요구하지 않는 구조가 맞다. 히스토리 기록은 프로젝트별 repo-local 기록을 우선하고, cross-project 기록은 별도 ledger 후보나 control plane에 남기는 구조로 설계한다.

## 불확실성

새 history ledger 원격 저장소는 private repo로 생성했다. 기존 `_history` 전체 이동은 repository naming과 접근 권한 문제가 아니라 compatibility index, validator update, migration 범위 문제이므로 별도 migration으로 남긴다.
