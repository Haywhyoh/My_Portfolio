import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Create admin user if not exists
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@portfolio.com' },
    update: {},
    create: {
      email: 'admin@portfolio.com',
      username: 'admin',
      password: '$2a$10$K7L1OJ45/4Y2nIvhRVpCe.FSmhDdWoXehVzJptJ/op0lSNjDBH1jO', // admin123
      role: 'admin',
    },
  });

  // Sample blog posts
  const sampleBlogs = [
    {
      title: 'Building Modern Web Applications with Next.js 14',
      slug: 'building-modern-web-applications-with-nextjs-14',
      excerpt: 'Discover the latest features in Next.js 14 and learn how to build scalable, performant web applications. From the new App Router to improved performance optimizations.',
      content: `# Building Modern Web Applications with Next.js 14

Next.js 14 has revolutionized the way we build web applications. With its new App Router, improved performance optimizations, and enhanced developer experience, it's become the go-to framework for React developers.

## Key Features

### App Router
The new App Router in Next.js 14 provides:
- File-system based routing
- Layouts and templates
- Loading and error states
- Parallel and intercepting routes

### Performance Improvements
- Turbopack for faster builds
- Improved image optimization
- Better code splitting
- Enhanced caching strategies

## Getting Started

To create a new Next.js 14 application:

\`\`\`bash
npx create-next-app@latest my-app
cd my-app
npm run dev
\`\`\`

## Conclusion

Next.js 14 offers powerful tools for building modern web applications. Its focus on performance, developer experience, and production-ready features makes it an excellent choice for your next project.`,
      author: 'Adedayo',
      category: 'Development',
      tags: JSON.stringify(['Next.js', 'React', 'Web Development', 'JavaScript']),
      readTime: 5,
      isPublished: true,
      thumbnail: 'https://res.cloudinary.com/demo/image/upload/w_400,h_300,c_fill/sample.jpg',
      featuredImage: 'https://res.cloudinary.com/demo/image/upload/w_1200,h_600,c_fill/sample.jpg',
      seoTitle: 'Building Modern Web Applications with Next.js 14 - Complete Guide',
      seoDescription: 'Learn how to build scalable web applications with Next.js 14. Explore App Router, performance optimizations, and best practices.',
      publishedAt: new Date('2024-09-18'),
    },
    {
      title: 'Mastering React Hooks: A Complete Guide',
      slug: 'mastering-react-hooks-complete-guide',
      excerpt: 'Learn how to effectively use React Hooks to manage state and side effects in your functional components. This comprehensive guide covers useState, useEffect, and custom hooks.',
      content: `# Mastering React Hooks: A Complete Guide

React Hooks have transformed how we write React components. They allow us to use state and other React features without writing class components.

## useState Hook

The useState hook lets you add state to functional components:

\`\`\`javascript
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
\`\`\`

## useEffect Hook

The useEffect hook lets you perform side effects in function components:

\`\`\`javascript
import { useEffect, useState } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = \`You clicked \${count} times\`;
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
\`\`\`

## Custom Hooks

Custom hooks let you extract component logic into reusable functions:

\`\`\`javascript
import { useState, useEffect } from 'react';

function useWindowWidth() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return width;
}
\`\`\`

## Best Practices

1. **Always use hooks at the top level** - Don't call hooks inside loops, conditions, or nested functions
2. **Use dependency arrays correctly** - Include all dependencies in useEffect dependency arrays
3. **Extract custom hooks** - When logic becomes complex, extract it into custom hooks
4. **Use useCallback and useMemo wisely** - Only when you have performance issues

## Conclusion

React Hooks provide a powerful way to build components. Master these patterns and you'll write more maintainable and reusable React code.`,
      author: 'Adedayo',
      category: 'Development',
      tags: JSON.stringify(['React', 'Hooks', 'JavaScript', 'Frontend']),
      readTime: 8,
      isPublished: true,
      thumbnail: 'https://res.cloudinary.com/demo/image/upload/w_400,h_300,c_fill/sample.jpg',
      featuredImage: 'https://res.cloudinary.com/demo/image/upload/w_1200,h_600,c_fill/sample.jpg',
      seoTitle: 'Mastering React Hooks - Complete Guide with Examples',
      seoDescription: 'Learn React Hooks with practical examples. Master useState, useEffect, and custom hooks for better React development.',
      publishedAt: new Date('2024-09-15'),
    },
    {
      title: 'TypeScript Best Practices for Frontend Development',
      slug: 'typescript-best-practices-frontend-development',
      excerpt: 'Explore TypeScript best practices that will make your frontend code more maintainable, type-safe, and scalable. Learn advanced patterns used by professional developers.',
      content: `# TypeScript Best Practices for Frontend Development

TypeScript has become essential for modern frontend development. It provides type safety, better IDE support, and helps catch errors at compile time.

## Setting Up TypeScript

Start with a proper TypeScript configuration:

\`\`\`json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["DOM", "DOM.Iterable", "ES6"],
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx"
  },
  "include": ["src"]
}
\`\`\`

## Type Definitions

### Interface vs Type Aliases

Use interfaces for object shapes that might be extended:

\`\`\`typescript
interface User {
  id: number;
  name: string;
  email: string;
}

interface AdminUser extends User {
  permissions: string[];
}
\`\`\`

Use type aliases for unions, primitives, and computed types:

\`\`\`typescript
type Status = 'loading' | 'success' | 'error';
type ApiResponse<T> = {
  data: T;
  status: Status;
};
\`\`\`

### Generic Types

Make your types reusable with generics:

\`\`\`typescript
interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

function fetchData<T>(url: string): Promise<ApiResponse<T>> {
  return fetch(url).then(res => res.json());
}
\`\`\`

## React with TypeScript

### Component Props

Always type your component props:

\`\`\`typescript
interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
}

function Button({ children, onClick, variant = 'primary', disabled }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={\`btn btn-\${variant}\`}
    >
      {children}
    </button>
  );
}
\`\`\`

### Hooks with TypeScript

Type your useState hooks properly:

\`\`\`typescript
const [user, setUser] = useState<User | null>(null);
const [users, setUsers] = useState<User[]>([]);
const [loading, setLoading] = useState<boolean>(false);
\`\`\`

## Best Practices

1. **Enable strict mode** - Use strict TypeScript settings
2. **Avoid \`any\`** - Use proper types instead of any
3. **Use type guards** - Create functions to check types at runtime
4. **Leverage utility types** - Use Partial, Required, Pick, Omit
5. **Type your API responses** - Always type external data

## Utility Types

TypeScript provides powerful utility types:

\`\`\`typescript
interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}

// Partial - makes all properties optional
type UserUpdate = Partial<User>;

// Pick - select specific properties
type UserProfile = Pick<User, 'id' | 'name' | 'email'>;

// Omit - exclude specific properties
type CreateUser = Omit<User, 'id'>;
\`\`\`

## Conclusion

TypeScript enhances JavaScript development by providing type safety and better tooling. Follow these best practices to write more maintainable and reliable frontend code.`,
      author: 'Adedayo',
      category: 'Development',
      tags: JSON.stringify(['TypeScript', 'Frontend', 'JavaScript', 'Best Practices']),
      readTime: 10,
      isPublished: true,
      thumbnail: 'https://res.cloudinary.com/demo/image/upload/w_400,h_300,c_fill/sample.jpg',
      featuredImage: 'https://res.cloudinary.com/demo/image/upload/w_1200,h_600,c_fill/sample.jpg',
      seoTitle: 'TypeScript Best Practices for Frontend Development',
      seoDescription: 'Learn TypeScript best practices for frontend development. Improve code quality, type safety, and maintainability.',
      publishedAt: new Date('2024-09-12'),
    }
  ];

  for (const blog of sampleBlogs) {
    await prisma.blog.upsert({
      where: { slug: blog.slug },
      update: {},
      create: blog,
    });
  }

  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });