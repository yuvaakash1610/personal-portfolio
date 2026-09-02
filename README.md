<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=6,11,20&height=220&section=header&text=Personal%20Portfolio&fontSize=48&fontColor=ffffff&animation=fadeIn&fontAlignY=35&desc=React%20%C2%B7%20TypeScript%20%C2%B7%20Three.js%20%C2%B7%20Vite&descAlignY=55&descSize=18" width="100%"/>

<a href="https://kyuvaakash.vercel.app/">
  <img src="https://readme-typing-svg.demolab.com/?lines=A+3D+Interactive+Portfolio+Experience;Built+with+React+%2B+TypeScript+%2B+Vite;Powered+by+Three.js+%26+React+Three+Fiber;Glassmorphism+UI+%C2%B7+Scroll-Driven+Animations&font=Fira+Code&center=true&width=650&height=45&duration=3000&pause=800&color=6C63FF&vCenter=true&size=20" alt="Typing SVG" />
</a>

<br/>

<!-- ===================== LIVE / SOURCE BUTTONS ===================== -->

<a href="https://kyuvaakash.vercel.app/">
  <img src="https://img.shields.io/badge/🚀_LIVE_DEMO-000000?style=for-the-badge&logo=vercel&logoColor=white" />
</a>
<a href="https://github.com/yuvaakash1610/personal-portfolio">
  <img src="https://img.shields.io/badge/📂_SOURCE_CODE-181717?style=for-the-badge&logo=github&logoColor=white" />
</a>

<a href="https://github.com/yuvaakash1610/personal-portfolio/stargazers">
  <img src="https://img.shields.io/badge/⭐_STAR_IT-FFC107?style=for-the-badge&logo=starship&logoColor=white" />
</a>
<a href="https://github.com/yuvaakash1610/personal-portfolio/issues">
  <img src="https://img.shields.io/badge/🐛_REPORT_ISSUE-D93025?style=for-the-badge&logo=github&logoColor=white" />
</a>



</div>

<br/>

## 🪄 About This Project

A **3D, scroll-driven interactive portfolio** built with **React + TypeScript**, bundled by **Vite**, and rendered with **Three.js / React Three Fiber (R3F)**. Instead of a flat scrolling page, sections are presented as animated glassmorphism cards over a WebGL scene — a particle swarm core and floating 3D tech-icon objects react as the user scrolls.

Deployed live on **Vercel**.

### ⚙️ Notable Implementation Details

- 🌌 **WebGL 3D background** — a `MainCanvas` wrapper handles camera setup, with a particle-swarm core (`ParticleSwarmCore`) and floating tech-icon meshes (`FloatingTechObjects`) built in Three.js / R3F
- 🖱️ **Custom cursor** — comet-trail cursor effect (`CustomCursor`) instead of the default pointer
- 🪟 **Glassmorphism UI** — reusable `GlassCard` primitive used across every section
- 🎬 **Cyberpunk HUD loading screen** — sci-fi style preloader (`LoadingScreen`) before the scene mounts
- 🧭 **Scroll engine** — `ScrollSceneContext` drives section transitions with a 4-stage card animation as the user scrolls
- 🗂️ **5-layer overlay architecture** — `SectionWrapper` composes each section as a fixed-position layered card stack
- 📦 **Centralized content** — all copy (skills, projects, education, contact info) lives in one typed data file, `portfolioData.ts`, rather than scattered through components
- 🎨 **Design system** — global tokens, Tailwind config, and glass-panel rules centralized in `index.css`

---

## 📁 Repository Structure

```
personal-portfolio/
├── public/                        # Static public assets
│   ├── favicon.svg                # Site favicon icon
│   └── icons.svg                  # SVG sprite sheet
│
├── src/
│   ├── assets/                    # Static images & graphics
│   │   ├── hero.png                # Developer profile hero visual
│   │   ├── react.svg                # React framework logo
│   │   └── vite.svg                  # Vite build tool logo
│   │
│   ├── components/
│   │   ├── 3d/                     # Three.js / React Three Fiber scenes
│   │   │   ├── MainCanvas.tsx       # WebGL canvas wrapper & camera setup
│   │   │   ├── ParticleSwarmCore.tsx # Origin-centered algorithmic particle swarm
│   │   │   └── FloatingTechObjects.tsx # Animated floating 3D tech icons
│   │   │
│   │   ├── sections/                # Portfolio section cards
│   │   │   ├── HeroSection.tsx        # 01 — Hero intro & code terminal panel
│   │   │   ├── AboutSection.tsx        # 02 — Bio, capability grid & status cards
│   │   │   ├── SkillsSection.tsx        # 03 — Categorized engineering tech stack
│   │   │   ├── ProjectsSection.tsx       # 04 — Featured full-stack & AI/ML projects
│   │   │   ├── ExperienceSection.tsx      # 05 — Industry internship experience
│   │   │   ├── AchievementsSection.tsx     # 06 — Hackathons & milestones
│   │   │   ├── EducationSection.tsx         # 07 — B.E. CSE academic timeline
│   │   │   └── ContactSection.tsx            # 08 — Contact form & email links
│   │   │
│   │   └── ui/                      # Shared UI primitives & overlays
│   │       ├── CustomCursor.tsx        # Comet-trail cursor effect
│   │       ├── GlassCard.tsx            # Reusable glassmorphism card primitive
│   │       ├── LoadingScreen.tsx         # Cyberpunk HUD loading preloader
│   │       ├── Navbar.tsx                 # Fixed nav bar & mobile dropdown
│   │       ├── SectionWrapper.tsx          # 5-layer fixed-overlay card container
│   │       ├── SocialIcons.tsx              # SVG social link icons
│   │       └── UniverseIntroPrompt.tsx       # Landing swarm title & status overlay
│   │
│   ├── context/
│   │   └── ScrollSceneContext.tsx      # Section transitions & scroll animation engine
│   │
│   ├── data/
│   │   └── portfolioData.ts             # Central typed content source of truth
│   │
│   ├── App.tsx                          # Main app layout entrypoint
│   ├── App.css                          # Component-scoped styling
│   ├── index.css                        # Global design tokens, Tailwind & glass rules
│   └── main.tsx                         # React DOM root render entrypoint
│
├── index.html                    # Root HTML document
├── package.json                  # Dependencies (React, Three.js, Lucide, Tailwind, Vite)
├── package-lock.json             # Locked dependency tree
├── tsconfig.json                 # TypeScript compiler master config
├── tsconfig.app.json             # App TypeScript config
├── tsconfig.node.json            # Vite/node environment TypeScript config
├── vite.config.ts                # Vite bundler & HMR config
├── .oxlintrc.json                # Linter rules
└── .gitignore
```

