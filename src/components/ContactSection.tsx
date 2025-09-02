import Icon from '@/components/ui/icon';

export default function ContactSection() {
  return (
    <div className="text-center">
      <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-16">
        <span className="relative inline-block">
          <span className="text-3xl md:text-4xl font-bold relative z-10" style={{color: '#ff9800'}}>О</span>
          <div className="absolute w-12 h-12 rounded-full opacity-40" style={{
            background: 'linear-gradient(135deg, rgba(255, 152, 0, 0.6) 0%, rgba(255, 152, 0, 0.1) 100%)',
            top: '-2px',
            left: '-12px'
          }}></div>
        </span>ставьте сообщение
      </h2>
      
      {/* Оранжевая кнопка с аватаром */}
      <div className="flex justify-center mb-16">
        <button 
          className="flex items-center bg-accent hover:bg-accent/90 text-white rounded-full pl-2 pr-8 py-2 transition-all hover:shadow-lg hover:shadow-accent/25 hover:-translate-y-1 group"
          onClick={() => {
            window.open('https://t.me/username', '_blank');
          }}
        >
          <div className="relative mr-4">
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white">
              <img 
                src="/img/ad82ffc8-0c3b-4ed9-9e55-893635b263d1.jpg" 
                alt="Раиса Ильинская"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
              <Icon name="MessageCircle" size={10} className="text-white" />
            </div>
          </div>
          <div className="text-left">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-semibold text-sm">Раиса</span>
              <span className="bg-green-500 text-xs px-2 py-0.5 rounded-full">Online</span>
            </div>
            <div className="text-sm font-medium">Напишите мне</div>
          </div>
        </button>
      </div>

      {/* Карточки с преимуществами */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {/* Эффект виден сразу */}
        <div className="hover-lift text-left">
          <div className="w-14 h-14 rounded-full flex items-center justify-center mb-6 bg-accent/10 mx-auto md:mx-0">
            <Icon name="Activity" size={24} className="text-accent" />
          </div>
          <h3 className="text-xl font-semibold text-foreground mb-4 text-center md:text-left">Эффект виден сразу</h3>
          <p className="text-muted-foreground leading-relaxed text-center md:text-left">
            Эффект наступает быстро, не нужно ждать долго для получения результата.
          </p>
        </div>

        {/* Без последствий */}
        <div className="hover-lift text-left">
          <div className="w-14 h-14 rounded-full flex items-center justify-center mb-6 bg-accent/10 mx-auto md:mx-0">
            <Icon name="Leaf" size={24} className="text-accent" />
          </div>
          <h3 className="text-xl font-semibold text-foreground mb-4 text-center md:text-left">Без последствий</h3>
          <p className="text-muted-foreground leading-relaxed text-center md:text-left">
            Мои обряды полностью безвредны, не оставляют негатива и не наносят вреда.
          </p>
        </div>

        {/* Оплата по желанию */}
        <div className="hover-lift text-left">
          <div className="w-14 h-14 rounded-full flex items-center justify-center mb-6 bg-accent/10 mx-auto md:mx-0">
            <Icon name="Gift" size={24} className="text-accent" />
          </div>
          <h3 className="text-xl font-semibold text-foreground mb-4 text-center md:text-left">Оплата по желанию</h3>
          <p className="text-muted-foreground leading-relaxed text-center md:text-left">
            Я не беру денег за свою работу, но вы можете отблагодарить меня как пожелаете после получения результата.
          </p>
        </div>

        {/* Конфиденциально */}
        <div className="hover-lift text-left">
          <div className="w-14 h-14 rounded-full flex items-center justify-center mb-6 bg-accent/10 mx-auto md:mx-0">
            <Icon name="Shield" size={24} className="text-accent" />
          </div>
          <h3 className="text-xl font-semibold text-foreground mb-4 text-center md:text-left">Конфиденциально</h3>
          <p className="text-muted-foreground leading-relaxed text-center md:text-left">
            Я ценю личное пространство каждого, кто ко мне обращается.
          </p>
        </div>
      </div>
    </div>
  );
}