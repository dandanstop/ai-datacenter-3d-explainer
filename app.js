import * as THREE from "three";
import { OrbitControls } from "./vendor/OrbitControls.js";

const layers = [
  {
    id: "power",
    name: "電力與電網",
    role: "Utility、變電站、UPS、PDU",
    signal: "電力可得性與併網時程，是大型 AI 資料中心擴張的第一瓶頸。",
    lede:
      "AI 叢集把資料中心從 IT 專案推向電力專案。從高壓併網、變壓器、開關設備到備援電源，決定園區能否準時上線。",
    suppliers: [
      "電力與電網設備：Schneider Electric (SU.PA)、Eaton (ETN)、ABB (ABBN.SW/ABB)、Siemens Energy (ENR.DE)",
      "備援電源與熱管理基礎設施：Vertiv (VRT)、Caterpillar (CAT)、Cummins (CMI)、GE Vernova (GEV)",
      "電力工程與併網施工：Quanta Services (PWR)、AECOM (ACM)、Jacobs (J)、Fluor (FLR)",
      "能源與公用事業夥伴：NextEra Energy (NEE)、Duke Energy (DUK)、Constellation Energy (CEG)"
    ],
    metrics: [
      ["30-150MW", "單一 AI 園區常見電力級距"],
      ["N+1", "關鍵電力設備備援架構"],
      ["18-36M", "大型併網與設備交期風險"],
      ["PUE", "能源效率與營運成本核心指標"]
    ],
    risk: "AI 資料中心的需求從 GPU 採購延伸到電力供給，常見瓶頸是變壓器、開關設備、併網審批與長期電價合約。教育性觀察：資料中心真正的可交付容量通常不是土地面積，而是可取得的 MW、電網穩定度、備援設計與用電成本；因此電力設備商、EPC 與公用事業會成為 AI 基礎建設週期的重要受益環節。",
    color: 0xffc34d
  },
  {
    id: "cooling",
    name: "冷卻系統",
    role: "Chiller、CDU、液冷板、冷卻塔",
    signal: "GPU 熱密度上升，推動冷板、CDU、泵浦與冷卻塔升級。",
    lede:
      "AI 伺服器讓機櫃功率密度快速提高，風冷逐步走向混合冷卻與液冷。冷卻架構影響可靠度、用水、能耗與機房布局。",
    suppliers: [
      "資料中心熱管理：Vertiv (VRT)、Schneider Electric (SU.PA)、Johnson Controls (JCI)、Trane Technologies (TT)",
      "冷水機、熱交換與 HVAC：Carrier Global (CARR)、Modine (MOD)、nVent Electric (NVT)、Daikin (6367.T)",
      "液冷與電源整合零組件：Delta Electronics (2308.TW)、CoolIT Systems (private)、Asetek (ASTK.CO)",
      "泵浦、閥件與水處理：Xylem (XYL)、Pentair (PNR)、Watts Water (WTS)"
    ],
    metrics: [
      ["40-120kW", "AI 機櫃功率密度區間"],
      ["Liquid", "高階 GPU 叢集主要升級方向"],
      ["WUE", "水資源壓力評估指標"],
      ["Delta T", "冷卻迴路效率關鍵變數"]
    ],
    risk: "AI 機櫃功率密度提高後，風冷會面臨氣流、噪音與能耗限制，液冷、CDU、冷板、快接頭與水處理的重要性上升。教育性觀察：冷卻不是單一零件，而是從晶片熱源、伺服器內部液冷板、機櫃歧管、CDU、冷水主機到冷卻塔的完整熱路徑；任何接頭漏液、泵浦故障或水質問題都可能影響叢集可用率。",
    color: 0x22b8ff
  },
  {
    id: "compute",
    name: "算力設備",
    role: "GPU、HBM、先進封裝、AI Server",
    signal: "GPU 供給、先進封裝與整機交付決定建置節奏。",
    lede:
      "算力層包含 GPU、HBM、CoWoS/先進封裝、伺服器主板、電源、機櫃與整機組裝，是資本支出最密集的核心。",
    suppliers: [
      "AI 加速器與平台：NVIDIA (NVDA)、AMD (AMD)、Broadcom (AVGO)、Marvell (MRVL)",
      "晶圓代工、設備與先進封裝：TSMC (TSM/2330.TW)、ASML (ASML)、Applied Materials (AMAT)、Lam Research (LRCX)",
      "HBM 與記憶體：SK hynix (000660.KS)、Micron (MU)、Samsung Electronics (005930.KS)",
      "AI Server/ODM 與整機：Super Micro Computer (SMCI)、Dell (DELL)、HPE (HPE)、Quanta (2382.TW)、Wiwynn (6669.TW)、Foxconn (2317.TW)"
    ],
    metrics: [
      ["60-75%", "AI 資料中心 CapEx 常由 IT 設備主導"],
      ["HBM", "GPU 供給的高敏感零組件"],
      ["Rack-scale", "新一代整櫃交付模式"],
      ["Yield", "封裝良率牽動出貨節奏"]
    ],
    risk: "算力層是 AI 資料中心 CapEx 的核心，但瓶頸不只在 GPU。教育性觀察：一台 AI 伺服器同時依賴 GPU、HBM、先進封裝、PCB、電源、散熱、機櫃與整機測試；只看 GPU 訂單容易忽略 HBM 供給、CoWoS/先進封裝產能、伺服器良率與 rack-scale 交付節奏。真正的產業鏈分析要把晶片、封裝、記憶體與 ODM 同時串起來看。",
    color: 0x19d3ff
  },
  {
    id: "network",
    name: "網路互連",
    role: "Switch、NIC、光模組、光纖",
    signal: "訓練叢集的瓶頸常出現在東西向流量與光互連。",
    lede:
      "大模型訓練需要低延遲、高頻寬的 GPU-to-GPU 互連。交換器、NIC、光模組與布線拓樸直接影響叢集利用率。",
    suppliers: [
      "資料中心交換器與網通系統：Arista Networks (ANET)、Cisco (CSCO)、NVIDIA Networking (NVDA)",
      "網路晶片、DPU/NIC：Broadcom (AVGO)、Marvell (MRVL)、Intel (INTC)、NVIDIA (NVDA)",
      "光模組與光通訊：Coherent (COHR)、Lumentum (LITE)、Fabrinet (FN)、Innolight (300308.SZ)",
      "連接器、線纜與高速介面：Amphenol (APH)、TE Connectivity (TEL)、Molex (Koch private)"
    ],
    metrics: [
      ["400G/800G", "AI 叢集主流高速互連"],
      ["East-West", "GPU 叢集主要流量型態"],
      ["Latency", "訓練效率敏感指標"],
      ["Topology", "Clos/Fat-tree 影響擴充性"]
    ],
    risk: "大模型訓練不是把 GPU 堆在一起就好，GPU 之間需要大量東西向流量。教育性觀察：當叢集從數千顆 GPU 擴到數萬顆 GPU，交換器 radix、光模組速率、拓樸設計、NIC/DPU 與 congestion control 會決定有效利用率；同樣 GPU 數量下，網路延遲與封包丟失可能讓訓練效率差很多。",
    color: 0x76ff7a
  },
  {
    id: "site",
    name: "土地與建築",
    role: "土地、水權、機房、EPC",
    signal: "可建地、水資源、電力距離與施工能力共同決定供給速度。",
    lede:
      "資料中心是重資產基礎建設。土地取得、土建、機電工程、消防、安控與法規審批，會把 AI 需求轉換成多年期工程管線。",
    suppliers: [
      "資料中心 REITs 與開發商：Equinix (EQIX)、Digital Realty (DLR)、GDS Holdings (GDS/9698.HK)、NEXTDC (NXT.AX)",
      "主權雲/區域型營運商：Keppel DC REIT (AJBU.SI)、NTT Data (9613.T)、KDDI (9433.T)",
      "土建、機電與 EPC：Quanta Services (PWR)、AECOM (ACM)、Jacobs (J)、Fluor (FLR)",
      "私有大型平台：Vantage Data Centers、QTS、CyrusOne、DataBank"
    ],
    metrics: [
      ["24-48M", "大型園區從規劃到上線的常見週期"],
      ["MW/acre", "土地使用效率與密度衡量"],
      ["Permits", "審批是隱形交付瓶頸"],
      ["Tier", "可靠度與冗餘設計標準"]
    ],
    risk: "資料中心供給不是即時商品，而是多年期基礎建設專案。教育性觀察：一個園區能不能上線，取決於土地、電力、水資源、環評、稅務誘因、施工人力、消防安規與客戶預租合約。相同的 AI 需求，在不同區域會因併網速度與地方政策而產生完全不同的供給曲線。",
    color: 0xc6cbd2
  },
  {
    id: "ops",
    name: "營運與平台",
    role: "Cloud、Colo、MLOps、監控資安",
    signal: "真正的商品不是機房，而是可被調度、計費、監控的算力服務。",
    lede:
      "營運層把基礎設施轉成雲端 GPU、訓練平台、推論服務與託管方案。資安、調度、維修與 SLA 影響客戶黏著度。",
    suppliers: [
      "Hyperscaler 與雲端平台：Amazon (AMZN)、Microsoft (MSFT)、Alphabet (GOOGL)、Oracle (ORCL)、Meta (META)",
      "GPU Cloud 與 AI 基礎設施：CoreWeave (CRWV)、Nebius (NBIS)、Lambda (private)、Crusoe (private)",
      "資料、MLOps 與可觀測性：Snowflake (SNOW)、Datadog (DDOG)、ServiceNow (NOW)、Cloudflare (NET)、Databricks (private)",
      "資安與合規：Palo Alto Networks (PANW)、CrowdStrike (CRWD)、Zscaler (ZS)、Okta (OKTA)"
    ],
    metrics: [
      ["SLA", "企業客戶採購核心條款"],
      ["Utilization", "算力租賃毛利關鍵"],
      ["Inference", "需求逐步從訓練擴展至推論"],
      ["Security", "主權資料與合規需求"]
    ],
    risk: "營運平台把硬體轉換成可被客戶使用、計費與治理的算力服務。教育性觀察：長期競爭力不只來自擁有 GPU，而是來自利用率、排程效率、模型工具鏈、資料安全、SLA、客戶合約年限與能源成本管理。當硬體供給變多，差異化會從『誰有卡』逐步轉向『誰能把卡穩定、高利用率、合規地賣給客戶』。",
    color: 0xff6b9a
  }
];

const uiText = {
  zh: {
    htmlLang: "zh-Hant",
    pageTitle: "從 GPU 到電網：AI 算力競賽進入基礎設施時代",
    introText: "從電力、冷卻、GPU 伺服器、網路到營運服務，點選任一層級查看價值鏈角色與投資觀察。",
    languageLabel: "語言",
    reset: "Reset",
    resetTitle: "重置視角",
    explodeLabel: "拆解程度",
    fileWarningTitle: "正在切換到本機 HTTP server",
    fileWarningText: "直接開啟 index.html 時瀏覽器會封鎖 3D 模組。若沒有自動跳轉，請開啟 http://127.0.0.1:8124/。",
    hintDrag: "拖曳旋轉",
    hintZoom: "滾輪縮放",
    hintClick: "點選聚焦",
    insightRevealPrompt: "與 3D 模型互動後，將顯示此層級的產業洞察。",
    insightTitle: "洞察",
    supplierHeading: "價值鏈角色",
    riskHeading: "關鍵觀察",
    layerListLabel: "產業鏈層級",
    audioLabel: "語音導覽",
    play: "播放",
    pause: "暫停",
    transcript: "逐字稿",
    readFullAnalysis: "閱讀完整分析",
    fullAnalysis: "完整分析",
    closeAnalysis: "關閉",
    aboutLink: "關於作者",
    aboutEyebrow: "關於",
    aboutTitle: "策展與製作：\nDanDanStop",
    aboutDescription: "Hi - DanDanStop 基本上是我給自己的提醒：「DanDan，在又因為研究新科技熬成通宵之前，先停一下。」",
    aboutBuilder: "這裡是我的個人科技實驗室與靈感基地，核心心態很簡單：快速行動、保持好奇、持續迭代。",
    aboutFocus: "我通常會親自動手測試最新 AI 工具、MarTech 想法，還有一些只是因為好玩而做的小實驗。",
    aboutAudience: "如果這裡的內容激發了你的想法，歡迎聊聊。我一直很樂意交流創新、創意科技，以及下一個值得打造的東西。",
    aboutUpdated: "最後更新：2026 年 6 月",
    aboutContact: "Contact"
  },
  en: {
    htmlLang: "en",
    pageTitle: "From GPUs to the Grid: The AI Compute Race Enters Its Infrastructure Era",
    introText: "Explore power, cooling, GPU servers, networking, sites, and operations through an interactive 3D value-chain model.",
    languageLabel: "Language",
    reset: "Reset",
    resetTitle: "Reset view",
    explodeLabel: "Exploded view",
    fileWarningTitle: "Switching to the local HTTP server",
    fileWarningText: "Opening index.html directly blocks the 3D module. If the redirect does not happen, open http://127.0.0.1:8124/.",
    hintDrag: "Drag to rotate",
    hintZoom: "Wheel to zoom",
    hintClick: "Click to focus",
    insightRevealPrompt: "Interact with the 3D model to reveal this layer's insight.",
    insightTitle: "Insight",
    supplierHeading: "Value-chain roles",
    riskHeading: "Key finding",
    layerListLabel: "Value-chain layers",
    audioLabel: "Audio briefing",
    play: "Play",
    pause: "Pause",
    transcript: "Transcript",
    readFullAnalysis: "Read full analysis",
    fullAnalysis: "Full analysis",
    closeAnalysis: "Close",
    aboutLink: "About",
    aboutEyebrow: "About",
    aboutTitle: "Curated by\nDanDanStop",
    aboutDescription: "Hi - DanDanStop is basically a note-to-self: \"DanDan, stop before this turns into another all-nighter geeking out over new tech.\"",
    aboutBuilder: "This is my personal tech lab and inspiration hub, built around a simple mindset: move fast, stay curious, and keep iterating.",
    aboutFocus: "I’m usually hands-on, testing the latest AI tools, MarTech ideas, and little experiments just for fun.",
    aboutAudience: "If something here sparks an idea, let’s talk. I’m always happy to swap thoughts on innovation, creative technology, and what might be worth building next.",
    aboutUpdated: "Last updated: June 2026",
    aboutContact: "Contact"
  },
  ko: {
    htmlLang: "ko",
    pageTitle: "GPU에서 전력망까지: AI 컴퓨팅 경쟁은 인프라 시대로 진입했다",
    introText: "전력, 냉각, GPU 서버, 네트워크, 부지, 운영 플랫폼을 인터랙티브 3D 밸류체인 모델로 살펴보세요.",
    languageLabel: "언어",
    reset: "초기화",
    resetTitle: "시점 초기화",
    explodeLabel: "분해 정도",
    fileWarningTitle: "로컬 HTTP 서버로 이동 중",
    fileWarningText: "index.html을 직접 열면 브라우저가 3D 모듈을 차단합니다. 자동 이동이 되지 않으면 http://127.0.0.1:8124/ 을 여세요.",
    hintDrag: "드래그 회전",
    hintZoom: "휠 확대",
    hintClick: "클릭 포커스",
    insightRevealPrompt: "3D 모델과 상호작용하면 이 레이어의 인사이트가 표시됩니다.",
    insightTitle: "인사이트",
    supplierHeading: "밸류체인 역할",
    riskHeading: "산업 배경",
    layerListLabel: "밸류체인 레이어",
    audioLabel: "오디오 브리핑",
    play: "재생",
    pause: "일시정지",
    transcript: "스크립트",
    readFullAnalysis: "전체 분석 읽기",
    fullAnalysis: "전체 분석",
    closeAnalysis: "닫기",
    aboutLink: "소개",
    aboutEyebrow: "소개",
    aboutTitle: "기획 및 제작:\nDanDanStop",
    aboutDescription: "Hi - DanDanStop은 사실 저 자신에게 보내는 메모입니다. \"DanDan, 새 기술에 빠져 또 밤새우기 전에 멈추자.\"",
    aboutBuilder: "이곳은 제 개인 테크 랩이자 영감의 허브입니다. 빠르게 움직이고, 호기심을 유지하며, 계속 반복한다는 단순한 마음가짐으로 운영합니다.",
    aboutFocus: "저는 보통 직접 손을 움직여 최신 AI 도구, MarTech 아이디어, 그리고 재미로 해보는 작은 실험들을 테스트합니다.",
    aboutAudience: "이곳의 어떤 내용이 아이디어를 떠올리게 했다면 함께 이야기해요. 혁신, 크리에이티브 테크놀로지, 그리고 다음에 만들어볼 만한 것에 대해 생각을 나누는 일을 늘 환영합니다.",
    aboutUpdated: "마지막 업데이트: 2026년 6월",
    aboutContact: "Contact"
  },
  ja: {
    htmlLang: "ja",
    pageTitle: "GPU から電力網へ：AI コンピュート競争はインフラの時代へ",
    introText: "電力、冷却、GPU サーバー、ネットワーク、用地、運用基盤を、インタラクティブな 3D バリューチェーンモデルで確認できます。",
    languageLabel: "言語",
    reset: "リセット",
    resetTitle: "視点をリセット",
    explodeLabel: "分解度",
    fileWarningTitle: "ローカル HTTP サーバーへ切り替えています",
    fileWarningText: "index.html を直接開くとブラウザが 3D モジュールをブロックします。自動で移動しない場合は http://127.0.0.1:8124/ を開いてください。",
    hintDrag: "ドラッグで回転",
    hintZoom: "ホイールでズーム",
    hintClick: "クリックでフォーカス",
    insightRevealPrompt: "3D モデルを操作すると、この層のインサイトが表示されます。",
    insightTitle: "インサイト",
    supplierHeading: "バリューチェーンの役割",
    riskHeading: "産業背景",
    layerListLabel: "バリューチェーン層",
    audioLabel: "音声ブリーフィング",
    play: "再生",
    pause: "一時停止",
    transcript: "文字起こし",
    readFullAnalysis: "詳しい分析を読む",
    fullAnalysis: "詳しい分析",
    closeAnalysis: "閉じる",
    aboutLink: "このサイトについて",
    aboutEyebrow: "概要",
    aboutTitle: "企画・制作：\nDanDanStop",
    aboutDescription: "Hi - DanDanStop は、基本的には自分へのメモです。「DanDan、新しいテクノロジーに夢中になって、また徹夜になる前に止まろう。」",
    aboutBuilder: "ここは私の個人的なテックラボであり、インスピレーションのハブです。素早く動き、好奇心を持ち続け、改善を重ねるというシンプルな姿勢でつくっています。",
    aboutFocus: "私は普段、最新の AI ツール、MarTech のアイデア、そして純粋に楽しい小さな実験を、実際に手を動かして試しています。",
    aboutAudience: "ここにある何かがアイデアのきっかけになったなら、ぜひ話しましょう。イノベーション、クリエイティブテクノロジー、そして次に何をつくる価値があるのかについて、考えを交換するのはいつでも歓迎です。",
    aboutUpdated: "最終更新：2026年6月",
    aboutContact: "Contact"
  }
};

