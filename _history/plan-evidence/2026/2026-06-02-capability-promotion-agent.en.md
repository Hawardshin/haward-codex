# Plan Evidence: Capability Promotion Agent

| Plan Step | Evidence |
| --- | --- |
| Name the agent `capability-promotion-agent` | "Black box" describes the user experience, but the system must stay auditable; capability promotion is the more maintainable role name. |
| Place the registry under `configs/orchestration/` | Capability promotion crosses agents, prompts, workflows, tools, skills, and project features, so it is an orchestration contract. |
| Check the smallest asset first | This matches existing capability governance and Anthropic's simple-workflow-first guidance. |
| Route high-risk changes to human checkpoints | This matches NIST AI RMF framing and the existing human decision inbox/human arbitration structure. |
| Add a warm memory anchor | Future sessions must not forget this durable rule. |
