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
        
        {/* Адаптивная кнопка связи */}
        <div className="flex justify-center mb-8">
          <div className="relative w-full max-w-sm px-2 xs:px-4">
            <button 
              className="relative flex items-center w-full bg-primary hover:bg-primary/90 text-white rounded-full py-3 pl-16 xs:pl-18 sm:pl-20 pr-3 xs:pr-4 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/20 active:scale-[0.98] group shadow-lg h-14 xs:h-16"
              onClick={() => setIsModalOpen(true)}
            >
              {/* Контент - две строки */}
              <div className="flex flex-col justify-center gap-1 min-w-0 flex-1">
                {/* Первая строка: Раиса Online */}
                <div className="flex items-center gap-2 w-full">
                  <span className="text-white font-semibold text-xs xs:text-sm sm:text-base truncate flex-shrink-0">Раиса</span>
                  <span className="bg-green-500 text-white text-xs font-semibold px-1.5 xs:px-2 py-0.5 rounded-full whitespace-nowrap flex-shrink-0">
                    Online
                  </span>
                </div>
                {/* Вторая строка: Напишите мне */}
                <div className="text-white text-xs xs:text-sm sm:text-base font-bold truncate w-full">
                  Напишите мне
                </div>
              </div>
            </button>
            
            {/* Аватар - идеально прилегает к левому краю кнопки */}
            <div className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10">
              <div className="relative">
                <div className="w-14 h-14 xs:w-16 xs:h-16 rounded-full overflow-hidden border-3 xs:border-4 border-white bg-white flex-shrink-0">
                  <img 
                    src="/img/ad82ffc8-0c3b-4ed9-9e55-893635b263d1.jpg" 
                    alt="Раиса Ильинская"
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Иконка сообщения */}
                <div className="absolute -bottom-0.5 -right-0.5 w-5 h-5 xs:w-6 xs:h-6 bg-white rounded-full flex items-center justify-center shadow-sm">
                  <div className="w-3.5 h-3.5 xs:w-4 xs:h-4 bg-green-500 rounded-full flex items-center justify-center">
                    <div className="flex gap-0.5">
                      <div className="w-0.5 h-0.5 bg-white rounded-full"></div>
                      <div className="w-0.5 h-0.5 bg-white rounded-full"></div>
                      <div className="w-0.5 h-0.5 bg-white rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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