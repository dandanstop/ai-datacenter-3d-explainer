import * as THREE from "three";
import { OrbitControls } from "./vendor/OrbitControls.js";

const referenceCompanies = {
  schneider: { name: "Schneider Electric", url: "https://www.se.com/ww/en/" },
  eaton: { name: "Eaton", url: "https://www.eaton.com/us/en-us.html" },
  abb: { name: "ABB", url: "https://www.abb.com/global/en" },
  vertiv: { name: "Vertiv", url: "https://www.vertiv.com/en-us/" },
  gevernova: { name: "GE Vernova", url: "https://www.gevernova.com/" },
  siemensEnergy: { name: "Siemens Energy", url: "https://www.siemens-energy.com/global/en/home.html" },
  caterpillar: { name: "Caterpillar", url: "https://www.caterpillar.com/" },
  cummins: { name: "Cummins", url: "https://www.cummins.com/" },
  trane: { name: "Trane Technologies", url: "https://www.tranetechnologies.com/en/index.html" },
  jci: { name: "Johnson Controls", url: "https://www.johnsoncontrols.com/" },
  carrier: { name: "Carrier", url: "https://www.carrier.com/us/en/commercial/" },
  daikin: { name: "Daikin", url: "https://www.daikin.com/" },
  delta: { name: "Delta Electronics", url: "https://www.deltaww.com/en-US/index" },
  nvidia: { name: "NVIDIA", url: "https://www.nvidia.com/en-us/data-center/" },
  amd: { name: "AMD", url: "https://www.amd.com/en.html" },
  tsmc: { name: "TSMC", url: "https://www.tsmc.com/english" },
  micron: { name: "Micron", url: "https://www.micron.com/" },
  intelFoundry: { name: "Intel Foundry", url: "https://www.intel.com/content/www/us/en/foundry/overview.html" },
  amkor: { name: "Amkor", url: "https://amkor.com/" },
  samsungSemi: { name: "Samsung Semiconductor", url: "https://semiconductor.samsung.com/" },
  skhynix: { name: "SK hynix", url: "https://www.skhynix.com/" },
  arista: { name: "Arista Networks", url: "https://www.arista.com/en/" },
  cisco: { name: "Cisco", url: "https://www.cisco.com/" },
  broadcom: { name: "Broadcom", url: "https://www.broadcom.com/" },
  marvell: { name: "Marvell", url: "https://www.marvell.com/" },
  coherent: { name: "Coherent", url: "https://www.coherent.com/" },
  lumentum: { name: "Lumentum", url: "https://www.lumentum.com/en" },
  cloudflare: { name: "Cloudflare", url: "https://www.cloudflare.com/" },
  equinix: { name: "Equinix", url: "https://www.equinix.com/" },
  digitalrealty: { name: "Digital Realty", url: "https://www.digitalrealty.com/" },
  databank: { name: "DataBank", url: "https://www.databank.com/" },
  qts: { name: "QTS", url: "https://qtsdatacenters.com/" },
  nttdata: { name: "NTT DATA", url: "https://www.nttdata.com/global/en/" },
  azure: { name: "Microsoft Azure", url: "https://azure.microsoft.com/en-us" },
  aws: { name: "AWS", url: "https://aws.amazon.com/" },
  googleCloud: { name: "Google Cloud", url: "https://cloud.google.com/" },
  coreweave: { name: "CoreWeave", url: "https://www.coreweave.com/" },
  lambda: { name: "Lambda", url: "https://lambda.ai/" },
  crusoe: { name: "Crusoe", url: "https://www.crusoe.ai/" },
  datadog: { name: "Datadog", url: "https://www.datadoghq.com/" },
  paloalto: { name: "Palo Alto Networks", url: "https://www.paloaltonetworks.com/" },
  oracleCloud: { name: "Oracle Cloud", url: "https://www.oracle.com/cloud/" }
};

function companyLink(id, label = referenceCompanies[id]?.name) {
  const company = referenceCompanies[id];
  if (!company) return label;
  return `<a href="${company.url}" target="_blank" rel="noreferrer">${label}</a>`;
}

function externalLink(label, url) {
  return `<a href="${url}" target="_blank" rel="noreferrer">${label}</a>`;
}

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
      ["30-150MW", "一座 AI 園區通常需要多少可交付電力"],
      ["N+1", "如何避免單一電力設備故障造成停機"],
      ["18-36M", "為什麼變壓器與併網時程會拖慢上線"],
      ["PUE", "多少電力真正轉成可用算力而不是損耗"]
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
      ["40-120kW", "高密度 AI 機櫃可能產生多少熱負載"],
      ["Liquid", "為什麼液冷正逐漸取代傳統風冷"],
      ["WUE", "這套冷卻方式會帶來多少用水壓力"],
      ["Delta T", "熱能是否被有效帶離晶片與機櫃"]
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
      ["60-75%", "為什麼大部分資本支出都集中在算力硬體"],
      ["HBM", "為什麼記憶體頻寬幾乎和 GPU 數量一樣重要"],
      ["Rack-scale", "為什麼交付單位正從零件走向整櫃系統"],
      ["Yield", "封裝良率如何影響真正可出貨的算力"]
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
      ["400G/800G", "加速器之間需要多快的資料傳輸速度"],
      ["East-West", "為什麼大部分流量都在資料中心內部移動"],
      ["Latency", "為什麼慢一點的連線就會浪費昂貴 GPU 時間"],
      ["Topology", "網路設計如何決定叢集能放大到多大"]
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
      ["24-48M", "大型資料中心園區通常要多久才能正式上線"],
      ["MW/acre", "同一塊土地可以承載多少可用電力密度"],
      ["Permits", "為什麼審批流程常常比施工本身更慢"],
      ["Tier", "機房承諾的可靠度如何反映在設計標準上"]
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
      ["SLA", "企業客戶真正購買的是什麼服務保證"],
      ["Utilization", "營運商如何把 GPU 存量轉成實際收入"],
      ["Inference", "需求為何正從訓練轉向長期服務推論"],
      ["Security", "當 AI 接觸真實資料時為何治理變成核心"]
    ],
    risk: "營運平台把硬體轉換成可被客戶使用、計費與治理的算力服務。教育性觀察：長期競爭力不只來自擁有 GPU，而是來自利用率、排程效率、模型工具鏈、資料安全、SLA、客戶合約年限與能源成本管理。當硬體供給變多，差異化會從『誰有卡』逐步轉向『誰能把卡穩定、高利用率、合規地賣給客戶』。",
    color: 0xff6b9a
  }
];