const layerTranslations = {
  en: {
    power: {
      name: "Power & Grid",
      role: "Utilities, substations, UPS, PDU",
      signal: "Power availability and grid interconnection timelines are the first bottlenecks for large AI campuses.",
      lede: "AI clusters turn data centers into power infrastructure projects. Grid access, transformers, switchgear, and backup power determine whether a campus can go live on time.",
      suppliers: [
        "Grid and electrical equipment: Schneider Electric (SU.PA), Eaton (ETN), ABB (ABBN.SW/ABB), Siemens Energy (ENR.DE)",
        "Backup power and critical infrastructure: Vertiv (VRT), Caterpillar (CAT), Cummins (CMI), GE Vernova (GEV)",
        "Power EPC and interconnection: Quanta Services (PWR), AECOM (ACM), Jacobs (J), Fluor (FLR)",
        "Energy and utility partners: NextEra Energy (NEE), Duke Energy (DUK), Constellation Energy (CEG)"
      ],
      metrics: [["30-150MW", "Common power range for one AI campus"], ["N+1", "Redundancy design for critical power"], ["18-36M", "Grid and equipment lead-time risk"], ["PUE", "Core energy-efficiency metric"]],
      risk: "AI demand increasingly depends on power delivery, not only GPU procurement. The key constraints are transformers, switchgear, grid approvals, and long-term power contracts. A practical way to read this layer is to ask how many megawatts can actually be delivered, at what reliability level, and at what cost."
    },
    cooling: {
      name: "Cooling Systems",
      role: "Chillers, CDU, cold plates, cooling towers",
      signal: "Rising GPU heat density pushes upgrades in cold plates, CDU, pumps, and cooling towers.",
      lede: "AI rack density is moving facilities from air cooling toward hybrid and liquid cooling. The cooling architecture affects uptime, water use, energy cost, and room layout.",
      suppliers: [
        "Data center thermal management: Vertiv (VRT), Schneider Electric (SU.PA), Johnson Controls (JCI), Trane Technologies (TT)",
        "Chillers, HVAC, and heat exchange: Carrier Global (CARR), Modine (MOD), nVent Electric (NVT), Daikin (6367.T)",
        "Liquid cooling components: Delta Electronics (2308.TW), CoolIT Systems (private), Asetek (ASTK.CO)",
        "Pumps, valves, and water treatment: Xylem (XYL), Pentair (PNR), Watts Water (WTS)"
      ],
      metrics: [["40-120kW", "AI rack power-density range"], ["Liquid", "Preferred path for high-end GPU clusters"], ["WUE", "Water-usage effectiveness"], ["Delta T", "Efficiency variable for cooling loops"]],
      risk: "Cooling is a full thermal path: chip heat source, cold plate, rack manifold, CDU, chiller, and cooling tower. Any failure in quick connectors, pumps, or water quality can reduce cluster availability, so reliability engineering matters as much as capacity."
    },
    compute: {
      name: "Compute Equipment",
      role: "GPU, HBM, advanced packaging, AI server",
      signal: "GPU supply, advanced packaging, and rack-scale server delivery set the buildout pace.",
      lede: "The compute layer includes GPUs, HBM, advanced packaging, motherboards, power supplies, racks, and system integration. It is usually the most capital-intensive layer.",
      suppliers: [
        "AI accelerators and platforms: NVIDIA (NVDA), AMD (AMD), Broadcom (AVGO), Marvell (MRVL)",
        "Foundry, equipment, and advanced packaging: TSMC (TSM/2330.TW), ASML (ASML), Applied Materials (AMAT), Lam Research (LRCX)",
        "HBM and memory: SK hynix (000660.KS), Micron (MU), Samsung Electronics (005930.KS)",
        "AI server/ODM and systems: Super Micro Computer (SMCI), Dell (DELL), HPE (HPE), Quanta (2382.TW), Wiwynn (6669.TW), Foxconn (2317.TW)"
      ],
      metrics: [["60-75%", "AI data center CapEx is often led by IT equipment"], ["HBM", "High-sensitivity GPU bottleneck"], ["Rack-scale", "Next-generation delivery model"], ["Yield", "Packaging yield affects shipment timing"]],
      risk: "Compute bottlenecks are not limited to GPUs. A server also depends on HBM, advanced packaging, PCB, power, thermal design, rack integration, and testing. Strong analysis connects silicon, memory, packaging, and ODM delivery rather than reading GPU orders alone."
    },
    network: {
      name: "Network Interconnect",
      role: "Switches, NIC, optical modules, fiber",
      signal: "Training-cluster bottlenecks often emerge in east-west traffic and optical interconnects.",
      lede: "Large model training requires low-latency, high-bandwidth GPU-to-GPU interconnect. Switches, NICs, optics, and topology directly affect cluster utilization.",
      suppliers: [
        "Data center switches and systems: Arista Networks (ANET), Cisco (CSCO), NVIDIA Networking (NVDA)",
        "Network silicon, DPU/NIC: Broadcom (AVGO), Marvell (MRVL), Intel (INTC), NVIDIA (NVDA)",
        "Optical modules and photonics: Coherent (COHR), Lumentum (LITE), Fabrinet (FN), Innolight (300308.SZ)",
        "Connectors, cables, and high-speed interfaces: Amphenol (APH), TE Connectivity (TEL), Molex (Koch private)"
      ],
      metrics: [["400G/800G", "Mainstream high-speed AI interconnect"], ["East-West", "Dominant traffic pattern in GPU clusters"], ["Latency", "Sensitive driver of training efficiency"], ["Topology", "Clos/Fat-tree affects scalability"]],
      risk: "Large training clusters are networked systems, not just piles of GPUs. As clusters scale, switch radix, optics speed, topology, NIC/DPU design, and congestion control can explain why two sites with similar GPU counts deliver very different effective throughput."
    },
    site: {
      name: "Site & Construction",
      role: "Land, water rights, facility, EPC",
      signal: "Buildable land, water, power distance, and construction capacity determine supply speed.",
      lede: "Data centers are heavy infrastructure. Land, civil works, electrical/mechanical systems, fire safety, security, and permits convert AI demand into multi-year construction pipelines.",
      suppliers: [
        "Data center REITs and developers: Equinix (EQIX), Digital Realty (DLR), GDS Holdings (GDS/9698.HK), NEXTDC (NXT.AX)",
        "Regional and sovereign-cloud operators: Keppel DC REIT (AJBU.SI), NTT Data (9613.T), KDDI (9433.T)",
        "Civil, electrical, mechanical EPC: Quanta Services (PWR), AECOM (ACM), Jacobs (J), Fluor (FLR)",
        "Private large-scale platforms: Vantage Data Centers, QTS, CyrusOne, DataBank"
      ],
      metrics: [["24-48M", "Typical cycle from planning to go-live"], ["MW/acre", "Land-use density indicator"], ["Permits", "Hidden delivery bottleneck"], ["Tier", "Reliability and redundancy standard"]],
      risk: "Data center supply is not instant capacity; it is a multi-year infrastructure pipeline. Land, grid access, water, environmental review, tax incentives, labor, fire codes, and pre-lease contracts all determine when capacity becomes real."
    },
    ops: {
      name: "Operations & Platform",
      role: "Cloud, colocation, MLOps, monitoring, security",
      signal: "The real product is dispatchable, billable, monitored compute service, not the building itself.",
      lede: "The operations layer converts infrastructure into GPU cloud, training platforms, inference services, and managed solutions. Security, scheduling, maintenance, and SLA shape customer stickiness.",
      suppliers: [
        "Hyperscalers and cloud platforms: Amazon (AMZN), Microsoft (MSFT), Alphabet (GOOGL), Oracle (ORCL), Meta (META)",
        "GPU cloud and AI infrastructure: CoreWeave (CRWV), Nebius (NBIS), Lambda (private), Crusoe (private)",
        "Data, MLOps, and observability: Snowflake (SNOW), Datadog (DDOG), ServiceNow (NOW), Cloudflare (NET), Databricks (private)",
        "Security and compliance: Palo Alto Networks (PANW), CrowdStrike (CRWD), Zscaler (ZS), Okta (OKTA)"
      ],
      metrics: [["SLA", "Core enterprise contract term"], ["Utilization", "Key driver of GPU rental margin"], ["Inference", "Demand expands from training to inference"], ["Security", "Sovereign data and compliance need"]],
      risk: "Operations turn hardware into governed, billable compute. Long-term advantage comes from utilization, scheduling efficiency, model tooling, data security, SLA quality, contract duration, and energy-cost management."
    }
  },
  ko: {
    power: { name: "전력 및 전력망", role: "전력회사, 변전소, UPS, PDU", signal: "전력 확보와 계통 접속 일정은 대형 AI 데이터센터의 첫 번째 병목입니다.", lede: "AI 클러스터는 데이터센터를 IT 프로젝트가 아니라 전력 인프라 프로젝트로 바꿉니다.", suppliers: ["전력망 장비: Schneider Electric (SU.PA), Eaton (ETN), ABB (ABBN.SW/ABB), Siemens Energy (ENR.DE)", "백업 전원과 핵심 인프라: Vertiv (VRT), Caterpillar (CAT), Cummins (CMI), GE Vernova (GEV)", "전력 EPC와 계통 접속: Quanta Services (PWR), AECOM (ACM), Jacobs (J), Fluor (FLR)", "에너지 및 유틸리티 파트너: NextEra Energy (NEE), Duke Energy (DUK), Constellation Energy (CEG)"], metrics: [["30-150MW", "단일 AI 캠퍼스의 일반 전력 범위"], ["N+1", "핵심 전력 이중화 구조"], ["18-36M", "계통 및 장비 리드타임 리스크"], ["PUE", "에너지 효율 핵심 지표"]], risk: "AI 수요는 GPU 조달뿐 아니라 실제 전력 공급 능력에 좌우됩니다. 변압기, 스위치기어, 계통 승인, 장기 전력계약을 함께 봐야 실제 가동 가능 용량을 이해할 수 있습니다." },
    cooling: { name: "냉각 시스템", role: "칠러, CDU, 콜드플레이트, 냉각탑", signal: "GPU 열밀도 상승은 콜드플레이트, CDU, 펌프, 냉각탑 업그레이드를 촉진합니다.", lede: "AI 랙 밀도가 높아지며 공랭에서 하이브리드 및 액체냉각으로 이동하고 있습니다.", suppliers: ["데이터센터 열관리: Vertiv (VRT), Schneider Electric (SU.PA), Johnson Controls (JCI), Trane Technologies (TT)", "칠러/HVAC/열교환: Carrier Global (CARR), Modine (MOD), nVent Electric (NVT), Daikin (6367.T)", "액체냉각 부품: Delta Electronics (2308.TW), CoolIT Systems (private), Asetek (ASTK.CO)", "펌프/밸브/수처리: Xylem (XYL), Pentair (PNR), Watts Water (WTS)"], metrics: [["40-120kW", "AI 랙 전력밀도 범위"], ["Liquid", "고성능 GPU 클러스터 방향"], ["WUE", "물 사용 효율"], ["Delta T", "냉각 루프 효율 변수"]], risk: "냉각은 칩, 콜드플레이트, 랙 매니폴드, CDU, 칠러, 냉각탑으로 이어지는 열 경로입니다. 커넥터 누수, 펌프 고장, 수질 문제는 클러스터 가용률에 직접 영향을 줄 수 있습니다." },
    compute: { name: "컴퓨팅 장비", role: "GPU, HBM, 첨단 패키징, AI 서버", signal: "GPU 공급, 첨단 패키징, 랙 단위 서버 납품이 구축 속도를 결정합니다.", lede: "컴퓨팅 계층은 GPU, HBM, 패키징, 서버 보드, 전원, 랙, 시스템 통합으로 구성됩니다.", suppliers: ["AI 가속기와 플랫폼: NVIDIA (NVDA), AMD (AMD), Broadcom (AVGO), Marvell (MRVL)", "파운드리/장비/첨단 패키징: TSMC (TSM/2330.TW), ASML (ASML), Applied Materials (AMAT), Lam Research (LRCX)", "HBM 및 메모리: SK hynix (000660.KS), Micron (MU), Samsung Electronics (005930.KS)", "AI 서버/ODM: Super Micro Computer (SMCI), Dell (DELL), HPE (HPE), Quanta (2382.TW), Wiwynn (6669.TW), Foxconn (2317.TW)"], metrics: [["60-75%", "AI 데이터센터 CapEx는 IT 장비가 주도"], ["HBM", "GPU 공급의 민감 병목"], ["Rack-scale", "차세대 납품 방식"], ["Yield", "패키징 수율이 출하를 좌우"]], risk: "컴퓨팅 병목은 GPU에만 있지 않습니다. HBM, 첨단 패키징, PCB, 전원, 냉각, 랙 통합, 테스트를 함께 봐야 실제 납품 속도를 이해할 수 있습니다." },
    network: { name: "네트워크 인터커넥트", role: "스위치, NIC, 광모듈, 광섬유", signal: "훈련 클러스터 병목은 동서 트래픽과 광 인터커넥트에서 자주 발생합니다.", lede: "대형 모델 훈련은 저지연·고대역폭 GPU 간 연결이 필요합니다.", suppliers: ["데이터센터 스위치: Arista Networks (ANET), Cisco (CSCO), NVIDIA Networking (NVDA)", "네트워크 칩/DPU/NIC: Broadcom (AVGO), Marvell (MRVL), Intel (INTC), NVIDIA (NVDA)", "광모듈 및 포토닉스: Coherent (COHR), Lumentum (LITE), Fabrinet (FN), Innolight (300308.SZ)", "커넥터/케이블/고속 인터페이스: Amphenol (APH), TE Connectivity (TEL), Molex (Koch private)"], metrics: [["400G/800G", "AI 고속 인터커넥트"], ["East-West", "GPU 클러스터 주요 트래픽"], ["Latency", "훈련 효율 민감 변수"], ["Topology", "확장성 결정 요인"]], risk: "대형 훈련 클러스터는 GPU 더미가 아니라 네트워크 시스템입니다. 스위치, 광모듈, 토폴로지, NIC/DPU, 혼잡 제어가 실제 처리량을 좌우합니다." },
    site: { name: "부지 및 건설", role: "토지, 수자원, 시설, EPC", signal: "건설 가능한 토지, 물, 전력 거리, 시공 능력이 공급 속도를 결정합니다.", lede: "데이터센터는 토지, 토목, 전기/기계, 소방, 보안, 인허가가 결합된 중자산 인프라입니다.", suppliers: ["데이터센터 REITs/개발사: Equinix (EQIX), Digital Realty (DLR), GDS Holdings (GDS/9698.HK), NEXTDC (NXT.AX)", "지역/주권 클라우드 운영사: Keppel DC REIT (AJBU.SI), NTT Data (9613.T), KDDI (9433.T)", "토목/전기/기계 EPC: Quanta Services (PWR), AECOM (ACM), Jacobs (J), Fluor (FLR)", "민간 대형 플랫폼: Vantage Data Centers, QTS, CyrusOne, DataBank"], metrics: [["24-48M", "계획부터 가동까지의 일반 주기"], ["MW/acre", "토지 사용 밀도"], ["Permits", "숨은 납품 병목"], ["Tier", "신뢰성 및 이중화 기준"]], risk: "데이터센터 공급은 즉시 생기는 용량이 아니라 다년 인프라 파이프라인입니다. 토지, 전력, 물, 환경심사, 세제 혜택, 인력, 소방 규정, 선임대 계약이 모두 중요합니다." },
    ops: { name: "운영 및 플랫폼", role: "클라우드, 코로케이션, MLOps, 모니터링, 보안", signal: "실제 상품은 건물이 아니라 스케줄링·과금·모니터링 가능한 컴퓨팅 서비스입니다.", lede: "운영 계층은 인프라를 GPU 클라우드, 훈련 플랫폼, 추론 서비스, 관리형 솔루션으로 전환합니다.", suppliers: ["하이퍼스케일러와 클라우드: Amazon (AMZN), Microsoft (MSFT), Alphabet (GOOGL), Oracle (ORCL), Meta (META)", "GPU 클라우드와 AI 인프라: CoreWeave (CRWV), Nebius (NBIS), Lambda (private), Crusoe (private)", "데이터/MLOps/가시성: Snowflake (SNOW), Datadog (DDOG), ServiceNow (NOW), Cloudflare (NET), Databricks (private)", "보안 및 컴플라이언스: Palo Alto Networks (PANW), CrowdStrike (CRWD), Zscaler (ZS), Okta (OKTA)"], metrics: [["SLA", "기업 계약 핵심 조건"], ["Utilization", "GPU 임대 수익성 변수"], ["Inference", "훈련에서 추론으로 수요 확대"], ["Security", "주권 데이터와 규제 요구"]], risk: "운영 플랫폼은 하드웨어를 과금 가능한 서비스로 바꿉니다. 장기 경쟁력은 GPU 보유량보다 이용률, 스케줄링, 도구 생태계, 보안, SLA, 전력비 관리에서 나옵니다." }
  },
  ja: {
    power: { name: "電力・電力網", role: "電力会社、変電所、UPS、PDU", signal: "電力確保と系統接続の時期が、大型 AI データセンターの最初の制約になります。", lede: "AI クラスターはデータセンターを IT プロジェクトから電力インフラプロジェクトへ変えます。", suppliers: ["電力網・電気設備: Schneider Electric (SU.PA), Eaton (ETN), ABB (ABBN.SW/ABB), Siemens Energy (ENR.DE)", "バックアップ電源と重要インフラ: Vertiv (VRT), Caterpillar (CAT), Cummins (CMI), GE Vernova (GEV)", "電力 EPC と系統接続: Quanta Services (PWR), AECOM (ACM), Jacobs (J), Fluor (FLR)", "エネルギー・公益事業パートナー: NextEra Energy (NEE), Duke Energy (DUK), Constellation Energy (CEG)"], metrics: [["30-150MW", "AI キャンパスの一般的な電力規模"], ["N+1", "重要電源の冗長設計"], ["18-36M", "系統・設備リードタイムリスク"], ["PUE", "エネルギー効率の中核指標"]], risk: "AI 需要は GPU 調達だけでなく、実際に供給できる電力に左右されます。変圧器、開閉装置、系統承認、長期電力契約を確認することで、実稼働可能な容量を理解できます。" },
    cooling: { name: "冷却システム", role: "チラー、CDU、冷却板、冷却塔", signal: "GPU の熱密度上昇により、冷却板、CDU、ポンプ、冷却塔の更新が進みます。", lede: "AI ラック密度の上昇により、空冷からハイブリッド冷却・液冷へ移行しています。", suppliers: ["データセンター熱管理: Vertiv (VRT), Schneider Electric (SU.PA), Johnson Controls (JCI), Trane Technologies (TT)", "チラー/HVAC/熱交換: Carrier Global (CARR), Modine (MOD), nVent Electric (NVT), Daikin (6367.T)", "液冷部品: Delta Electronics (2308.TW), CoolIT Systems (private), Asetek (ASTK.CO)", "ポンプ/バルブ/水処理: Xylem (XYL), Pentair (PNR), Watts Water (WTS)"], metrics: [["40-120kW", "AI ラックの電力密度範囲"], ["Liquid", "高性能 GPU クラスターの方向性"], ["WUE", "水使用効率"], ["Delta T", "冷却ループ効率の変数"]], risk: "冷却はチップ、冷却板、ラックマニホールド、CDU、チラー、冷却塔まで続く熱経路です。コネクタ漏れ、ポンプ故障、水質問題はクラスター稼働率に直結します。" },
    compute: { name: "計算設備", role: "GPU、HBM、先端パッケージング、AI サーバー", signal: "GPU 供給、先端パッケージング、ラック単位の納入が構築速度を決めます。", lede: "計算層は GPU、HBM、先端パッケージング、サーバーボード、電源、ラック、統合テストで構成されます。", suppliers: ["AI アクセラレーターとプラットフォーム: NVIDIA (NVDA), AMD (AMD), Broadcom (AVGO), Marvell (MRVL)", "ファウンドリ/装置/先端パッケージング: TSMC (TSM/2330.TW), ASML (ASML), Applied Materials (AMAT), Lam Research (LRCX)", "HBM とメモリ: SK hynix (000660.KS), Micron (MU), Samsung Electronics (005930.KS)", "AI サーバー/ODM: Super Micro Computer (SMCI), Dell (DELL), HPE (HPE), Quanta (2382.TW), Wiwynn (6669.TW), Foxconn (2317.TW)"], metrics: [["60-75%", "AI データセンター CapEx は IT 機器が主導"], ["HBM", "GPU 供給の敏感な制約"], ["Rack-scale", "次世代納入モデル"], ["Yield", "パッケージング歩留まりが出荷を左右"]], risk: "計算設備の制約は GPU だけではありません。HBM、先端パッケージング、PCB、電源、冷却、ラック統合、テストを同時に見る必要があります。" },
    network: { name: "ネットワーク相互接続", role: "スイッチ、NIC、光モジュール、光ファイバー", signal: "学習クラスターの制約は東西トラフィックと光接続に現れやすいです。", lede: "大規模モデル学習には低遅延・高帯域の GPU 間接続が必要です。", suppliers: ["データセンタースイッチ: Arista Networks (ANET), Cisco (CSCO), NVIDIA Networking (NVDA)", "ネットワークチップ/DPU/NIC: Broadcom (AVGO), Marvell (MRVL), Intel (INTC), NVIDIA (NVDA)", "光モジュールとフォトニクス: Coherent (COHR), Lumentum (LITE), Fabrinet (FN), Innolight (300308.SZ)", "コネクタ/ケーブル/高速インターフェース: Amphenol (APH), TE Connectivity (TEL), Molex (Koch private)"], metrics: [["400G/800G", "AI 高速相互接続"], ["East-West", "GPU クラスターの主要トラフィック"], ["Latency", "学習効率に敏感な要素"], ["Topology", "拡張性を左右する設計"]], risk: "大規模学習クラスターは GPU の集合ではなくネットワークシステムです。スイッチ、光モジュール、トポロジー、NIC/DPU、輻輳制御が実効スループットを左右します。" },
    site: { name: "用地・建設", role: "土地、水利、施設、EPC", signal: "建設可能な土地、水、電力距離、施工能力が供給速度を決めます。", lede: "データセンターは土地、土木、電気・機械、消防、セキュリティ、許認可を含む重資産インフラです。", suppliers: ["データセンター REIT/開発会社: Equinix (EQIX), Digital Realty (DLR), GDS Holdings (GDS/9698.HK), NEXTDC (NXT.AX)", "地域・主権クラウド事業者: Keppel DC REIT (AJBU.SI), NTT Data (9613.T), KDDI (9433.T)", "土木/電気/機械 EPC: Quanta Services (PWR), AECOM (ACM), Jacobs (J), Fluor (FLR)", "民間大型プラットフォーム: Vantage Data Centers, QTS, CyrusOne, DataBank"], metrics: [["24-48M", "計画から稼働までの一般的期間"], ["MW/acre", "土地利用密度"], ["Permits", "隠れた納入制約"], ["Tier", "信頼性と冗長性の標準"]], risk: "データセンター供給は即時容量ではなく、複数年のインフラパイプラインです。土地、電力、水、環境審査、税制、人材、消防規制、事前リース契約が重要です。" },
    ops: { name: "運用・プラットフォーム", role: "クラウド、コロケーション、MLOps、監視、セキュリティ", signal: "実際の商品は建物ではなく、配分・課金・監視できる計算サービスです。", lede: "運用層はインフラを GPU クラウド、学習基盤、推論サービス、マネージドソリューションへ変換します。", suppliers: ["ハイパースケーラーとクラウド: Amazon (AMZN), Microsoft (MSFT), Alphabet (GOOGL), Oracle (ORCL), Meta (META)", "GPU クラウドと AI インフラ: CoreWeave (CRWV), Nebius (NBIS), Lambda (private), Crusoe (private)", "データ/MLOps/可観測性: Snowflake (SNOW), Datadog (DDOG), ServiceNow (NOW), Cloudflare (NET), Databricks (private)", "セキュリティとコンプライアンス: Palo Alto Networks (PANW), CrowdStrike (CRWD), Zscaler (ZS), Okta (OKTA)"], metrics: [["SLA", "企業契約の中核条件"], ["Utilization", "GPU レンタル収益性の鍵"], ["Inference", "学習から推論へ需要拡大"], ["Security", "主権データと規制要件"]], risk: "運用プラットフォームはハードウェアを課金可能なサービスに変えます。長期優位性は GPU 保有量だけでなく、利用率、スケジューリング、ツール、セキュリティ、SLA、電力コスト管理から生まれます。" }
  }
};

