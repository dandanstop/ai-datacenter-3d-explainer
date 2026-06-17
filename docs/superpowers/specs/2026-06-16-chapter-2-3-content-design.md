# Chapter 2 and Chapter 3 Content Design

Status: discussion draft  
Date: 2026-06-16  
Project: AI Data Center Value Chain 3D Explainer  
Related baseline spec: `REQUIREMENTS.md`

## 1. Editorial Direction

The current page explains the physical value chain of AI data centers. The next expansion should move from "what the infrastructure is" to "how AI workloads move through the infrastructure."

Recommended master arc:

1. Chapter 1: AI is becoming infrastructure.
2. Chapter 2: AI workloads are splitting from training factories into inference networks.
3. Chapter 3: Agentic AI turns model calls into CPU-orchestrated distributed workflows.

The desired editorial tone combines:

- New York Times-style macro framing: infrastructure, capital allocation, bottlenecks, system-level change.
- Wired-style technical visualization: flows, latency, orchestration, distributed systems, workload behavior.

Do not frame the expansion as a generic "more AI content" section. Frame it as a guided exhibit that shows why AI infrastructure changes as the workload changes.

## 2. Curatorial Thesis

Chapter 1 shows the anatomy of the AI data center.

Chapter 2 shows two different workload metabolisms:

- Training is a throughput factory.
- Inference is a latency network.

Chapter 3 shows the next abstraction layer:

- Agentic AI is not a single model call.
- It is a multi-step distributed workflow coordinated by CPUs, accelerated by GPUs, and constrained by network, storage, memory, and latency.

Core line:

AI infrastructure is no longer only about building larger GPU clusters. It is about coordinating compute, memory, data movement, retrieval, tools, and verification across increasingly complex workflows.

Chinese working line:

AI 基礎設施不再只是建造更大的 GPU 叢集，而是協調算力、記憶體、資料移動、檢索、工具與驗證，讓複雜 workflow 能在可接受的延遲內完成。

## 3. Visual System Continuity

The new chapters should inherit the current visual grammar:

- Dark infrastructure environment.
- 3D exploded systems rather than flat diagrams.
- Cyan and lime as primary accents.
- Compact labels and analytical panels.
- Flow animation as the central explanatory device.
- No decorative gradient orbs.
- No marketing hero composition.
- No oversized cards that compete with the simulation.

The main conceptual reuse from Chapter 1:

- Chapter 1: 3D model decomposes physical supply-chain components.
- Chapter 2: 3D model decomposes workload flow patterns.
- Chapter 3: 3D model decomposes agent workflow coordination.

## 4. Chapter 2: From GPU Training to Inference

### 4.1 Chapter Thesis

Training and inference are both AI workloads, but they stress infrastructure differently.

Training is batch-heavy, throughput-oriented, and cluster-synchronized. It rewards high GPU utilization, fast east-west networking, large data pipelines, checkpointing, and tightly coupled clusters.

Inference is request-heavy, latency-sensitive, and always-on. It rewards fast routing, concurrency management, KV cache efficiency, retrieval speed, model serving reliability, and predictable response time.

### 4.2 Working Headline Options

Recommended:

From Training Factories to Inference Networks

Alternatives:

- Training Is a Factory. Inference Is Traffic.
- After the Training Boom Comes the Inference Economy.
- AI's Next Phase Is About Latency, Not Just Scale.

Chinese working headline:

從訓練工廠到推論網路

Chinese alternate:

AI 的下一階段，不只比算力，也比延遲

### 4.3 Opening Copy Draft

English:

Training and inference look similar from a distance: both run on GPUs. But inside the data center, they behave like different machines. Training moves large batches through tightly synchronized clusters. Inference serves many small requests in real time, where every network hop, cache miss, and retrieval step can become user-visible latency.

Traditional Chinese:

從遠處看，訓練與推論都依賴 GPU；但在資料中心內部，它們像兩種不同的機器。訓練把大量資料批次送進同步化的 GPU 叢集，推論則要即時服務無數小請求，每一次網路跳轉、快取失誤與資料檢索，都可能變成使用者感受到的延遲。

### 4.4 Interaction Mode

Primary interaction: three-mode workload simulator.

Modes:

1. Training
2. Inference
3. Compare Both

Training mode:

- Show thick batch blocks entering the data pipeline.
- Flow: Dataset / storage -> preprocessing -> GPU cluster -> all-reduce / interconnect -> checkpoint storage -> training output.
- Use large pulsing data blocks.
- GPU racks should light up together.
- Network links should pulse in broad synchronized waves.
- Checkpoint storage should flash periodically.

Inference mode:

- Show many small request particles.
- Flow: User requests -> gateway / load balancer -> model server -> KV cache -> retrieval / vector database -> response fan-out.
- Use fine-grained particles rather than large blocks.
- Show latency meters or timing bars.
- Show cache hits as short green paths and cache misses as longer cyan paths.
- Retrieval path should visibly leave the model server and come back.

Compare Both mode:

- Split the simulation into left and right lanes.
- Left: Training Batch Workload.
- Right: Inference Serving Workload.
- Use synchronized legends so users can compare infrastructure pressure.

### 4.5 Suggested 3D Components

Training components:

- Object storage / dataset lake.
- Data preprocessing conveyor.
- GPU training cluster.
- High-bandwidth interconnect fabric.
- Checkpoint storage.
- Training output artifact.

Inference components:

- Request gateway.
- Load balancer.
- Model serving rack.
- KV cache module.
- Vector database / retrieval store.
- Response edge.

Shared infrastructure overlays:

- GPU utilization.
- Network pressure.
- Storage read/write pressure.
- Latency budget.
- Power draw.

### 4.6 On-Screen Labels

Training:

- Batch workload
- GPU synchronization
- All-reduce traffic
- Checkpoint writes
- Throughput-first

Inference:

- Request serving
- Low-latency path
- KV cache
- Retrieval call
- User-visible latency

Compare metrics:

- Batch size
- Tokens/sec
- P95 latency
- Network bandwidth
- Storage I/O
- Cache hit rate

### 4.7 Educational Takeaway

Training builds model capability. Inference turns that capability into a product.

Training infrastructure is optimized for throughput and synchronized GPU utilization. Inference infrastructure is optimized for concurrency, routing, memory locality, cache efficiency, and predictable latency.

Investment implication:

As AI usage shifts from training to inference, the value chain focus expands from GPU supply to serving infrastructure: networking, CPU orchestration, memory, storage, software, observability, and power efficiency.

### 4.8 Insight Text Requirements

Chapter 2 should preserve a readable insight layer, similar to Chapter 1.

The 3D model explains the workload visually. The insight text explains why the workload matters.

Recommended structure:

- 3 to 4 insight cards for each mode: Training, Inference, Compare Both.
- Each card should include a concise title, a short analytical paragraph, and one infrastructure implication.
- Text should be written for investors, technology analysts, semiconductor professionals, and AI infrastructure teams.
- The content should be readable even without audio playback.
- The insight panel should stay collapsed on initial load, then appear after user interaction or explicit selection.

Suggested Chapter 2 insight themes:

- Training is optimized for throughput, synchronized GPU utilization, and large batch movement.
- Inference is optimized for latency, concurrency, cache efficiency, and always-on serving.
- The infrastructure bottleneck shifts as AI moves from model building to product usage.
- The value chain expands from GPUs into networking, memory, storage, CPUs, observability, and power efficiency.

## 5. Chapter 3: Agentic AI as a Coordinated System

### 5.1 Chapter Thesis

Agentic AI changes the unit of work.

The unit is no longer one prompt and one model response. It becomes a workflow: planning, model calls, retrieval, tool execution, memory reads/writes, verification, and final response.

This makes CPUs, networking, storage, memory systems, and latency budgets more important.

Key correction:

CPU plays a critical role in Agentic AI. It acts as the orchestration and control plane. GPU remains essential for model inference and embeddings, but CPU coordinates workflow logic, routing, tool calls, retrieval pipelines, JSON/function calling, permission checks, preprocessing, postprocessing, scheduling, memory management, and network I/O.

### 5.2 Working Headline Options

Recommended:

Agentic AI Turns Model Calls Into Distributed Workflows

Alternatives:

- The Next AI Bottleneck May Be Coordination.
- AI Agents Are Not Models. They Are Workflows.
- Your Next AI Assistant Is a Distributed System.

Chinese working headline:

Agentic AI 讓模型呼叫變成分散式工作流

