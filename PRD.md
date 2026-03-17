# Planning Guide

A comprehensive sticker animation design system that provides motion presets for creative sticker artwork, enabling designers and users to bring static stickers to life with categorized, reusable animations.

**Experience Qualities**: 
1. **Playful** - Animations should feel whimsical and fun, sparking joy and creative expression
2. **Precise** - Each motion preset has clear parameters and predictable behavior for consistent results
3. **Expressive** - Wide range of emotional vibes from cute to techno, enabling diverse creative applications

**Complexity Level**: Light Application (multiple features with basic state)
This is a design specification viewer and animation preview tool with organized categories, filtering, and interactive previews - not requiring complex state management beyond selection and filtering.

## Essential Features

### Motion Preset Library Browser
- **Functionality**: Browse 20+ categorized motion presets with detailed specifications
- **Purpose**: Help creators discover and understand available animations for their stickers
- **Trigger**: User opens the application
- **Progression**: View category tabs → Browse presets in grid → Click preset card → See detailed specifications and preview
- **Success criteria**: All 20+ presets are visible, organized into 6 categories, with complete metadata

### Live Animation Preview
- **Functionality**: Interactive preview of each motion preset applied to sample sticker artwork
- **Purpose**: Enable creators to visualize how animations behave before applying them
- **Trigger**: User selects a motion preset card
- **Progression**: Click preset → Animation plays on sample sticker → Loop behavior demonstrates → User observes timing and intensity
- **Success criteria**: Smooth 60fps animations that accurately represent each preset's behavior

### Export Individual Presets
- **Functionality**: Download single preset in multiple formats (JSON, TypeScript, CSS, Framer Motion)
- **Purpose**: Allow developers to integrate presets into their own projects
- **Trigger**: User clicks export button in preset detail panel
- **Progression**: Open preset detail → Select export format → File downloads automatically → Toast notification confirms success
- **Success criteria**: Downloaded files contain properly formatted, ready-to-use code

### Bulk Export Library
- **Functionality**: Export all presets or filtered subset as JSON collection
- **Purpose**: Enable batch downloads for comprehensive integration
- **Trigger**: User clicks "Export All" button in header
- **Progression**: Click export → System bundles visible/filtered presets → JSON file downloads → Confirmation toast appears
- **Success criteria**: JSON array contains all selected presets with complete metadata

### Filter by Style System
- **Functionality**: Filter presets by sticker style (cute, neon, magic, techno, mascot)
- **Purpose**: Quickly find animations that match specific aesthetic requirements
- **Trigger**: User selects style filter buttons
- **Progression**: Click style badge → Grid filters to matching presets → Visual count updates → Reset to see all
- **Success criteria**: Instant filtering with visual feedback, showing only compatible presets

### Specification Detail Panel
- **Functionality**: Display comprehensive technical and creative specifications for selected preset
- **Purpose**: Provide creators with implementation details and usage guidance
- **Trigger**: User clicks on a preset card
- **Progression**: Select preset → Panel slides in → Shows all metadata (name, behavior, vibe, intensity, loop style, use cases, styles) → Visual preview plays → Export options available
- **Success criteria**: All specification fields populated with clear, actionable information

### Category Navigation
- **Functionality**: Quick navigation between 6 animation categories
- **Purpose**: Organize presets into logical groupings for efficient discovery
- **Trigger**: User clicks category tab
- **Progression**: Click category → View filters to category → Count badge updates → Presets display in grid
- **Success criteria**: Instant category switching with smooth transitions

### Custom Animation Playground
- **Functionality**: Interactive playground for testing and customizing motion parameters in real-time
- **Purpose**: Allow creators to experiment with animation timing, intensity, and behavior before implementation
- **Trigger**: User clicks "Playground" button in header or detail panel
- **Progression**: Open playground → Select preset as starting point → Adjust timing/scale/intensity controls → Preview changes live → Copy custom parameters
- **Success criteria**: Real-time parameter updates with smooth preview, exportable custom configurations

## Edge Case Handling

- **No Matching Filters**: Display empty state with friendly message and "Clear Filters" action
- **Export Errors**: Show error toast with helpful message if file download fails
- **Unsupported Export Formats**: Gracefully handle presets without CSS/Framer implementations by providing template comments
- **Slow Device Performance**: Animations gracefully degrade to simpler versions while maintaining visual intent
- **Mobile Touch**: All interactive elements have proper touch targets and gesture support
- **Rapid Category Switching**: Debounce filtering to prevent UI thrashing during fast clicks
- **Long Preset Names**: Text truncates elegantly with tooltips showing full content
- **Multiple Simultaneous Exports**: Queue exports to prevent browser blocking on bulk operations

## Design Direction

The design should evoke a sense of creative studio magic - vibrant, energetic, and inspiring. Think of a digital workshop where motion comes alive, blending playful charm with professional polish. The interface should feel like opening a toybox of delightful animations while maintaining clarity and usability.

