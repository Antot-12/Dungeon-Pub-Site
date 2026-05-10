# Dungeon Pub - Website 🏰🍺

This is the official website for the Dungeon Pub, a fantasy-themed pub for gamers and adventurers in Bratislava, Slovakia. Built with modern web technologies and designed for an immersive user experience.

## ✨ Features

### 🏠 **Homepage**
- Welcoming hero section with fantasy-themed design
- Features overview with animated icons
- Opening hours display with decorative elements
- Interactive location map with Google Maps integration
- Partners and sponsors section
- Google Reviews integration with 5-star reviews display
- Smooth scroll animations and parallax effects

### 🍺 **Menu**
- **Interactive Digital Menu:**
  - Comprehensive drink and food menu with categories
  - Color-coded categories (Beer, Wine, Spirits, Cocktails, etc.)
  - Volume indicators and pricing
  - Accordion-style navigation for easy browsing
  - Enhanced typography and spacing
- **Photo Menu:**
  - Visual menu with high-quality images
  - Lightbox view for enlarged photos
  - Swipe navigation on mobile
  - Keyboard navigation support

### 📅 **Events Page**
- **Advanced Event Management:**
  - Real-time Facebook events integration
  - Filter events by type (Quizzes, Tournaments, RPG, Comedy, Music)
  - Search functionality across event names and descriptions
  - Event type badges with color coding
  - Status indicators (Today, Upcoming, Past)
  - Live countdown timer for next event
  - List and Grid view modes
  - Past events archive
  - Animated entrance for event cards
  - Enhanced hover effects and transitions

### 🖼️ **Gallery**
- **Masonry/Pinterest-style layout** with dynamic grid
- **Infinite scroll** - loads images progressively
- **Advanced Lightbox:**
  - Smooth crossfade transitions between photos
  - Fullscreen mode (press F or click button)
  - Image counter (e.g., "3 / 24")
  - Keyboard navigation (arrows, escape)
  - Touch gestures for mobile swipe
  - Zoom effects and hover animations
- **Progressive image loading** with blur placeholders
- **Translated captions** in all supported languages
- Aspect ratio variety (portrait, landscape, square)
- Empty state with helpful messaging

### 📖 **About Page**
- The story and mission of Dungeon Pub
- Three main sections:
  - Our Story (Who we are)
  - Events & Collaborations (What we organize)
  - Games & Entertainment (What we offer)
- Social media integration (Facebook, Instagram)
- Decorative background elements (Scroll, Shield, Swords)
- Visual separators between sections
- Enhanced spacing and typography
- Gradient backgrounds and backdrop blur effects

### 🌍 **Internationalization (i18n)**
Supports **6 languages:**
- 🇸🇰 Slovak (SK)
- 🇬🇧 English (EN)
- 🇨🇿 Czech (CS)
- 🇺🇦 Ukrainian (UK)
- 🇵🇱 Polish (PL)
- 🇭🇺 Hungarian (HU)

### 📱 **Responsive Design**
- Fully responsive on all devices (mobile, tablet, desktop)
- Mobile-first approach
- Optimized touch interactions
- Adaptive layouts and typography
- Mobile navigation menu with smooth animations

### ♿ **Accessibility**
- ARIA labels and descriptions
- Screen reader support
- Keyboard navigation throughout
- Focus indicators
- High contrast text
- Semantic HTML structure

### 🎨 **Design System**
- **Fantasy Theme:** Medieval tavern aesthetic with modern touches
- **Dark/Light Mode Support:** Adapts to system preferences
- **Custom Components:** Built with Radix UI primitives
- **Animations:** Framer Motion for smooth transitions
- **Icons:** Lucide React icon library
- **Color Coding:** Different colors for event types and menu categories

## 🚀 Tech Stack

### Core Technologies
- **Framework:** [Next.js 15+](https://nextjs.org/) (App Router with Turbopack)
- **Runtime:** React 19
- **Language:** TypeScript (strict mode)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **UI Components:** [ShadCN/UI](https://ui.shadcn.com/) + [Radix UI](https://www.radix-ui.com/)

### Libraries & Tools
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Reviews:** SerpApi for Google Reviews integration
- **Forms:** React Hook Form + Zod validation
- **State Management:** React Context API
- **Image Optimization:** Next.js Image component with blur placeholders

### APIs & Integrations
- **Facebook Graph API:** Event listings
- **SerpApi:** Google Reviews data

## 📁 Project Structure

```
src/
├── app/                      # Next.js App Router pages
│   ├── about/               # About page
│   ├── events/              # Events page with filters
│   ├── gallery/             # Gallery with masonry layout
│   ├── menu/                # Menu pages (digital + photo)
│   └── HomePageClient.tsx   # Homepage client component
├── components/
│   ├── layout/              # Header, Footer, Navigation
│   ├── ui/                  # Reusable UI components
│   ├── GoogleReviews.tsx    # Reviews display component
│   └── ReviewsSection.tsx   # Reviews integration
├── contexts/
│   └── LanguageContext.tsx  # i18n context
├── data/
│   └── translations-*.json  # Translation files (6 languages)
├── hooks/
│   └── useHaptic.ts        # Haptic feedback hook
├── lib/
│   ├── google-reviews.ts   # Reviews API integration
│   ├── menu-data.ts        # Menu data management
│   └── placeholder-images.ts # Image data
└── styles/
    └── globals.css         # Global styles + Tailwind
```

## 🛠️ Getting Started

### Prerequisites
- **Node.js** (v18 or later)
- **npm** or **yarn** or **pnpm**

### Environment Variables
Create a `.env.local` file in the root directory:

```env
# Facebook API
FACEBOOK_PAGE_ID=your_page_id
FACEBOOK_PAGE_ACCESS_TOKEN=your_access_token

# Google APIs
SERPAPI_API_KEY=your_serpapi_key
```

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Antot-12/Dungeon-Pub-Site.git
   cd Dungeon-Pub-Site
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

## 🎯 Key Features Breakdown

### Advanced Event System
- **Smart Event Detection:** Automatically categorizes events by type
- **Real-time Filtering:** Instant search and category filtering
- **Countdown Timer:** Live countdown to next event with seconds precision
- **View Modes:** Toggle between list and grid layouts
- **Status Indicators:** "TODAY" badge with pulse animation
- **Archive Access:** Toggle to view past events

### Enhanced Gallery Experience
- **Masonry Layout:** Dynamic grid that adapts to image aspect ratios
- **Infinite Scroll:** Loads 9 images initially, then 6 more as you scroll
- **Smooth Transitions:** Crossfade effect between images (200ms duration)
- **Fullscreen Support:** Native fullscreen API integration
- **Gesture Support:** Swipe on mobile, arrow keys on desktop
- **Smart Loading:** Eager load first 6 images, lazy load the rest

### Menu Improvements
- **Color Coding System:** 15+ drink categories with unique colors
  - Beer (Amber), Wine (Purple), Whisky (Yellow)
  - Vodka (Blue), Gin (Cyan), Tequila (Lime)
  - Cocktails (Pink), and more
- **Enhanced Typography:** Bigger fonts for better readability
- **Volume Indicators:** Clear display of serving sizes
- **Hover Effects:** Smooth transitions on card hover

### Reviews Integration
- **Newest First:** Reviews sorted by most recent
- **Top 3 Display:** Shows the best 3 reviews
- **Animated Cards:** Staggered entrance animations
- **Link to Google:** Direct link to all reviews
