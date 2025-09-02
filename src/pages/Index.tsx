import { useState, lazy, Suspense } from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import Divider from '@/components/Divider';

// Lazy load heavy components
const AboutMeSection = lazy(() => import('@/components/AboutMeSection'));
const RitualsPageSection = lazy(() => import('@/components/RitualsPageSection'));
const TestimonialsSection = lazy(() => import('@/components/TestimonialsSection'));
const ContactSection = lazy(() => import('@/components/ContactSection'));

// Section loading component
const SectionLoader = () => (
  <div className="flex justify-center py-12">
    <div className="animate-pulse space-y-4 w-full max-w-4xl px-4">
      <div className="h-4 bg-muted rounded w-3/4 mx-auto"></div>
      <div className="h-4 bg-muted rounded w-1/2 mx-auto"></div>
      <div className="h-32 bg-muted rounded"></div>
    </div>
  </div>
);

export default function Index() {
  const [currentTitle, setCurrentTitle] = useState('Маг');
  const [showMoreRituals, setShowMoreRituals] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header currentTitle={currentTitle} setCurrentTitle={setCurrentTitle} />
      
      <HeroSection currentTitle={currentTitle} />

      <Divider />

      <main className="space-y-8 xs:space-y-12">
        <Suspense fallback={<SectionLoader />}>
          <section id="about" className="scroll-mt-32 max-w-4xl mx-auto px-3 xs:px-4 py-2">
            <AboutMeSection />
          </section>
        </Suspense>

        <Divider />

        <Suspense fallback={<SectionLoader />}>
          <section id="rituals" className="scroll-mt-32 max-w-4xl mx-auto px-3 xs:px-4 py-2">
            <RitualsPageSection 
              showMoreRituals={showMoreRituals} 
              setShowMoreRituals={setShowMoreRituals} 
            />
          </section>
        </Suspense>

        <Divider />

        <Suspense fallback={<SectionLoader />}>
          <section id="testimonials" className="scroll-mt-32 max-w-4xl mx-auto px-3 xs:px-4 py-2">
            <TestimonialsSection />
          </section>
        </Suspense>

        <Divider />
        
        <Suspense fallback={<SectionLoader />}>
          <section data-contact className="scroll-mt-32 max-w-4xl mx-auto px-3 xs:px-4 py-2">
            <ContactSection />
          </section>
        </Suspense>
      </main>
    </div>
  );
}