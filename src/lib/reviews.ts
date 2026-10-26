export type ReviewSource = 'direct' | 'upwork';
export type ReviewFilter = 'all' | ReviewSource;

export interface ClientReview {
  id: string;
  quote: string;
  rating: number;
  source: ReviewSource;
  name: string;
  detail: string;
  avatar?: string;
  tags?: string[];
  endorsements?: string[];
  /** Column span used in the full "all reviews" bento. */
  layout: string;
  featured?: boolean;
}

export interface EarlierReview {
  id: string;
  quote: string;
  rating: number;
  contract: string;
  period: string;
}

export const upworkProfile = {
  url: 'https://www.upwork.com/freelancers/~01a49b6b5c0e817554',
  rating: 4.9,
  reviewCount: 21,
  jobSuccess: '100%',
  completedJobs: 21,
  inProgress: 7,
  hoursBilled: 1300,
  badge: 'Top Rated',
} as const;

export const upworkEndorsements = [
  { label: 'Committed to Quality', count: 8 },
  { label: 'Clear Communicator', count: 5 },
  { label: 'Detail Oriented', count: 3 },
  { label: 'Reliable', count: 3 },
  { label: 'Collaborative', count: 2 },
  { label: 'Professional', count: 2 },
  { label: 'Solution Oriented', count: 2 },
  { label: 'Accountable for Outcomes', count: 1 },
] as const;

/**
 * Named clients use the portraits already on the site.
 * Upwork lines are the public review text, including the truncated MERN snippet.
 */
export const clientReviews: ClientReview[] = [
  {
    id: 'ai-lead-engine',
    quote:
      'Excellent standard of quality work, highly collaborative, and very creative in problem-solving. Communication was smooth, and everything was delivered on time with great attention to detail.',
    rating: 5,
    source: 'upwork',
    name: 'Autonomous AI Lead Research Engine',
    detail: 'Upwork · Oct 2026',
    tags: ['LangChain', 'LangGraph', 'FastAPI'],
    endorsements: [
      'Reliable',
      'Committed to Quality',
      'Solution Oriented',
      'Clear Communicator',
      'Detail Oriented',
      'Accountable for Outcomes',
    ],
    layout: 'md:tw-col-span-2 xl:tw-col-span-7',
    featured: true,
  },
  {
    id: 'sam-ojei',
    quote:
      'Working with Adedayo was an absolute game-changer for our SaaS platform. His expertise in React and Next.js helped us reduce our loading time by 40% and significantly improved our user experience. The attention to detail and problem-solving skills are exceptional.',
    rating: 5,
    source: 'direct',
    name: 'Sam Ojei',
    detail: 'CEO, Hux Ventures',
    avatar: '/assets/img/sam2.png',
    tags: ['Edu SaaS'],
    layout: 'xl:tw-col-span-5',
  },
  {
    id: 'naolo',
    quote:
      'Thanks to your web agency team for their professional work. The website they created for my business exceeded my expectations, and my clients have given positive feedback about its design and user-friendliness.',
    rating: 5,
    source: 'direct',
    name: 'Naolo Charless',
    detail: 'CEO, BeInitiative',
    avatar: '/assets/img/naolo.jpeg',
    tags: ['NGO website'],
    layout: 'xl:tw-col-span-4',
  },
  {
    id: 'mern',
    quote:
      'Samuel really helped us during a busy period and got a lot of bug fixes done to a very high standard, without much input from our team. A real asset…',
    rating: 5,
    source: 'upwork',
    name: 'Senior MERN Full Stack',
    detail: 'Upwork · Feb–Apr 2026',
    endorsements: ['Collaborative', 'Committed to Quality'],
    layout: 'xl:tw-col-span-4',
  },
  {
    id: 'tony',
    quote:
      'Adedayo delivered an outstanding portfolio website for our startup. He was able to understand our brand and deliver a website that is both functional and aesthetically pleasing.',
    rating: 5,
    source: 'direct',
    name: 'Tony Phan',
    detail: 'Full-Stack Marketer, Atmosphere Lab',
    avatar: '/assets/img/tony.jpeg',
    tags: ['EdTech'],
    layout: 'xl:tw-col-span-4',
  },
  {
    id: 'python-js',
    quote:
      'Great developer who quickly got up to speed with our codebase and fixed the issue. Delivered clean, well-documented code. Would hire again.',
    rating: 5,
    source: 'upwork',
    name: 'Python & JavaScript Full-Stack',
    detail: 'Upwork · Oct 2025',
    endorsements: ['Solution Oriented', 'Committed to Quality', 'Detail Oriented'],
    layout: 'xl:tw-col-span-4',
  },
  {
    id: 'john',
    quote:
      'Adedayo led our agency development team to deliver a website for different clients in our agency. He was able to understand our brand and deliver a website that is both functional and SEO friendly.',
    rating: 5,
    source: 'direct',
    name: 'John Williams',
    detail: 'CEO, Agencia You',
    avatar: '/assets/img/john.jpg',
    tags: ['Agency sites'],
    layout: 'xl:tw-col-span-4',
  },
  {
    id: 'booking',
    quote:
      'Samuel delivered a functional prototype with a good UI for my booking web app. I’m really impressed with the delivery. Good job.',
    rating: 5,
    source: 'upwork',
    name: 'Booking web app prototype',
    detail: 'Upwork · Oct 2025',
    endorsements: ['Committed to Quality'],
    layout: 'xl:tw-col-span-4',
  },
];

export const earlierReviews: EarlierReview[] = [
  {
    id: 'seo',
    quote:
      'Samuel did an excellent job. His knowledge of IT and SEO made the delivery a very unique one. I’ll hire him again and recommend him.',
    rating: 5,
    contract: 'Technical SEO writing',
    period: '2022',
  },
  {
    id: 'deadlines',
    quote: 'He is a good communicator, replies fast, and follows the promised deadlines.',
    rating: 4.6,
    contract: 'Status pages article',
    period: '2023',
  },
  {
    id: 'ramp',
    quote: 'Sam was very easy to work with and we appreciate how quickly he ramped up.',
    rating: 4.6,
    contract: 'Tech comparison writing',
    period: '2022',
  },
];

export const reviewFilters: { id: ReviewFilter; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'direct', label: 'Direct clients' },
  { id: 'upwork', label: 'Upwork' },
];