const chapter2Content = {
  en: {
    htmlLang: "en",
    chapterLabels: { chapter1: "Chapter 1", chapter2: "Chapter 2", chapter3: "Chapter 3" },
    title: "From Training Factories to Inference Networks",
    intro: "Use an interactive 3D workload model to compare compute-driven AI training with memory- and efficiency-driven inference: training builds models, while inference serves users.",
    modeListLabel: "Workload modes",
    insightTitle: "Workload insight",
    implicationHeading: "Infrastructure implications",
    contextHeading: "Key finding",
    audioLabel: "Audio briefing",
    play: "Play",
    pause: "Pause",
    transcript: "Transcript",
    transcriptText:
      "Training builds model capability through large synchronized runs. Inference turns that capability into a live service where routing, cache locality, retrieval, and latency determine product experience.",
    modes: [
      {
        id: "compare",
        name: "Compare Both",
        role: "Throughput vs latency",
        signal: "The real dividing line in AI hardware choices: training and inference may both look like running AI, but they demand entirely different hardware worlds.",
        lede: "Training behaves like a throughput factory. Inference behaves like real-time traffic. The comparison helps users see why AI infrastructure expands beyond aggregate GPU demand.",
        metrics: [["Batch", "Training moves large synchronized blocks"], ["P95", "Inference is judged by tail latency"], ["Cache", "Serving economics depend on memory locality"], ["I/O", "Both workloads stress storage and network"]],
        insights: [
          ["Training Builds Capability, Inference Delivers Experience", "Training creates the model's capability through large synchronized runs. Inference turns that capability into a live service for many concurrent users."],
          ["Throughput And Latency Are Different Games", "Training is judged by cluster efficiency. Inference is judged by whether the system responds within a user-visible latency budget."],
          ["The Bottleneck Moves With The Workload", "The pressure shifts from GPU supply and interconnect toward routing, cache misses, retrieval, CPU orchestration, and observability."]
        ]
      },
      {
        id: "training",
        name: "Training AI",
        role: "Large synchronized workload",
        signal: "Training rewards high GPU utilization, east-west bandwidth, checkpoint throughput, and power density.",
        lede: "Training moves large batches through synchronized GPU clusters. The core objective is to keep accelerators busy and reduce idle time between coordinated steps.",
        metrics: [["Throughput", "Primary optimization target"], ["All-reduce", "East-west network pressure"], ["Checkpoint", "Periodic storage write burst"], ["HBM", "Sensitive memory bottleneck"]],
        insights: [
          ["Training Is A Throughput Factory", "The training side emphasizes batch movement, synchronized GPU utilization, power delivery, cooling, and rack-scale integration."],
          ["Synchronization Creates Network Pressure", "Large runs require GPUs to exchange gradients and intermediate state, making topology, optics, NICs, and switches part of the compute system."],
          ["Checkpointing Turns Storage Into Insurance", "Long training jobs periodically write checkpoints so work can recover from failure, turning storage throughput into a resilience layer."]
        ]
      },
      {
        id: "inference",
        name: "Inference AI",
        role: "Many real-time requests",
        signal: "Inference rewards routing, concurrency, high-bandwidth memory, retrieval speed, and predictable response time.",
        lede: "Inference serves many small requests while users are waiting. Every hop through gateway, model server, high-bandwidth memory, retrieval, and response edge can become visible latency.",
        metrics: [["Requests", "Continuous user demand"], ["Latency", "User-visible budget"], ["HBM", "Memory bandwidth shapes serving efficiency"], ["RAG", "Quality gain with extra round trips"]],
        insights: [
          ["Inference Is Real-Time Traffic", "Serving systems must route, schedule, access memory, retrieve, and respond under variable demand rather than run one giant batch."],
          ["Memory Bandwidth Is Infrastructure", "High-bandwidth memory and memory locality can shorten the request path, while misses often add network, storage, and compute cost."],
          ["Retrieval Adds Intelligence And Latency", "RAG can improve answer quality, but every retrieval call adds storage access, network round trips, and tail-latency risk."]
        ]
      }
    ],
    nodes: {
      dataset: ["Dataset lake", "Large training data blocks enter the pipeline."],
      preprocess: ["Preprocessing", "Data is cleaned, tokenized, and staged before training."],
      trainGpu: ["GPU training cluster", "Racks pulse together to show synchronized utilization."],
      interconnect: ["Interconnect fabric", "East-west waves show the network as part of compute."],
      checkpoint: ["Checkpoint storage", "Periodic write bursts protect long training runs."],
      artifact: ["Model artifact", "Training creates capability, not a product experience yet."],
      requests: ["User requests", "User and notebook requests represent live inference demand."],
      gateway: ["Gateway / load balancer", "Routing choices affect reliability and latency."],
      serving: ["Model serving rack", "Inference is about concurrency and response time."],
      cache: ["High Bandwidth Memory", "Memory bandwidth and locality shorten the inference path."],
      retrieval: ["Retrieval / vector database", "RAG adds context plus storage and network pressure."],
      response: ["Response edge", "Inference turns model capability into user experience."]
    },
    segments: {
      compare: "Training builds capability. Inference delivers experience.",
      training: "Training moves large batches through synchronized GPU clusters.",
      inference: "Inference serves many real-time requests under a latency budget."
    },
    audioBriefings: {
      compare: "Training AI and inference AI both run models, but they stress infrastructure in very different ways. Training is about throughput: using large GPU clusters to build model capability. Inference is about latency and efficiency: serving users quickly while they wait. That is why AI infrastructure is no longer just a GPU story. It is a system-wide rebuild across compute, memory, networking, and orchestration.",
      training: "Training AI works like a throughput factory. Massive datasets move through synchronized GPU clusters, and the goal is to keep expensive accelerators highly utilized. The bottleneck is not only GPUs. It also includes HBM, interconnect, checkpoint storage, power, and cooling.",
      inference: "Inference AI works more like real-time traffic. It handles many user requests, and every routing decision, memory access, retrieval step, and model response can affect latency. The key challenge is balancing quality, cost, and response speed."
    },
    laneLabels: {
      training: "Training AI",
      inference: "Inference AI"
    }
  },
  zh: {
    htmlLang: "zh-Hant",
    chapterLabels: { chapter1: "第一章", chapter2: "第二章", chapter3: "第三章" },
    title: "從訓練工廠到推論網路",
    intro: "用互動式 3D workload 模型，比較算力導向的 AI 訓練與記憶體、效率導向的 AI 推論：訓練建立模型，推論服務使用者。",
    modeListLabel: "Workload 模式",
    insightTitle: "Workload 洞察",
    implicationHeading: "基礎設施影響",
    contextHeading: "閱讀分析",
    audioLabel: "語音導覽",
    play: "播放",
    pause: "暫停",
    transcript: "逐字稿",
    transcriptText:
      "訓練透過大規模同步運算建立模型能力；推論則把能力變成即時服務。路由、快取、檢索與延遲，會直接影響產品體驗。",
    modes: [
      { id: "compare", name: "兩者比較", role: "吞吐量 vs 延遲", signal: "AI 硬體選擇的真正分水嶺：這兩件事看起來都在「跑 AI」，但對硬體的需求，卻是完全不同的世界。", lede: "訓練像吞吐量工廠，推論像即時交通系統。對照視圖讓使用者理解 AI 基礎設施不只是 GPU 數量增加。", metrics: [["Batch", "訓練移動大型同步批次"], ["P95", "推論重視尾端延遲"], ["Cache", "記憶體局部性影響成本"], ["I/O", "兩者都壓迫儲存與網路"]], insights: [["訓練建立能力，推論交付體驗", "訓練用大型同步運算建立模型能力；推論把能力轉成服務，面對大量同時使用者。"], ["吞吐量與延遲是兩種競賽", "訓練看叢集效率，推論看系統能否在使用者可感知的延遲內回應。"], ["瓶頸會跟著 workload 移動", "壓力從 GPU、HBM、互連與 checkpoint，擴展到路由、快取、檢索、CPU 編排與可觀測性。"]] },
      { id: "training", name: "訓練 AI", role: "大型同步 workload", signal: "訓練重視 GPU 利用率、東西向頻寬、checkpoint 吞吐量與功率密度。", lede: "訓練把大量資料批次送進同步化 GPU 叢集，核心是讓昂貴加速器維持高利用率。", metrics: [["Throughput", "主要優化目標"], ["All-reduce", "東西向網路壓力"], ["Checkpoint", "週期性儲存寫入"], ["HBM", "敏感記憶體瓶頸"]], insights: [["訓練是吞吐量工廠", "訓練側重批次資料移動、GPU 同步利用率、電力、冷卻與 rack-scale 整合。"], ["同步會創造網路壓力", "大型訓練需要 GPU 交換梯度與中間狀態，拓樸、光模組、NIC 與交換器都成為算力系統的一部分。"], ["Checkpoint 是儲存保險", "長時間訓練任務需要定期寫入 checkpoint，讓儲存吞吐量成為可靠度的一部分。"]] },
      { id: "inference", name: "推論 AI", role: "大量即時請求", signal: "推論重視路由、併發、高頻寬記憶體、檢索速度與可預期回應時間。", lede: "推論要在使用者等待時處理大量小請求，每一次 gateway、server、memory、retrieval 與 response edge 都可能變成可感知延遲。", metrics: [["Requests", "連續使用者需求"], ["Latency", "使用者可感知預算"], ["HBM", "記憶體頻寬影響服務效率"], ["RAG", "提高品質但增加往返"]], insights: [["推論是即時交通", "推論系統必須在變動需求下完成路由、排程、記憶體存取、檢索與回應，而不是跑單一大批次。"], ["記憶體頻寬就是基礎設施", "高頻寬記憶體與資料局部性可縮短請求路徑，miss 則可能增加網路、儲存與算力成本。"], ["檢索增加智慧，也增加延遲", "RAG 能提升回答品質，但每次檢索都會帶來儲存存取、網路往返與尾端延遲風險。"]] }
    ],
    nodes: {
      dataset: ["資料湖", "大型訓練資料批次進入 pipeline。"],
      preprocess: ["資料前處理", "資料在訓練前被清理、tokenize 與 staging。"],
      trainGpu: ["GPU 訓練叢集", "機櫃同步閃爍代表高利用率運轉。"],
      interconnect: ["互連網路", "東西向波形顯示網路也是算力系統。"],
      checkpoint: ["Checkpoint 儲存", "週期性寫入保護長時間訓練。"],
      artifact: ["模型成果", "訓練建立能力，但還不是產品體驗。"],
      requests: ["使用者請求", "使用者與 notebook 請求代表即時推論需求。"],
      gateway: ["Gateway / 負載平衡", "路由選擇影響可靠度與延遲。"],
      serving: ["模型服務機櫃", "推論重點是併發與回應時間。"],
      cache: ["高頻寬記憶體", "記憶體頻寬與資料局部性會縮短推論路徑。"],
      retrieval: ["檢索 / 向量資料庫", "RAG 帶來上下文，也帶來儲存與網路壓力。"],
      response: ["回應邊緣", "推論把模型能力轉成使用者體驗。"]
    },
    segments: {
      compare: "訓練建立能力，推論交付體驗。",
      training: "訓練把大型批次送進同步化 GPU 叢集。",
      inference: "推論在延遲預算內服務大量即時請求。"
    },
    audioBriefings: {
      compare: "訓練 AI 和推論 AI 都在跑模型，但壓力完全不同。訓練重視吞吐量，目標是用大量 GPU 建立模型能力；推論重視延遲與效率，目標是在使用者等待時快速回應。這就是為什麼 AI 基礎設施不只是 GPU 需求增加，而是算力、記憶體、網路與系統編排一起重組。",
      training: "訓練 AI 像一座吞吐量工廠。大量資料被送進同步化 GPU 叢集，核心目標是讓昂貴的加速器保持高利用率。瓶頸不只在 GPU，還包括 HBM、互連網路、儲存 checkpoint、電力與冷卻。",
      inference: "推論 AI 像即時交通系統。它要處理大量使用者請求，每一次路由、記憶體存取、檢索與模型回應，都會影響延遲。推論的競爭重點，是在品質、成本與回應速度之間取得平衡。"
    },
    laneLabels: {
      training: "訓練 AI",
      inference: "推論 AI"
    }
  },
  ko: {
    htmlLang: "ko",
    chapterLabels: { chapter1: "1장", chapter2: "2장", chapter3: "3장" },
    title: "훈련 공장에서 추론 네트워크로",
    intro: "인터랙티브 3D 워크로드 모델로 컴퓨팅 중심의 AI 훈련과 메모리·효율 중심의 추론을 비교합니다. 훈련은 모델을 만들고, 추론은 사용자를 서비스합니다.",
    modeListLabel: "워크로드 모드",
    insightTitle: "워크로드 인사이트",
    implicationHeading: "인프라 영향",
    contextHeading: "분석 읽기",
    audioLabel: "오디오 브리핑",
    play: "재생",
    pause: "일시정지",
    transcript: "스크립트",
    transcriptText: "훈련은 대규모 동기 연산으로 모델 능력을 만들고, 추론은 그 능력을 실시간 서비스로 바꿉니다. 라우팅, 캐시, 검색, 지연시간이 제품 경험을 좌우합니다.",
    modes: [
      { id: "compare", name: "둘 다 비교", role: "처리량 vs 지연시간", signal: "AI 하드웨어 선택의 진짜 분기점: 둘 다 AI를 실행하는 것처럼 보이지만, 필요한 하드웨어는 완전히 다른 세계입니다.", lede: "훈련은 처리량 공장이고 추론은 실시간 트래픽입니다. 비교 화면은 AI 인프라가 단순 GPU 수요를 넘어서는 이유를 보여줍니다.", metrics: [["Batch", "훈련은 큰 동기 배치를 이동"], ["P95", "추론은 꼬리 지연시간이 중요"], ["Cache", "메모리 지역성이 비용에 영향"], ["I/O", "둘 다 저장장치와 네트워크를 압박"]], insights: [["훈련은 능력을 만들고 추론은 경험을 전달", "훈련은 대규모 동기 실행으로 모델 능력을 만들고 추론은 이를 다수 사용자용 서비스로 전환합니다."], ["처리량과 지연시간은 다른 게임", "훈련은 클러스터 효율로 평가되고 추론은 지연 예산 안에서 응답하는지로 평가됩니다."], ["병목은 워크로드와 함께 이동", "압력은 GPU와 인터커넥트에서 라우팅, 캐시 미스, 검색, CPU 오케스트레이션, 관측성으로 확장됩니다."]] },
      { id: "training", name: "훈련 AI", role: "대형 동기 워크로드", signal: "훈련은 GPU 이용률, 동서 대역폭, 체크포인트 처리량, 전력 밀도가 중요합니다.", lede: "훈련은 큰 배치를 동기화된 GPU 클러스터로 이동시키며 가속기를 계속 바쁘게 유지하는 것이 핵심입니다.", metrics: [["Throughput", "주요 최적화 목표"], ["All-reduce", "동서 네트워크 압력"], ["Checkpoint", "주기적 저장 쓰기"], ["HBM", "민감한 메모리 병목"]], insights: [["훈련은 처리량 공장", "훈련은 배치 이동, GPU 동기 이용률, 전력, 냉각, 랙 통합을 강조합니다."], ["동기화는 네트워크 압력을 만든다", "대규모 실행은 GPU 간 상태 교환을 요구하므로 토폴로지, 광모듈, NIC, 스위치가 컴퓨팅 시스템의 일부가 됩니다."], ["체크포인트는 저장장치 보험", "긴 훈련 작업은 복구를 위해 주기적으로 체크포인트를 쓰며 저장 처리량이 회복탄력성의 일부가 됩니다."]] },
      { id: "inference", name: "추론 AI", role: "다수 실시간 요청", signal: "추론은 라우팅, 동시성, 고대역폭 메모리, 검색 속도, 예측 가능한 응답시간이 중요합니다.", lede: "추론은 사용자가 기다리는 동안 많은 작은 요청을 처리합니다. 게이트웨이, 서버, 메모리, 검색, 응답 엣지의 모든 홉이 지연시간이 됩니다.", metrics: [["Requests", "연속적인 사용자 수요"], ["Latency", "사용자 체감 예산"], ["HBM", "메모리 대역폭이 서빙 효율에 영향"], ["RAG", "품질 향상과 왕복 증가"]], insights: [["추론은 실시간 트래픽", "서빙 시스템은 변화하는 수요에서 라우팅, 스케줄링, 메모리 접근, 검색, 응답을 수행해야 합니다."], ["메모리 대역폭은 인프라입니다", "고대역폭 메모리와 데이터 지역성은 요청 경로를 줄이고 미스는 비용과 지연을 늘릴 수 있습니다."], ["검색은 지능과 지연을 함께 추가", "RAG는 품질을 높일 수 있지만 저장장치 접근, 네트워크 왕복, 꼬리 지연 리스크를 추가합니다."]] }
    ],
    nodes: {
      dataset: ["데이터 레이크", "큰 훈련 데이터 블록이 파이프라인으로 들어갑니다."],
      preprocess: ["전처리", "데이터가 훈련 전에 정리되고 토큰화됩니다."],
      trainGpu: ["GPU 훈련 클러스터", "랙이 함께 깜박이며 동기 이용률을 보여줍니다."],
      interconnect: ["인터커넥트 패브릭", "동서 파형은 네트워크도 컴퓨팅임을 보여줍니다."],
      checkpoint: ["체크포인트 저장소", "주기적 쓰기가 긴 훈련을 보호합니다."],
      artifact: ["모델 산출물", "훈련은 능력을 만들지만 아직 제품 경험은 아닙니다."],
      requests: ["사용자 요청", "사용자와 노트북 요청이 실시간 추론 수요를 나타냅니다."],
      gateway: ["게이트웨이 / 로드밸런서", "라우팅은 신뢰성과 지연에 영향을 줍니다."],
      serving: ["모델 서빙 랙", "추론은 동시성과 응답시간이 핵심입니다."],
      cache: ["고대역폭 메모리", "메모리 대역폭과 데이터 지역성은 추론 경로를 줄입니다."],
      retrieval: ["검색 / 벡터 DB", "RAG는 맥락과 저장·네트워크 압력을 함께 추가합니다."],
      response: ["응답 엣지", "추론은 모델 능력을 사용자 경험으로 바꿉니다."]
    },
    segments: { compare: "훈련은 능력을 만들고 추론은 경험을 전달합니다.", training: "훈련은 큰 배치를 동기화된 GPU 클러스터로 보냅니다.", inference: "추론은 지연 예산 안에서 많은 실시간 요청을 처리합니다." },
    audioBriefings: {
      compare: "훈련 AI와 추론 AI는 모두 모델을 실행하지만, 인프라에 주는 압력은 매우 다릅니다. 훈련은 처리량이 핵심이며, 대규모 GPU 클러스터로 모델 능력을 만듭니다. 추론은 지연시간과 효율이 핵심이며, 사용자가 기다리는 동안 빠르게 응답해야 합니다. 그래서 AI 인프라는 단순한 GPU 수요가 아니라 컴퓨팅, 메모리, 네트워크, 오케스트레이션의 재구성입니다.",
      training: "훈련 AI는 처리량 공장과 같습니다. 대규모 데이터가 동기화된 GPU 클러스터를 지나가고, 목표는 비싼 가속기를 최대한 바쁘게 유지하는 것입니다. 병목은 GPU만이 아닙니다. HBM, 인터커넥트, 체크포인트 저장소, 전력, 냉각도 함께 중요합니다.",
      inference: "추론 AI는 실시간 교통 시스템에 가깝습니다. 많은 사용자 요청을 처리해야 하며, 라우팅, 메모리 접근, 검색, 모델 응답의 모든 단계가 지연시간에 영향을 줍니다. 핵심은 품질, 비용, 응답 속도 사이의 균형입니다."
    },
    laneLabels: {
      training: "훈련 AI",
      inference: "추론 AI"
    }
  },
  ja: {
    htmlLang: "ja",
    chapterLabels: { chapter1: "第1章", chapter2: "第2章", chapter3: "第3章" },
    title: "学習工場から推論ネットワークへ",
    intro: "インタラクティブな 3D ワークロードモデルで、計算力中心の AI 学習とメモリ・効率中心の推論を比較します。学習はモデルを作り、推論はユーザーに提供します。",
    modeListLabel: "ワークロードモード",
    insightTitle: "ワークロード・インサイト",
    implicationHeading: "インフラへの影響",
    contextHeading: "分析テキスト",
    audioLabel: "音声ブリーフィング",
    play: "再生",
    pause: "一時停止",
    transcript: "文字起こし",
    transcriptText: "学習は大規模な同期処理でモデル能力を作り、推論はその能力をリアルタイムサービスへ変えます。ルーティング、キャッシュ、検索、遅延が製品体験を左右します。",
    modes: [
      { id: "compare", name: "両方を比較", role: "スループット vs 遅延", signal: "AI ハードウェア選択の本当の分岐点：どちらも「AI を動かす」ように見えますが、求めるハードウェアはまったく別の世界です。", lede: "学習はスループット工場、推論はリアルタイム交通です。比較ビューは AI インフラが単なる GPU 需要を超える理由を示します。", metrics: [["Batch", "学習は大きな同期バッチを移動"], ["P95", "推論は尾部遅延が重要"], ["Cache", "メモリ局所性がコストに影響"], ["I/O", "両方がストレージとネットワークを圧迫"]], insights: [["学習は能力を作り、推論は体験を届ける", "学習は大規模同期実行でモデル能力を作り、推論はその能力を多くのユーザー向けサービスへ変えます。"], ["スループットと遅延は別の競争", "学習はクラスター効率で評価され、推論はユーザーが感じる遅延予算内で応答できるかで評価されます。"], ["ボトルネックはワークロードとともに動く", "圧力は GPU や相互接続から、ルーティング、キャッシュミス、検索、CPU オーケストレーション、可観測性へ広がります。"]] },
      { id: "training", name: "学習 AI", role: "大規模同期ワークロード", signal: "学習では GPU 利用率、東西帯域、チェックポイント処理、電力密度が重要です。", lede: "学習は大きなバッチを同期 GPU クラスターへ流し、高価なアクセラレーターを遊ばせないことが核心です。", metrics: [["Throughput", "主な最適化対象"], ["All-reduce", "東西ネットワーク圧力"], ["Checkpoint", "周期的な保存書き込み"], ["HBM", "敏感なメモリ制約"]], insights: [["学習はスループット工場", "学習はバッチ移動、GPU 同期利用率、電力、冷却、ラック統合を重視します。"], ["同期はネットワーク圧力を生む", "大規模実行では GPU 間の状態交換が必要で、トポロジー、光モジュール、NIC、スイッチが計算システムの一部になります。"], ["チェックポイントはストレージ保険", "長時間の学習ジョブは復旧のため定期的にチェックポイントを書き込み、ストレージ性能が信頼性を支えます。"]] },
      { id: "inference", name: "推論 AI", role: "多数のリアルタイム要求", signal: "推論ではルーティング、同時実行、高帯域メモリ、検索速度、予測可能な応答時間が重要です。", lede: "推論はユーザーが待つ間に多数の小さな要求を処理します。ゲートウェイ、サーバー、メモリ、検索、応答エッジの各ホップが遅延になります。", metrics: [["Requests", "連続するユーザー需要"], ["Latency", "ユーザー体感の予算"], ["HBM", "メモリ帯域がサービング効率に影響"], ["RAG", "品質向上と往復増加"]], insights: [["推論はリアルタイム交通", "サービングシステムは変動需要のなかでルーティング、スケジューリング、メモリアクセス、検索、応答を行います。"], ["メモリ帯域はインフラです", "高帯域メモリとデータ局所性は要求経路を短縮し、ミスはコストと遅延を増やします。"], ["検索は知能と遅延を同時に加える", "RAG は回答品質を高めますが、ストレージアクセス、ネットワーク往復、尾部遅延リスクを追加します。"]] }
    ],
    nodes: {
      dataset: ["データレイク", "大きな学習データブロックがパイプラインへ入ります。"],
      preprocess: ["前処理", "データは学習前に整形され、トークン化されます。"],
      trainGpu: ["GPU 学習クラスター", "ラックが同期して発光し、高利用率を示します。"],
      interconnect: ["相互接続ファブリック", "東西方向の波がネットワークも計算の一部であることを示します。"],
      checkpoint: ["チェックポイント保存", "周期的な書き込みが長時間学習を守ります。"],
      artifact: ["モデル成果物", "学習は能力を作りますが、まだ製品体験ではありません。"],
      requests: ["ユーザー要求", "ユーザーとノートブックの要求がリアルタイム推論需要を表します。"],
      gateway: ["ゲートウェイ / 負荷分散", "ルーティングは信頼性と遅延に影響します。"],
      serving: ["モデルサービングラック", "推論では同時実行と応答時間が重要です。"],
      cache: ["高帯域メモリ", "メモリ帯域とデータ局所性は推論経路を短縮します。"],
      retrieval: ["検索 / ベクトルDB", "RAG は文脈とストレージ・ネットワーク圧力を加えます。"],
      response: ["応答エッジ", "推論はモデル能力をユーザー体験へ変えます。"]
    },
    segments: { compare: "学習は能力を作り、推論は体験を届けます。", training: "学習は大きなバッチを同期 GPU クラスターへ送ります。", inference: "推論は遅延予算内で多数のリアルタイム要求を処理します。" },
    audioBriefings: {
      compare: "学習 AI と推論 AI はどちらもモデルを動かしますが、インフラへの負荷は大きく異なります。学習はスループットが重要で、大規模な GPU クラスターでモデル能力を作ります。推論は遅延と効率が重要で、ユーザーが待っている間に素早く応答する必要があります。つまり AI インフラは、GPU だけでなく、計算、メモリ、ネットワーク、オーケストレーション全体の再構成です。",
      training: "学習 AI はスループット工場のようなものです。大量のデータが同期された GPU クラスターを通り、高価なアクセラレーターを高い利用率で動かすことが目標です。ボトルネックは GPU だけではありません。HBM、相互接続、チェックポイント保存、電力、冷却も重要です。",
      inference: "推論 AI はリアルタイム交通システムに近いものです。大量のユーザー要求を処理し、ルーティング、メモリアクセス、検索、モデル応答の各ステップが遅延に影響します。重要なのは、品質、コスト、応答速度のバランスです。"
    },
    laneLabels: {
      training: "学習 AI",
      inference: "推論 AI"
    }
  }
};

const chapter3Content = {
  en: {
    htmlLang: "en",
    chapterLabels: { chapter1: "Chapter 1", chapter2: "Chapter 2", chapter3: "Chapter 3" },
    title: "From Response to Action: How Agentic AI Turns Models Into Workflows",
    intro: "Explore how agentic AI receives data, reasons, plans, acts, and depends on orchestration infrastructure beneath the model.",
    modeListLabel: "Agent modes",
    insightTitle: "Agentic AI insight",
    supplierHeading: "Value-chain roles",
    contextHeading: "Key finding",
    audioLabel: "Audio briefing",
    play: "Play",
    pause: "Pause",
    transcript: "Transcript",
    modes: [
      {
        id: "overview",
        name: "Agent Overview",
        role: "Inputs to actions",
        signal: "Agentic AI moves from answering prompts toward coordinating data, tools, and business actions.",
        lede: "The agent receives enterprise data, documents, APIs, and user interactions, then turns them into workflow automation, decisions, actions, and collaboration.",
        metrics: [["4 inputs", "Data, documents, APIs, users"], ["4 core steps", "Perceive, reason, plan, act"], ["4 outputs", "Workflow, decision, action, communication"], ["Multi-agent", "Delegation and coordination"]],
        suppliers: [
          "Model and agent platforms: Microsoft (MSFT), Alphabet / Google (GOOGL), Amazon (AMZN), Meta (META), OpenAI (private), Anthropic (private)",
          "Enterprise workflow and tools: Salesforce (CRM), ServiceNow (NOW), Adobe (ADBE), Atlassian (TEAM), UiPath (PATH), GitHub via Microsoft (MSFT)",
          "Cloud and inference platforms: Microsoft Azure (MSFT), AWS (AMZN), Google Cloud (GOOGL), Oracle Cloud (ORCL), Cloudflare (NET)"
        ],
        risk: "Agentic AI changes the unit of work from one model response to a multi-step workflow. Infrastructure analysis expands from model speed to coordination reliability."
      },
      {
        id: "core",
        name: "Agent Core",
        role: "Perceive, reason, plan, act",
        signal: "The agent core translates raw context into structured steps before it calls models, tools, memory, or external systems.",
        lede: "Perceive gathers signals. Reason interprets context. Plan orders the work. Act invokes tools and sends the result back into the business process.",
        metrics: [["Perceive", "Inputs become context"], ["Reason", "Model interprets intent"], ["Plan", "Tasks become sequence"], ["Act", "Tools execute work"]],
        suppliers: [
          "Frontier model layer: OpenAI (private), Anthropic (private), Cohere (private), Meta (META), Alphabet (GOOGL), Amazon (AMZN)",
          "Developer and agent tooling: Microsoft / GitHub (MSFT), Atlassian (TEAM), GitLab (GTLB), ServiceNow (NOW), Salesforce (CRM)",
          "Security and governance: Palo Alto Networks (PANW), CrowdStrike (CRWD), Zscaler (ZS), Okta (OKTA), Cloudflare (NET)"
        ],
        risk: "Agent behavior is not a single inference call. Planning, tool choice, permission checks, and verification determine whether the system can act safely."
      },
      {
        id: "infrastructure",
        name: "Infrastructure View",
        role: "Laptop, command runtime",
        signal: "Behind the friendly agent is a control layer that routes model calls, retrieval, tools, memory, and verification under a latency budget.",
        lede: "CPU orchestration acts as the control plane. GPUs generate tokens. Memory and retrieval provide context. Network and observability decide whether the workflow remains reliable.",
        metrics: [["CPU", "Orchestration control plane"], ["GPU", "Inference and embeddings"], ["Memory", "Retrieval and state"], ["Latency", "Workflow budget"]],
        suppliers: [
          "CPU and orchestration silicon: Intel (INTC), AMD (AMD), Arm (ARM), NVIDIA Grace / networking stack (NVDA), Broadcom (AVGO), Marvell (MRVL)",
          "GPU inference and accelerators: NVIDIA (NVDA), AMD (AMD), Broadcom (AVGO), Alphabet TPU (GOOGL), Amazon Trainium / Inferentia (AMZN)",
          "Data, retrieval, and memory: Snowflake (SNOW), MongoDB (MDB), Elastic (ESTC), Databricks (private), Pinecone (private), Micron (MU), SK hynix (000660.KS), Samsung Electronics (005930.KS)",
          "Observability and security: Datadog (DDOG), Dynatrace (DT), Cloudflare (NET), Palo Alto Networks (PANW), CrowdStrike (CRWD), Okta (OKTA)"
        ],
        risk: "As agent workflows add retrieval, tool calls, memory writes, and verification loops, bottlenecks move into CPU orchestration, network hops, storage, memory, and tail latency."
      }
    ],
    nodes: {
      robot: ["AI Agent", "The agent coordinates planning, tools, memory, and execution."],
      laptop: ["Laptop", "The agent runs tasks through the user's workspace and application surface."],
      terminal: ["Command Window", "The command window represents tool routing, model calls, memory access, and runtime status."],
      workflow: ["Workflow", "The workflow panel shows the agent turning work into connected steps."],
      running: ["Task Running", "The execution panel shows the agent continuing until the task is completed."],
      autoplan: ["Autonomous Planning", "The agent breaks a goal into an executable sequence."],
      tooluse: ["Tool Use", "The agent calls tools and external systems to perform work."],
      memory: ["Memory Management", "The agent uses context and memory to keep the task coherent."],
      continuous: ["Continuous Execution", "The agent loops through steps until the workflow reaches completion."]
    },
    segments: {
      overview: "Agentic AI moves from response to action.",
      core: "The agent core perceives, reasons, plans, and acts.",
      infrastructure: "The infrastructure base coordinates CPU, GPU, memory, retrieval, network, and latency."
    },
    audioBriefings: {
      overview: "Agentic AI is not just about answering prompts. It turns data, documents, APIs, and user requests into workflows that can act. The value chain expands from model platforms to enterprise tools, cloud services, and inference infrastructure.",
      core: "The agent core turns context into action. It perceives inputs, reasons about intent, plans the task, and calls tools to execute. The key question is not only whether the model is smart, but whether each step can be authorized, tracked, verified, and completed safely.",
      infrastructure: "Behind the agent is a coordination layer. CPUs manage the control flow, GPUs run inference, memory and retrieval provide context, and networks keep the workflow reliable. As agents perform more steps, bottlenecks expand beyond GPUs into CPU orchestration, memory, storage, networking, and latency."
    }
  },
  zh: {
    htmlLang: "zh-Hant",
    chapterLabels: { chapter1: "第一章", chapter2: "第二章", chapter3: "第三章" },
    title: "從回應到行動：Agentic AI 如何把模型變成工作流",
    intro: "透過 3D Agent 拆解圖，理解 Agentic AI 如何接收資料、推理、規劃、執行，並依賴模型下方的協調基礎設施。",
    modeListLabel: "Agent 模式",
    insightTitle: "Agentic AI 洞察",
    supplierHeading: "價值鏈角色",
    contextHeading: "關鍵觀察",
    audioLabel: "語音導覽",
    play: "播放",
    pause: "暫停",
    transcript: "逐字稿",
    modes: [
      { id: "overview", name: "Agent 總覽", role: "輸入到行動", signal: "Agentic AI 從回答問題，走向協調資料、工具與商業行動。", lede: "Agent 接收企業資料、文件、API 與使用者互動，再轉成工作流自動化、決策、執行與溝通。", metrics: [["4 inputs", "資料、文件、API、使用者"], ["4 core steps", "感知、推理、規劃、行動"], ["4 outputs", "工作流、決策、執行、溝通"], ["Multi-agent", "委派與協作"]], suppliers: ["模型與 Agent 平台：Microsoft (MSFT)、Alphabet / Google (GOOGL)、Amazon (AMZN)、Meta (META)、OpenAI (private)、Anthropic (private)", "企業工作流與工具：Salesforce (CRM)、ServiceNow (NOW)、Adobe (ADBE)、Atlassian (TEAM)、UiPath (PATH)、GitHub via Microsoft (MSFT)", "雲端與推論平台：Microsoft Azure (MSFT)、AWS (AMZN)、Google Cloud (GOOGL)、Oracle Cloud (ORCL)、Cloudflare (NET)"], risk: "Agentic AI 把工作單位從一次模型回應，變成多步驟工作流。基礎設施分析也從模型速度，擴展到協調可靠度。" },
      { id: "core", name: "Agent Core", role: "感知、推理、規劃、行動", signal: "Agent Core 會先把外部情境轉成可執行步驟，再呼叫模型、工具、記憶與外部系統。", lede: "Perceive 收集訊號，Reason 理解上下文，Plan 排列工作，Act 呼叫工具並輸出結果。", metrics: [["Perceive", "輸入轉成上下文"], ["Reason", "模型理解意圖"], ["Plan", "任務排成步驟"], ["Act", "工具執行工作"]], suppliers: ["前沿模型層：OpenAI (private)、Anthropic (private)、Cohere (private)、Meta (META)、Alphabet (GOOGL)、Amazon (AMZN)", "開發與 Agent 工具：Microsoft / GitHub (MSFT)、Atlassian (TEAM)、GitLab (GTLB)、ServiceNow (NOW)、Salesforce (CRM)", "資安與治理：Palo Alto Networks (PANW)、CrowdStrike (CRWD)、Zscaler (ZS)、Okta (OKTA)、Cloudflare (NET)"], risk: "Agent 行為不是單次推論。規劃、工具選擇、權限檢查與驗證，決定系統能不能安全地行動。" },
      { id: "infrastructure", name: "基礎設施視圖", role: "筆電與指令執行環境", signal: "友善的 Agent 背後，是一層負責模型呼叫、檢索、工具、記憶與驗證的控制系統。", lede: "CPU orchestration 是控制平面，GPU 產生 token，記憶體與檢索提供上下文，網路與可觀測性決定工作流是否穩定。", metrics: [["CPU", "協調控制平面"], ["GPU", "推論與 embeddings"], ["Memory", "檢索與狀態"], ["Latency", "工作流預算"]], suppliers: ["CPU 與協調晶片：Intel (INTC)、AMD (AMD)、Arm (ARM)、NVIDIA Grace / networking stack (NVDA)、Broadcom (AVGO)、Marvell (MRVL)", "GPU 推論與加速器：NVIDIA (NVDA)、AMD (AMD)、Broadcom (AVGO)、Alphabet TPU (GOOGL)、Amazon Trainium / Inferentia (AMZN)", "資料、檢索與記憶體：Snowflake (SNOW)、MongoDB (MDB)、Elastic (ESTC)、Databricks (private)、Pinecone (private)、Micron (MU)、SK hynix (000660.KS)、Samsung Electronics (005930.KS)", "可觀測性與資安：Datadog (DDOG)、Dynatrace (DT)、Cloudflare (NET)、Palo Alto Networks (PANW)、CrowdStrike (CRWD)、Okta (OKTA)"], risk: "當 Agent workflow 增加檢索、工具呼叫、記憶寫入與驗證迴圈，瓶頸會轉向 CPU 協調、網路跳轉、儲存、記憶體與尾端延遲。" }
    ],
    nodes: {
      robot: ["AI Agent", "Agent 負責協調規劃、工具、記憶與執行。"],
      laptop: ["筆記型電腦", "Agent 透過使用者工作環境與應用介面執行任務。"],
      terminal: ["指令視窗", "指令視窗代表工具路由、模型呼叫、記憶存取與執行狀態。"],
      workflow: ["工作流", "工作流面板顯示 Agent 如何把任務拆成連接步驟。"],
      running: ["任務執行中", "執行面板顯示 Agent 持續推進直到任務完成。"],
      autoplan: ["自主規劃", "Agent 將目標拆成可執行順序。"],
      tooluse: ["工具調用", "Agent 呼叫工具與外部系統完成工作。"],
      memory: ["記憶管理", "Agent 使用上下文與記憶維持任務連貫。"],
      continuous: ["持續執行", "Agent 反覆推進步驟直到工作流完成。"]
    },
    segments: {
      overview: "Agentic AI 從回應走向行動。",
      core: "Agent Core 負責感知、推理、規劃與行動。",
      infrastructure: "協調基礎設施連接 CPU、GPU、記憶體、檢索、網路與延遲。"
    },
    audioBriefings: {
      overview: "Agentic AI 不只是回答問題，而是開始把資料、文件、API 和使用者指令，串成可以執行的工作流。它把模型能力變成自動化、決策、行動與協作。價值鏈角色也因此擴大，從模型平台、企業工具，到雲端與推論平台都會參與其中。",
      core: "Agent Core 是代理式 AI 的核心。它先感知外部資訊，再推理使用者意圖，接著規劃任務，最後呼叫工具去執行。真正的關鍵，不只是模型聰不聰明，而是每一步能不能被授權、追蹤、驗證，並安全完成。",
      infrastructure: "在 Agent 背後，是一整套協調基礎設施。CPU 負責控制流程，GPU 負責模型推論，記憶體與檢索系統提供上下文，網路與可觀測性維持穩定。當 Agent 開始多步驟執行，瓶頸會從 GPU 擴展到 CPU、記憶體、儲存、網路與延遲。"
    }
  }
};

