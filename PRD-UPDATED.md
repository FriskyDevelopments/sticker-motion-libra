# STIX MAGIC - Sticker Style Application

Transform any image into an animated sticker with ready-made magic. Pick a style ✦ Bring it to life ✧ Create your sticker.

**Experience Qualities**:
1. **Simple & Guided** - Clear linear flow from style selection to application, no overwhelming options
2. **Visually Confident** - Strong previews and examples build trust before user uploads
3. **Optionally Enhanced** - Advanced controls hidden behind "Extra Magic" toggle for clean default experience

**Complexity Level**: Light Application (multiple features with focused state)
A guided sticker creation tool where mask functionality is naturally integrated into ready-made styles rather than exposed as separate technical controls.

## Essential Features

### Example Transformation Flow
- **Functionality**: Visual before/after showing the transformation pipeline
- **Purpose**: Build confidence and understanding before user commits an image
- **Trigger**: Appears prominently on landing
- **Progression**: Static example image → Edge refined (mask) → Motion infused → Final animated result
- **Success criteria**: Users understand the 3-step transformation visually

### Style Gallery with Vibe Filtering
- **Functionality**: Browse 20 ready-made styles organized by emotional vibes
- **Purpose**: Present complete results (mask + motion combined) not technical components
- **Trigger**: Default "Pick a Style" tab
- **Progression**: View all styles → Filter by vibe category → See live animated previews → Select style → Open detail panel
- **Success criteria**: All styles show looping animations, filtering is instant, vibes are clearly labeled

### Style Detail Panel (Simplified)
- **Functionality**: Larger preview with primary "Apply" CTA and optional "Extra Magic" toggle
- **Purpose**: Keep main flow simple, reveal customization only when requested
- **Trigger**: Click any style card
- **Progression**: Open panel → See large preview → (Optional) Toggle extra magic → Adjust energy/speed sliders → Click "Apply to my image ✦"
- **Success criteria**: Panel feels premium and focused, extra controls are hidden by default

### Extra Magic Controls
- **Functionality**: Optional 2-control refinement (Energy, Speed)
- **Purpose**: Allow light customization without overwhelming
- **Trigger**: Toggle "Add extra magic ✧" switch in detail panel
- **Progression**: Toggle on → Select energy level (Soft/Medium/Strong) → Select speed (Slow/Normal/Fast) → See live preview update
- **Success criteria**: Only 2 simple controls, preview updates smoothly, feels like enhancement not complexity

### Image Upload with Drag & Drop
- **Functionality**: Upload user images to apply selected styles
- **Purpose**: Enable personal sticker creation
- **Trigger**: "Your Image" tab
- **Progression**: Drag image or click to browse → Validate file (10MB max, image types) → Preview uploaded image → Ready for style application
- **Success criteria**: Smooth drag & drop, clear validation errors, uploaded image displays prominently

### AI Background Removal Integration
- **Functionality**: Optional background removal before style application
- **Purpose**: Create clean stickers by isolating subjects
- **Trigger**: Toggle in image upload interface
- **Progression**: Upload image → Toggle "Remove background" → AI analyzes subject → Preview cleaned image → Apply style
- **Success criteria**: Fast processing (<3s), accurate detection, toggle to compare before/after

## Edge Case Handling

- **No Styles Match Filter**: Show empty state with "Clear filters" button
- **Extra Magic Disabled**: Panel collapses smoothly, no orphaned controls
- **Image Upload Errors**: Toast notifications for file size, type validation
- **AI Processing Failure**: Graceful fallback to original image with retry option
- **No Image Uploaded**: "Apply" button guides to upload tab instead
- **Rapid Toggle of Extra Magic**: Smooth animations prevent jarring state changes

## Design Direction

The design should evoke **confidence through visual clarity**. Users should immediately grasp the transformation flow through the example section, feel excited by strong style previews, and trust the system to handle complexity behind simple controls. The "Extra Magic" concept makes advanced features feel like bonuses rather than requirements.

## Color Selection

Vibrant creative palette that feels magical but not overwhelming, with strong contrast for CTAs.

