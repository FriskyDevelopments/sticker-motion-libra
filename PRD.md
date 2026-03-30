# Planning Guide

A modular sticker magic system that transforms from a simple preset gallery into a scalable library capable of producing 200+ polished style outcomes through intelligent combination of base styles, overlays, motion behaviors, loaders, and size profiles.

**Experience Qualities**: 
1. **Modular & Scalable** - A design system where components combine to create vast variety without chaos
2. **Layered Magic** - Users understand base styles, then discover how overlays and motions multiply possibilities
3. **Systematically Delightful** - Every combination feels intentional, branded, and premium rather than random

**Complexity Level**: Complex Application (advanced functionality with multiple interconnected systems)
This is a multi-layered magic engine with a style library, combo logic, loader system, overlay effects, and size profiles - requiring sophisticated architecture to maintain coherence at scale.

## Architecture Summary

The system produces 200+ style outcomes through modular combination:

- **50 base styles** across 10 families (neon, magic, cute, techno, mascot, glitch, dreamy, cosmic, soft-glow, energy)
- **25 motion behaviors** organized into 6 categories
- **20 overlay effects** across 5 families
- **20 branded loaders** for 5 processing stages
- **6 size/format profiles** for different platforms

**Combo Engine:** Validates and generates combinations using compatibility rules, preventing chaotic randomness while enabling vast variety.

## Essential Features

### Unified Sticker Style Gallery
- **Functionality**: Browse 20 complete sticker styles combining mask + motion into single conversion-ready experiences
- **Purpose**: Show users the final result they'll get, not abstract technical components
- **Trigger**: User opens the application
- **Progression**: Land on gallery → See live animated sticker previews → Each card shows final result with emoji preview → Click to explore details
- **Success criteria**: All 20 unified styles visible with animated previews showing complete final output

### Vibe-Based Category Navigation
- **Functionality**: Organize styles into 4 emotional/aesthetic vibes rather than technical categories
- **Purpose**: Help users think in terms of desired outcome ("I want magic effects") not technical specs
- **Trigger**: User browses tab navigation
- **Progression**: View vibe tabs (Magic Effects, Energy & Tech, Character Motion, Atmosphere) → Select vibe → Grid filters to matching styles → Visual count updates
- **Success criteria**: Instant filtering with styles grouped by emotional outcome and visual aesthetic

### Live Animated Style Cards
- **Functionality**: Each card shows the complete sticker transformation with live looping animation
- **Purpose**: Users see the "after" state immediately - desire is created before technical understanding
- **Trigger**: Cards auto-animate on page load
- **Progression**: Card appears → Emoji animates with full style applied → User sees mask + motion combined → Conversion pitch visible → Click for details
- **Success criteria**: Smooth 60fps animations showing complete final result, not abstract motion behavior

### Conversion-Focused Detail Panel
- **Functionality**: Expanded view emphasizing "Apply to My Image" CTA with style breakdown as secondary info
- **Purpose**: Move users from inspiration to action - the details support the conversion, not the other way around
- **Trigger**: User clicks any style card
- **Progression**: Click card → Sheet opens with large animated preview → Conversion pitch prominent → Main CTA "Apply to My Image" → Optional: view breakdown of mask + motion used → Export style
- **Success criteria**: CTA is primary focus, technical details available but not blocking conversion

### Intensity Filtering
- **Functionality**: Filter styles by visual intensity (subtle, medium, intense) rather than technical parameters
- **Purpose**: Match user's mood and use case without requiring technical knowledge
- **Trigger**: User clicks intensity filter buttons
- **Progression**: Click intensity → Grid filters instantly → Visual count updates → Combine with vibe filters → Reset option available
- **Success criteria**: Instant filtering showing only matching intensity levels

### Mask Type Filtering
- **Functionality**: Filter styles by the mask effect type (Soft Edge Glow, Hard Cutout, Gradient Fade, etc.)
- **Purpose**: Allow users to find styles with specific visual edge treatments and masking techniques
- **Trigger**: User clicks mask filter buttons
- **Progression**: Click mask type → Grid filters to matching styles → Counts update → Combine with other filters → Clear all filters available
- **Success criteria**: Instant filtering showing only styles with selected mask types

### Pagination
- **Functionality**: Break style gallery into pages of 9 items per page for easier browsing
- **Purpose**: Improve performance and reduce cognitive load when browsing large style collections
- **Trigger**: Automatic when more than 9 filtered styles exist
- **Progression**: View page 1 → Click page number or next/previous → Grid updates → Scroll to top → Navigate between pages
- **Success criteria**: Smooth page transitions with disabled states on boundary pages (first/last)