Chinese alternate:

下一個 AI 瓶頸，可能是跨系統協調

### 5.3 Opening Copy Draft

English:

Agentic AI does not simply ask a model once. It breaks a request into steps, plans an approach, calls models, retrieves context, invokes tools, writes memory, checks its own work, and then responds. The GPU still generates tokens, but the workflow around the model becomes a distributed system. In that system, CPUs act as traffic controllers, and network, storage, and latency become central infrastructure constraints.

Traditional Chinese:

Agentic AI 不只是呼叫一次模型。它會把請求拆成多個步驟，先規劃路徑，再呼叫模型、檢索資料、使用工具、寫入記憶、驗證結果，最後才回應。GPU 仍然負責產生 token，但模型周圍的 workflow 已經變成一套分散式系統。在這個系統裡，CPU 扮演交通控制塔，而網路、儲存與延遲成為核心基礎設施瓶頸。

### 5.4 Interaction Mode

Primary interaction: playable agent workflow.

Workflow path:

User request -> Planner -> CPU / Orchestration Layer -> Model calls -> Retrieval -> Tools -> Memory -> Verification -> Response

Playback states:

1. Step-by-step mode
2. Auto-play mode
3. Bottleneck overlay mode

Step-by-step mode:

- User advances one workflow step at a time.
- Each node lights up and shows what resource it stresses.
- Side panel updates with current infrastructure implication.

Auto-play mode:

- Particles move across the full agent chain.
- Model calls branch out and return.
- Retrieval and tool calls add visible round trips.
- Verification loop can repeat once to show retry behavior.

Bottleneck overlay mode:

- Color-code pressure points:
  - CPU orchestration: lime
  - GPU model calls: cyan
  - Network hops: blue-white
  - Storage / memory: pale green
  - Latency accumulation: amber

### 5.5 Suggested 3D Components

Nodes:

- User request input.
- Planner.
- CPU / Orchestration Layer.
- Model call cluster.
- Retrieval / vector database.
- Tool execution module.
- Memory store.
- Verification module.
- Final response output.

Infrastructure side panels:

- CPU orchestration
- GPU inference
- Network hops
- Storage and memory
- End-to-end latency

### 5.6 CPU Role Definition

CPU should appear as a named and visible node, not as a footnote.

Recommended label:

CPU / Orchestration Layer

Short annotation:

Coordinates planning, routing, tool calls, retrieval, memory, permissions, and postprocessing.

Chinese annotation:

協調規劃、路由、工具調用、檢索、記憶、權限檢查與後處理。

How to position CPU visually:

- Place CPU orchestration after Planner and before the branching workflow.
- Make it the control hub that routes paths to GPU model calls, retrieval, tools, and memory.
- Do not make it larger than the entire workflow, but make it structurally central.

### 5.7 Infrastructure Takeaway

Agentic AI increases the number of system calls per user request.

A single prompt may trigger:

- Multiple model calls.
- Multiple retrieval calls.
- External tool calls.
- Memory reads and writes.
- Verification loops.
- Policy or permission checks.

This shifts infrastructure analysis from "how many GPUs are available" to "how efficiently the system coordinates many small operations under a latency budget."

Investment implication:

Agentic AI expands infrastructure relevance beyond GPU vendors. It raises the importance of CPUs, networking, storage, memory, inference platforms, observability, databases, vector search, security, and orchestration software.

### 5.8 Insight Text Requirements

Chapter 3 should also preserve a readable insight layer, similar to Chapter 1.

The 3D workflow explains how agent steps move through the system. The insight text explains why multi-step reasoning changes infrastructure demand.

Recommended structure:

- 3 to 5 insight cards tied to the active workflow step.
- Each card should include a concise title, a short analytical paragraph, and one infrastructure implication.
- Text should be useful for readers who prefer detailed analysis over audio narration.
- The insight panel should stay collapsed on initial load, then appear after user interaction or explicit selection.
- Transcript and insight should be separate: transcript is the narrated script; insight is the analytical reading layer.

Suggested Chapter 3 insight themes:

- Agentic AI changes the unit of work from one model call to a distributed workflow.
- CPU orchestration becomes central because it coordinates planning, routing, tool calls, retrieval, memory, verification, and postprocessing.
- Network, storage, memory, and latency become more visible because each user request can trigger many system calls.
- Verification and retry loops can increase compute demand, latency variance, and observability requirements.
- The infrastructure opportunity expands toward orchestration software, databases, vector search, security, and inference platforms.

### 5.9 Chapter 3 Value-Chain Role Examples

Chapter 3 insight cards should mention real company names or ticker symbols where relevant, similar to Chapter 1.

Important framing:

- Company names should be used as illustrative value-chain examples, not investment recommendations.
- The content should explain the role each company type may play after Agentic AI shifts demand from single model calls to multi-step workflows.
- Public tickers can be shown where available. Private companies should be marked as private.
- Avoid presenting the list as exhaustive; the goal is to help readers map the ecosystem.

Recommended value-chain role groups:

- Frontier model and agent platform layer: Microsoft (MSFT), Alphabet / Google (GOOGL), Amazon (AMZN), Meta (META), OpenAI (private), Anthropic (private), Cohere (private).
- Cloud and inference platform layer: Microsoft Azure (MSFT), Amazon Web Services (AMZN), Google Cloud (GOOGL), Oracle Cloud (ORCL), Cloudflare (NET), CoreWeave (private).
- CPU / orchestration and control-plane silicon: Intel (INTC), AMD (AMD), Arm (ARM), NVIDIA Grace CPU / networking stack (NVDA), Broadcom (AVGO), Marvell (MRVL).
- GPU inference and accelerator layer: NVIDIA (NVDA), AMD (AMD), Broadcom (AVGO), Google TPU via Alphabet (GOOGL), Amazon Trainium / Inferentia via Amazon (AMZN).
- Server and rack-scale systems: Super Micro Computer (SMCI), Dell Technologies (DELL), HPE (HPE), Quanta (2382.TW), Wiwynn (6669.TW), Foxconn (2317.TW).
- Network fabric, DPU, NIC, and optics: Arista Networks (ANET), Cisco (CSCO), NVIDIA Networking (NVDA), Broadcom (AVGO), Marvell (MRVL), Coherent (COHR), Lumentum (LITE), Fabrinet (FN), Amphenol (APH).
- Data, retrieval, vector search, and storage layer: Snowflake (SNOW), MongoDB (MDB), Elastic (ESTC), Databricks (private), Pinecone (private), Weaviate (private), Samsung Electronics (005930.KS), SK hynix (000660.KS), Micron (MU).
- Workflow automation, enterprise agents, and tool execution: Salesforce (CRM), ServiceNow (NOW), Adobe (ADBE), Atlassian (TEAM), UiPath (PATH), GitLab (GTLB), GitHub via Microsoft (MSFT).
- Observability, security, and governance: Datadog (DDOG), Dynatrace (DT), Elastic (ESTC), Cloudflare (NET), Palo Alto Networks (PANW), CrowdStrike (CRWD), Zscaler (ZS).

Suggested card mapping:

- Planner / Orchestration insight: mention CPU vendors, cloud control planes, and enterprise workflow platforms.
- Model Calls insight: mention GPU/accelerator providers, hyperscaler AI chips, and inference platforms.
- Retrieval / Memory insight: mention databases, vector search, storage, and memory suppliers.
- Tools / External Actions insight: mention enterprise SaaS, automation, developer platforms, and API ecosystems.
- Verification / Observability insight: mention monitoring, security, policy, and governance vendors.

## 6. Combined Scrollytelling Structure

Recommended page progression:

1. Chapter 1: 3D value chain anatomy.
2. Transition: Workloads begin to move through the anatomy.
3. Chapter 2: Training vs inference workload simulator.
4. Transition: Inference becomes multi-step and system-level.
5. Chapter 3: Agentic AI workflow simulator.
6. Closing: The AI infrastructure stack becomes a coordinated system, not a single chip cycle.

### 6.1 Transition From Chapter 1 to Chapter 2

Suggested copy:

Chapter 1 showed the parts. Chapter 2 shows how different workloads move through them.

Chinese:

第一章看見零件，第二章看見 workload 如何穿過這些零件。

### 6.2 Transition From Chapter 2 to Chapter 3

Suggested copy:

Inference turns models into services. Agentic AI turns services into workflows.

Chinese:

推論把模型變成服務，Agentic AI 則把服務變成工作流。

