import Hero from '@/components/home/Hero';
import Stats from '@/components/home/Stats';
import About from '@/components/home/About';
import FeaturedWork from '@/components/home/FeaturedWork';
import Experience from '@/components/home/Experience';
import CTASection from '@/components/site/CTASection';

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <About />
      <FeaturedWork />
      <Experience />
      <CTASection />
    </>
  );
}
