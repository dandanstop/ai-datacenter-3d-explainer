# Chapter 1 Navigation Redesign Mockup

Date: 2026-06-21

Status: Implemented direction reference with shipped notes

Scope: Chapter 1 only

## Implemented Outcome

The navigation redesign was implemented in a pragmatic form rather than as a literal one-to-one build of the early mockup.

Shipped Chapter 1 outcome:

- Desktop keeps a compact left rail for the six layers.
- Desktop still retains chapter switching inside the left column rather than moving it into the top bar.
- The language switcher is a sticky top-right menu trigger.
- The first desktop frame prioritizes the 3D model and keeps the insight panel hidden.
- The first Chapter 1 camera view shows the whole AI campus before any layer focus.
- Layer focus now begins only after user interaction and uses subtle emphasis rather than aggressive zoom.
- Desktop supports mouse-wheel layer switching over the stage.
- Mobile uses a compact `C1` stage chip beside the language trigger.
- Mobile hides chapter switching, exploded controls, and reset behind that stage chip.
- Mobile shows a summary card above a fixed six-layer bottom dock.
- Mobile insight content expands progressively and includes a close icon in the top-right corner.

This document remains useful as a design reference, but the notes below should be read alongside the implemented behavior in `REQUIREMENTS.md`.

## Design Read

Reading this as: an editorial interactive explainer for investors, analysts, infrastructure teams, and curious high-intent readers, with a premium dark-tech language, leaning toward a 3D-first navigation system with restrained motion and very low text burden.

## Dial Values

- `DESIGN_VARIANCE: 6`
- `MOTION_INTENSITY: 5`
- `VISUAL_DENSITY: 3`

Interpretation:

- The experience should feel composed and premium, not playful or app-like.
- Motion should support orientation and focus, not become spectacle.
- Text density should be intentionally low at the first touchpoint.

## Primary Goal

Redesign the Chapter 1 six-layer navigation so users can begin exploring the AI data center story without reading long text blocks first.

The new system should:

- Put the 3D model first.
- Reduce text burden at page entry.
- Make layer selection obvious on desktop and mobile.
- Reveal deeper content only after user intent.
- Reuse the same logic later for Chapter 2 and Chapter 3.

## Core UX Direction

Recommended direction:

`3D Stage + Compact Layer Rail + Progressive Insight Sheet`

This replaces the current left-side content-heavy card list with a true navigation system.

## Information Architecture

The Chapter 1 experience should work in three reading depths.

### Level 1: Scan

Visible immediately:

- Brand name
- Chapter switch
- Language control
- 3D model
- Compact layer navigation
- One-line current layer summary

User task:

- Identify that there are six layers
- Tap or click a layer quickly
- Start interacting without reading paragraphs

### Level 2: Understand

Visible after selecting a layer:

- Layer full name
- Short `How it works` summary
- One `Future signal`
- `Read insight` trigger

User task:

- Understand what the layer does
- Understand why it matters

### Level 3: Deep Read

Visible after opening the insight panel:

- Full insight copy
- Who builds this layer
- Signals to watch
- Learn more links

User task:

- Read in depth
- Compare companies and supply chain roles
- Continue exploring

## Desktop Mockup

### Layout Structure

```text
┌──────────────────────────────────────────────────────────────────────────────┐
│ Compute to Grid                                              EN  About      │
├───────────────┬───────────────────────────────────────┬─────────────────────┤
│ Chapter 1     │                                       │                     │
│               │                                       │   Insight Sheet     │
│ 01  ⚡ Power   │              3D MODEL STAGE           │   hidden by default │
│ 02  ❄ Cooling │                                       │                     │
│ 03  ◼ Compute │      auto-rotate / click / drag       │   opens after tap   │
│ 04  ⇄ Network │                                       │                     │
│ 05  ▦ Campus  │                                       │                     │
│ 06  ☁ Ops     │                                       │                     │
│               │                                       │                     │
│ [Exploded]    │   Layer HUD                           │                     │
│ Reset         │   03 Compute                          │                     │
│               │   One-line summary                    │                     │
└───────────────┴───────────────────────────────────────┴─────────────────────┘
```

### Desktop Behavior

- Left side becomes a compact navigation rail, not a reading panel.
- Each layer item only shows:
  - index number
  - icon
  - short name
- Full descriptive content does not appear in the left column.
- The 3D stage remains visually dominant.
- The insight sheet stays hidden until:
  - the user clicks a layer in the rail, or
  - clicks the matching 3D object

### Desktop Rail Specification

Each rail item:

- height: fixed
- compact layout
- high active contrast
- low inactive contrast
- no body copy
- no company names
- no long subtitles

Suggested labels:

- `01 Power`
- `02 Cooling`
- `03 Compute`
- `04 Network`
- `05 Campus`
- `06 Ops`

### Desktop Active State

When active:

- icon tint becomes the layer color
- left border or pill highlight appears
- 3D object brightens
- HUD updates with:
  - layer number
  - short title
  - one-line summary

### Desktop Hover State

When hovered:

- row background slightly lifts
- label opacity increases
- matching 3D element gains subtle highlight

### Desktop Insight Trigger

After selection, show a small action near the 3D HUD:

- `Read insight`

This opens the right-side sheet.

## Mobile Mockup

### Layout Structure

```text
┌──────────────────────────────┐
│ Compute to Grid        EN ☰  │
├──────────────────────────────┤
│                              │
│         3D MODEL             │
│                              │
│   03 Compute                 │
│   Chips, memory, packaging   │
│                              │
│                              │
├──────────────────────────────┤
│ ⚡  ❄  ◼  ⇄  ▦  ☁            │
│ 01  02  03  04  05  06       │
└──────────────────────────────┘
```