## 7. Interactive Audio Briefing

### 7.1 Concept

Add an optional guided audio layer that turns the experience into a curated technical briefing.

This should not be framed as a generic podcast. A podcast is mostly passive. This project should use an "Interactive Audio Briefing" model: the narration, 3D scene, data-flow animation, and transcript stay synchronized.

Core idea:

The user can listen to the chapter while the 3D model animates the relevant infrastructure, workload, or agent workflow step.

Interaction principle:

Follow the Chapter 1 progressive-disclosure pattern. The user's visual focus should stay on the 3D model first. Audio controls and transcript content should not compete with the model on initial load.

### 7.2 Why This Fits The Project

The project already behaves like a digital exhibition:

- Chapter 1 is a 3D exhibit of the AI data center value chain.
- Chapter 2 can become an animated exhibit of workload flow.
- Chapter 3 can become an animated exhibit of agent workflow coordination.

Audio makes the page feel like a guided museum tour for AI infrastructure. It helps non-engineering senior readers follow the argument without reducing the depth for technical readers.

### 7.3 Player Requirements

The player should be compact, quiet, and secondary to the 3D scene.

Default state:

- Do not autoplay.
- Do not open the transcript panel.
- Do not expand a full podcast-style player.
- Show only a minimal audio entry point, such as a compact "Audio briefing" dock or small play button.
- Keep the 3D model as the dominant visual element.

Recommended placement:

- Desktop: bottom center or bottom-right floating player.
- Mobile: sticky bottom mini player.

Player controls:

- Play / pause.
- Chapter selector.
- Current segment title.
- Progress bar.
- Time remaining.
- Mute / audio on-off.
- Transcript toggle.
- Step forward / replay current scene, optional in v1.

Player states:

- Idle: compact "Start audio briefing" state only.
- Playing: shows current chapter and segment.
- Paused: preserves current 3D scene state.
- Transcript open: shows synced text without hiding the 3D model.

Trigger behavior:

- If the user presses the play button, start the chapter briefing from the current chapter's first marker or current selected marker.
- If the user clicks a 3D node/component, start playback from that node's corresponding narration segment.
- If the user selects a different 3D node while audio is playing, jump to that node's segment and update the highlighted transcript sentence.
- If the user pauses, freeze the current visual highlight and data-flow state.

The audio layer should behave like a guided annotation system for the 3D model, not like a standalone media module.

### 7.4 Scene Marker System

Each chapter audio should be divided into timed scene markers.

Each marker controls:

- Narration segment.
- Highlighted 3D component.
- Active data-flow animation.
- Metric or insight panel.
- Transcript sentence highlight.
- Click target mapping from a 3D node to the relevant audio segment.

Marker data should support both directions:

- Audio -> 3D: narration progress updates the model highlight and flow animation.
- 3D -> Audio: clicking a model component starts or jumps to the associated audio script.

Example Chapter 2 markers:

1. Intro: Training and inference both use GPUs, but behave differently.
2. Training batch flow: dataset -> preprocessing -> GPU cluster.
3. Training synchronization: all-reduce and east-west network traffic.
4. Checkpointing: storage writes and recovery.
5. Inference request flow: gateway -> model server.
6. KV cache and retrieval: cache hit / miss and vector database lookup.
7. Latency budget: every hop adds user-visible time.
8. Conclusion: training optimizes throughput; inference optimizes latency.

Example Chapter 3 markers:

1. User request enters the system.
2. Planner decomposes the task.
3. CPU / Orchestration Layer routes the workflow.
4. GPU model call generates or evaluates tokens.
5. Retrieval fetches external context.
6. Tools execute external actions.
7. Memory stores state and context.
8. Verification checks the result.
9. Response returns to the user.
10. Conclusion: Agentic AI is a distributed workflow.

### 7.5 Chapter 1 Audio Briefing

Purpose:

Orient the user inside the existing value-chain model.

Suggested narrative:

AI is becoming infrastructure. The first bottleneck is not always the GPU. Power, cooling, compute, network, site construction, and operations all determine whether AI capacity becomes real.

Scene sync:

- Power & Grid lights up when discussing electricity and grid interconnection.
- Cooling Systems lights up when discussing rack density.
- Compute Equipment lights up when discussing GPUs, HBM, packaging, and servers.
- Network Interconnect lights up when discussing east-west traffic and optics.
- Site & Construction lights up when discussing land and permitting.
- Operations & Platform lights up when discussing GPU cloud, security, SLA, and utilization.

### 7.6 Chapter 2 Audio Briefing

Purpose:

Guide users through the contrast between training and inference.

Suggested narrative frame:

Training is a factory. Inference is traffic.

Scene sync:

- Training mode uses large batch blocks.
- GPU cluster lights up as one synchronized system.
- Network links pulse as all-reduce traffic.
- Checkpoint storage flashes periodically.
- Inference mode switches to many small request particles.
- Gateway, model server, KV cache, retrieval, and response nodes light up sequentially.
- Latency meter accumulates at each hop.

### 7.7 Chapter 3 Audio Briefing

Purpose:

Explain that Agentic AI is a coordinated system, not a single model call.

Suggested narrative frame:

Agentic AI turns a model call into a CPU-orchestrated distributed workflow.

Scene sync:

- User request node activates first.
- Planner node breaks request into steps.
- CPU / Orchestration Layer becomes the routing hub.
- GPU model call branches out and returns.
- Retrieval and tools create visible round trips.
- Memory node shows read/write state.
- Verification loop checks output before response.
- Network, storage, and latency overlays rise as workflow complexity increases.

### 7.8 Transcript Requirements

Transcript should be first-class, not an afterthought.

Default state:

- Transcript panel is collapsed.
- Transcript does not open automatically when playback starts.
- A small transcript toggle should be available after the player is active.
- Opening transcript should not reduce the 3D model to a secondary visual.

Functions:

- Display full chapter transcript.
- Highlight the sentence currently being narrated.
- Let users click a sentence to jump to the corresponding 3D scene marker.
- Provide readable text for SEO/GEO.
- Support future translation into Chinese, English, Korean, and Japanese.

SEO/GEO requirement:

The transcript should exist as real HTML text. Do not render transcript only inside canvas. Do not hide all transcript text from crawlers. It can be collapsible, but it should remain accessible and semantically structured.

### 7.9 MVP Scope

Recommended first version:

- One audio track per chapter.
- One transcript per chapter.
- 6-10 scene markers per chapter.
- Compact player with play / pause, progress, and transcript toggle.
- Default player collapsed before interaction.
- Transcript collapsed by default.
- 3D node click starts the matching audio segment.
- 3D scene sync at marker boundaries.
- No dynamic AI-generated voice in v1.
- Audio files can be pre-produced and version-controlled or served as static assets.

Defer to later:

- Variable playback speed.
- Multiple narrator voices.
- Dynamic voice generation.
- Personalized briefing paths.
- Deep analytics by transcript sentence.
- Offline audio downloads.

### 7.10 Success Criteria

The audio layer succeeds if:

- A first-time user can understand the chapter by pressing play.
- A first-time user is not distracted from the 3D model by an expanded player or transcript.
- A user can click a 3D node and hear the relevant explanation immediately.
- The 3D scene changes at meaningful narration moments.
- A technical reader can pause and inspect the underlying model.
- Transcript text improves SEO/GEO without harming the immersive layout.
- The player feels like a curated briefing, not a generic media widget.

## 8. Design Mockup Reference

Generated mockup path:

`/Users/daniel/.codex/generated_images/019ecf77-95d6-79b0-a6fd-281d126bf6b4/0.png`

Mockup intent:

- Show Chapter 1 as immersive 3D infrastructure model.
- Show Chapter 2 as a split workload flow simulator.
- Show Chapter 3 as a node-based distributed workflow system.
- Maintain current dark, dense, professional visual language.

## 9. Recommended Content Production Sequence

1. Confirm chapter titles and thesis lines.
2. Approve or revise the recommended Chapter 2 default mode: Compare Both.
3. Confirm CPU / Orchestration Layer position in Chapter 3.
4. Confirm whether Interactive Audio Briefing is part of v1 or v2.
5. Define 3D node-to-audio segment mapping.
6. Draft full Chinese chapter copy.
7. Draft English chapter copy.
8. Draft audio narration script and scene markers.
9. Translate or localize Chapter 2 to Korean and Japanese after Chinese and English are approved.
10. Convert approved content into implementation requirements.

