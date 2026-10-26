import Hero from '@/components/home/Hero';
import Stats from '@/components/home/Stats';
import About from '@/components/home/About';
import Skills from '@/components/home/Skills';
import FeaturedWork from '@/components/home/FeaturedWork';
import Experience from '@/components/home/Experience';
import Reviews from '@/components/home/Reviews';
import CTASection from '@/components/site/CTASection';

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <About />
      <Skills />
      <FeaturedWork />
      <Experience />
      <Reviews />
      <CTASection />
    </>
  );
}
