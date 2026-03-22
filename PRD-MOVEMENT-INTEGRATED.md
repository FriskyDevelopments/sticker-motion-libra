# STIX MAGIC — Movement-Integrated Style System

An animated sticker creation platform where every style is defined by its complete visual and motion personality — not as separate technical layers, but as unified living styles.

**Experience Qualities**: 
1. **Alive by Default** - Every style immediately communicates how it looks AND how it moves, creating instant desire
2. **Style-First Flow** - Movement is part of the style identity, not a separate configuration step
3. **Effortlessly Premium** - Users see complete animated results first, with optional light refinement available

**Complexity Level**: Light Application (multiple features with integrated state)
The system evolves from separate motion/mask configuration into a unified style-first experience where each style is a complete animated identity ready to apply.

## Core Product Shift

**From:** Pick mask → Pick motion → Configure → Apply
**To:** Pick style (with movement built-in) → Apply → Optionally enhance

Every style now ships with:
* Finish / edge behavior (mask type)
* Primary movement behavior (motion preset with speed/energy)
* Optional secondary movement
* Complete personality description
* Live animated preview

## Essential Features

### Unified Living Style Cards
- **Functionality**: Style cards show complete animated personalities combining mask + motion behavior
- **Purpose**: Users immediately understand the final result they'll get — the style feels alive
- **Trigger**: User lands on gallery
- **Progression**: See animated card → Style moves continuously → Movement personality visible → Mask type shown subtly → Click for details
- **Success criteria**: Every card animates with its native movement, showing the complete style identity

### Movement Personality Language
- **Functionality**: Each style describes its movement in simple, emotional language
- **Purpose**: Replace technical animation terms with feelings and vibes
- **Trigger**: Visible on card and detail panel
- **Progression**: User sees "Glows with gentle floating motion" not "breathing-glow animation + soft glow mask"
- **Success criteria**: Movement feels like part of the style personality, not a technical spec

### Style Detail Panel with Motion Preview
- **Functionality**: Large animated preview showing the complete style in motion
- **Purpose**: Build confidence in the style before applying to user image
- **Trigger**: Click any style card
- **Progression**: Open panel → See large animated preview → Movement personality displayed → Optional "extra magic" toggle for enhancement → Apply to image
- **Success criteria**: Preview animates continuously with style's native movement, detail panel feels premium and clear

### Extra Magic Enhancement System
- **Functionality**: Optional toggle to boost energy and adjust speed without technical complexity
- **Purpose**: Allow light customization without overwhelming users with configuration
- **Trigger**: Enable "Add extra magic ✧" toggle in detail panel
- **Progression**: Toggle on → Simple controls appear (Energy: Clean/Enhanced/Intense, Speed: Slow/Normal/Fast) → Preview updates instantly → Changes feel magical, not technical
- **Success criteria**: Enhancement feels like boosting magic, not adjusting parameters

### Movement Symbols in UI
- **Functionality**: Use branded symbols to communicate speed and state
- **Purpose**: Create visual shorthand for movement characteristics
- **Trigger**: Visible on cards and detail panels
- **Progression**: ◌ (slow/calm), △ (normal/balanced), ✧ (fast/energetic)
- **Success criteria**: Symbols feel elegant and meaningful, not arbitrary

### Integrated Speed & Energy Display
- **Functionality**: Show movement characteristics as part of style identity
- **Purpose**: Communicate the "feel" of the animation without technical jargon
- **Trigger**: Visible on style cards and detail panel
- **Progression**: Badge shows "medium • strong" or "slow speed" → User understands movement intensity → No need to configure
- **Success criteria**: Movement characteristics feel informative, not overwhelming

## Movement Integration Rules

### Every Style Includes

1. **Finish Type** (mask)
   - clean, soft, glow, or aura
   - Described as "edge behavior" not "mask type"

2. **Primary Motion**
   - breathing-glow, pulse-ring, bounce, wobble, etc.
   - With native speed (slow/normal/fast)
   - With native energy (soft/medium/strong)

3. **Movement Personality**
   - "Glows with gentle floating motion"
   - "Pulses with high-energy neon movement"
   - "Moves with cheerful bounce and wobble"

4. **Intensity Profile**
   - subtle, medium, or intense
   - Affects both visual and motion strength

### User-Facing Language

**Use:**
- Soft motion
- Floating energy
- Gentle pulse
- Electric movement
- Playful bounce
- Cosmic drift
- Glitch motion

**Avoid:**
- Animation preset
- Motion configuration
- Parameter adjustment
- Timeline settings

## Edge Case Handling

- **No Movement Visible**: If animation fails, show static preview with movement description still visible
- **Performance Issues**: Reduce animation complexity on lower-end devices while maintaining style identity
- **Conflicting Settings**: Extra magic multiplies base style behavior, never replaces it
- **Upload Before Style**: Allow image upload first, then style selection applies to uploaded image
- **Multiple Enhancement Changes**: Preview updates instantly as user adjusts extra magic settings

## Design Direction

The design should feel like every style is inherently alive — users should immediately sense movement personality from the cards themselves. Think "living style gallery" where each option pulses, glows, bounces, or shimmers with its own character, not "static presets with separate animation options."

## Color Selection

Colors should support the living, animated nature of styles with dynamic accents that feel energetic.