const uiText = {
  zh: {
    htmlLang: "zh-Hant",
    brandName: "Compute to Grid",
    browserTitle: "Compute to Grid | AI 競賽，現在穿越電力、冷卻與電網",
    pageTitle: "AI 競賽，現在穿越電力、冷卻與電網",
    introText: "透過互動式 3D 模型，理解電力、冷卻、算力、網路、園區建設與營運如何共同構成 AI 資料中心。",
    languageLabel: "語言",
    reset: "Reset",
    resetTitle: "重置視角",
    explodeLabel: "拆解程度",
    fileWarningTitle: "正在切換到本機 HTTP server",
    fileWarningText: "直接開啟 index.html 時瀏覽器會封鎖 3D 模組。若沒有自動跳轉，請開啟 http://127.0.0.1:8124/。",
    hintDrag: "拖曳旋轉",
    hintZoom: "滾輪縮放",
    hintWheelLayer: "滾輪切換層級",
    hintClick: "點選聚焦",
    insightRevealPrompt: "與 3D 模型互動後，將顯示此層級的產業洞察。",
    insightTitle: "洞察",
    supplierHeading: "價值鏈角色",
    riskHeading: "關鍵觀察",
    chapter1SummaryHeading: "運作原理",
    chapter1BuildersHeading: "誰在打造這一層",
    chapter1FutureHeading: "未來訊號",
    chapter1SignalsHeading: "值得持續關注的訊號",
    chapter1LearnMoreHeading: "延伸閱讀",
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
    aboutContact: "Contact",
    updatesLink: "更新紀錄",
    updatesEyebrow: "更新紀錄",
    updatesTitle: "近期更新",
    updatesUpdated: "更新時間：2026 年 6 月",
    updatesDescription: "第一版於 2026 年 6 月推出。之後持續以低調但重要的方式優化內容、導覽與互動細節。",
    updatesItems: [
      "重新整理 Chapter 1 導覽，讓 3D 模型更容易先被理解",
      "調整手機版 dock 與 stage chip，讓首屏更聚焦在模型本身",
      "優化 3D 旋轉手感，讓拖曳互動更順暢自然",
      "補強 SEO 與 metadata，讓內容更容易被發現與持續索引"
    ]
  },
  en: {
    htmlLang: "en",
    brandName: "Compute to Grid",
    browserTitle: "Compute to Grid | The AI Race Now Runs Through Power, Cooling, and the Grid",
    pageTitle: "The AI Race Now Runs Through Power, Cooling, and the Grid",
    introText: "Explore how power, cooling, compute, networking, sites, and operations work together inside AI data center infrastructure.",
    languageLabel: "Language",
    reset: "Reset",
    resetTitle: "Reset view",
    explodeLabel: "Exploded view",
    fileWarningTitle: "Switching to the local HTTP server",
    fileWarningText: "Opening index.html directly blocks the 3D module. If the redirect does not happen, open http://127.0.0.1:8124/.",
    hintDrag: "Drag to rotate",
    hintZoom: "Wheel to zoom",
    hintWheelLayer: "Wheel to switch layers",
    hintClick: "Click to focus",
    insightRevealPrompt: "Interact with the 3D model to reveal this layer's insight.",
    insightTitle: "Insight",
    supplierHeading: "Value-chain roles",
    riskHeading: "Key finding",
    chapter1SummaryHeading: "How it works",
    chapter1BuildersHeading: "Who builds this layer",
    chapter1FutureHeading: "Future signal",
    chapter1SignalsHeading: "Signals to watch",
    chapter1LearnMoreHeading: "Learn more",
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
    aboutContact: "Contact",
    updatesLink: "Updates",
    updatesEyebrow: "Updates",
    updatesTitle: "Recent updates",
    updatesUpdated: "Updated: June 2026",
    updatesDescription: "Version 1 launched in June 2026. Since then, the project has continued to evolve through small but meaningful upgrades to content, navigation, and interaction design.",
    updatesItems: [
      "Refined Chapter 1 navigation so the 3D model is easier to understand at first glance",
      "Improved the mobile dock and stage chip to keep the first screen focused on the model",
      "Smoothed 3D rotation behavior so drag interactions feel calmer and more natural",
      "Strengthened SEO and metadata foundations so the explainer is easier to discover and revisit"
    ]
  },
  ko: {
    htmlLang: "ko",
    brandName: "Compute to Grid",
    browserTitle: "Compute to Grid | 이제 AI 경쟁은 전력, 냉각, 전력망을 통해 전개된다",
    pageTitle: "이제 AI 경쟁은 전력, 냉각, 전력망을 통해 전개된다",
    introText: "인터랙티브 3D 모델을 통해 전력, 냉각, 컴퓨트, 네트워크, 캠퍼스 구축, 운영이 어떻게 AI 데이터센터를 이루는지 살펴보세요.",
    languageLabel: "언어",
    reset: "초기화",
    resetTitle: "시점 초기화",
    explodeLabel: "분해 정도",
    fileWarningTitle: "로컬 HTTP 서버로 이동 중",
    fileWarningText: "index.html을 직접 열면 브라우저가 3D 모듈을 차단합니다. 자동 이동이 되지 않으면 http://127.0.0.1:8124/ 을 여세요.",
    hintDrag: "드래그 회전",
    hintZoom: "휠 확대",
    hintWheelLayer: "휠로 레이어 전환",
    hintClick: "클릭 포커스",
    insightRevealPrompt: "3D 모델과 상호작용하면 이 레이어의 인사이트가 표시됩니다.",
    insightTitle: "인사이트",
    supplierHeading: "밸류체인 역할",
    riskHeading: "산업 배경",
    chapter1SummaryHeading: "작동 원리",
    chapter1BuildersHeading: "누가 이 레이어를 만드는가",
    chapter1FutureHeading: "미래 신호",
    chapter1SignalsHeading: "계속 지켜볼 신호",
    chapter1LearnMoreHeading: "더 읽어보기",
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
    aboutContact: "Contact",
    updatesLink: "업데이트",
    updatesEyebrow: "업데이트",
    updatesTitle: "최근 업데이트",
    updatesUpdated: "업데이트: 2026년 6월",
    updatesDescription: "Version 1은 2026년 6월에 공개되었습니다. 그 이후로도 콘텐츠, 내비게이션, 인터랙션을 중심으로 작지만 의미 있는 개선을 계속 더해왔습니다.",
    updatesItems: [
      "3D 모델을 처음부터 더 쉽게 이해할 수 있도록 Chapter 1 내비게이션을 다듬었습니다",
      "첫 화면이 모델에 더 집중되도록 모바일 dock과 stage chip을 개선했습니다",
      "드래그 회전이 더 차분하고 자연스럽게 느껴지도록 3D 인터랙션을 부드럽게 조정했습니다",
      "더 잘 발견되고 다시 찾아오게 만들 수 있도록 SEO 및 메타데이터 기반을 보강했습니다"
    ]
  },
  ja: {
    htmlLang: "ja",
    brandName: "Compute to Grid",
    browserTitle: "Compute to Grid | AI 競争はいま、電力、冷却、そして電力網を通って進む",
    pageTitle: "AI 競争はいま、電力、冷却、そして電力網を通って進む",
    introText: "インタラクティブな 3D モデルで、電力、冷却、コンピュート、ネットワーク、キャンパス建設、運用がどのように AI データセンターを構成するのかを確認できます。",
    languageLabel: "言語",
    reset: "リセット",
    resetTitle: "視点をリセット",
    explodeLabel: "分解度",
    fileWarningTitle: "ローカル HTTP サーバーへ切り替えています",
    fileWarningText: "index.html を直接開くとブラウザが 3D モジュールをブロックします。自動で移動しない場合は http://127.0.0.1:8124/ を開いてください。",
    hintDrag: "ドラッグで回転",
    hintZoom: "ホイールでズーム",
    hintWheelLayer: "ホイールでレイヤー切替",
    hintClick: "クリックでフォーカス",
    insightRevealPrompt: "3D モデルを操作すると、この層のインサイトが表示されます。",
    insightTitle: "インサイト",
    supplierHeading: "バリューチェーンの役割",
    riskHeading: "産業背景",
    chapter1SummaryHeading: "仕組み",
    chapter1BuildersHeading: "このレイヤーをつくるのは誰か",
    chapter1FutureHeading: "未来シグナル",
    chapter1SignalsHeading: "継続して見るべきシグナル",
    chapter1LearnMoreHeading: "さらに読む",
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
    aboutContact: "Contact",
    updatesLink: "更新情報",
    updatesEyebrow: "更新情報",
    updatesTitle: "最近の更新",
    updatesUpdated: "更新日：2026年6月",
    updatesDescription: "Version 1 は 2026年6月に公開しました。その後も、コンテンツ、導線、インタラクションを中心に、小さくても意味のある改善を積み重ねています。",
    updatesItems: [
      "最初の一目で 3D モデルを理解しやすくなるよう、Chapter 1 の導線を整えました",
      "最初の画面がモデル中心になるよう、モバイルの dock と stage chip を見直しました",
      "ドラッグ操作がより落ち着いて自然に感じられるよう、3D 回転挙動を調整しました",
      "より見つけやすく、再訪しやすくするために、SEO とメタデータの基盤を強化しました"
    ]
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
      metrics: [["30-150MW", "How much deliverable power one AI campus may need"], ["N+1", "How operators avoid a single power failure taking the site down"], ["18-36M", "Why transformers and grid lead times can delay launch"], ["PUE", "How much electricity becomes useful compute instead of overhead"]],
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
      metrics: [["40-120kW", "How much heat a high-density AI rack may need to shed"], ["Liquid", "Why direct liquid cooling is replacing air at the high end"], ["WUE", "How much water stress the cooling design may create"], ["Delta T", "Whether the thermal loop is removing heat efficiently"]],
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
      metrics: [["60-75%", "Why compute hardware dominates capital spending"], ["HBM", "Why memory bandwidth matters almost as much as GPU count"], ["Rack-scale", "Why delivery is shifting from parts to full systems"], ["Yield", "How packaging success turns into real shipped capacity"]],
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
      metrics: [["400G/800G", "How fast data has to move between accelerators"], ["East-West", "Why most traffic stays inside the data hall"], ["Latency", "Why slower links waste expensive GPU time"], ["Topology", "How network design shapes usable cluster scale"]],
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
      metrics: [["24-48M", "How long a large campus often takes to go live"], ["MW/acre", "How much power a site can concentrate on one footprint"], ["Permits", "Why approvals often gate real supply"], ["Tier", "How reliability promises map to facility design"]],
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
      metrics: [["SLA", "What enterprise buyers actually expect the service to guarantee"], ["Utilization", "How operators turn GPU inventory into revenue"], ["Inference", "Why demand shifts from building models to serving them"], ["Security", "Why governance matters once AI touches real data"]],
      risk: "Operations turn hardware into governed, billable compute. Long-term advantage comes from utilization, scheduling efficiency, model tooling, data security, SLA quality, contract duration, and energy-cost management."
    }
  },
  ko: {
    power: { name: "전력 및 전력망", role: "전력회사, 변전소, UPS, PDU", signal: "전력 확보와 계통 접속 일정은 대형 AI 데이터센터의 첫 번째 병목입니다.", lede: "AI 클러스터는 데이터센터를 IT 프로젝트가 아니라 전력 인프라 프로젝트로 바꿉니다.", suppliers: ["전력망 장비: Schneider Electric (SU.PA), Eaton (ETN), ABB (ABBN.SW/ABB), Siemens Energy (ENR.DE)", "백업 전원과 핵심 인프라: Vertiv (VRT), Caterpillar (CAT), Cummins (CMI), GE Vernova (GEV)", "전력 EPC와 계통 접속: Quanta Services (PWR), AECOM (ACM), Jacobs (J), Fluor (FLR)", "에너지 및 유틸리티 파트너: NextEra Energy (NEE), Duke Energy (DUK), Constellation Energy (CEG)"], metrics: [["30-150MW", "하나의 AI 캠퍼스가 실제로 필요로 하는 전력 규모"], ["N+1", "전력 장비 한 대가 고장나도 멈추지 않게 하는 방법"], ["18-36M", "변압기와 계통 일정이 왜 개시를 늦추는가"], ["PUE", "전기가 손실이 아닌 실제 컴퓨트로 얼마나 전환되는가"]], risk: "AI 수요는 GPU 조달뿐 아니라 실제 전력 공급 능력에 좌우됩니다. 변압기, 스위치기어, 계통 승인, 장기 전력계약을 함께 봐야 실제 가동 가능 용량을 이해할 수 있습니다." },
    cooling: { name: "냉각 시스템", role: "칠러, CDU, 콜드플레이트, 냉각탑", signal: "GPU 열밀도 상승은 콜드플레이트, CDU, 펌프, 냉각탑 업그레이드를 촉진합니다.", lede: "AI 랙 밀도가 높아지며 공랭에서 하이브리드 및 액체냉각으로 이동하고 있습니다.", suppliers: ["데이터센터 열관리: Vertiv (VRT), Schneider Electric (SU.PA), Johnson Controls (JCI), Trane Technologies (TT)", "칠러/HVAC/열교환: Carrier Global (CARR), Modine (MOD), nVent Electric (NVT), Daikin (6367.T)", "액체냉각 부품: Delta Electronics (2308.TW), CoolIT Systems (private), Asetek (ASTK.CO)", "펌프/밸브/수처리: Xylem (XYL), Pentair (PNR), Watts Water (WTS)"], metrics: [["40-120kW", "고밀도 AI 랙이 처리해야 하는 열부하 규모"], ["Liquid", "왜 액체 냉각이 공랭을 대체하기 시작하는가"], ["WUE", "이 냉각 방식이 만드는 물 사용 압력"], ["Delta T", "열이 칩과 랙에서 효율적으로 빠져나가는가"]], risk: "냉각은 칩, 콜드플레이트, 랙 매니폴드, CDU, 칠러, 냉각탑으로 이어지는 열 경로입니다. 커넥터 누수, 펌프 고장, 수질 문제는 클러스터 가용률에 직접 영향을 줄 수 있습니다." },
    compute: { name: "컴퓨팅 장비", role: "GPU, HBM, 첨단 패키징, AI 서버", signal: "GPU 공급, 첨단 패키징, 랙 단위 서버 납품이 구축 속도를 결정합니다.", lede: "컴퓨팅 계층은 GPU, HBM, 패키징, 서버 보드, 전원, 랙, 시스템 통합으로 구성됩니다.", suppliers: ["AI 가속기와 플랫폼: NVIDIA (NVDA), AMD (AMD), Broadcom (AVGO), Marvell (MRVL)", "파운드리/장비/첨단 패키징: TSMC (TSM/2330.TW), ASML (ASML), Applied Materials (AMAT), Lam Research (LRCX)", "HBM 및 메모리: SK hynix (000660.KS), Micron (MU), Samsung Electronics (005930.KS)", "AI 서버/ODM: Super Micro Computer (SMCI), Dell (DELL), HPE (HPE), Quanta (2382.TW), Wiwynn (6669.TW), Foxconn (2317.TW)"], metrics: [["60-75%", "왜 자본지출의 대부분이 컴퓨트 하드웨어에 집중되는가"], ["HBM", "왜 메모리 대역폭이 GPU 수만큼 중요한가"], ["Rack-scale", "왜 납품 단위가 부품에서 완성 시스템으로 이동하는가"], ["Yield", "패키징 수율이 실제 출하 가능한 용량을 어떻게 바꾸는가"]], risk: "컴퓨팅 병목은 GPU에만 있지 않습니다. HBM, 첨단 패키징, PCB, 전원, 냉각, 랙 통합, 테스트를 함께 봐야 실제 납품 속도를 이해할 수 있습니다." },
    network: { name: "네트워크 인터커넥트", role: "스위치, NIC, 광모듈, 광섬유", signal: "훈련 클러스터 병목은 동서 트래픽과 광 인터커넥트에서 자주 발생합니다.", lede: "대형 모델 훈련은 저지연·고대역폭 GPU 간 연결이 필요합니다.", suppliers: ["데이터센터 스위치: Arista Networks (ANET), Cisco (CSCO), NVIDIA Networking (NVDA)", "네트워크 칩/DPU/NIC: Broadcom (AVGO), Marvell (MRVL), Intel (INTC), NVIDIA (NVDA)", "광모듈 및 포토닉스: Coherent (COHR), Lumentum (LITE), Fabrinet (FN), Innolight (300308.SZ)", "커넥터/케이블/고속 인터페이스: Amphenol (APH), TE Connectivity (TEL), Molex (Koch private)"], metrics: [["400G/800G", "가속기 사이에 필요한 데이터 이동 속도"], ["East-West", "왜 대부분의 트래픽이 데이터센터 내부에서 움직이는가"], ["Latency", "왜 느린 링크가 비싼 GPU 시간을 낭비하는가"], ["Topology", "네트워크 설계가 클러스터 확장 한계를 어떻게 정하는가"]], risk: "대형 훈련 클러스터는 GPU 더미가 아니라 네트워크 시스템입니다. 스위치, 광모듈, 토폴로지, NIC/DPU, 혼잡 제어가 실제 처리량을 좌우합니다." },
    site: { name: "부지 및 건설", role: "토지, 수자원, 시설, EPC", signal: "건설 가능한 토지, 물, 전력 거리, 시공 능력이 공급 속도를 결정합니다.", lede: "데이터센터는 토지, 토목, 전기/기계, 소방, 보안, 인허가가 결합된 중자산 인프라입니다.", suppliers: ["데이터센터 REITs/개발사: Equinix (EQIX), Digital Realty (DLR), GDS Holdings (GDS/9698.HK), NEXTDC (NXT.AX)", "지역/주권 클라우드 운영사: Keppel DC REIT (AJBU.SI), NTT Data (9613.T), KDDI (9433.T)", "토목/전기/기계 EPC: Quanta Services (PWR), AECOM (ACM), Jacobs (J), Fluor (FLR)", "민간 대형 플랫폼: Vantage Data Centers, QTS, CyrusOne, DataBank"], metrics: [["24-48M", "대형 캠퍼스가 실제 가동까지 걸리는 시간"], ["MW/acre", "한 부지에 얼마나 많은 전력을 밀집시킬 수 있는가"], ["Permits", "왜 인허가가 실제 공급을 늦추는가"], ["Tier", "신뢰성 약속이 설계 기준에 어떻게 반영되는가"]], risk: "데이터센터 공급은 즉시 생기는 용량이 아니라 다년 인프라 파이프라인입니다. 토지, 전력, 물, 환경심사, 세제 혜택, 인력, 소방 규정, 선임대 계약이 모두 중요합니다." },
    ops: { name: "운영 및 플랫폼", role: "클라우드, 코로케이션, MLOps, 모니터링, 보안", signal: "실제 상품은 건물이 아니라 스케줄링·과금·모니터링 가능한 컴퓨팅 서비스입니다.", lede: "운영 계층은 인프라를 GPU 클라우드, 훈련 플랫폼, 추론 서비스, 관리형 솔루션으로 전환합니다.", suppliers: ["하이퍼스케일러와 클라우드: Amazon (AMZN), Microsoft (MSFT), Alphabet (GOOGL), Oracle (ORCL), Meta (META)", "GPU 클라우드와 AI 인프라: CoreWeave (CRWV), Nebius (NBIS), Lambda (private), Crusoe (private)", "데이터/MLOps/가시성: Snowflake (SNOW), Datadog (DDOG), ServiceNow (NOW), Cloudflare (NET), Databricks (private)", "보안 및 컴플라이언스: Palo Alto Networks (PANW), CrowdStrike (CRWD), Zscaler (ZS), Okta (OKTA)"], metrics: [["SLA", "기업 고객이 실제로 기대하는 서비스 보장"], ["Utilization", "운영사가 GPU 재고를 어떻게 수익으로 바꾸는가"], ["Inference", "왜 수요가 학습에서 서비스 추론으로 이동하는가"], ["Security", "AI가 실제 데이터를 다룰 때 왜 거버넌스가 핵심이 되는가"]], risk: "운영 플랫폼은 하드웨어를 과금 가능한 서비스로 바꿉니다. 장기 경쟁력은 GPU 보유량보다 이용률, 스케줄링, 도구 생태계, 보안, SLA, 전력비 관리에서 나옵니다." }
  },
  ja: {
    power: { name: "電力・電力網", role: "電力会社、変電所、UPS、PDU", signal: "電力確保と系統接続の時期が、大型 AI データセンターの最初の制約になります。", lede: "AI クラスターはデータセンターを IT プロジェクトから電力インフラプロジェクトへ変えます。", suppliers: ["電力網・電気設備: Schneider Electric (SU.PA), Eaton (ETN), ABB (ABBN.SW/ABB), Siemens Energy (ENR.DE)", "バックアップ電源と重要インフラ: Vertiv (VRT), Caterpillar (CAT), Cummins (CMI), GE Vernova (GEV)", "電力 EPC と系統接続: Quanta Services (PWR), AECOM (ACM), Jacobs (J), Fluor (FLR)", "エネルギー・公益事業パートナー: NextEra Energy (NEE), Duke Energy (DUK), Constellation Energy (CEG)"], metrics: [["30-150MW", "1 つの AI キャンパスが実際に必要とする電力規模"], ["N+1", "電源設備 1 台の故障で止まらないための考え方"], ["18-36M", "変圧器や系統接続が立ち上げを遅らせる理由"], ["PUE", "電力が損失ではなく計算にどれだけ変わるか"]], risk: "AI 需要は GPU 調達だけでなく、実際に供給できる電力に左右されます。変圧器、開閉装置、系統承認、長期電力契約を確認することで、実稼働可能な容量を理解できます。" },
    cooling: { name: "冷却システム", role: "チラー、CDU、冷却板、冷却塔", signal: "GPU の熱密度上昇により、冷却板、CDU、ポンプ、冷却塔の更新が進みます。", lede: "AI ラック密度の上昇により、空冷からハイブリッド冷却・液冷へ移行しています。", suppliers: ["データセンター熱管理: Vertiv (VRT), Schneider Electric (SU.PA), Johnson Controls (JCI), Trane Technologies (TT)", "チラー/HVAC/熱交換: Carrier Global (CARR), Modine (MOD), nVent Electric (NVT), Daikin (6367.T)", "液冷部品: Delta Electronics (2308.TW), CoolIT Systems (private), Asetek (ASTK.CO)", "ポンプ/バルブ/水処理: Xylem (XYL), Pentair (PNR), Watts Water (WTS)"], metrics: [["40-120kW", "高密度 AI ラックが処理すべき熱負荷の大きさ"], ["Liquid", "なぜ液冷が高密度領域で空冷を置き換えるのか"], ["WUE", "この冷却方式が生む水利用の負荷"], ["Delta T", "熱がチップやラックから効率よく抜けているか"]], risk: "冷却はチップ、冷却板、ラックマニホールド、CDU、チラー、冷却塔まで続く熱経路です。コネクタ漏れ、ポンプ故障、水質問題はクラスター稼働率に直結します。" },
    compute: { name: "計算設備", role: "GPU、HBM、先端パッケージング、AI サーバー", signal: "GPU 供給、先端パッケージング、ラック単位の納入が構築速度を決めます。", lede: "計算層は GPU、HBM、先端パッケージング、サーバーボード、電源、ラック、統合テストで構成されます。", suppliers: ["AI アクセラレーターとプラットフォーム: NVIDIA (NVDA), AMD (AMD), Broadcom (AVGO), Marvell (MRVL)", "ファウンドリ/装置/先端パッケージング: TSMC (TSM/2330.TW), ASML (ASML), Applied Materials (AMAT), Lam Research (LRCX)", "HBM とメモリ: SK hynix (000660.KS), Micron (MU), Samsung Electronics (005930.KS)", "AI サーバー/ODM: Super Micro Computer (SMCI), Dell (DELL), HPE (HPE), Quanta (2382.TW), Wiwynn (6669.TW), Foxconn (2317.TW)"], metrics: [["60-75%", "なぜ資本支出の大半が計算ハードウェアに向かうのか"], ["HBM", "なぜメモリ帯域が GPU 数と同じくらい重要なのか"], ["Rack-scale", "なぜ納入単位が部品から完成システムへ移るのか"], ["Yield", "パッケージング歩留まりが実際の出荷能力をどう左右するか"]], risk: "計算設備の制約は GPU だけではありません。HBM、先端パッケージング、PCB、電源、冷却、ラック統合、テストを同時に見る必要があります。" },
    network: { name: "ネットワーク相互接続", role: "スイッチ、NIC、光モジュール、光ファイバー", signal: "学習クラスターの制約は東西トラフィックと光接続に現れやすいです。", lede: "大規模モデル学習には低遅延・高帯域の GPU 間接続が必要です。", suppliers: ["データセンタースイッチ: Arista Networks (ANET), Cisco (CSCO), NVIDIA Networking (NVDA)", "ネットワークチップ/DPU/NIC: Broadcom (AVGO), Marvell (MRVL), Intel (INTC), NVIDIA (NVDA)", "光モジュールとフォトニクス: Coherent (COHR), Lumentum (LITE), Fabrinet (FN), Innolight (300308.SZ)", "コネクタ/ケーブル/高速インターフェース: Amphenol (APH), TE Connectivity (TEL), Molex (Koch private)"], metrics: [["400G/800G", "アクセラレータ間で必要になるデータ移動速度"], ["East-West", "なぜトラフィックの大半がデータセンター内部を流れるのか"], ["Latency", "なぜ遅いリンクが高価な GPU 時間を無駄にするのか"], ["Topology", "ネットワーク設計がクラスター拡張の上限を決める仕組み"]], risk: "大規模学習クラスターは GPU の集合ではなくネットワークシステムです。スイッチ、光モジュール、トポロジー、NIC/DPU、輻輳制御が実効スループットを左右します。" },
    site: { name: "用地・建設", role: "土地、水利、施設、EPC", signal: "建設可能な土地、水、電力距離、施工能力が供給速度を決めます。", lede: "データセンターは土地、土木、電気・機械、消防、セキュリティ、許認可を含む重資産インフラです。", suppliers: ["データセンター REIT/開発会社: Equinix (EQIX), Digital Realty (DLR), GDS Holdings (GDS/9698.HK), NEXTDC (NXT.AX)", "地域・主権クラウド事業者: Keppel DC REIT (AJBU.SI), NTT Data (9613.T), KDDI (9433.T)", "土木/電気/機械 EPC: Quanta Services (PWR), AECOM (ACM), Jacobs (J), Fluor (FLR)", "民間大型プラットフォーム: Vantage Data Centers, QTS, CyrusOne, DataBank"], metrics: [["24-48M", "大規模キャンパスが本稼働するまでにかかる時間"], ["MW/acre", "同じ敷地にどれだけの電力密度を載せられるか"], ["Permits", "なぜ許認可が実際の供給を止めるのか"], ["Tier", "信頼性の約束が設計基準にどう表れるか"]], risk: "データセンター供給は即時容量ではなく、複数年のインフラパイプラインです。土地、電力、水、環境審査、税制、人材、消防規制、事前リース契約が重要です。" },
    ops: { name: "運用・プラットフォーム", role: "クラウド、コロケーション、MLOps、監視、セキュリティ", signal: "実際の商品は建物ではなく、配分・課金・監視できる計算サービスです。", lede: "運用層はインフラを GPU クラウド、学習基盤、推論サービス、マネージドソリューションへ変換します。", suppliers: ["ハイパースケーラーとクラウド: Amazon (AMZN), Microsoft (MSFT), Alphabet (GOOGL), Oracle (ORCL), Meta (META)", "GPU クラウドと AI インフラ: CoreWeave (CRWV), Nebius (NBIS), Lambda (private), Crusoe (private)", "データ/MLOps/可観測性: Snowflake (SNOW), Datadog (DDOG), ServiceNow (NOW), Cloudflare (NET), Databricks (private)", "セキュリティとコンプライアンス: Palo Alto Networks (PANW), CrowdStrike (CRWD), Zscaler (ZS), Okta (OKTA)"], metrics: [["SLA", "企業顧客が本当に求めるサービス保証とは何か"], ["Utilization", "運営側が GPU 在庫をどう収益化するか"], ["Inference", "なぜ需要が学習から提供フェーズへ移るのか"], ["Security", "AI が実データに触れるとき統制が中核になる理由"]], risk: "運用プラットフォームはハードウェアを課金可能なサービスに変えます。長期優位性は GPU 保有量だけでなく、利用率、スケジューリング、ツール、セキュリティ、SLA、電力コスト管理から生まれます。" }
  }
};