## 10. Chapter 2 MVP Content Package

This section turns Chapter 2 into an implementation-ready content package. It does not require immediate code changes.

### 10.1 Recommended Initial State

Recommended default mode:

Compare Both

Reason:

The chapter thesis depends on contrast. Starting with Compare Both lets users immediately understand that training and inference are not just two labels for GPU demand. They are different workload patterns with different infrastructure pressure points.

Initial page state:

- Central 3D workload model is dominant.
- Left chapter control rail shows Training, Inference, and Compare Both.
- Compare Both is selected by default.
- Insight panel is collapsed.
- Audio briefing is collapsed and paused.
- Transcript panel is collapsed.
- No autoplay.
- Flow animation runs quietly to show both workload patterns.

### 10.2 Interaction States

Idle / first view:

- Show split workload map.
- Left lane: Training Batch Workload.
- Right lane: Inference Serving Workload.
- Training flows use thick synchronized waves.
- Inference flows use many small request particles.
- Clickable node markers are visible but not loud.

Training selected:

- Camera orbits toward the training side.
- Dataset, preprocessing, GPU cluster, interconnect, checkpoint storage, and model artifact become active.
- Insight cards explain throughput, synchronization, checkpointing, and GPU utilization.
- Audio play button starts the Training sequence.

Inference selected:

- Camera orbits toward the inference side.
- Gateway, load balancer, model serving rack, KV cache, retrieval store, and response edge become active.
- Insight cards explain latency, concurrency, cache hits/misses, retrieval, and serving reliability.
- Audio play button starts the Inference sequence.

3D node clicked:

- The clicked node becomes the active focus.
- The related flow animation intensifies.
- The matching insight card appears.
- The matching audio segment starts from that node.
- Transcript stays collapsed unless the user opens it.

### 10.3 3D Node Matrix

Training lane nodes:

| Node | Visual model | Flow behavior | Main lesson |
| --- | --- | --- | --- |
| Dataset lake | Storage pool / data reservoir | Large batch blocks move toward preprocessing | Training begins with large-scale data movement |
| Preprocessing | Conveyor / pipeline module | Data blocks are cleaned, tokenized, and staged | Data preparation can become a throughput bottleneck |
| GPU training cluster | Dense rack-scale GPU island | All racks pulse together | Training rewards synchronized GPU utilization |
| Interconnect fabric | Switch spine and high-speed links | Broad east-west waves move between racks | Cluster performance depends on network topology and bandwidth |
| Checkpoint storage | High-speed storage vault | Periodic write bursts | Long runs need reliable recovery and fast writes |
| Model artifact | Finished model capsule | Output pulses after training cycle | Training creates capability, but not yet a user-facing service |

Inference lane nodes:

| Node | Visual model | Flow behavior | Main lesson |
| --- | --- | --- | --- |
| User/API requests | Many small request emitters | Fine particles enter the system continuously | Inference demand is many small real-time requests |
| Gateway / load balancer | Routing gate | Requests are distributed across serving racks | Routing affects latency and reliability |
| Model serving rack | Smaller active inference rack | Particles enter and exit rapidly | Serving is about concurrency and response time |
| KV cache | Memory-side cache block | Cache hits take a short green path | Cache efficiency can reduce latency and compute load |
| Retrieval / vector database | Search store / index tower | Cache misses take a longer round trip | RAG adds accuracy but also storage and network pressure |
| Response edge | Output fan-out node | Responses return to users | Inference turns model capability into product experience |

Shared overlays:

- GPU utilization.
- Network pressure.
- Storage I/O.
- Latency budget.
- Power and cooling load.
- Cache hit rate.

### 10.4 Insight Card Drafts

Compare Both cards:

1. Training Builds Capability, Inference Delivers Experience  
   Training creates the model's capability through large synchronized runs. Inference turns that capability into a live service, where the system must respond to many users at once.  
   Infrastructure implication: the value chain expands from GPU supply into serving platforms, memory, networking, storage, observability, and power efficiency.

2. Throughput And Latency Are Different Games  
   Training is judged by how efficiently clusters process large batches. Inference is judged by how consistently the system responds within a latency budget.  
   Infrastructure implication: the same AI data center may need different architecture choices for training and serving.

3. The Bottleneck Moves With The Workload  
   During training, bottlenecks often appear in GPU availability, HBM, interconnect bandwidth, checkpoint writes, and power delivery. During inference, bottlenecks can appear in routing, cache misses, retrieval, CPU orchestration, and tail latency.  
   Infrastructure implication: investors and operators should track workload mix, not only aggregate GPU demand.

Training cards:

1. Training Is A Throughput Factory  
   Training moves large batches through synchronized GPU clusters. The goal is to keep expensive accelerators busy and reduce idle time between steps.  
   Infrastructure implication: GPU supply, HBM, rack integration, power delivery, cooling, and east-west networking remain critical.

2. Synchronization Creates Network Pressure  
   Large training runs require GPUs to exchange gradients and intermediate state. This makes interconnect topology, switch capacity, NIC/DPU performance, and optics part of the compute system.  
   Infrastructure implication: training clusters should be analyzed as networked systems, not only as stacks of GPUs.

3. Checkpointing Turns Storage Into Insurance  
   Long training runs periodically write checkpoints so work can be recovered after failure. The larger the run, the more important storage throughput and reliability become.  
   Infrastructure implication: storage architecture affects both resilience and effective training time.

Inference cards:

1. Inference Is Real-Time Traffic  
   Inference serves many small requests rather than one large batch. The system has to route, schedule, cache, retrieve, and respond while users are waiting.  
   Infrastructure implication: latency, concurrency, load balancing, and software orchestration become central.

2. Cache Hits Are Infrastructure Wins  
   KV cache and memory locality can shorten the path between request and response. A cache miss may trigger longer retrieval, storage, or network paths.  
   Infrastructure implication: memory capacity, bandwidth, and cache management can directly affect serving economics.

3. Retrieval Adds Intelligence And Latency  
   Retrieval-augmented generation can improve answer quality by pulling external context. But every retrieval step adds storage access, network round trips, and latency variance.  
   Infrastructure implication: vector databases, data platforms, and observability become part of the inference value chain.

Traditional Chinese working copy direction:

- Compare Both: 訓練建立模型能力，推論把能力變成產品體驗。
- Training: 訓練像吞吐量工廠，核心是讓 GPU 叢集同步且高利用率運轉。
- Inference: 推論像即時交通系統，核心是讓大量小請求在可接受延遲內完成。

### 10.5 Audio Segment And Click Mapping

| Segment | Click target | Starts audio? | Visual sync | Insight card |
| --- | --- | --- | --- | --- |
| C2-00 Intro | Chapter title / central split model | Yes, from play button | Both lanes animate softly | Compare card 1 |
| C2-01 Dataset flow | Dataset lake | Yes | Training batch blocks enter preprocessing | Training card 1 |
| C2-02 GPU synchronization | GPU training cluster | Yes | GPU racks pulse together | Training card 1 |
| C2-03 Interconnect pressure | Interconnect fabric | Yes | East-west waves intensify | Training card 2 |
| C2-04 Checkpoint writes | Checkpoint storage | Yes | Periodic storage write bursts | Training card 3 |
| C2-05 Request serving | User/API requests or gateway | Yes | Small particles enter gateway | Inference card 1 |
| C2-06 Cache hit / miss | KV cache | Yes | Green short path for hit, cyan long path for miss | Inference card 2 |
| C2-07 Retrieval round trip | Retrieval / vector database | Yes | Request leaves model rack and returns | Inference card 3 |
| C2-08 Latency budget | Latency overlay | Yes | Timing meter accumulates across hops | Compare card 2 |
| C2-09 Conclusion | Model artifact / response edge | Yes | Both lanes resolve into capability vs experience | Compare card 3 |

Playback rules:

- Pressing the compact play button starts C2-00.
- Clicking any mapped 3D node starts the matching segment.
- During playback, clicking another mapped node jumps to that segment.
- Pausing freezes the current 3D highlight and flow intensity.
- Transcript does not open automatically.

### 10.6 SEO And Reading Layer

Chapter 2 should include real HTML text for:

- Opening copy.
- Insight cards.
- Transcript.
- Node labels.
- Compare metrics.

The text can be visually collapsed until interaction, but should remain semantically available for SEO/GEO and accessibility. The canvas should explain visually; HTML should carry the argument in readable form.

