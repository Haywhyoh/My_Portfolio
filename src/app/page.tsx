import Hero from '@/components/home/Hero';
import About from '@/components/home/About';
import FeaturedWork from '@/components/home/FeaturedWork';
import Experience from '@/components/home/Experience';
import CTASection from '@/components/site/CTASection';

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <FeaturedWork />
      <Experience />
      <CTASection />
    </>
  );
}
