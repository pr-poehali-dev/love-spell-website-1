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
        
        {/* Кнопка связи - премиум дизайн */}
        <div className="flex justify-center mb-8">
          <div className="relative w-full max-w-sm sm:max-w-md mx-4">
            {/* Основная кнопка */}
            <button 
              onClick={() => setIsModalOpen(true)}
              className="group relative w-full bg-card hover:bg-card/95 text-foreground rounded-3xl transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-4 focus:ring-primary/20 border border-border/50 hover:border-primary/30 overflow-hidden backdrop-blur-sm"
            >
              {/* Градиентный оверлей */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Контент кнопки */}
              <div className="relative px-6 py-5 sm:px-8 sm:py-6">
                
                {/* Шапка: Статус с аватаром */}
                <div className="flex items-center justify-center gap-3 mb-4">
                  {/* Мини-аватар */}
                  <div className="relative">
                    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full overflow-hidden border-2 border-primary/20 group-hover:border-primary/40 transition-colors duration-300">
                      <img 
                        src="/img/ad82ffc8-0c3b-4ed9-9e55-893635b263d1.jpg" 
                        alt="Раиса"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    {/* Онлайн индикатор */}
                    <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-green-500 border-2 border-card rounded-full animate-pulse" />
                  </div>
                  
                  {/* Имя и статус */}
                  <div className="text-center">
                    <div className="font-semibold text-foreground text-base sm:text-lg">Раиса Ильинская</div>
                    <div className="text-muted-foreground text-xs sm:text-sm flex items-center justify-center gap-1.5">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                      Онлайн сейчас
                    </div>
                  </div>
                </div>
                
                {/* Основное действие */}
                <div className="bg-gradient-to-r from-primary to-primary/90 group-hover:from-primary/95 group-hover:to-primary/85 text-primary-foreground rounded-2xl px-6 py-4 mb-3 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-primary/25">
                  <div className="flex items-center justify-center gap-3">
                    <div className="w-6 h-6 bg-white/20 rounded-lg flex items-center justify-center group-hover:bg-white/30 transition-colors duration-300">
                      <Icon name="MessageCircle" size={14} className="text-primary-foreground" />
                    </div>
                    <span className="font-bold text-lg sm:text-xl">
                      Напишите мне
                    </span>
                    <Icon 
                      name="Send" 
                      size={16} 
                      className="text-primary-foreground/80 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" 
                    />
                  </div>
                </div>
                
                {/* Преимущества - три колонки */}
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="group/item">
                    <div className="w-8 h-8 mx-auto mb-1.5 bg-accent/10 rounded-lg flex items-center justify-center group-hover/item:bg-accent/20 transition-colors duration-300">
                      <Icon name="Zap" size={12} className="text-accent" />
                    </div>
                    <div className="text-xs font-medium text-foreground">Быстро</div>
                  </div>
                  <div className="group/item">
                    <div className="w-8 h-8 mx-auto mb-1.5 bg-success/10 rounded-lg flex items-center justify-center group-hover/item:bg-success/20 transition-colors duration-300">
                      <Icon name="Shield" size={12} className="text-success" />
                    </div>
                    <div className="text-xs font-medium text-foreground">Надёжно</div>
                  </div>
                  <div className="group/item">
                    <div className="w-8 h-8 mx-auto mb-1.5 bg-info/10 rounded-lg flex items-center justify-center group-hover/item:bg-info/20 transition-colors duration-300">
                      <Icon name="Heart" size={12} className="text-info" />
                    </div>
                    <div className="text-xs font-medium text-foreground">Бесплатно</div>
                  </div>
                </div>
              </div>
              
              {/* Декоративные элементы */}
              <div className="absolute top-4 right-4 w-12 h-12 bg-primary/5 rounded-full blur-xl group-hover:bg-primary/10 transition-colors duration-700" />
              <div className="absolute bottom-4 left-4 w-8 h-8 bg-accent/5 rounded-full blur-lg group-hover:bg-accent/10 transition-colors duration-700" />
            </button>
            
            {/* Внешняя подсветка */}
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-accent/10 to-primary/20 rounded-3xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
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