### Style Export System
- **Functionality**: Download individual styles or full library as JSON for developer implementation
- **Purpose**: Bridge inspiration → technical implementation for developers who want to build these effects
- **Trigger**: Export button in detail panel or header
- **Progression**: Select export → JSON file downloads with complete style spec (mask type + motion ID + parameters) → Toast confirmation
- **Success criteria**: Downloaded JSON contains all necessary information to recreate the style

### Image Upload & Application
- **Functionality**: Upload user images and preview styles applied to them
- **Purpose**: Enable users to see how selected styles will look on their own images
- **Trigger**: "Upload your image" button in detail panel or "Your Image" tab
- **Progression**: Click upload → Select image file or drag & drop → Preview uploaded image → Style animation overlays on image → Adjust extra magic if desired → Download styled sticker
- **Success criteria**: Smooth drag-and-drop upload, image validation (max 10MB, image formats only), live preview with selected style animation overlay, clear visual feedback

### AI-Powered Background Removal ✦
- **Functionality**: Automatically remove backgrounds from uploaded images using AI before applying sticker styles
- **Purpose**: Create clean, professional stickers by isolating subjects from their backgrounds
- **Trigger**: Toggle "Remove background" switch after image upload
- **Progression**: Upload image → Toggle background removal → AI analyzes subject → Edge detection algorithm isolates subject → Preview cleaned image with transparent background → Apply style → Download sticker with clean cutout
- **Success criteria**: AI processing completes within 5 seconds, accurate subject isolation using edge detection, smooth toggle on/off to compare original vs removed background, branded loading state with magic wand icon, automatic reprocessing when toggle changes, seamless integration with existing transformation workflow

### Animation Playground (Retained)
- **Functionality**: Experimental space for tweaking motion parameters in real-time
- **Purpose**: Advanced users can customize intensity, timing, and behavior before applying
- **Trigger**: "Playground" button in header or detail panel
- **Progression**: Open playground → Select style as base → Adjust controls → Preview changes live → Export custom parameters
- **Success criteria**: Real-time parameter updates with smooth preview

## Edge Case Handling

- **No Matching Filters**: Display empty state with friendly message and "Clear Filters" action
- **Export Errors**: Show error toast with helpful message if file download fails
- **Rapid Filter Switching**: Debounce to prevent UI thrashing during fast interactions
- **Mobile Touch**: All cards and CTAs have proper touch targets (min 44x44px) for mobile conversion
- **Animation Performance**: Stagger card animations on load to prevent simultaneous rendering lag
- **Long Style Names**: Text truncates elegantly without breaking layout
- **Missing Emoji Support**: Fallback to colored circle if emoji doesn't render
- **Image Upload Errors**: File size validation (max 10MB), image format validation, clear error messages
- **No Image Uploaded**: Show "Upload your image" CTA instead of "Create sticker" when no image present
- **Large Image Files**: Compress or warn when image exceeds recommended size for optimal performance
- **Drag & Drop Outside Zone**: Ignore drops outside upload area, prevent page navigation on accidental drops
- **AI Background Removal Failure**: Gracefully handle AI errors with fallback to original image and retry option
- **Processing Timeout**: Show timeout message if AI takes longer than expected, allow user to continue with original
- **No Subject Detected**: If AI cannot detect a clear subject, inform user and suggest manual cropping or using original

## Design Direction

The design should evoke a sense of immediate desire and magical possibility - users should feel like they've discovered a secret workshop where they can transform any image into something extraordinary. Think conversion-focused product gallery meets creative playground, with the emphasis on showing finished results that make users think "I need that for my sticker" before understanding how it works.

## Color Selection

A vibrant, energetic palette that reflects creative transformation and digital magic, with bold accents that drive conversion actions.

- **Primary Color**: Deep Creative Purple `oklch(0.65 0.20 160)` - Represents creative transformation and innovation
- **Secondary Colors**: Soft Teal `oklch(0.70 0.12 200)` for calm professional touches, Warm Accent Purple `oklch(0.75 0.15 280)` for magic and atmosphere vibes
- **Accent Color**: Neon Cyan `oklch(0.75 0.15 200)` - High-energy highlight for CTAs, interactive elements, and conversion-focused UI
- **Foreground/Background Pairings**: 
  - Background (Soft Cool White `oklch(0.98 0.01 180)`): Dark text `oklch(0.15 0.02 240)` - Ratio 15.2:1 ✓
  - Primary (Creative Purple): White text `oklch(0.98 0.01 180)` - Ratio 5.1:1 ✓
  - Accent (Neon Cyan): Dark text `oklch(0.15 0.02 240)` - Ratio 9.3:1 ✓
  - Card (Bright White `oklch(0.99 0.005 180)`): Dark text `oklch(0.15 0.02 240)` - Ratio 16.1:1 ✓