## Color Selection

A vibrant, energetic palette that reflects the creative and playful nature of sticker culture with pops of neon and magical gradients.

- **Primary Color**: Deep Purple `oklch(0.45 0.18 300)` - Represents creativity, magic, and digital artistry
- **Secondary Colors**: Electric Blue `oklch(0.55 0.20 250)` for techno/digital vibes, Warm Pink `oklch(0.70 0.18 350)` for cute/playful elements
- **Accent Color**: Neon Cyan `oklch(0.75 0.15 200)` - High-energy highlight for interactive elements and motion indicators
- **Foreground/Background Pairings**: 
  - Background (Deep Slate `oklch(0.12 0.02 270)`): White text `oklch(0.98 0 0)` - Ratio 14.2:1 ✓
  - Primary (Deep Purple): White text `oklch(0.98 0 0)` - Ratio 6.8:1 ✓
  - Accent (Neon Cyan): Dark text `oklch(0.15 0.02 270)` - Ratio 8.5:1 ✓
  - Card (Elevated Dark `oklch(0.18 0.02 270)`): White text `oklch(0.98 0 0)` - Ratio 11.4:1 ✓

## Font Selection

Typography should balance playful creativity with technical precision, using modern geometric forms that feel both friendly and professional.

- **Primary Font**: Space Grotesk - Bold geometric sans-serif that feels modern, creative, and slightly quirky
- **Secondary Font**: JetBrains Mono - For technical specifications and code-like details, adding digital authenticity

- **Typographic Hierarchy**: 
  - H1 (Page Title): Space Grotesk Bold / 42px / tight letter-spacing (-0.02em) / gradient text effect
  - H2 (Category Headers): Space Grotesk Semibold / 28px / normal spacing
  - H3 (Preset Names): Space Grotesk Medium / 20px / slight tracking (0.01em)
  - Body (Descriptions): Space Grotesk Regular / 16px / 1.6 line-height
  - Labels (Metadata): Space Grotesk Medium / 14px / uppercase / wide tracking (0.08em)
  - Code (Technical Specs): JetBrains Mono Regular / 14px / monospace

## Animations

Animations should create moments of delightful discovery while serving functional purposes - reinforcing interactions, guiding attention to active presets, and bringing the motion library itself to life with subtle meta-animations.

- **Preset Card Hover**: Gentle lift with shadow expansion (200ms) and subtle scale (1.02x)
- **Category Tab Switch**: Smooth slide transition with fade (300ms ease-out)
- **Preset Selection**: Elastic pop-in for detail panel (400ms spring physics)
- **Filter Application**: Stagger animation for grid items (50ms delay between cards)
- **Preview Loop Indicator**: Pulsing glow around active preview area
- **Background Ambiance**: Slow-moving gradient mesh (30s loop) for magical atmosphere

## Component Selection

- **Components**: 
  - `Card` for preset containers with custom gradient borders
  - `Tabs` for category navigation with custom styling
  - `Badge` for intensity levels, styles, and metadata tags
  - `Dialog` or `Sheet` for detailed specification panel on mobile
  - `Scroll-Area` for long preset lists
  - `Separator` for visual section breaks
  - `Button` for filter toggles and actions
  - `Avatar` or custom component for animated sticker previews

- **Customizations**: 
  - Custom animated preview component using framer-motion
  - Gradient border cards with glow effects on hover
  - Custom tab indicator with sliding underline animation
  - Glassmorphic detail panel with backdrop blur

- **States**: 
  - Preset cards: default (subtle border), hover (glowing border + lift), active (strong glow)
  - Category tabs: inactive (muted), hover (slight glow), active (gradient underline + bright text)
  - Filter badges: unselected (outline), selected (filled with gradient), hover (scale + glow)
  - Preview animation: playing (visible loop indicator), paused (dimmed)

- **Icon Selection**: 
  - Sparkles (magic/particles)
  - Lightning (glitch/flash)
  - CircleNotch/Spinner (rotation/orbit)
  - Heart (pulse/heartbeat)
  - Crosshair (target/precision)
  - Eye (preview)
  - Funnel (filter)
  - X (clear/close)

- **Spacing**: 
  - Page padding: `p-6` (md: `p-8`, lg: `p-12`)
  - Card grid gap: `gap-4` (md: `gap-6`)
  - Internal card padding: `p-5`
  - Section spacing: `space-y-8`
  - Tag groups: `gap-2`

- **Mobile**: 
  - Stack category tabs horizontally with scroll on mobile
  - Grid shifts from 3 columns (lg) → 2 columns (md) → 1 column (sm)
  - Detail panel uses full-screen Sheet instead of side Dialog
  - Reduce preview size on mobile while maintaining animation clarity
  - Touch-friendly filter badges with larger tap targets (min 44x44px)