const chapter1EducationalCopy = {
  zh: {
    power: {
      name: "電力與能源骨幹",
      role: "讓任何 AI 系統能真正啟動的穩定供電層",
      signal: "未來訊號：未來的領先者，往往是那些能更快取得可靠 MW、併網資格與彈性備援能力的營運方。",
      lede: "AI 在成為算力故事之前，首先是一個電力故事。",
      how: "在 GPU 開始訓練模型或服務使用者之前，電力必須先進站、降壓、穩定，並能在故障時持續供應。電流會依序經過變電站、開關設備、UPS、配電系統與備援發電，再送到機櫃與伺服器。當 AI 園區擴張到數十甚至上百 MW 規模時，電力不再只是背景設施，而會直接成為時程、成本與擴張速度的核心限制。",
      future: "接下來值得觀察的是併網速度、更高電壓的園區內配電、現地發電、長時間備援，以及公用事業是否會把 AI 負載視為不同於傳統資料中心的新型用電需求。",
      builders: [
        `<strong>電力與配電骨幹</strong><span>${companyLink("schneider")}、${companyLink("eaton")}、${companyLink("abb")}</span>`,
        `<strong>關鍵電力與備援系統</strong><span>${companyLink("vertiv")}、${companyLink("cummins")}、${companyLink("caterpillar")}</span>`,
        `<strong>發電與電網升級參考</strong><span>${companyLink("gevernova")}、${companyLink("siemensEnergy")}、${companyLink("abb")}</span>`
      ]
    },
    cooling: {
      name: "冷卻與散熱系統",
      role: "把上升中的功率密度轉成可持續算力時間的熱管理層",
      signal: "未來訊號：液冷正從進階配置走向標準做法，散熱能力會直接決定能否部署更高密度的 AI 機櫃。",
      lede: "更多電力，只有在熱能能順利離開系統時，才會真正變成更多算力。",
      how: "AI 晶片把電力轉成運算，也同時轉成大量熱能。當機櫃密度持續升高，冷卻就不再只是機房空調夠不夠，而是整條熱路徑能否順利工作。熱必須從晶片移入冷板與液冷迴路，再流向 CDU、泵浦、冷水主機與散熱設備。這代表冷卻不只是為了避免停機，它也會直接影響部署密度、用水、能效、維運設計與未來擴張上限。",
      future: "接下來值得觀察的是液冷走向預設配置、直冷到晶片設計、接頭可靠度、漏液偵測、混合式熱管理架構，以及地方水電條件對高密度部署的壓力。",
      builders: [
        `<strong>資料中心液冷與熱管理</strong><span>${companyLink("vertiv")}、${companyLink("schneider")}、${companyLink("delta")}</span>`,
        `<strong>大型冷凍空調與熱交換</strong><span>${companyLink("trane")}、${companyLink("jci")}、${companyLink("carrier")}</span>`,
        `<strong>全球 HVAC 與冷卻設備參考</strong><span>${companyLink("daikin")}、${companyLink("carrier")}、${companyLink("trane")}</span>`
      ]
    },
    compute: {
      name: "算力設備與 AI 晶片",
      role: "把晶片、記憶體與系統設計轉成可用 AI 容量的整合層",
      signal: "未來訊號：真正決定擴張速度的，往往不只是 GPU 出貨量，而是 HBM、先進封裝與整櫃系統何時能一起到位。",
      lede: "一張 GPU 並不等於一套 AI 系統。只有當記憶體、封裝與整合一起到位時，它才真正有用。",
      how: "算力是 AI 基礎設施裡最容易被看見的一層，但它從來不只是晶片故事。一個能運作的 AI 節點，同時依賴 GPU、HBM、先進封裝、主板、供電、散熱、韌體與整櫃系統整合。實際上，AI 建置速度常常不是由處理器 headline 決定，而是由整條供應鏈中最慢的那一段決定。",
      future: "接下來值得關注的是 HBM 擴產、先進封裝能力提升、整櫃系統交付、自研 AI 晶片、低功耗推論硬體，以及訓練系統與推論系統之間越來越明顯的分化。",
      builders: [
        `<strong>AI 加速器平台</strong><span>${companyLink("nvidia")}、${companyLink("amd")}</span>`,
        `<strong>晶圓代工與先進封裝</strong><span>${companyLink("tsmc")}、${companyLink("intelFoundry")}、${companyLink("amkor")}</span>`,
        `<strong>高頻寬記憶體參考</strong><span>${companyLink("micron")}、${companyLink("skhynix")}、${companyLink("samsungSemi")}</span>`
      ]
    },
    network: {
      name: "網路互連與資料搬運",
      role: "讓多台機器能像同一套 AI 系統那樣協同運作的資料通道",
      signal: "未來訊號：叢集越大，光互連、拓樸設計與流量控制就越可能成為有效算力的真正上限。",
      lede: "算力決定能力上限，但網路決定整個叢集能否真正一起思考。",
      how: "大型 AI 系統不會因為放進更多處理器就自動變強，而是要靠資料能否足夠快速地在整個叢集中流動。訓練時，加速器要持續交換梯度與參數；推論時，請求、檢索與回應也會跨越多個節點。交換器、NIC、光模組、光纖與拓樸設計，決定了理論算力有多少能真正轉成可用效能。",
      future: "接下來值得觀察的是更高速的光互連、AI 優化乙太網、壅塞控制、更加緊密的光電整合，以及推論型工作負載對低延遲資料路徑的需求。",
      builders: [
        `<strong>資料中心交換與路由</strong><span>${companyLink("arista")}、${companyLink("cisco")}、${companyLink("nvidia")}</span>`,
        `<strong>網路晶片與資料搬運</strong><span>${companyLink("broadcom")}、${companyLink("marvell")}、${companyLink("cloudflare")}</span>`,
        `<strong>光互連與高速傳輸</strong><span>${companyLink("coherent")}、${companyLink("lumentum")}、${companyLink("broadcom")}</span>`
      ]
    },
    site: {
      name: "園區建設與交付",
      role: "把土地、公用資源與施工能力轉成真實容量的落地層",
      signal: "未來訊號：誰能同時協調土地、電力、水、施工與審批，誰就更可能掌握下一波 AI 容量供給。",
      lede: "AI 需求可以一夜之間被宣布，但真實容量往往要花上數年才能建成。",
      how: "資料中心園區是數位野心碰上實體時程的地方。容量只有在土地控制、許可、電網接入、水資源規劃、土建、機電、消防與試運轉全部到位後，才會變成現實。這些都是長週期、強烈依賴地方條件的決策，所以市場上宣布的 AI 擴張，常常與真正上線的容量活在不同時間軸上。",
      future: "接下來值得觀察的是各地審批速度、預鑄模組化園區、水資源壓力、資料主權帶動的在地部署，以及大型客戶是否會用長期預租合約提前鎖定稀缺容量。",
      builders: [
        `<strong>大型資料中心園區與互連基地</strong><span>${companyLink("equinix")}、${companyLink("digitalrealty")}、${companyLink("databank")}</span>`,
        `<strong>區域交付與代管服務參考</strong><span>${companyLink("nttdata")}、${companyLink("qts")}、${companyLink("databank")}</span>`
      ]
    },
    ops: {
      name: "雲端與 AI 營運",
      role: "把基礎設施變成企業敢用的服務層",
      signal: "未來訊號：當硬體越來越容易比較，差異化會轉向利用率、推論效率、治理能力與服務品質。",
      lede: "擁有 GPU，並不等於能把 AI 交付成值得信任的產品。",
      how: "即使一棟機房裡已經裝滿硬體，也還不等於可以被企業直接使用的服務。仍然需要有人排程工作、計量用量、保護資料、監控系統、修補故障、支援客戶，並兌現服務承諾。這一層真正做的，是把底層硬體轉成企業敢採用、敢依賴的 AI 平台、GPU 雲與推論服務。長期來看，營運品質和硬體規模一樣重要。",
      future: "接下來值得觀察的是推論收入比重上升、成本導向的編排、治理工具、主權要求，以及記憶體效率與尾端延遲控制如何成為 AI 服務交付的核心競爭力。",
      builders: [
        `<strong>超大規模 AI 雲平台</strong><span>${companyLink("azure")}、${companyLink("aws")}、${companyLink("googleCloud")}</span>`,
        `<strong>專用 GPU 雲與 AI 基礎設施</strong><span>${companyLink("coreweave")}、${companyLink("lambda")}、${companyLink("crusoe")}</span>`,
        `<strong>觀測、安全與雲端營運</strong><span>${companyLink("cloudflare")}、${companyLink("datadog")}、${companyLink("paloalto")}</span>`
      ]
    }
  },
  en: {
    power: {
      name: "Power & Energy Backbone",
      role: "The layer that delivers stable electricity before any AI system can run",
      signal: "Future signal: the next capacity leaders may be the operators who secure reliable megawatts, interconnection rights, and flexible backup power first.",
      lede: "AI starts as an electricity problem before it becomes a computing problem.",
      how: "Before a GPU can train a model or serve a user, power has to arrive, step down, stabilize, and survive failure. Electricity moves through substations, switchgear, UPS systems, distribution gear, and backup generation before it reaches the rack. As AI campuses expand into tens or even hundreds of megawatts, power stops being background infrastructure and becomes a central constraint on timing, cost, and scale.",
      future: "Watch grid interconnection speed, higher-voltage campus design, on-site generation, long-duration backup, and whether utilities begin pricing AI load differently from conventional data center demand.",
      builders: [
        `<strong>Grid and electrical architecture</strong><span>${companyLink("schneider")}, ${companyLink("eaton")}, ${companyLink("abb")}</span>`,
        `<strong>Critical power and backup systems</strong><span>${companyLink("vertiv")}, ${companyLink("cummins")}, ${companyLink("caterpillar")}</span>`,
        `<strong>Generation and grid modernization reference</strong><span>${companyLink("gevernova")}, ${companyLink("siemensEnergy")}, ${companyLink("abb")}</span>`
      ]
    },
    cooling: {
      name: "Cooling & Heat Removal",
      role: "The thermal layer that turns rising power density into usable compute time",
      signal: "Future signal: liquid cooling is shifting from advanced configuration to standard practice, and thermal design will increasingly set rack-density limits.",
      lede: "More power only becomes more compute if the heat can leave the system.",
      how: "AI chips convert electricity into both computation and heat. As rack density rises, cooling becomes a full thermal path rather than a room-level facility feature. Heat has to move from the chip into cold plates, liquid loops, pumps, CDU systems, chillers, and heat rejection equipment. That means cooling is not just about uptime. It shapes density, water use, energy efficiency, maintenance design, and the practical limits of future deployment.",
      future: "Watch liquid cooling move toward default adoption, along with direct-to-chip design, connector reliability, leak detection, hybrid thermal architectures, and local pressure on water and power resources.",
      builders: [
        `<strong>Data center liquid cooling and thermal systems</strong><span>${companyLink("vertiv")}, ${companyLink("schneider")}, ${companyLink("delta")}</span>`,
        `<strong>Large-scale chillers and HVAC infrastructure</strong><span>${companyLink("trane")}, ${companyLink("jci")}, ${companyLink("carrier")}</span>`,
        `<strong>Global HVAC and cooling reference</strong><span>${companyLink("daikin")}, ${companyLink("carrier")}, ${companyLink("trane")}</span>`
      ]
    },
    compute: {
      name: "Compute & AI Chips",
      role: "The layer that turns chips, memory, and system design into usable AI capacity",
      signal: "Future signal: expansion speed is often set not by headline GPU demand alone, but by when HBM, advanced packaging, and rack-scale systems arrive together.",
      lede: "A GPU alone is not an AI system. It becomes useful only when memory, packaging, and integration arrive with it.",
      how: "Compute is the most visible layer in AI infrastructure, but it is never just a chip story. A working AI node depends on GPUs, HBM, advanced packaging, boards, power delivery, cooling, firmware, and rack-level system integration arriving together. In practice, the speed of AI buildout is often determined by the slowest linked part of that chain, not by processor headlines alone.",
      future: "Watch HBM scaling, advanced-packaging expansion, rack-scale system delivery, custom AI silicon, lower-power inference hardware, and the growing split between systems optimized for training and systems optimized for serving.",
      builders: [
        `<strong>AI accelerator platforms</strong><span>${companyLink("nvidia")}, ${companyLink("amd")}</span>`,
        `<strong>Foundry and advanced packaging</strong><span>${companyLink("tsmc")}, ${companyLink("intelFoundry")}, ${companyLink("amkor")}</span>`,
        `<strong>High-bandwidth memory reference</strong><span>${companyLink("micron")}, ${companyLink("skhynix")}, ${companyLink("samsungSemi")}</span>`
      ]
    },
    network: {
      name: "Networking & Data Movement",
      role: "The data path that lets separate machines behave like one AI system",
      signal: "Future signal: the larger the cluster gets, the more optics, topology, and traffic control define the ceiling on usable compute.",
      lede: "Compute creates capability, but networks decide how well a cluster can think together.",
      how: "Large AI systems do not become powerful simply by adding more processors. They become useful when data can move fast enough for the whole cluster to coordinate. During training, accelerators repeatedly exchange gradients and parameters. During inference, requests, retrieval calls, and responses move across multiple nodes. Switches, NICs, optics, fiber, and topology determine how much theoretical compute becomes real performance.",
      future: "Watch faster optical fabrics, AI-optimized Ethernet, congestion control, tighter photonic integration, and lower-latency data paths built for inference-heavy workloads.",
      builders: [
        `<strong>Data center switching and routing</strong><span>${companyLink("arista")}, ${companyLink("cisco")}, ${companyLink("nvidia")}</span>`,
        `<strong>Network silicon and data movement</strong><span>${companyLink("broadcom")}, ${companyLink("marvell")}, ${companyLink("cloudflare")}</span>`,
        `<strong>Optical links and high-speed transport</strong><span>${companyLink("coherent")}, ${companyLink("lumentum")}, ${companyLink("broadcom")}</span>`
      ]
    },
    site: {
      name: "Campus & Buildout",
      role: "The layer that turns approved land, utilities, and construction into real capacity",
      signal: "Future signal: the next wave of supply will favor operators who can coordinate land, power, water, construction, and permitting at the same time.",
      lede: "AI demand can be announced overnight. Real capacity takes years to build.",
      how: "A data center campus is where digital ambition meets physical delay. Capacity becomes real only when land control, permits, grid access, water planning, civil works, mechanical and electrical systems, fire safety, and commissioning all line up. These are long-cycle decisions shaped by local rules and local infrastructure. That is why announced AI expansion and actual online capacity often move on very different timelines.",
      future: "Watch regional permitting speed, prefab campus delivery, water scrutiny, sovereignty-driven local deployment, and long-term pre-lease agreements used to secure scarce capacity before it comes online.",
      builders: [
        `<strong>Global colocation and interconnection campuses</strong><span>${companyLink("equinix")}, ${companyLink("digitalrealty")}, ${companyLink("databank")}</span>`,
        `<strong>Regional delivery and managed infrastructure reference</strong><span>${companyLink("nttdata")}, ${companyLink("qts")}, ${companyLink("databank")}</span>`
      ]
    },
    ops: {
      name: "Cloud & AI Operations",
      role: "The layer that turns infrastructure into a service customers can trust",
      signal: "Future signal: as hardware becomes easier to compare, advantage may shift toward utilization, inference efficiency, governance, and service quality.",
      lede: "Owning GPUs is not the same as delivering AI as a dependable product.",
      how: "A building full of hardware is still not a usable service. Someone has to schedule workloads, meter usage, secure data, monitor systems, patch failures, support customers, and uphold service-level commitments. This is the layer that turns physical capacity into AI platforms, GPU clouds, and inference services that enterprises can adopt with confidence. Over time, operational quality matters as much as hardware scale.",
      future: "Watch the rise of inference-led revenue, cost-aware orchestration, governance tooling, sovereignty requirements, memory efficiency, and tail-latency control as core differentiators in AI service delivery.",
      builders: [
        `<strong>Hyperscale AI cloud platforms</strong><span>${companyLink("azure")}, ${companyLink("aws")}, ${companyLink("googleCloud")}</span>`,
        `<strong>Specialized GPU cloud infrastructure</strong><span>${companyLink("coreweave")}, ${companyLink("lambda")}, ${companyLink("crusoe")}</span>`,
        `<strong>Observability, security, and operations</strong><span>${companyLink("cloudflare")}, ${companyLink("datadog")}, ${companyLink("paloalto")}</span>`
      ]
    }
  },
  ko: {
    power: {
      name: "전력 및 에너지 백본",
      role: "어떤 AI 시스템이든 실제로 가동되게 만드는 안정적 전력 계층",
      signal: "미래 신호: 더 빠르게 안정적인 전력과 계통 접속을 확보하는 사업자가 AI 캠퍼스 확장에 앞설 가능성이 큽니다.",
      lede: "AI는 컴퓨트 이야기가 되기 전에 먼저 전력 이야기로 시작됩니다.",
      how: "GPU가 모델을 학습하거나 사용자를 서비스하기 전에 전력은 먼저 들어오고, 전압이 낮춰지고, 안정화되며, 장애 상황에서도 유지되어야 합니다. 전기는 변전, 스위치기어, UPS, 배전 설비, 백업 전원을 거쳐 랙과 서버에 도달합니다. AI 캠퍼스가 수십에서 수백 MW 규모로 커질수록 전력은 배경 인프라가 아니라 일정, 비용, 확장 속도를 좌우하는 핵심 제약이 됩니다.",
      future: "앞으로 중요한 신호는 계통 접속 속도, 더 높은 전압의 캠퍼스 배전, 현장 발전, 장시간 백업, 그리고 유틸리티가 AI 부하를 기존 데이터센터 수요와 다르게 가격 책정하기 시작하는지 여부입니다.",
      builders: [
        `<strong>전력망 및 배전 설계</strong><span>${companyLink("schneider")}, ${companyLink("eaton")}, ${companyLink("abb")}</span>`,
        `<strong>핵심 전력 및 백업 시스템</strong><span>${companyLink("vertiv")}, ${companyLink("cummins")}, ${companyLink("caterpillar")}</span>`,
        `<strong>발전 및 전력망 현대화 참고</strong><span>${companyLink("gevernova")}, ${companyLink("siemensEnergy")}, ${companyLink("abb")}</span>`
      ]
    },
    cooling: {
      name: "냉각 및 열 제거",
      role: "높아지는 전력 밀도를 실제 컴퓨팅 시간으로 바꾸는 열 관리 계층",
      signal: "미래 신호: 액체 냉각은 고급 옵션에서 고밀도 AI 클러스터의 기본 설계로 이동하고 있습니다.",
      lede: "더 많은 전력은 열이 시스템 밖으로 빠져나갈 수 있을 때만 더 많은 컴퓨트가 됩니다.",
      how: "AI 칩은 전기를 연산으로 바꾸는 동시에 많은 열도 만들어냅니다. 랙 밀도가 높아질수록 냉각은 더 이상 단순한 공조가 아니라 전체 열 경로의 문제입니다. 열은 칩에서 콜드 플레이트와 액체 루프로 이동하고, 다시 CDU, 펌프, 칠러, 방열 장비로 흘러갑니다. 그래서 냉각은 단순히 다운타임을 막는 수단이 아니라, 배치 밀도, 물 사용, 에너지 효율, 유지보수 설계, 미래 확장의 한계를 함께 결정합니다.",
      future: "앞으로 중요한 신호는 액체 냉각의 기본화, 직접 칩 냉각 설계, 커넥터 신뢰성, 누수 감지, 혼합형 열 관리 구조, 그리고 지역 물·전력 조건이 고밀도 배치에 주는 압력입니다.",
      builders: [
        `<strong>데이터센터 액체 냉각 및 열관리</strong><span>${companyLink("vertiv")}, ${companyLink("schneider")}, ${companyLink("delta")}</span>`,
        `<strong>대형 칠러 및 HVAC 인프라</strong><span>${companyLink("trane")}, ${companyLink("jci")}, ${companyLink("carrier")}</span>`,
        `<strong>글로벌 HVAC 및 냉각 장비 참고</strong><span>${companyLink("daikin")}, ${companyLink("carrier")}, ${companyLink("trane")}</span>`
      ]
    },
    compute: {
      name: "컴퓨트 및 AI 칩",
      role: "칩, 메모리, 시스템 설계를 실제 AI 용량으로 바꾸는 통합 계층",
      signal: "미래 신호: HBM, 첨단 패키징, 랙 단위 납품은 GPU 출하만큼이나 확장 속도를 결정할 수 있습니다.",
      lede: "GPU 한 장이 곧 AI 시스템은 아닙니다. 메모리, 패키징, 통합이 함께 도착해야 비로소 유용해집니다.",
      how: "컴퓨트는 AI 인프라에서 가장 눈에 띄는 층이지만, 결코 칩만의 이야기가 아닙니다. 실제로 동작하는 AI 노드는 GPU, HBM, 첨단 패키징, 보드, 전력 설계, 냉각, 펌웨어, 랙 수준 시스템 통합이 함께 맞물려야 합니다. 현실의 AI 구축 속도는 프로세서 헤드라인보다 공급망 전체에서 가장 느린 연결고리에 더 자주 의해 결정됩니다.",
      future: "앞으로 중요한 신호는 HBM 확장, 첨단 패키징 증설, 랙 단위 시스템 인도, 자체 AI 실리콘, 저전력 추론 하드웨어, 그리고 훈련용 시스템과 서빙용 시스템의 분화입니다.",
      builders: [
        `<strong>AI 가속기 플랫폼</strong><span>${companyLink("nvidia")}, ${companyLink("amd")}</span>`,
        `<strong>파운드리 및 첨단 패키징</strong><span>${companyLink("tsmc")}, ${companyLink("intelFoundry")}, ${companyLink("amkor")}</span>`,
        `<strong>고대역폭 메모리 참고</strong><span>${companyLink("micron")}, ${companyLink("skhynix")}, ${companyLink("samsungSemi")}</span>`
      ]
    },
    network: {
      name: "네트워킹 및 데이터 이동",
      role: "여러 장비를 하나의 AI 시스템처럼 움직이게 하는 데이터 경로",
      signal: "미래 신호: 클러스터가 커질수록 광 연결, 토폴로지, 트래픽 제어가 실효 훈련 속도의 한계로 더 자주 드러납니다.",
      lede: "컴퓨트가 능력의 상한을 정한다면, 네트워크는 클러스터가 실제로 함께 사고할 수 있는지를 결정합니다.",
      how: "대형 AI 시스템은 프로세서를 더 넣는다고 자동으로 강해지지 않습니다. 데이터가 클러스터 전체를 충분히 빠르게 이동할 수 있어야 비로소 유용해집니다. 훈련에서는 가속기들이 지속적으로 그래디언트와 파라미터를 주고받고, 추론에서는 요청, 검색, 응답이 여러 노드를 오갑니다. 스위치, NIC, 광모듈, 광섬유, 토폴로지는 이론상의 컴퓨트를 실제 성능으로 얼마나 바꿀 수 있는지 결정합니다.",
      future: "앞으로 중요한 신호는 더 빠른 광 패브릭, AI 최적화 이더넷, 혼잡 제어, 더 촘촘한 광통합, 그리고 추론 중심 워크로드를 위한 저지연 데이터 경로입니다.",
      builders: [
        `<strong>데이터센터 스위칭 및 라우팅</strong><span>${companyLink("arista")}, ${companyLink("cisco")}, ${companyLink("nvidia")}</span>`,
        `<strong>네트워크 실리콘 및 데이터 이동</strong><span>${companyLink("broadcom")}, ${companyLink("marvell")}, ${companyLink("cloudflare")}</span>`,
        `<strong>광 인터커넥트 및 고속 전송</strong><span>${companyLink("coherent")}, ${companyLink("lumentum")}, ${companyLink("broadcom")}</span>`
      ]
    },
    site: {
      name: "캠퍼스 구축 및 인도",
      role: "토지, 유틸리티, 시공 능력을 실제 용량으로 바꾸는 현실화 계층",
      signal: "미래 신호: 공급 확대는 토지, 전력, 물, 시공 능력을 동시에 맞출 수 있는 주체에게 더 많이 달려 있습니다.",
      lede: "AI 수요는 하루아침에 발표될 수 있지만, 실제 용량은 수년에 걸쳐 만들어집니다.",
      how: "데이터센터 캠퍼스는 디지털 야심이 물리적 일정과 부딪히는 지점입니다. 용량은 토지 확보, 인허가, 계통 접속, 수자원 계획, 토목, 기계·전기 설비, 소방, 커미셔닝이 모두 맞물릴 때에만 현실이 됩니다. 이런 결정은 장주기이며 지역 조건에 크게 좌우되기 때문에, 발표된 AI 확장 계획과 실제 온라인 용량은 서로 다른 시간축에서 움직이는 경우가 많습니다.",
      future: "앞으로 중요한 신호는 지역별 허가 속도, 프리패브 캠퍼스, 물 사용 압력, 데이터 주권이 이끄는 현지 배치, 그리고 희소한 용량을 선점하기 위한 장기 선임대 계약입니다.",
      builders: [
        `<strong>글로벌 코로케이션 및 인터커넥션 캠퍼스</strong><span>${companyLink("equinix")}, ${companyLink("digitalrealty")}, ${companyLink("databank")}</span>`,
        `<strong>지역 인도 및 관리형 인프라 참고</strong><span>${companyLink("nttdata")}, ${companyLink("qts")}, ${companyLink("databank")}</span>`
      ]
    },
    ops: {
      name: "클라우드 및 AI 운영",
      role: "인프라를 고객이 신뢰할 수 있는 서비스로 바꾸는 운영 계층",
      signal: "미래 신호: 하드웨어 조달이 쉬워질수록 차별화는 이용률, 추론 효율, 거버넌스, 서비스 품질로 이동할 수 있습니다.",
      lede: "GPU를 보유하는 것과, 신뢰할 수 있는 AI 제품을 제공하는 것은 같은 일이 아닙니다.",
      how: "하드웨어로 가득 찬 건물도 그 자체로는 아직 서비스가 아닙니다. 누군가는 워크로드를 스케줄링하고, 사용량을 계량하고, 데이터를 보호하고, 시스템을 모니터링하고, 장애를 복구하고, 고객을 지원하며, 서비스 약속을 지켜야 합니다. 이 계층은 물리 인프라를 기업이 실제로 채택하고 의존할 수 있는 AI 플랫폼, GPU 클라우드, 추론 서비스로 바꿉니다. 시간이 갈수록 운영 품질은 하드웨어 규모만큼 중요해집니다.",
      future: "앞으로 중요한 신호는 추론 중심 수익 구조, 비용 인지형 오케스트레이션, 거버넌스 도구, 주권 요구, 그리고 메모리 효율과 꼬리 지연 제어가 AI 서비스 경쟁력의 핵심이 되는 흐름입니다.",
      builders: [
        `<strong>하이퍼스케일 AI 클라우드</strong><span>${companyLink("azure")}, ${companyLink("aws")}, ${companyLink("googleCloud")}</span>`,
        `<strong>전용 GPU 클라우드 인프라</strong><span>${companyLink("coreweave")}, ${companyLink("lambda")}, ${companyLink("crusoe")}</span>`,
        `<strong>관측성, 보안, 운영 참고</strong><span>${companyLink("cloudflare")}, ${companyLink("datadog")}, ${companyLink("paloalto")}</span>`
      ]
    }
  },
  ja: {
    power: {
      name: "電力とエネルギー基盤",
      role: "どんな AI システムでも実際に動かす安定電力の層",
      signal: "未来シグナル: 安定した電力と系統接続をより早く確保できる事業者が、AI キャンパス拡張で先行しやすくなります。",
      lede: "AI はコンピュートの物語になる前に、まず電力の物語として始まります。",
      how: "GPU がモデルを学習したりユーザーに応答したりする前に、電力はまず届き、降圧され、安定化され、障害時にも維持されなければなりません。電気は変電、開閉装置、UPS、配電設備、バックアップ電源を経て、ようやくラックとサーバーに届きます。AI キャンパスが数十から数百 MW 規模へ広がるほど、電力は背景インフラではなく、スケジュール、コスト、拡張速度を左右する中心的な制約になります。",
      future: "今後重要なシグナルは、系統接続の速さ、より高電圧のキャンパス配電、オンサイト発電、長時間バックアップ、そして公益事業者が AI 負荷を従来型データセンター需要とは別物として価格設定し始めるかどうかです。",
      builders: [
        `<strong>電力網と配電アーキテクチャ</strong><span>${companyLink("schneider")}、${companyLink("eaton")}、${companyLink("abb")}</span>`,
        `<strong>重要電源とバックアップ系</strong><span>${companyLink("vertiv")}、${companyLink("cummins")}、${companyLink("caterpillar")}</span>`,
        `<strong>発電と電力網高度化の参考</strong><span>${companyLink("gevernova")}、${companyLink("siemensEnergy")}、${companyLink("abb")}</span>`
      ]
    },
    cooling: {
      name: "冷却と熱除去",
      role: "上昇する電力密度を実際の計算時間へ変える熱管理の層",
      signal: "未来シグナル: 液冷は高級オプションから、高密度 AI クラスターの標準要件へ移行しつつあります。",
      lede: "より多くの電力は、熱がきちんとシステムの外へ逃げられるときにだけ、より多くの計算能力になります。",
      how: "AI チップは電力を計算へ変えると同時に、大量の熱も生み出します。ラック密度が上がるほど、冷却は単なる空調ではなく、熱経路全体の問題になります。熱はチップからコールドプレートと液冷ループへ移り、さらに CDU、ポンプ、チラー、放熱設備へ流れます。つまり冷却は停止を防ぐためだけでなく、配備密度、水利用、エネルギー効率、保守設計、将来の拡張限界を左右します。",
      future: "今後重要なシグナルは、液冷の標準化、ダイレクト・トゥ・チップ設計、コネクタ信頼性、漏液検知、ハイブリッド熱管理構成、そして地域の水・電力条件が高密度配備に与える圧力です。",
      builders: [
        `<strong>データセンター液冷と熱管理</strong><span>${companyLink("vertiv")}、${companyLink("schneider")}、${companyLink("delta")}</span>`,
        `<strong>大規模チラーと HVAC インフラ</strong><span>${companyLink("trane")}、${companyLink("jci")}、${companyLink("carrier")}</span>`,
        `<strong>グローバル HVAC と冷却設備の参考</strong><span>${companyLink("daikin")}、${companyLink("carrier")}、${companyLink("trane")}</span>`
      ]
    },
    compute: {
      name: "コンピュートと AI チップ",
      role: "チップ、メモリ、システム設計を実際の AI 容量へ変える統合層",
      signal: "未来シグナル: HBM、先端パッケージング、ラック単位の納入は、GPU 出荷量と同じくらい拡張速度を左右します。",
      lede: "GPU 1 枚だけでは AI システムにはなりません。メモリ、パッケージング、統合がそろって初めて役に立ちます。",
      how: "コンピュートは AI インフラで最も目立つ層ですが、決してチップだけの話ではありません。実際に動く AI ノードは、GPU、HBM、先端パッケージング、ボード、電力供給、冷却、ファームウェア、ラック単位のシステム統合が同時にそろって初めて成立します。現実の AI 構築速度は、プロセッサの見出しよりも、サプライチェーン全体の中で最も遅い工程に左右されることがよくあります。",
      future: "今後重要なシグナルは、HBM の拡張、先端パッケージング増強、ラック単位システムの納入、自社製 AI シリコン、低消費電力の推論ハードウェア、そして学習向けとサービング向けシステムの分化です。",
      builders: [
        `<strong>AI アクセラレータプラットフォーム</strong><span>${companyLink("nvidia")}、${companyLink("amd")}</span>`,
        `<strong>ファウンドリと先端パッケージング</strong><span>${companyLink("tsmc")}、${companyLink("intelFoundry")}、${companyLink("amkor")}</span>`,
        `<strong>高帯域メモリの参考</strong><span>${companyLink("micron")}、${companyLink("skhynix")}、${companyLink("samsungSemi")}</span>`
      ]
    },
    network: {
      name: "ネットワーキングとデータ移動",
      role: "複数の装置を一つの AI システムのように動かすデータ経路",
      signal: "未来シグナル: クラスターが大きくなるほど、光接続、トポロジー、トラフィック制御が実効学習速度の上限として見えやすくなります。",
      lede: "コンピュートが能力の上限を決めるなら、ネットワークはクラスター全体が本当に一緒に考えられるかを決めます。",
      how: "大規模 AI システムは、プロセッサを増やすだけで自動的に強くなるわけではありません。データがクラスター全体を十分な速さで移動できて初めて価値が生まれます。学習ではアクセラレータ同士が継続的に勾配やパラメータをやり取りし、推論ではリクエスト、検索、応答が複数ノードをまたぎます。スイッチ、NIC、光モジュール、光ファイバー、トポロジーは、理論上の計算力がどれだけ実効性能へ変わるかを決めます。",
      future: "今後重要なシグナルは、より高速な光ファブリック、AI 最適化イーサネット、輻輳制御、より密な光統合、そして推論中心ワークロード向けの低遅延データ経路です。",
      builders: [
        `<strong>データセンターのスイッチングとルーティング</strong><span>${companyLink("arista")}、${companyLink("cisco")}、${companyLink("nvidia")}</span>`,
        `<strong>ネットワークシリコンとデータ搬送</strong><span>${companyLink("broadcom")}、${companyLink("marvell")}、${companyLink("cloudflare")}</span>`,
        `<strong>光接続と高速伝送</strong><span>${companyLink("coherent")}、${companyLink("lumentum")}、${companyLink("broadcom")}</span>`
      ]
    },
    site: {
      name: "キャンパス建設と立ち上げ",
      role: "土地、ユーティリティ、建設力を実容量へ変える現実化の層",
      signal: "未来シグナル: 供給拡大は、土地、電力、水、建設能力を同時に整えられる事業者により強く依存します。",
      lede: "AI 需要は一夜で発表できますが、実際の容量は数年かけてしか作れません。",
      how: "データセンターキャンパスは、デジタルの野心が物理的なスケジュールとぶつかる場所です。容量は、土地の確保、許認可、系統接続、水計画、土木、機電設備、防火、試運転がすべてそろって初めて現実になります。こうした判断は長期にわたり、地域条件にも大きく左右されるため、発表された AI 拡張計画と実際にオンラインになる容量は、しばしば別々の時間軸で動きます。",
      future: "今後重要なシグナルは、地域ごとの許認可スピード、プレハブ型キャンパス、水利用圧力、データ主権が促すローカル配備、そして希少な容量を先に押さえるための長期プレリース契約です。",
      builders: [
        `<strong>グローバルなコロケーションと相互接続キャンパス</strong><span>${companyLink("equinix")}、${companyLink("digitalrealty")}、${companyLink("databank")}</span>`,
        `<strong>地域デリバリーとマネージドインフラの参考</strong><span>${companyLink("nttdata")}、${companyLink("qts")}、${companyLink("databank")}</span>`
      ]
    },
    ops: {
      name: "クラウドと AI 運用",
      role: "インフラを顧客が信頼できるサービスへ変える運用層",
      signal: "未来シグナル: ハードウェア調達が容易になるほど、差別化は利用率、推論効率、ガバナンス、サービス品質へ移る可能性があります。",
      lede: "GPU を持っていることと、信頼できる AI 製品を届けられることは同じではありません。",
      how: "ハードウェアで埋まった建物があっても、それだけではまだサービスではありません。誰かがワークロードをスケジュールし、使用量を計測し、データを守り、システムを監視し、障害を修復し、顧客を支援し、サービスの約束を守る必要があります。この層は物理インフラを、企業が実際に採用し、頼れる AI プラットフォーム、GPU クラウド、推論サービスへ変えます。時間が経つほど、運用品質はハードウェア規模と同じくらい重要になります。",
      future: "今後重要なシグナルは、推論中心の収益構造、コストを意識したオーケストレーション、ガバナンスツール、主権要件、そしてメモリ効率とテールレイテンシ制御が AI サービス競争力の中核になる流れです。",
      builders: [
        `<strong>ハイパースケール AI クラウド</strong><span>${companyLink("azure")}、${companyLink("aws")}、${companyLink("googleCloud")}</span>`,
        `<strong>専用 GPU クラウド基盤</strong><span>${companyLink("coreweave")}、${companyLink("lambda")}、${companyLink("crusoe")}</span>`,
        `<strong>可観測性・セキュリティ・運用</strong><span>${companyLink("cloudflare")}、${companyLink("datadog")}、${companyLink("paloalto")}</span>`
      ]
    }
  }
};

