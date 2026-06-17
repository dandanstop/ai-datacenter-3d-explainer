# Chapter 3 Agentic AI 3D Design

Status: current implementation baseline with historical design notes  
Date: 2026-06-17  
Project: AI Data Center Value Chain 3D Explainer  
Reference direction: user-provided agent orchestration diagram, adapted into the project's dark 3D exploded-model language

## 1. Design Goal

Chapter 3 should explain Agentic AI without starting from a technical systems diagram.

The prior direction, "User request -> Planner -> CPU / Orchestration -> Model calls -> Retrieval -> Tools -> Memory -> Verification -> Response," is accurate but too engineering-oriented as the first visual impression.

The revised direction is a 3D exploded model centered on an understandable AI Agent body. The model should help users first understand what an agent does, then reveal the infrastructure required to make it work.

Core communication:

Agentic AI is not only a model that responds. It is an AI system that perceives inputs, reasons over context, plans steps, acts through tools, coordinates with other agents, and depends on infrastructure underneath.

## 2. Recommended Chapter Title

English:

From Response to Action: How Agentic AI Turns Models Into Workflows

Traditional Chinese:

從回應到行動：Agentic AI 如何把模型變成工作流

Why this title:

- It is easier to understand than "distributed workflows" as the first reader-facing headline.
- It keeps the infrastructure thesis alive without making the page feel like a backend architecture document.
- It connects Chapter 2 to Chapter 3: inference turns models into services; Agentic AI turns services into workflows and actions.

## 3. Content Summary

Agentic AI does not simply call a model once. It receives enterprise data, documents, APIs, and user interactions. It then perceives the situation, reasons over context, plans the next steps, invokes tools, reads or writes memory, checks results, and finally returns an answer or executes an action.

The GPU still matters for model inference. But the agent's workflow creates a larger coordination layer around the model. CPU orchestration, retrieval, memory, network latency, tool execution, verification, observability, and security become central infrastructure concerns.

The reader-facing takeaway:

AI infrastructure is moving from "how fast can the model answer?" toward "how reliably can the system coordinate many steps, systems, and checks before acting?"

## 4. Main 3D Visual Structure

Use a 3D exploded model instead of a flat technical flow chart.

The scene should have five readable zones:

1. Left: Inputs / External World
2. Center: AI Agent Body
3. Center exploded layer: Agent Core
4. Top: Multi-Agent Orchestration
5. Bottom: Infrastructure Base
6. Right: Outputs / Business Actions

Recommended spatial layout:

```text
                 Multi-Agent Orchestration
                         small agents

Inputs             AI Agent Body + Agent Core            Outputs
Enterprise Data    Perceive / Reason / Plan / Act        Automate Workflows
Documents          semi-transparent exploded robot       Make Decisions
APIs & Systems                                          Execute Actions
Users                                                   Collaborate

                 Infrastructure Base
      CPU Orchestration | GPU Inference | Memory/Retrieval | Network/Latency
```

The user's first impression should be: "This is an AI agent that receives information, thinks, coordinates, and acts."

The technical interpretation should come second: "This behavior depends on CPU orchestration, GPU inference, retrieval, memory, network, latency, and governance."

## 5. 3D Model Realism Requirement

All primary 3D components should target roughly 80% real-object similarity while remaining lightweight enough for the existing web scene.

Avoid abstract cubes when a recognizable object can communicate the idea.

Use simplified but realistic 3D forms:

- Rounded physical surfaces.
- Layered parts.
- Visible ports, panels, seams, screens, vents, document sheets, database cylinders, cables, racks, and chips.
- Materials that resemble metal, matte plastic, glass, illuminated screens, circuit boards, and server hardware.
- No generic flat icon-only objects as the primary representation.

The visual language should still match the current site:

- Dark technical environment.
- Cyan and lime accents.
- Compact labels.
- Animated data flow.
- No marketing-style oversized illustration.
- No decorative gradient background.

## 6. AI Robot Exploded Layer

The central AI robot should be friendly and easy to understand, but not childish.

Recommended model:

- A white or light graphite robot head with a dark glass faceplate.
- Two glowing cyan eyes.
- Subtle ear-like side modules, suggesting sensors or communication ports.
- Semi-transparent outer shell around the body or head.
- Chest module with a small circuit or neural pattern.
- Internal exploded vertical stack that reveals the agent core.

Agent Core layers:

