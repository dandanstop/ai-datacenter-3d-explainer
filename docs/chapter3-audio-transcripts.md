# Chapter 3 Audio Briefing Transcripts

## Purpose

These condensed spoken transcripts are designed for Chapter 3 audio briefing segments. They are shorter and more conversational than the on-page insight copy, suitable for future voice generation with ElevenLabs or similar text-to-speech tools.

## Generated Audio Assets

Current Korean ElevenLabs export:

- Voice ID: `uyVNoMrnUku1dZyVEXwD`
- Model: `eleven_multilingual_v2`
- Output format: `mp3_44100_128`
- Runtime cache version: `uy-20260617-r2`
- Generation script: `scripts/generate-chapter3-korean-tts.mjs`
- Output files:
  - `audio/chapter3/ko-overview.mp3`
  - `audio/chapter3/ko-core.mp3`
  - `audio/chapter3/ko-infrastructure.mp3`

Runtime mapping in `app.js`:

- `ko-overview` -> `audio/chapter3/ko-overview.mp3?v=uy-20260617-r2`
- `ko-core` -> `audio/chapter3/ko-core.mp3?v=uy-20260617-r2`
- `ko-infrastructure` -> `audio/chapter3/ko-infrastructure.mp3?v=uy-20260617-r2`

Current Japanese ElevenLabs export:

- Voice ID: `T7yYq3WpB94yAuOXraRi`
- Model: `eleven_multilingual_v2`
- Output format: `mp3_44100_128`
- Runtime cache version: `t7-20260617`
- Generation script: `scripts/generate-chapter2-3-japanese-tts.mjs`
- Output files:
  - `audio/chapter3/ja-overview.mp3`
  - `audio/chapter3/ja-core.mp3`
  - `audio/chapter3/ja-infrastructure.mp3`

Runtime mapping in `app.js`:

- `ja-overview` -> `audio/chapter3/ja-overview.mp3?v=t7-20260617`
- `ja-core` -> `audio/chapter3/ja-core.mp3?v=t7-20260617`
- `ja-infrastructure` -> `audio/chapter3/ja-infrastructure.mp3?v=t7-20260617`

## Chinese

### Agent Overview

Agentic AI 不只是回答問題，而是開始把資料、文件、API 和使用者指令，串成可以執行的工作流。它把模型能力變成自動化、決策、行動與協作。價值鏈角色也因此擴大，從模型平台、企業工具，到雲端與推論平台都會參與其中。

### Agent Core

Agent Core 是代理式 AI 的核心。它先感知外部資訊，再推理使用者意圖，接著規劃任務，最後呼叫工具去執行。真正的關鍵，不只是模型聰不聰明，而是每一步能不能被授權、追蹤、驗證，並安全完成。

### Infrastructure View

在 Agent 背後，是一整套協調基礎設施。CPU 負責控制流程，GPU 負責模型推論，記憶體與檢索系統提供上下文，網路與可觀測性維持穩定。當 Agent 開始多步驟執行，瓶頸會從 GPU 擴展到 CPU、記憶體、儲存、網路與延遲。

## English

### Agent Overview

Agentic AI is not just about answering prompts. It turns data, documents, APIs, and user requests into workflows that can act. The value chain expands from model platforms to enterprise tools, cloud services, and inference infrastructure.

### Agent Core

The agent core turns context into action. It perceives inputs, reasons about intent, plans the task, and calls tools to execute. The key question is not only whether the model is smart, but whether each step can be authorized, tracked, verified, and completed safely.

### Infrastructure View

Behind the agent is a coordination layer. CPUs manage the control flow, GPUs run inference, memory and retrieval provide context, and networks keep the workflow reliable. As agents perform more steps, bottlenecks expand beyond GPUs into CPU orchestration, memory, storage, networking, and latency.

## Korean

### Agent Overview

Agentic AI는 단순히 질문에 답하는 것이 아닙니다. 데이터, 문서, API, 사용자 요청을 실행 가능한 워크플로로 바꿉니다. 그래서 가치사슬은 모델 플랫폼을 넘어 기업 도구, 클라우드 서비스, 추론 인프라까지 확장됩니다.

### Agent Core

Agent Core는 맥락을 행동으로 바꾸는 중심입니다. 입력을 감지하고, 의도를 해석하고, 작업을 계획한 뒤, 도구를 호출해 실행합니다. 중요한 것은 모델의 성능뿐 아니라, 각 단계가 승인되고, 추적되고, 검증되며, 안전하게 완료될 수 있는지입니다.

### Infrastructure View

Agent 뒤에는 조정 인프라가 있습니다. CPU는 흐름을 제어하고, GPU는 추론을 수행하며, 메모리와 검색 시스템은 맥락을 제공합니다. Agent가 여러 단계를 수행할수록 병목은 GPU를 넘어 CPU 조정, 메모리, 저장장치, 네트워크, 지연시간으로 확장됩니다.

## Japanese

### Agent Overview

Agentic AI は、ただ質問に答えるだけではありません。データ、文書、API、ユーザーの依頼を、実行できるワークフローへ変えます。そのため価値チェーンは、モデル基盤から企業ツール、クラウド、推論インフラへ広がります。

### Agent Core

Agent Core は、文脈を行動に変える中核です。入力を受け取り、意図を理解し、作業を計画し、ツールを呼び出して実行します。重要なのはモデルの賢さだけでなく、各ステップを承認、追跡、検証し、安全に完了できるかです。

### Infrastructure View

Agent の背後には、全体を調整するインフラがあります。CPU は制御を担当し、GPU は推論を実行し、メモリと検索システムが文脈を支えます。Agent が多段階で動くほど、ボトルネックは GPU だけでなく、CPU、メモリ、ストレージ、ネットワーク、遅延へ広がります。
