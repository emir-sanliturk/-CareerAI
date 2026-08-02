---
name: Executive Precision
colors:
  surface: '#f7f9fb'
  surface-dim: '#d8dadc'
  surface-bright: '#f7f9fb'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f4f6'
  surface-container: '#eceef0'
  surface-container-high: '#e6e8ea'
  surface-container-highest: '#e0e3e5'
  on-surface: '#191c1e'
  on-surface-variant: '#45474c'
  inverse-surface: '#2d3133'
  inverse-on-surface: '#eff1f3'
  outline: '#75777d'
  outline-variant: '#c5c6cd'
  surface-tint: '#545f73'
  primary: '#091426'
  on-primary: '#ffffff'
  primary-container: '#1e293b'
  on-primary-container: '#8590a6'
  inverse-primary: '#bcc7de'
  secondary: '#006c49'
  on-secondary: '#ffffff'
  secondary-container: '#6cf8bb'
  on-secondary-container: '#00714d'
  tertiary: '#201100'
  on-tertiary: '#ffffff'
  tertiary-container: '#3c2300'
  on-tertiary-container: '#c88000'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d8e3fb'
  primary-fixed-dim: '#bcc7de'
  on-primary-fixed: '#111c2d'
  on-primary-fixed-variant: '#3c475a'
  secondary-fixed: '#6ffbbe'
  secondary-fixed-dim: '#4edea3'
  on-secondary-fixed: '#002113'
  on-secondary-fixed-variant: '#005236'
  tertiary-fixed: '#ffddb8'
  tertiary-fixed-dim: '#ffb95f'
  on-tertiary-fixed: '#2a1700'
  on-tertiary-fixed-variant: '#653e00'
  background: '#f7f9fb'
  on-background: '#191c1e'
  surface-variant: '#e0e3e5'
typography:
  display-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.25'
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.4'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: '1'
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1'
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 4px
  container-max: 1440px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 40px
  stack-sm: 8px
  stack-md: 16px
  stack-lg: 32px
---

## Brand & Style
The design system is engineered to function as a high-authority career partner. It prioritizes clarity, intelligence, and data-driven confidence. The aesthetic is a refined blend of **Modern Corporate** and **Minimalism**, stripping away superfluous decoration to focus entirely on user utility and career success metrics.

The target audience consists of ambitious professionals who require a tool that feels as serious as their career goals. The interface evokes a sense of "quiet competence"—reliable, stable, and highly organized. High-density information is handled through generous whitespace and a rigid systematic grid, ensuring that users feel empowered rather than overwhelmed.

## Colors
This palette is grounded in professional stability with high-intent accent colors for functional feedback.

- **Primary (Deep Career Blue):** Used for typography, navigation sidebars, and primary action buttons. It establishes the authoritative foundation of the design system.
- **Secondary (Success Emerald):** Reserved strictly for positive outcomes—match scores, completion states, and "optimal" indicators.
- **Tertiary (Warning Amber):** Dedicated to identifying gaps, missing skills, or areas requiring user attention. Use sparingly to maintain its urgency.
- **Neutral (Slate):** A tiered system of cool greys. The lightest shade (#F8FAFC) serves as the primary workspace background to reduce eye strain during long editing sessions.

## Typography
The typographic hierarchy uses a dual-font strategy. **Plus Jakarta Sans** provides a modern, slightly geometric character for headlines and score displays, lending a contemporary professional feel. **Inter** is utilized for all functional body text, labels, and data entries to ensure maximum legibility at small sizes and high-density layouts.

- Use **Display LG** for the primary match score percentage.
- Use **Headline LG/MD** for section titles within the resume builder.
- **Body MD** is the standard for resume content and job descriptions.
- **Label SM** should be used for metadata and help text.

## Layout & Spacing
The layout follows a **Fixed Grid** philosophy for the main content area, capped at 1440px, while utilizing a **Split-Pane** model for the core toolset. 

- **The Comparison View:** A 50/50 split on desktop. The left pane contains the Resume Editor; the right pane contains the Job Description analysis.
- **Grid:** A 12-column system with 24px gutters. 
- **Rhythm:** All margins and paddings must be multiples of 4px. Use `stack-md` (16px) for internal card padding and `stack-lg` (32px) for vertical spacing between major sections.
- **Responsive Behavior:** On tablet, the split-pane switches to a stacked vertical layout. On mobile, the Job Description analysis is hidden behind a floating toggle or tab bar.

## Elevation & Depth
This design system uses **Tonal Layers** supplemented by **Ambient Shadows** to create a structured hierarchy. 

- **Level 0 (Background):** Neutral Slate (#F8FAFC). No shadow.
- **Level 1 (Cards/Panes):** Pure White (#FFFFFF). Uses a very soft, diffused shadow: `0px 4px 20px rgba(30, 41, 59, 0.05)`. This creates a subtle lift without appearing "floaty."
- **Level 2 (Dropdowns/Modals):** Pure White (#FFFFFF). Uses a more defined shadow: `0px 10px 30px rgba(30, 41, 59, 0.12)`.
- **Insets:** Use a 1px border of `#E2E8F0` for secondary elements like input fields and inactive card states instead of shadows to maintain a clean, professional profile.

## Shapes
The shape language is "Soft-Professional." 

- **Standard Elements:** Buttons, input fields, and small cards use a **0.5rem (8px)** radius.
- **Large Containers:** Main editor panes and score overview cards use **1rem (16px)** radius to feel approachable.
- **Interactive Indicators:** Small progress indicators and chips use a full pill-shape (999px) to contrast against the structured grid of the resume.

## Components

- **Primary Buttons:** Solid Deep Career Blue with white text. 8px border radius. Hover state should be a slight darken or 0.9 opacity.
- **Secondary Buttons:** 1px border of Deep Career Blue with transparent background.
- **Gauge Charts:** Used for "Match Scores." Use a semi-circular stroke. The track is Neutral Slate (#F1F5F9) and the fill is Success Emerald. Place the percentage in Plus Jakarta Sans Bold in the center.
- **Skill Gap Cards:** Interactive cards with a 1px border. Use a small Warning Amber icon (exclamation) next to the missing skill name. Include a "Add to Resume" quick-action button on hover.
- **Progress Bars:** Thin 6px bars. Use Success Emerald for completion. Background track should be a very light tint of the primary color.
- **Split-Pane Editor:** The divider between CV and Job Description should be a draggable handle (2px wide Slate line) allowing the user to prioritize their focus area.
- **Input Fields:** 1px border (#E2E8F0). Focus state uses a 2px Deep Career Blue border. Labels are always positioned above the field in Inter Semi-bold.