- **Primary Color**: Creative Purple `oklch(0.65 0.20 160)` - Represents transformation and magic
- **Secondary Colors**: Teal `oklch(0.70 0.12 200)` for calm styles, Purple Accent `oklch(0.75 0.15 280)` for magical vibes
- **Accent Color**: Neon Cyan `oklch(0.75 0.15 200)` - High-energy highlight for movement and magic
- **Foreground/Background Pairings**: 
  - Background `oklch(0.98 0.01 180)`: Dark text `oklch(0.15 0.02 240)` - Ratio 15.2:1 ✓
  - Primary: White text `oklch(0.98 0.01 180)` - Ratio 5.1:1 ✓
  - Accent: Dark text `oklch(0.15 0.02 240)` - Ratio 9.3:1 ✓

## Font Selection

Typography should feel dynamic but not chaotic, supporting the animated nature without competing with it.

- **Primary Font**: Inter - Clean, modern, supports the living interface
- **Secondary Font**: Lora - For conversion-focused headlines
- **Accent Font**: JetBrains Mono - For technical details when needed

- **Typographic Hierarchy**: 
  - H1 (Movement Personalities): Inter Bold / 14px / slight tracking / integrated into cards
  - H2 (Style Names): Inter Semibold / 20px / clear hierarchy
  - Movement Descriptions: Inter Regular / 14px / 1.5 line-height / subtle emphasis
  - Intensity Badges: Inter Medium / 12px / uppercase tracking

## Animations

Animations ARE the product — every style must feel alive and distinctive.

- **Card Animations**: Each card loops its native movement continuously — breathing, pulsing, bouncing, etc.
- **Detail Panel Preview**: Large-scale version of card animation shows full movement personality
- **Extra Magic Transitions**: Smooth multiplication of base movement when enhancement is enabled
- **Tab Switching**: Smooth crossfade when switching between Preview and Your Image tabs
- **Enhancement Controls**: Instant preview updates when adjusting energy or speed

## Component Selection

- **Components**: 
  - Custom `StickerStyleCard` with integrated motion display
  - Custom `StyleDetailPanel` emphasizing movement personality
  - `Tabs` for Preview / Upload switching
  - `Switch` for Extra Magic toggle
  - `Badge` for intensity, speed, and energy display
  - `Button` with gradient for primary CTAs

- **Customizations**: 
  - **StickerStyleCard**: Shows live looping animation with movement personality text
  - **StyleDetailPanel**: Large animated preview with movement-first language
  - Extra Magic enhancement system with simple Clean/Enhanced/Intense and Slow/Normal/Fast controls
  - Speed symbols (◌ △ ✧) integrated into badges

- **States**: 
  - Style cards animate continuously in their native motion
  - Hover enhances animation slightly without breaking character
  - Extra Magic multiplies base animation intensity and adjusts speed
  - Preview updates instantly when enhancement settings change

- **Icon Selection**: 
  - Sparkle (✦ ✧) for magic and movement
  - Info for style breakdowns
  - Sliders for Extra Magic controls
  - Speed symbols (◌ △ ✧) for motion characteristics

- **Spacing**: 
  - Card internal padding: `p-5` for movement personality text
  - Movement description: visible on card, not hidden
  - Detail panel sections: `space-y-8` for clear hierarchy
  - Badge groups: `gap-2` for speed/energy display

- **Mobile**: 
  - Animations scale appropriately for mobile performance
  - Movement personality text remains visible and legible
  - Extra Magic controls remain touch-friendly
  - Detail panel uses full-screen on mobile for immersive animated preview

## Style Examples

### Dream Glow
- **Mask**: Glow Edge (luminous edges with outer glow)
- **Motion**: Breathing Glow (slow, soft)
- **Movement Personality**: "Glows with gentle floating motion"
- **Tags**: Dreamy • Soft • Magical
- **Intensity**: subtle

### Neon Pulse
- **Mask**: Glow Edge (luminous edges with outer glow)
- **Motion**: Pulse Ring (normal, strong)
- **Movement Personality**: "Pulses with high-energy neon movement"
- **Tags**: Electric • Bold • Modern
- **Intensity**: intense

### Mascot Bounce
- **Mask**: Soft Edge (gentle feathered edges)
- **Motion**: Bounce (normal, medium)
- **Movement Personality**: "Moves with cheerful bounce and wobble"
- **Tags**: Playful • Happy • Cute
- **Intensity**: medium

### Cosmic Drift
- **Mask**: Aura Edge (diffused atmospheric halo)
- **Motion**: Orbit + Cloud Drift (slow, medium)
- **Movement Personality**: "Drifts with particle trail"
- **Tags**: Space • Smooth • Flowing
- **Intensity**: medium

### Glitch Pop
- **Mask**: Clean Cut (sharp sticker cut)
- **Motion**: RGB Glitch (fast, strong)
- **Movement Personality**: "Glitch jump with RGB distortion"
- **Tags**: Glitch • Digital • Bold
- **Intensity**: intense

## Final UX Flow

1. **Land on gallery** → See animated style cards
2. **Browse styles** → Each moves with its personality
3. **Click style** → Detail panel opens with large animated preview
4. **Read movement personality** → "Glows with gentle floating motion"
5. **Optional: Enable extra magic** → Boost energy or adjust speed
6. **Apply to image** → Upload or use existing
7. **Optional: Refine edge** → AI background removal
8. **Create sticker** → Final animated result

The whole experience should feel like:
**Pick a living style → see it move → apply it → done**

Not:
**Pick static look → configure motion separately → assemble parts**
