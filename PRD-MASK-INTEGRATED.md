# STIX MAGIC - Integrated Mask & Motion System

Transform any image into an animated sticker with ready-made magic. Pick a style ✦ See it transform ✧ Create your sticker.

**Experience Qualities**:
1. **Simple & Guided** - Clean linear flow from style selection to application, mask integrated invisibly
2. **Visually Confident** - Strong transformation examples build trust before user uploads
3. **Naturally Refined** - Mask feels like part of the style magic, not a separate technical tool

**Complexity Level**: Light Application (multiple features with focused state)
A polished sticker creation tool where mask functionality is naturally integrated into ready-made styles as the "finish" that makes each style premium.

## Core Product Direction

STIX MAGIC has evolved from a preset gallery into an integrated style application system where:

- **Masks are styles** - Each style includes its finish/edge treatment as part of the magic
- **Simple workflow** - Pick style → Preview transformation → Apply to image → Optionally refine
- **Premium feel** - Mask makes styles look polished, not exposed as technical configuration

---

## Essential Features

### Integrated Mask System
- **Functionality**: Unified mask application system with 4 finish types built into every style
- **Purpose**: Make styles feel premium without exposing mask as separate technical step
- **Mask Types**:
  - **Clean**: Sharp sticker cut with crisp edges
  - **Soft**: Gentle feathered edges for smooth blending
  - **Glow**: Luminous edges with outer glow
  - **Aura**: Diffused atmospheric halo around subject
- **Integration**: Each style includes a default finish type that works best for its vibe
- **Success criteria**: Mask feels invisible until user wants to refine

### Transformation Example Flow
- **Functionality**: Visual before/after showing the complete pipeline
- **Purpose**: Build understanding and confidence before commitment
- **Trigger**: Appears prominently in hero section
- **Progression**: Your image ○ → Edge refined △ → Motion infused ✧ → Final sticker ✦
- **Success criteria**: Users instantly understand the 3-step transformation

### Featured Style Library (12 curated styles)
- **Functionality**: Curated set of strong styles combining finish + motion + vibe
- **Purpose**: Present complete ready-made results, not technical components
- **Styles Include**:
  1. Dream Glow (Glow + Breathing)
  2. Neon Pulse (Glow + Pulse Ring)
  3. Mascot Bounce (Soft + Bounce)
  4. Cosmic Drift (Aura + Orbit)
  5. Glitch Pop (Clean + RGB Glitch)
  6. Shimmer Luxury (Soft + Shimmer)
  7. Heartbeat Love (Soft + Heartbeat)
  8. Sparkle Burst (Aura + Sparkle Burst)
  9. Wobble Jelly (Soft + Wobble)
  10. Cloud Dream (Aura + Cloud Drift)
  11. Lightning Flash (Glow + Lightning)
  12. Hypnotic Spin (Clean + Spin)
- **Success criteria**: Each style feels distinct and clearly shows its character in preview

### Style Detail Panel (Simplified)
- **Functionality**: Focused panel with large preview and clear CTA
- **Purpose**: Keep main flow simple, reveal customization only when requested
- **Trigger**: Click any style card
- **Progression**: Open panel → See large animated preview → (Optional) Toggle extra magic ✧ → Adjust energy/speed → Click "Apply to my image ✦"
- **Success criteria**: Panel feels premium and focused, extra controls hidden by default

### Extra Magic Controls
- **Functionality**: Optional 2-control refinement (Energy, Speed)
- **Purpose**: Allow light customization without overwhelming
- **Trigger**: Toggle "Add extra magic ✧" switch
- **Controls**:
  - Energy: Soft / Medium / Strong (affects glow intensity, particle density)
  - Speed: Slow / Normal / Fast (affects animation timing)
- **Success criteria**: Only 2 simple controls, preview updates smoothly, feels like enhancement