const chapter1SignalsToWatch = {
  zh: [
    `<strong>電力接入與定價</strong><span>真正限制新園區上線速度的，常常不是建築本身，而是可靠電力何時能交付，以及用電成本如何被重新定價。</span>`,
    `<strong>液冷成為標準</strong><span>隨著機櫃密度升高，液冷會從進階配置走向更普遍的資料中心預設。</span>`,
    `<strong>HBM 與封裝平衡</strong><span>晶片 headline 很重要，但真正影響交付節奏的，常常是記憶體與封裝產能能否同步跟上。</span>`,
    `<strong>高速光互連</strong><span>更快的 optics 與更成熟的資料搬運架構，會直接決定大型叢集的實際效率。</span>`,
    `<strong>已獲批准的園區容量</strong><span>稀缺的不是土地本身，而是已可施工、可供電、可冷卻的就緒容量。</span>`,
    `<strong>推論經濟與編排</strong><span>當 AI 從訓練走向大量服務，利用率、記憶體效率與延遲控制會越來越影響商業模式。</span>`
  ],
  en: [
    `<strong>Power access and pricing</strong><span>The real limit on new campuses is often when reliable megawatts arrive and how utilities choose to price new AI load.</span>`,
    `<strong>Liquid cooling as default</strong><span>As rack density rises, liquid cooling is moving from advanced configuration toward baseline data center design.</span>`,
    `<strong>HBM and packaging balance</strong><span>Chip headlines matter, but delivery speed often depends on whether memory and packaging scale at the same time.</span>`,
    `<strong>Faster optical fabrics</strong><span>Better optics and cleaner data movement increasingly define how much of a large cluster is actually usable.</span>`,
    `<strong>Permitted campus capacity</strong><span>The scarce asset is not land by itself, but capacity that is approved, buildable, power-ready, and coolable.</span>`,
    `<strong>Inference economics and orchestration</strong><span>As AI shifts from training toward serving, utilization, memory efficiency, and latency control become core business variables.</span>`
  ],
  ko: [
    `<strong>전력 접속과 가격</strong><span>새 AI 캠퍼스의 실제 제약은 건물보다 안정적인 MW가 언제 들어오고 그 전력이 어떻게 가격 책정되는가인 경우가 많습니다.</span>`,
    `<strong>액체 냉각의 표준화</strong><span>랙 밀도가 높아질수록 액체 냉각은 고급 옵션이 아니라 기본 데이터센터 설계로 이동합니다.</span>`,
    `<strong>HBM과 패키징 균형</strong><span>칩 자체보다도 메모리와 패키징이 동시에 확장되는지가 실제 납기 속도를 좌우할 수 있습니다.</span>`,
    `<strong>더 빠른 광 패브릭</strong><span>광 연결과 데이터 이동 구조가 좋아질수록 대형 클러스터의 실효 효율도 함께 달라집니다.</span>`,
    `<strong>승인된 캠퍼스 용량</strong><span>희소한 자산은 토지 자체가 아니라 인허가를 마치고 전력과 냉각 준비가 된 실제 용량입니다.</span>`,
    `<strong>추론 경제성과 오케스트레이션</strong><span>AI가 훈련에서 서비스로 이동할수록 이용률, 메모리 효율, 지연 제어가 핵심 사업 변수가 됩니다.</span>`
  ],
  ja: [
    `<strong>電力接続と価格</strong><span>新しい AI キャンパスの制約は、建物そのものより、安定した MW をいつ受け取れ、その電力がどう価格付けされるかにあることが多いです。</span>`,
    `<strong>液冷の標準化</strong><span>ラック密度が高まるほど、液冷は特別仕様ではなく、データセンターの基本設計へ近づきます。</span>`,
    `<strong>HBM とパッケージングの均衡</strong><span>チップの見出し以上に、メモリとパッケージングが同時に拡張できるかが実際の納入速度を左右します。</span>`,
    `<strong>より高速な光ファブリック</strong><span>光接続とデータ移動設計が進むほど、大規模クラスターの実効効率も変わってきます。</span>`,
    `<strong>許認可済みキャンパス容量</strong><span>希少なのは土地そのものではなく、建設でき、通電でき、冷却できる準備済み容量です。</span>`,
    `<strong>推論の経済性とオーケストレーション</strong><span>AI が学習からサービスへ移るほど、利用率、メモリ効率、遅延制御が重要な事業変数になります。</span>`
  ]
};