1. Perceive
   - Visual form: sensor lens, eye module, microphone/signal receiver, and small incoming data particles.
   - Meaning: receives user intent, enterprise data, documents, APIs, and environmental context.

2. Reason
   - Visual form: glowing compute core or neural processor inside the robot.
   - Meaning: model reasoning, context interpretation, and intermediate thought.

3. Plan
   - Visual form: layered checklist board, route map, or stacked task cards.
   - Meaning: breaks the user request into ordered steps.

4. Act
   - Visual form: tool connector hub, robotic hand module, or API plug panel.
   - Meaning: invokes tools, executes actions, and sends outputs.

Motion:

- The Agent Core should pulse from Perceive to Reason to Plan to Act.
- In exploded mode, the four layers separate vertically or forward in depth.
- When a user selects a layer, the other layers dim, and the selected layer glows.

## 7. Data Source Modules

The left side should show realistic 3D source modules, not generic labels.

Data sources:

1. Enterprise Data
   - 3D model: stacked database cylinders or a server-storage drawer with visible disk tiers.
   - Details: cylinder grooves, small status LEDs, cable output.

2. Documents & Knowledge
   - 3D model: stacked papers, document folder, or knowledge binder.
   - Details: page layers, document lines, tab markers.

3. APIs & Systems
   - 3D model: cloud gateway plus plug/socket or API terminal.
   - Details: connector pins, small server endpoint, animated request path.

4. Users & Interactions
   - 3D model: laptop or smartphone with chat bubbles, not a generic person icon.
   - Details: screen, keyboard, message bubbles, cursor or tap indicator.

Motion:

- Dotted or particle lines should feed from each source into the robot's Perceive layer.
- Enterprise Data and Documents should move as larger blocks.
- APIs and user interactions should move as smaller real-time particles.

## 8. Multi-Agent Orchestration

The top zone should show agent collaboration in a simple way.

Recommended model:

- Three small agent pods above the main robot.
- Each small agent pod has a miniature faceplate and small signal antenna.
- Pods are connected by dotted arcs, forming a triangular coordination pattern.
- The main robot connects upward to the group through a central control line.

Meaning:

The main agent can coordinate with specialized sub-agents or delegate subtasks.

Motion:

- When orchestration is active, small agent pods light in sequence.
- A routing pulse moves from the main robot to one pod, then returns.
- This should feel like delegation, not a network rack diagram.

## 9. Infrastructure Base

The bottom zone should preserve the technical thesis without dominating the main visual.

The base is a visible platform under the robot, like an exploded machinery deck.

Modules:

1. CPU Orchestration
   - 3D model: realistic CPU package or motherboard control module.
   - Details: chip substrate, pins/contact pads, small traces, lime glow.
   - Role: control plane for planning, routing, permissions, tool calls, memory, verification, and postprocessing.

2. GPU Inference
   - 3D model: compact GPU server tray or accelerator card.
   - Details: heatsink fins, power connector, PCIe edge, cyan glow.
   - Role: model inference, embeddings, and token generation.

3. Memory / Retrieval
   - 3D model: HBM-like memory stacks plus vector database cylinder.
   - Details: stacked chips, storage tiers, pale green highlights.
   - Role: context retrieval, memory reads and writes, vector search, and state.

4. Network / Latency
   - 3D model: small switch fabric, optical module, or cable bundle.
   - Details: Ethernet ports, fiber lines, timing meter.
   - Role: tool calls, retrieval hops, system-to-system communication, and tail latency.

Motion:

- The Infrastructure Base should light up when the Agent Core acts.
- CPU should route pulses to GPU, retrieval, tools, and memory.
- Latency can be shown as a small amber timing bar that grows during tool calls or verification loops.

Important:

CPU must be visually central in the Infrastructure Base, but not larger than the robot. It should read as "control hub under the agent," not as a separate chapter hero.

## 10. Output Modules

The right side should use outcome language, not technical backend language.

Outputs:

1. Automate Workflows
   - 3D model: gear assembly or workflow conveyor.
   - Meaning: task automation and business-process execution.

2. Make Decisions
   - 3D model: chart dashboard, decision board, or rising bar display.
   - Meaning: decision support and analysis.

3. Execute Actions
   - 3D model: command console, terminal screen, or action button panel.
   - Meaning: API calls, system changes, and operational actions.

4. Collaborate & Communicate
   - 3D model: chat window, meeting tile, or message console.
   - Meaning: communication with users, teams, and systems.

