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
        
        {/* Кнопка связи - продвинутая адаптивность */}
        <div className="flex justify-center mb-6 sm:mb-8 lg:mb-10 px-2 xs:px-3 sm:px-4">
          <div className="relative w-full max-w-[280px] xs:max-w-[300px] sm:max-w-[340px] md:max-w-[380px]">
            {/* Основная кнопка */}
            <button 
              onClick={() => setIsModalOpen(true)}
              className="group relative w-full bg-card/80 hover:bg-card/95 backdrop-blur-md text-foreground rounded-2xl sm:rounded-3xl transition-all duration-500 hover:shadow-2xl hover:shadow-primary/15 transform hover:scale-[1.015] active:scale-[0.985] focus:outline-none focus:ring-4 focus:ring-primary/25 border border-border/40 hover:border-primary/30 overflow-hidden will-change-transform"
            >
              {/* Анимированный градиент */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-transparent to-accent/8 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Иконка чата в верхнем левом углу */}
              <div className="absolute top-3 left-3 sm:top-4 sm:left-4 opacity-10 group-hover:opacity-20 transition-opacity duration-500">
                <Icon name="MessageSquare" size={16} className="text-foreground xs:w-[18px] xs:h-[18px] sm:w-5 sm:h-5" />
              </div>
              
              {/* Контент кнопки */}
              <div className="relative px-3 py-3 xs:px-4 xs:py-4 sm:px-5 sm:py-5 md:px-6 md:py-6">
                
                {/* Профиль по центру */}
                <div className="text-center mb-2.5 xs:mb-3 sm:mb-4">
                  {/* Аватар в центре */}
                  <div className="relative inline-block mb-2">
                    <div className="w-12 h-12 xs:w-14 xs:h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden border-2 sm:border-[3px] border-primary/25 group-hover:border-primary/50 transition-all duration-400 mx-auto">
                      <img 
                        src="/img/ad82ffc8-0c3b-4ed9-9e55-893635b263d1.jpg" 
                        alt="Раиса Ильинская"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        loading="lazy"
                      />
                    </div>
                    {/* Online индикатор */}
                    <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6">
                      <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-75" />
                      <div className="relative w-full h-full bg-green-500 border-2 border-card rounded-full" />
                    </div>
                  </div>
                  
                  {/* Текст по центру */}
                  <div>
                    <div className="font-semibold text-foreground text-sm xs:text-base sm:text-lg md:text-xl leading-tight mb-1">
                      Раиса Ильинская
                    </div>
                    <div className="text-muted-foreground text-xs xs:text-sm sm:text-base flex items-center justify-center gap-1.5">
                      <div className="w-1.5 h-1.5 xs:w-2 xs:h-2 bg-green-500 rounded-full animate-pulse" />
                      <span>Онлайн</span>
                    </div>
                  </div>
                </div>
                
                {/* Основное действие - оранжевая кнопка с самолётиком */}
                <div className="bg-gradient-to-r from-primary to-primary/90 group-hover:from-primary/95 group-hover:to-primary/85 text-primary-foreground rounded-xl sm:rounded-2xl px-3 py-2.5 xs:px-4 xs:py-3 sm:px-5 sm:py-3.5 mb-3 sm:mb-4 transition-all duration-400 group-hover:shadow-lg group-hover:-translate-y-0.5 will-change-transform">
                  <div className="flex items-center justify-center gap-2 xs:gap-2.5 sm:gap-3">
                    <Icon 
                      name="Plane" 
                      size={16} 
                      className="text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-400 xs:w-[18px] xs:h-[18px] sm:w-5 sm:h-5 flex-shrink-0" 
                    />
                    <span className="font-bold text-sm xs:text-base sm:text-lg md:text-xl leading-tight text-center min-w-0">
                      Напишите мне
                    </span>
                  </div>
                </div>
                
                {/* Компактные преимущества */}
                <div className="grid grid-cols-3 gap-1.5 xs:gap-2 sm:gap-3 text-center">
                  <div className="group/item px-1 py-0.5">
                    <div className="w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8 mx-auto mb-0.5 xs:mb-1 bg-accent/10 group-hover:bg-accent/15 rounded-md xs:rounded-lg flex items-center justify-center group-hover/item:bg-accent/25 group-hover/item:scale-110 transition-all duration-300">
                      <Icon name="Zap" size={10} className="text-accent xs:w-3 xs:h-3 sm:w-3.5 sm:h-3.5" />
                    </div>
                    <div className="text-[9px] xs:text-[10px] sm:text-xs font-medium text-foreground leading-tight">Быстро</div>
                  </div>
                  <div className="group/item px-1 py-0.5">
                    <div className="w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8 mx-auto mb-0.5 xs:mb-1 bg-success/10 group-hover:bg-success/15 rounded-md xs:rounded-lg flex items-center justify-center group-hover/item:bg-success/25 group-hover/item:scale-110 transition-all duration-300">
                      <Icon name="Shield" size={10} className="text-success xs:w-3 xs:h-3 sm:w-3.5 sm:h-3.5" />
                    </div>
                    <div className="text-[9px] xs:text-[10px] sm:text-xs font-medium text-foreground leading-tight">Надёжно</div>
                  </div>
                  <div className="group/item px-1 py-0.5">
                    <div className="w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8 mx-auto mb-0.5 xs:mb-1 bg-info/10 group-hover:bg-info/15 rounded-md xs:rounded-lg flex items-center justify-center group-hover/item:bg-info/25 group-hover/item:scale-110 transition-all duration-300">
                      <Icon name="Heart" size={10} className="text-info xs:w-3 xs:h-3 sm:w-3.5 sm:h-3.5" />
                    </div>
                    <div className="text-[9px] xs:text-[10px] sm:text-xs font-medium text-foreground leading-tight">Бесплатно</div>
                  </div>
                </div>
              </div>
              
              {/* Улучшенные декоративные элементы */}
              <div className="absolute top-3 right-3 sm:top-4 sm:right-4 w-8 h-8 sm:w-12 sm:h-12 bg-primary/5 rounded-full blur-md sm:blur-xl group-hover:bg-primary/10 transition-all duration-700" />
              <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 w-6 h-6 sm:w-8 sm:h-8 bg-accent/5 rounded-full blur-sm sm:blur-lg group-hover:bg-accent/10 transition-all duration-700" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 sm:w-32 sm:h-32 bg-gradient-to-br from-primary/[0.02] to-accent/[0.02] rounded-full blur-2xl group-hover:from-primary/[0.04] group-hover:to-accent/[0.04] transition-all duration-1000" />
            </button>
            
            {/* Многослойная внешняя подсветка */}
            <div className="absolute -inset-0.5 sm:-inset-1 bg-gradient-to-r from-primary/15 via-accent/8 to-primary/15 rounded-2xl sm:rounded-3xl blur-sm sm:blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10" />
            <div className="absolute -inset-1 sm:-inset-2 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 rounded-3xl sm:rounded-[2rem] blur-xl sm:blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000 -z-20" />
          </div>
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