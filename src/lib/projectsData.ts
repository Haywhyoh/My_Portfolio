/**
 * Case study + portfolio project data.
 *
 * `caseStudies` are the 5 flagship, in-depth write-ups shown on the
 * homepage and given full /work/[slug] pages.
 *
 * `moreProjects` are lighter-weight portfolio entries shown in the
 * "More Projects" grid — they still render on /work/[slug] but with
 * shorter copy.
 *
 * NOTE: content here was drafted from the live production sites,
 * the resume, and reasonable inference where specifics weren't
 * available (e.g. exact metrics for BountyBarn/Madlas/GraceBenefactor/
 * BalanceSelfCare). Please review and correct role descriptions,
 * dates, and any numbers before this goes live.
 */

export interface CaseStudy {
  slug: string;
  name: string;
  tagline: string;
  tags: string[];
  role: string;
  year: string;
  liveUrl?: string;
  heroImage: string;
  featured: boolean;
  accent: 'accent' | 'glow' | 'amber' | 'rose';
  summary: string;
  problem: string;
  solution: string;
  features: string[];
  stack: string[];
  results: string[];
}

export const caseStudies: CaseStudy[] = [
  {
    slug: 'noslop',
    name: 'NoSlop',
    tagline: "An AI coding tutor that won't hand you the answer — it makes you earn it, inside a real Docker sandbox.",
    tags: ['AI Agent', 'EdTech', 'Docker / Sandboxing'],
    role: 'Founding Engineer — platform, sandbox infra & AI tutor',
    year: '2025 — Present',
    liveUrl: 'https://noslop.codemygig.com',
    heroImage: '/assets/img/work/noslop-hero.png',
    featured: true,
    accent: 'accent',
    summary:
      'NoSlop teaches programming — and other technical skills — with the Socratic method: an AI coach asks questions before giving answers, while learners write real code in Docker-backed sandboxes and only advance once they prove they understand.',
    problem:
      "Most 'learn to code' platforms either hand over the solution outright (so nothing sticks) or trap learners in toy editors that don't resemble real engineering work. There was also no good way for instructors to author multi-language, project-based curricula without an engineer hardcoding every course.",
    solution:
      'I built NoSlop around three systems: an admin layer where instructors author multi-language, milestone-based courses and projects; a containerized execution layer that spins up isolated Docker sandboxes per learner so code actually runs and tests actually execute; and an AI tutor that applies the Socratic method — asking pre-code questions, escalating hints progressively, and only unlocking the next milestone once an AI review confirms real understanding, not pasted code.',
    features: [
      'Admin-authored, multi-language courses with milestone-based project structure',
      'Per-learner Docker sandboxes for real code execution and automated test running',
      'Monaco-based in-browser code editor wired directly into the sandbox',
      'Socratic AI tutor: pre-code questions and progressive hints instead of solution dumps',
      'AI review gate that verifies understanding before unlocking the next milestone',
      'Hands-on Socratic learning tracks for both coding and non-coding subjects',
      'Persistent accounts so learners resume exactly where they left off',
    ],
    stack: [
      'Next.js', 'TypeScript', 'NestJS', 'Docker', 'PostgreSQL',
      'Monaco Editor', 'OpenAI / LLM orchestration', 'Container-based code execution',
    ],
    results: [
      'Live platform pairing AI tutoring with real, Docker-executed code instead of a sandboxed toy editor',
      'Course and project authoring is fully admin-driven — new multi-language curricula ship without a code deploy',
      'Mastery-gated progression: learners cannot skip ahead without demonstrating understanding to the AI reviewer',
    ],
  },
  {
    slug: 'botglam',
    name: 'Botglam',
    tagline: 'An AI WhatsApp assistant that runs beauty businesses — bookings, payments, and follow-ups, hands-free.',
    tags: ['AI Agent', 'SaaS', 'WhatsApp API'],
    role: 'Founding Engineer — product, backend & AI assistant',
    year: '2025 — Present',
    liveUrl: 'https://botglam.com',
    heroImage: '/assets/img/work/botglam-hero.png',
    featured: true,
    accent: 'rose',
    summary:
      'An AI business-in-a-box for African beauty professionals: it answers WhatsApp messages, books appointments, collects deposits, and chases no-shows — 24/7.',
    problem:
      'Beauty professionals in Africa run their entire business through WhatsApp — pricing questions, bookings, reschedules, reminders — all done manually. Every appointment means a missed message, and every missed message is a missed booking. There was no affordable tool built for how these businesses actually operate: on their phone, inside WhatsApp, with no time for a separate app.',
    solution:
      "I built Botglam as an AI assistant that plugs directly into a business owner's existing WhatsApp Business number through the official WhatsApp Cloud API. The assistant reads incoming messages, understands intent with an LLM-backed conversation engine, and takes action: quoting prices, checking availability against a live calendar, confirming bookings, and dropping a Paystack payment link in the same chat — all in the owner's voice and tone, with zero manual intervention.",
    features: [
      '24/7 AI conversation engine that answers pricing, availability, and booking questions on WhatsApp',
      'Automated booking flow: service → date → time → confirmation, with live calendar sync',
      'In-chat deposit collection via Paystack payment links',
      'Automated appointment reminders with one-tap confirm/reschedule/cancel',
      'AI-driven rebooking campaigns and broadcast promotions to past clients',
      'No-show recovery flow that re-engages missed appointments automatically',
      'WhatsApp catalog for browsing services/products without leaving the chat',
      'Owner dashboard: revenue, bookings, client CRM, and conversation history in one place',
    ],
    stack: [
      'Next.js', 'TypeScript', 'NestJS', 'PostgreSQL', 'Redis',
      'WhatsApp Business Cloud API', 'OpenAI / LLM orchestration', 'Paystack API', 'AWS',
    ],
    results: [
      'Live product with 1,000+ beauty professionals in the early-access waitlist',
      'Illustrative daily load per active business: ~94 WhatsApp messages handled and 12 bookings confirmed by the AI without owner intervention',
      '4.5 hours of manual chat/admin work saved per business, per day',
      'Full productized pricing (Free → Premium) with self-serve onboarding in under 10 minutes',
    ],
  },
  {
    slug: 'bountybarn',
    name: 'BountyBarn',
    tagline: 'A farm-to-table e-commerce storefront for a vertically-integrated Nigerian food producer.',
    tags: ['E-commerce', 'Agribusiness', 'Next.js'],
    role: 'Full-Stack Developer',
    year: '2025',
    liveUrl: 'https://bountybarnhq.com',
    heroImage: '/assets/img/work/bountybarn-hero.png',
    featured: true,
    accent: 'amber',
    summary:
      'BountyBarn grows its own maize, corn and pepper and turns them into additive-free products like Bounty Pap. The site needed to sell that story and the products in one trustworthy, fast storefront.',
    problem:
      'BountyBarn Nigeria Limited had a strong "farm to table" story and a growing product line, but no digital storefront. Without a website, every sale depended on offline distribution, and there was no way to build brand trust with shoppers who increasingly research food brands online before buying.',
    solution:
      'I built a conversion-focused marketing + e-commerce site that leads with the brand story (own farms, no preservatives, no additives) before asking for the sale. Trust badges, farm imagery, and clear product CTAs ("Shop Our Products" / "See Our Farms") sit above the fold, with a lightweight catalog and cart experience underneath.',
    features: [
      'Brand-forward hero and storytelling sections (farms, process, ingredients)',
      'Trust-badge system (No Preservatives, No Additives, No Artificial Sugar, Farm Grown)',
      'Product catalog with categories and detail pages',
      'Cart and checkout flow',
      'Fully responsive, image-heavy layout optimized for fast mobile load',
    ],
    stack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Node.js', 'Image CDN'],
    results: [
      'Shipped a production storefront that turns a farm-to-table brand story into a sellable catalog',
      'Mobile-first performance budget to keep load times low on average Nigerian mobile connections',
    ],
  },
  {
    slug: 'madlas',
    name: 'Madlas Global',
    tagline: 'A premium industrial web presence for a 30-year steel fabrication company.',
    tags: ['Corporate Site', 'B2B', 'Lead Generation'],
    role: 'Full-Stack Developer',
    year: '2025',
    liveUrl: 'https://madlas.com',
    heroImage: '/assets/img/work/madlas-hero.png',
    featured: true,
    accent: 'amber',
    summary:
      'Madlas Global fabricates fuel tankers, storage tanks, and filling-station infrastructure. The brief: a dark, premium site that matches 30+ years of industrial credibility and turns visitors into quote requests.',
    problem:
      "Madlas Global had the scale and track record (30+ years, 120K+ tons produced yearly, 25+ countries served) but a web presence that didn't reflect it, and no structured way for prospective clients to request a quote online.",
    solution:
      'I designed and built a dark, high-contrast corporate site that leads with credibility metrics, breaks services into clear categories (tankers, storage tanks, steel structures, canopies, water towers), and funnels visitors into a quote-request flow instead of a generic contact form.',
    features: [
      'Stats bar surfacing scale (years in business, tonnage produced, countries served)',
      'Service breakdown pages per fabrication category',
      'Quote-request flow distinct from general contact',
      'Dark, industrial visual language with gold accent system',
      'Fully responsive layout for field/mobile viewing during site visits',
    ],
    stack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Form/email integration'],
    results: [
      'Replaced an outdated/no web presence with a site built to convert B2B visitors into qualified leads',
      'Structured content model makes it easy for the Madlas team to update services without a developer',
    ],
  },
  {
    slug: 'gracebenefactor',
    name: 'Grace Benefactor',
    tagline: 'An accessible, trust-building site for a UK supported & residential living care provider.',
    tags: ['Healthcare', 'Accessibility', 'UK Care Sector'],
    role: 'Full-Stack Developer',
    year: '2025',
    liveUrl: 'https://gracebenefactor.com',
    heroImage: '/assets/img/work/gracebenefactor-hero.png',
    featured: true,
    accent: 'glow',
    summary:
      'Grace Benefactor Care Services helps people live independently through supported and residential living. The site needed to be calm, accessible, and immediately clear about which service pathway a family needs.',
    problem:
      "Care services are a high-trust, high-stakes decision for families and local authorities. Grace Benefactor needed a site that reads as professional and warm at once, and that doesn't force visitors to dig through pages to understand 'Supported Living' vs 'Residential Living'.",
    solution:
      'I built a content-first site that puts the two core service pathways front and center as a simple choice, backed by accessible typography, generous contrast, and real imagery of care in action — then a straightforward enquiry flow for families and referrers.',
    features: [
      'Clear "Supported Living" vs "Residential Living" pathway navigation',
      'Accessibility-conscious type scale, contrast, and spacing (WCAG-aware)',
      'Enquiry/referral contact flow',
      'Content sections for services, approach, and team',
      'Fully responsive layout tested for older/less tech-savvy visitors',
    ],
    stack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Headless CMS'],
    results: [
      'Gave a UK care provider a professional digital front door for families and local-authority referrers',
      'Simplified service navigation down to a single, clear decision at the top of the homepage',
    ],
  },
  {
    slug: 'balance-self-care',
    name: 'Balance Self-Care',
    tagline: 'A calm, editorial booking experience for a cross-border virtual psychotherapy practice.',
    tags: ['Healthcare', 'Booking Flow', 'Canada/US'],
    role: 'Full-Stack Developer',
    year: '2024',
    liveUrl: 'https://balanceselfcare.ca',
    heroImage: '/assets/img/work/balanceselfcare-hero.png',
    featured: true,
    accent: 'glow',
    summary:
      'Balance Self-Care offers virtual psychotherapy, workshops, and webinars across Canada and the US. The site needed to feel safe and unhurried while still driving bookings.',
    problem:
      'Mental-health services need a web presence that lowers anxiety, not adds to it — but still needs a clear path to action for someone ready to book a session, workshop, or webinar.',
    solution:
      'I built a soft, editorial-styled site with generous whitespace, calming imagery, and a single, repeated "Book Now" action, paired with clearly separated service tracks (individual/couple/family therapy, workshops, webinars and presentations).',
    features: [
      'Service tracks for individual, couple & family psychotherapy, workshops, and webinars',
      'Repeated, low-friction "Book Now" call to action',
      'Editorial content layout with therapeutic, calming visual tone',
      'Cross-border service messaging (Canada & United States)',
    ],
    stack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Booking integration'],
    results: [
      'Gave a cross-border therapy practice one consistent, calming booking experience across service lines',
    ],
  },
];