Motion:

- Output modules should receive clean arrows or particle streams from the Act layer.
- When a workflow step is selected, only the relevant output glows.

## 11. Interaction Modes

Use three modes. Keep the default simple.

### Mode 1: Agent Overview

Default mode.

Shows the full scene:

- Inputs on left.
- Robot in center.
- Multi-agent pods above.
- Infrastructure Base below.
- Outputs on right.

Goal:

Help users understand the concept without reading technical labels first.

### Mode 2: Agent Core

Focuses on the robot's four-layer core:

- Perceive
- Reason
- Plan
- Act

The robot separates into an exploded view. Selecting a layer updates the insight panel and audio transcript.

Goal:

Explain the behavior of Agentic AI in human terms.

### Mode 3: Infrastructure View

Dims the robot shell and highlights the base modules:

- CPU Orchestration
- GPU Inference
- Memory / Retrieval
- Network / Latency

Goal:

Connect the easy-to-understand agent concept back to investment and infrastructure analysis.

## 12. Insight Panel Direction

Chapter 3 should preserve the progressive reveal behavior used in Chapter 1 and Chapter 2:

- On first load, focus on the 3D model.
- Insight remains hidden until user interaction.
- Audio player remains compact.
- Transcript remains collapsed.

Recommended insight cards:

1. Agentic AI changes the unit of work
   - Agentic AI shifts the workload from one model response to a multi-step workflow.

2. CPU orchestration becomes the control plane
   - CPUs coordinate planning, routing, tools, retrieval, memory, permissions, verification, and postprocessing.

3. Retrieval and memory become infrastructure
   - Vector search, databases, storage, and HBM-like memory systems influence quality and latency.

4. Tool execution expands the value chain
   - Enterprise SaaS, automation platforms, developer tools, and API ecosystems become part of the agent workflow.

5. Verification adds reliability and latency
   - Guardrails, policy checks, observability, and retry loops improve trust but add system calls.

## 13. Value-Chain Company Examples

Use company names as illustrative ecosystem roles, not as investment recommendations.

Recommended mapping:

- Model and agent platform: Microsoft (MSFT), Alphabet / Google (GOOGL), Amazon (AMZN), Meta (META), OpenAI (private), Anthropic (private), Cohere (private).
- CPU and orchestration silicon: Intel (INTC), AMD (AMD), Arm (ARM), NVIDIA Grace / networking stack (NVDA), Broadcom (AVGO), Marvell (MRVL).
- GPU inference and accelerators: NVIDIA (NVDA), AMD (AMD), Broadcom (AVGO), Google TPU via Alphabet (GOOGL), Amazon Trainium / Inferentia via Amazon (AMZN).
- Data, retrieval, and storage: Snowflake (SNOW), MongoDB (MDB), Elastic (ESTC), Databricks (private), Pinecone (private), Weaviate (private), Micron (MU), SK hynix (000660.KS), Samsung Electronics (005930.KS).
- Workflow, tools, and enterprise action: Salesforce (CRM), ServiceNow (NOW), Adobe (ADBE), Atlassian (TEAM), UiPath (PATH), GitHub via Microsoft (MSFT), GitLab (GTLB).
- Observability, security, and governance: Datadog (DDOG), Dynatrace (DT), Cloudflare (NET), Palo Alto Networks (PANW), CrowdStrike (CRWD), Zscaler (ZS), Okta (OKTA).

## 14. Audio And Transcript Direction

Chapter 3 should follow the same audio pattern as Chapters 1 and 2.

Default:

- Audio player visible but compact.
- No autoplay.
- Transcript collapsed.
- User can press Play or click a 3D component to hear the matching segment.

Suggested audio segments:

1. Chapter overview.
2. Inputs and perception.
3. Reasoning and planning.
4. Acting through tools.
5. Multi-agent orchestration.
6. Infrastructure Base.
7. Verification and response.

## 15. Implementation Notes For Future Development

Keep Chapter 3 lightweight for the current static Three.js app:

- Use primitive geometry composed into realistic models rather than importing heavy external 3D assets.
- Reuse existing label-layer, audio, transcript, insight, and chapter-switching patterns.
- Add Chapter 3 as a separate Three.js root group.
- Keep the first implementation to three modes: Overview, Agent Core, Infrastructure View.
- Avoid adding scroll-driven storytelling until the core 3D model is stable.

## 16. Self-Review

No placeholder requirements remain.

