# Visible Reading Layer Mockup

Status: concept mockup  
Last updated: 2026-06-21  
Related roadmap item: Quick win #1 in [seo-geo-roadmap.md](/Users/daniel/Projects/Stocks/ai-datacenter-3d/docs/seo-geo-roadmap.md)

## Goal

Turn the current hidden SEO text block into a visible but low-emphasis reading layer that:

- improves SEO and GEO extractability
- does not compete with the 3D model as the hero
- feels editorial, calm, and intentional
- works on desktop and mobile

This layer should feel like a quiet second surface for readers who want to keep going after the immersive first look.

## Core Idea

The first screen still belongs to the 3D model.

The reading layer starts only after the hero area and uses restrained typography, short summaries, and collapsible sections. It should feel closer to a research digest than a blog article.

## Recommended Content Structure

### Section order

1. `What this site explains`
2. `Chapter 1`
3. `Chapter 2`
4. `Chapter 3`
5. `Key questions`
6. `Latest updates`

### Content inside each chapter block

- short chapter summary
- 3 bullet takeaways
- one `How it works` paragraph
- one `Future signal` paragraph
- one text link such as `Open full chapter in 3D view`

This keeps the reading layer useful without duplicating the whole interactive panel system.

## Desktop Mockup

```text
------------------------------------------------------------
|                    3D hero experience                    |
|      headline / model / layer controls / insight UI      |
------------------------------------------------------------

                     Scroll for chapter notes

------------------------------------------------------------
| What this site explains                                 |
| A short 2-3 sentence editorial summary of the whole     |
| project and why AI infrastructure is a system story.    |
------------------------------------------------------------

------------------------------------------------------------
| Chapter 1                                Open in 3D ->   |
| Compute to Grid                                         |
| The AI race now runs through power, cooling, and grid   |
| constraints, not only GPU shipments.                    |
|                                                         |
| Key takeaways                                           |
| - Power access sets the real ceiling on new capacity    |
| - Cooling determines rack density and uptime            |
| - Packaging, HBM, and networking shape usable compute   |
|                                                         |
| How it works                                            |
| Short paragraph...                                      |
|                                                         |
| Future signal                                           |
| Short paragraph...                                      |
------------------------------------------------------------

------------------------------------------------------------
| Chapter 2                                Open in 3D ->   |
| From Training Factories to Inference Networks           |
| ...                                                     |
------------------------------------------------------------

------------------------------------------------------------
| Chapter 3                                Open in 3D ->   |
| From Response to Action                                 |
| ...                                                     |
------------------------------------------------------------

------------------------------------------------------------
| Key questions                                           |
| [accordion] What is an AI data center value chain?      |
| [accordion] Why is inference different from training?   |
| [accordion] Why does agentic AI stress coordination?    |
------------------------------------------------------------

------------------------------------------------------------
| Latest updates                                          |
| Jun 2026  Chapter 1 editorial refresh                   |
| Jun 2026  Mobile navigation and insight refinement      |
------------------------------------------------------------
```

## Mobile Mockup

```text
-----------------------------------
| 3D hero                         |
| headline                        |
| model                           |
| compact controls                |
-----------------------------------

-----------------------------------
| Chapter notes                   |
| A short intro sentence          |
-----------------------------------

-----------------------------------
| Chapter 1                  +     |
| Compute to Grid                 |
-----------------------------------
 tap to expand

-----------------------------------
| Chapter 1                  -     |
| Compute to Grid                 |
| Short summary...                |
|                                 |
| Key takeaways                   |
| - ...                           |
| - ...                           |
| - ...                           |
|                                 |
| How it works                    |
| ...                             |
|                                 |
| Future signal                   |
| ...                             |
|                                 |
| Open in 3D view ->              |
-----------------------------------

-----------------------------------
| Chapter 2                  +     |
-----------------------------------

-----------------------------------
| Chapter 3                  +     |
-----------------------------------

-----------------------------------
| Key questions              +     |
-----------------------------------

-----------------------------------
| Updates                    +     |
-----------------------------------
```

## Interaction Pattern

### Desktop

- Reading layer sits below the hero, not inside the hero columns.
- Each chapter block is visible by default.
- `Open in 3D view` scrolls the user back to the hero and switches the active chapter.

### Mobile

- Reading layer is collapsed by default to preserve vertical space.
- Each chapter card expands independently.
- Use predictable accordions, not drawers.

## Visual Direction

### Tone

- quiet
- research-like
- editorial
- low chrome

### Styling guidance

- no heavy card stack look
- soft section dividers
- restrained borders
- compact type
- short line lengths
- muted section labels
- accent color only for active links and chapter tags

### What to avoid

- large marketing-style blocks
- oversized CTA buttons
- bright backgrounds that fight the 3D scene
- full article density immediately under the hero

## Why this works

This direction preserves the existing product identity:

- the 3D experience remains the first impression
- the reading layer supports search engines and AI systems
- deeper readers get a clear second step
- the page becomes easier to cite, summarize, and revisit

## Recommended First Build

Build the smallest useful version first:

1. a short `What this site explains` intro
2. three compact chapter summaries
3. one FAQ block with 4 questions
4. one small updates block

This is enough to materially improve crawlable content without making the page feel heavy.

## Suggested Implementation Notes

- Reuse the existing hidden content in [index.html](/Users/daniel/Projects/Stocks/ai-datacenter-3d/index.html:492)
- Move it below the hero as a normal section
- Convert long lists into short editorial summaries
- Keep the chapter titles aligned with the visible 3D chapter naming
- Add anchor links from the reading layer back to the interactive chapter states

## Decision Recommendation

If the goal is to improve SEO and GEO without diluting the immersive feel, this is the best first expression:

**A visible reading layer below the hero, with compact chapter summaries and collapsible supporting detail.**
