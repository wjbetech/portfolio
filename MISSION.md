# Portfolio Website Mission Statement

## Mission

To build a truly personal, unique, and retro-themed portfolio website that is bold, minimalistic, and highly interactive. The site will serve as a living showcase of my work, personality, and creativity as a Software Engineer.

## Core Quirks & Features

1. **Motion & Interactivity:**

   - The site will feature lots of motion, transitions, and interactive elements to create a lively, engaging experience.

   - The overall feel should be fluid, with seamless transitions and delightful micro-interactions throughout.

   - Cute references to my cats should appear in playful, unexpected ways across the site.

2. **My Scottish Fold Cats as Characters:**

   - My two Scottish Fold cats will appear as recurring characters throughout the site:
     - **Maengy (맹):** Black and white tuxedo
     - **Ggong (꽁):** All white
   - They will be integrated into the design and UI as fun, animated mascots.

   - Cat-themed easter eggs, tooltips, or animations should be sprinkled throughout for personality.

3. **Interactive Multi-Tab Project Section:**

   - Projects will be showcased in a multi-tabbed, panel-based interface, allowing visitors to explore each project in detail with smooth transitions and interactive content.

   - This section should be the second main section of the site, immediately after the hero.

4. **Retro Theme (DaisyUI):**

   - The entire app will use DaisyUI's retro theme, enforced regardless of the user's system light/dark preference.

5. **Minimalism & Boldness:**
   - The design will be minimalistic (no shadows), with bold colors, strong typography, and a focus on clarity and fun.

## Page Structure

1. **Hero Section (Top):**

   - Bold, visually striking introduction with a picture of me.
   - Animated effects to highlight my tech stack.
   - Prominent, interactive call-to-action.

2. **Projects Section:**

   - Multi-tab/panel interface for exploring my projects in depth.
   - Each project panel is interactive and visually engaging.

3. **Contact & Career Section:**
   - Ways to get in touch, plus highlights of other features of my career.
   - May include a contact form, social links, and additional fun/cat-themed elements.

**Each section should occupy one full page in height, be fully responsive across all devices, and be built to accessibility standards.**

## Technical Foundations

- **Modern Tech Stack:** Vite, TypeScript, React, TailwindCSS, DaisyUI
- **Performance:** Fast, smooth, and responsive
- **Accessibility:** Usable by everyone
- **Open Source:** Clean, maintainable codebase

## Modern Portfolio Improvements for 2025

1. **Micro-Interactions & Delightful Animations:**  
   Subtle hover, tap, and scroll-triggered animations (using Framer Motion or Lottie) make the site feel alive and polished.

2. **Personalized 3D/Parallax Effects:**  
   Use 3D elements (Three.js, R3F) or parallax scrolling for depth and immersion, especially in hero or project sections.

3. **Live Demos & Interactive Sandboxes:**  
   Let users interact with your projects directly on the site (CodeSandbox embeds, live previews, or interactive widgets).

4. **Dark/Light/Custom Theme Toggle:**  
   Even with a retro base, offering a playful theme switcher (or color customizer) can boost engagement.

5. **AI-Powered Features:**

   - Smart search for projects/skills.
   - AI chatbot for Q&A about your experience or projects.
   - AI-generated project summaries or translations.

6. **Accessibility & Inclusivity:**

   - Full keyboard navigation, screen reader support, and high-contrast options.
   - Language toggles (as you’re planning) and even text-to-speech for key sections.

7. **Performance & Mobile Polish:**

   - Lightning-fast load times, optimized images, and smooth transitions.
   - Touch-friendly gestures and mobile-first layouts.

8. **Unique Personal Branding:**

   - Custom illustrations, mascots, or a signature animation.
   - Easter eggs or hidden features that reflect your personality.

9. **Social Proof & Testimonials:**

   - Carousel of testimonials, endorsements, or project collaborators.
   - Real-time GitHub/LinkedIn activity or badges.

10. **Blog or Thought Leadership Section:**

    - Share insights, tutorials, or case studies to show expertise and personality.

11. **Downloadable Resume & One-Click Contact:**

    - Easy access to your CV and a one-click “email me” or “book a call” button.

12. **Analytics & Feedback:**
    - Anonymous feedback form or emoji reactions for visitors to leave impressions.

---

## Current TODOs (as of August 13, 2025)

1. Fix the Hero section in full screen mode (currently sat too far down page, looks good on mobile though)
2. Redesign the SkillGlobe component to make it look more professional, cool, and unique
3. Build out the Projects descriptions for each application and ensure all items are deployed, working, and usable
4. Hook up the Contact component so that it actually works
5. Add a language toggle between English (en) and Korean (ko)
6. Get cat animations working properly

## Prioritized Next Tasks

1. Convert `Contact` from `h-screen` to `min-h-screen` (completed)
   - Prevent stacked full-height sections and avoid unexpected extra scrollbars.
2. Add keyboard navigation to the Projects bar (Arrow keys, Home/End)
   - Improve accessibility and expected tab behavior for keyboard users.
3. Enable safe hover/focus interactions for SkillGlobe pills
   - Add scale/glow on hover/focus while preserving globe drag (stopPropagation).
4. Tweak `Hero` forced height (`lg:h-screen` → `lg:min-h-screen` or remove)
   - Keep hero visually full without forcing exact viewport height on all devices.
5. Globe performance improvements
   - Lower geometry, pause render when offscreen, or throttle updates on mobile.
6. Small polish & accessibility improvements
   - Visible focus styles, aria-live for dynamic content, skip links, and other a11y fixes.

Status:

- Task 1 (Convert `Contact` → `min-h-screen`) completed.