["ko", "ja"].forEach((lang) => {
  chapter3Content[lang] = {
    ...chapter3Content.en,
    htmlLang: lang,
    chapterLabels: lang === "ko"
      ? { chapter1: "1장", chapter2: "2장", chapter3: "3장" }
      : { chapter1: "第1章", chapter2: "第2章", chapter3: "第3章" },
    title: lang === "ko"
      ? "응답에서 행동으로: Agentic AI는 모델을 워크플로로 바꾼다"
      : "応答から行動へ：Agentic AI はモデルをワークフローへ変える",
    intro: lang === "ko"
      ? "3D 에이전트 분해도로 Agentic AI가 데이터를 받고, 추론하고, 계획하고, 실행하며, 아래의 조정 인프라에 의존하는 방식을 보여줍니다."
      : "3D エージェント分解図で、Agentic AI がデータを受け取り、推論し、計画し、実行し、下層の調整インフラに依存する仕組みを示します。",
    audioLabel: lang === "ko" ? "오디오 브리핑" : "音声ブリーフィング",
    play: lang === "ko" ? "재생" : "再生",
    pause: lang === "ko" ? "일시정지" : "一時停止",
    transcript: lang === "ko" ? "스크립트" : "文字起こし",
    modeListLabel: lang === "ko" ? "에이전트 모드" : "エージェント・モード",
    insightTitle: lang === "ko" ? "Agentic AI 인사이트" : "Agentic AI インサイト",
    supplierHeading: lang === "ko" ? "가치사슬 역할" : "バリューチェーンの役割",
    contextHeading: lang === "ko" ? "핵심 시사점" : "重要な示唆",
    modes: lang === "ko"
      ? [
          {
            id: "overview",
            name: "에이전트 개요",
            role: "입력에서 행동으로",
            signal: "Agentic AI는 프롬프트에 답하는 단계를 넘어 데이터, 도구, 비즈니스 행동을 조정하는 단계로 이동합니다.",
            lede: "에이전트는 기업 데이터, 문서, API, 사용자 상호작용을 받아 워크플로 자동화, 의사결정, 실행, 협업으로 전환합니다.",
            metrics: [["4개 입력", "데이터, 문서, API, 사용자"], ["4개 핵심 단계", "감지, 추론, 계획, 실행"], ["4개 출력", "워크플로, 결정, 행동, 커뮤니케이션"], ["멀티 에이전트", "위임과 조정"]],
            suppliers: [
              "모델 및 에이전트 플랫폼: Microsoft (MSFT), Alphabet / Google (GOOGL), Amazon (AMZN), Meta (META), OpenAI (private), Anthropic (private)",
              "기업 워크플로와 도구: Salesforce (CRM), ServiceNow (NOW), Adobe (ADBE), Atlassian (TEAM), UiPath (PATH), Microsoft 산하 GitHub (MSFT)",
              "클라우드 및 추론 플랫폼: Microsoft Azure (MSFT), AWS (AMZN), Google Cloud (GOOGL), Oracle Cloud (ORCL), Cloudflare (NET)"
            ],
            risk: "Agentic AI는 작업 단위를 한 번의 모델 응답에서 여러 단계의 워크플로로 바꿉니다. 인프라 분석도 모델 속도에서 조정 신뢰성으로 확장됩니다."
          },
          {
            id: "core",
            name: "에이전트 코어",
            role: "감지, 추론, 계획, 실행",
            signal: "에이전트 코어는 모델, 도구, 메모리, 외부 시스템을 호출하기 전에 외부 맥락을 실행 가능한 단계로 바꿉니다.",
            lede: "감지는 신호를 수집하고, 추론은 맥락을 해석하며, 계획은 작업 순서를 정하고, 실행은 도구를 호출해 결과를 비즈니스 프로세스로 되돌립니다.",
            metrics: [["감지", "입력이 맥락이 됨"], ["추론", "모델이 의도를 해석"], ["계획", "작업이 순서로 정리됨"], ["실행", "도구가 업무를 수행"]],
            suppliers: [
              "프런티어 모델 계층: OpenAI (private), Anthropic (private), Cohere (private), Meta (META), Alphabet (GOOGL), Amazon (AMZN)",
              "개발 및 에이전트 도구: Microsoft / GitHub (MSFT), Atlassian (TEAM), GitLab (GTLB), ServiceNow (NOW), Salesforce (CRM)",
              "보안 및 거버넌스: Palo Alto Networks (PANW), CrowdStrike (CRWD), Zscaler (ZS), Okta (OKTA), Cloudflare (NET)"
            ],
            risk: "에이전트 행동은 단일 추론 호출이 아닙니다. 계획, 도구 선택, 권한 확인, 검증이 시스템이 안전하게 행동할 수 있는지를 결정합니다."
          },
          {
            id: "infrastructure",
            name: "인프라 관점",
            role: "노트북과 명령 실행 환경",
            signal: "친숙한 에이전트 뒤에는 모델 호출, 검색, 도구, 메모리, 검증을 지연시간 예산 안에서 라우팅하는 제어 계층이 있습니다.",
            lede: "CPU 오케스트레이션은 제어 평면 역할을 하고, GPU는 토큰을 생성하며, 메모리와 검색은 맥락을 제공합니다. 네트워크와 관측 가능성은 워크플로가 안정적으로 유지되는지를 좌우합니다.",
            metrics: [["CPU", "오케스트레이션 제어 평면"], ["GPU", "추론과 임베딩"], ["메모리", "검색과 상태"], ["지연시간", "워크플로 예산"]],
            suppliers: [
              "CPU 및 오케스트레이션 실리콘: Intel (INTC), AMD (AMD), Arm (ARM), NVIDIA Grace / networking stack (NVDA), Broadcom (AVGO), Marvell (MRVL)",
              "GPU 추론 및 가속기: NVIDIA (NVDA), AMD (AMD), Broadcom (AVGO), Alphabet TPU (GOOGL), Amazon Trainium / Inferentia (AMZN)",
              "데이터, 검색, 메모리: Snowflake (SNOW), MongoDB (MDB), Elastic (ESTC), Databricks (private), Pinecone (private), Micron (MU), SK hynix (000660.KS), Samsung Electronics (005930.KS)",
              "관측 가능성 및 보안: Datadog (DDOG), Dynatrace (DT), Cloudflare (NET), Palo Alto Networks (PANW), CrowdStrike (CRWD), Okta (OKTA)"
            ],
            risk: "에이전트 워크플로에 검색, 도구 호출, 메모리 쓰기, 검증 루프가 늘어날수록 병목은 CPU 조정, 네트워크 홉, 저장장치, 메모리, 꼬리 지연시간으로 이동합니다."
          }
        ]
      : [
          {
            id: "overview",
            name: "エージェント概要",
            role: "入力から行動へ",
            signal: "Agentic AI は、プロンプトに答える段階から、データ、ツール、ビジネス上の行動を調整する段階へ進みます。",
            lede: "エージェントは企業データ、文書、API、ユーザーとのやり取りを受け取り、ワークフロー自動化、意思決定、実行、協働へ変換します。",
            metrics: [["4つの入力", "データ、文書、API、ユーザー"], ["4つの中核ステップ", "受け取り、理解し、計画し、実行"], ["4つの出力", "ワークフロー、判断、行動、コミュニケーション"], ["マルチエージェント", "委任と協調"]],
            suppliers: [
              "モデルとエージェント基盤：Microsoft (MSFT)、Alphabet / Google (GOOGL)、Amazon (AMZN)、Meta (META)、OpenAI (private)、Anthropic (private)",
              "企業ワークフローとツール：Salesforce (CRM)、ServiceNow (NOW)、Adobe (ADBE)、Atlassian (TEAM)、UiPath (PATH)、Microsoft 傘下の GitHub (MSFT)",
              "クラウドと推論基盤：Microsoft Azure (MSFT)、AWS (AMZN)、Google Cloud (GOOGL)、Oracle Cloud (ORCL)、Cloudflare (NET)"
            ],
            risk: "Agentic AI は、作業単位を一度のモデル応答から多段階のワークフローへ変えます。インフラ分析も、モデル速度だけでなく、協調の信頼性へ広がります。"
          },
          {
            id: "core",
            name: "エージェント中核",
            role: "受け取り、理解し、計画し、実行",
            signal: "エージェント中核は、モデル、ツール、メモリ、外部システムを呼び出す前に、外部の文脈を実行可能な手順へ変換します。",
            lede: "受け取りは信号を集め、理解は文脈を解釈し、計画は作業順序を組み立て、実行はツールを呼び出して結果を業務プロセスへ戻します。",
            metrics: [["受け取り", "入力が文脈になる"], ["理解", "モデルが意図を解釈"], ["計画", "タスクが順序になる"], ["実行", "ツールが作業を実行"]],
            suppliers: [
              "フロンティアモデル層：OpenAI (private)、Anthropic (private)、Cohere (private)、Meta (META)、Alphabet (GOOGL)、Amazon (AMZN)",
              "開発者向け・エージェントツール：Microsoft / GitHub (MSFT)、Atlassian (TEAM)、GitLab (GTLB)、ServiceNow (NOW)、Salesforce (CRM)",
              "セキュリティとガバナンス：Palo Alto Networks (PANW)、CrowdStrike (CRWD)、Zscaler (ZS)、Okta (OKTA)、Cloudflare (NET)"
            ],
            risk: "エージェントの行動は、単発の推論呼び出しではありません。計画、ツール選択、権限確認、検証が、システムが安全に行動できるかを決めます。"
          },
          {
            id: "infrastructure",
            name: "インフラ視点",
            role: "ノートPCとコマンド実行環境",
            signal: "親しみやすいエージェントの背後には、モデル呼び出し、検索、ツール、メモリ、検証を遅延予算内でルーティングする制御層があります。",
            lede: "CPU オーケストレーションは制御プレーンとして働き、GPU はトークンを生成し、メモリと検索は文脈を提供します。ネットワークと可観測性は、ワークフローが安定して続くかを左右します。",
            metrics: [["CPU", "オーケストレーションの制御プレーン"], ["GPU", "推論と埋め込み"], ["メモリ", "検索と状態"], ["遅延", "ワークフロー予算"]],
            suppliers: [
              "CPU とオーケストレーション用シリコン：Intel (INTC)、AMD (AMD)、Arm (ARM)、NVIDIA Grace / networking stack (NVDA)、Broadcom (AVGO)、Marvell (MRVL)",
              "GPU 推論とアクセラレータ：NVIDIA (NVDA)、AMD (AMD)、Broadcom (AVGO)、Alphabet TPU (GOOGL)、Amazon Trainium / Inferentia (AMZN)",
              "データ、検索、メモリ：Snowflake (SNOW)、MongoDB (MDB)、Elastic (ESTC)、Databricks (private)、Pinecone (private)、Micron (MU)、SK hynix (000660.KS)、Samsung Electronics (005930.KS)",
              "可観測性とセキュリティ：Datadog (DDOG)、Dynatrace (DT)、Cloudflare (NET)、Palo Alto Networks (PANW)、CrowdStrike (CRWD)、Okta (OKTA)"
            ],
            risk: "エージェントのワークフローに検索、ツール呼び出し、メモリ書き込み、検証ループが増えるほど、ボトルネックは CPU 協調、ネットワークホップ、ストレージ、メモリ、テールレイテンシへ移ります。"
          }
        ],
    segments: lang === "ko"
      ? {
          overview: "Agentic AI는 응답에서 행동으로 이동합니다.",
          core: "Agent Core는 감지하고, 추론하고, 계획하고, 실행합니다.",
          infrastructure: "조정 인프라는 CPU, GPU, 메모리, 검색, 네트워크, 지연시간을 연결합니다."
        }
      : {
          overview: "Agentic AI は応答から行動へ移ります。",
          core: "Agent Core は受け取り、理解し、計画し、実行します。",
          infrastructure: "調整インフラは CPU、GPU、メモリ、検索、ネットワーク、遅延をつなぎます。"
        },
    audioBriefings: lang === "ko"
      ? {
          overview: "Agentic AI는 단순히 질문에 답하는 것이 아닙니다. 데이터, 문서, API, 사용자 요청을 실행 가능한 워크플로로 바꿉니다. 그래서 가치사슬은 모델 플랫폼을 넘어 기업 도구, 클라우드 서비스, 추론 인프라까지 확장됩니다.",
          core: "Agent Core는 맥락을 행동으로 바꾸는 중심입니다. 입력을 감지하고, 의도를 해석하고, 작업을 계획한 뒤, 도구를 호출해 실행합니다. 중요한 것은 모델의 성능뿐 아니라, 각 단계가 승인되고, 추적되고, 검증되며, 안전하게 완료될 수 있는지입니다.",
          infrastructure: "Agent 뒤에는 조정 인프라가 있습니다. CPU는 흐름을 제어하고, GPU는 추론을 수행하며, 메모리와 검색 시스템은 맥락을 제공합니다. Agent가 여러 단계를 수행할수록 병목은 GPU를 넘어 CPU 조정, 메모리, 저장장치, 네트워크, 지연시간으로 확장됩니다."
        }
      : {
          overview: "Agentic AI は、ただ質問に答えるだけではありません。データ、文書、API、ユーザーの依頼を、実行できるワークフローへ変えます。そのため価値チェーンは、モデル基盤から企業ツール、クラウド、推論インフラへ広がります。",
          core: "Agent Core は、文脈を行動に変える中核です。入力を受け取り、意図を理解し、作業を計画し、ツールを呼び出して実行します。重要なのはモデルの賢さだけでなく、各ステップを承認、追跡、検証し、安全に完了できるかです。",
          infrastructure: "Agent の背後には、全体を調整するインフラがあります。CPU は制御を担当し、GPU は推論を実行し、メモリと検索システムが文脈を支えます。Agent が多段階で動くほど、ボトルネックは GPU だけでなく、CPU、メモリ、ストレージ、ネットワーク、遅延へ広がります。"
        },
    nodes: lang === "ko"
      ? {
          robot: ["AI 에이전트", "에이전트는 계획, 도구, 메모리, 실행을 조정합니다."],
          laptop: ["노트북", "에이전트는 사용자의 작업 환경과 앱 표면에서 작업을 실행합니다."],
          terminal: ["명령 창", "명령 창은 도구 라우팅, 모델 호출, 메모리 접근, 실행 상태를 나타냅니다."],
          workflow: ["워크플로", "워크플로 패널은 에이전트가 작업을 연결된 단계로 바꾸는 과정을 보여줍니다."],
          running: ["작업 실행 중", "실행 패널은 에이전트가 완료될 때까지 작업을 계속 진행하는 모습을 보여줍니다."],
          autoplan: ["자율 계획", "에이전트가 목표를 실행 가능한 순서로 나눕니다."],
          tooluse: ["도구 호출", "에이전트가 도구와 외부 시스템을 호출해 일을 수행합니다."],
          memory: ["메모리 관리", "에이전트가 맥락과 메모리를 사용해 작업의 일관성을 유지합니다."],
          continuous: ["지속 실행", "에이전트가 워크플로가 완료될 때까지 단계를 반복합니다."]
        }
      : {
          robot: ["AI エージェント", "エージェントは計画、ツール、メモリ、実行を調整します。"],
          laptop: ["ノートPC", "エージェントはユーザーの作業環境とアプリ上でタスクを実行します。"],
          terminal: ["コマンド画面", "コマンド画面はツール連携、モデル呼び出し、メモリ取得、実行状態を表します。"],
          workflow: ["ワークフロー", "ワークフローパネルは、エージェントが作業を連結した手順へ変える流れを示します。"],
          running: ["タスク実行中", "実行パネルは、エージェントが完了まで処理を進める様子を示します。"],
          autoplan: ["自律計画", "エージェントが目標を実行可能な順序へ分解します。"],
          tooluse: ["ツール呼び出し", "エージェントがツールや外部システムを呼び出して作業します。"],
          memory: ["メモリ管理", "エージェントが文脈とメモリを使い、タスクの一貫性を保ちます。"],
          continuous: ["継続実行", "エージェントがワークフロー完了まで手順を繰り返します。"]
        }
  };
});

const canvas = document.querySelector("#sceneCanvas");
const appShell = document.querySelector("#appShell");
const rightPanel = document.querySelector("#rightPanel");
const insightContent = document.querySelector("#insightContent");
const labelLayer = document.querySelector("#labelLayer");
const layerList = document.querySelector("#layerList");
const modeList = document.querySelector("#modeList");
const chapterTabs = document.querySelector("#chapterTabs");
const detailTitle = document.querySelector("#detailTitle");
const detailLede = document.querySelector("#detailLede");
const metricGrid = document.querySelector("#metricGrid");
const riskText = document.querySelector("#riskText");
const analysisOpen = document.querySelector("#analysisOpen");
const analysisScrim = document.querySelector("#analysisScrim");
const analysisDrawer = document.querySelector("#analysisDrawer");
const analysisClose = document.querySelector("#analysisClose");
const analysisEyebrow = document.querySelector("#analysisEyebrow");
const analysisTitle = document.querySelector("#analysisTitle");
const analysisLede = document.querySelector("#analysisLede");
const analysisMetricGrid = document.querySelector("#analysisMetricGrid");
const analysisSupplierHeading = document.querySelector("#analysisSupplierHeading");
const analysisSupplierList = document.querySelector("#analysisSupplierList");
const analysisRiskHeading = document.querySelector("#analysisRiskHeading");
const analysisRiskText = document.querySelector("#analysisRiskText");
const aboutOpen = document.querySelector("#aboutOpen");
const aboutScrim = document.querySelector("#aboutScrim");
const aboutDrawer = document.querySelector("#aboutDrawer");
const aboutClose = document.querySelector("#aboutClose");
const aboutEyebrow = document.querySelector("#aboutEyebrow");
const aboutTitle = document.querySelector("#aboutTitle");
const aboutDescription = document.querySelector("#aboutDescription");
const aboutBuilder = document.querySelector("#aboutBuilder");
const aboutFocus = document.querySelector("#aboutFocus");
const aboutAudience = document.querySelector("#aboutAudience");
const aboutUpdated = document.querySelector("#aboutUpdated");
const aboutContact = document.querySelector("#aboutContact");
const activeLayerName = document.querySelector("#activeLayerName");
const activeLayerSignal = document.querySelector("#activeLayerSignal");
const explodeRange = document.querySelector("#explodeRange");
const resetView = document.querySelector("#resetView");
const languageTabs = document.querySelector("#languageTabs");
const languagePanel = document.querySelector("#languagePanel");
const languageMenuButton = document.querySelector("#languageMenuButton");
const audioDock = document.querySelector("#audioDock");
const audioToggle = document.querySelector("#audioToggle");
const audioPlayer = document.querySelector("#audioPlayer");
const audioLabel = document.querySelector("#audioLabel");
const audioSegmentTitle = document.querySelector("#audioSegmentTitle");
const transcriptToggle = document.querySelector("#transcriptToggle");
const transcriptPanel = document.querySelector("#transcriptPanel");
const transcriptText = document.querySelector("#transcriptText");
const staticTextEls = {
  pageTitle: document.querySelector("#pageTitle"),
  introText: document.querySelector("#introText"),
  languageLabel: document.querySelector("#languageLabel"),
  explodeLabel: document.querySelector("#explodeLabel"),
  fileWarningTitle: document.querySelector("#fileWarningTitle"),
  fileWarningText: document.querySelector("#fileWarningText"),
  hintDrag: document.querySelector("#hintDrag"),
  hintZoom: document.querySelector("#hintZoom"),
  hintClick: document.querySelector("#hintClick"),
  insightRevealPrompt: document.querySelector("#insightRevealPrompt"),
  riskHeading: document.querySelector("#riskHeading")
};

const analyticsProject = Object.freeze({
  project_slug: "datacenter-3d",
  project_name: "AI Data Center 3D Explainer"
});

function activeSegmentForTracking() {
  if (activeChapter === "chapter1") return selectedId;
  if (activeChapter === "chapter3") return activeChapter3SegmentId;
  return activeSegmentId;
}

function trackEvent(eventName, params = {}) {
  if (typeof window.gtag !== "function") return;
  window.gtag("event", eventName, {
    ...analyticsProject,
    chapter_id: activeChapter,
    language: activeLang,
    page_path: "/datacenter-3d",
    ...params
  });
}

function trackAudioPlay() {
  trackEvent("audio_play", {
    segment_id: activeSegmentForTracking(),
    audio_type: activeAudioSource() ? "file" : "speech_synthesis"
  });
}

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x080b0f);
scene.fog = new THREE.Fog(0x080b0f, 18, 48);

const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true,
  alpha: false,
  preserveDrawingBuffer: true
});
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 120);
camera.position.set(12, 9, 14);

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.dampingFactor = 0.055;
controls.minDistance = 7;
controls.maxDistance = 32;
controls.maxPolarAngle = Math.PI * 0.49;
controls.target.set(0, 1.1, 0);

const ambient = new THREE.AmbientLight(0x8fb7ff, 0.45);
scene.add(ambient);

const keyLight = new THREE.DirectionalLight(0xffffff, 2.8);
keyLight.position.set(7, 12, 5);
keyLight.castShadow = true;
keyLight.shadow.mapSize.set(2048, 2048);
scene.add(keyLight);

const rimLight = new THREE.PointLight(0x19d3ff, 2.2, 36);
rimLight.position.set(-10, 7, -7);
scene.add(rimLight);

const root = new THREE.Group();
scene.add(root);

const chapter2Root = new THREE.Group();
chapter2Root.visible = false;
scene.add(chapter2Root);

const chapter3Root = new THREE.Group();
chapter3Root.visible = false;
scene.add(chapter3Root);

const groupByLayer = new Map();
const chapter2GroupByNode = new Map();
const chapter3GroupByNode = new Map();
const clickable = [];
const flowLines = [];
const chapter2FlowLines = [];
const chapter2Particles = [];
const chapter3FlowLines = [];
const chapter3Particles = [];
const labels = new Map();
const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();
const speechLangs = { en: "en-US", zh: "zh-TW", ko: "ko-KR", ja: "ja-JP" };

const chapter1AudioContent = {
  zh: {
    power: {
      title: "電力與電網",
      text: "AI 資料中心的第一個瓶頸，往往不是 GPU，而是電力。一座 AI 園區需要數十到上百 MW，建案就會從 IT 採購，變成電網工程。變壓器、開關設備、UPS、備援電源與併網時程，決定算力能不能真的上線。關鍵觀察是：AI 基礎設施的擴張速度，受限於可取得的電力容量與電網穩定度。"
    },
    cooling: {
      title: "冷卻系統",
      text: "第二層是冷卻。AI 伺服器讓機櫃功率密度快速提高，傳統風冷開始接近極限。散熱不再只是機房空調，而是從 GPU 晶片、液冷板、CDU、泵浦、冷水主機到冷卻塔的完整路徑。關鍵觀察是：冷卻效率、接頭可靠度、水質與用水壓力，會直接影響 GPU 叢集的可用率與營運成本。"
    },
    compute: {
      title: "算力設備",
      text: "第三層是算力設備，也是資本支出最密集的核心。但這裡不只是一張 GPU。真正的系統包含 GPU、HBM、先進封裝、伺服器主板、電源、散熱、機櫃與整機測試。關鍵觀察是：算力供給是多條供應鏈同時協作的結果。瓶頸可能出現在晶片，也可能出現在記憶體、封裝、良率或整櫃交付。"
    },
    network: {
      title: "網路互連",
      text: "第四層是網路互連。大型 AI 訓練不是把 GPU 堆在一起就好，GPU 之間還需要低延遲、高頻寬的資料交換。交換器、NIC、DPU、光模組、光纖與拓樸設計，都會影響叢集利用率。關鍵觀察是：AI 訓練叢集本質上是網路化的算力系統，延遲與封包效率會變成算力效率的一部分。"
    },
    site: {
      title: "土地與建築",
      text: "第五層是土地與建築。資料中心不是可以快速複製的軟體，而是多年期的重資產基礎建設。一座 AI 園區能不能落地，取決於土地、電力距離、水資源、環評、法規、施工能力與客戶合約。關鍵觀察是：真正的供給不是土地面積，而是可被批准、可施工、可供電、可冷卻，並能準時交付的容量。"
    },
    ops: {
      title: "營運與平台",
      text: "第六層是營運與平台。基礎設施只有被調度、計費、監控、維護與治理之後，才會變成真正可銷售的算力服務。這一層把 GPU、機房、網路與能源，轉成雲端 GPU、訓練平台與推論服務。關鍵觀察是：當硬體供給增加，差異化會從誰有卡，轉向誰能把卡穩定、合規、高利用率地交付給客戶。"
    }
  },
  en: {
    power: {
      title: "Power & Grid",
      text: "The first bottleneck in an AI data center is often not the GPU. It is power. When an AI campus needs tens or even hundreds of megawatts, the project becomes a grid infrastructure challenge. Transformers, switchgear, UPS systems, backup power, and interconnection timelines decide when compute can actually go online. The key finding: AI infrastructure growth is constrained by available power and grid reliability."
    },
    cooling: {
      title: "Cooling Systems",
      text: "The second layer is cooling. AI servers are pushing rack power density higher, and traditional air cooling is approaching its limits. Thermal management is no longer just room air conditioning. It is a full heat path from the GPU chip to cold plates, CDUs, pumps, chillers, and cooling towers. The key finding: cooling efficiency, connector reliability, water quality, and water availability directly shape cluster uptime and operating cost."
    },
    compute: {
      title: "Compute Equipment",
      text: "The third layer is compute equipment, the most capital-intensive part of the AI data center. But this is not just about a GPU. The real system includes GPUs, HBM, advanced packaging, server boards, power, cooling, racks, and system-level testing. The key finding: compute supply depends on several supply chains working together. The bottleneck may sit in chips, memory, packaging, yield, or rack-scale delivery."
    },
    network: {
      title: "Network Interconnect",
      text: "The fourth layer is network interconnect. Large AI training is not simply a pile of GPUs. GPUs need low-latency, high-bandwidth data exchange with one another. Switches, NICs, DPUs, optical modules, fiber, and topology all affect cluster utilization. The key finding: an AI training cluster is a networked compute system, where latency and packet efficiency become part of compute efficiency."
    },
    site: {
      title: "Site & Construction",
      text: "The fifth layer is site and construction. A data center is not software that can be copied instantly. It is multi-year, heavy infrastructure. Whether an AI campus can be built depends on land, power distance, water, permitting, regulation, construction capacity, and customer contracts. The key finding: real supply is not land area. It is approved, buildable, powered, cooled, and deliverable capacity."
    },
    ops: {
      title: "Operations & Platform",
      text: "The sixth layer is operations and platform. Infrastructure becomes a sellable compute service only after it can be scheduled, billed, monitored, maintained, and governed. This layer turns GPUs, facilities, networks, and energy into GPU cloud, training platforms, and inference services. The key finding: as hardware supply expands, differentiation shifts from who has GPUs to who can deliver them reliably, compliantly, and at high utilization."
    }
  },
  ko: {
    power: {
      title: "전력 및 전력망",
      text: "AI 데이터센터의 첫 번째 병목은 GPU가 아니라 전력인 경우가 많습니다. 하나의 AI 캠퍼스가 수십에서 수백 MW를 요구하면, 프로젝트는 IT 구매가 아니라 전력망 인프라 문제가 됩니다. 변압기, 스위치기어, UPS, 예비 전원, 계통 연결 일정이 실제 컴퓨팅 가동 시점을 결정합니다. 핵심은 AI 인프라 확장 속도가 확보 가능한 전력과 전력망 안정성에 의해 제한된다는 점입니다."
    },
    cooling: {
      title: "냉각 시스템",
      text: "두 번째 층은 냉각입니다. AI 서버는 랙 전력 밀도를 빠르게 높이고 있으며, 전통적인 공랭 방식은 한계에 가까워지고 있습니다. 열 관리는 더 이상 단순한 전산실 공조가 아닙니다. GPU 칩에서 콜드 플레이트, CDU, 펌프, 칠러, 냉각탑으로 이어지는 전체 열 경로입니다. 핵심은 냉각 효율, 접속부 신뢰성, 수질, 물 사용 압력이 클러스터 가동률과 운영비에 직접 영향을 준다는 점입니다."
    },
    compute: {
      title: "컴퓨팅 장비",
      text: "세 번째 층은 컴퓨팅 장비이며, AI 데이터센터에서 가장 자본 집약적인 핵심입니다. 하지만 이것은 GPU 한 장의 문제가 아닙니다. 실제 시스템은 GPU, HBM, 첨단 패키징, 서버 보드, 전원, 냉각, 랙, 그리고 시스템 테스트로 구성됩니다. 핵심은 컴퓨팅 공급이 여러 공급망의 동시 협업 결과라는 점입니다. 병목은 칩, 메모리, 패키징, 수율, 또는 랙 단위 납품에서 발생할 수 있습니다."
    },
    network: {
      title: "네트워크 인터커넥트",
      text: "네 번째 층은 네트워크 인터커넥트입니다. 대규모 AI 훈련은 GPU를 많이 쌓는 것만으로 충분하지 않습니다. GPU 사이에는 낮은 지연시간과 높은 대역폭의 데이터 교환이 필요합니다. 스위치, NIC, DPU, 광모듈, 광섬유, 토폴로지가 모두 클러스터 이용률에 영향을 줍니다. 핵심은 AI 훈련 클러스터가 네트워크화된 컴퓨팅 시스템이며, 지연시간과 패킷 효율이 곧 컴퓨팅 효율의 일부가 된다는 점입니다."
    },
    site: {
      title: "부지와 건설",
      text: "다섯 번째 층은 부지와 건설입니다. 데이터센터는 즉시 복제할 수 있는 소프트웨어가 아니라, 수년에 걸친 중자산 인프라입니다. AI 캠퍼스가 실제로 지어질 수 있는지는 토지, 전력 접근성, 물, 인허가, 규제, 시공 능력, 고객 계약에 달려 있습니다. 핵심은 진짜 공급이 토지 면적이 아니라 승인되고, 지을 수 있고, 전력을 공급받고, 냉각 가능하며, 제때 납품 가능한 용량이라는 점입니다."
    },
    ops: {
      title: "운영과 플랫폼",
      text: "여섯 번째 층은 운영과 플랫폼입니다. 인프라는 스케줄링, 과금, 모니터링, 유지보수, 거버넌스를 거친 뒤에야 판매 가능한 컴퓨팅 서비스가 됩니다. 이 층은 GPU, 시설, 네트워크, 에너지를 GPU 클라우드, 훈련 플랫폼, 추론 서비스로 전환합니다. 핵심은 하드웨어 공급이 늘어날수록 차별화가 누가 GPU를 보유했는가에서, 누가 안정적이고 규정을 준수하며 높은 이용률로 제공할 수 있는가로 이동한다는 점입니다."
    }
  },
  ja: {
    power: {
      title: "電力と電力網",
      text: "AI データセンターの最初のボトルネックは、GPU ではなく電力であることが少なくありません。AI キャンパスが数十から数百 MW を必要とすると、案件は IT 調達ではなく電力網インフラの課題になります。変圧器、開閉装置、UPS、バックアップ電源、系統接続の時期が、計算能力を実際に稼働できるかを左右します。重要なのは、AI インフラの成長速度が、利用可能な電力と電力網の安定性に制約されることです。"
    },
    cooling: {
      title: "冷却システム",
      text: "第 2 の層は冷却です。AI サーバーはラックの電力密度を急速に高めており、従来の空冷は限界に近づいています。熱管理は、もはや機械室の空調だけではありません。GPU チップからコールドプレート、CDU、ポンプ、チラー、冷却塔まで続く熱の経路全体です。重要なのは、冷却効率、接続部の信頼性、水質、水利用の制約が、クラスターの稼働率と運用コストを直接左右することです。"
    },
    compute: {
      title: "計算設備",
      text: "第 3 の層は計算設備であり、AI データセンターの中で最も資本集約的な中核です。しかし、これは GPU だけの話ではありません。実際のシステムには、GPU、HBM、先端パッケージング、サーバーボード、電源、冷却、ラック、システムテストが含まれます。重要なのは、計算能力の供給が複数のサプライチェーンの連携によって成り立つことです。ボトルネックは、チップ、メモリ、パッケージング、歩留まり、またはラック単位の納入に現れます。"
    },
    network: {
      title: "ネットワーク相互接続",
      text: "第 4 の層はネットワーク相互接続です。大規模な AI 学習は、GPU を積み上げるだけでは成立しません。GPU 同士には、低遅延で高帯域のデータ交換が必要です。スイッチ、NIC、DPU、光モジュール、光ファイバー、トポロジーの設計が、クラスター利用率に影響します。重要なのは、AI 学習クラスターがネットワーク化された計算システムであり、遅延とパケット効率が計算効率の一部になることです。"
    },
    site: {
      title: "用地と建設",
      text: "第 5 の層は用地と建設です。データセンターはすぐに複製できるソフトウェアではなく、数年単位の重いインフラです。AI キャンパスを実際に建設できるかは、土地、電力への距離、水資源、許認可、規制、施工能力、顧客契約に左右されます。重要なのは、本当の供給が土地面積ではなく、承認され、建設でき、電力と冷却を確保し、期限内に引き渡せる容量であることです。"
    },
    ops: {
      title: "運用とプラットフォーム",
      text: "第 6 の層は運用とプラットフォームです。インフラは、スケジューリング、課金、監視、保守、ガバナンスができて初めて販売可能な計算サービスになります。この層は、GPU、施設、ネットワーク、エネルギーを、GPU クラウド、学習プラットフォーム、推論サービスへ変換します。重要なのは、ハードウェア供給が増えるほど、差別化が GPU を持っているかではなく、安定的に、コンプライアンスを満たし、高い利用率で提供できるかへ移ることです。"
    }
  }
};