export interface MoreProject {
  slug: string;
  name: string;
  tagline: string;
  tags: string[];
  liveUrl?: string;
  thumb: string;
  role: string;
  year: string;
  summary: string;
  stack: string[];
}

export const moreProjects: MoreProject[] = [
  {
    slug: 'hillpad',
    name: 'Hillpad',
    tagline: 'An online course marketplace connecting top schools with learners.',
    tags: ['EdTech', 'Marketplace'],
    liveUrl: 'https://hillpad.com',
    thumb: '/assets/img/projects/1.png',
    role: 'Frontend Engineer → Full-Stack Developer',
    year: '2024 – 2025',
    summary:
      'Built and redesigned the course-marketplace experience, then helped drive SEO/growth that brought in 30,000+ monthly impressions and a 4% click-through rate.',
    stack: ['React', 'Redux', 'TypeScript', 'Django', 'Supabase'],
  },
  {
    slug: 'graviitalbeats',
    name: 'GraviitalBeats',
    tagline: 'A music beat marketplace for producers and artists.',
    tags: ['Music', 'Marketplace'],
    liveUrl: 'https://graviitalbeats.com',
    thumb: '/assets/img/projects/2.png',
    role: 'Full-Stack Developer',
    year: '2025',
    summary:
      'Built a marketplace where producers sell licensed beats directly to artists and creatives, with catalog, licensing, and checkout flows.',
    stack: ['NestJS', 'Next.js', 'Zustand', 'PostgreSQL'],
  },
  {
    slug: 'tattoadmin',
    name: 'TattoAdmin',
    tagline: 'A booking & studio-management platform for tattoo artists.',
    tags: ['Booking', 'Tattoo Industry'],
    thumb: '/assets/img/projects/4.png',
    role: 'Full-Stack Developer',
    year: '2024',
    summary:
      'A booking and client-management admin tool built for tattoo studios to manage appointments, deposits, and client history.',
    stack: ['React', 'Node.js', 'PostgreSQL'],
  },
  {
    slug: 'beinitiative',
    name: 'Beinitiative',
    tagline: 'A community platform supporting a grassroots initiative.',
    tags: ['Community', 'Web Platform'],
    thumb: '/assets/img/projects/6.png',
    role: 'Full-Stack Developer',
    year: '2023',
    summary:
      'A content and community platform built to help a community initiative reach and organize its members online.',
    stack: ['React', 'Node.js'],
  },
];

export function getAllSlugs() {
  return [
    ...caseStudies.map((c) => c.slug),
    ...moreProjects.map((p) => p.slug),
  ];
}

export function getCaseStudyBySlug(slug: string) {
  return caseStudies.find((c) => c.slug === slug);
}

export function getMoreProjectBySlug(slug: string) {
  return moreProjects.find((p) => p.slug === slug);
}