### Image Upload with Drag & Drop
- **Functionality**: Upload user images to apply selected styles
- **Purpose**: Enable personal sticker creation
- **Trigger**: "Your Image" tab
- **Progression**: Drag image or browse → Validate (10MB max) → Preview → Ready for style application
- **Success criteria**: Smooth interaction, clear validation, uploaded image displays prominently

### Optional Finish Refinement
- **Functionality**: Allow users to change the finish/edge style after upload
- **Purpose**: Let users refine the edge treatment if the default doesn't fit their image
- **Trigger**: After uploading image, optional "Refine finish" control
- **Options**: Clean cut / Soft edge / Glow edge / Aura edge
- **Default**: Uses the finish included in the selected style
- **Success criteria**: Feels optional and helpful, not required or technical

---

## Mask Integration Philosophy

### How Mask Works in STIX MAGIC

1. **Built into styles** - Each style has a default finish type (clean, soft, glow, or aura)
2. **Invisible by default** - Users don't see "mask" exposed as a separate step
3. **Refinement when needed** - After upload, users can optionally change the finish
4. **Language shift** - "Mask" becomes "Finish" or "Edge" in user-facing copy

### Mask Application Flow

```
User picks style → Style includes finish → User uploads image → 
Auto-apply finish → Preview result → (Optional) Refine finish → Export
```

### Technical Implementation

- **Mask System**: `/src/lib/maskSystem.ts` - Unified mask application with 4 types
- **Style Data**: `/src/lib/featuredStyles.ts` - 12 curated styles with integrated finish
- **Application**: Each style's `mask.type` determines the finish applied
- **Refinement**: Optional finish selector shows after upload for user control

---

## Edge Case Handling

- **No Styles Match Filter**: Show empty state with "Clear filters" button
- **Extra Magic Disabled**: Panel collapses smoothly, no orphaned controls
- **Image Upload Errors**: Toast notifications for file size/type validation
- **No Image Uploaded**: "Apply" button guides to upload tab
- **Rapid Toggle**: Smooth animations prevent jarring state changes
- **Finish Refinement**: Preview updates immediately when finish type changes

---

## Design Direction

The design should evoke **confidence through visual clarity and magical refinement**. Users should immediately grasp the transformation flow through examples, feel excited by strong style previews with polished finishes, and trust the system to handle complexity behind simple controls. The integrated mask/finish system makes every style feel premium without exposing technical details.

---

## Color Selection

Vibrant creative palette that feels magical but not overwhelming.

- **Primary Color**: Deep Creative Teal `oklch(0.65 0.20 160)` - Transformation and innovation
- **Secondary Colors**: Soft Sky Blue `oklch(0.70 0.12 200)`, Rich Purple `oklch(0.75 0.15 280)` for magical atmosphere
- **Accent Color**: Bright Cyan `oklch(0.75 0.15 200)` - High energy for CTAs
- **Foreground/Background Pairings**:
  - Background `oklch(0.98 0.01 180)`: Dark text `oklch(0.15 0.02 240)` - Ratio 15.2:1 ✓
  - Primary: White text `oklch(0.98 0.01 180)` - Ratio 5.1:1 ✓
  - Accent: Dark text `oklch(0.15 0.02 240)` - Ratio 9.3:1 ✓

---

## Font Selection

Clean modern typography that feels approachable and premium.

- **Primary Font**: Inter - Modern sans-serif for UI and body
- **Accent Font**: JetBrains Mono - For technical specs and badges

**Typographic Hierarchy**:
- H1 (STIX MAGIC): Inter Bold / 56-72px / tight / gradient
- H2 (Section Headers): Inter Bold / 32-48px / normal
- Body (Descriptions): Inter Regular / 16px / 1.5 line-height
- Labels (Metadata): Inter Medium / 12px / uppercase / wide tracking
- CTA Buttons: Inter Semibold / 16-18px / prominent

---

## Animations

Purposeful motion that guides attention and builds confidence.