const chapter1ReadingLinks = {
  zh: {
    power: [
      externalLink("ABB：資料中心電力與電氣化", referenceCompanies.abb.url),
      externalLink("Cummins：備援電力與發電系統", referenceCompanies.cummins.url),
      externalLink("Siemens Energy：電網與能源系統", referenceCompanies.siemensEnergy.url)
    ],
    cooling: [
      externalLink("Vertiv：資料中心熱管理", referenceCompanies.vertiv.url),
      externalLink("Carrier：商用冷卻與 HVAC", referenceCompanies.carrier.url),
      externalLink("Daikin：全球冷凍空調解決方案", referenceCompanies.daikin.url)
    ],
    compute: [
      externalLink("NVIDIA：AI data center 平台", referenceCompanies.nvidia.url),
      externalLink("TSMC：晶圓代工與先進封裝", referenceCompanies.tsmc.url),
      externalLink("Micron：高頻寬記憶體與記憶體技術", referenceCompanies.micron.url)
    ],
    network: [
      externalLink("Arista Networks：資料中心網路", referenceCompanies.arista.url),
      externalLink("Coherent：光通訊與高速互連", referenceCompanies.coherent.url),
      externalLink("Cloudflare：全球網路與邊緣交付", referenceCompanies.cloudflare.url)
    ],
    site: [
      externalLink("Equinix：全球互連與資料中心園區", referenceCompanies.equinix.url),
      externalLink("DataBank：AI 基礎設施建置案例", referenceCompanies.databank.url),
      externalLink("NTT DATA：資料中心與代管基礎設施", referenceCompanies.nttdata.url)
    ],
    ops: [
      externalLink("Microsoft Azure：AI 與雲端平台", referenceCompanies.azure.url),
      externalLink("Lambda：專用 GPU cloud", referenceCompanies.lambda.url),
      externalLink("Datadog：可觀測性與雲端營運", referenceCompanies.datadog.url)
    ]
  },
  en: {
    power: [
      externalLink("ABB: data center electrification", referenceCompanies.abb.url),
      externalLink("Cummins: backup power systems", referenceCompanies.cummins.url),
      externalLink("Siemens Energy: grid and energy systems", referenceCompanies.siemensEnergy.url)
    ],
    cooling: [
      externalLink("Vertiv: thermal management for data centers", referenceCompanies.vertiv.url),
      externalLink("Carrier: commercial cooling and HVAC", referenceCompanies.carrier.url),
      externalLink("Daikin: global cooling solutions", referenceCompanies.daikin.url)
    ],
    compute: [
      externalLink("NVIDIA: AI data center platform", referenceCompanies.nvidia.url),
      externalLink("TSMC: foundry and advanced packaging", referenceCompanies.tsmc.url),
      externalLink("Micron: HBM and memory technology", referenceCompanies.micron.url)
    ],
    network: [
      externalLink("Arista Networks: data center networking", referenceCompanies.arista.url),
      externalLink("Coherent: optics and high-speed interconnect", referenceCompanies.coherent.url),
      externalLink("Cloudflare: edge delivery and network services", referenceCompanies.cloudflare.url)
    ],
    site: [
      externalLink("Equinix: global interconnection campuses", referenceCompanies.equinix.url),
      externalLink("DataBank: AI infrastructure deployment", referenceCompanies.databank.url),
      externalLink("NTT DATA: managed data center infrastructure", referenceCompanies.nttdata.url)
    ],
    ops: [
      externalLink("Microsoft Azure: AI and cloud platform", referenceCompanies.azure.url),
      externalLink("Lambda: specialized GPU cloud", referenceCompanies.lambda.url),
      externalLink("Datadog: observability and cloud operations", referenceCompanies.datadog.url)
    ]
  },
  ko: {
    power: [
      externalLink("ABB: 데이터센터 전기화", referenceCompanies.abb.url),
      externalLink("Cummins: 백업 전력 시스템", referenceCompanies.cummins.url),
      externalLink("Siemens Energy: 전력망 및 에너지 시스템", referenceCompanies.siemensEnergy.url)
    ],
    cooling: [
      externalLink("Vertiv: 데이터센터 열관리", referenceCompanies.vertiv.url),
      externalLink("Carrier: 상업용 냉각 및 HVAC", referenceCompanies.carrier.url),
      externalLink("Daikin: 글로벌 냉각 솔루션", referenceCompanies.daikin.url)
    ],
    compute: [
      externalLink("NVIDIA: AI 데이터센터 플랫폼", referenceCompanies.nvidia.url),
      externalLink("TSMC: 파운드리 및 첨단 패키징", referenceCompanies.tsmc.url),
      externalLink("Micron: HBM 및 메모리 기술", referenceCompanies.micron.url)
    ],
    network: [
      externalLink("Arista Networks: 데이터센터 네트워킹", referenceCompanies.arista.url),
      externalLink("Coherent: 광통신 및 고속 인터커넥트", referenceCompanies.coherent.url),
      externalLink("Cloudflare: 엣지 전송 및 네트워크 서비스", referenceCompanies.cloudflare.url)
    ],
    site: [
      externalLink("Equinix: 글로벌 인터커넥션 캠퍼스", referenceCompanies.equinix.url),
      externalLink("DataBank: AI 인프라 구축 사례", referenceCompanies.databank.url),
      externalLink("NTT DATA: 관리형 데이터센터 인프라", referenceCompanies.nttdata.url)
    ],
    ops: [
      externalLink("Microsoft Azure: AI 및 클라우드 플랫폼", referenceCompanies.azure.url),
      externalLink("Lambda: 전용 GPU 클라우드", referenceCompanies.lambda.url),
      externalLink("Datadog: 관측성과 클라우드 운영", referenceCompanies.datadog.url)
    ]
  },
  ja: {
    power: [
      externalLink("ABB: データセンター電化", referenceCompanies.abb.url),
      externalLink("Cummins: バックアップ電源システム", referenceCompanies.cummins.url),
      externalLink("Siemens Energy: 電力網とエネルギーシステム", referenceCompanies.siemensEnergy.url)
    ],
    cooling: [
      externalLink("Vertiv: データセンター熱管理", referenceCompanies.vertiv.url),
      externalLink("Carrier: 商用冷却と HVAC", referenceCompanies.carrier.url),
      externalLink("Daikin: グローバル冷却ソリューション", referenceCompanies.daikin.url)
    ],
    compute: [
      externalLink("NVIDIA: AI データセンタープラットフォーム", referenceCompanies.nvidia.url),
      externalLink("TSMC: ファウンドリと先端パッケージング", referenceCompanies.tsmc.url),
      externalLink("Micron: HBM とメモリ技術", referenceCompanies.micron.url)
    ],
    network: [
      externalLink("Arista Networks: データセンターネットワーク", referenceCompanies.arista.url),
      externalLink("Coherent: 光通信と高速相互接続", referenceCompanies.coherent.url),
      externalLink("Cloudflare: エッジ配信とネットワーク運用", referenceCompanies.cloudflare.url)
    ],
    site: [
      externalLink("Equinix: グローバル相互接続キャンパス", referenceCompanies.equinix.url),
      externalLink("DataBank: AI インフラ構築事例", referenceCompanies.databank.url),
      externalLink("NTT DATA: マネージドデータセンター基盤", referenceCompanies.nttdata.url)
    ],
    ops: [
      externalLink("Microsoft Azure: AI とクラウド基盤", referenceCompanies.azure.url),
      externalLink("Lambda: 専用 GPU クラウド", referenceCompanies.lambda.url),
      externalLink("Datadog: 可観測性とクラウド運用", referenceCompanies.datadog.url)
    ]
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
const stage = document.querySelector(".stage");
const appShell = document.querySelector("#appShell");
const rightPanel = document.querySelector("#rightPanel");
const insightContent = document.querySelector("#insightContent");
const insightPeek = document.querySelector("#insightPeek");
const labelLayer = document.querySelector("#labelLayer");
const layerList = document.querySelector("#layerList");
const modeList = document.querySelector("#modeList");
const mobileLayerSummary = document.querySelector("#mobileLayerSummary");
const mobileLayerName = document.querySelector("#mobileLayerName");
const mobileLayerSignal = document.querySelector("#mobileLayerSignal");
const mobileLayerDock = document.querySelector("#mobileLayerDock");
const mobileStageControls = document.querySelector("#mobileStageControls");
const mobileStageChip = document.querySelector("#mobileStageChip");
const mobileStageSheet = document.querySelector("#mobileStageSheet");
const mobileStageTabs = document.querySelector("#mobileStageTabs");
const mobileStageTools = document.querySelector("#mobileStageTools");
const mobileStageExplodeToggle = document.querySelector("#mobileStageExplodeToggle");
const mobileStageExplodeRange = document.querySelector("#mobileStageExplodeRange");
const mobileStageReset = document.querySelector("#mobileStageReset");
const mobileHeroHeader = document.querySelector("#mobileHeroHeader");
const mobileBrandName = document.querySelector("#mobileBrandName");
const mobilePageTitle = document.querySelector("#mobilePageTitle");
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
const updatesOpen = document.querySelector("#updatesOpen");
const aboutScrim = document.querySelector("#aboutScrim");
const aboutDrawer = document.querySelector("#aboutDrawer");
const aboutClose = document.querySelector("#aboutClose");
const updatesScrim = document.querySelector("#updatesScrim");
const updatesDrawer = document.querySelector("#updatesDrawer");
const updatesClose = document.querySelector("#updatesClose");
const aboutEyebrow = document.querySelector("#aboutEyebrow");
const aboutTitle = document.querySelector("#aboutTitle");
const aboutDescription = document.querySelector("#aboutDescription");
const aboutBuilder = document.querySelector("#aboutBuilder");
const aboutFocus = document.querySelector("#aboutFocus");
const aboutAudience = document.querySelector("#aboutAudience");
const aboutUpdated = document.querySelector("#aboutUpdated");
const aboutContact = document.querySelector("#aboutContact");
const updatesEyebrow = document.querySelector("#updatesEyebrow");
const updatesTitle = document.querySelector("#updatesTitle");
const updatesUpdated = document.querySelector("#updatesUpdated");
const updatesDescription = document.querySelector("#updatesDescription");
const updatesList = document.querySelector("#updatesList");
const mobileInsightClose = document.querySelector("#mobileInsightClose");
const activeLayerName = document.querySelector("#activeLayerName");
const activeLayerSignal = document.querySelector("#activeLayerSignal");
const sliderRow = document.querySelector("#sliderRow");
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
const analysisSignalsSection = document.querySelector("#analysisSignalsSection");
const analysisSignalsHeading = document.querySelector("#analysisSignalsHeading");
const analysisSignalsList = document.querySelector("#analysisSignalsList");
const analysisReferencesSection = document.querySelector("#analysisReferencesSection");
const analysisReferencesHeading = document.querySelector("#analysisReferencesHeading");
const analysisReferencesList = document.querySelector("#analysisReferencesList");
const staticTextEls = {
  brandName: document.querySelector("#brandName"),
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
controls.dampingFactor = 0.068;
controls.rotateSpeed = 0.88;
controls.minDistance = 7;
controls.maxDistance = 32;
controls.maxPolarAngle = Math.PI * 0.49;
controls.enablePan = false;
controls.target.set(0, 1.1, 0);
controls.addEventListener("start", () => {
  orbitInteracting = true;
  orbitResumeAt = performance.now() + 1200;
  canvas.style.cursor = "grabbing";
});
controls.addEventListener("end", () => {
  orbitInteracting = false;
  orbitResumeAt = performance.now() + 1800;
  canvas.style.cursor = hovered ? "pointer" : "grab";
});

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
      title: "電力與能源骨幹",
      text: "AI 在成為算力故事之前，首先是一個電力故事。在 GPU 開始訓練模型或服務使用者之前，電力必須先進站、降壓、穩定，並能在故障時持續供應。這就是為什麼變電站、開關設備、UPS、備援發電與併網條件如此重要。未來訊號是：誰能更快取得穩定可交付的電力容量，誰就更有機會率先擴張 AI 園區。"
    },
    cooling: {
      title: "冷卻與散熱系統",
      text: "更多電力，只有在熱能能順利離開系統時，才會真正變成更多算力。當機櫃密度持續升高，熱必須從晶片移入冷板與液冷迴路，再流向泵浦、冷水主機與散熱設備。這一層決定部署密度、穩定性、用水與能效。未來訊號是：液冷正從進階配置走向預設設計。"
    },
    compute: {
      title: "算力設備與 AI 晶片",
      text: "一張 GPU 並不等於一套 AI 系統。只有當記憶體、封裝、供電、散熱與整櫃整合同時到位時，它才真正有用。實際上，算力供給是一條高度協作的製造鏈。未來訊號是：HBM、封裝產能與整櫃交付速度，會和晶片 headline 一樣重要。"
    },
    network: {
      title: "網路互連與資料搬運",
      text: "算力決定能力上限，但資料搬運決定多台機器能否成為同一套系統。無論訓練還是推論，交換器、NIC、光模組、光纖與拓樸，都會決定系統同步與交換上下文的速度。這一層決定理論算力有多少能真正轉成可用效能。未來訊號是：當模型系統更加分散，光互連與網路效率會更直接定義可用效能。"
    },
    site: {
      title: "園區建設與交付",
      text: "AI 熱潮可以在新聞標題裡快速升溫，但真實容量仍然以基礎設施的速度前進。土地、審批、電網接入、水資源、施工與交付時程，都會決定需求何時變成真正容量。這也是為什麼資料中心供給，不能只看土地大小。未來訊號是：真正稀缺的資產，會是已獲批准、可施工、可供電、可冷卻的就緒容量。"
    },
    ops: {
      title: "雲端與 AI 營運",
      text: "擁有 GPU，並不等於能把 AI 交付成值得信任的產品。基礎設施只有在能被營運、治理並持續維持可用時，才會真正變成服務。長期來看，營運品質對客戶信任的影響，會和硬體規格一樣重要。未來訊號是：差異化正轉向利用率、推論效率、治理能力與服務可靠度。"
    }
  },
  en: {
    power: {
      title: "Power & Energy Backbone",
      text: "Before AI becomes a compute story, it begins as a power story. Before GPUs can train a model or serve a user, electricity has to arrive, step down, stabilize, and survive failure. That is why substations, switchgear, UPS systems, backup generation, and grid access matter so much. Future signal: the operators who secure dependable power capacity first will often scale first."
    },
    cooling: {
      title: "Cooling & Heat Removal",
      text: "Cooling decides whether rising electrical load can become sustained AI performance. As rack density rises, heat has to leave the chip, move through cold plates and liquid loops, and reach pumps, chillers, and heat rejection systems. This layer shapes density, uptime, water use, and energy efficiency. Future signal: liquid cooling is moving from advanced option toward default design."
    },
    compute: {
      title: "Compute & AI Chips",
      text: "The real unit of AI capacity is not a GPU. It is a fully integrated system. A working AI node depends on HBM, advanced packaging, power delivery, cooling, and rack-level integration arriving together. In practice, compute supply is a coordinated manufacturing chain. Future signal: HBM, packaging capacity, and rack-scale delivery will matter as much as chip headlines."
    },
    network: {
      title: "Networking & Data Movement",
      text: "In AI infrastructure, data movement is what turns many machines into one working system. During training and inference, switches, NICs, optics, fiber, and topology decide how quickly systems can synchronize and exchange context. This layer determines how much theoretical compute becomes real performance. Future signal: as model systems become more distributed, optical interconnect and network efficiency will increasingly define usable performance."
    },
    site: {
      title: "Campus & Buildout",
      text: "The AI boom may move fast in headlines, but physical capacity still moves at infrastructure speed. Land, permitting, grid access, water, construction, and delivery schedules all shape when demand becomes real capacity. This is why data center supply cannot be measured by acreage alone. Future signal: the scarce asset will be fully permitted, power-ready, buildable capacity."
    },
    ops: {
      title: "Cloud & AI Operations",
      text: "Infrastructure becomes a product only when it can be operated, governed, and trusted. This layer turns hardware into services that developers and enterprises can actually use. Over time, operational quality shapes customer trust as much as hardware specs do. Future signal: differentiation is shifting toward utilization, inference efficiency, governance, and service reliability."
    }
  },
  ko: {
    power: {
      title: "전력 및 에너지 백본",
      text: "AI는 컴퓨트 이야기가 되기 전에 먼저 전력 이야기로 시작됩니다. GPU가 모델을 학습하거나 사용자를 서비스하기 전에 전기는 먼저 들어오고, 전압이 낮춰지고, 안정화되며, 장애 상황에서도 유지되어야 합니다. 그래서 변전, 스위치기어, UPS, 백업 전원, 계통 접속이 매우 중요합니다. 미래 신호는 안정적인 전력 용량을 더 빨리 확보하는 운영자가 먼저 확장할 가능성이 크다는 점입니다."
    },
    cooling: {
      title: "냉각 및 열 제거",
      text: "더 많은 전력은 열이 시스템 밖으로 빠져나갈 수 있을 때만 더 많은 컴퓨트가 됩니다. 랙 밀도가 높아질수록 열은 칩에서 콜드 플레이트와 액체 루프를 거쳐 펌프, 칠러, 방열 장비로 이동해야 합니다. 이 층은 배치 밀도, 안정성, 물 사용, 에너지 효율을 결정합니다. 미래 신호는 액체 냉각이 고급 옵션에서 기본 설계로 이동하고 있다는 점입니다."
    },
    compute: {
      title: "컴퓨트 및 AI 칩",
      text: "GPU 한 장이 곧 AI 시스템은 아닙니다. 메모리, 패키징, 전력 설계, 냉각, 랙 단위 통합이 함께 도착해야 비로소 유용해집니다. 실제로 컴퓨트 공급은 조율된 제조 체인입니다. 미래 신호는 HBM, 패키징 용량, 랙 단위 인도가 칩 헤드라인만큼 중요해진다는 점입니다."
    },
    network: {
      title: "네트워킹 및 데이터 이동",
      text: "컴퓨트가 능력의 상한을 정한다면, 데이터 이동은 많은 장비를 하나의 시스템으로 묶습니다. 훈련과 추론 모두에서 스위치, NIC, 광모듈, 광섬유, 토폴로지는 시스템 동기화와 컨텍스트 교환 속도를 결정합니다. 이 층은 이론상의 컴퓨트가 실제 성능으로 얼마나 전환되는지를 좌우합니다. 미래 신호는 모델 시스템이 더 분산될수록 광 인터커넥트와 네트워크 효율이 실제 성능을 규정하게 된다는 점입니다."
    },
    site: {
      title: "캠퍼스 구축 및 인도",
      text: "AI 붐은 헤드라인에서는 빠르게 움직일 수 있지만, 실제 용량은 여전히 인프라의 속도로 움직입니다. 토지, 인허가, 계통 접속, 물, 시공, 납기 일정이 수요가 언제 실제 용량이 되는지를 결정합니다. 그래서 데이터센터 공급은 단순한 면적으로 측정할 수 없습니다. 미래 신호는 완전한 인허가와 전력 준비가 끝난 건설 가능 용량이 가장 희소한 자산이 된다는 점입니다."
    },
    ops: {
      title: "클라우드 및 AI 운영",
      text: "GPU를 보유하는 것과 신뢰할 수 있는 AI 제품을 제공하는 것은 같은 일이 아닙니다. 인프라는 운영되고, 거버넌스가 적용되며, 지속적으로 신뢰될 수 있을 때 비로소 제품이 됩니다. 이 층은 하드웨어를 개발자와 기업이 실제로 사용할 수 있는 서비스로 바꿉니다. 시간이 갈수록 운영 품질은 하드웨어 사양만큼 고객 신뢰를 좌우합니다. 미래 신호는 차별화가 이용률, 추론 효율, 거버넌스, 서비스 신뢰성으로 이동하고 있다는 점입니다."
    }
  },
  ja: {
    power: {
      title: "電力とエネルギー基盤",
      text: "AI はコンピュートの物語になる前に、まず電力の物語として始まります。GPU がモデルを学習したりユーザーに応答したりする前に、電気はまず届き、降圧され、安定化され、障害時にも維持されなければなりません。だからこそ、変電、開閉装置、UPS、バックアップ電源、系統接続が重要です。今後のシグナルは、安定した電力容量をより早く確保できる事業者ほど先に拡張しやすいという点です。"
    },
    cooling: {
      title: "冷却と熱除去",
      text: "より多くの電力は、熱がきちんとシステムの外へ逃げられるときにだけ、より多くの計算能力になります。ラック密度が上がるほど、熱はチップからコールドプレートと液冷ループを通り、ポンプ、チラー、放熱設備へ移動しなければなりません。この層は、配備密度、安定性、水利用、エネルギー効率を左右します。今後のシグナルは、液冷が特別なオプションから標準設計へ移りつつあることです。"
    },
    compute: {
      title: "コンピュートと AI チップ",
      text: "GPU 1 枚だけでは AI システムにはなりません。メモリ、パッケージング、電力設計、冷却、ラック単位の統合がそろって初めて役に立ちます。実際には、コンピュート供給は協調された製造チェーンです。今後のシグナルは、HBM、パッケージング能力、ラック単位の納入が、チップの見出しと同じくらい重要になることです。"
    },
    network: {
      title: "ネットワーキングとデータ移動",
      text: "コンピュートが能力の上限を決めるなら、データ移動は多くの装置を一つのシステムへまとめます。学習でも推論でも、スイッチ、NIC、光モジュール、光ファイバー、トポロジーが、どれだけ速く同期し文脈をやり取りできるかを決めます。この層は、理論上の計算力がどれだけ実効性能へ変わるかを左右します。今後のシグナルは、モデルシステムが分散するほど、光相互接続とネットワーク効率が実効性能を左右することです。"
    },
    site: {
      title: "キャンパス建設と立ち上げ",
      text: "AI ブームは見出しでは速く進んでも、実際の容量は依然としてインフラの速度でしか動きません。土地、許認可、系統接続、水、建設、納期が、需要がいつ本当の容量になるかを決めます。だからデータセンター供給は、面積だけでは測れません。今後のシグナルは、許認可が完了し、電力準備が整った建設可能容量こそが最も希少な資産になることです。"
    },
    ops: {
      title: "クラウドと AI 運用",
      text: "GPU を持っていることと、信頼できる AI 製品を届けられることは同じではありません。インフラは、運用され、統制され、継続的に信頼できて初めて製品になります。この層は、ハードウェアを開発者や企業が実際に使えるサービスへ変えます。時間が経つほど、運用品質はハードウェア仕様と同じくらい顧客の信頼を左右します。今後のシグナルは、差別化が利用率、推論効率、ガバナンス、サービス信頼性へ移っていることです。"
    }
  }
};

