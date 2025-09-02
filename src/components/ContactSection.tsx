import React, { useState } from 'react';
import Icon from '@/components/ui/icon';
import ContactModal from './ContactModal';

export default function ContactSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className="bg-background">
      <div className="max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl mx-auto px-4 sm:px-6 py-2 sm:py-4 space-y-12 sm:space-y-16">
        <h2 className="text-xl font-bold text-foreground mb-8 relative pt-0">
          <span className="relative inline-block">
            <span className="text-2xl font-bold relative z-10 text-primary">О</span>
            <div className="absolute w-9 h-9 rounded-full opacity-40" style={{
              background: 'linear-gradient(135deg, hsl(var(--primary) / 0.6) 0%, hsl(var(--primary) / 0.1) 100%)',
              top: '-1px',
              left: '-10px'
            }}></div>
          </span>ставьте сообщение
        </h2>
        
        {/* Элегантная кнопка связи */}
        <div className="flex justify-center mb-8">
          <button 
            className="relative overflow-hidden group bg-gradient-to-r from-primary via-primary/95 to-primary/90 hover:from-primary/95 hover:via-primary hover:to-primary text-white rounded-full px-8 py-5 transition-all duration-500 focus:outline-none focus:ring-2 focus:ring-primary/30 active:scale-[0.97] shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            onClick={() => setIsModalOpen(true)}
          >
            {/* Анимированный фон */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            
            <div className="relative flex items-center gap-4">
              {/* Аватар с анимацией */}
              <div className="relative">
                <div className="w-14 h-14 rounded-full overflow-hidden border-3 border-white/30 group-hover:border-white/50 transition-colors duration-300">
                  <img 
                    src="/img/ad82ffc8-0c3b-4ed9-9e55-893635b263d1.jpg" 
                    alt="Раиса Ильинская"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                {/* Статус онлайн с пульсацией */}
                <div className="absolute -bottom-1 -right-1">
                  <div className="w-5 h-5 bg-green-400 rounded-full flex items-center justify-center animate-pulse">
                    <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
                  </div>
                  <div className="absolute inset-0 w-5 h-5 bg-green-400 rounded-full animate-ping opacity-30"></div>
                </div>
              </div>
              
              {/* Текст */}
              <div className="text-left">
                <div className="flex items-center gap-3 mb-1">
                  <span className="font-bold text-base tracking-wide">Раиса Ильинская</span>
                  <span className="bg-green-400 text-green-900 text-xs px-2.5 py-1 rounded-full font-bold shadow-sm">
                    Online
                  </span>
                </div>
                <div className="text-white/90 font-medium text-sm group-hover:text-white transition-colors duration-300">
                  Напишите мне прямо сейчас
                </div>
              </div>
              
              {/* Стрелка с анимацией */}
              <div className="ml-2 transform group-hover:translate-x-1 group-hover:scale-110 transition-all duration-300">
                <Icon name="Send" size={18} className="text-white/80 group-hover:text-white" />
              </div>
            </div>
          </button>
        </div>

      {/* Карточки с преимуществами */}
      <div className="space-y-6">
        {/* Эффект виден сразу */}
        <div>
          <div className="w-12 h-12 rounded-full flex items-center justify-center mb-3 bg-accent/10">
            <Icon name="Activity" size={20} className="text-accent" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-3">Эффект виден сразу</h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Эффект наступает быстро, не нужно ждать долго для получения результата.
          </p>
        </div>

        {/* Без последствий */}
        <div>
          <div className="w-12 h-12 rounded-full flex items-center justify-center mb-3 bg-accent/10">
            <Icon name="Leaf" size={20} className="text-accent" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-3">Без последствий</h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Мои обряды полностью безвредны, не оставляют негатива и не наносят вреда.
          </p>
        </div>

        {/* Оплата по желанию */}
        <div>
          <div className="w-12 h-12 rounded-full flex items-center justify-center mb-3 bg-accent/10">
            <Icon name="Gift" size={20} className="text-accent" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-3">Оплата по желанию</h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Я не беру денег за свою работу, но вы можете отблагодарить меня как пожелаете после получения результата.
          </p>
        </div>

        {/* Конфиденциально */}
        <div>
          <div className="w-12 h-12 rounded-full flex items-center justify-center mb-3 bg-accent/10">
            <Icon name="Shield" size={20} className="text-accent" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-3">Конфиденциально</h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Я ценю личное пространство каждого, кто ко мне обращается.
          </p>
        </div>
        </div>
      </div>
      
      <ContactModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
}