# Chapter 2 Audio Briefing Transcripts

## Purpose

These condensed spoken transcripts are designed for Chapter 2 audio briefing segments. They are shorter and more conversational than the on-page insight copy, suitable for future voice generation with ElevenLabs or similar text-to-speech tools.

## Generated Audio Assets

Current Japanese ElevenLabs export:

- Voice ID: `T7yYq3WpB94yAuOXraRi`
- Model: `eleven_multilingual_v2`
- Output format: `mp3_44100_128`
- Runtime cache version: `t7-20260617`
- Generation script: `scripts/generate-chapter2-3-japanese-tts.mjs`
- Output files:
  - `audio/chapter2/ja-compare.mp3`
  - `audio/chapter2/ja-training.mp3`
  - `audio/chapter2/ja-inference.mp3`

Runtime mapping in `app.js`:

- `ja-compare` -> `audio/chapter2/ja-compare.mp3?v=t7-20260617`
- `ja-training` -> `audio/chapter2/ja-training.mp3?v=t7-20260617`
- `ja-inference` -> `audio/chapter2/ja-inference.mp3?v=t7-20260617`

## Chinese

### Overview

同一套 AI 系統可以同時支援訓練與推理，但硬體配置不會平均分配。訓練重視吞吐量與同步，推理重視延遲、記憶體頻寬與路由效率。GPU 負責最重的運算，CPU 則協調資料與請求，讓整台機器真正運轉。

### Training AI

訓練 AI 像一座吞吐量工廠。大量資料被送進同步化 GPU 叢集，核心目標是讓昂貴的加速器保持高利用率。瓶頸不只在 GPU，還包括 HBM、互連網路、儲存 checkpoint、電力與冷卻。

### Inference AI

推論 AI 像即時交通系統。它要處理大量使用者請求，每一次路由、記憶體存取、檢索與模型回應，都會影響延遲。推論的競爭重點，是在品質、成本與回應速度之間取得平衡。

## English

### Overview

One AI system can support both training and inference, but the hardware mix is rarely split evenly. Training favors synchronized throughput. Inference favors latency, memory bandwidth, and routing efficiency. GPUs handle the heaviest math, while CPUs coordinate data flow and live requests across both modes.

### Training AI

Training AI works like a throughput factory. Massive datasets move through synchronized GPU clusters, and the goal is to keep expensive accelerators highly utilized. The bottleneck is not only GPUs. It also includes HBM, interconnect, checkpoint storage, power, and cooling.

### Inference AI

Inference AI works more like real-time traffic. It handles many user requests, and every routing decision, memory access, retrieval step, and model response can affect latency. The key challenge is balancing quality, cost, and response speed.

## Korean

### Overview

하나의 AI 시스템이 훈련과 추론을 모두 지원할 수 있지만, 하드웨어 비중이 항상 반반인 것은 아닙니다. 훈련은 동기화된 처리량을, 추론은 지연시간과 메모리 대역폭, 라우팅 효율을 더 중시합니다. GPU가 가장 무거운 계산을 수행하고, CPU는 데이터 흐름과 요청을 조정해 두 모드를 함께 움직이게 합니다.

### Training AI

훈련 AI는 처리량 공장과 같습니다. 대규모 데이터가 동기화된 GPU 클러스터를 지나가고, 목표는 비싼 가속기를 최대한 바쁘게 유지하는 것입니다. 병목은 GPU만이 아닙니다. HBM, 인터커넥트, 체크포인트 저장소, 전력, 냉각도 함께 중요합니다.

### Inference AI

추론 AI는 실시간 교통 시스템에 가깝습니다. 많은 사용자 요청을 처리해야 하며, 라우팅, 메모리 접근, 검색, 모델 응답의 모든 단계가 지연시간에 영향을 줍니다. 핵심은 품질, 비용, 응답 속도 사이의 균형입니다.

## Japanese

### Overview

同じ AI システムが学習と推論の両方を支えられますが、ハードウェア配分が常に半々になるわけではありません。学習は同期スループットを、推論は遅延、メモリ帯域、ルーティング効率をより重視します。GPU が最も重い計算を担い、CPU はデータフローと要求処理を調整して 2 つのモードを支えます。

### Training AI

学習 AI はスループット工場のようなものです。大量のデータが同期された GPU クラスターを通り、高価なアクセラレーターを高い利用率で動かすことが目標です。ボトルネックは GPU だけではありません。HBM、相互接続、チェックポイント保存、電力、冷却も重要です。

### Inference AI

推論 AI はリアルタイム交通システムに近いものです。大量のユーザー要求を処理し、ルーティング、メモリアクセス、検索、モデル応答の各ステップが遅延に影響します。重要なのは、品質、コスト、応答速度のバランスです。