// Static ElevenLabs exports. Missing languages fall back to browser speech synthesis.
const chapter1AudioSources = {
  "en-power": "audio/chapter1/en-power.mp3",
  "en-cooling": "audio/chapter1/en-cooling.mp3",
  "en-compute": "audio/chapter1/en-compute.mp3",
  "en-network": "audio/chapter1/en-network.mp3",
  "en-site": "audio/chapter1/en-site.mp3",
  "en-ops": "audio/chapter1/en-ops.mp3",
  "zh-power": "audio/chapter1/zh-power.mp3?v=brb-20260617",
  "zh-cooling": "audio/chapter1/zh-cooling.mp3?v=brb-20260617",
  "zh-compute": "audio/chapter1/zh-compute.mp3?v=brb-20260617",
  "zh-network": "audio/chapter1/zh-network.mp3?v=brb-20260617",
  "zh-site": "audio/chapter1/zh-site.mp3?v=brb-20260617",
  "zh-ops": "audio/chapter1/zh-ops.mp3?v=brb-20260617",
  "ko-power": "audio/chapter1/ko-power.mp3?v=uy-20260617",
  "ko-cooling": "audio/chapter1/ko-cooling.mp3?v=uy-20260617",
  "ko-compute": "audio/chapter1/ko-compute.mp3?v=uy-20260617",
  "ko-network": "audio/chapter1/ko-network.mp3?v=uy-20260617",
  "ko-site": "audio/chapter1/ko-site.mp3?v=uy-20260617",
  "ko-ops": "audio/chapter1/ko-ops.mp3?v=uy-20260617",
  "ja-power": "audio/chapter1/ja-power.mp3?v=t7-20260617",
  "ja-cooling": "audio/chapter1/ja-cooling.mp3?v=t7-20260617",
  "ja-compute": "audio/chapter1/ja-compute.mp3?v=t7-20260617",
  "ja-network": "audio/chapter1/ja-network.mp3?v=t7-20260617",
  "ja-site": "audio/chapter1/ja-site.mp3?v=t7-20260617",
  "ja-ops": "audio/chapter1/ja-ops.mp3?v=t7-20260617"
};
const chapter2AudioSources = {
  "en-compare": "audio/chapter2/en-compare.mp3",
  "en-training": "audio/chapter2/en-training.mp3",
  "en-inference": "audio/chapter2/en-inference.mp3",
  "zh-compare": "audio/chapter2/zh-compare.mp3?v=brb-20260617",
  "zh-training": "audio/chapter2/zh-training.mp3?v=brb-20260617",
  "zh-inference": "audio/chapter2/zh-inference.mp3?v=brb-20260617",
  "ko-compare": "audio/chapter2/ko-compare.mp3?v=uy-20260617",
  "ko-training": "audio/chapter2/ko-training.mp3?v=uy-20260617",
  "ko-inference": "audio/chapter2/ko-inference.mp3?v=uy-20260617",
  "ja-compare": "audio/chapter2/ja-compare.mp3?v=t7-20260617",
  "ja-training": "audio/chapter2/ja-training.mp3?v=t7-20260617",
  "ja-inference": "audio/chapter2/ja-inference.mp3?v=t7-20260617"
};
const chapter3AudioSources = {
  "en-overview": "audio/chapter3/en-overview.mp3",
  "en-core": "audio/chapter3/en-core.mp3",
  "en-infrastructure": "audio/chapter3/en-infrastructure.mp3",
  "zh-overview": "audio/chapter3/zh-overview.mp3?v=brb-20260617",
  "zh-core": "audio/chapter3/zh-core.mp3?v=brb-20260617",
  "zh-infrastructure": "audio/chapter3/zh-infrastructure.mp3?v=brb-20260617",
  "ko-overview": "audio/chapter3/ko-overview.mp3?v=uy-20260617-r2",
  "ko-core": "audio/chapter3/ko-core.mp3?v=uy-20260617-r2",
  "ko-infrastructure": "audio/chapter3/ko-infrastructure.mp3?v=uy-20260617-r2",
  "ja-overview": "audio/chapter3/ja-overview.mp3?v=t7-20260617",
  "ja-core": "audio/chapter3/ja-core.mp3?v=t7-20260617",
  "ja-infrastructure": "audio/chapter3/ja-infrastructure.mp3?v=t7-20260617"
};

let activeChapter = "chapter1";
let selectedId = "compute";
let selectedMode = "compare";
let selectedNode = "compare";
let activeSegmentId = "compare";
let selectedChapter3Mode = "overview";
let selectedChapter3Node = "overview";
let activeChapter3SegmentId = "overview";
let audioPlaying = false;
let currentUtterance = null;
let explodeTarget = Number(explodeRange.value) / 100;
let explodeCurrent = explodeTarget;
let hovered = null;
let insightsRevealed = false;

const compactPositions = {
  site: new THREE.Vector3(0, 0, 0),
  power: new THREE.Vector3(-3.2, 0.24, 0.4),
  cooling: new THREE.Vector3(3.05, 0.2, 0.1),
  compute: new THREE.Vector3(0, 0.62, 0),
  network: new THREE.Vector3(0, 1.64, -0.12),
  ops: new THREE.Vector3(0, 2.48, 0.12)
};

const explodedPositions = {
  site: new THREE.Vector3(0, -1.15, 0),
  power: new THREE.Vector3(-6.8, 0.4, 0.7),
  cooling: new THREE.Vector3(6.7, 0.36, 0.4),
  compute: new THREE.Vector3(0, 1.15, 0),
  network: new THREE.Vector3(0, 3.15, -2.1),
  ops: new THREE.Vector3(0, 5.05, 1.55)
};

const colorSchemes = {
  minimal: {
    uiAccent: 0xb8e7ff,
    uiAccent2: 0xe8edf2,
    background: 0x090d12,
    rim: 0xb8e7ff,
    layerColors: {
      power: 0xd7d2c7,
      cooling: 0xc9dbe3,
      compute: 0xb6d1de,
      network: 0xc8dfca,
      site: 0xc6cbd2,
      ops: 0xdacddb
    },
    roles: {
      building: 0xc3c9cf,
      road: 0x424951,
      glass: 0x8fa3b3,
      cabinet: 0xaeb8c2,
      darkPanel: 0x111820,
      circuit: 0x81949a,
      chip: 0xcad8df,
      copper: 0xb8a782,
      pipe: 0x9ed3e2,
      ceramic: 0xf0eadc,
      steel: 0xb9c0c8,
      fin: 0xa6adb4,
      fan: 0xd5dde4,
      optic: 0xc7d8d1,
      cable: 0xd2c5a9,
      screen: 0x9fb8c8,
      indicator: 0xcff7e8,
      cloud: 0xd6c8d5,
      layer: 0xd5dbe0
    }
  },
  industrial: {
    uiAccent: 0x19d3ff,
    uiAccent2: 0xe1ff5b,
    background: 0x080b0f,
    rim: 0x19d3ff,
    layerColors: {
      power: 0xb88a2d,
      cooling: 0x3aa9d8,
      compute: 0x19758f,
      network: 0x55c66a,
      site: 0x9da8b2,
      ops: 0xc65d83
    },
    roles: {
      building: 0xaeb7bf,
      road: 0x363f48,
      glass: 0x5f7e95,
      cabinet: 0x33404a,
      darkPanel: 0x071018,
      circuit: 0x17424a,
      chip: 0x7de9ff,
      copper: 0xc8863a,
      pipe: 0x22b8ff,
      ceramic: 0xf3e6c4,
      steel: 0xb7bcc4,
      fin: 0x8b7440,
      fan: 0xd8f4ff,
      optic: 0xb9ffd0,
      cable: 0xffc34d,
      screen: 0x1a3d4f,
      indicator: 0x76ff7a,
      cloud: 0xff6b9a,
      layer: 0x19d3ff
    }
  },
  rich: {
    uiAccent: 0x3ee7ff,
    uiAccent2: 0xffd166,
    background: 0x070a13,
    rim: 0x7df9ff,
    layerColors: {
      power: 0xffb84d,
      cooling: 0x2ed8ff,
      compute: 0x19d3ff,
      network: 0x76ff7a,
      site: 0xdbe4ef,
      ops: 0xff6bcb
    },
    roles: {
      building: 0xdbe4ef,
      road: 0x4c5663,
      glass: 0x73c7ff,
      cabinet: 0x1b2a38,
      darkPanel: 0x050a10,
      circuit: 0x1be7d5,
      chip: 0xffff9d,
      copper: 0xff9f43,
      pipe: 0x2ed8ff,
      ceramic: 0xfff2d2,
      steel: 0xd5dde8,
      fin: 0xffd166,
      fan: 0xf4fbff,
      optic: 0x9effa8,
      cable: 0xffd166,
      screen: 0x387cff,
      indicator: 0x9cff7f,
      cloud: 0xff6bcb,
      layer: 0x3ee7ff
    }
  }
};

let activeLang = "en";
let activeScheme = "rich";

const languageShortLabels = {
  en: "EN",
  zh: "中文",
  ko: "한국어",
  ja: "日本語"
};

function mat(color, roughness = 0.58, metalness = 0.18, opacity = 1) {
  return new THREE.MeshStandardMaterial({
    color,
    roughness,
    metalness,
    transparent: opacity < 1,
    opacity
  });
}

function materialInstance(material) {
  const clone = material.clone();
  clone.userData.originalColor = clone.color.getHex();
  clone.userData.originalRoughness = clone.roughness;
  clone.userData.originalMetalness = clone.metalness;
  clone.userData.originalOpacity = clone.opacity;
  return clone;
}

const materials = {
  shell: mat(0x2a313a, 0.7, 0.1),
  glass: mat(0x54708c, 0.3, 0.35, 0.35),
  dark: mat(0x121922, 0.74, 0.2),
  floor: mat(0x1a2028, 0.8, 0.08),
  line: mat(0xeef5ff, 0.4, 0.2)
};

function layerMaterial(id, opacity = 1) {
  const layer = layers.find((item) => item.id === id);
  return mat(layer.color, 0.48, 0.24, opacity);
}

function makeBox(id, name, size, position, material, cast = true) {
  const geometry = new THREE.BoxGeometry(size[0], size[1], size[2]);
  const mesh = new THREE.Mesh(geometry, materialInstance(material));
  mesh.name = name;
  mesh.position.set(position[0], position[1], position[2]);
  mesh.castShadow = cast;
  mesh.receiveShadow = true;
  mesh.userData.layerId = id;
  clickable.push(mesh);
  return mesh;
}

function makeCylinder(id, name, radiusTop, radiusBottom, height, position, material, radial = 32) {
  const geometry = new THREE.CylinderGeometry(radiusTop, radiusBottom, height, radial);
  const mesh = new THREE.Mesh(geometry, materialInstance(material));
  mesh.name = name;
  mesh.position.set(position[0], position[1], position[2]);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  mesh.userData.layerId = id;
  clickable.push(mesh);
  return mesh;
}

function makeSphere(id, name, radius, position, material, segments = 24) {
  const geometry = new THREE.SphereGeometry(radius, segments, Math.max(12, Math.floor(segments / 2)));
  const mesh = new THREE.Mesh(geometry, materialInstance(material));
  mesh.name = name;
  mesh.position.set(position[0], position[1], position[2]);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  mesh.userData.layerId = id;
  clickable.push(mesh);
  return mesh;
}

function makeTorus(id, name, radius, tube, position, material, radial = 28) {
  const geometry = new THREE.TorusGeometry(radius, tube, 8, radial);
  const mesh = new THREE.Mesh(geometry, materialInstance(material));
  mesh.name = name;
  mesh.position.set(position[0], position[1], position[2]);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  mesh.userData.layerId = id;
  clickable.push(mesh);
  return mesh;
}

function makePipe(id, name, points, color, radius = 0.035) {
  const curve = new THREE.CatmullRomCurve3(points);
  const geometry = new THREE.TubeGeometry(curve, 36, radius, 8, false);
  const mesh = new THREE.Mesh(geometry, materialInstance(mat(color, 0.38, 0.55)));
  mesh.name = name;
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  mesh.userData.layerId = id;
  clickable.push(mesh);
  return mesh;
}

function makeLine(points, color, dashed = true) {
  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  const material = dashed
    ? new THREE.LineDashedMaterial({ color, dashSize: 0.18, gapSize: 0.12, transparent: true, opacity: 0.8 })
    : new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.58 });
  const line = new THREE.Line(geometry, material);
  if (dashed) line.computeLineDistances();
  flowLines.push(line);
  return line;
}

function addChapter2Node(id, mode, position) {
  const group = new THREE.Group();
  group.userData = {
    chapter: "chapter2",
    nodeId: id,
    mode,
    base: position.clone()
  };
  group.position.copy(position);
  chapter2GroupByNode.set(id, group);
  chapter2Root.add(group);
  return group;
}

function makeChapter2Box(nodeId, name, size, position, material) {
  const geometry = new THREE.BoxGeometry(size[0], size[1], size[2]);
  const mesh = new THREE.Mesh(geometry, materialInstance(material));
  mesh.name = name;
  mesh.position.set(position[0], position[1], position[2]);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  mesh.userData = { chapter: "chapter2", nodeId };
  clickable.push(mesh);
  return mesh;
}

function makeChapter2Cylinder(nodeId, name, radiusTop, radiusBottom, height, position, material, radial = 32) {
  const geometry = new THREE.CylinderGeometry(radiusTop, radiusBottom, height, radial);
  const mesh = new THREE.Mesh(geometry, materialInstance(material));
  mesh.name = name;
  mesh.position.set(position[0], position[1], position[2]);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  mesh.userData = { chapter: "chapter2", nodeId };
  clickable.push(mesh);
  return mesh;
}

function makeChapter2Sphere(nodeId, name, radius, position, material, segments = 20) {
  const geometry = new THREE.SphereGeometry(radius, segments, Math.max(10, Math.floor(segments / 2)));
  const mesh = new THREE.Mesh(geometry, materialInstance(material));
  mesh.name = name;
  mesh.position.set(position[0], position[1], position[2]);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  mesh.userData = { chapter: "chapter2", nodeId };
  clickable.push(mesh);
  return mesh;
}

function makeChapter2Line(mode, points, color, speed = 0.5) {
  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  const material = new THREE.LineDashedMaterial({
    color,
    dashSize: mode === "training" ? 0.34 : 0.11,
    gapSize: mode === "training" ? 0.16 : 0.14,
    transparent: true,
    opacity: 0.78
  });
  const line = new THREE.Line(geometry, material);
  line.computeLineDistances();
  line.userData = { chapter: "chapter2", mode, speed };
  chapter2FlowLines.push(line);
  chapter2Root.add(line);
  return line;
}

function makeChapter2Particle(mode, points, color, radius = 0.055) {
  const particle = makeChapter2Sphere(mode === "training" ? "trainGpu" : "requests", "workload particle", radius, [0, 0, 0], mat(color, 0.22, 0.1), 12);
  particle.userData.chapter = "chapter2";
  particle.userData.mode = mode;
  particle.userData.path = points;
  particle.userData.offset = chapter2Particles.length * 0.13;
  chapter2Particles.push(particle);
  chapter2Root.add(particle);
  return particle;
}

function addChapter3Node(id, position) {
  const group = new THREE.Group();
  group.userData = { chapter: "chapter3", nodeId: id, base: position.clone() };
  group.position.copy(position);
  chapter3GroupByNode.set(id, group);
  chapter3Root.add(group);
  return group;
}

function makeChapter3Box(nodeId, name, size, position, material) {
  const geometry = new THREE.BoxGeometry(size[0], size[1], size[2]);
  const mesh = new THREE.Mesh(geometry, materialInstance(material));
  mesh.name = name;
  mesh.position.set(position[0], position[1], position[2]);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  mesh.userData = { chapter: "chapter3", nodeId };
  clickable.push(mesh);
  return mesh;
}

function makeChapter3Cylinder(nodeId, name, radiusTop, radiusBottom, height, position, material, radial = 32) {
  const geometry = new THREE.CylinderGeometry(radiusTop, radiusBottom, height, radial);
  const mesh = new THREE.Mesh(geometry, materialInstance(material));
  mesh.name = name;
  mesh.position.set(position[0], position[1], position[2]);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  mesh.userData = { chapter: "chapter3", nodeId };
  clickable.push(mesh);
  return mesh;
}

function makeChapter3Sphere(nodeId, name, radius, position, material, segments = 20) {
  const geometry = new THREE.SphereGeometry(radius, segments, Math.max(10, Math.floor(segments / 2)));
  const mesh = new THREE.Mesh(geometry, materialInstance(material));
  mesh.name = name;
  mesh.position.set(position[0], position[1], position[2]);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  mesh.userData = { chapter: "chapter3", nodeId };
  clickable.push(mesh);
  return mesh;
}

function makeChapter3Torus(nodeId, name, radius, tube, position, material, radial = 12, tubular = 36, arc = Math.PI * 2) {
  const geometry = new THREE.TorusGeometry(radius, tube, radial, tubular, arc);
  const mesh = new THREE.Mesh(geometry, materialInstance(material));
  mesh.name = name;
  mesh.position.set(position[0], position[1], position[2]);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  mesh.userData = { chapter: "chapter3", nodeId };
  clickable.push(mesh);
  return mesh;
}

function makeChapter3Line(points, color, speed = 0.42, role = "overview") {
  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  const material = new THREE.LineDashedMaterial({
    color,
    dashSize: 0.1,
    gapSize: 0.22,
    transparent: true,
    opacity: 0.32
  });
  const line = new THREE.Line(geometry, material);
  line.computeLineDistances();
  line.userData = { chapter: "chapter3", speed, role };
  chapter3FlowLines.push(line);
  chapter3Root.add(line);
  return line;
}

function makeChapter3Particle(nodeId, points, color, radius = 0.045, role = "overview") {
  const particle = makeChapter3Sphere(nodeId, "agent flow particle", radius, [0, 0, 0], mat(color, 0.22, 0.1), 12);
  particle.userData.chapter = "chapter3";
  particle.userData.path = points;
  particle.userData.offset = chapter3Particles.length * 0.17;
  particle.userData.role = role;
  chapter3Particles.push(particle);
  chapter3Root.add(particle);
  return particle;
}

function addPanelGrid(group, id, origin, columns, rows, gap, size, material) {
  for (let row = 0; row < rows; row += 1) {
    for (let col = 0; col < columns; col += 1) {
      group.add(
        makeBox(
          id,
          "立面模組",
          size,
          [origin[0] + col * gap[0], origin[1] + row * gap[1], origin[2]],
          material,
          false
        )
      );
    }
  }
}

function addFan(group, id, position, radius, color) {
  const ring = makeTorus(id, "風扇外圈", radius, 0.018, position, mat(color, 0.45, 0.45), 36);
  ring.rotation.x = Math.PI / 2;
  group.add(ring);
  for (let i = 0; i < 4; i += 1) {
    const blade = makeBox(id, "風扇葉片", [radius * 0.75, 0.018, 0.08], position, mat(0xd8f4ff, 0.34, 0.38), false);
    blade.rotation.y = (Math.PI / 4) + i * (Math.PI / 2);
    group.add(blade);
  }
}

function addRibbedInsulator(group, position) {
  for (let i = 0; i < 5; i += 1) {
    const rib = makeCylinder("power", "瓷套管波紋裙邊", 0.085, 0.085, 0.018, [position[0], position[1] + i * 0.07, position[2]], mat(0xf3e6c4, 0.32, 0.08), 18);
    group.add(rib);
  }
}

function addLouverStack(group, id, origin, count, width, color) {
  for (let i = 0; i < count; i += 1) {
    const blade = makeBox(id, "百葉散熱片", [width, 0.018, 0.055], [origin[0], origin[1] + i * 0.07, origin[2]], mat(color, 0.44, 0.24), false);
    blade.rotation.x = -0.26;
    group.add(blade);
  }
}

function addRackHandles(group, id, x, z) {
  for (let i = 0; i < 5; i += 1) {
    group.add(makeBox(id, "伺服器抽屜把手", [0.34, 0.018, 0.028], [x, 0.25 + i * 0.31, z + 0.472], mat(0xd8edf5, 0.38, 0.36), false));
  }
}

function addCableBundle(group, id, x, z) {
  for (let i = 0; i < 3; i += 1) {
    group.add(
      makePipe(
        id,
        "後方線束",
        [
          new THREE.Vector3(x - 0.18 + i * 0.18, 1.44, z - 0.46),
          new THREE.Vector3(x - 0.08 + i * 0.12, 1.08, z - 0.75),
          new THREE.Vector3(x + 0.08, 0.72, z - 0.96)
        ],
        i === 1 ? 0xffc34d : 0x22b8ff,
        0.012
      )
    );
  }
}

function addLayerGroup(id) {
  const group = new THREE.Group();
  group.userData.layerId = id;
  group.userData.compact = compactPositions[id];
  group.userData.exploded = explodedPositions[id];
  groupByLayer.set(id, group);
  root.add(group);
  return group;
}

function createSite() {
  const group = addLayerGroup("site");
  const facade = mat(0xb8c4cf, 0.58, 0.16);
  const windowMat = mat(0x5f7e95, 0.28, 0.42, 0.48);
  group.add(makeBox("site", "園區基座", [9.2, 0.24, 6.2], [0, -0.12, 0], materials.floor));
  group.add(makeBox("site", "資料中心機房量體", [6.6, 1.18, 4.0], [0, 0.54, 0], facade));
  group.add(makeBox("site", "白空間樓板", [5.8, 0.12, 3.25], [0, 1.18, 0], materials.shell));
  group.add(makeBox("site", "屋頂機電平台", [5.4, 0.12, 3.0], [0, 1.38, 0], mat(0x38414b, 0.65, 0.12)));
  addPanelGrid(group, "site", [-2.65, 0.28, 2.03], 8, 3, [0.75, 0.28], [0.46, 0.12, 0.035], windowMat);
  addPanelGrid(group, "site", [-2.65, 0.28, -2.03], 8, 3, [0.75, 0.28], [0.46, 0.12, 0.035], windowMat);
  group.add(makeBox("site", "施工道路", [8.6, 0.05, 0.34], [0, 0.06, 3.28], mat(0x353d45, 0.75, 0.05)));
  group.add(makeBox("site", "機電管廊", [0.36, 0.12, 5.4], [-4.25, 0.08, 0], mat(0x3f4852, 0.68, 0.12)));
  group.add(makeBox("site", "裝卸碼頭", [1.4, 0.28, 0.6], [2.3, 0.08, 2.58], mat(0x5c6670, 0.62, 0.14)));
  for (let i = 0; i < 5; i += 1) {
    group.add(makeBox("site", "屋頂 CRAC/機電箱", [0.56, 0.28, 0.36], [-2.0 + i * 1.0, 1.58, -1.05], mat(0x77838f, 0.46, 0.28)));
    addFan(group, "site", [-2.0 + i * 1.0, 1.75, -1.05], 0.16, 0xd4dde5);
  }
  group.add(makePipe("site", "屋頂冷凍水主管", [new THREE.Vector3(-2.6, 1.62, 0.82), new THREE.Vector3(0, 1.68, 0.82), new THREE.Vector3(2.6, 1.62, 0.82)], 0x8aa7b8, 0.025));
  group.add(makeBox("site", "資料中心入口雨棚", [1.05, 0.08, 0.52], [-2.15, 0.18, 2.32], mat(0x6f7b86, 0.52, 0.18), false));
  const tank = makeCylinder("site", "消防/蓄水槽", 0.42, 0.42, 0.72, [-3.1, 0.45, -2.28], mat(0x7d8a96, 0.5, 0.28), 36);
  group.add(tank);
  for (let i = 0; i < 9; i += 1) {
    group.add(makeBox("site", "圍籬立柱", [0.045, 0.45, 0.045], [-4.25 + i * 1.05, 0.25, -3.0], mat(0x8c98a5, 0.6, 0.2), false));
  }
  return group;
}