Tap a layer:

```text
┌──────────────────────────────┐
│ Compute & AI Chips      ✕    │
│ How it works                 │
│ Short 2 to 3 line summary    │
│                              │
│ Future signal                │
│ One key forward-looking cue  │
│                              │
│ [Read full insight]          │
└──────────────────────────────┘
```

### Mobile Behavior

- Navigation moves to a fixed bottom dock.
- Each dock item shows:
  - icon
  - number
- Optional short label can appear only for the active layer.
- The 3D area keeps the largest share of the viewport.
- Long insight content is hidden behind a bottom sheet.

### Mobile Bottom Dock Specification

- fixed to bottom
- safe-area aware
- horizontally centered
- supports touch targets comfortably
- current item visibly elevated
- inactive items remain subdued

### Mobile Layer Summary

Just above the dock, show only:

- current layer index + short name
- one-line description

Example:

```text
03 Compute
Builds AI capacity from chips, memory, packaging, and rack systems.
```

### Mobile Bottom Sheet

Bottom sheet states:

- closed
- half-open
- expanded

Closed:

- only 3D + dock visible

Half-open:

- short summary
- future signal
- one CTA to read more

Expanded:

- full insight content
- who builds this layer
- links

## Recommended Component Set

### 1. Compact Layer Rail

Used on desktop.

Purpose:

- quick scan
- low cognitive load
- direct mapping to 3D object

### 2. Layer Dock

Used on mobile.

Purpose:

- thumb-friendly navigation
- persistent access to all six layers
- minimal obstruction of 3D area

### 3. Layer HUD

Used above or inside the 3D stage.

Content:

- active layer number
- short title
- one-line summary
- optional `Read insight`

Purpose:

- orient user without opening the full panel

### 4. Insight Sheet

Used on desktop as side sheet, mobile as bottom sheet.

Purpose:

- progressive disclosure
- preserve immersion before deep reading

## Cross-Device Interaction Logic

The same mental model should work on every device:

1. Select layer
2. See 3D focus change
3. Read one-line summary
4. Open deep content only if interested

This is the key consistency principle.

## State Design

### Default State

- 3D auto-rotates
- one default layer selected
- insight sheet hidden
- only short summary visible

### Select State

- clicked or tapped layer becomes active
- 3D camera or emphasis updates
- HUD updates
- insight trigger appears

### Deep Read State

- insight sheet opens
- rest of UI remains stable
- 3D still visible on desktop

### Return State

- closing sheet returns to the same selected layer
- no reset to global default unless user explicitly resets

## Multi-Device Possibilities

Using `design-taste-frontend`, these are the three strongest patterns.

### Option A1: Compact Rail + Bottom Sheet

Best overall recommendation.

Why:

- cleanest hierarchy
- easiest to understand
- easiest to scale to Chapter 2 and 3
- strongest 3D-first composition

### Option A2: Floating Layer Pills Around 3D

Structure:

```text
            [01 Power]
 [02 Cooling]         [04 Network]

               3D MODEL

 [05 Campus]          [06 Ops]
            [03 Compute]
```

Strengths:

- very immersive
- feels more like an interactive map

Risks:

- can obscure the model
- more fragile for multilingual labels
- harder on mobile

Recommendation:

- good for later exploration
- not ideal as the first production navigation redesign

### Option A3: Story Dock

Structure:

- horizontal scrollable mini-cards
- icon + number + very short phrase

Strengths:

- newcomer-friendly
- educational
- good on mobile

Risks:

- visually heavier than A1
- still close to content-card thinking

Recommendation:

- useful if the audience becomes broader and more mainstream
- less elegant than A1 for the current editorial direction

## Recommendation Ranking

1. `A1 Compact Rail + Bottom Sheet`
2. `A3 Story Dock`
3. `A2 Floating Layer Pills`

## Implementation Notes

Where the shipped version differs slightly from the original mockup:

- Desktop kept the chapter selector in the left panel because it fit the existing information architecture cleanly.
- Mobile uses a compact chapter chip instead of a larger hamburger entry to reduce first-view clutter.
- The current active mobile dock item shows its short label for clarity; inactive items stay icon + number first.
- The desktop 3D stage now starts from a full-campus overview and only moves into layer focus after interaction.
- Drag orbit behavior was tuned so the model feels like a controllable viewer rather than a clickable poster.

## Visual System Notes

### Typography

- Keep navigation text short and low-friction.
- Short labels in navigation.
- Full names appear only in active HUD and insight sheet.

### Shape Language

- One radius system across the new navigation.
- Recommend soft corners, not pills everywhere.
- Keep it consistent with the current dark editorial UI.

### Color Use

- One accent family per layer, already established in the 3D system.
- Inactive navigation should remain near-neutral.
- Active state should use color precisely, not loudly.

### Motion

- Motion should orient, not entertain.
- Good motion examples:
  - rail selection fade
  - subtle lift on hover
  - sheet slide-in
  - 3D focus emphasis

Avoid:

- bouncing icons
- oversized hover scaling
- aggressive parallax

## Suggested Implementation Order

### Phase 1

- desktop compact rail
- mobile bottom dock
- layer HUD
- hidden-by-default insight sheet

### Phase 2

- keyboard next/previous layer support
- swipe support on mobile dock
- smoother camera focus transitions

### Phase 3

- optional floating contextual hotspots
- optional compare mode across layers

## Decision

Recommended production direction for Chapter 1:

`Compact Rail + Bottom Sheet`

This is the cleanest way to make the 3D model the first experience while keeping the six-layer education system intact.