### 10.7 Chapter 2 Multilingual Requirements

Chapter 2 should support the same four-language model as Chapter 1:

- English
- Traditional Chinese
- Korean
- Japanese

The language selector should apply to the full Chapter 2 experience, not only the headline.

Required localized content:

- Chapter headline and subtitle.
- Opening copy.
- Mode labels: Training, Inference, Compare Both.
- 3D node labels.
- Overlay labels and metrics.
- Insight card titles and body text.
- Infrastructure implication labels.
- Audio briefing segment titles.
- Transcript text.
- Compact player labels.
- Accessibility labels for controls and 3D click targets.
- SEO/GEO text blocks where the language version is available.

Recommended content workflow:

1. Finalize English and Traditional Chinese first.
2. Localize Korean and Japanese from the approved meaning, not by literal word-for-word translation.
3. Preserve technical terms where they are clearer in English, such as GPU, inference, training, KV cache, RAG, latency, and throughput.
4. Keep terminology consistent with Chapter 1 translations.
5. Use language-specific line length checks because Korean and Japanese UI labels may fit differently than English and Chinese.

Fallback rule:

If Korean or Japanese long-form copy is not final in the first implementation, the UI should still expose the language option only when the Chapter 2 headline, labels, insight cards, and transcript have been localized. Avoid mixing English long-form sections into a Korean or Japanese reading mode unless explicitly marked as pending.

### 10.8 Chapter 2 Acceptance Criteria

The Chapter 2 design is ready for implementation when:

- A first-time user can understand the difference between training and inference within 10 seconds of the initial view.
- The 3D model remains the primary visual focus before interaction.
- Insight and transcript are available for readers but do not crowd the initial scene.
- Every clickable 3D node has a defined audio segment or intentionally has no audio behavior.
- Training and inference use visually distinct flow languages.
- The content explains investment and infrastructure implications without sounding like a stock recommendation.
- English, Traditional Chinese, Korean, and Japanese requirements are accounted for in the content model before implementation begins.

### 10.9 Current Implementation Update: 2026-06-17

Chapter 2 has moved from design concept into a working implementation. The current page state should be treated as the baseline for future frontend design and technical development.

Current implemented title:

From Training Factories to Inference Networks

Current implemented subtitle:

Use an interactive 3D workload model to compare compute-driven AI training with memory- and efficiency-driven inference: training builds models, while inference serves users.

Core editorial direction:

- Training AI is compute- and throughput-oriented. It belongs to the model-building stage.
- Inference AI is memory-, latency-, and efficiency-oriented. It belongs to the user-serving stage.
- The chapter should not frame the shift as only "more GPUs." It should show that workload mix changes hardware selection, memory pressure, networking, storage, orchestration, power, and cooling.

Current mode model:

| Mode id | UI label | Current visual behavior | Current insight heading |
| --- | --- | --- | --- |
| `compare` | Compare Both | Shows both Training AI and Inference AI lanes, with clear lane labels and larger spacing between the two systems | Compare Both Insight |
| `training` | Training AI | Shows only the Training AI 3D flow and hides the Inference AI flow | Training AI Insight |
| `inference` | Inference AI | Shows only the Inference AI 3D flow and hides the Training AI flow | Inference AI Insight |

Current 3D label updates:

- The old "Training Batch" label has been replaced by "Training AI."
- The old "Inference Serving" label has been replaced by "Inference AI."
- The inference request node now uses "User requests" rather than "User/API requests."
- The inference request visual uses a notebook-related icon only.
- The old "KV cache" label has been replaced by "High Bandwidth Memory."
- High Bandwidth Memory should remain visually emphasized through larger and more numerous memory elements.
- The training data source visual should communicate a large dataset or data lake, not a generic small file icon.

Current mode copy:

Compare Both:

- Signal: The real dividing line in AI hardware choices: training and inference may both look like running AI, but they demand entirely different hardware worlds.
- Lede: Training behaves like a throughput factory. Inference behaves like real-time traffic. The comparison helps users see why AI infrastructure expands beyond aggregate GPU demand.

Training AI:

- Signal: Training rewards high GPU utilization, east-west bandwidth, checkpoint throughput, and power density.
- Lede: Training moves large batches through synchronized GPU clusters. The core objective is to keep accelerators busy and reduce idle time between coordinated steps.

Inference AI:

- Signal: Inference rewards routing, concurrency, high-bandwidth memory, retrieval speed, and predictable response time.
- Lede: Inference serves many small requests while users are waiting. Every hop through gateway, model server, high-bandwidth memory, retrieval, and response edge can become visible latency.

Current node matrix:

Training lane nodes:

| Node id | Current English label | Main lesson |
| --- | --- | --- |
| `dataset` | Dataset lake | Large training data blocks enter the pipeline |
| `preprocess` | Preprocessing | Data is cleaned, tokenized, and staged before training |
| `trainGpu` | GPU training cluster | Racks pulse together to show synchronized utilization |
| `interconnect` | Interconnect fabric | East-west waves show the network as part of compute |
| `checkpoint` | Checkpoint storage | Periodic write bursts protect long training runs |
| `artifact` | Model artifact | Training creates capability, not a product experience yet |

Inference lane nodes:

| Node id | Current English label | Main lesson |
| --- | --- | --- |
| `requests` | User requests | Notebook-style request visual represents live inference demand |
| `gateway` | Gateway / load balancer | Routing choices affect reliability and latency |
| `serving` | Model serving rack | Inference is about concurrency and response time |
| `cache` | High Bandwidth Memory | Memory bandwidth and locality shorten the inference path |
| `retrieval` | Retrieval / vector database | RAG adds context plus storage and network pressure |
| `response` | Response edge | Inference turns model capability into user experience |

Current multilingual scope:

- Chapter 2 supports English, Traditional Chinese, Korean, and Japanese.
- The language menu applies to title, subtitle, mode labels, 3D lane labels, node labels, insight copy, compact audio player labels, transcript labels, and audio briefing scripts.
- Korean and Japanese are no longer placeholder states for Chapter 2.

Current audio briefing scope:

- Audio briefing is present as a compact player.
- No autoplay.
- Transcript panel remains collapsed until the user opens it.
- The player transcript switches to the selected Chapter 2 mode or clicked 3D segment.
- Current spoken scripts are condensed for future ElevenLabs generation.
- Source file: `docs/chapter2-audio-transcripts.md`.
- Runtime content source: `chapter2Content.<language>.audioBriefings` in `app.js`.

Current Chapter 2 Japanese ElevenLabs audio export:

- Voice ID: `T7yYq3WpB94yAuOXraRi`
- Model: `eleven_multilingual_v2`
- Output format: `mp3_44100_128`
- Runtime cache version: `t7-20260617`
- Generation script: `scripts/generate-chapter2-3-japanese-tts.mjs`
- `ja-compare`: `audio/chapter2/ja-compare.mp3?v=t7-20260617`
- `ja-training`: `audio/chapter2/ja-training.mp3?v=t7-20260617`
- `ja-inference`: `audio/chapter2/ja-inference.mp3?v=t7-20260617`

Current condensed audio scripts:

English:

- Compare Both: Training AI and inference AI both run models, but they stress infrastructure in very different ways. Training is about throughput: using large GPU clusters to build model capability. Inference is about latency and efficiency: serving users quickly while they wait. That is why AI infrastructure is no longer just a GPU story. It is a system-wide rebuild across compute, memory, networking, and orchestration.
- Training AI: Training AI works like a throughput factory. Massive datasets move through synchronized GPU clusters, and the goal is to keep expensive accelerators highly utilized. The bottleneck is not only GPUs. It also includes HBM, interconnect, checkpoint storage, power, and cooling.
- Inference AI: Inference AI works more like real-time traffic. It handles many user requests, and every routing decision, memory access, retrieval step, and model response can affect latency. The key challenge is balancing quality, cost, and response speed.

Traditional Chinese:

- 兩者比較: 訓練 AI 和推論 AI 都在跑模型，但壓力完全不同。訓練重視吞吐量，目標是用大量 GPU 建立模型能力；推論重視延遲與效率，目標是在使用者等待時快速回應。這就是為什麼 AI 基礎設施不只是 GPU 需求增加，而是算力、記憶體、網路與系統編排一起重組。
- 訓練 AI: 訓練 AI 像一座吞吐量工廠。大量資料被送進同步化 GPU 叢集，核心目標是讓昂貴的加速器保持高利用率。瓶頸不只在 GPU，還包括 HBM、互連網路、儲存 checkpoint、電力與冷卻。
- 推論 AI: 推論 AI 像即時交通系統。它要處理大量使用者請求，每一次路由、記憶體存取、檢索與模型回應，都會影響延遲。推論的競爭重點，是在品質、成本與回應速度之間取得平衡。