function createPower() {
  const group = addLayerGroup("power");
  const material = layerMaterial("power");
  const steel = mat(0xb7bcc4, 0.48, 0.32);
  group.add(makeBox("power", "變壓器油箱", [1.25, 0.72, 0.92], [-1.25, 0.42, 1.45], material));
  for (let i = 0; i < 5; i += 1) {
    group.add(makeBox("power", "變壓器散熱片", [0.045, 0.62, 0.9], [-1.9 + i * 0.12, 0.45, 1.45], mat(0x9b7a35, 0.58, 0.22), false));
    group.add(makeBox("power", "變壓器散熱片", [0.045, 0.62, 0.9], [-0.6 - i * 0.12, 0.45, 1.45], mat(0x9b7a35, 0.58, 0.22), false));
  }
  for (let i = 0; i < 3; i += 1) {
    const bushing = makeCylinder("power", "高壓套管", 0.055, 0.075, 0.42, [-1.56 + i * 0.3, 0.98, 1.45], mat(0xf3e6c4, 0.34, 0.08), 18);
    group.add(bushing);
    addRibbedInsulator(group, [-1.56 + i * 0.3, 1.01, 1.45]);
    group.add(makeSphere("power", "高壓端子", 0.08, [-1.56 + i * 0.3, 1.24, 1.45], steel, 18));
  }
  group.add(makeBox("power", "UPS 機櫃列", [0.86, 1.18, 0.74], [0.18, 0.62, 1.45], material));
  for (let i = 0; i < 4; i += 1) {
    group.add(makeBox("power", "UPS 前門縫", [0.015, 0.96, 0.58], [-0.15 + i * 0.2, 0.64, 1.83], mat(0x7a5b22, 0.62, 0.18), false));
  }
  group.add(makeBox("power", "PDU 配電盤", [0.5, 0.92, 0.58], [1.16, 0.48, 1.48], material));
  for (let i = 0; i < 6; i += 1) {
    group.add(makeSphere("power", "PDU 狀態燈", 0.025, [1.17, 0.18 + i * 0.12, 1.79], mat(i % 2 ? 0x76ff7a : 0xfff08a, 0.22, 0.12), 12));
  }
  group.add(makeBox("power", "電池儲能櫃", [1.15, 0.62, 0.72], [-0.08, 0.34, 2.35], mat(0xffd98f, 0.52, 0.2)));
  addLouverStack(group, "power", [-0.08, 0.16, 2.72], 5, 0.82, 0xa47a2a);
  for (let i = 0; i < 3; i += 1) {
    group.add(makeBox("power", "高壓開關架", [0.08, 0.82, 0.08], [-2.2 + i * 0.55, 0.48, 0.62], steel));
  }
  group.add(makeBox("power", "開關架橫樑", [1.24, 0.07, 0.07], [-1.65, 0.88, 0.62], steel));
  group.add(makePipe("power", "高壓電纜", [new THREE.Vector3(-1.25, 1.22, 1.45), new THREE.Vector3(-0.4, 1.34, 1.45), new THREE.Vector3(0.18, 1.22, 1.45)], 0xffc34d, 0.028));
  group.add(makeLine([new THREE.Vector3(-1.2, 0.92, 1.45), new THREE.Vector3(0.25, 1.12, 1.45), new THREE.Vector3(1.18, 0.95, 1.46)], 0xffc34d));
  return group;
}

function createCooling() {
  const group = addLayerGroup("cooling");
  const material = layerMaterial("cooling");
  const tower = makeCylinder("cooling", "雙曲線冷卻塔", 0.38, 0.58, 1.22, [1.55, 0.62, -1.45], material, 48);
  group.add(tower);
  const towerTop = makeTorus("cooling", "冷卻塔風筒", 0.42, 0.035, [1.55, 1.25, -1.45], mat(0xbbefff, 0.38, 0.24), 42);
  towerTop.rotation.x = Math.PI / 2;
  group.add(towerTop);
  addFan(group, "cooling", [1.55, 1.3, -1.45], 0.28, 0x9be8ff);
  for (let i = 0; i < 8; i += 1) {
    const angle = (i / 8) * Math.PI * 2;
    const rib = makeBox("cooling", "冷卻塔垂直肋條", [0.035, 1.0, 0.035], [1.55 + Math.cos(angle) * 0.48, 0.64, -1.45 + Math.sin(angle) * 0.48], mat(0xb8e9f4, 0.48, 0.2), false);
    rib.rotation.y = -angle;
    group.add(rib);
  }
  group.add(makeBox("cooling", "冷水主機", [1.48, 0.62, 0.88], [0.02, 0.32, -1.45], material));
  for (let i = 0; i < 7; i += 1) {
    group.add(makeBox("cooling", "冷凝器散熱鰭片", [0.045, 0.48, 0.9], [-0.52 + i * 0.16, 0.34, -0.98], mat(0xb0f1ff, 0.5, 0.22), false));
  }
  addLouverStack(group, "cooling", [0.02, 0.16, -0.98], 6, 1.1, 0xb0f1ff);
  addFan(group, "cooling", [-0.32, 0.67, -1.45], 0.18, 0xd8fbff);
  addFan(group, "cooling", [0.36, 0.67, -1.45], 0.18, 0xd8fbff);
  group.add(makeBox("cooling", "CDU 液冷櫃", [0.68, 0.98, 0.56], [-1.1, 0.5, -1.48], material));
  group.add(makeCylinder("cooling", "泵浦馬達", 0.14, 0.14, 0.42, [-1.56, 0.26, -1.08], mat(0xb7f3ff, 0.42, 0.32), 28));
  group.add(makeCylinder("cooling", "泵浦馬達", 0.14, 0.14, 0.42, [-1.56, 0.26, -1.82], mat(0xb7f3ff, 0.42, 0.32), 28));
  for (let i = 0; i < 3; i += 1) {
    group.add(makeBox("cooling", "液冷板", [0.42, 0.035, 0.3], [-0.45 + i * 0.42, 0.98, -0.15], mat(0x8defff, 0.3, 0.5), false));
  }
  group.add(makePipe("cooling", "冷凍水供水管", [new THREE.Vector3(1.15, 0.72, -1.45), new THREE.Vector3(0.05, 0.82, -1.45), new THREE.Vector3(-1.1, 0.9, -1.48)], 0x22b8ff, 0.035));
  group.add(makePipe("cooling", "液冷二次側管", [new THREE.Vector3(-1.1, 0.72, -1.2), new THREE.Vector3(-0.4, 0.88, -0.55), new THREE.Vector3(0.2, 0.98, 0.05)], 0x75d8ff, 0.028));
  group.add(makeLine([new THREE.Vector3(1.15, 0.72, -1.45), new THREE.Vector3(0.05, 0.8, -1.45), new THREE.Vector3(-1.1, 0.88, -1.48)], 0x22b8ff));
  group.add(makeLine([new THREE.Vector3(-1.1, 0.72, -1.2), new THREE.Vector3(-0.4, 0.86, -0.55), new THREE.Vector3(0.2, 0.96, 0.05)], 0x75d8ff));
  return group;
}

function createCompute() {
  const group = addLayerGroup("compute");
  const rackMaterial = layerMaterial("compute");
  const chipMaterial = mat(0x0c2832, 0.42, 0.55);
  for (let row = 0; row < 2; row += 1) {
    for (let col = 0; col < 4; col += 1) {
      const x = (col - 1.5) * 0.82;
      const z = (row - 0.5) * 1.1;
      group.add(makeBox("compute", "AI 伺服器機櫃框架", [0.56, 1.82, 0.84], [x, 0.9, z], rackMaterial));
      group.add(makeBox("compute", "機櫃黑色網孔門", [0.5, 1.62, 0.035], [x, 0.9, z + 0.435], mat(0x071018, 0.78, 0.28), false));
      for (let tray = 0; tray < 5; tray += 1) {
        const y = 0.22 + tray * 0.31;
        group.add(makeBox("compute", "GPU 伺服器抽屜", [0.5, 0.045, 0.76], [x, y, z], chipMaterial, false));
        group.add(makeBox("compute", "GPU 板卡", [0.38, 0.025, 0.26], [x - 0.03, y + 0.045, z + 0.06], mat(0x17424a, 0.42, 0.48), false));
        group.add(makeBox("compute", "HBM 堆疊", [0.05, 0.035, 0.05], [x + 0.13, y + 0.08, z + 0.15], mat(0x6be6ff, 0.24, 0.5), false));
      }
      for (let led = 0; led < 4; led += 1) {
        group.add(makeSphere("compute", "機櫃狀態燈", 0.018, [x - 0.18 + led * 0.09, 0.18, z + 0.47], mat(led % 2 ? 0x76ff7a : 0x19d3ff, 0.2, 0.1), 10));
      }
      addRackHandles(group, "compute", x, z);
      addCableBundle(group, "compute", x, z);
    }
  }
  group.add(makeBox("compute", "整櫃液冷/電力匯流排", [4.08, 0.12, 0.16], [0, 1.88, -0.78], mat(0x9feeff, 0.42, 0.34)));
  group.add(makeBox("compute", "後方母線槽", [4.18, 0.1, 0.12], [0, 0.42, -1.02], mat(0xffc34d, 0.42, 0.36)));
  for (let i = 0; i < 7; i += 1) {
    group.add(makePipe("compute", "機櫃液冷歧管", [new THREE.Vector3(-2.0 + i * 0.65, 1.78, -0.9), new THREE.Vector3(-2.0 + i * 0.65, 1.42, -0.42)], 0x22b8ff, 0.018));
  }
  return group;
}

function createNetwork() {
  const group = addLayerGroup("network");
  const material = layerMaterial("network");
  group.add(makeBox("network", "Spine 交換器", [2.4, 0.34, 0.5], [0, 0.5, -1.18], material));
  group.add(makeBox("network", "Leaf 交換器", [3.6, 0.3, 0.4], [0, 0.15, -0.38], material));
  group.add(makeBox("network", "上方理線架", [3.7, 0.06, 0.08], [0, 0.36, -0.16], mat(0x62706f, 0.48, 0.22), false));
  group.add(makeBox("network", "下方理線架", [3.7, 0.06, 0.08], [0, -0.06, -0.16], mat(0x62706f, 0.48, 0.22), false));
  for (let row = 0; row < 2; row += 1) {
    for (let col = 0; col < 12; col += 1) {
      group.add(makeBox("network", "QSFP 光模組埠", [0.09, 0.045, 0.035], [-1.42 + col * 0.26, 0.16 + row * 0.08, -0.16], mat(0x0b221c, 0.52, 0.24), false));
      group.add(makeSphere("network", "Link 燈號", 0.012, [-1.47 + col * 0.26, 0.21 + row * 0.08, -0.135], mat(0x76ff7a, 0.18, 0.08), 8));
    }
  }
  for (let col = 0; col < 8; col += 1) {
    group.add(makeBox("network", "800G 光模組", [0.12, 0.055, 0.11], [-0.92 + col * 0.27, 0.5, -0.89], mat(0xb9ffd0, 0.34, 0.36), false));
  }
  for (let i = 0; i < 5; i += 1) {
    const x = (i - 2) * 0.72;
    group.add(makePipe("network", "機櫃內光纖束", [new THREE.Vector3(x, 0.18, -0.36), new THREE.Vector3(x, 0.38, -0.68), new THREE.Vector3(x * 0.45, 0.55, -1.14)], 0x76ff7a, 0.018));
    group.add(makeLine([new THREE.Vector3(x, 0.18, -0.36), new THREE.Vector3(x * 0.45, 0.55, -1.14)], 0x76ff7a));
  }
  group.add(makeSphere("network", "骨幹節點", 0.16, [-3.2, 0.85, -3.1], mat(0x76ff7a, 0.26, 0.32), 20));
  group.add(makeSphere("network", "骨幹節點", 0.16, [3.2, 0.85, -3.1], mat(0x76ff7a, 0.26, 0.32), 20));
  group.add(makeLine([new THREE.Vector3(-1.2, 0.55, -1.2), new THREE.Vector3(-2.4, 1.05, -2.2), new THREE.Vector3(-3.2, 0.85, -3.1)], 0x76ff7a));
  group.add(makeLine([new THREE.Vector3(1.2, 0.55, -1.2), new THREE.Vector3(2.4, 1.05, -2.2), new THREE.Vector3(3.2, 0.85, -3.1)], 0x76ff7a));
  return group;
}

function createOps() {
  const group = addLayerGroup("ops");
  const material = layerMaterial("ops");
  const core = makeCylinder("ops", "AI 平台核心", 0.75, 0.75, 0.28, [0, 0.62, 0], material, 48);
  core.rotation.x = Math.PI / 2;
  group.add(core);
  const ringA = makeTorus("ops", "平台調度軌道", 0.95, 0.012, [0, 0.62, 0], mat(0xffa3bf, 0.28, 0.45), 58);
  ringA.rotation.x = Math.PI / 2;
  group.add(ringA);
  const ringB = makeTorus("ops", "資料治理軌道", 0.58, 0.012, [0, 0.62, 0], mat(0xff6b9a, 0.28, 0.45), 52);
  ringB.rotation.z = Math.PI / 2;
  group.add(ringB);
  group.add(makeBox("ops", "NOC 監控牆", [1.72, 0.72, 0.08], [0, 0.88, 1.3], mat(0x142a3c, 0.28, 0.24), false));
  for (let row = 0; row < 2; row += 1) {
    for (let col = 0; col < 4; col += 1) {
      group.add(makeBox("ops", "監控牆螢幕格", [0.34, 0.22, 0.025], [-0.6 + col * 0.4, 0.78 + row * 0.26, 1.36], mat(0x2d80c4, 0.22, 0.18), false));
    }
  }
  group.add(makeBox("ops", "Cloud API 閘道", [0.95, 0.36, 0.5], [-1.35, 0.55, 0.48], material));
  group.add(makeBox("ops", "MLOps 編排服務", [0.95, 0.36, 0.5], [1.35, 0.55, 0.48], material));
  group.add(makeBox("ops", "DCIM/AIOps 監控", [1.1, 0.36, 0.48], [0, 0.55, -1.05], material));
  for (let i = 0; i < 3; i += 1) {
    group.add(makeBox("ops", "營運控制台螢幕", [0.34, 0.22, 0.035], [-0.42 + i * 0.42, 0.34, 1.08], mat(0x1a3d4f, 0.25, 0.28), false));
    group.add(makeBox("ops", "控制台桌面", [0.38, 0.08, 0.28], [-0.42 + i * 0.42, 0.17, 1.02], mat(0x303640, 0.56, 0.18), false));
  }
  for (let i = 0; i < 6; i += 1) {
    const angle = (i / 6) * Math.PI * 2;
    group.add(makeSphere("ops", "推論端點", 0.06, [Math.cos(angle) * 1.18, 0.74 + Math.sin(i) * 0.07, Math.sin(angle) * 0.72], mat(0xffc0d2, 0.2, 0.12), 14));
  }
  group.add(makeLine([new THREE.Vector3(-1.35, 0.58, 0.48), new THREE.Vector3(0, 0.64, 0), new THREE.Vector3(1.35, 0.58, 0.48)], 0xff6b9a));
  group.add(makeLine([new THREE.Vector3(0, 0.58, -1.05), new THREE.Vector3(0, 0.64, 0)], 0xff6b9a));
  return group;
}

function createChapter2NodeModel(id, mode, position, build) {
  const group = addChapter2Node(id, mode, position);
  build(group);
  return group;
}

function createChapter2() {
  const trainingColor = 0xffb84d;
  const inferenceColor = 0x19d3ff;
  const sharedGreen = 0x76ff7a;
  const metal = mat(0xd5dde8, 0.48, 0.24);
  const darkRack = mat(0x0b1420, 0.7, 0.28);

  createChapter2NodeModel("dataset", "training", new THREE.Vector3(-5.9, 0.05, 1.85), (group) => {
    group.add(makeChapter2Box("dataset", "data platform base", [1.28, 0.12, 0.86], [0, 0.18, 0], mat(0x26313c, 0.55, 0.22)));
    for (let row = 0; row < 3; row += 1) {
      for (let col = 0; col < 5; col += 1) {
        const x = -0.48 + col * 0.24;
        const z = -0.26 + row * 0.24;
        const y = 0.34 + ((row + col) % 3) * 0.07;
        group.add(makeChapter2Box("dataset", "data volume block", [0.16, 0.12, 0.16], [x, y, z], mat(row % 2 ? 0x69d4ff : trainingColor, 0.34, 0.18, 0.86)));
      }
    }
    for (let i = 0; i < 4; i += 1) {
      group.add(makeChapter2Box("dataset", "data shard tile", [0.72 - i * 0.1, 0.035, 0.52 - i * 0.06], [0.02, 0.68 + i * 0.045, -0.02], mat(0x365a72, 0.38, 0.18, 0.72)));
    }
  });

  createChapter2NodeModel("preprocess", "training", new THREE.Vector3(-3.9, 0.1, 1.2), (group) => {
    group.add(makeChapter2Box("preprocess", "preprocessing conveyor", [1.1, 0.18, 0.5], [0, 0.2, 0], mat(0x3c4650, 0.66, 0.18)));
    for (let i = 0; i < 4; i += 1) {
      group.add(makeChapter2Box("preprocess", "pipeline rollers", [0.12, 0.08, 0.56], [-0.42 + i * 0.28, 0.35, 0], metal));
    }
    group.add(makeChapter2Box("preprocess", "token staging block", [0.34, 0.16, 0.28], [0.18, 0.5, 0], mat(trainingColor, 0.42, 0.18)));
  });

  createChapter2NodeModel("trainGpu", "training", new THREE.Vector3(-1.9, 0.05, 0.78), (group) => {
    for (let row = 0; row < 2; row += 1) {
      for (let col = 0; col < 3; col += 1) {
        const x = (col - 1) * 0.48;
        const z = (row - 0.5) * 0.58;
        group.add(makeChapter2Box("trainGpu", "training GPU rack", [0.34, 0.88, 0.42], [x, 0.48, z], darkRack));
        group.add(makeChapter2Box("trainGpu", "GPU drawer", [0.28, 0.045, 0.38], [x, 0.28, z + 0.03], mat(0x17424a, 0.42, 0.48)));
        group.add(makeChapter2Sphere("trainGpu", "rack status", 0.025, [x - 0.09, 0.12, z + 0.23], mat(sharedGreen, 0.2, 0.08), 10));
      }
    }
  });

  createChapter2NodeModel("interconnect", "training", new THREE.Vector3(-0.75, 0.2, -0.52), (group) => {
    group.add(makeChapter2Box("interconnect", "spine switch", [1.38, 0.22, 0.32], [0, 0.52, 0], mat(sharedGreen, 0.4, 0.28)));
    group.add(makeChapter2Box("interconnect", "leaf switch", [1.72, 0.18, 0.28], [0, 0.22, 0.48], mat(sharedGreen, 0.44, 0.24)));
    for (let i = 0; i < 7; i += 1) {
      group.add(makeChapter2Sphere("interconnect", "link light", 0.018, [-0.66 + i * 0.22, 0.25, 0.64], mat(0xe1ff5b, 0.18, 0.08), 8));
    }
  });

  createChapter2NodeModel("checkpoint", "training", new THREE.Vector3(-3.05, 0.04, -1.7), (group) => {
    for (let i = 0; i < 3; i += 1) {
      group.add(makeChapter2Box("checkpoint", "checkpoint storage tier", [0.92, 0.16, 0.52], [0, 0.16 + i * 0.2, 0], mat(0x5b6673, 0.5, 0.22)));
    }
    group.add(makeChapter2Box("checkpoint", "write burst stripe", [0.72, 0.035, 0.56], [0, 0.86, 0], mat(trainingColor, 0.28, 0.28)));
  });

  createChapter2NodeModel("artifact", "training", new THREE.Vector3(-5.15, 0.18, -1.45), (group) => {
    const capsule = makeChapter2Cylinder("artifact", "model artifact capsule", 0.26, 0.26, 0.74, [0, 0.44, 0], mat(0xe1ff5b, 0.32, 0.28, 0.82), 36);
    capsule.rotation.z = Math.PI / 2;
    group.add(capsule);
    group.add(makeChapter2Sphere("artifact", "artifact glow", 0.22, [0.46, 0.44, 0], mat(0xe1ff5b, 0.18, 0.08, 0.64), 18));
  });

  createChapter2NodeModel("requests", "inference", new THREE.Vector3(3.0, 0.35, 1.95), (group) => {
    group.add(makeChapter2Box("requests", "notebook keyboard", [0.9, 0.07, 0.56], [0, 0.26, 0.08], mat(0x26313c, 0.52, 0.3)));
    group.add(makeChapter2Box("requests", "notebook trackpad", [0.24, 0.018, 0.16], [0, 0.31, 0.24], mat(0x566370, 0.48, 0.22)));
    const screen = makeChapter2Box("requests", "notebook screen", [0.84, 0.52, 0.045], [0, 0.62, -0.18], mat(0x153f5a, 0.24, 0.24));
    screen.rotation.x = -0.32;
    group.add(screen);
    group.add(makeChapter2Box("requests", "notebook glow", [0.58, 0.32, 0.02], [0, 0.64, -0.15], mat(inferenceColor, 0.2, 0.12, 0.72)));
    for (let i = 0; i < 5; i += 1) {
      group.add(makeChapter2Sphere("requests", "request pulse", 0.038, [0.58 + i * 0.12, 0.38 + Math.sin(i) * 0.05, 0.08 - i * 0.04], mat(inferenceColor, 0.22, 0.12), 10));
    }
  });

  createChapter2NodeModel("gateway", "inference", new THREE.Vector3(4.25, 0.12, 1.18), (group) => {
    group.add(makeChapter2Box("gateway", "gateway router", [0.9, 0.52, 0.52], [0, 0.42, 0], mat(0x1a3d4f, 0.34, 0.28)));
    group.add(makeChapter2Box("gateway", "routing aperture", [0.64, 0.08, 0.58], [0, 0.44, 0.31], mat(inferenceColor, 0.24, 0.18, 0.72)));
  });

  createChapter2NodeModel("serving", "inference", new THREE.Vector3(6.1, 0.05, 0.62), (group) => {
    for (let i = 0; i < 3; i += 1) {
      group.add(makeChapter2Box("serving", "model serving rack", [0.34, 0.94, 0.46], [-0.42 + i * 0.42, 0.5, 0], darkRack));
      group.add(makeChapter2Sphere("serving", "serving status", 0.022, [-0.5 + i * 0.42, 0.12, 0.25], mat(inferenceColor, 0.18, 0.1), 10));
    }
  });

  createChapter2NodeModel("cache", "inference", new THREE.Vector3(6.0, 0.15, -0.82), (group) => {
    group.add(makeChapter2Box("cache", "HBM substrate", [1.42, 0.14, 0.92], [0, 0.3, 0], mat(0x102b23, 0.38, 0.34)));
    group.add(makeChapter2Box("cache", "memory bandwidth plane", [1.28, 0.035, 0.78], [0, 0.42, 0], mat(0x1c5f50, 0.24, 0.18, 0.72)));
    for (let row = 0; row < 3; row += 1) {
      for (let col = 0; col < 4; col += 1) {
        const x = -0.48 + col * 0.32;
        const z = -0.26 + row * 0.26;
        group.add(makeChapter2Box("cache", "HBM stack", [0.2, 0.22, 0.18], [x, 0.58, z], mat(sharedGreen, 0.24, 0.18, 0.84)));
        group.add(makeChapter2Box("cache", "HBM stack cap", [0.18, 0.035, 0.16], [x, 0.71, z], mat(0xb9ffd0, 0.22, 0.16, 0.9)));
      }
    }
    group.add(makeChapter2Box("cache", "wide memory bus", [1.72, 0.045, 0.08], [0, 0.2, 0.56], mat(0xe1ff5b, 0.28, 0.24)));
  });

  createChapter2NodeModel("retrieval", "inference", new THREE.Vector3(4.25, 0.06, -1.72), (group) => {
    for (let i = 0; i < 3; i += 1) {
      group.add(makeChapter2Cylinder("retrieval", "vector database tier", 0.4, 0.4, 0.12, [0, 0.18 + i * 0.18, 0], mat(0x5eead4, 0.38, 0.22), 36));
    }
    group.add(makeChapter2Box("retrieval", "search index face", [0.56, 0.18, 0.035], [0, 0.5, 0.42], mat(inferenceColor, 0.24, 0.16, 0.72)));
  });

  createChapter2NodeModel("response", "inference", new THREE.Vector3(6.65, 0.3, -1.65), (group) => {
    group.add(makeChapter2Sphere("response", "response edge hub", 0.24, [0, 0.34, 0], mat(0xff6bcb, 0.2, 0.12), 18));
    for (let i = 0; i < 5; i += 1) {
      const angle = -0.8 + i * 0.4;
      group.add(makeChapter2Sphere("response", "response fanout", 0.045, [Math.cos(angle) * 0.62, 0.34, Math.sin(angle) * 0.42], mat(inferenceColor, 0.24, 0.12), 10));
    }
  });

  const trainingPath = [
    new THREE.Vector3(-5.9, 0.62, 1.85),
    new THREE.Vector3(-3.9, 0.62, 1.2),
    new THREE.Vector3(-1.9, 0.8, 0.78),
    new THREE.Vector3(-0.75, 0.86, -0.52),
    new THREE.Vector3(-3.05, 0.72, -1.7),
    new THREE.Vector3(-5.15, 0.7, -1.45)
  ];
  const inferencePath = [
    new THREE.Vector3(3.0, 0.62, 1.95),
    new THREE.Vector3(4.25, 0.62, 1.18),
    new THREE.Vector3(6.1, 0.72, 0.62),
    new THREE.Vector3(6.0, 0.66, -0.82),
    new THREE.Vector3(4.25, 0.68, -1.72),
    new THREE.Vector3(6.65, 0.68, -1.65)
  ];

  for (let i = 0; i < trainingPath.length - 1; i += 1) {
    makeChapter2Line("training", [trainingPath[i], trainingPath[i + 1]], trainingColor, 0.36);
  }
  for (let i = 0; i < inferencePath.length - 1; i += 1) {
    makeChapter2Line("inference", [inferencePath[i], inferencePath[i + 1]], inferenceColor, 0.7);
  }
  for (let i = 0; i < 5; i += 1) makeChapter2Particle("training", trainingPath, trainingColor, 0.065);
  for (let i = 0; i < 13; i += 1) makeChapter2Particle("inference", inferencePath, inferenceColor, 0.038);
}

function addAgentPod(group, nodeId, x, y, z, scale = 1) {
  group.add(makeChapter3Sphere(nodeId, "agent pod shell", 0.18 * scale, [x, y, z], mat(0xf1f6ff, 0.34, 0.18), 18));
  group.add(makeChapter3Box(nodeId, "agent pod faceplate", [0.24 * scale, 0.09 * scale, 0.035 * scale], [x, y, z + 0.16 * scale], mat(0x0a2b54, 0.25, 0.32)));
  group.add(makeChapter3Sphere(nodeId, "agent pod eye", 0.025 * scale, [x - 0.055 * scale, y + 0.01 * scale, z + 0.18 * scale], mat(0x19d3ff, 0.12, 0.08), 10));
  group.add(makeChapter3Sphere(nodeId, "agent pod eye", 0.025 * scale, [x + 0.055 * scale, y + 0.01 * scale, z + 0.18 * scale], mat(0x19d3ff, 0.12, 0.08), 10));
  group.add(makeChapter3Cylinder(nodeId, "agent antenna", 0.01 * scale, 0.012 * scale, 0.18 * scale, [x, y + 0.22 * scale, z], mat(0x7b8ea3, 0.32, 0.28), 10));
}