## Font Selection

Typography should balance approachable creativity with modern polish - friendly enough to inspire but professional enough to trust with your images.

- **Primary Font**: Inter - Clean, modern sans-serif that feels professional yet approachable
- **Secondary Font**: Lora - Elegant serif for conversion-focused headlines and pitch copy
- **Accent Font**: JetBrains Mono - For technical details, JSON exports, and developer-focused content

- **Typographic Hierarchy**: 
  - H1 (App Title): Inter Bold / 48-60px / tight letter-spacing (-0.01em) / gradient text effect
  - Conversion Pitch (Style Cards): Lora Medium / 14px / normal spacing / emphasis color
  - H3 (Style Names): Inter Semibold / 20px / slight tracking (0.005em)
  - Body (Descriptions): Inter Regular / 16px / 1.5 line-height
  - Labels (Metadata): Inter Medium / 12px / uppercase / wide tracking (0.06em)
  - CTA Buttons: Inter Semibold / 16px / normal spacing
  - Code/Tech Specs: JetBrains Mono Regular / 13px / monospace

## Animations

Animations create moments of discovery and delight while serving the conversion goal - every motion reinforces that these styles are alive, ready to transform images, and worth choosing.

- **Style Card Entrance**: Staggered fade-up (30ms delay between cards) to create flowing reveal
- **Card Hover**: Gentle lift (2% scale) with accent-colored shadow expansion (200ms) - tactile invitation to click
- **Style Preview Loop**: Continuous animation matching the actual motion behavior - this IS the product
- **Vibe Tab Switch**: Smooth content crossfade (250ms) with minimal layout shift
- **Detail Panel Open**: Elastic slide-in from right (400ms spring physics) - feels substantial and premium
- **CTA Button Hover**: Subtle gradient shift and scale (1.02x) to emphasize conversion action
- **Background**: Slow-moving radial gradient mesh (60s loop) for magical atmosphere without distraction

## Component Selection

- **Components**: 
  - `Card` for style containers with custom gradient borders and hover effects
  - `Tabs` for vibe navigation with custom styling emphasizing categories
  - `Badge` for intensity levels, tags, and metadata
  - `Sheet` for style detail panel (mobile-responsive full-screen on small viewports)
  - `Button` with gradient variant for primary CTAs ("Apply to My Image")
  - `Separator` for visual section breaks in detail panel
  - `Scroll-Area` for detail panel content overflow

- **Customizations**: 
  - **StickerStyleCard**: Custom component showing unified mask+motion result with live animation
  - **StyleDetailPanel**: Conversion-focused sheet with prominent CTA and secondary technical breakdown
  - Gradient border cards with color-coded vibe accents
  - Live emoji animations using framer-motion for authentic preview
  - Conversion pitch text with elevated typography (serif font for impact)

- **States**: 
  - Style cards: default (subtle border), hover (glowing accent border + lift + shadow), active (strong glow retained)
  - Vibe tabs: inactive (muted), hover (slight accent glow), active (bold with colored badge)
  - Intensity filters: unselected (outline), selected (filled primary), hover (scale + glow)
  - CTA Button: default (gradient), hover (opacity shift + scale), active (pressed state), disabled (muted + cursor not-allowed)
  - Preview animation: continuous loop (infinite repeat with proper easing)

- **Icon Selection**: 
  - MagicWand (app icon - represents transformation)
  - Sparkle (magic/atmosphere vibes)
  - Lightning (energy/tech vibes)
  - Funnel (filters)
  - X (clear filters)
  - Sliders (playground)
  - DownloadSimple (export)
  - CheckCircle (best use cases)
  - Info (technical details)

- **Spacing**: 
  - Page padding: `p-6` (md: `p-8`, lg: `p-12`)
  - Card grid gap: `gap-4` (md: `gap-6`)
  - Card internal padding: `p-6`
  - Section spacing: `space-y-6`
  - Detail panel sections: `space-y-4`
  - Tag groups: `gap-1.5`

- **Mobile**: 
  - Vibe tabs scroll horizontally on mobile with snap-scroll behavior
  - Grid shifts from 3 columns (lg) → 2 columns (md) → 1 column (sm)
  - Detail panel uses full-screen Sheet on mobile for immersive experience
  - CTA buttons remain fixed-size and prominent (no size reduction)
  - Card previews scale to maintain animation clarity
  - Touch targets all meet 44x44px minimum for conversion-critical buttons
