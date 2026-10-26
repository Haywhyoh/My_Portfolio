/**
 * Structured resume data, sourced directly from the candidate's resume.
 * Used by the Home, About, and Resume pages so copy stays consistent
 * in exactly one place.
 */

export interface SkillGroup {
  label: string;
  items: string[];
}

export interface ExperienceItem {
  company: string;
  location: string;
  role: string;
  period: string;
  current?: boolean;
  highlights: string[];
  tech?: string[];
}

export interface EducationItem {
  school: string;
  credential: string;
  period: string;
  detail?: string;
}

export const skillGroups: SkillGroup[] = [
  {
    label: 'Languages',
    items: ['JavaScript', 'TypeScript', 'Python', 'Go', 'PHP', 'Bash', 'C'],
  },
  {
    label: 'Frameworks',
    items: ['Next.js', 'React', 'NestJS', 'Express', 'Django', 'Flask'],
  },
  {
    label: 'Data & ORM',
    items: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'Prisma', 'TypeORM', 'Firebase', 'Supabase'],
  },
  {
    label: 'Infra & Tooling',
    items: ['AWS', 'Google Cloud', 'Docker', 'Vagrant', 'Apache', 'GitHub Actions', 'Postman'],
  },
  {
    label: 'Practices',
    items: ['Test-Driven Development', 'Pair Programming', 'Agile/Scrum', 'Code Review', 'System Design'],
  },
];

export const experience: ExperienceItem[] = [
  {
    company: 'CodeMyGig',
    location: 'Remote',
    role: 'Software Engineer',
    period: 'March 2025 – Present',
    highlights: [
      'Led a 6-person contract development team across 3 concurrent client projects serving 12,000+ users.',
      'Worked down a bug backlog at an average of 20 resolved medium-severity bugs per iteration.',
      'Championed TDD adoption, personally bringing 20% of the codebase under automated test coverage.',
    ],
    tech: ['React', 'Node.js', 'TypeScript'],
  },
  {
    company: 'Hillpad',
    location: 'Remote, USA',
    role: 'Full-Stack Web Developer',
    period: 'Jun 2024 – Jan 2025',
    highlights: [
      'Led a 5-person team delivering two web applications and a SaaS product, serving 13,000+ combined users on scalable monolithic MVC architectures.',
      'Independently built a Staff & Partners dashboard with a referral/affiliate system tracking earnings and sales for 200+ partners and staff.',
    ],
    tech: ['React', 'Redux', 'Next.js', 'NestJS', 'Django', 'Python', 'WordPress'],
  },
  {
    company: 'ALX Africa',
    location: 'Remote, Kenya',
    role: 'Software Engineering Intern',
    period: 'Feb 2021 – Mar 2022',
    highlights: [
      'Built dynamic web applications with React on the front end and Node.js on the back end.',
      'Improved UX with responsive design and load-time optimization.',
    ],
    tech: ['React', 'Node.js', 'C', 'Python', 'Flask', 'FastAPI'],
  },
  {
    company: 'Independent Freelancer - Upwork',
    location: 'Remote',
    role: 'Freelance Web Developer',
    period: 'January 2021 – Present',
    highlights: [
      'Managed WordPress sites and landing pages for 10+ clients, including technical SEO content.',
      'Built and maintained static landing pages plus React and WordPress sites for multiple clients.',
      'Wrote unit tests with Pytest and Jest and authored API documentation to improve developer usability.',
    ],
  },
];

export const education: EducationItem[] = [
  {
    school: 'Obafemi Awolowo University',
    credential: 'BSc. Electronic and Electrical Engineering',
    period: 'Feb 2016 – Dec 2021',
  },
  {
    school: 'Holberton School (ALX)',
    credential: 'Full-Stack Software Engineering Program',
    period: 'Feb 2021 – Mar 2022',
    detail: '70 hrs/week of intensive, project-based full-stack engineering training.',
  },
];

export const stats = [
  { value: '5+', label: 'Years shipping' },
  { value: '20K+', label: 'Users served' },
  { value: '8', label: 'Products shipped' },
  { value: '200+', label: 'Partners supported' },
];
