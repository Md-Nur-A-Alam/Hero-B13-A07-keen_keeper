# PH B13 A07 Project: KeenKeeper
# Prepared By       : Md. Nur A Alam

> **A Personal Friendship Relationship Manager** — track, log, and analyze the connections that matter most.

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-App_Router-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-Context_API-61DAFB?style=for-the-badge&logo=react)
![JavaScript](https://img.shields.io/badge/JavaScript-JSX-F7DF1E?style=for-the-badge&logo=javascript)
![TailwindCSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css)
![DaisyUI](https://img.shields.io/badge/DaisyUI-Component_Library-5A0EF8?style=for-the-badge)
![Recharts](https://img.shields.io/badge/Recharts-Analytics-22B5BF?style=for-the-badge)

[![Live Demo](https://img.shields.io/badge/🚀_Live_Demo-Vercel-000000?style=for-the-badge&logo=vercel)](https://hero-b13-a07-keen-keeper.vercel.app)

</div>

> 🌐 **Live:** [hero-b13-a07-keen-keeper.vercel.app](https://hero-b13-a07-keen-keeper.vercel.app)

---

## 📖 Overview

**KeenKeeper** is a fully client-side Personal Relationship Manager (PRM) designed for individuals who want to stay intentional about their friendships. Browse a curated friend list, view detailed profiles with contact metrics, and log every Call, Text, or Video interaction — all visualized through a live analytics dashboard.

> ⚡ No backend. No database. All state lives in React Context for the duration of your browser session.

---

## ✨ Key Features

### 🗂️ Interaction Logging & Global Context
Log **Call**, **Text**, or **Video** interactions directly from a friend's profile page. Each interaction is captured with the friend's name, action type, date, and timestamp — instantly pushed into a global `actionList` via React Context. A `react-toastify` notification confirms every logged event in real time.

**Files:** `src/provider/ContextProvider.jsx` · `src/app/friends/[friendId]/page.jsx`

---

### 📊 Friendship Analytics — Recharts Pie Chart
The **Stats** page reads from `actionList` in Context, tallies interactions by type, and renders a responsive **Recharts donut chart** with distinct segments for Call, Text, and Video. When no interactions exist, a polished `<NoData>` empty-state component is shown instead.

**Files:** `src/app/stats/page.jsx` · `src/components/NoData/NoData.jsx`

---

### 🎨 Animated 404 Page
Unmatched routes deliver a fully interactive 404 experience featuring:
- **Canvas particle system** rendered with `useRef` + `useEffect`
- **CSS glitch/shimmer** text animation on the "404" number
- **Orbiting ring** and **mouse-parallax** effects
- **Floating emoji particles** and a **glassmorphism CTA card**

**File:** `src/app/not-found.jsx`

---

## 🛠️ Technology Stack

| Technology | Role |
|---|---|
| **Next.js** | App Router framework · SSR/SSG · routing · image optimisation |
| **React** | Component model · Context API for global state |
| **JavaScript (JSX)** | Primary language (no TypeScript) |
| **Tailwind CSS** | Utility-first styling via `@import "tailwindcss"` |
| **DaisyUI** | Tailwind component plugin — `btn`, `navbar`, `card`, `stat`, etc. |
| **Recharts** | Donut pie chart on the Stats page |
| **react-icons** | Icon sets — `IoHomeOutline`, `RiTimeLine`, `TbFaceIdError`, etc. |
| **lucide-react** | Icons on the friend detail page — `Phone`, `Video`, etc. |
| **react-toastify** | Toast notifications on interaction events |
| **ESLint** | Linting via `eslint-config-next` |
| **babel-plugin-react-compiler** | React Compiler Babel plugin (`reactCompiler: true` in `next.config`) |

**Deployment Target:** Vercel (implied by Next.js; no adapter configured)  
**State Management:** `FriendContext` in `ContextProvider.jsx`  
**Data Source:** `public/friends.json` (static JSON)

---

## 🏗️ Architecture

```
Browser
│
├── Navbar (sticky, active-link via usePathname)
│
├── [Route Segments — App Router]
│   │
│   ├── /  →  /home/page.jsx  (SSG Server Component)
│   │           ├── HeroBanner  (hardcoded stats, Server)
│   │           └── Friends     (async Server Component, JSON import)
│   │                 └── FriendCard × 12  (Server, links to /friends/[id])
│   │
│   ├── /friends/[friendId]/page.jsx  (CSR 'use client')
│   │           ├── reads params via use(params)
│   │           ├── fetches /friends.json client-side
│   │           └── calls handleClickEventForCallTextVideo → Context
│   │
│   ├── /timeline/page.jsx  (CSR 'use client')
│   │           ├── reads actionList from FriendContext
│   │           ├── useMemo sort + filter
│   │           └── TimeLineCard × N  |  NoData (if empty)
│   │
│   ├── /stats/page.jsx  (CSR 'use client')
│   │           ├── reads actionList from FriendContext
│   │           └── Recharts PieChart  |  NoData (if empty)
│   │
│   └── /*  →  not-found.jsx  (CSR 'use client', canvas + CSS animations)
│
├── Footer
│
└── Global State
      └── ContextProvider (FriendContext)
            ├── actionList: InteractionEntry[]
            └── handleClickEventForCallTextVideo(friend, action_type)
```

### Data Flow

```
public/friends.json ──import──►  Friends component  (build time)
public/friends.json ──fetch()──► /friends/[friendId] (runtime, client)
User interaction    ──────────►  ContextProvider  ──► /timeline + /stats
```

---

## 🧩 Component Inventory

| Component | File Path | Type | Responsibility |
|---|---|---|---|
| `RootLayout` | `src/app/layout.js` | Server | HTML shell · font · Navbar · Footer · ContextProvider · ToastContainer |
| `HomePage` | `src/app/home/page.jsx` | Server (async) | Composes HeroBanner + Friends |
| `HomeLoading` | `src/app/home/loading.jsx` | Server | Suspense skeleton + custom spinner |
| `FriendDetailsPage` | `src/app/friends/[friendId]/page.jsx` | **Client** | Friend view · fetch + stats + CTA buttons |
| `TimelinePage` | `src/app/timeline/page.jsx` | **Client** | Sorted, filtered interaction log |
| `StatsPage` | `src/app/stats/page.jsx` | **Client** | Recharts donut chart of interaction types |
| `NotFound` | `src/app/not-found.jsx` | **Client** | Animated 404 · canvas · CSS glitch · parallax |
| `Navbar` | `src/components/Navbar/Navbar.jsx` | **Client** | Sticky nav · active-link highlighting · mobile dropdown |
| `HeroBanner` | `src/components/HeroBanner/HeroBanner.jsx` | Server | Hero section with hardcoded stat cards |
| `Friends` | `src/components/Friends/Friends.jsx` | Server (async) | Renders FriendCard grid from imported JSON |
| `FriendCard` | `src/components/Friends/FriendCard/FriendCard.jsx` | Server | Single friend card · links to detail page |
| `TimeLineCard` | `src/components/TimelineCard/TimeLineCard.jsx` | Server | Single timeline entry with icon · name · date · time |
| `NoData` | `src/components/NoData/NoData.jsx` | Server | Empty-state UI with error icon and message |
| `Footer` | `src/components/Footer/Footer.jsx` | Server | Brand footer with social + policy links |
| `ContextProvider` | `src/provider/ContextProvider.jsx` | **Client** | Global state: `actionList` + `handleClickEventForCallTextVideo` |

---

## 🗺️ Routing Strategy

**Router:** Next.js App Router (v13+)

| Route | File | Rendering | Description |
|---|---|---|---|
| `/` | `src/app/page.js` | CSR | Root — delegates to `/home/page.jsx` |
| `/home` | `src/app/home/page.jsx` | **SSG** | Landing page: HeroBanner + Friends grid |
| `/friends/[friendId]` | `src/app/friends/[friendId]/page.jsx` | **CSR** | Friend detail view · reads `params.friendId` via `use(params)` |
| `/timeline` | `src/app/timeline/page.jsx` | **CSR** | Filterable list of logged interactions from Context |
| `/stats` | `src/app/stats/page.jsx` | **CSR** | Donut pie chart of Call / Text / Video counts |
| `/*` (unmatched) | `src/app/not-found.jsx` | **CSR** | Animated 404 page — catches all unknown routes |
| `/home` (loading) | `src/app/home/loading.jsx` | Server | Suspense fallback skeleton during navigation |

---

## 📁 Project Structure

```
src/
├── app/
│   ├── layout.js                        # RootLayout — global shell
│   ├── page.js                          # Root redirect → /home
│   ├── home/
│   │   ├── page.jsx                     # HomePage (SSG)
│   │   └── loading.jsx                  # Suspense skeleton
│   ├── friends/
│   │   └── [friendId]/
│   │       └── page.jsx                 # Friend detail (CSR)
│   ├── timeline/
│   │   └── page.jsx                     # Timeline (CSR)
│   ├── stats/
│   │   └── page.jsx                     # Stats / Analytics (CSR)
│   └── not-found.jsx                    # Animated 404 (CSR)
│
├── components/
│   ├── Navbar/Navbar.jsx
│   ├── HeroBanner/HeroBanner.jsx
│   ├── Footer/Footer.jsx
│   ├── Friends/
│   │   ├── Friends.jsx
│   │   └── FriendCard/FriendCard.jsx
│   ├── TimelineCard/TimeLineCard.jsx
│   └── NoData/NoData.jsx
│
└── provider/
    └── ContextProvider.jsx              # Global FriendContext
```

---

## ⚙️ Global State

**Context:** `FriendContext` — provided by `ContextProvider.jsx`

```js
// Shape of a single interaction entry
{
  friendName: string,
  actionType: "Call" | "Text" | "Video",
  date: string,   // e.g. "2024-05-12"
  time: string    // e.g. "14:32"
}
```

**Exposed values:**

| Value | Type | Description |
|---|---|---|
| `actionList` | `InteractionEntry[]` | All logged interactions for the session |
| `handleClickEventForCallTextVideo` | `(friend, action_type) => void` | Logs an interaction + fires a toast notification |

---

<div align="center">

Built with ❤️ using **Next.js** · **React** · **Tailwind CSS** · **Recharts**

</div>