Korean:

- 둘 다 비교: 훈련 AI와 추론 AI는 모두 모델을 실행하지만, 인프라에 주는 압력은 매우 다릅니다. 훈련은 처리량이 핵심이며, 대규모 GPU 클러스터로 모델 능력을 만듭니다. 추론은 지연시간과 효율이 핵심이며, 사용자가 기다리는 동안 빠르게 응답해야 합니다. 그래서 AI 인프라는 단순한 GPU 수요가 아니라 컴퓨팅, 메모리, 네트워크, 오케스트레이션의 재구성입니다.
- 훈련 AI: 훈련 AI는 처리량 공장과 같습니다. 대규모 데이터가 동기화된 GPU 클러스터를 지나가고, 목표는 비싼 가속기를 최대한 바쁘게 유지하는 것입니다. 병목은 GPU만이 아닙니다. HBM, 인터커넥트, 체크포인트 저장소, 전력, 냉각도 함께 중요합니다.
- 추론 AI: 추론 AI는 실시간 교통 시스템에 가깝습니다. 많은 사용자 요청을 처리해야 하며, 라우팅, 메모리 접근, 검색, 모델 응답의 모든 단계가 지연시간에 영향을 줍니다. 핵심은 품질, 비용, 응답 속도 사이의 균형입니다.

Japanese:

- 両方を比較: 学習 AI と推論 AI はどちらもモデルを動かしますが、インフラへの負荷は大きく異なります。学習はスループットが重要で、大規模な GPU クラスターでモデル能力を作ります。推論は遅延と効率が重要で、ユーザーが待っている間に素早く応答する必要があります。つまり AI インフラは、GPU だけでなく、計算、メモリ、ネットワーク、オーケストレーション全体の再構成です。
- 学習 AI: 学習 AI はスループット工場のようなものです。大量のデータが同期された GPU クラスターを通り、高価なアクセラレーターを高い利用率で動かすことが目標です。ボトルネックは GPU だけではありません。HBM、相互接続、チェックポイント保存、電力、冷却も重要です。
- 推論 AI: 推論 AI はリアルタイム交通システムに近いものです。大量のユーザー要求を処理し、ルーティング、メモリアクセス、検索、モデル応答の各ステップが遅延に影響します。重要なのは、品質、コスト、応答速度のバランスです。

Implementation notes for future expansion:

- Preserve the Chapter 1 progressive reveal pattern: 3D first, insight and transcript second.
- Keep reset as a low-priority text link near the 3D control area rather than a visually dominant button.
- If adding real ElevenLabs audio files later, use the current transcript text as the source of truth and map audio URLs by language and mode id.

## 11. Chapter 3 Current Implementation Update: 2026-06-17

Chapter 3 has moved from a conceptual distributed-workflow diagram into a working 3D agent workstation scene. The current implementation prioritizes reader comprehension over a technical node-first architecture diagram.

Current implemented title:

From Response to Action: How Agentic AI Turns Models Into Workflows

Current implemented subtitle:

Explore how agentic AI receives data, reasons, plans, acts, and depends on orchestration infrastructure beneath the model.

Core editorial direction:

- Agentic AI changes the unit of work from one model response to a multi-step workflow.
- The reader should first understand the human concept: an AI agent can plan, call tools, remember context, coordinate with sub-agents, and keep working until a task is complete.
- The infrastructure thesis comes second: those behaviors depend on CPU orchestration, GPU inference, retrieval, memory, network hops, storage, observability, security, and latency budgets.

Current visual model:

- A friendly humanoid/cute AI robot is the main visual anchor.
- The robot has body and hands, no glasses, and a simple friendly face.
- A laptop and command window now represent execution infrastructure.
- The earlier bottom hardware Infrastructure Base is no longer the dominant visual metaphor in the current page.
- Workflow and Task Running cards sit to the right of the robot.
- Three small sub-agent pods sit behind the Task Running card to show independent division of work.
- Four capability labels sit below the laptop: Autonomous Planning, Tool Use, Memory Management, Continuous Execution.

Current mode model:

| Mode id | UI label | Current concept | Current insight heading |
| --- | --- | --- | --- |
| `overview` | Agent Overview | Inputs become actions through an agent workflow | Agentic AI Insight |
| `core` | Agent Core | Perceive, reason, plan, act | Agent Core Insight |
| `infrastructure` | Infrastructure View | Laptop, command runtime, and coordination infrastructure | Infrastructure View Insight |

Current insight content:

Agent Overview:

- Signal: Agentic AI moves from answering prompts toward coordinating data, tools, and business actions.
- Lede: The agent receives enterprise data, documents, APIs, and user interactions, then turns them into workflow automation, decisions, actions, and collaboration.
- Key finding: Agentic AI changes the unit of work from one model response to a multi-step workflow. Infrastructure analysis expands from model speed to coordination reliability.

Agent Core:

- Signal: The agent core translates raw context into structured steps before it calls models, tools, memory, or external systems.
- Lede: Perceive gathers signals. Reason interprets context. Plan orders the work. Act invokes tools and sends the result back into the business process.
- Key finding: Agent behavior is not a single inference call. Planning, tool choice, permission checks, and verification determine whether the system can act safely.

Infrastructure View:

- Signal: Behind the friendly agent is a control layer that routes model calls, retrieval, tools, memory, and verification under a latency budget.
- Lede: CPU orchestration acts as the control plane. GPUs generate tokens. Memory and retrieval provide context. Network and observability decide whether the workflow remains reliable.
- Key finding: As agent workflows add retrieval, tool calls, memory writes, and verification loops, bottlenecks move into CPU orchestration, network hops, storage, memory, and tail latency.

Current value-chain role examples:

- Model and agent platforms: Microsoft (MSFT), Alphabet / Google (GOOGL), Amazon (AMZN), Meta (META), OpenAI (private), Anthropic (private), Cohere (private).
- Enterprise workflow and tools: Salesforce (CRM), ServiceNow (NOW), Adobe (ADBE), Atlassian (TEAM), UiPath (PATH), GitHub via Microsoft (MSFT), GitLab (GTLB).
- Cloud and inference platforms: Microsoft Azure (MSFT), AWS (AMZN), Google Cloud (GOOGL), Oracle Cloud (ORCL), Cloudflare (NET).
- CPU and orchestration silicon: Intel (INTC), AMD (AMD), Arm (ARM), NVIDIA Grace / networking stack (NVDA), Broadcom (AVGO), Marvell (MRVL).
- GPU inference and accelerators: NVIDIA (NVDA), AMD (AMD), Broadcom (AVGO), Alphabet TPU (GOOGL), Amazon Trainium / Inferentia (AMZN).
- Data, retrieval, and memory: Snowflake (SNOW), MongoDB (MDB), Elastic (ESTC), Databricks (private), Pinecone (private), Micron (MU), SK hynix (000660.KS), Samsung Electronics (005930.KS).
- Observability, security, and governance: Datadog (DDOG), Dynatrace (DT), Cloudflare (NET), Palo Alto Networks (PANW), CrowdStrike (CRWD), Zscaler (ZS), Okta (OKTA).

Current 3D node labels:

| Node id | English | Traditional Chinese | Korean | Japanese |
| --- | --- | --- | --- | --- |
| `robot` | AI Agent | AI Agent | AI 에이전트 | AI エージェント |
| `laptop` | Laptop | 筆記型電腦 | 노트북 | ノートPC |
| `terminal` | Command Window | 指令視窗 | 명령 창 | コマンド画面 |
| `workflow` | Workflow | 工作流 | 워크플로 | ワークフロー |
| `running` | Task Running | 任務執行中 | 작업 실행 중 | タスク実行中 |
| `autoplan` | Autonomous Planning | 自主規劃 | 자율 계획 | 自律計画 |
| `tooluse` | Tool Use | 工具調用 | 도구 호출 | ツール呼び出し |
| `memory` | Memory Management | 記憶管理 | 메모리 관리 | メモリ管理 |
| `continuous` | Continuous Execution | 持續執行 | 지속 실행 | 継続実行 |