- **Primary Color**: Deep Creative Teal `oklch(0.65 0.20 160)` - Represents transformation and innovation
- **Secondary Colors**: Soft Sky Blue `oklch(0.70 0.12 200)` for calm sections, Rich Purple `oklch(0.75 0.15 280)` for magical atmosphere
- **Accent Color**: Bright Cyan `oklch(0.75 0.15 200)` - High energy for CTAs and interactive elements
- **Foreground/Background Pairings**:
  - Background (Cool White `oklch(0.98 0.01 180)`): Dark text `oklch(0.15 0.02 240)` - Ratio 15.2:1 ✓
  - Primary (Creative Teal): White text `oklch(0.98 0.01 180)` - Ratio 5.1:1 ✓
  - Accent (Bright Cyan): Dark text `oklch(0.15 0.02 240)` - Ratio 9.3:1 ✓

## Font Selection

Clean modern typography that feels approachable and premium.

- **Primary Font**: Inter - Modern sans-serif for UI and body text
- **Accent Font**: JetBrains Mono - For technical specs and badges

- **Typographic Hierarchy**:
  - H1 (STIX MAGIC): Inter Bold / 56-72px / tight spacing / gradient treatment
  - H2 (Section Headers): Inter Bold / 32-48px / normal spacing
  - Body (Descriptions): Inter Regular / 16px / 1.5 line-height
  - Labels (Metadata): Inter Medium / 12px / uppercase / wide tracking
  - CTA Buttons: Inter Semibold / 16-18px / prominent size for conversions

## Animations

Purposeful motion that guides attention and builds confidence.

- **Example Transform Steps**: Staggered reveals with subtle pulse on final state
- **Style Card Entrance**: Cascade effect with 30ms delays
- **Card Hover**: Gentle lift (2% scale) with shadow expansion - invitation to explore
- **Detail Panel Open**: Smooth slide-in from right with elastic easing - feels premium
- **Extra Magic Toggle**: Height expansion animation when revealing controls
- **Preview Updates**: Cross-fade between states when energy/speed adjusted
- **Upload Success**: Satisfying scale-up confirmation

## Component Selection

- **Components**:
  - `Tabs` for Style/Upload navigation with custom styling
  - `Card` for style previews with gradient borders
  - `Sheet` for style detail panel (full-screen on mobile)
  - `Switch` for Extra Magic toggle
  - `Button` with gradient variant for primary CTAs
  - `Badge` for intensity levels, mask types, vibe tags
  - `motion` from framer-motion for all preview animations

- **Customizations**:
  - **ExampleTransformation**: Custom component showing 4-step transformation with symbols (○ △ ✧ ✦)
  - **StickerStyleCard**: Animated preview cards with live motion
  - **StyleDetailPanel**: Simplified panel with Extra Magic collapsed by default
  - Gradient text treatment on headings using `.gradient-text` utility
  - Mesh background using radial gradients for subtle depth

- **States**:
  - Style cards: default, hover (lift + glow), active (persistent glow)
  - Extra Magic toggle: off (controls hidden), on (smooth height expansion)
  - Apply button: default (gradient), hover (opacity shift), disabled (when no image)
  - Tab triggers: inactive (muted), active (primary with badge)

- **Icon Selection** (Phosphor Icons):
  - Sparkle (magic, primary actions)
  - Lightning (motion effects)
  - Funnel (filter/browse styles)
  - Image (upload tab)
  - Info (style breakdowns)
  - ArrowRight (transformation flow)

- **Spacing**:
  - Page padding: `px-6 md:px-8 lg:px-12`, `py-12 md:py-16`
  - Card grid gap: `gap-6`
  - Section spacing: `space-y-8` (tabs), `space-y-6` (detail panel)
  - Transformation example: `gap-6 md:gap-4` for responsive flow

- **Mobile**:
  - Tab list uses full width grid
  - Style cards go from 3-col (lg) → 2-col (md) → 1-col (sm)
  - Detail panel becomes full-screen Sheet on mobile
  - Example transformation stacks vertically with arrows hidden
  - All touch targets meet 44x44px minimum
