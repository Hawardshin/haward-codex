# Operations Maps

이 폴더는 저장소 탐색 시간을 줄이기 위한 맵을 보관한다.

## Files

- `repository-map.md`: 현재 주요 폴더와 파일 위치
- `prompt-map.md`: 사용 가능한 운영 프롬프트와 워크플로

## Update Command

From the repository root:

```bash
python3 _tools/workspace-index/src/workspace_index.py
```

Use `--check` to verify generated maps are current without writing:

```bash
python3 _tools/workspace-index/src/workspace_index.py --check
```