- **Example Transform Steps**: Staggered reveals with pulse on final state
- **Style Card Entrance**: Cascade effect with 30ms delays
- **Card Hover**: Gentle lift (2% scale) with shadow expansion
- **Detail Panel**: Smooth slide-in from right with elastic easing
- **Extra Magic Toggle**: Height expansion when revealing controls
- **Preview Updates**: Cross-fade between states when energy/speed adjusted
- **Finish Change**: Smooth transition when user refines edge treatment
- **Upload Success**: Satisfying scale-up confirmation

---

## Component Selection

- **Components**:
  - `Tabs` for Style/Upload navigation
  - `Card` for style previews with gradient borders
  - `Sheet` for style detail panel (full-screen on mobile)
  - `Switch` for Extra Magic toggle
  - `Button` with gradient variant for primary CTAs
  - `Badge` for intensity, finish types, vibe tags
  - `motion` from framer-motion for all animations

- **Custom Components**:
  - **ExampleTransformation**: 4-step visual pipeline with symbols
  - **StickerStyleCard**: Animated preview cards with live motion
  - **StyleDetailPanel**: Simplified panel with Extra Magic collapsed
  - **MaskSystem**: Unified finish application (clean/soft/glow/aura)
  - **FinishSelector**: Optional refinement control for edge treatment

- **States**:
  - Style cards: default, hover (lift + glow), active (persistent glow)
  - Extra Magic: off (hidden), on (smooth expansion)
  - Apply button: default (gradient), hover (opacity), disabled (no image)
  - Finish options: clean, soft, glow, aura with live preview

- **Icon Selection** (Phosphor):
  - Sparkle (magic, primary actions)
  - Lightning (motion effects)
  - Funnel (filter/browse)
  - Image (upload)
  - Info (style breakdowns)
  - ArrowRight (transformation flow)

- **Spacing**:
  - Page padding: `px-6 md:px-8 lg:px-12`, `py-12 md:py-16`
  - Card grid gap: `gap-6`
  - Section spacing: `space-y-8`
  - Transform example: `gap-6 md:gap-4`

- **Mobile**:
  - Tabs use full width grid
  - Style cards: 3-col (lg) → 2-col (md) → 1-col (sm)
  - Detail panel becomes full-screen Sheet
  - Example stacks vertically
  - 44x44px touch targets

---

## STIX MAGIC Language System

### Core Symbols
- ✦ Primary magic / final result
- ✧ Enhancement / extra magic
- ○ Neutral state / starting point
- ◌ In-progress / forming
- △ Transformation / change

### Voice & Tone
Short, guided, lightly ritual-like but never overloaded.

**Examples**:
- Pick a style ✦
- Add extra magic ✧
- Your sticker is forming ◌
- Edge refined △
- Magic applied ✦
- Ready to export

### User-Facing Terms
- **Style** (not preset)
- **Finish** or **Edge** (not mask)
- **Energy** (not intensity)
- **Magic** (not effect)
- **Your image/sticker** (not file/output)

### Transformation States
- Uploading ◌
- Refining edge △
- Infusing motion ✧
- Rendering ✦
- Ready ✦

---

## Implementation Status

### ✅ Completed
- Mask system with 4 finish types (clean, soft, glow, aura)
- 12 curated featured styles with integrated finishes
- Style gallery using featured styles
- Example transformation component
- Style detail panel with extra magic toggle
- Image upload with drag & drop
- STIX MAGIC language/copy system

### 🔄 In Progress
- Connect mask application to uploaded images
- Finish refinement selector (post-upload)
- Live preview with applied finish
- Export functionality with applied finish + motion

### 📋 Next Steps
- Integrate mask application when user uploads image
- Add finish refinement controls (optional)
- Build export flow with finished sticker
- Add loading states using STIX MAGIC ASCII system
- Polish mobile responsive behavior
- Add background removal integration (optional enhancement)

---

## Success Criteria

The experience succeeds when:

1. Users understand the transformation visually before uploading
2. Mask/finish feels like invisible premium enhancement
3. Styles feel like ready-made results, not technical configurations
4. Optional refinement is discoverable but not required
5. The whole flow feels simple, magical, and confident
