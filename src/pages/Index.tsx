import { useState } from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import AboutMeSection from '@/components/AboutMeSection';
import RitualsPageSection from '@/components/RitualsPageSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import Divider from '@/components/Divider';
import Icon from '@/components/ui/icon';

export default function Index() {
  const [currentTitle, setCurrentTitle] = useState('Маг');
  const [showMoreRituals, setShowMoreRituals] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header currentTitle={currentTitle} setCurrentTitle={setCurrentTitle} />
      
      <HeroSection currentTitle={currentTitle} />

      <Divider />

      <main className="space-y-12">
        <section id="about" className="scroll-mt-32 max-w-4xl mx-auto px-4 py-8">
          <AboutMeSection />
        </section>

        <Divider />

        <section id="rituals" className="scroll-mt-32 max-w-4xl mx-auto px-4 py-8">
          <RitualsPageSection 
            showMoreRituals={showMoreRituals} 
            setShowMoreRituals={setShowMoreRituals} 
          />
        </section>

        <Divider />

        <section id="testimonials" className="scroll-mt-32 max-w-4xl mx-auto px-4 py-8">
          <TestimonialsSection />
        </section>
        
        <section data-contact className="scroll-mt-32 max-w-4xl mx-auto px-4 py-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-foreground mb-6">
              <span className="relative inline-block">
                <span className="text-2xl font-bold relative z-10" style={{color: '#ff9800'}}>С</span>
                <div className="absolute w-9 h-9 rounded-full opacity-40" style={{
                  background: 'linear-gradient(135deg, rgba(255, 152, 0, 0.6) 0%, rgba(255, 152, 0, 0.1) 100%)',
                  top: '-1px',
                  left: '-10px'
                }}></div>
              </span>вязаться со мной
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto text-base leading-relaxed">
              Готова ответить на ваши вопросы и помочь найти решение. Напишите мне, и мы вместе найдем путь к вашему счастью и благополучию.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="https://t.me/username" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
              >
                <Icon name="MessageCircle" size={20} className="mr-2" />
                Telegram
              </a>
              <a 
                href="https://wa.me/1234567890" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors"
              >
                <Icon name="Phone" size={20} className="mr-2" />
                WhatsApp
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}