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
        <div className="flex justify-center mb-6 sm:mb-8 lg:mb-10 px-3 sm:px-4">
          <div className="relative w-full max-w-[300px] xs:max-w-[320px] sm:max-w-[360px] md:max-w-[400px]">
            {/* Основная кнопка */}
            <button 
              onClick={() => setIsModalOpen(true)}
              className="group relative w-full bg-card/80 hover:bg-card/95 backdrop-blur-md text-foreground rounded-2xl sm:rounded-3xl transition-all duration-500 hover:shadow-2xl hover:shadow-primary/15 transform hover:scale-[1.015] active:scale-[0.985] focus:outline-none focus:ring-4 focus:ring-primary/25 border border-border/40 hover:border-primary/30 overflow-hidden will-change-transform"
            >
              {/* Анимированный градиент */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-transparent to-accent/8 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Контент кнопки */}
              <div className="relative px-4 py-4 xs:px-5 xs:py-5 sm:px-6 sm:py-6 md:px-7 md:py-7">
                
                {/* Шапка: Профиль консультанта */}
                <div className="flex items-center justify-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                  {/* Аватар с улучшенными эффектами */}
                  <div className="relative flex-shrink-0">
                    <div className="w-11 h-11 xs:w-12 xs:h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden border-2 sm:border-[3px] border-primary/25 group-hover:border-primary/50 transition-all duration-400 group-hover:shadow-lg group-hover:shadow-primary/20">
                      <img 
                        src="/img/ad82ffc8-0c3b-4ed9-9e55-893635b263d1.jpg" 
                        alt="Раиса Ильинская"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        loading="lazy"
                      />
                    </div>
                    {/* Online индикатор с пульсацией */}
                    <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 xs:w-4 xs:h-4 sm:w-5 sm:h-5">
                      <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-75" />
                      <div className="relative w-full h-full bg-green-500 border-2 border-card rounded-full" />
                    </div>
                  </div>
                  
                  {/* Информация о консультанте */}
                  <div className="text-center min-w-0 flex-1">
                    <div className="font-semibold text-foreground text-sm xs:text-base sm:text-lg md:text-xl truncate">
                      Раиса Ильинская
                    </div>
                    <div className="text-muted-foreground text-xs xs:text-sm flex items-center justify-center gap-1.5 mt-0.5">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                      <span className="whitespace-nowrap">Онлайн сейчас</span>
                    </div>
                  </div>
                </div>
                
                {/* Основное действие - адаптивная кнопка */}
                <div className="bg-gradient-to-r from-primary to-primary/90 group-hover:from-primary/95 group-hover:to-primary/85 text-primary-foreground rounded-xl sm:rounded-2xl px-4 py-3 xs:px-5 xs:py-3.5 sm:px-6 sm:py-4 mb-3 sm:mb-4 transition-all duration-400 group-hover:shadow-xl group-hover:shadow-primary/30 group-hover:-translate-y-0.5 will-change-transform">
                  <div className="flex items-center justify-center gap-2.5 sm:gap-3">
                    <div className="w-5 h-5 xs:w-6 xs:h-6 bg-white/20 rounded-lg flex items-center justify-center group-hover:bg-white/30 group-hover:rotate-12 transition-all duration-400">
                      <Icon name="MessageCircle" size={14} className="text-primary-foreground xs:w-4 xs:h-4" />
                    </div>
                    <span className="font-bold text-base xs:text-lg sm:text-xl md:text-2xl leading-tight">
                      Напишите мне
                    </span>
                    <Icon 
                      name="Send" 
                      size={14} 
                      className="text-primary-foreground/80 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-400 xs:w-4 xs:h-4" 
                    />
                  </div>
                </div>
                
                {/* Преимущества - адаптивная сетка */}
                <div className="grid grid-cols-3 gap-2 xs:gap-3 sm:gap-4 text-center">
                  <div className="group/item p-1">
                    <div className="w-7 h-7 xs:w-8 xs:h-8 sm:w-9 sm:h-9 mx-auto mb-1 xs:mb-1.5 bg-accent/10 group-hover:bg-accent/15 rounded-lg sm:rounded-xl flex items-center justify-center group-hover/item:bg-accent/25 group-hover/item:scale-110 transition-all duration-300">
                      <Icon name="Zap" size={11} className="text-accent xs:w-3 xs:h-3 sm:w-4 sm:h-4" />
                    </div>
                    <div className="text-[10px] xs:text-xs sm:text-sm font-medium text-foreground leading-tight">Быстро</div>
                  </div>
                  <div className="group/item p-1">
                    <div className="w-7 h-7 xs:w-8 xs:h-8 sm:w-9 sm:h-9 mx-auto mb-1 xs:mb-1.5 bg-success/10 group-hover:bg-success/15 rounded-lg sm:rounded-xl flex items-center justify-center group-hover/item:bg-success/25 group-hover/item:scale-110 transition-all duration-300">
                      <Icon name="Shield" size={11} className="text-success xs:w-3 xs:h-3 sm:w-4 sm:h-4" />
                    </div>
                    <div className="text-[10px] xs:text-xs sm:text-sm font-medium text-foreground leading-tight">Надёжно</div>
                  </div>
                  <div className="group/item p-1">
                    <div className="w-7 h-7 xs:w-8 xs:h-8 sm:w-9 sm:h-9 mx-auto mb-1 xs:mb-1.5 bg-info/10 group-hover:bg-info/15 rounded-lg sm:rounded-xl flex items-center justify-center group-hover/item:bg-info/25 group-hover/item:scale-110 transition-all duration-300">
                      <Icon name="Heart" size={11} className="text-info xs:w-3 xs:h-3 sm:w-4 sm:h-4" />
                    </div>
                    <div className="text-[10px] xs:text-xs sm:text-sm font-medium text-foreground leading-tight">Бесплатно</div>
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