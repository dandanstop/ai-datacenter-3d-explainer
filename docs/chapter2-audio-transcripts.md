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

### Compare Both

訓練 AI 和推論 AI 都在跑模型，但壓力完全不同。訓練重視吞吐量，目標是用大量 GPU 建立模型能力；推論重視延遲與效率，目標是在使用者等待時快速回應。這就是為什麼 AI 基礎設施不只是 GPU 需求增加，而是算力、記憶體、網路與系統編排一起重組。

### Training AI

訓練 AI 像一座吞吐量工廠。大量資料被送進同步化 GPU 叢集，核心目標是讓昂貴的加速器保持高利用率。瓶頸不只在 GPU，還包括 HBM、互連網路、儲存 checkpoint、電力與冷卻。

### Inference AI

推論 AI 像即時交通系統。它要處理大量使用者請求，每一次路由、記憶體存取、檢索與模型回應，都會影響延遲。推論的競爭重點，是在品質、成本與回應速度之間取得平衡。

## English

### Compare Both

Training AI and inference AI both run models, but they stress infrastructure in very different ways. Training is about throughput: using large GPU clusters to build model capability. Inference is about latency and efficiency: serving users quickly while they wait. That is why AI infrastructure is no longer just a GPU story. It is a system-wide rebuild across compute, memory, networking, and orchestration.

### Training AI

Training AI works like a throughput factory. Massive datasets move through synchronized GPU clusters, and the goal is to keep expensive accelerators highly utilized. The bottleneck is not only GPUs. It also includes HBM, interconnect, checkpoint storage, power, and cooling.

### Inference AI

Inference AI works more like real-time traffic. It handles many user requests, and every routing decision, memory access, retrieval step, and model response can affect latency. The key challenge is balancing quality, cost, and response speed.

## Korean

### Compare Both

훈련 AI와 추론 AI는 모두 모델을 실행하지만, 인프라에 주는 압력은 매우 다릅니다. 훈련은 처리량이 핵심이며, 대규모 GPU 클러스터로 모델 능력을 만듭니다. 추론은 지연시간과 효율이 핵심이며, 사용자가 기다리는 동안 빠르게 응답해야 합니다. 그래서 AI 인프라는 단순한 GPU 수요가 아니라 컴퓨팅, 메모리, 네트워크, 오케스트레이션의 재구성입니다.

### Training AI

훈련 AI는 처리량 공장과 같습니다. 대규모 데이터가 동기화된 GPU 클러스터를 지나가고, 목표는 비싼 가속기를 최대한 바쁘게 유지하는 것입니다. 병목은 GPU만이 아닙니다. HBM, 인터커넥트, 체크포인트 저장소, 전력, 냉각도 함께 중요합니다.

### Inference AI

추론 AI는 실시간 교통 시스템에 가깝습니다. 많은 사용자 요청을 처리해야 하며, 라우팅, 메모리 접근, 검색, 모델 응답의 모든 단계가 지연시간에 영향을 줍니다. 핵심은 품질, 비용, 응답 속도 사이의 균형입니다.

## Japanese

### Compare Both

学習 AI と推論 AI はどちらもモデルを動かしますが、インフラへの負荷は大きく異なります。学習はスループットが重要で、大規模な GPU クラスターでモデル能力を作ります。推論は遅延と効率が重要で、ユーザーが待っている間に素早く応答する必要があります。つまり AI インフラは、GPU だけでなく、計算、メモリ、ネットワーク、オーケストレーション全体の再構成です。

### Training AI

学習 AI はスループット工場のようなものです。大量のデータが同期された GPU クラスターを通り、高価なアクセラレーターを高い利用率で動かすことが目標です。ボトルネックは GPU だけではありません。HBM、相互接続、チェックポイント保存、電力、冷却も重要です。

### Inference AI

推論 AI はリアルタイム交通システムに近いものです。大量のユーザー要求を処理し、ルーティング、メモリアクセス、検索、モデル応答の各ステップが遅延に影響します。重要なのは、品質、コスト、応答速度のバランスです。
