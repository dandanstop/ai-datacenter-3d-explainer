# Chapter 1 Condensed Audio Transcripts

Purpose: concise multilingual spoken transcripts for Chapter 1, designed for future ElevenLabs voice generation.

Tone: editorial, analytical, calm, and suitable for investors, technology analysts, semiconductor professionals, AI infrastructure teams, and senior readers interested in the AI data center supply chain.

Suggested pacing: each segment is written for roughly 20 to 30 seconds at a calm narration speed.

## 01 Power & Grid / 電力與電網

### zh

AI 資料中心的第一個瓶頸，往往不是 GPU，而是電力。一座 AI 園區需要數十到上百 MW，建案就會從 IT 採購，變成電網工程。變壓器、開關設備、UPS、備援電源與併網時程，決定算力能不能真的上線。關鍵觀察是：AI 基礎設施的擴張速度，受限於可取得的電力容量與電網穩定度。

### en

The first bottleneck in an AI data center is often not the GPU. It is power. When an AI campus needs tens or even hundreds of megawatts, the project becomes a grid infrastructure challenge. Transformers, switchgear, UPS systems, backup power, and interconnection timelines decide when compute can actually go online. The key finding: AI infrastructure growth is constrained by available power and grid reliability.

### ko

AI 데이터센터의 첫 번째 병목은 GPU가 아니라 전력인 경우가 많습니다. 하나의 AI 캠퍼스가 수십에서 수백 MW를 요구하면, 프로젝트는 IT 구매가 아니라 전력망 인프라 문제가 됩니다. 변압기, 스위치기어, UPS, 예비 전원, 계통 연결 일정이 실제 컴퓨팅 가동 시점을 결정합니다. 핵심은 AI 인프라 확장 속도가 확보 가능한 전력과 전력망 안정성에 의해 제한된다는 점입니다.

### ja

AI データセンターの最初のボトルネックは、GPU ではなく電力であることが少なくありません。AI キャンパスが数十から数百 MW を必要とすると、案件は IT 調達ではなく電力網インフラの課題になります。変圧器、開閉装置、UPS、バックアップ電源、系統接続の時期が、計算能力を実際に稼働できるかを左右します。重要なのは、AI インフラの成長速度が、利用可能な電力と電力網の安定性に制約されることです。

## 02 Cooling Systems / 冷卻系統

### zh

第二層是冷卻。AI 伺服器讓機櫃功率密度快速提高，傳統風冷開始接近極限。散熱不再只是機房空調，而是從 GPU 晶片、液冷板、CDU、泵浦、冷水主機到冷卻塔的完整路徑。關鍵觀察是：冷卻效率、接頭可靠度、水質與用水壓力，會直接影響 GPU 叢集的可用率與營運成本。

### en

The second layer is cooling. AI servers are pushing rack power density higher, and traditional air cooling is approaching its limits. Thermal management is no longer just room air conditioning. It is a full heat path from the GPU chip to cold plates, CDUs, pumps, chillers, and cooling towers. The key finding: cooling efficiency, connector reliability, water quality, and water availability directly shape cluster uptime and operating cost.

### ko

두 번째 층은 냉각입니다. AI 서버는 랙 전력 밀도를 빠르게 높이고 있으며, 전통적인 공랭 방식은 한계에 가까워지고 있습니다. 열 관리는 더 이상 단순한 전산실 공조가 아닙니다. GPU 칩에서 콜드 플레이트, CDU, 펌프, 칠러, 냉각탑으로 이어지는 전체 열 경로입니다. 핵심은 냉각 효율, 접속부 신뢰성, 수질, 물 사용 압력이 클러스터 가동률과 운영비에 직접 영향을 준다는 점입니다.

### ja

第 2 の層は冷却です。AI サーバーはラックの電力密度を急速に高めており、従来の空冷は限界に近づいています。熱管理は、もはや機械室の空調だけではありません。GPU チップからコールドプレート、CDU、ポンプ、チラー、冷却塔まで続く熱の経路全体です。重要なのは、冷却効率、接続部の信頼性、水質、水利用の制約が、クラスターの稼働率と運用コストを直接左右することです。

## 03 Compute Equipment / 算力設備

### zh

第三層是算力設備，也是資本支出最密集的核心。但這裡不只是一張 GPU。真正的系統包含 GPU、HBM、先進封裝、伺服器主板、電源、散熱、機櫃與整機測試。關鍵觀察是：算力供給是多條供應鏈同時協作的結果。瓶頸可能出現在晶片，也可能出現在記憶體、封裝、良率或整櫃交付。

### en

The third layer is compute equipment, the most capital-intensive part of the AI data center. But this is not just about a GPU. The real system includes GPUs, HBM, advanced packaging, server boards, power, cooling, racks, and system-level testing. The key finding: compute supply depends on several supply chains working together. The bottleneck may sit in chips, memory, packaging, yield, or rack-scale delivery.

### ko

세 번째 층은 컴퓨팅 장비이며, AI 데이터센터에서 가장 자본 집약적인 핵심입니다. 하지만 이것은 GPU 한 장의 문제가 아닙니다. 실제 시스템은 GPU, HBM, 첨단 패키징, 서버 보드, 전원, 냉각, 랙, 그리고 시스템 테스트로 구성됩니다. 핵심은 컴퓨팅 공급이 여러 공급망의 동시 협업 결과라는 점입니다. 병목은 칩, 메모리, 패키징, 수율, 또는 랙 단위 납품에서 발생할 수 있습니다.

### ja