Current Korean and Japanese mode-level localization:

Korean UI headings:

- Mode list: 에이전트 모드
- Insight title: Agentic AI 인사이트
- Value-chain roles: 가치사슬 역할
- Key finding: 핵심 시사점

Korean mode cards:

- 에이전트 개요 / 입력에서 행동으로
  - Signal: Agentic AI는 프롬프트에 답하는 단계를 넘어 데이터, 도구, 비즈니스 행동을 조정하는 단계로 이동합니다.
  - Lede: 에이전트는 기업 데이터, 문서, API, 사용자 상호작용을 받아 워크플로 자동화, 의사결정, 실행, 협업으로 전환합니다.
  - Metrics: 4개 입력 / 데이터, 문서, API, 사용자; 4개 핵심 단계 / 감지, 추론, 계획, 실행; 4개 출력 / 워크플로, 결정, 행동, 커뮤니케이션; 멀티 에이전트 / 위임과 조정.
  - Value-chain roles: 모델 및 에이전트 플랫폼: Microsoft (MSFT), Alphabet / Google (GOOGL), Amazon (AMZN), Meta (META), OpenAI (private), Anthropic (private). 기업 워크플로와 도구: Salesforce (CRM), ServiceNow (NOW), Adobe (ADBE), Atlassian (TEAM), UiPath (PATH), Microsoft 산하 GitHub (MSFT). 클라우드 및 추론 플랫폼: Microsoft Azure (MSFT), AWS (AMZN), Google Cloud (GOOGL), Oracle Cloud (ORCL), Cloudflare (NET).
  - Key finding: Agentic AI는 작업 단위를 한 번의 모델 응답에서 여러 단계의 워크플로로 바꿉니다. 인프라 분석도 모델 속도에서 조정 신뢰성으로 확장됩니다.
- 에이전트 코어 / 감지, 추론, 계획, 실행
  - Signal: 에이전트 코어는 모델, 도구, 메모리, 외부 시스템을 호출하기 전에 외부 맥락을 실행 가능한 단계로 바꿉니다.
  - Lede: 감지는 신호를 수집하고, 추론은 맥락을 해석하며, 계획은 작업 순서를 정하고, 실행은 도구를 호출해 결과를 비즈니스 프로세스로 되돌립니다.
  - Metrics: 감지 / 입력이 맥락이 됨; 추론 / 모델이 의도를 해석; 계획 / 작업이 순서로 정리됨; 실행 / 도구가 업무를 수행.
  - Value-chain roles: 프런티어 모델 계층: OpenAI (private), Anthropic (private), Cohere (private), Meta (META), Alphabet (GOOGL), Amazon (AMZN). 개발 및 에이전트 도구: Microsoft / GitHub (MSFT), Atlassian (TEAM), GitLab (GTLB), ServiceNow (NOW), Salesforce (CRM). 보안 및 거버넌스: Palo Alto Networks (PANW), CrowdStrike (CRWD), Zscaler (ZS), Okta (OKTA), Cloudflare (NET).
  - Key finding: 에이전트 행동은 단일 추론 호출이 아닙니다. 계획, 도구 선택, 권한 확인, 검증이 시스템이 안전하게 행동할 수 있는지를 결정합니다.
- 인프라 관점 / 노트북과 명령 실행 환경
  - Signal: 친숙한 에이전트 뒤에는 모델 호출, 검색, 도구, 메모리, 검증을 지연시간 예산 안에서 라우팅하는 제어 계층이 있습니다.
  - Lede: CPU 오케스트레이션은 제어 평면 역할을 하고, GPU는 토큰을 생성하며, 메모리와 검색은 맥락을 제공합니다. 네트워크와 관측 가능성은 워크플로가 안정적으로 유지되는지를 좌우합니다.
  - Metrics: CPU / 오케스트레이션 제어 평면; GPU / 추론과 임베딩; 메모리 / 검색과 상태; 지연시간 / 워크플로 예산.
  - Value-chain roles: CPU 및 오케스트레이션 실리콘: Intel (INTC), AMD (AMD), Arm (ARM), NVIDIA Grace / networking stack (NVDA), Broadcom (AVGO), Marvell (MRVL). GPU 추론 및 가속기: NVIDIA (NVDA), AMD (AMD), Broadcom (AVGO), Alphabet TPU (GOOGL), Amazon Trainium / Inferentia (AMZN). 데이터, 검색, 메모리: Snowflake (SNOW), MongoDB (MDB), Elastic (ESTC), Databricks (private), Pinecone (private), Micron (MU), SK hynix (000660.KS), Samsung Electronics (005930.KS). 관측 가능성 및 보안: Datadog (DDOG), Dynatrace (DT), Cloudflare (NET), Palo Alto Networks (PANW), CrowdStrike (CRWD), Okta (OKTA).
  - Key finding: 에이전트 워크플로에 검색, 도구 호출, 메모리 쓰기, 검증 루프가 늘어날수록 병목은 CPU 조정, 네트워크 홉, 저장장치, 메모리, 꼬리 지연시간으로 이동합니다.

Japanese UI headings:

- Mode list: エージェント・モード
- Insight title: Agentic AI インサイト
- Value-chain roles: バリューチェーンの役割
- Key finding: 重要な示唆

Japanese mode cards:

- エージェント概要 / 入力から行動へ
  - Signal: Agentic AI は、プロンプトに答える段階から、データ、ツール、ビジネス上の行動を調整する段階へ進みます。
  - Lede: エージェントは企業データ、文書、API、ユーザーとのやり取りを受け取り、ワークフロー自動化、意思決定、実行、協働へ変換します。
  - Metrics: 4つの入力 / データ、文書、API、ユーザー; 4つの中核ステップ / 受け取り、理解し、計画し、実行; 4つの出力 / ワークフロー、判断、行動、コミュニケーション; マルチエージェント / 委任と協調.
  - Value-chain roles: モデルとエージェント基盤：Microsoft (MSFT)、Alphabet / Google (GOOGL)、Amazon (AMZN)、Meta (META)、OpenAI (private)、Anthropic (private). 企業ワークフローとツール：Salesforce (CRM)、ServiceNow (NOW)、Adobe (ADBE)、Atlassian (TEAM)、UiPath (PATH)、Microsoft 傘下の GitHub (MSFT). クラウドと推論基盤：Microsoft Azure (MSFT)、AWS (AMZN)、Google Cloud (GOOGL)、Oracle Cloud (ORCL)、Cloudflare (NET).
  - Key finding: Agentic AI は、作業単位を一度のモデル応答から多段階のワークフローへ変えます。インフラ分析も、モデル速度だけでなく、協調の信頼性へ広がります。
- エージェント中核 / 受け取り、理解し、計画し、実行
  - Signal: エージェント中核は、モデル、ツール、メモリ、外部システムを呼び出す前に、外部の文脈を実行可能な手順へ変換します。
  - Lede: 受け取りは信号を集め、理解は文脈を解釈し、計画は作業順序を組み立て、実行はツールを呼び出して結果を業務プロセスへ戻します。
  - Metrics: 受け取り / 入力が文脈になる; 理解 / モデルが意図を解釈; 計画 / タスクが順序になる; 実行 / ツールが作業を実行.
  - Value-chain roles: フロンティアモデル層：OpenAI (private)、Anthropic (private)、Cohere (private)、Meta (META)、Alphabet (GOOGL)、Amazon (AMZN). 開発者向け・エージェントツール：Microsoft / GitHub (MSFT)、Atlassian (TEAM)、GitLab (GTLB)、ServiceNow (NOW)、Salesforce (CRM). セキュリティとガバナンス：Palo Alto Networks (PANW)、CrowdStrike (CRWD)、Zscaler (ZS)、Okta (OKTA)、Cloudflare (NET).
  - Key finding: エージェントの行動は、単発の推論呼び出しではありません。計画、ツール選択、権限確認、検証が、システムが安全に行動できるかを決めます。
