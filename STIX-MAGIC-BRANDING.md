# STIX MAGIC Branding Guidelines

## Language System

This document outlines the consistent brand language applied across the STIX MAGIC product.

### Symbol System

Use these symbols with precision and restraint:

* **✦** - Primary action / primary flow only (Pick a style ✦, Create sticker ✦)
* **✧** - Optional enhancement only (Add extra magic ✧, Preview in motion ✧)
* **○** - Neutral state
* **◌** - In progress / forming / loading
* **△** - Transformation / change (Edge refined △)

### ✦ Important Rules

* **DO NOT** use ✧ in the main flow
* Main hero / primary flow copy must use ✦
* Keep symbols restrained and polished - avoid overuse
* Symbols should enhance meaning, not decorate randomly

### Primary Flow Language

The core user journey uses **✦** to indicate primary actions:

1. **Pick a style ✦**
2. **Bring it to life ✦**
3. **Create your sticker ✦**

### Optional Features Language

Optional enhancements use **✧**:

* Add extra magic ✧
* Preview in motion ✧
* Boost the effect ✧

### Loading & Processing States

Use **◌** and **△** for process indicators:

* Uploading to cloud ◌
* Your sticker is forming ◌
* Refining edge ◌
* Edge refined △
* Motion infused ✧
* Magic applied ✦
* Ready ✦

### Export & Deployment

* Building your pack ✦
* Pack deployed ✦
* Sticker ready ✦
* Ready to export ✦

## Vocabulary Replacements

Apply these vocabulary changes consistently across the repo:

| Old Term | New Term | Context |
|----------|----------|---------|
| preset | style | When referring to complete animated outcomes |
| effect | magic / look | User-facing copy |
| intensity | energy | Control labels |
| mask | finish / edge | User-facing (use "mask" only where technically necessary) |
| apply effect | Apply to my image ✦ | Call to action |
| playground | studio / style lab | If appropriate for context |

### Finish / Edge Terminology

User-facing naming for mask types:

* **Finish** (general term)
* **Edge style** (general term)
* **Clean cut** (sharp edges)
* **Soft edge** (feathered edges)
* **Glow edge** (luminous edges)
* **Aura edge** (diffused halo)

## Voice & Tone

### Characteristics

* **Short**: One or two word labels preferred
* **Guided**: Direct the user confidently
* **Friendly**: Warm but not overly casual
* **Magical**: Hint at transformation and delight
* **Minimal**: Avoid long explanations

### Examples of Good Copy

✅ **DO:**
* Pick a style ✦
* Bring it to life
* Add extra magic ✧
* Your sticker is forming ◌
* Edge refined △
* Magic applied ✦
* Preview in motion ✧
* Ready to export ✦

❌ **AVOID:**
* dry technical labels
* long explanatory paragraphs
* fantasy roleplay wording (wizard, mage, summoner)
* advanced builder language
* configuration / parameter terminology

## Brand Signature

This line must remain **in English only in all locales** and must never be translated:

**🐾 Forged with a frisky paw and a daring heart**

If there is any i18n or locale copy structure, mark this string as non-translatable.

## Component-Level Applications

### Hero Section
* Main tagline uses ✦
* Sub-copy explains transformation simply
* CTAs use ✦ for primary actions

### Style Cards
* Card titles: Style names (e.g., "Dream Glow")
* Movement personality: One short line about motion feel
* Hover states hint at interactivity
* Symbols used sparingly

### Detail Panel
* Tab labels: "Preview in motion ✧" / "Your Image"
* Primary CTA: "Apply to my image ✦"
* Secondary toggle: "Add extra magic ✧"
* Finish controls: "Clean cut", "Soft edge", "Glow edge", "Aura edge"
* Processing: "Refining edge ◌", "Edge refined △"

### Gallery
* Tab names: "All Styles", "✨ Magic Effects", "⚡ Energy & Tech", etc.
* Empty states: Simple, friendly, directive
* Filter labels: Simple categories, not technical terms

### Image Upload
* Upload CTA: "Apply to my image ✦" or "Upload your image ✦"
* Background removal: "Remove background ✂" / "Edge refinement"
* Status: "Clean cutout ready! ${style.name} motion will be applied ✧"

### Transformation Preview
* Shows: "Your image ○ → Edge refined △ → Motion infused ✧ → Ready to apply ✦"
* Badge: "All magic happens in one flow"

### Loaders & Feedback
* Loading: "Your sticker is forming ◌"
* Success: "Sticker ready ✦", "Magic applied ✦", "Edge refined △"
* Error: Helpful, recovery-focused language

## Style-First Model

The product emphasizes ready-made styles over technical configuration:

### Style Definition

Each style includes:
* **Finish** (mask/edge behavior) - part of the style identity
* **Motion** (animation behavior) - part of the style identity  
* **Visual vibe** - emotional/aesthetic category
* **Movement personality** - one-line description of how it moves

### User Journey

1. **Pick a style** - see complete result (finish + motion together)
2. **Preview it** - understand the transformation
3. **Optionally enhance** - add extra magic (energy/speed tweaks)
4. **Apply** - to your own image

NOT:
* Configure mask separately
* Configure motion separately
* Assemble components manually

## Extra Magic

Optional refinement controls appear only when enabled:

* **Toggle**: "Add extra magic ✧"
* **Energy levels**: Clean / Enhanced / Intense (not subtle/medium/strong)
* **Speed levels**: Slow / Normal / Fast
* **Labels**: Simple, non-technical, user-friendly

The default experience is simple - extra magic is hidden unless the user wants more control.

## Conversion-Focused Language

Primary CTAs emphasize outcome and value:

* "Apply to my image ✦" (not "Use this preset")
* "Create sticker ✦" (not "Export")
* "Pick a style ✦" (not "Browse presets")

## Implementation Notes

### Where to Apply

* `App.tsx` - Hero section, main flow
* `StyleGallery.tsx` - Tab names, empty states, headings
* `StickerStyleCard.tsx` / `SimpleStyleCard.tsx` - Card copy, CTAs
* `StyleDetailPanel.tsx` / `SimpleDetailPanel.tsx` - Panel labels, CTAs, toggles
* `ExampleTransformation.tsx` - Transformation flow labels
* `ImageUpload.tsx` - Upload instructions
* `TransformationControls.tsx` - Control labels (if applicable)
* All loaders and feedback states

### Consistency Check

* Symbol usage follows rules (✦ for primary, ✧ for optional)
* Vocabulary replacements applied consistently
* Voice matches tone guidelines
* Brand signature present and marked non-translatable
* Extra magic hidden by default
* Style-first language (not technical configuration language)

---

**Remember**: The goal is to make STIX MAGIC feel like a cohesive, branded, magical product - not a generic animation tool or technical configuration software.