// Static ElevenLabs exports. Missing languages fall back to browser speech synthesis.
const chapter1AudioSources = {
  "en-power": "audio/chapter1/en-power.mp3?v=edu-20260621",
  "en-cooling": "audio/chapter1/en-cooling.mp3?v=edu-20260621",
  "en-compute": "audio/chapter1/en-compute.mp3?v=edu-20260621",
  "en-network": "audio/chapter1/en-network.mp3?v=edu-20260621",
  "en-site": "audio/chapter1/en-site.mp3?v=edu-20260621",
  "en-ops": "audio/chapter1/en-ops.mp3?v=edu-20260621",
  "zh-power": "audio/chapter1/zh-power.mp3?v=edu-20260621",
  "zh-cooling": "audio/chapter1/zh-cooling.mp3?v=edu-20260621",
  "zh-compute": "audio/chapter1/zh-compute.mp3?v=edu-20260621",
  "zh-network": "audio/chapter1/zh-network.mp3?v=edu-20260621",
  "zh-site": "audio/chapter1/zh-site.mp3?v=edu-20260621",
  "zh-ops": "audio/chapter1/zh-ops.mp3?v=edu-20260621",
  "ko-power": "audio/chapter1/ko-power.mp3?v=edu-20260621",
  "ko-cooling": "audio/chapter1/ko-cooling.mp3?v=edu-20260621",
  "ko-compute": "audio/chapter1/ko-compute.mp3?v=edu-20260621",
  "ko-network": "audio/chapter1/ko-network.mp3?v=edu-20260621",
  "ko-site": "audio/chapter1/ko-site.mp3?v=edu-20260621",
  "ko-ops": "audio/chapter1/ko-ops.mp3?v=edu-20260621",
  "ja-power": "audio/chapter1/ja-power.mp3?v=edu-20260621",
  "ja-cooling": "audio/chapter1/ja-cooling.mp3?v=edu-20260621",
  "ja-compute": "audio/chapter1/ja-compute.mp3?v=edu-20260621",
  "ja-network": "audio/chapter1/ja-network.mp3?v=edu-20260621",
  "ja-site": "audio/chapter1/ja-site.mp3?v=edu-20260621",
  "ja-ops": "audio/chapter1/ja-ops.mp3?v=edu-20260621"
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
let chapter1HasInteracted = false;
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
let wheelLayerLockUntil = 0;
let mobileExplodeExpanded = false;
let mobileInsightExpanded = false;
let mobileStageOpen = false;
let orbitInteracting = false;
let orbitResumeAt = 0;
let pointerIntent = null;
const chapter1DefaultCameraPosition = new THREE.Vector3(13.9, 11.4, 17.6);
const chapter1DefaultTarget = new THREE.Vector3(0.12, 1.48, 0.08);
const desiredChapter1CameraPosition = chapter1DefaultCameraPosition.clone();
const desiredChapter1Target = chapter1DefaultTarget.clone();

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

const chapter1FocusViews = {
  power: {
    position: new THREE.Vector3(-10.8, 5.8, 10.8),
    target: new THREE.Vector3(-3.2, 1.2, 0.42)
  },
  cooling: {
    position: new THREE.Vector3(10.4, 5.6, 10),
    target: new THREE.Vector3(3.05, 1.24, 0.24)
  },
  compute: {
    position: new THREE.Vector3(0.7, 5.7, 9.7),
    target: new THREE.Vector3(0, 1.72, 0.06)
  },
  network: {
    position: new THREE.Vector3(1.55, 7.4, 8.5),
    target: new THREE.Vector3(0, 2.78, -0.7)
  },
  site: {
    position: new THREE.Vector3(1.05, 5.1, 12.1),
    target: new THREE.Vector3(0, 0.62, 0.18)
  },
  ops: {
    position: new THREE.Vector3(1.7, 7.6, 9.1),
    target: new THREE.Vector3(0, 3.78, 0.46)
  }
};
const chapter1DimColor = new THREE.Color(0x0c1219);
const chapter1BaseColor = new THREE.Color();

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

const chapter1LayerSymbols = Object.freeze({
  power: "⚡",
  cooling: "❄",
  compute: "◼",
  network: "⇄",
  site: "▦",
  ops: "☁"
});

const chapter2ModeSymbols = Object.freeze({
  compare: "◫",
  training: "▤",
  inference: "◉"
});

const chapter3ModeSymbols = Object.freeze({
  overview: "✦",
  core: "◎",
  infrastructure: "▣"
});

const chapter1ShortNames = Object.freeze({
  en: {
    power: "Power",
    cooling: "Cooling",
    compute: "Compute",
    network: "Network",
    site: "Campus",
    ops: "Ops"
  },
  zh: {
    power: "電力",
    cooling: "冷卻",
    compute: "算力",
    network: "網路",
    site: "園區",
    ops: "營運"
  },
  ko: {
    power: "전력",
    cooling: "냉각",
    compute: "컴퓨트",
    network: "네트워크",
    site: "캠퍼스",
    ops: "운영"
  },
  ja: {
    power: "電力",
    cooling: "冷却",
    compute: "コンピュート",
    network: "ネット",
    site: "キャンパス",
    ops: "運用"
  }
});

const chapter2ShortNames = Object.freeze({
  en: {
    compare: "Compare",
    training: "Training",
    inference: "Inference"
  },
  zh: {
    compare: "比較",
    training: "訓練",
    inference: "推論"
  },
  ko: {
    compare: "비교",
    training: "훈련",
    inference: "추론"
  },
  ja: {
    compare: "比較",
    training: "訓練",
    inference: "推論"
  }
});

const chapter3ShortNames = Object.freeze({
  en: {
    overview: "Overview",
    core: "Core",
    infrastructure: "Infra"
  },
  zh: {
    overview: "總覽",
    core: "Core",
    infrastructure: "基建"
  },
  ko: {
    overview: "개요",
    core: "코어",
    infrastructure: "인프라"
  },
  ja: {
    overview: "概要",
    core: "コア",
    infrastructure: "基盤"
  }
});

function chapter1ShortName(layerId) {
  return chapter1ShortNames[activeLang]?.[layerId] ?? chapter1ShortNames.en[layerId] ?? layerId;
}

function chapterModeShortName(chapterId, modeId) {
  const map = chapterId === "chapter3" ? chapter3ShortNames : chapter2ShortNames;
  return map[activeLang]?.[modeId] ?? map.en[modeId] ?? modeId;
}

function chapterModeGlyph(chapterId, modeId) {
  const map = chapterId === "chapter3" ? chapter3ModeSymbols : chapter2ModeSymbols;
  return map[modeId] ?? "•";
}

function chapterModeColor(chapterId, modeId) {
  if (chapterId === "chapter3") {
    return {
      overview: "#5eead4",
      core: "#19d3ff",
      infrastructure: "#e1ff5b"
    }[modeId] ?? "#19d3ff";
  }
  return {
    compare: "#e1ff5b",
    training: "#ffb84d",
    inference: "#19d3ff"
  }[modeId] ?? "#19d3ff";
}

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
    ...(layerTranslations[activeLang]?.[layer.id] ?? {}),
    ...(chapter1EducationalCopy[activeLang]?.[layer.id] ?? {})
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
  mobileInsightExpanded = false;
  appShell.classList.add("insight-is-hidden");
  rightPanel.classList.remove("is-revealed");
  insightPeek?.setAttribute("aria-expanded", "false");
  rightPanel.setAttribute("aria-hidden", "true");
  insightContent.setAttribute("aria-hidden", "true");
  syncMobileControls();
}

function revealInsights() {
  if (insightsRevealed) return;
  insightsRevealed = true;
  appShell.classList.remove("insight-is-hidden");
  rightPanel.classList.add("is-revealed");
  insightPeek?.setAttribute("aria-expanded", "true");
  rightPanel.setAttribute("aria-hidden", "false");
  insightContent.setAttribute("aria-hidden", "false");
}

function isMobileLayout() {
  return window.innerWidth <= 1120;
}

function chapterChipLabel(chapterId = activeChapter) {
  if (chapterId === "chapter2") return "C2";
  if (chapterId === "chapter3") return "C3";
  return "C1";
}

function setMobileStageOpen(open) {
  if (!mobileStageSheet || !mobileStageChip) return;
  mobileStageOpen = open;
  if (!open) mobileExplodeExpanded = false;
  mobileStageSheet.hidden = !open;
  mobileStageChip.setAttribute("aria-expanded", open ? "true" : "false");
}

function syncMobileControls() {
  const mobileLayout = isMobileLayout();
  const chapter1Active = activeChapter === "chapter1";
  if (sliderRow) {
    const expanded = !mobileLayout || (chapter1Active && mobileExplodeExpanded);
    sliderRow.classList.toggle("is-expanded", expanded);
  }
  if (staticTextEls.explodeLabel) {
    staticTextEls.explodeLabel.setAttribute(
      "aria-expanded",
      !mobileLayout || (chapter1Active && mobileExplodeExpanded) ? "true" : "false"
    );
    staticTextEls.explodeLabel.disabled = mobileLayout && !chapter1Active;
  }
  rightPanel.classList.toggle("mobile-expanded", mobileLayout && mobileInsightExpanded);
  if (mobileStageControls && mobileStageChip && mobileStageSheet && mobileStageExplodeToggle && mobileStageExplodeRange && mobileStageReset) {
    mobileStageControls.hidden = !mobileLayout;
    setMobileStageOpen(mobileLayout && mobileStageOpen);
    mobileStageChip.textContent = chapterChipLabel();
    mobileStageExplodeToggle.textContent = t("explodeLabel");
    mobileStageReset.textContent = t("reset");
    mobileStageExplodeToggle.hidden = !chapter1Active;
    mobileStageExplodeRange.hidden = !chapter1Active || !mobileExplodeExpanded;
    mobileStageExplodeToggle.setAttribute("aria-expanded", chapter1Active && mobileExplodeExpanded ? "true" : "false");
    mobileStageExplodeRange.value = explodeRange.value;
    document.querySelectorAll(".mobile-stage-button").forEach((button) => {
      const active = button.dataset.chapter === activeChapter;
      button.classList.toggle("is-active", active);
      button.textContent = (activeChapter === "chapter3" ? chapter3Copy() : chapter2Copy()).chapterLabels?.[button.dataset.chapter] ?? button.textContent;
    });
  }
  if (mobileHeroHeader) {
    mobileHeroHeader.hidden = !mobileLayout;
  }
  if (mobileInsightClose) {
    mobileInsightClose.hidden = !(mobileLayout && mobileInsightExpanded);
  }
}

function setMobileInsightExpanded(open) {
  mobileInsightExpanded = open;
  syncMobileControls();
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
  closeUpdatesDrawer();
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

function openUpdatesDrawer() {
  closeAnalysisDrawer();
  closeAboutDrawer();
  updatesDrawer.hidden = false;
  updatesScrim.hidden = false;
  updatesDrawer.setAttribute("aria-hidden", "false");
  updatesOpen.setAttribute("aria-expanded", "true");
}

function closeUpdatesDrawer() {
  updatesDrawer.hidden = true;
  updatesScrim.hidden = true;
  updatesDrawer.setAttribute("aria-hidden", "true");
  updatesOpen.setAttribute("aria-expanded", "false");
}

function updateStaticText() {
  document.documentElement.lang = activeChapter === "chapter3" ? chapter3Copy().htmlLang : activeChapter === "chapter2" ? chapter2Copy().htmlLang : t("htmlLang");
  document.title = activeChapter === "chapter3"
    ? `${chapter3Copy().title} | Compute to Grid`
    : activeChapter === "chapter2"
      ? `${chapter2Copy().title} | Compute to Grid`
      : t("browserTitle") || t("pageTitle");
  Object.entries(staticTextEls).forEach(([key, element]) => {
    if (!element) return;
    if (activeChapter === "chapter3" && key === "pageTitle") element.textContent = chapter3Copy().title;
    else if (activeChapter === "chapter3" && key === "introText") element.textContent = chapter3Copy().intro;
    else if (activeChapter === "chapter2" && key === "pageTitle") element.textContent = chapter2Copy().title;
    else if (activeChapter === "chapter2" && key === "introText") element.textContent = chapter2Copy().intro;
    else element.textContent = t(key);
  });
  if (mobileBrandName) mobileBrandName.textContent = t("brandName");
  if (mobilePageTitle) {
    mobilePageTitle.textContent = activeChapter === "chapter3"
      ? chapter3Copy().title
      : activeChapter === "chapter2"
        ? chapter2Copy().title
        : t("pageTitle");
  }
  if (mobileInsightClose) {
    mobileInsightClose.setAttribute("aria-label", t("closeAnalysis"));
  }
  layerList.setAttribute("aria-label", t("layerListLabel"));
  mobileLayerDock?.setAttribute("aria-label", t("layerListLabel"));
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
  if (updatesOpen) {
    updatesOpen.textContent = t("updatesLink");
    updatesOpen.setAttribute("aria-expanded", updatesDrawer.hidden ? "false" : "true");
  }
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
  if (updatesEyebrow) updatesEyebrow.textContent = t("updatesEyebrow");
  if (updatesTitle) updatesTitle.textContent = t("updatesTitle");
  if (updatesUpdated) updatesUpdated.textContent = t("updatesUpdated");
  if (updatesDescription) updatesDescription.textContent = t("updatesDescription");
  if (updatesList) {
    updatesList.innerHTML = (t("updatesItems") ?? []).map((item) => `<li>${item}</li>`).join("");
  }
  if (updatesClose) {
    updatesClose.textContent = t("closeAnalysis");
    updatesClose.setAttribute("aria-label", t("closeAnalysis"));
  }
  if (insightPeek) {
    insightPeek.textContent = t("insightTitle");
    insightPeek.setAttribute("aria-expanded", insightsRevealed ? "true" : "false");
  }
  if (staticTextEls.hintZoom) {
    staticTextEls.hintZoom.textContent = activeChapter === "chapter1" && window.innerWidth > 1120 ? t("hintWheelLayer") : t("hintZoom");
  }
  document.querySelectorAll(".language-button").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.lang === activeLang);
  });
  document.querySelectorAll(".chapter-button").forEach((button) => {
    const copy = activeChapter === "chapter3" ? chapter3Copy() : chapter2Copy();
    button.textContent = copy.chapterLabels?.[button.dataset.chapter] ?? button.textContent;
    button.classList.toggle("is-active", button.dataset.chapter === activeChapter);
  });
  syncMobileControls();
}