- インフラ視点 / ノートPCとコマンド実行環境
  - Signal: 親しみやすいエージェントの背後には、モデル呼び出し、検索、ツール、メモリ、検証を遅延予算内でルーティングする制御層があります。
  - Lede: CPU オーケストレーションは制御プレーンとして働き、GPU はトークンを生成し、メモリと検索は文脈を提供します。ネットワークと可観測性は、ワークフローが安定して続くかを左右します。
  - Metrics: CPU / オーケストレーションの制御プレーン; GPU / 推論と埋め込み; メモリ / 検索と状態; 遅延 / ワークフロー予算.
  - Value-chain roles: CPU とオーケストレーション用シリコン：Intel (INTC)、AMD (AMD)、Arm (ARM)、NVIDIA Grace / networking stack (NVDA)、Broadcom (AVGO)、Marvell (MRVL). GPU 推論とアクセラレータ：NVIDIA (NVDA)、AMD (AMD)、Broadcom (AVGO)、Alphabet TPU (GOOGL)、Amazon Trainium / Inferentia (AMZN). データ、検索、メモリ：Snowflake (SNOW)、MongoDB (MDB)、Elastic (ESTC)、Databricks (private)、Pinecone (private)、Micron (MU)、SK hynix (000660.KS)、Samsung Electronics (005930.KS). 可観測性とセキュリティ：Datadog (DDOG)、Dynatrace (DT)、Cloudflare (NET)、Palo Alto Networks (PANW)、CrowdStrike (CRWD)、Okta (OKTA).
  - Key finding: エージェントのワークフローに検索、ツール呼び出し、メモリ書き込み、検証ループが増えるほど、ボトルネックは CPU 協調、ネットワークホップ、ストレージ、メモリ、テールレイテンシへ移ります。

Current audio briefing scope:

- Audio briefing is compact and does not autoplay.
- Transcript remains collapsed unless the user opens it.
- Current transcript source file: `docs/chapter3-audio-transcripts.md`.
- The transcript file includes Chinese, English, Korean, and Japanese scripts for Agent Overview, Agent Core, and Infrastructure View.
- Future ElevenLabs exports should use this transcript file as the source of truth.

Current Chapter 3 Korean ElevenLabs audio export:

- Voice ID: `uyVNoMrnUku1dZyVEXwD`
- Model: `eleven_multilingual_v2`
- Output format: `mp3_44100_128`
- Runtime cache version: `uy-20260617-r2`
- Generation script: `scripts/generate-chapter3-korean-tts.mjs`
- `ko-overview`: `audio/chapter3/ko-overview.mp3?v=uy-20260617-r2`
- `ko-core`: `audio/chapter3/ko-core.mp3?v=uy-20260617-r2`
- `ko-infrastructure`: `audio/chapter3/ko-infrastructure.mp3?v=uy-20260617-r2`

Current Chapter 3 Japanese ElevenLabs audio export:

- Voice ID: `T7yYq3WpB94yAuOXraRi`
- Model: `eleven_multilingual_v2`
- Output format: `mp3_44100_128`
- Runtime cache version: `t7-20260617`
- Generation script: `scripts/generate-chapter2-3-japanese-tts.mjs`
- `ja-overview`: `audio/chapter3/ja-overview.mp3?v=t7-20260617`
- `ja-core`: `audio/chapter3/ja-core.mp3?v=t7-20260617`
- `ja-infrastructure`: `audio/chapter3/ja-infrastructure.mp3?v=t7-20260617`

Current condensed audio scripts:

English:

- Agent Overview: Agentic AI is not just about answering prompts. It turns data, documents, APIs, and user requests into workflows that can act. The value chain expands from model platforms to enterprise tools, cloud services, and inference infrastructure.
- Agent Core: The agent core turns context into action. It perceives inputs, reasons about intent, plans the task, and calls tools to execute. The key question is not only whether the model is smart, but whether each step can be authorized, tracked, verified, and completed safely.
- Infrastructure View: Behind the agent is a coordination layer. CPUs manage the control flow, GPUs run inference, memory and retrieval provide context, and networks keep the workflow reliable. As agents perform more steps, bottlenecks expand beyond GPUs into CPU orchestration, memory, storage, networking, and latency.

Traditional Chinese:

- Agent 總覽: Agentic AI 不只是回答問題，而是開始把資料、文件、API 和使用者指令，串成可以執行的工作流。它把模型能力變成自動化、決策、行動與協作。價值鏈角色也因此擴大，從模型平台、企業工具，到雲端與推論平台都會參與其中。
- Agent Core: Agent Core 是代理式 AI 的核心。它先感知外部資訊，再推理使用者意圖，接著規劃任務，最後呼叫工具去執行。真正的關鍵，不只是模型聰不聰明，而是每一步能不能被授權、追蹤、驗證，並安全完成。
- 基礎設施視圖: 在 Agent 背後，是一整套協調基礎設施。CPU 負責控制流程，GPU 負責模型推論，記憶體與檢索系統提供上下文，網路與可觀測性維持穩定。當 Agent 開始多步驟執行，瓶頸會從 GPU 擴展到 CPU、記憶體、儲存、網路與延遲。

Korean:

- Agent Overview: Agentic AI는 단순히 질문에 답하는 것이 아닙니다. 데이터, 문서, API, 사용자 요청을 실행 가능한 워크플로로 바꿉니다. 그래서 가치사슬은 모델 플랫폼을 넘어 기업 도구, 클라우드 서비스, 추론 인프라까지 확장됩니다.
- Agent Core: Agent Core는 맥락을 행동으로 바꾸는 중심입니다. 입력을 감지하고, 의도를 해석하고, 작업을 계획한 뒤, 도구를 호출해 실행합니다. 중요한 것은 모델의 성능뿐 아니라, 각 단계가 승인되고, 추적되고, 검증되며, 안전하게 완료될 수 있는지입니다.
- Infrastructure View: Agent 뒤에는 조정 인프라가 있습니다. CPU는 흐름을 제어하고, GPU는 추론을 수행하며, 메모리와 검색 시스템은 맥락을 제공합니다. Agent가 여러 단계를 수행할수록 병목은 GPU를 넘어 CPU 조정, 메모리, 저장장치, 네트워크, 지연시간으로 확장됩니다.

Japanese:

- Agent Overview: Agentic AI は、ただ質問に答えるだけではありません。データ、文書、API、ユーザーの依頼を、実行できるワークフローへ変えます。そのため価値チェーンは、モデル基盤から企業ツール、クラウド、推論インフラへ広がります。
- Agent Core: Agent Core は、文脈を行動に変える中核です。入力を受け取り、意図を理解し、作業を計画し、ツールを呼び出して実行します。重要なのはモデルの賢さだけでなく、各ステップを承認、追跡、検証し、安全に完了できるかです。
- Infrastructure View: Agent の背後には、全体を調整するインフラがあります。CPU は制御を担当し、GPU は推論を実行し、メモリと検索システムが文脈を支えます。Agent が多段階で動くほど、ボトルネックは GPU だけでなく、CPU、メモリ、ストレージ、ネットワーク、遅延へ広がります。

Localization note:

- English, Traditional Chinese, Korean, and Japanese include full Chapter 3 mode-level insight content, value-chain role headings, company examples, 3D node labels, player labels, and complete audio transcripts.
- Korean and Japanese mode-level localization was completed on 2026-06-17 and should stay synchronized with `app.js`.
- Chapter 3 Korean audio was regenerated on 2026-06-17 with `uyVNoMrnUku1dZyVEXwD`; runtime uses cache version `uy-20260617-r2`.
- Chapter 2 and Chapter 3 Japanese audio was generated on 2026-06-17 with `T7yYq3WpB94yAuOXraRi`; runtime uses cache version `t7-20260617`.

## 12. Open Decisions

Need user confirmation before implementation:

- Should Chapter 2 be a full-screen simulator or a below-the-fold editorial module?
- Should Chapter 3 be a linear workflow or a branching workflow?
- Should CPU be shown as one node or as a repeated orchestration layer around every step?
- Should Chapter 2/3 reuse the same left navigation panel or introduce chapter-specific controls?
- Should the SEO/GEO text layer be integrated into these chapters from the start? Current recommendation: yes, through real HTML insight and transcript text.
- Should Interactive Audio Briefing launch in the first implementation of Chapter 2/3 or be added after the visual chapters are stable?
- Should the audio player use a single narrator voice or separate voices per chapter/language?
- Should Chapter 2 launch with audio in all four languages, or launch with localized text first and add localized audio later?
- How many 3D nodes should have direct click-to-audio behavior in the first version? Current Chapter 2 recommendation: 10 mapped segments.

## 12. Non-Goals For Current Step

This document does not implement the chapters.

This document does not rewrite the existing Chapter 1 page.

This document does not finalize all multilingual copy.

This document does not specify exact code architecture yet.

This document does not generate or attach final audio files.

The next step should be content approval and then a technical implementation plan.