The visual direction is no longer a technical node-first diagram. It is now an agent-centered 3D exploded model.

The design preserves the infrastructure thesis by moving CPU, GPU, memory, retrieval, network, and latency into a visible Infrastructure Base.

The requested 80% realistic 3D component direction is specified for the AI robot, data sources, agent core, multi-agent pods, infrastructure base, and output modules.

## 17. Current Implementation Update: 2026-06-17

Chapter 3 has moved from design draft into a working implementation. This section supersedes the earlier bottom "Infrastructure Base" visual direction for the current version of the page.

### 17.1 Current Chapter Title And Summary

Current implemented English title:

From Response to Action: How Agentic AI Turns Models Into Workflows

Current implemented Traditional Chinese title:

從回應到行動：Agentic AI 如何把模型變成工作流

Current implemented English subtitle:

Explore how agentic AI receives data, reasons, plans, acts, and depends on orchestration infrastructure beneath the model.

Current implemented Traditional Chinese subtitle:

透過 3D Agent 拆解圖，理解 Agentic AI 如何接收資料、推理、規劃、執行，並依賴模型下方的協調基礎設施。

Current core message:

Agentic AI is not just a model response. It turns data, documents, APIs, user requests, planning, tool calls, memory, verification, and execution into a coordinated workflow. The infrastructure question shifts from model speed to coordination reliability.

### 17.2 Current 3D Visual Structure

The current 3D model no longer uses the original flat technical workflow or the earlier bottom hardware Infrastructure Base as the primary visual.

Current visual composition:

- Main robot: friendly humanoid/cute robot with body and hands, no glasses, simplified face, and a clear workstation posture.
- Laptop: placed in front of the robot as the main execution surface.
- Command Window: placed beside the laptop to represent tool routing, model calls, memory access, and runtime status.
- Workflow card: placed on the right side and labeled above the card.
- Task Running card: placed on the right side and labeled above the card, with a check icon for progress/completion.
- Sub agents: three smaller agent pods appear behind the Task Running card to show independent division of work.
- Capability labels: four labels sit below the laptop.

The current model should communicate:

1. The agent receives work.
2. The agent plans and coordinates through a workspace.
3. The agent calls tools and manages memory.
4. Sub agents can divide the work.
5. The system keeps running until the task is complete.

### 17.3 Current 3D Labels

English labels:

- AI Agent
- Laptop
- Command Window
- Workflow
- Task Running
- Autonomous Planning
- Tool Use
- Memory Management
- Continuous Execution

Traditional Chinese labels:

- AI Agent
- 筆記型電腦
- 指令視窗
- 工作流
- 任務執行中
- 自主規劃
- 工具調用
- 記憶管理
- 持續執行

Korean labels:

- AI 에이전트
- 노트북
- 명령 창
- 워크플로
- 작업 실행 중
- 자율 계획
- 도구 호출
- 메모리 관리
- 지속 실행

Japanese labels:

- AI エージェント
- ノートPC
- コマンド画面
- ワークフロー
- タスク実行中
- 自律計画
- ツール呼び出し
- メモリ管理
- 継続実行

### 17.4 Current Interaction Modes

| Mode id | UI label | Current focus | Current insight heading |
| --- | --- | --- | --- |
| `overview` | Agent Overview | Shows the full agent workstation concept and explains inputs-to-actions | Agentic AI Insight |
| `core` | Agent Core | Focuses on perceive, reason, plan, act as the behavioral core | Agent Core Insight |
| `infrastructure` | Infrastructure View | Explains the coordination layer through laptop, command runtime, CPU/GPU/memory/network implications | Infrastructure View Insight |

Current interaction principles:

- 3D model remains the primary focus on first view.
- Insight panel follows the same progressive reveal pattern as Chapter 1 and Chapter 2.
- Audio player is compact and does not autoplay.
- Transcript remains collapsed unless the user opens it.
- Reset remains a low-priority text link, not a dominant button.

### 17.5 Current Insight Content

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

### 17.6 Current Value-Chain Role Examples

Agent Overview:

- Model and agent platforms: Microsoft (MSFT), Alphabet / Google (GOOGL), Amazon (AMZN), Meta (META), OpenAI (private), Anthropic (private).
- Enterprise workflow and tools: Salesforce (CRM), ServiceNow (NOW), Adobe (ADBE), Atlassian (TEAM), UiPath (PATH), GitHub via Microsoft (MSFT).
- Cloud and inference platforms: Microsoft Azure (MSFT), AWS (AMZN), Google Cloud (GOOGL), Oracle Cloud (ORCL), Cloudflare (NET).

