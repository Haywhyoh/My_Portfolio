import { Testimonial } from './types';
import testimonialsData from '@/assets/jsonData/testimonials/TestimonialsData.json';

/**
 * Get all testimonials
 */
export function getAllTestimonials(): Testimonial[] {
  return testimonialsData as Testimonial[];
}

/**
 * Get featured testimonials only
 */
export function getFeaturedTestimonials(): Testimonial[] {
  return getAllTestimonials().filter(testimonial => testimonial.featured);
}

/**
 * Get testimonials by rating (minimum rating)
 */
export function getTestimonialsByRating(minRating: number = 4): Testimonial[] {
  return getAllTestimonials().filter(testimonial => testimonial.rating >= minRating);
}

/**
 * Get testimonials by project type
 */
export function getTestimonialsByProjectType(projectType: string): Testimonial[] {
  return getAllTestimonials().filter(
    testimonial => testimonial.projectType.toLowerCase().includes(projectType.toLowerCase())
  );
}

/**
 * Get a specific testimonial by ID
 */
export function getTestimonialById(id: number): Testimonial | undefined {
  return getAllTestimonials().find(testimonial => testimonial.id === id);
}

/**
 * Get random testimonials (useful for variety)
 */
export function getRandomTestimonials(count: number = 3): Testimonial[] {
  const testimonials = getAllTestimonials();
  const shuffled = [...testimonials].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

/**
 * Get testimonials for display (with option to limit and filter)
 */
export function getTestimonialsForDisplay(options: {
  maxItems?: number;
  featuredOnly?: boolean;
  minRating?: number;
  randomize?: boolean;
} = {}): Testimonial[] {
  const {
    maxItems = 6,
    featuredOnly = false,
    minRating = 1,
    randomize = false
  } = options;

  let testimonials = getAllTestimonials();

  // Filter by featured status
  if (featuredOnly) {
    testimonials = testimonials.filter(t => t.featured);
  }

  // Filter by minimum rating
  if (minRating > 1) {
    testimonials = testimonials.filter(t => t.rating >= minRating);
  }

  // Randomize if requested
  if (randomize) {
    testimonials = [...testimonials].sort(() => 0.5 - Math.random());
  }

  // Limit results
  return testimonials.slice(0, maxItems);
}

/**
 * Get testimonial statistics
 */
export function getTestimonialStats() {
  const testimonials = getAllTestimonials();

  const totalReviews = testimonials.reduce((sum, t) => sum + t.reviewCount, 0);
  const averageRating = testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length;
  const featuredCount = testimonials.filter(t => t.featured).length;

  // Get unique project types
  const projectTypes = Array.from(new Set(testimonials.map(t => t.projectType)));

  // Get unique companies
  const companies = Array.from(new Set(testimonials.map(t => t.company)));

  return {
    totalTestimonials: testimonials.length,
    totalReviews,
    averageRating: Math.round(averageRating * 10) / 10, // Round to 1 decimal
    featuredCount,
    projectTypes,
    companies,
    highestRatedTestimonial: testimonials.find(t => t.rating === Math.max(...testimonials.map(t => t.rating))),
    mostReviewedTestimonial: testimonials.find(t => t.reviewCount === Math.max(...testimonials.map(t => t.reviewCount)))
  };
}