第 3 の層は計算設備であり、AI データセンターの中で最も資本集約的な中核です。しかし、これは GPU だけの話ではありません。実際のシステムには、GPU、HBM、先端パッケージング、サーバーボード、電源、冷却、ラック、システムテストが含まれます。重要なのは、計算能力の供給が複数のサプライチェーンの連携によって成り立つことです。ボトルネックは、チップ、メモリ、パッケージング、歩留まり、またはラック単位の納入に現れます。

## 04 Network Interconnect / 網路互連

### zh

第四層是網路互連。大型 AI 訓練不是把 GPU 堆在一起就好，GPU 之間還需要低延遲、高頻寬的資料交換。交換器、NIC、DPU、光模組、光纖與拓樸設計，都會影響叢集利用率。關鍵觀察是：AI 訓練叢集本質上是網路化的算力系統，延遲與封包效率會變成算力效率的一部分。

### en

The fourth layer is network interconnect. Large AI training is not simply a pile of GPUs. GPUs need low-latency, high-bandwidth data exchange with one another. Switches, NICs, DPUs, optical modules, fiber, and topology all affect cluster utilization. The key finding: an AI training cluster is a networked compute system, where latency and packet efficiency become part of compute efficiency.

### ko

네 번째 층은 네트워크 인터커넥트입니다. 대규모 AI 훈련은 GPU를 많이 쌓는 것만으로 충분하지 않습니다. GPU 사이에는 낮은 지연시간과 높은 대역폭의 데이터 교환이 필요합니다. 스위치, NIC, DPU, 광모듈, 광섬유, 토폴로지가 모두 클러스터 이용률에 영향을 줍니다. 핵심은 AI 훈련 클러스터가 네트워크화된 컴퓨팅 시스템이며, 지연시간과 패킷 효율이 곧 컴퓨팅 효율의 일부가 된다는 점입니다.

### ja

第 4 の層はネットワーク相互接続です。大規模な AI 学習は、GPU を積み上げるだけでは成立しません。GPU 同士には、低遅延で高帯域のデータ交換が必要です。スイッチ、NIC、DPU、光モジュール、光ファイバー、トポロジーの設計が、クラスター利用率に影響します。重要なのは、AI 学習クラスターがネットワーク化された計算システムであり、遅延とパケット効率が計算効率の一部になることです。

## 05 Site & Construction / 土地與建築

### zh

第五層是土地與建築。資料中心不是可以快速複製的軟體，而是多年期的重資產基礎建設。一座 AI 園區能不能落地，取決於土地、電力距離、水資源、環評、法規、施工能力與客戶合約。關鍵觀察是：真正的供給不是土地面積，而是可被批准、可施工、可供電、可冷卻，並能準時交付的容量。

### en

The fifth layer is site and construction. A data center is not software that can be copied instantly. It is multi-year, heavy infrastructure. Whether an AI campus can be built depends on land, power distance, water, permitting, regulation, construction capacity, and customer contracts. The key finding: real supply is not land area. It is approved, buildable, powered, cooled, and deliverable capacity.

### ko

다섯 번째 층은 부지와 건설입니다. 데이터센터는 즉시 복제할 수 있는 소프트웨어가 아니라, 수년에 걸친 중자산 인프라입니다. AI 캠퍼스가 실제로 지어질 수 있는지는 토지, 전력 접근성, 물, 인허가, 규제, 시공 능력, 고객 계약에 달려 있습니다. 핵심은 진짜 공급이 토지 면적이 아니라 승인되고, 지을 수 있고, 전력을 공급받고, 냉각 가능하며, 제때 납품 가능한 용량이라는 점입니다.

### ja

第 5 の層は用地と建設です。データセンターはすぐに複製できるソフトウェアではなく、数年単位の重いインフラです。AI キャンパスを実際に建設できるかは、土地、電力への距離、水資源、許認可、規制、施工能力、顧客契約に左右されます。重要なのは、本当の供給が土地面積ではなく、承認され、建設でき、電力と冷却を確保し、期限内に引き渡せる容量であることです。

## 06 Operations & Platform / 營運與平台

### zh

第六層是營運與平台。基礎設施只有被調度、計費、監控、維護與治理之後，才會變成真正可銷售的算力服務。這一層把 GPU、機房、網路與能源，轉成雲端 GPU、訓練平台與推論服務。關鍵觀察是：當硬體供給增加，差異化會從誰有卡，轉向誰能把卡穩定、合規、高利用率地交付給客戶。

### en

The sixth layer is operations and platform. Infrastructure becomes a sellable compute service only after it can be scheduled, billed, monitored, maintained, and governed. This layer turns GPUs, facilities, networks, and energy into GPU cloud, training platforms, and inference services. The key finding: as hardware supply expands, differentiation shifts from who has GPUs to who can deliver them reliably, compliantly, and at high utilization.

### ko

여섯 번째 층은 운영과 플랫폼입니다. 인프라는 스케줄링, 과금, 모니터링, 유지보수, 거버넌스를 거친 뒤에야 판매 가능한 컴퓨팅 서비스가 됩니다. 이 층은 GPU, 시설, 네트워크, 에너지를 GPU 클라우드, 훈련 플랫폼, 추론 서비스로 전환합니다. 핵심은 하드웨어 공급이 늘어날수록 차별화가 누가 GPU를 보유했는가에서, 누가 안정적이고 규정을 준수하며 높은 이용률로 제공할 수 있는가로 이동한다는 점입니다.

### ja

第 6 の層は運用とプラットフォームです。インフラは、スケジューリング、課金、監視、保守、ガバナンスができて初めて販売可能な計算サービスになります。この層は、GPU、施設、ネットワーク、エネルギーを、GPU クラウド、学習プラットフォーム、推論サービスへ変換します。重要なのは、ハードウェア供給が増えるほど、差別化が GPU を持っているかではなく、安定的に、コンプライアンスを満たし、高い利用率で提供できるかへ移ることです。