function createChapter3() {
  const cyan = 0x19d3ff;
  const lime = 0xe1ff5b;
  const teal = 0x5eead4;
  const amber = 0xffb84d;
  const shell = mat(0xe8eef7, 0.38, 0.12);
  const dark = mat(0x111821, 0.68, 0.24);
  const card = mat(0xf3f7ff, 0.28, 0.1);
  const joint = mat(0x111827, 0.52, 0.26);
  const blue = mat(0x2f7dff, 0.26, 0.16);

  function addChecklistRow(group, nodeId, y, color) {
    const dot = makeChapter3Cylinder(nodeId, "check status dot", 0.055, 0.055, 0.025, [-0.36, y, 0.075], mat(color, 0.22, 0.1), 18);
    dot.rotation.x = Math.PI / 2;
    group.add(dot);
    const tickA = makeChapter3Box(nodeId, "check mark stroke", [0.018, 0.07, 0.018], [-0.38, y, 0.1], mat(0xffffff, 0.14, 0.06));
    tickA.rotation.z = -0.78;
    group.add(tickA);
    const tickB = makeChapter3Box(nodeId, "check mark stroke", [0.018, 0.11, 0.018], [-0.34, y + 0.014, 0.1], mat(0xffffff, 0.14, 0.06));
    tickB.rotation.z = 0.72;
    group.add(tickB);
    group.add(makeChapter3Box(nodeId, "task row", [0.52, 0.035, 0.035], [0.02, y, 0.095], mat(0x9aa8b8, 0.22, 0.12)));
  }

  const robot = addChapter3Node("robot", new THREE.Vector3(-1.05, 0.72, 0.05));
  const aura = makeChapter3Sphere("robot", "transparent agent workspace aura", 1.24, [0, 0.64, 0], mat(0x88a8ff, 0.1, 0.03, 0.14), 40);
  aura.scale.set(1.06, 1.08, 1.06);
  robot.add(aura);
  addAgentPod(robot, "robot", 0, 1.18, 0, 2.9);
  robot.add(makeChapter3Cylinder("robot", "agent neck", 0.16, 0.2, 0.2, [0, 0.6, 0], joint, 22));
  const torso = makeChapter3Sphere("robot", "clean rounded agent body", 0.62, [0, 0.1, 0], shell, 36);
  torso.scale.set(0.82, 1.05, 0.58);
  robot.add(torso);
  const leftArm = makeChapter3Cylinder("robot", "left robot arm", 0.08, 0.1, 0.62, [-0.56, 0.18, 0.08], shell, 18);
  leftArm.rotation.z = -0.54;
  robot.add(leftArm);
  const leftHand = makeChapter3Sphere("robot", "left pointing hand", 0.14, [-0.82, 0.44, 0.24], joint, 18);
  robot.add(leftHand);
  const rightArm = makeChapter3Cylinder("robot", "right robot arm", 0.08, 0.1, 0.58, [0.54, 0.1, 0.12], shell, 18);
  rightArm.rotation.z = 0.48;
  robot.add(rightArm);
  robot.add(makeChapter3Sphere("robot", "right robot hand", 0.13, [0.74, -0.16, 0.28], joint, 18));

  const laptop = addChapter3Node("laptop", new THREE.Vector3(-0.5, 0.0, 1.0));
  laptop.add(makeChapter3Box("laptop", "laptop base", [1.42, 0.08, 0.82], [0, 0.08, 0], mat(0x8b98a8, 0.42, 0.32)));
  const laptopScreen = makeChapter3Box("laptop", "laptop screen", [1.18, 0.72, 0.055], [0, 0.58, -0.34], mat(0x1f2a44, 0.28, 0.24));
  laptopScreen.rotation.x = -0.24;
  laptop.add(laptopScreen);
  laptop.add(makeChapter3Box("laptop", "screen status line", [0.72, 0.035, 0.04], [-0.02, 0.72, -0.3], mat(cyan, 0.16, 0.08)));
  laptop.add(makeChapter3Sphere("laptop", "agent app status", 0.12, [0, 0.22, 0.42], blue, 18));

  const terminal = addChapter3Node("terminal", new THREE.Vector3(-3.0, 0.45, 1.0));
  terminal.add(makeChapter3Box("terminal", "command window", [1.5, 0.86, 0.08], [0, 0.48, 0], mat(0x07111f, 0.58, 0.3)));
  terminal.add(makeChapter3Sphere("terminal", "window control", 0.035, [-0.58, 0.82, 0.07], mat(0xff6b6b, 0.2, 0.1), 10));
  terminal.add(makeChapter3Sphere("terminal", "window control", 0.035, [-0.46, 0.82, 0.07], mat(0xffd166, 0.2, 0.1), 10));
  terminal.add(makeChapter3Sphere("terminal", "window control", 0.035, [-0.34, 0.82, 0.07], mat(0x3ddc97, 0.2, 0.1), 10));
  for (let i = 0; i < 4; i += 1) {
    terminal.add(makeChapter3Box("terminal", "command status line", [0.78 - i * 0.08, 0.035, 0.035], [-0.05, 0.62 - i * 0.13, 0.08], mat(i === 3 ? lime : teal, 0.18, 0.08)));
  }

  const workflow = addChapter3Node("workflow", new THREE.Vector3(2.45, 1.28, 0.72));
  workflow.add(makeChapter3Box("workflow", "workflow card", [1.36, 0.92, 0.08], [0, 0.48, 0], card));
  workflow.add(makeChapter3Box("workflow", "workflow top node", [0.38, 0.12, 0.055], [0, 0.74, 0.08], blue));
  workflow.add(makeChapter3Box("workflow", "workflow left node", [0.34, 0.12, 0.055], [-0.32, 0.32, 0.08], mat(teal, 0.24, 0.12)));
  workflow.add(makeChapter3Box("workflow", "workflow right node", [0.34, 0.12, 0.055], [0.32, 0.32, 0.08], mat(0x7c6dff, 0.24, 0.12)));
  workflow.add(makeChapter3Box("workflow", "workflow vertical connector", [0.04, 0.28, 0.035], [0, 0.54, 0.08], mat(0x66758a, 0.22, 0.12)));
  workflow.add(makeChapter3Box("workflow", "workflow branch connector", [0.62, 0.035, 0.035], [0, 0.44, 0.08], mat(0x66758a, 0.22, 0.12)));

  const running = addChapter3Node("running", new THREE.Vector3(3.55, 0.38, -0.66));
  addAgentPod(running, "running", -0.58, 1.42, -0.14, 0.92);
  addAgentPod(running, "running", 0, 1.66, -0.2, 0.92);
  addAgentPod(running, "running", 0.58, 1.42, -0.14, 0.92);
  running.add(makeChapter3Box("running", "task running card", [1.36, 1.08, 0.08], [0, 0.54, 0], card));
  const runningRing = makeChapter3Cylinder("running", "task running check ring", 0.25, 0.25, 0.035, [-0.36, 0.68, 0.09], blue, 34);
  runningRing.rotation.x = Math.PI / 2;
  running.add(runningRing);
  const runningCheckA = makeChapter3Box("running", "running check stroke", [0.036, 0.16, 0.035], [-0.42, 0.66, 0.2], blue);
  runningCheckA.rotation.z = -0.74;
  running.add(runningCheckA);
  const runningCheckB = makeChapter3Box("running", "running check stroke", [0.036, 0.3, 0.035], [-0.27, 0.71, 0.2], blue);
  runningCheckB.rotation.z = 0.72;
  running.add(runningCheckB);

  const checklistNodes = [
    ["autoplan", -1.38, -0.2, 1.58, cyan],
    ["tooluse", 0.08, -0.2, 1.58, teal],
    ["memory", -1.38, -0.62, 1.58, lime],
    ["continuous", 0.08, -0.62, 1.58, amber]
  ];
  checklistNodes.forEach(([id, x, y, z, color]) => {
    const row = addChapter3Node(id, new THREE.Vector3(x, y, z));
    addChecklistRow(row, id, 0, color);
  });

  const paths = [
    { role: "input", points: [new THREE.Vector3(-2.35, 0.9, 1.0), new THREE.Vector3(-1.4, 0.98, 0.72)] },
    { role: "core", points: [new THREE.Vector3(-0.2, 1.35, 0.35), new THREE.Vector3(1.9, 1.7, 0.72)] },
    { role: "output", points: [new THREE.Vector3(2.78, 1.08, 0.56), new THREE.Vector3(3.36, 0.88, -0.5)] },
    { role: "infra", points: [new THREE.Vector3(-0.9, 0.54, 0.78), new THREE.Vector3(-0.5, 0.7, 0.72), new THREE.Vector3(-2.35, 0.66, 1.02)] }
  ];
  paths.forEach(({ points, role }, index) => {
    const color = role === "input" ? teal : role === "core" ? cyan : role === "output" ? lime : amber;
    makeChapter3Line(points, color, role === "infra" ? 0.18 : 0.34, role);
    const count = role === "infra" ? 1 : 2;
    for (let i = 0; i < count; i += 1) makeChapter3Particle(role === "infra" ? "robot" : "plan", points, color, role === "infra" ? 0.026 : 0.035, role);
  });
}

createSite();
createPower();
createCooling();
createCompute();
createNetwork();
createOps();
createChapter2();
createChapter3();

const grid = new THREE.GridHelper(18, 18, 0x253442, 0x17202a);
grid.position.y = -1.35;
scene.add(grid);

function hexColor(value) {
  return `#${value.toString(16).padStart(6, "0")}`;
}

function visualRoleFor(object) {
  const name = object.name || "";
  if (name.includes("狀態燈") || name.includes("Link")) return "indicator";
  if (name.includes("螢幕") || name.includes("監控牆")) return "screen";
  if (name.includes("玻璃") || name.includes("立面模組")) return "glass";
  if (name.includes("道路") || name.includes("碼頭") || name.includes("入口")) return "road";
  if (name.includes("機房") || name.includes("建築") || name.includes("量體") || name.includes("屋頂")) return "building";
  if (name.includes("網孔門") || name.includes("光模組埠")) return "darkPanel";
  if (name.includes("GPU 板卡") || name.includes("伺服器抽屜")) return "circuit";
  if (name.includes("HBM") || name.includes("高壓端子")) return "chip";
  if (name.includes("匯流排") || name.includes("母線槽") || name.includes("電纜")) return "copper";
  if (name.includes("管") || name.includes("線束") || name.includes("光纖")) return "pipe";
  if (name.includes("套管") || name.includes("瓷")) return "ceramic";
  if (name.includes("開關架") || name.includes("橫樑") || name.includes("理線架") || name.includes("把手")) return "steel";
  if (name.includes("散熱片") || name.includes("百葉") || name.includes("肋條")) return "fin";
  if (name.includes("風扇")) return "fan";
  if (name.includes("光模組")) return "optic";
  if (name.includes("控制台") || name.includes("平台") || name.includes("Cloud") || name.includes("MLOps") || name.includes("DCIM") || name.includes("推論")) return "cloud";
  if (name.includes("機櫃") || name.includes("交換器") || name.includes("UPS") || name.includes("PDU") || name.includes("CDU") || name.includes("Chiller") || name.includes("冷水主機") || name.includes("變壓器") || name.includes("電池")) return "cabinet";
  return "layer";
}

function schemeColorFor(object, scheme) {
  const role = visualRoleFor(object);
  const layerId = object.userData.layerId || object.parent?.userData.layerId;
  return scheme.roles[role] ?? scheme.layerColors[layerId] ?? scheme.roles.layer;
}

function applyColorScheme(name) {
  activeScheme = name;
  const scheme = colorSchemes[name];
  scene.background.setHex(scheme.background);
  scene.fog.color.setHex(scheme.background);
  rimLight.color.setHex(scheme.rim);
  document.documentElement.style.setProperty("--accent", hexColor(scheme.uiAccent));
  document.documentElement.style.setProperty("--accent-2", hexColor(scheme.uiAccent2));

  root.traverse((object) => {
    const layerId = object.userData.layerId || object.parent?.userData.layerId;
    if (object.isMesh && object.material?.color) {
      object.material.color.setHex(schemeColorFor(object, scheme));
      object.material.roughness = visualRoleFor(object) === "screen" ? 0.24 : object.material.userData.originalRoughness ?? object.material.roughness;
      object.material.metalness = visualRoleFor(object) === "darkPanel" ? 0.36 : object.material.userData.originalMetalness ?? object.material.metalness;
    }
    if (object.isLine && object.material?.color) {
      object.material.color.setHex(scheme.layerColors[layerId] ?? scheme.uiAccent);
    }
  });

  layers.forEach((layer) => {
    const color = scheme.layerColors[layer.id] ?? layer.color;
    document.querySelector(`#tab-${layer.id}`)?.style.setProperty("--layer-color", hexColor(color));
    labels.get(layer.id)?.style.setProperty("--layer-color", hexColor(color));
  });

}

function localizedLayer(layer) {
  return {
    ...layer,
    ...(layerTranslations[activeLang]?.[layer.id] ?? {})
  };
}

function layerIndexLabel(id) {
  const index = layers.findIndex((item) => item.id === id);
  return String(index + 1).padStart(2, "0");
}

function t(key) {
  return uiText[activeLang]?.[key] ?? uiText.zh[key];
}

function chapter2Copy() {
  return chapter2Content[activeLang] ?? chapter2Content.en;
}

function chapter2Mode(modeId = selectedMode) {
  return chapter2Copy().modes.find((mode) => mode.id === modeId) ?? chapter2Copy().modes[0];
}

function chapter2Node(nodeId = selectedNode) {
  const mode = chapter2Mode();
  return chapter2Copy().nodes[nodeId] ?? [mode.name, mode.signal];
}

function chapter3Copy() {
  return chapter3Content[activeLang] ?? chapter3Content.en;
}

function chapter3Mode(modeId = selectedChapter3Mode) {
  return chapter3Copy().modes.find((mode) => mode.id === modeId) ?? chapter3Copy().modes[0];
}

function chapter3Node(nodeId = selectedChapter3Node) {
  const copy = chapter3Copy();
  const mode = chapter3Mode();
  const nodes = copy.nodes ?? chapter3Content.en.nodes;
  return nodes?.[nodeId] ?? [mode.name, mode.signal];
}

function chapter2BriefingTitle() {
  const copy = chapter2Copy();
  const node = copy.nodes[activeSegmentId];
  if (node) return node[0];
  const briefing = copy.audioBriefings?.[activeSegmentId] ?? chapter2Content.en.audioBriefings?.[activeSegmentId];
  if (briefing) return chapter2Mode(activeSegmentId).name;
  const mode = chapter2Mode();
  return copy.segments[activeSegmentId] ?? mode.signal;
}

function chapter2BriefingText() {
  const copy = chapter2Copy();
  const node = copy.nodes[activeSegmentId];
  if (node) return `${node[0]}. ${node[1]}`;
  const briefing = copy.audioBriefings?.[activeSegmentId] ?? chapter2Content.en.audioBriefings?.[activeSegmentId];
  if (briefing) return briefing;
  const mode = chapter2Mode();
  const insightText = mode.insights.map(([title, body]) => `${title}. ${body}`).join(" ");
  return `${mode.name}. ${mode.signal} ${mode.lede} ${insightText}`;
}

function chapter3BriefingTitle() {
  const copy = chapter3Copy();
  const nodes = copy.nodes ?? chapter3Content.en.nodes;
  const node = nodes?.[activeChapter3SegmentId];
  if (node) return node[0];
  const briefing = copy.audioBriefings?.[activeChapter3SegmentId] ?? chapter3Content.en.audioBriefings?.[activeChapter3SegmentId];
  if (briefing) return copy.segments?.[activeChapter3SegmentId] ?? chapter3Content.en.segments?.[activeChapter3SegmentId] ?? chapter3Mode(activeChapter3SegmentId).name;
  return copy.segments?.[activeChapter3SegmentId] ?? chapter3Content.en.segments?.[activeChapter3SegmentId] ?? chapter3Mode().signal;
}

function chapter3BriefingText() {
  const copy = chapter3Copy();
  const nodes = copy.nodes ?? chapter3Content.en.nodes;
  const node = nodes?.[activeChapter3SegmentId];
  if (node) return `${node[0]}. ${node[1]}`;
  const briefing = copy.audioBriefings?.[activeChapter3SegmentId] ?? chapter3Content.en.audioBriefings?.[activeChapter3SegmentId];
  if (briefing) return briefing;
  const mode = chapter3Mode();
  const suppliers = mode.suppliers.join(" ");
  return `${mode.name}. ${mode.signal} ${mode.lede} ${mode.risk} Value-chain roles include: ${suppliers}`;
}

function chapter1Briefing() {
  const localized = chapter1AudioContent[activeLang]?.[selectedId] ?? chapter1AudioContent.en[selectedId];
  if (localized) return localized;
  const layer = localizedLayer(layers.find((item) => item.id === selectedId));
  return { title: layer.name, text: `${layer.name}. ${layer.signal} ${layer.lede} ${layer.risk}` };
}

function activeAudioSource() {
  if (activeChapter === "chapter1") {
    return chapter1AudioSources[`${activeLang}-${selectedId}`] ?? chapter1AudioSources[`en-${selectedId}`] ?? "";
  }
  if (activeChapter === "chapter3") {
    return chapter3AudioSources[`${activeLang}-${activeChapter3SegmentId}`] ??
      chapter3AudioSources[`en-${activeChapter3SegmentId}`] ??
      chapter3AudioSources[`${activeLang}-${selectedChapter3Mode}`] ??
      chapter3AudioSources[`en-${selectedChapter3Mode}`] ??
      "";
  }
  return chapter2AudioSources[`${activeLang}-${activeSegmentId}`] ??
    chapter2AudioSources[`en-${activeSegmentId}`] ??
    chapter2AudioSources[`${activeLang}-${selectedMode}`] ??
    chapter2AudioSources[`en-${selectedMode}`] ??
    "";
}

function activeAudioUi() {
  if (activeChapter === "chapter3") return chapter3Copy();
  return activeChapter === "chapter2" ? chapter2Copy() : uiText[activeLang] ?? uiText.en;
}

function activeBriefingTitle() {
  if (activeChapter === "chapter1") return chapter1Briefing().title;
  if (activeChapter === "chapter3") return chapter3BriefingTitle();
  return chapter2BriefingTitle();
}

function activeBriefingText() {
  if (activeChapter === "chapter1") return chapter1Briefing().text;
  if (activeChapter === "chapter3") return chapter3BriefingText();
  return chapter2BriefingText();
}

function stopAudioBriefing(shouldUpdate = true) {
  if (currentUtterance && "speechSynthesis" in window) window.speechSynthesis.cancel();
  currentUtterance = null;
  audioPlayer.pause();
  audioPlayer.removeAttribute("src");
  audioPlayer.load();
  audioPlaying = false;
  if (shouldUpdate) updateAudioDock();
}

function speakBriefingText() {
  if (!("speechSynthesis" in window)) {
    audioPlaying = false;
    updateAudioDock();
    return;
  }
  if (currentUtterance) window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(activeBriefingText());
  utterance.lang = speechLangs[activeLang] ?? "en-US";
  utterance.rate = activeLang === "en" ? 0.94 : 0.9;
  utterance.pitch = 0.98;
  utterance.onend = () => {
    if (currentUtterance !== utterance) return;
    currentUtterance = null;
    audioPlaying = false;
    updateAudioDock();
  };
  utterance.onerror = () => {
    if (currentUtterance !== utterance) return;
    currentUtterance = null;
    audioPlaying = false;
    updateAudioDock();
  };
  currentUtterance = utterance;
  window.speechSynthesis.speak(utterance);
}

function playAudioBriefing() {
  stopAudioBriefing(false);
  audioPlaying = true;
  updateAudioDock();
  const source = activeAudioSource();
  if (!source) {
    speakBriefingText();
    return;
  }
  audioPlayer.src = source;
  audioPlayer.play().catch(() => {
    audioPlaying = false;
    updateAudioDock();
  });
}

function hideInsights() {
  insightsRevealed = false;
  closeAnalysisDrawer();
  closeAboutDrawer();
  appShell.classList.add("insight-is-hidden");
  rightPanel.classList.remove("is-revealed");
  rightPanel.setAttribute("aria-hidden", "true");
  insightContent.setAttribute("aria-hidden", "true");
}

function revealInsights() {
  if (insightsRevealed) return;
  insightsRevealed = true;
  appShell.classList.remove("insight-is-hidden");
  rightPanel.classList.add("is-revealed");
  rightPanel.setAttribute("aria-hidden", "false");
  insightContent.setAttribute("aria-hidden", "false");
}

function openAnalysisDrawer() {
  analysisDrawer.hidden = false;
  analysisScrim.hidden = false;
  analysisDrawer.setAttribute("aria-hidden", "false");
  analysisOpen.setAttribute("aria-expanded", "true");
}

function closeAnalysisDrawer() {
  analysisDrawer.hidden = true;
  analysisScrim.hidden = true;
  analysisDrawer.setAttribute("aria-hidden", "true");
  analysisOpen.setAttribute("aria-expanded", "false");
}

function openAboutDrawer() {
  closeAnalysisDrawer();
  aboutDrawer.hidden = false;
  aboutScrim.hidden = false;
  aboutDrawer.setAttribute("aria-hidden", "false");
  aboutOpen.setAttribute("aria-expanded", "true");
}

function closeAboutDrawer() {
  aboutDrawer.hidden = true;
  aboutScrim.hidden = true;
  aboutDrawer.setAttribute("aria-hidden", "true");
  aboutOpen.setAttribute("aria-expanded", "false");
}

function updateStaticText() {
  document.documentElement.lang = activeChapter === "chapter3" ? chapter3Copy().htmlLang : activeChapter === "chapter2" ? chapter2Copy().htmlLang : t("htmlLang");
  document.title = activeChapter === "chapter3" ? chapter3Copy().title : activeChapter === "chapter2" ? chapter2Copy().title : t("pageTitle");
  Object.entries(staticTextEls).forEach(([key, element]) => {
    if (!element) return;
    if (activeChapter === "chapter3" && key === "pageTitle") element.textContent = chapter3Copy().title;
    else if (activeChapter === "chapter3" && key === "introText") element.textContent = chapter3Copy().intro;
    else if (activeChapter === "chapter2" && key === "pageTitle") element.textContent = chapter2Copy().title;
    else if (activeChapter === "chapter2" && key === "introText") element.textContent = chapter2Copy().intro;
    else element.textContent = t(key);
  });
  layerList.setAttribute("aria-label", t("layerListLabel"));
  resetView.textContent = t("reset");
  resetView.title = t("resetTitle");
  languageMenuButton.textContent = languageShortLabels[activeLang] ?? "EN";
  languageMenuButton.setAttribute("aria-label", `${t("languageLabel")}: ${languageShortLabels[activeLang] ?? "EN"}`);
  analysisOpen.textContent = t("readFullAnalysis");
  analysisOpen.setAttribute("aria-expanded", analysisDrawer.hidden ? "false" : "true");
  analysisClose.textContent = t("closeAnalysis");
  analysisClose.setAttribute("aria-label", t("closeAnalysis"));
  aboutOpen.textContent = t("aboutLink");
  aboutOpen.setAttribute("aria-expanded", aboutDrawer.hidden ? "false" : "true");
  aboutEyebrow.textContent = t("aboutEyebrow");
  aboutTitle.textContent = t("aboutTitle");
  aboutDescription.textContent = t("aboutDescription");
  aboutBuilder.textContent = t("aboutBuilder");
  aboutFocus.textContent = t("aboutFocus");
  aboutAudience.textContent = t("aboutAudience");
  aboutUpdated.textContent = t("aboutUpdated");
  aboutContact.textContent = t("aboutContact");
  aboutContact.href = "mailto:hello@dandanstop.me";
  aboutClose.textContent = t("closeAnalysis");
  aboutClose.setAttribute("aria-label", t("closeAnalysis"));
  document.querySelectorAll(".language-button").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.lang === activeLang);
  });
  document.querySelectorAll(".chapter-button").forEach((button) => {
    const copy = activeChapter === "chapter3" ? chapter3Copy() : chapter2Copy();
    button.textContent = copy.chapterLabels?.[button.dataset.chapter] ?? button.textContent;
    button.classList.toggle("is-active", button.dataset.chapter === activeChapter);
  });
}

function hydrateUi() {
  layerList.innerHTML = "";
  modeList.innerHTML = "";
  labelLayer.innerHTML = "";
  labels.clear();
  layerList.hidden = activeChapter !== "chapter1";
  modeList.hidden = activeChapter === "chapter1";

  if (activeChapter === "chapter3") {
    const copy = chapter3Copy();
    modeList.setAttribute("aria-label", copy.modeListLabel);
    copy.modes.forEach((mode, index) => {
      const button = document.createElement("button");
      button.className = "mode-button";
      button.type = "button";
      button.id = `mode-${mode.id}`;
      button.role = "tab";
      button.dataset.mode = mode.id;
      button.innerHTML = `
        <span>
          <span class="mode-title">${mode.name}</span>
          <span class="mode-role">${mode.role}</span>
        </span>
        <span class="mode-index">C3-${String(index + 1).padStart(2, "0")}</span>
      `;
      button.addEventListener("click", () => {
        revealInsights();
        selectChapter3Mode(mode.id, true);
        trackEvent("mode_select", {
          chapter_id: "chapter3",
          mode_id: mode.id,
          mode_name: mode.name,
          interaction_source: "menu"
        });
      });
      modeList.appendChild(button);
    });

    Object.entries(copy.nodes ?? chapter3Content.en.nodes).forEach(([nodeId, [label]]) => {
      const nodeLabel = document.createElement("div");
      nodeLabel.className = "scene-label";
      nodeLabel.style.setProperty("--layer-color", nodeId === "cpu" ? "#e1ff5b" : nodeId === "gpu" ? "#19d3ff" : "#5eead4");
      nodeLabel.textContent = label;
      labelLayer.appendChild(nodeLabel);
      labels.set(nodeId, nodeLabel);
    });
    return;
  }

  if (activeChapter === "chapter2") {
    const copy = chapter2Copy();
    modeList.setAttribute("aria-label", copy.modeListLabel);
    copy.modes.forEach((mode, index) => {
      const button = document.createElement("button");
      button.className = "mode-button";
      button.type = "button";
      button.id = `mode-${mode.id}`;
      button.role = "tab";
      button.dataset.mode = mode.id;
      button.innerHTML = `
        <span>
          <span class="mode-title">${mode.name}</span>
          <span class="mode-role">${mode.role}</span>
        </span>
        <span class="mode-index">C2-${String(index + 1).padStart(2, "0")}</span>
      `;
      button.addEventListener("click", () => {
        revealInsights();
        selectChapter2Mode(mode.id, true);
        trackEvent("mode_select", {
          chapter_id: "chapter2",
          mode_id: mode.id,
          mode_name: mode.name,
          interaction_source: "menu"
        });
      });
      modeList.appendChild(button);
    });

    Object.entries(copy.nodes).forEach(([nodeId, [label]]) => {
      const nodeLabel = document.createElement("div");
      nodeLabel.className = "scene-label";
      nodeLabel.style.setProperty("--layer-color", nodeId === "dataset" || nodeId === "trainGpu" ? "#ffb84d" : "#19d3ff");
      nodeLabel.textContent = label;
      labelLayer.appendChild(nodeLabel);
      labels.set(nodeId, nodeLabel);
    });
    [
      ["lane-training", copy.laneLabels.training, "#ffb84d"],
      ["lane-inference", copy.laneLabels.inference, "#19d3ff"]
    ].forEach(([labelId, text, color]) => {
      const laneLabel = document.createElement("div");
      laneLabel.className = "scene-label lane-label";
      laneLabel.style.setProperty("--layer-color", color);
      laneLabel.textContent = text;
      labelLayer.appendChild(laneLabel);
      labels.set(labelId, laneLabel);
    });
    return;
  }

  layers.forEach((layer, index) => {
    const copy = localizedLayer(layer);
    const button = document.createElement("button");
    button.className = "layer-button";
    button.type = "button";
    button.id = `tab-${layer.id}`;
    button.role = "tab";
    button.style.setProperty("--layer-color", `#${layer.color.toString(16).padStart(6, "0")}`);
    button.innerHTML = `
      <span class="dot"></span>
      <span class="layer-copy">
        <span class="layer-title">${copy.name}</span>
        <span class="layer-role">${copy.role}</span>
      </span>
      <span class="layer-index">${String(index + 1).padStart(2, "0")}</span>
    `;
    button.addEventListener("click", () => {
      revealInsights();
      selectLayer(layer.id);
      trackEvent("layer_select", {
        chapter_id: "chapter1",
        layer_id: layer.id,
        layer_name: localizedLayer(layer).name,
        interaction_source: "menu"
      });
    });
    layerList.appendChild(button);

    const label = document.createElement("div");
    label.className = "scene-label";
    label.style.setProperty("--layer-color", `#${layer.color.toString(16).padStart(6, "0")}`);
    label.textContent = copy.name;
    labelLayer.appendChild(label);
    labels.set(layer.id, label);
  });
}