Agent Core:

- Frontier model layer: OpenAI (private), Anthropic (private), Cohere (private), Meta (META), Alphabet (GOOGL), Amazon (AMZN).
- Developer and agent tooling: Microsoft / GitHub (MSFT), Atlassian (TEAM), GitLab (GTLB), ServiceNow (NOW), Salesforce (CRM).
- Security and governance: Palo Alto Networks (PANW), CrowdStrike (CRWD), Zscaler (ZS), Okta (OKTA), Cloudflare (NET).

Infrastructure View:

- CPU and orchestration silicon: Intel (INTC), AMD (AMD), Arm (ARM), NVIDIA Grace / networking stack (NVDA), Broadcom (AVGO), Marvell (MRVL).
- GPU inference and accelerators: NVIDIA (NVDA), AMD (AMD), Broadcom (AVGO), Alphabet TPU (GOOGL), Amazon Trainium / Inferentia (AMZN).
- Data, retrieval, and memory: Snowflake (SNOW), MongoDB (MDB), Elastic (ESTC), Databricks (private), Pinecone (private), Micron (MU), SK hynix (000660.KS), Samsung Electronics (005930.KS).
- Observability and security: Datadog (DDOG), Dynatrace (DT), Cloudflare (NET), Palo Alto Networks (PANW), CrowdStrike (CRWD), Okta (OKTA).

Company names are illustrative ecosystem examples, not investment recommendations.

### 17.7 Current Korean And Japanese Mode-Level Localization

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

### 17.8 Current Audio Briefing Scope

Current transcript source file:

`docs/chapter3-audio-transcripts.md`

Current playback requirements:

- Audio briefing is present as a compact player.
- No autoplay.
- Transcript panel remains collapsed until the user opens it.
- Future ElevenLabs exports should use the transcript file as the source of truth.
- Runtime player text should eventually map by language and mode id.

Current Korean ElevenLabs audio export:

- Voice ID: `uyVNoMrnUku1dZyVEXwD`
- Model: `eleven_multilingual_v2`
- Output format: `mp3_44100_128`
- Runtime cache version: `uy-20260617-r2`
- Generation script: `scripts/generate-chapter3-korean-tts.mjs`
- Output files:
  - `audio/chapter3/ko-overview.mp3`
  - `audio/chapter3/ko-core.mp3`
  - `audio/chapter3/ko-infrastructure.mp3`
- Runtime mappings:
  - `ko-overview`: `audio/chapter3/ko-overview.mp3?v=uy-20260617-r2`
  - `ko-core`: `audio/chapter3/ko-core.mp3?v=uy-20260617-r2`
  - `ko-infrastructure`: `audio/chapter3/ko-infrastructure.mp3?v=uy-20260617-r2`

Current Japanese ElevenLabs audio export:

- Voice ID: `T7yYq3WpB94yAuOXraRi`
- Model: `eleven_multilingual_v2`
- Output format: `mp3_44100_128`
- Runtime cache version: `t7-20260617`
- Generation script: `scripts/generate-chapter2-3-japanese-tts.mjs`
- Output files:
  - `audio/chapter3/ja-overview.mp3`
  - `audio/chapter3/ja-core.mp3`
  - `audio/chapter3/ja-infrastructure.mp3`
- Runtime mappings:
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

### 17.9 Localization Status

Current implementation:

- English, Traditional Chinese, Korean, and Japanese include full mode-level insight content and value-chain role examples.
- Korean and Japanese include chapter titles, intros, audio/player labels, 3D node labels, value-chain role headings, company examples, and key findings.
- Korean and Japanese audio transcript scripts are complete in `docs/chapter3-audio-transcripts.md`.
- Korean Chapter 3 audio files were regenerated on 2026-06-17 with voice ID `uyVNoMrnUku1dZyVEXwD`; runtime uses cache version `uy-20260617-r2`.
- Japanese Chapter 3 audio files were generated on 2026-06-17 with voice ID `T7yYq3WpB94yAuOXraRi`; runtime uses cache version `t7-20260617`.

Recommended next localization task:

- Keep `app.js`, this design spec, and `docs/chapter3-audio-transcripts.md` synchronized whenever Chapter 3 Korean or Japanese copy changes.
