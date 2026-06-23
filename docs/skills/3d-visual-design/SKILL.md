---
name: 3d-visual-design
description: Use when planning, revising, or extending interactive 3D explainer scenes, especially when the model feels too technical, too text-heavy, weak on first-view comprehension, or misaligned across desktop and mobile navigation.
---

# 3D Visual Design

## Overview

Use this skill to shape interactive 3D explainers where the model does the first round of teaching. This skill covers the visual metaphor, model hierarchy, camera emphasis, and the navigation system across desktop and mobile.

Read these references before starting:

- [references/scene-patterns.md](references/scene-patterns.md)
- [references/navigation-systems.md](references/navigation-systems.md)

## Use This Skill When

- A 3D chapter feels like a technical diagram instead of a clear story
- The model contains too many labels or too much embedded text
- The first viewport is dominated by controls instead of the 3D scene
- Desktop and mobile navigation do not share the same logic
- A concept needs a clearer visual metaphor before implementation

## Core Principles

1. One scene, one lesson
   - Define what the user should understand within 5 seconds.
   - If two ideas compete, split them into modes or states.

2. The model explains before the text does
   - Prioritize silhouette, grouping, spacing, color, and motion.
   - In overview state, keep labels to orientation cues only.
   - Reveal deeper labels only after selection or focus.

3. Navigation is part of the visual system
   - Desktop and mobile should share the same conceptual structure, even if the controls look different.
   - Navigation should guide attention toward the model, not compete with it.

4. Recognizable 3D objects teach faster
   - Aim for roughly 80 percent real-world recognition.
   - Favor simplified but believable forms over abstract boxes.

5. Motion should orient, not perform
   - Use restrained auto-rotation, subtle flow motion, and camera emphasis.
   - Avoid aggressive zooms or theatrical transitions.

## Working Sequence

1. Write the scene thesis
   - Format: "This 3D scene helps the viewer understand..."

2. Choose the metaphor
   - Exploded infrastructure stack
   - Dual-mode system comparison
   - Character-centered workflow scene

3. Define viewing states
   - Overview state
   - Focused state or mode state
   - Reading-linked state

4. Define label hierarchy
   - Overview: 2 to 3 orientation cues maximum
   - Focus state: only the labels needed to explain the selected mechanism
   - Never place paragraphs inside the model

5. Define navigation behavior
   - What appears on desktop first
   - What appears on mobile first
   - What becomes hidden, collapsed, or fixed

## Interaction Rules

- Selecting a layer or mode should shift camera focus or scene emphasis
- Reset should stay visually quiet
- Audio should never autoplay
- Transcript can remain hidden by default, especially on mobile
- If left vs right or top vs bottom matters, show orientation cues directly inside the model area

## Desktop and Mobile Rule

Desktop and mobile navigation are explicitly part of this skill.

- Desktop can support rails, hover states, wheel switching, and persistent model-adjacent controls
- Mobile should preserve model area first, reduce control prominence, and move deeper controls behind compact triggers
- Bottom docks, stage chips, summary cards, and low-profile audio controls are all part of the visual system, not separate UI cleanup tasks

## Deliverables Checklist

- One-sentence scene thesis
- Chosen metaphor and reason
- Overview, focus, and reading-linked states
- Label hierarchy
- Camera or emphasis behavior
- Desktop navigation notes
- Mobile navigation notes
- Motion notes

## Common Mistakes

- Treating the scene like a whitepaper figure
- Showing every label at once
- Letting the navigation outrank the 3D model
- Using abstract geometry where a recognizable object would teach faster
- Designing desktop and mobile as unrelated systems