function updateAudioDock() {
  const copy = activeAudioUi();
  const transcriptOpen = transcriptPanel.getAttribute("aria-hidden") === "false";
  audioDock.hidden = false;
  transcriptPanel.hidden = !transcriptOpen;
  audioLabel.textContent = copy.audioLabel;
  audioToggle.textContent = audioPlaying ? copy.pause : copy.play;
  audioToggle.setAttribute("aria-pressed", audioPlaying ? "true" : "false");
  audioToggle.classList.toggle("is-active", audioPlaying);
  transcriptToggle.textContent = copy.transcript;
  transcriptToggle.classList.toggle("is-active", transcriptOpen);
  audioSegmentTitle.textContent = activeBriefingTitle();
  transcriptText.textContent = activeBriefingText();
}

function insightWord() {
  if (activeLang === "zh") return "洞察";
  if (activeLang === "ko") return "인사이트";
  if (activeLang === "ja") return "インサイト";
  return "Insight";
}

function renderMetrics(metrics) {
  return metrics
    .map(([value, label]) => `<div class="metric"><strong>${value}</strong><span>${label}</span></div>`)
    .join("");
}

function renderInsightPanels({
  eyebrow,
  title,
  lede,
  metrics,
  summaryHeading,
  summaryText,
  supplierHeading,
  supplierHtml,
  riskHeading,
  riskText: fullRiskText
}) {
  document.querySelector("#insightEyebrow").textContent = eyebrow;
  detailTitle.textContent = title;
  detailLede.textContent = lede;
  metricGrid.innerHTML = renderMetrics(metrics);
  staticTextEls.riskHeading.textContent = summaryHeading;
  riskText.textContent = summaryText;

  analysisEyebrow.textContent = eyebrow;
  analysisTitle.textContent = t("fullAnalysis");
  analysisLede.textContent = lede;
  analysisMetricGrid.innerHTML = renderMetrics(metrics);
  analysisSupplierHeading.textContent = supplierHeading;
  analysisSupplierList.innerHTML = supplierHtml;
  analysisRiskHeading.textContent = riskHeading;
  analysisRiskText.textContent = fullRiskText;
  analysisOpen.textContent = t("readFullAnalysis");
  analysisClose.textContent = t("closeAnalysis");
}

function updateChapter2Insight() {
  const copy = chapter2Copy();
  const mode = chapter2Mode();
  const node = selectedNode && selectedNode !== selectedMode ? chapter2Node(selectedNode) : null;
  renderInsightPanels({
    eyebrow: node ? node[0] : mode.name,
    title: insightWord(),
    lede: node ? node[1] : mode.lede,
    metrics: mode.metrics,
    summaryHeading: copy.contextHeading,
    summaryText: copy.transcriptText,
    supplierHeading: copy.implicationHeading,
    supplierHtml: mode.insights
      .map(([title, body]) => `<li><strong>${title}</strong><span>${body}</span></li>`)
      .join(""),
    riskHeading: copy.contextHeading,
    riskText: copy.transcriptText
  });
  activeLayerName.textContent = node ? node[0] : mode.name;
  activeLayerSignal.textContent = node ? node[1] : mode.signal;
  document.querySelectorAll(".mode-button").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.mode === selectedMode);
    button.setAttribute("aria-selected", button.dataset.mode === selectedMode ? "true" : "false");
  });
  updateAudioDock();
}

function updateChapter3Insight() {
  const copy = chapter3Copy();
  const mode = chapter3Mode();
  const node = selectedChapter3Node && selectedChapter3Node !== selectedChapter3Mode ? chapter3Node(selectedChapter3Node) : null;
  renderInsightPanels({
    eyebrow: node ? node[0] : mode.id === "overview" ? "Agentic AI" : mode.name,
    title: insightWord(),
    lede: node ? node[1] : mode.lede,
    metrics: mode.metrics,
    summaryHeading: copy.contextHeading,
    summaryText: mode.risk,
    supplierHeading: copy.supplierHeading,
    supplierHtml: mode.suppliers.map((item) => `<li>${item}</li>`).join(""),
    riskHeading: copy.contextHeading,
    riskText: mode.risk
  });
  activeLayerName.textContent = node ? node[0] : mode.name;
  activeLayerSignal.textContent = node ? node[1] : mode.signal;
  document.querySelectorAll(".mode-button").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.mode === selectedChapter3Mode);
    button.setAttribute("aria-selected", button.dataset.mode === selectedChapter3Mode ? "true" : "false");
  });
  updateAudioDock();
}

function selectChapter3Mode(modeId, shouldReveal = false) {
  selectedChapter3Mode = modeId;
  selectedChapter3Node = modeId;
  activeChapter3SegmentId = modeId;
  if (shouldReveal) revealInsights();
  updateChapter3Insight();
  if (audioPlaying) playAudioBriefing();
  const focusTargets = {
    overview: new THREE.Vector3(0.55, 0.95, 0.35),
    core: new THREE.Vector3(1.65, 1.05, 0.15),
    infrastructure: new THREE.Vector3(-1.65, 0.65, 0.95)
  };
  controls.target.lerp(focusTargets[modeId] ?? focusTargets.overview, 0.58);
}

function focusChapter3Node(nodeId) {
  selectedChapter3Node = nodeId;
  activeChapter3SegmentId = nodeId;
  const infraNodes = new Set(["laptop", "terminal"]);
  const coreNodes = new Set(["robot", "workflow", "running", "autoplan", "tooluse", "memory", "continuous"]);
  selectedChapter3Mode = infraNodes.has(nodeId) ? "infrastructure" : coreNodes.has(nodeId) ? "core" : "overview";
  revealInsights();
  updateChapter3Insight();
  playAudioBriefing();
  trackAudioPlay();
  const group = chapter3GroupByNode.get(nodeId);
  if (group) controls.target.lerp(new THREE.Vector3(group.position.x, group.position.y + 0.35, group.position.z), 0.58);
}

function selectChapter2Mode(modeId, shouldReveal = false) {
  selectedMode = modeId;
  selectedNode = modeId;
  activeSegmentId = modeId;
  if (shouldReveal) revealInsights();
  updateChapter2Insight();
  if (audioPlaying) playAudioBriefing();
  const focusTargets = {
    compare: new THREE.Vector3(0.75, 0.7, 0),
    training: new THREE.Vector3(-3.25, 0.8, 0.15),
    inference: new THREE.Vector3(5.35, 0.8, 0.1)
  };
  controls.target.lerp(focusTargets[modeId] ?? focusTargets.compare, 0.58);
}

function focusChapter2Node(nodeId) {
  const trainingNodes = new Set(["dataset", "preprocess", "trainGpu", "interconnect", "checkpoint", "artifact"]);
  selectedMode = trainingNodes.has(nodeId) ? "training" : "inference";
  selectedNode = nodeId;
  activeSegmentId = nodeId;
  revealInsights();
  updateChapter2Insight();
  playAudioBriefing();
  trackAudioPlay();
  const group = chapter2GroupByNode.get(nodeId);
  if (group) controls.target.lerp(new THREE.Vector3(group.position.x, group.position.y + 0.45, group.position.z), 0.58);
}

function selectChapter(chapterId) {
  activeChapter = chapterId;
  hovered = null;
  root.visible = activeChapter === "chapter1";
  chapter2Root.visible = activeChapter === "chapter2";
  chapter3Root.visible = activeChapter === "chapter3";
  stopAudioBriefing(false);
  transcriptPanel.hidden = true;
  transcriptPanel.setAttribute("aria-hidden", "true");
  transcriptToggle?.setAttribute("aria-expanded", "false");
  hideInsights();
  if (activeChapter === "chapter2") {
    selectedMode = "compare";
    selectedNode = "compare";
    activeSegmentId = "compare";
    document.documentElement.lang = chapter2Copy().htmlLang;
    document.title = chapter2Copy().title;
    staticTextEls.pageTitle.textContent = chapter2Copy().title;
    staticTextEls.introText.textContent = chapter2Copy().intro;
    hydrateUi();
    updateStaticText();
    updateChapter2Insight();
    camera.position.set(10.8, 7.6, 12.2);
    controls.target.set(0.75, 0.7, 0);
    return;
  }
  if (activeChapter === "chapter3") {
    selectedChapter3Mode = "overview";
    selectedChapter3Node = "overview";
    activeChapter3SegmentId = "overview";
    document.documentElement.lang = chapter3Copy().htmlLang;
    document.title = chapter3Copy().title;
    staticTextEls.pageTitle.textContent = chapter3Copy().title;
    staticTextEls.introText.textContent = chapter3Copy().intro;
    hydrateUi();
    updateStaticText();
    updateChapter3Insight();
    camera.position.set(9.2, 6.8, 11.4);
    controls.target.set(0, 1.35, 0);
    return;
  }
  hydrateUi();
  updateStaticText();
  selectLayer(selectedId);
  camera.position.set(12, 9, 14);
  controls.target.set(0, 1.1, 0);
}

function setLanguageMenuOpen(open) {
  languagePanel.hidden = !open;
  languageTabs.hidden = !open;
  languageMenuButton.setAttribute("aria-expanded", open ? "true" : "false");
}

function selectLayer(id) {
  selectedId = id;
  const layer = localizedLayer(layers.find((item) => item.id === id));
  renderInsightPanels({
    eyebrow: layer.name,
    title: t("insightTitle"),
    lede: layer.lede,
    metrics: layer.metrics,
    summaryHeading: t("riskHeading"),
    summaryText: layer.risk,
    supplierHeading: t("supplierHeading"),
    supplierHtml: layer.suppliers.map((item) => `<li>${item}</li>`).join(""),
    riskHeading: t("riskHeading"),
    riskText: layer.risk
  });
  activeLayerName.textContent = `${layer.name} ${layerIndexLabel(id)}`;
  activeLayerSignal.textContent = layer.signal;
  document.querySelectorAll(".layer-button").forEach((button) => {
    button.classList.toggle("is-active", button.id === `tab-${id}`);
    button.setAttribute("aria-selected", button.id === `tab-${id}` ? "true" : "false");
  });
  const target = groupByLayer.get(id)?.position;
  if (target) controls.target.lerp(new THREE.Vector3(target.x, target.y + 0.7, target.z), 0.45);
  updateAudioDock();
  if (audioPlaying) playAudioBriefing();
}

function resize() {
  const rect = canvas.parentElement.getBoundingClientRect();
  renderer.setSize(rect.width, rect.height, false);
  camera.aspect = rect.width / rect.height;
  camera.updateProjectionMatrix();
}

function updateLabels() {
  const rect = canvas.getBoundingClientRect();
  if (activeChapter === "chapter3") {
    const hiddenOverviewLabels = new Set(["laptop", "terminal"]);
    const labelPixelOffsets = {
      autoplan: [-76, -2],
      tooluse: [96, -2],
      memory: [-76, 34],
      continuous: [96, 34]
    };
    chapter3GroupByNode.forEach((group, nodeId) => {
      const label = labels.get(nodeId);
      if (!label) return;
      const pos = group.position.clone();
      pos.y +=
        nodeId === "robot" ? 2.15 :
        nodeId === "workflow" ? 1.18 :
        nodeId === "running" ? 1.78 :
        ["autoplan", "tooluse", "memory", "continuous"].includes(nodeId) ? 0.02 :
        0.55;
      pos.project(camera);
      const visible = group.visible && pos.z < 1 && !(selectedChapter3Mode === "overview" && hiddenOverviewLabels.has(nodeId));
      const [offsetX, offsetY] = labelPixelOffsets[nodeId] ?? [0, 0];
      label.style.opacity = visible ? "1" : "0";
      label.style.transform = `translate(${(pos.x * 0.5 + 0.5) * rect.width + offsetX}px, ${(-pos.y * 0.5 + 0.5) * rect.height + offsetY}px) translate(-50%, -50%)`;
    });
    return;
  }
  if (activeChapter === "chapter2") {
    const lanePositions = {
      "lane-training": {
        mode: "training",
        position: new THREE.Vector3(-3.75, 2.1, 1.58)
      },
      "lane-inference": {
        mode: "inference",
        position: new THREE.Vector3(5.35, 2.1, 1.25)
      }
    };
    Object.entries(lanePositions).forEach(([labelId, config]) => {
      const label = labels.get(labelId);
      if (!label) return;
      const pos = config.position.clone();
      pos.project(camera);
      const visible = chapter2ModeVisible(config.mode) && pos.z < 1;
      label.style.opacity = visible ? "1" : "0";
      label.style.transform = `translate(${(pos.x * 0.5 + 0.5) * rect.width}px, ${(-pos.y * 0.5 + 0.5) * rect.height}px) translate(-50%, -50%)`;
    });
    chapter2GroupByNode.forEach((group, nodeId) => {
      const label = labels.get(nodeId);
      if (!label) return;
      const pos = group.position.clone();
      pos.y += 0.9;
      pos.project(camera);
      const visible = group.visible && pos.z < 1;
      label.style.opacity = visible ? "1" : "0";
      label.style.transform = `translate(${(pos.x * 0.5 + 0.5) * rect.width}px, ${(-pos.y * 0.5 + 0.5) * rect.height}px) translate(-50%, -50%)`;
    });
    return;
  }
  layers.forEach((layer) => {
    const group = groupByLayer.get(layer.id);
    const label = labels.get(layer.id);
    const pos = group.position.clone();
    pos.y += layer.id === "ops" ? 1.05 : 0.72;
    pos.project(camera);
    const visible = pos.z < 1;
    label.style.opacity = visible ? "1" : "0";
    label.style.transform = `translate(${(pos.x * 0.5 + 0.5) * rect.width}px, ${(-pos.y * 0.5 + 0.5) * rect.height}px) translate(-50%, -50%)`;
  });
}

function setPointer(event) {
  const rect = canvas.getBoundingClientRect();
  pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
}

function pointerMove(event) {
  setPointer(event);
  if (event.buttons) revealInsights();
  raycaster.setFromCamera(pointer, camera);
  const hits = raycaster.intersectObjects(clickable, false);
  const hit = hits.find(({ object }) => {
    const chapter = object.userData.chapter ?? "chapter1";
    if (chapter !== activeChapter) return false;
    if (chapter === "chapter3") return chapter3NodeVisible(object.userData.nodeId);
    if (chapter === "chapter2") return chapter2NodeVisible(object.userData.nodeId);
    return true;
  });
  hovered = activeChapter === "chapter3" ? hit?.object?.userData.nodeId ?? null : activeChapter === "chapter2" ? hit?.object?.userData.nodeId ?? null : hit?.object?.userData.layerId ?? null;
  canvas.style.cursor = hovered ? "pointer" : "grab";
}

function pointerDown(event) {
  revealInsights();
  setPointer(event);
  raycaster.setFromCamera(pointer, camera);
  const hits = raycaster.intersectObjects(clickable, false);
  const hit = hits.find(({ object }) => {
    const chapter = object.userData.chapter ?? "chapter1";
    if (chapter !== activeChapter) return false;
    if (chapter === "chapter3") return chapter3NodeVisible(object.userData.nodeId);
    if (chapter === "chapter2") return chapter2NodeVisible(object.userData.nodeId);
    return true;
  });
  if (activeChapter === "chapter3") {
    const nodeId = hit?.object?.userData.nodeId;
    if (nodeId) {
      focusChapter3Node(nodeId);
      trackEvent("model_select", {
        chapter_id: "chapter3",
        node_id: nodeId,
        mode_id: selectedChapter3Mode,
        interaction_source: "model"
      });
    }
    return;
  }
  if (activeChapter === "chapter2") {
    const nodeId = hit?.object?.userData.nodeId;
    if (nodeId) {
      focusChapter2Node(nodeId);
      trackEvent("model_select", {
        chapter_id: "chapter2",
        node_id: nodeId,
        mode_id: selectedMode,
        interaction_source: "model"
      });
    }
    return;
  }
  const hitId = hit?.object?.userData.layerId;
  if (hitId) {
    selectLayer(hitId);
    trackEvent("layer_select", {
      chapter_id: "chapter1",
      layer_id: hitId,
      layer_name: localizedLayer(layers.find((item) => item.id === hitId)).name,
      interaction_source: "model"
    });
  }
}

function interpolatePath(points, progress) {
  const clamped = ((progress % 1) + 1) % 1;
  const scaled = clamped * (points.length - 1);
  const index = Math.min(points.length - 2, Math.floor(scaled));
  const local = scaled - index;
  return points[index].clone().lerp(points[index + 1], local);
}

function chapter2ModeVisible(mode) {
  return selectedMode === "compare" || selectedMode === mode;
}

function chapter2NodeVisible(nodeId) {
  const nodeMode = chapter2GroupByNode.get(nodeId)?.userData.mode;
  return nodeMode ? chapter2ModeVisible(nodeMode) : false;
}

function chapter3NodeVisible(nodeId) {
  if (selectedChapter3Mode === "overview") return true;
  const coreNodes = new Set(["robot", "workflow", "running", "autoplan", "tooluse", "memory", "continuous"]);
  const infraNodes = new Set(["robot", "laptop", "terminal"]);
  if (selectedChapter3Mode === "core") return coreNodes.has(nodeId);
  if (selectedChapter3Mode === "infrastructure") return infraNodes.has(nodeId);
  return true;
}

function animateChapter2(time) {
  chapter2GroupByNode.forEach((group, id) => {
    const nodeMode = group.userData.mode;
    const active = id === selectedNode || selectedNode === nodeMode || selectedMode === "compare";
    const visible = chapter2ModeVisible(nodeMode);
    group.visible = visible;
    group.position.y = group.userData.base.y + (active ? 0.12 + Math.sin(time * 2.4 + id.length) * 0.035 : 0);
    group.rotation.y = Math.sin(time * 0.45 + id.length) * 0.025;
    group.traverse((child) => {
      if (!child.material || child.type === "Line") return;
      child.material.emissive = child.material.emissive || new THREE.Color(0x000000);
      child.material.emissiveIntensity = active ? 0.28 : visible ? 0.06 : 0.015;
      if (child.material.opacity !== undefined) {
        child.material.opacity = visible ? child.material.userData.originalOpacity ?? 1 : 0.36;
      }
    });
  });

  chapter2FlowLines.forEach((line) => {
    const visible = chapter2ModeVisible(line.userData.mode);
    line.visible = visible;
    line.material.opacity = selectedMode === "compare" ? 0.58 : 0.84;
    line.material.dashOffset = -time * line.userData.speed;
  });

  chapter2Particles.forEach((particle) => {
    const visible = chapter2ModeVisible(particle.userData.mode);
    particle.visible = visible;
    if (!visible) return;
    const speed = particle.userData.mode === "training" ? 0.18 : 0.42;
    const pos = interpolatePath(particle.userData.path, time * speed + particle.userData.offset);
    particle.position.copy(pos);
    const scale = particle.userData.mode === "training" ? 1.2 + Math.sin(time * 3) * 0.08 : 0.8 + Math.sin(time * 7 + particle.userData.offset) * 0.22;
    particle.scale.setScalar(scale);
  });
}

function animateChapter3(time) {
  chapter3GroupByNode.forEach((group, id) => {
    const visible = chapter3NodeVisible(id);
    const active = id === selectedChapter3Node || selectedChapter3Mode === "overview";
    group.visible = visible;
    const coreOffset = selectedChapter3Mode === "core" && ["workflow", "running", "autoplan", "tooluse", "memory", "continuous"].includes(id) ? 0.08 : 0;
    group.position.y = group.userData.base.y + (visible ? Math.sin(time * 1.8 + id.length) * 0.025 : 0) + coreOffset;
    group.rotation.y = Math.sin(time * 0.35 + id.length) * 0.018;
    group.traverse((child) => {
      if (!child.material || child.type === "Line") return;
      child.material.emissive = child.material.emissive || new THREE.Color(0x000000);
      child.material.emissiveIntensity = active ? 0.24 : selectedChapter3Mode === "infrastructure" && ["laptop", "terminal"].includes(id) ? 0.32 : 0.06;
      if (child.material.opacity !== undefined) child.material.opacity = visible ? child.material.userData.originalOpacity ?? 1 : 0.2;
    });
  });

  chapter3FlowLines.forEach((line) => {
    const role = line.userData.role;
    const visible =
      selectedChapter3Mode === "overview" ||
      (selectedChapter3Mode === "core" && ["core", "orchestration"].includes(role)) ||
      (selectedChapter3Mode === "infrastructure" && role === "infra");
    line.visible = visible;
    line.material.opacity =
      selectedChapter3Mode === "overview" ? (role === "core" ? 0.34 : 0.18) :
      selectedChapter3Mode === "core" ? (role === "core" ? 0.46 : 0.28) :
      0.4;
    line.material.dashOffset = -time * line.userData.speed;
  });

  chapter3Particles.forEach((particle) => {
    const role = particle.userData.role;
    particle.visible =
      selectedChapter3Mode === "overview" ||
      (selectedChapter3Mode === "core" && ["core", "orchestration"].includes(role)) ||
      (selectedChapter3Mode === "infrastructure" && role === "infra");
    if (!particle.visible) return;
    const pos = interpolatePath(particle.userData.path, time * 0.28 + particle.userData.offset);
    particle.position.copy(pos);
    particle.scale.setScalar(0.85 + Math.sin(time * 5 + particle.userData.offset) * 0.16);
  });
}

function animate() {
  requestAnimationFrame(animate);
  const time = performance.now() * 0.001;
  explodeCurrent += (explodeTarget - explodeCurrent) * 0.08;

  if (activeChapter === "chapter1") {
    groupByLayer.forEach((group, id) => {
      const target = group.userData.compact.clone().lerp(group.userData.exploded, explodeCurrent);
      if (id === selectedId) target.y += 0.24 + Math.sin(time * 2.2) * 0.035;
      group.position.lerp(target, 0.12);
      group.rotation.y = Math.sin(time * 0.5 + id.length) * 0.018;

      group.traverse((child) => {
        if (!child.material || child.type === "Line") return;
        const isActive = id === selectedId || id === hovered;
        child.material.emissive = child.material.emissive || new THREE.Color(0x000000);
        child.material.emissiveIntensity = isActive ? 0.18 : 0.035;
      });
    });

    flowLines.forEach((line, index) => {
      line.visible = true;
      if (line.material.dashSize) line.material.dashOffset = -time * (0.38 + index * 0.015);
    });
  } else if (activeChapter === "chapter2") {
    flowLines.forEach((line) => {
      line.visible = false;
    });
    animateChapter2(time);
  } else if (activeChapter === "chapter3") {
    flowLines.forEach((line) => {
      line.visible = false;
    });
    chapter2FlowLines.forEach((line) => {
      line.visible = false;
    });
    chapter2Particles.forEach((particle) => {
      particle.visible = false;
    });
    animateChapter3(time);
  }

  controls.autoRotate = true;
  controls.autoRotateSpeed = 0.38;
  controls.update();
  renderer.render(scene, camera);
  updateLabels();
}

explodeRange.addEventListener("input", () => {
  revealInsights();
  explodeTarget = Number(explodeRange.value) / 100;
});

resetView.addEventListener("click", () => {
  if (activeChapter === "chapter3") {
    stopAudioBriefing();
    camera.position.set(9.2, 6.8, 11.4);
    controls.target.set(0, 1.35, 0);
    selectChapter3Mode("overview", false);
    hideInsights();
    return;
  }
  if (activeChapter === "chapter2") {
    stopAudioBriefing();
    camera.position.set(10.8, 7.6, 12.2);
    controls.target.set(0.75, 0.7, 0);
    selectChapter2Mode("compare", false);
    hideInsights();
    return;
  }
  camera.position.set(12, 9, 14);
  controls.target.set(0, 1.1, 0);
  explodeRange.value = "72";
  explodeTarget = 0.72;
  selectLayer("compute");
});

languageTabs.addEventListener("click", (event) => {
  const button = event.target.closest("[data-lang]");
  if (!button) return;
  activeLang = button.dataset.lang;
  setLanguageMenuOpen(false);
  updateStaticText();
  hydrateUi();
  applyColorScheme(activeScheme);
  if (activeChapter === "chapter3") {
    updateChapter3Insight();
    if (audioPlaying) playAudioBriefing();
  } else if (activeChapter === "chapter2") {
    updateChapter2Insight();
    if (audioPlaying) playAudioBriefing();
  } else {
    selectLayer(selectedId);
  }
  trackEvent("language_select", {
    language: activeLang
  });
});

languageMenuButton.addEventListener("click", () => {
  setLanguageMenuOpen(languageTabs.hidden);
});

document.addEventListener("click", (event) => {
  if (event.target.closest("#globalLanguageMenu")) return;
  setLanguageMenuOpen(false);
});

chapterTabs.addEventListener("click", (event) => {
  const button = event.target.closest("[data-chapter]");
  if (!button) return;
  const previousChapter = activeChapter;
  selectChapter(button.dataset.chapter);
  if (previousChapter !== activeChapter) {
    trackEvent("chapter_select", {
      chapter_id: activeChapter,
      previous_chapter_id: previousChapter
    });
  }
});

analysisOpen.addEventListener("click", () => {
  revealInsights();
  openAnalysisDrawer();
  trackEvent("analysis_open", {
    segment_id: activeSegmentForTracking()
  });
});

analysisClose.addEventListener("click", closeAnalysisDrawer);
analysisScrim.addEventListener("click", closeAnalysisDrawer);
aboutOpen.addEventListener("click", () => {
  openAboutDrawer();
  trackEvent("about_open");
});
aboutClose.addEventListener("click", closeAboutDrawer);
aboutScrim.addEventListener("click", closeAboutDrawer);
aboutContact.addEventListener("click", () => {
  trackEvent("contact_click", {
    contact_method: "email"
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;
  if (!analysisDrawer.hidden) closeAnalysisDrawer();
  if (!aboutDrawer.hidden) closeAboutDrawer();
});

audioToggle.addEventListener("click", () => {
  if (audioPlaying) stopAudioBriefing();
  else {
    playAudioBriefing();
    trackAudioPlay();
  }
});

transcriptToggle.addEventListener("click", () => {
  const isOpen = transcriptPanel.getAttribute("aria-hidden") === "false";
  transcriptPanel.setAttribute("aria-hidden", isOpen ? "true" : "false");
  transcriptPanel.hidden = isOpen;
  transcriptToggle.setAttribute("aria-expanded", isOpen ? "false" : "true");
  updateAudioDock();
  if (!isOpen) {
    trackEvent("transcript_open", {
      segment_id: activeSegmentForTracking()
    });
  }
});

audioPlayer.addEventListener("ended", () => {
  audioPlaying = false;
  updateAudioDock();
});

audioPlayer.addEventListener("error", () => {
  if (!audioPlaying) return;
  speakBriefingText();
});

canvas.addEventListener("pointermove", pointerMove);
canvas.addEventListener("pointerdown", pointerDown);
canvas.addEventListener("wheel", revealInsights, { passive: true });
window.addEventListener("resize", resize);

updateStaticText();
hydrateUi();
applyColorScheme(activeScheme);
resize();
selectLayer("compute");
trackEvent("project_view", {
  segment_id: activeSegmentForTracking()
});
animate();