---

## 🧰 Built With

<div align="center">

<img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black"/>
<img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white"/>
<img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white"/>
<img src="https://img.shields.io/badge/Three.js-000000?style=for-the-badge&logo=threedotjs&logoColor=white"/>
<img src="https://img.shields.io/badge/React_Three_Fiber-000000?style=for-the-badge&logo=three.js&logoColor=white"/>
<img src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white"/>
<img src="https://img.shields.io/badge/Lucide_Icons-F56565?style=for-the-badge&logo=lucide&logoColor=white"/>
<img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white"/>

</div>

---

## ✨ Features

<table align="center">
<tr>
<td width="33%" align="center">🌌<br/><b>3D WebGL Scene</b><br/>Particle swarm + floating tech-icon meshes via Three.js/R3F</td>
<td width="33%" align="center">🖱️<br/><b>Custom Cursor</b><br/>Comet-trail effect replacing the default pointer</td>
<td width="33%" align="center">🪟<br/><b>Glassmorphism UI</b><br/>Reusable glass-card component across all sections</td>
</tr>
<tr>
<td width="33%" align="center">🎬<br/><b>HUD Loading Screen</b><br/>Cyberpunk-style sci-fi preloader before the scene mounts</td>
<td width="33%" align="center">🧭<br/><b>Scroll-Driven Animation</b><br/>4-stage card transitions tied to scroll position</td>
<td width="33%" align="center">📱<br/><b>Responsive & Typed</b><br/>Fully typed with TypeScript, responsive across devices</td>
</tr>
</table>

---

## 📄 Section Overview

| # | Section | Component | Contents |
|---|---|---|---|
| 01 | Hero | `HeroSection.tsx` | Intro & code-terminal-style panel |
| 02 | About | `AboutSection.tsx` | Bio, capability grid & status cards |
| 03 | Skills | `SkillsSection.tsx` | Categorized engineering tech stack |
| 04 | Projects | `ProjectsSection.tsx` | Featured full-stack & AI/ML projects |
| 05 | Experience | `ExperienceSection.tsx` | Industry internship experience |
| 06 | Achievements | `AchievementsSection.tsx` | Hackathons & milestones |
| 07 | Education | `EducationSection.tsx` | B.E. CSE academic timeline |
| 08 | Contact | `ContactSection.tsx` | Contact form & email links |

---

## 🖥️ Getting Started Locally

<div align="center">
<img src="https://img.shields.io/badge/1-Clone_the_Repo-6C63FF?style=for-the-badge"/>
<img src="https://img.shields.io/badge/2-Install_Dependencies-6C63FF?style=for-the-badge"/>
<img src="https://img.shields.io/badge/3-Run_Dev_Server-6C63FF?style=for-the-badge"/>
</div>

```bash
# Clone this repository
git clone https://github.com/yuvaakash1610/personal-portfolio.git

# Move into the project folder
cd personal-portfolio

# Install dependencies
npm install

# Start the Vite dev server
npm run dev

# Build for production
npm run build
```

---

## 🚀 Deployment

This project auto-deploys to **Vercel** on every push to `main`. To deploy your own fork:

<div align="center">
<img src="https://img.shields.io/badge/1-Fork_this_repo-6C63FF?style=for-the-badge"/>
<img src="https://img.shields.io/badge/2-Import_to_Vercel-000000?style=for-the-badge&logo=vercel"/>
<img src="https://img.shields.io/badge/3-Deploy-2ea44f?style=for-the-badge"/>
</div>

---

## 📬 Connect With Me

<div align="center">

<a href="https://www.linkedin.com/in/yuvaakash-kannan-450751360">
  <img src="https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white" />
</a>
<a href="https://github.com/yuvaakash1610">
  <img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white" />
</a>

</div>

---

<div align="center">

⭐ **If you found this project useful or interesting, consider giving it a star!** ⭐

<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=6,11,20&height=120&section=footer" width="100%"/>

</div>