function hydrateUi() {
  layerList.innerHTML = "";
  modeList.innerHTML = "";
  labelLayer.innerHTML = "";
  mobileLayerDock.innerHTML = "";
  labels.clear();
  layerList.hidden = activeChapter !== "chapter1";
  modeList.hidden = activeChapter === "chapter1";
  mobileLayerDock.hidden = false;
  mobileLayerSummary.hidden = activeChapter !== "chapter1";

  if (activeChapter === "chapter3") {
    const copy = chapter3Copy();
    mobileLayerDock.setAttribute("aria-label", copy.modeListLabel);
    mobileLayerDock.style.setProperty("--mobile-dock-columns", String(copy.modes.length));
    modeList.setAttribute("aria-label", copy.modeListLabel);
    copy.modes.forEach((mode, index) => {
      const button = document.createElement("button");
      button.className = "mode-button mode-nav-button";
      button.type = "button";
      button.id = `mode-${mode.id}`;
      button.role = "tab";
      button.dataset.mode = mode.id;
      button.style.setProperty("--layer-color", chapterModeColor("chapter3", mode.id));
      button.innerHTML = `
        <span class="mode-glyph">${chapterModeGlyph("chapter3", mode.id)}</span>
        <span class="mode-index">C3-${String(index + 1).padStart(2, "0")}</span>
        <span class="mode-copy">
          <span class="mode-title">${chapterModeShortName("chapter3", mode.id)}</span>
          <span class="mode-role">${mode.role}</span>
        </span>
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

      const mobileButton = document.createElement("button");
      mobileButton.className = "mobile-layer-button";
      mobileButton.type = "button";
      mobileButton.dataset.mode = mode.id;
      mobileButton.style.setProperty("--layer-color", chapterModeColor("chapter3", mode.id));
      mobileButton.innerHTML = `
        <span class="mobile-layer-glyph">${chapterModeGlyph("chapter3", mode.id)}</span>
        <span class="mobile-layer-index">C3-${String(index + 1).padStart(2, "0")}</span>
        <span class="mobile-layer-label">${chapterModeShortName("chapter3", mode.id)}</span>
      `;
      mobileButton.addEventListener("click", () => {
        revealInsights();
        selectChapter3Mode(mode.id, true);
        trackEvent("mode_select", {
          chapter_id: "chapter3",
          mode_id: mode.id,
          mode_name: mode.name,
          interaction_source: "mobile_dock"
        });
      });
      mobileLayerDock.appendChild(mobileButton);
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
    mobileLayerDock.setAttribute("aria-label", copy.modeListLabel);
    mobileLayerDock.style.setProperty("--mobile-dock-columns", String(copy.modes.length));
    modeList.setAttribute("aria-label", copy.modeListLabel);
    copy.modes.forEach((mode, index) => {
      const button = document.createElement("button");
      button.className = "mode-button mode-nav-button";
      button.type = "button";
      button.id = `mode-${mode.id}`;
      button.role = "tab";
      button.dataset.mode = mode.id;
      button.style.setProperty("--layer-color", chapterModeColor("chapter2", mode.id));
      button.innerHTML = `
        <span class="mode-glyph">${chapterModeGlyph("chapter2", mode.id)}</span>
        <span class="mode-index">C2-${String(index + 1).padStart(2, "0")}</span>
        <span class="mode-copy">
          <span class="mode-title">${chapterModeShortName("chapter2", mode.id)}</span>
          <span class="mode-role">${mode.role}</span>
        </span>
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

      const mobileButton = document.createElement("button");
      mobileButton.className = "mobile-layer-button";
      mobileButton.type = "button";
      mobileButton.dataset.mode = mode.id;
      mobileButton.style.setProperty("--layer-color", chapterModeColor("chapter2", mode.id));
      mobileButton.innerHTML = `
        <span class="mobile-layer-glyph">${chapterModeGlyph("chapter2", mode.id)}</span>
        <span class="mobile-layer-index">C2-${String(index + 1).padStart(2, "0")}</span>
        <span class="mobile-layer-label">${chapterModeShortName("chapter2", mode.id)}</span>
      `;
      mobileButton.addEventListener("click", () => {
        revealInsights();
        selectChapter2Mode(mode.id, true);
        trackEvent("mode_select", {
          chapter_id: "chapter2",
          mode_id: mode.id,
          mode_name: mode.name,
          interaction_source: "mobile_dock"
        });
      });
      mobileLayerDock.appendChild(mobileButton);
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

  mobileLayerDock.setAttribute("aria-label", t("layerListLabel"));
  mobileLayerDock.style.setProperty("--mobile-dock-columns", String(layers.length));
  layers.forEach((layer, index) => {
    const copy = localizedLayer(layer);
    const button = document.createElement("button");
    button.className = "layer-button";
    button.type = "button";
    button.id = `tab-${layer.id}`;
    button.role = "tab";
    button.style.setProperty("--layer-color", `#${layer.color.toString(16).padStart(6, "0")}`);
    button.innerHTML = `
      <span class="layer-glyph">${chapter1LayerSymbols[layer.id] ?? "•"}</span>
      <span class="layer-index">${String(index + 1).padStart(2, "0")}</span>
      <span class="layer-copy">
        <span class="layer-title">${chapter1ShortName(layer.id)}</span>
        <span class="layer-role">${copy.role}</span>
      </span>
    `;
    button.addEventListener("click", () => {
      chapter1HasInteracted = true;
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

    const mobileButton = document.createElement("button");
    mobileButton.className = "mobile-layer-button";
    mobileButton.type = "button";
    mobileButton.id = `mobile-tab-${layer.id}`;
    mobileButton.dataset.layer = layer.id;
    mobileButton.style.setProperty("--layer-color", `#${layer.color.toString(16).padStart(6, "0")}`);
    mobileButton.innerHTML = `
      <span class="mobile-layer-glyph">${chapter1LayerSymbols[layer.id] ?? "•"}</span>
      <span class="mobile-layer-index">${String(index + 1).padStart(2, "0")}</span>
      <span class="mobile-layer-label">${chapter1ShortName(layer.id)}</span>
    `;
    mobileButton.addEventListener("click", () => {
      chapter1HasInteracted = true;
      revealInsights();
      selectLayer(layer.id);
      trackEvent("layer_select", {
        chapter_id: "chapter1",
        layer_id: layer.id,
        layer_name: localizedLayer(layer).name,
        interaction_source: "mobile_dock"
      });
    });
    mobileLayerDock.appendChild(mobileButton);

    const label = document.createElement("div");
    label.className = "scene-label";
    label.style.setProperty("--layer-color", `#${layer.color.toString(16).padStart(6, "0")}`);
    label.textContent = copy.name;
    labelLayer.appendChild(label);
    labels.set(layer.id, label);
  });
}

function cycleChapter1Layer(direction) {
  const layerIds = layers.map(({ id }) => id);
  const currentIndex = layerIds.indexOf(selectedId);
  if (currentIndex === -1) return;
  const nextIndex = (currentIndex + direction + layerIds.length) % layerIds.length;
  const nextId = layerIds[nextIndex];
  chapter1HasInteracted = true;
  revealInsights();
  selectLayer(nextId);
  trackEvent("layer_select", {
    chapter_id: "chapter1",
    layer_id: nextId,
    layer_name: localizedLayer(layers.find((item) => item.id === nextId)).name,
    interaction_source: "wheel",
    wheel_direction: direction > 0 ? "next" : "previous"
  });
}

function handleChapter1Wheel(event) {
  if (activeChapter !== "chapter1" || window.innerWidth <= 1120) return;
  if (event.ctrlKey || Math.abs(event.deltaY) < 14) return;
  if (!analysisDrawer.hidden || !aboutDrawer.hidden || !updatesDrawer.hidden || !languagePanel.hidden) return;
  if (event.target.closest("input, button, a, .right-panel, .analysis-drawer, .about-drawer, .updates-drawer, .global-language-menu")) return;
  const now = performance.now();
  if (now < wheelLayerLockUntil) return;
  event.preventDefault();
  wheelLayerLockUntil = now + 340;
  cycleChapter1Layer(event.deltaY > 0 ? 1 : -1);
}

function setChapter1CameraFocus(layerId) {
  const view = chapter1FocusViews[layerId];
  if (!view) {
    desiredChapter1CameraPosition.copy(chapter1DefaultCameraPosition);
    desiredChapter1Target.copy(chapter1DefaultTarget);
    return;
  }
  desiredChapter1CameraPosition.copy(view.position);
  desiredChapter1Target.copy(view.target);
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
  riskText: fullRiskText,
  extraHeading = "",
  extraHtml = "",
  extraVisible = false,
  referencesHeading = "",
  referencesHtml = "",
  referencesVisible = false
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
  if (analysisSignalsSection) {
    analysisSignalsSection.hidden = !extraVisible;
    analysisSignalsHeading.textContent = extraHeading;
    analysisSignalsList.innerHTML = extraHtml;
  }
  if (analysisReferencesSection) {
    analysisReferencesSection.hidden = !referencesVisible;
    analysisReferencesHeading.textContent = referencesHeading;
    analysisReferencesList.innerHTML = referencesHtml;
  }
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
  document.querySelectorAll(".mobile-layer-button").forEach((button) => {
    const active = button.dataset.mode === selectedMode;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-selected", active ? "true" : "false");
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
  document.querySelectorAll(".mobile-layer-button").forEach((button) => {
    const active = button.dataset.mode === selectedChapter3Mode;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-selected", active ? "true" : "false");
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
  mobileExplodeExpanded = false;
  mobileInsightExpanded = false;
  mobileStageOpen = false;
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
  camera.position.copy(chapter1DefaultCameraPosition);
  controls.target.copy(chapter1DefaultTarget);
  setChapter1CameraFocus(chapter1HasInteracted ? selectedId : null);
  selectLayer(selectedId, { focus: chapter1HasInteracted });
}

function setLanguageMenuOpen(open) {
  languagePanel.hidden = !open;
  languageTabs.hidden = !open;
  languageMenuButton.setAttribute("aria-expanded", open ? "true" : "false");
}

function selectLayer(id, { focus = true } = {}) {
  selectedId = id;
  const layer = localizedLayer(layers.find((item) => item.id === id));
  const builders = layer.builders ?? layer.suppliers ?? [];
  const signals = chapter1SignalsToWatch[activeLang] ?? chapter1SignalsToWatch.en;
  const references = chapter1ReadingLinks[activeLang]?.[id] ?? chapter1ReadingLinks.en?.[id] ?? [];
  renderInsightPanels({
    eyebrow: layer.name,
    title: t("insightTitle"),
    lede: layer.lede,
    metrics: layer.metrics,
    summaryHeading: t("chapter1SummaryHeading"),
    summaryText: layer.how ?? layer.risk,
    supplierHeading: t("chapter1BuildersHeading"),
    supplierHtml: builders.map((item) => `<li>${item}</li>`).join(""),
    riskHeading: t("chapter1FutureHeading"),
    riskText: layer.future ?? layer.signal ?? layer.risk,
    extraHeading: t("chapter1SignalsHeading"),
    extraHtml: signals.map((item) => `<li>${item}</li>`).join(""),
    extraVisible: true,
    referencesHeading: t("chapter1LearnMoreHeading"),
    referencesHtml: references.map((item) => `<li>${item}</li>`).join(""),
    referencesVisible: references.length > 0
  });
  const layerSummaryLabel = `${layerIndexLabel(id)} ${chapter1ShortName(id)}`;
  activeLayerName.textContent = layerSummaryLabel;
  activeLayerSignal.textContent = layer.role;
  mobileLayerName.textContent = layerSummaryLabel;
  mobileLayerSignal.textContent = layer.role;
  document.querySelectorAll(".layer-button").forEach((button) => {
    button.classList.toggle("is-active", button.id === `tab-${id}`);
    button.setAttribute("aria-selected", button.id === `tab-${id}` ? "true" : "false");
  });
  document.querySelectorAll(".mobile-layer-button").forEach((button) => {
    const active = button.dataset.layer === id;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-selected", active ? "true" : "false");
  });
  if (focus && chapter1HasInteracted) {
    setChapter1CameraFocus(id);
  } else {
    setChapter1CameraFocus(null);
  }
  updateAudioDock();
  syncMobileControls();
  if (audioPlaying) playAudioBriefing();
}

function resize() {
  const rect = canvas.parentElement.getBoundingClientRect();
  renderer.setSize(rect.width, rect.height, false);
  camera.aspect = rect.width / rect.height;
  camera.updateProjectionMatrix();
  syncMobileControls();
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
  if (pointerIntent) {
    const deltaX = event.clientX - pointerIntent.x;
    const deltaY = event.clientY - pointerIntent.y;
    if (Math.hypot(deltaX, deltaY) > 8) pointerIntent.moved = true;
  }
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
  if (!orbitInteracting) canvas.style.cursor = hovered ? "pointer" : "grab";
}

function pointerDown(event) {
  revealInsights();
  pointerIntent = {
    x: event.clientX,
    y: event.clientY,
    moved: false
  };
}

function pointerUp(event) {
  if (!pointerIntent) return;
  const wasMoved = pointerIntent.moved;
  pointerIntent = null;
  if (wasMoved || orbitInteracting) return;
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
    chapter1HasInteracted = true;
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
  const now = performance.now();
  explodeCurrent += (explodeTarget - explodeCurrent) * 0.08;

  if (activeChapter === "chapter1") {
    const orbitAssistActive = !orbitInteracting && now >= orbitResumeAt;
    if (orbitAssistActive) {
      camera.position.lerp(desiredChapter1CameraPosition, 0.085);
      controls.target.lerp(desiredChapter1Target, 0.11);
    }
    groupByLayer.forEach((group, id) => {
      const target = group.userData.compact.clone().lerp(group.userData.exploded, explodeCurrent);
      const isSelected = chapter1HasInteracted && id === selectedId;
      const isHovered = id === hovered;
      if (isSelected) target.y += 0.14 + Math.sin(time * 2.2) * 0.024;
      group.position.lerp(target, 0.12);
      group.rotation.y = Math.sin(time * 0.5 + id.length) * 0.018;
      const targetScale = isSelected ? 1.04 : isHovered ? 1.01 : chapter1HasInteracted ? 0.985 : 1;
      group.scale.x += (targetScale - group.scale.x) * 0.12;
      group.scale.y += (targetScale - group.scale.y) * 0.12;
      group.scale.z += (targetScale - group.scale.z) * 0.12;

      group.traverse((child) => {
        if (!child.material || child.type === "Line") return;
        const emphasis = chapter1HasInteracted ? (isSelected ? 1 : isHovered ? 0.9 : 0.74) : 1;
        child.material.emissive = child.material.emissive || new THREE.Color(0x000000);
        child.material.emissiveIntensity = chapter1HasInteracted ? (isSelected ? 0.14 : isHovered ? 0.08 : 0.02) : isHovered ? 0.05 : 0.03;
        if (child.material.color) {
          if (child.material.userData.originalColor === undefined) {
            child.material.userData.originalColor = child.material.color.getHex();
          }
          chapter1BaseColor.setHex(child.material.userData.originalColor);
          if (chapter1HasInteracted) {
            child.material.color.copy(chapter1BaseColor).lerp(chapter1DimColor, 1 - emphasis);
          } else {
            child.material.color.copy(chapter1BaseColor);
          }
        }
        if (child.material.opacity !== undefined) {
          const originalOpacity = child.material.userData.originalOpacity ?? 1;
          child.material.transparent = originalOpacity < 1 || (chapter1HasInteracted && emphasis < 0.99);
          child.material.opacity = chapter1HasInteracted ? Math.max(0.28, originalOpacity * emphasis) : originalOpacity;
        }
      });
    });

    flowLines.forEach((line, index) => {
      line.visible = true;
      line.material.opacity = 0.18;
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

  controls.autoRotate = !orbitInteracting && now >= orbitResumeAt;
  controls.autoRotateSpeed = 0.28;
  controls.update();
  renderer.render(scene, camera);
  updateLabels();
}

explodeRange.addEventListener("input", () => {
  revealInsights();
  explodeTarget = Number(explodeRange.value) / 100;
});

staticTextEls.explodeLabel?.addEventListener("click", () => {
  if (!isMobileLayout() || activeChapter !== "chapter1") return;
  mobileExplodeExpanded = !mobileExplodeExpanded;
  syncMobileControls();
  trackEvent("explode_toggle", {
    chapter_id: activeChapter,
    state: mobileExplodeExpanded ? "expanded" : "collapsed",
    interaction_source: "mobile_link"
  });
});

mobileStageChip?.addEventListener("click", () => {
  if (!isMobileLayout()) return;
  setMobileStageOpen(!mobileStageOpen);
});

mobileStageTabs?.addEventListener("click", (event) => {
  const button = event.target.closest("[data-chapter]");
  if (!button) return;
  const previousChapter = activeChapter;
  selectChapter(button.dataset.chapter);
  if (previousChapter !== activeChapter) {
    trackEvent("chapter_select", {
      chapter_id: activeChapter,
      previous_chapter_id: previousChapter,
      interaction_source: "mobile_chip"
    });
  }
});

mobileStageExplodeToggle?.addEventListener("click", () => {
  if (!isMobileLayout() || activeChapter !== "chapter1") return;
  mobileExplodeExpanded = !mobileExplodeExpanded;
  syncMobileControls();
  trackEvent("explode_toggle", {
    chapter_id: activeChapter,
    state: mobileExplodeExpanded ? "expanded" : "collapsed",
    interaction_source: "mobile_chip"
  });
});

mobileStageExplodeRange?.addEventListener("input", () => {
  revealInsights();
  explodeRange.value = mobileStageExplodeRange.value;
  explodeTarget = Number(mobileStageExplodeRange.value) / 100;
  syncMobileControls();
});

mobileStageReset?.addEventListener("click", () => {
  resetView.click();
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
  chapter1HasInteracted = false;
  camera.position.copy(chapter1DefaultCameraPosition);
  controls.target.copy(chapter1DefaultTarget);
  explodeRange.value = "72";
  explodeTarget = 0.72;
  setChapter1CameraFocus(null);
  selectLayer("compute", { focus: false });
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
  if (event.target.closest("#mobileStageControls")) return;
  setMobileStageOpen(false);
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

insightPeek?.addEventListener("click", () => {
  revealInsights();
  trackEvent("insight_peek_open", {
    chapter_id: activeChapter,
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
updatesOpen?.addEventListener("click", () => {
  openUpdatesDrawer();
  trackEvent("updates_open");
});
updatesClose?.addEventListener("click", closeUpdatesDrawer);
updatesScrim?.addEventListener("click", closeUpdatesDrawer);
aboutContact.addEventListener("click", () => {
  trackEvent("contact_click", {
    contact_method: "email"
  });
});

rightPanel.addEventListener("click", (event) => {
  if (!isMobileLayout() || rightPanel.getAttribute("aria-hidden") === "true") return;
  if (event.target.closest("button, a, input")) return;
  mobileInsightExpanded = !mobileInsightExpanded;
  syncMobileControls();
  trackEvent("insight_card_toggle", {
    chapter_id: activeChapter,
    segment_id: activeSegmentForTracking(),
    state: mobileInsightExpanded ? "expanded" : "collapsed"
  });
});

mobileInsightClose?.addEventListener("click", (event) => {
  event.stopPropagation();
  setMobileInsightExpanded(false);
});

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;
  if (!analysisDrawer.hidden) closeAnalysisDrawer();
  if (!aboutDrawer.hidden) closeAboutDrawer();
  if (!updatesDrawer.hidden) closeUpdatesDrawer();
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
canvas.addEventListener("pointerup", pointerUp);
canvas.addEventListener("pointercancel", () => {
  pointerIntent = null;
});
canvas.addEventListener("wheel", revealInsights, { passive: true });
stage?.addEventListener("wheel", handleChapter1Wheel, { passive: false });
window.addEventListener("resize", resize);

updateStaticText();
hydrateUi();
applyColorScheme(activeScheme);
resize();
setChapter1CameraFocus(null);
selectLayer("compute", { focus: false });
trackEvent("project_view", {
  segment_id: activeSegmentForTracking()
});
animate();
