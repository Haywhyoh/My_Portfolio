# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This repository contains a dual-project portfolio setup with both a React (Vite) and Next.js implementation:

- **Root directory**: React + TypeScript + Vite portfolio (original)
- **nextjs-portfolio/**: Next.js + TypeScript portfolio (85% converted)

## Development Commands

### React (Vite) Project (Root)
```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run lint         # Run ESLint
npm run preview      # Preview production build
```

### Next.js Project (nextjs-portfolio/)
```bash
cd nextjs-portfolio

# Development
npm run dev          # Start Next.js development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run Next.js ESLint
```

## Architecture

### Project Structure

**React Project (Root)**:
```
src/
├── pages/           # Route components
│   ├── homePages/   # Home page variants
│   ├── blogPages/   # Blog-related pages
│   └── innerPages/  # Static pages (contact, resume, etc.)
├── components/      # Reusable UI components
│   ├── about/       # About section components
│   ├── banner/      # Hero/banner components
│   ├── blog/        # Blog components
│   ├── contact/     # Contact form components
│   ├── footer/      # Footer components
│   ├── header/      # Header/navigation components
│   ├── portfolio/   # Portfolio/projects components
│   └── services/    # Services section components
├── hooks/           # Custom React hooks
├── assets/          # Static assets and JSON data
└── Routers.tsx      # React Router configuration
```

**Next.js Project (nextjs-portfolio/)**:
```
src/
├── app/             # Next.js App Router
│   ├── contact/     # Contact page route
│   ├── resume/      # Resume page route
│   ├── service/     # Service page route
│   ├── layout.tsx   # Root layout
│   ├── page.tsx     # Homepage
│   └── globals.css  # Global styles
├── components/      # Migrated React components
├── hooks/           # Custom hooks (migrated)
└── assets/          # Assets and JSON data
```

### Key Dependencies

**Shared Libraries**:
- **UI**: Bootstrap 5.3.3, React 18.3.1
- **Animation**: GSAP 3.12.5, React CountUp 6.5.3, React Typed 2.0.12
- **Media**: Swiper 11.1.14, React Modal Video 2.0.2, React Photo View 1.2.6
- **Utilities**: Isotope Layout 3.0.6, ImagesLoaded 5.0.0, React Toastify 10.0.6

**React-specific**: React Router DOM 6.27.0, Vite 5.4.8
**Next.js-specific**: Next.js 14.0.4

### Data Structure

Portfolio data is stored in JSON files under `src/assets/jsonData/`:
- `blog/BlogData.json` - Blog posts data
- `portfolio/PortfolioData.json` - Project portfolio data
- `services/ServicesData.json` - Services information
- `widgets/GalleryWidgetData.json` - Gallery/widget data

### Routing

**React Router Routes**:
- `/` - Home page
- `/home-dark` - Dark theme home
- `/contact` - Contact page
- `/pricing` - Pricing page
- `/blog-with-sidebar` - Blog listing
- `/blog-single-with-sidebar/:id` - Blog post details
- `/projects` - Projects listing
- `/project-details/:id` - Project details
- `/resume` - Resume page
- `/service` - Services page
- `/services-details` - Service details

**Next.js Routes** (App Router):
- `/` - Homepage (converted)
- `/contact` - Contact page (converted)
- `/resume` - Resume page (converted)
- `/service` - Service page (converted)

### Migration Status

The Next.js conversion is **85% complete** with the following status:

**✅ Completed**:
- Core infrastructure (Next.js setup, TypeScript, App Router)
- Layout system (Header, Footer, Layout components)
- Page components (Banner, About, Services, Facts, Resume, Contact)
- Navigation and responsive design
- Forms with validation and notifications
- Animations (GSAP, CountUp, typed text effects)
- Bootstrap integration

**⏳ Remaining**:
- Portfolio gallery with filtering (IsotopeGallery)
- Blog components and dynamic routing
- Additional page variants (HomeDark, etc.)
- Advanced animations (ReactWOW replacement)
- SEO optimization

## Development Notes

### Component Migration
- Most React components work with minimal changes in Next.js
- React Router dependencies have been replaced with Next.js navigation
- Server-side compatibility has been ensured for converted components
- TypeScript types are maintained throughout both projects

### Styling Approach
- Bootstrap 5.3.3 is used as the primary CSS framework
- Custom styles are in `globals.css` (Next.js) or component-specific files
- GSAP handles complex animations
- Responsive design follows Bootstrap breakpoints

### State Management
- No global state management library is used
- Local component state with React hooks
- Custom hooks for reusable logic (sidebar menu, sticky menu, etc.)

### Performance
- Next.js project uses SSG for static pages
- Image optimization through Next.js Image component
- Component lazy loading where appropriate
- Bundle optimization through Vite (React) or Next.js built-in optimization