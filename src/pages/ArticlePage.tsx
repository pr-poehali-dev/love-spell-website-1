import React, { useState } from 'react';
import Icon from '@/components/ui/icon';
import Header from '@/components/Header';
import Divider from '@/components/Divider';
import ContactModal from '@/components/ContactModal';

export default function ArticlePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTitle, setCurrentTitle] = useState('Маг');

  return (
    <div className="min-h-screen bg-background">
      <Header currentTitle={currentTitle} setCurrentTitle={setCurrentTitle} />
      
      <Divider />

      {/* Широкое изображение-баннер */}
      <div className="relative -mt-1">
        {/* Тень от липкой шапки */}
        <div className="absolute top-0 left-0 right-0 h-4 bg-gradient-to-b from-background/80 via-background/40 to-transparent pointer-events-none z-10"></div>
        
        <div className="w-full h-32 sm:h-40 md:h-48 relative overflow-hidden">
          <img 
            src="/img/87197c7b-2604-49c8-8c84-30a4c02cf233.jpg" 
            alt="Приворот на жену - восстановление гармонии в браке" 
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-primary/20"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-background/30 to-transparent"></div>
        </div>
        
        {/* Закругленные углы снизу с тенью */}
        <div className="absolute bottom-0 left-0 right-0 h-8">
          <div className="w-full h-full bg-background rounded-t-3xl shadow-[0_-8px_24px_rgba(0,0,0,0.3)]"></div>
        </div>
      </div>

      {/* Основной контент */}
      <main className="bg-background relative z-20">
        <div className="max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-12 sm:space-y-16">
        {/* Заголовок статьи */}
        <div>
          <h2 className="text-xl font-bold text-foreground mb-8 relative pt-0">
            <span className="relative inline-block">
              <span className="text-2xl font-bold relative z-10 text-primary">П</span>
              <div className="absolute w-9 h-9 rounded-full opacity-40" style={{
                background: 'linear-gradient(135deg, hsl(var(--primary) / 0.6) 0%, hsl(var(--primary) / 0.1) 100%)',
                top: '-1px',
                left: '-10px'
              }}></div>
            </span>риворот на жену
          </h2>
          <p className="text-muted-foreground leading-relaxed text-base mb-8">
            Как вернуть любовь и взаимопонимание в отношения с супругой через древние магические практики.
          </p>
        </div>



        {/* Содержание статьи */}
        <article className="text-foreground">
          {/* Введение */}
          <div className="mb-8">
            <p className="text-xl leading-relaxed mb-6 text-muted-foreground">
              Семейные отношения — это живая система, которая требует постоянного внимания и заботы. Иногда происходит так, 
              что любовь между супругами начинает угасать, возникают недопонимания, холодность в отношениях. 
              В таких случаях приворот на жену может стать эффективным способом восстановления гармонии в браке.
            </p>
          </div>

          {/* Основные разделы */}
          <div className="space-y-12">
            {/* Что такое приворот на жену */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                  <Icon name="Heart" size={20} className="text-primary" />
                </div>
                Что такое приворот на жену
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Приворот на супругу — это магический ритуал, направленный на восстановление любви, 
                  взаимопонимания и гармонии в браке. Это не принуждение, а пробуждение тех чувств, 
                  которые когда-то связывали вас крепкими узами.
                </p>
                <p>
                  Важно понимать, что такой приворот работает только в том случае, если между супругами 
                  действительно была любовь, и она просто нуждается в возрождении. Магия лишь помогает 
                  убрать препятствия и восстановить естественную связь между людьми.
                </p>
              </div>
            </section>

            {/* Когда стоит обращаться */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center">
                <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                  <Icon name="AlertCircle" size={20} className="text-accent" />
                </div>
                Когда стоит обращаться к приворотной магии
              </h2>
              <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div className="space-y-4">
                  <div className="bg-card p-6 rounded-lg border border-border">
                    <div className="flex items-start space-x-3">
                      <Icon name="Check" size={20} className="text-success mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">Охлаждение в отношениях</h3>
                        <p className="text-muted-foreground text-sm">
                          Жена стала холодной, избегает близости, проводит больше времени вне дома
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-card p-6 rounded-lg border border-border">
                    <div className="flex items-start space-x-3">
                      <Icon name="Check" size={20} className="text-success mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">Частые ссоры</h3>
                        <p className="text-muted-foreground text-sm">
                          Постоянные конфликты по мелочам, отсутствие взаимопонимания
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="bg-card p-6 rounded-lg border border-border">
                    <div className="flex items-start space-x-3">
                      <Icon name="Check" size={20} className="text-success mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">Подозрения в измене</h3>
                        <p className="text-muted-foreground text-sm">
                          Появились признаки того, что жена может быть увлечена кем-то другим
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-card p-6 rounded-lg border border-border">
                    <div className="flex items-start space-x-3">
                      <Icon name="Check" size={20} className="text-success mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">Желание развестись</h3>
                        <p className="text-muted-foreground text-sm">
                          Супруга говорит о разводе, хотя раньше ваши отношения были крепкими
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Как работает приворот */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center">
                <div className="w-8 h-8 bg-info/10 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                  <Icon name="Sparkles" size={20} className="text-info" />
                </div>
                Как работает приворот на супругу
              </h2>
              <div className="space-y-6">
                <p className="text-muted-foreground">
                  Магический ритуал воздействует на тонком энергетическом уровне, устраняя блоки и препятствия, 
                  которые мешают естественному течению любви между супругами. Процесс происходит постепенно 
                  и гармонично.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 flex-shrink-0">
                      <Icon name="Moon" size={24} className="text-primary" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">1-7 дней</h3>
                    <p className="text-muted-foreground text-sm">Первые изменения в поведении жены</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4 flex-shrink-0">
                      <Icon name="Sun" size={24} className="text-accent" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">2-3 недели</h3>
                    <p className="text-muted-foreground text-sm">Восстановление близости и доверия</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4 flex-shrink-0">
                      <Icon name="Star" size={24} className="text-success" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">1-2 месяца</h3>
                    <p className="text-muted-foreground text-sm">Полная гармонизация отношений</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Важные принципы */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center">
                <div className="w-8 h-8 bg-warning/10 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                  <Icon name="Shield" size={20} className="text-warning" />
                </div>
                Важные принципы безопасного приворота
              </h2>
              
              <div className="bg-card p-8 rounded-xl border border-border">
                <div className="space-y-6">
                  <div className="flex items-start space-x-3 sm:space-x-4">
                    <div className="w-6 h-6 sm:w-7 sm:h-7 bg-primary/10 rounded-lg flex items-center justify-center mt-1 flex-shrink-0">
                      <Icon name="Heart" size={16} className="text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">Только с любовью</h3>
                      <p className="text-muted-foreground">
                        Приворот должен основываться на истинных чувствах, а не на желании контролировать человека.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3 sm:space-x-4">
                    <div className="w-6 h-6 sm:w-7 sm:h-7 bg-success/10 rounded-lg flex items-center justify-center mt-1 flex-shrink-0">
                      <Icon name="Leaf" size={16} className="text-success" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">Без вреда</h3>
                      <p className="text-muted-foreground">
                        Используются только белые магические практики, которые не несут негативных последствий.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3 sm:space-x-4">
                    <div className="w-6 h-6 sm:w-7 sm:h-7 bg-info/10 rounded-lg flex items-center justify-center mt-1 flex-shrink-0">
                      <Icon name="Clock" size={16} className="text-info" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">Естественность</h3>
                      <p className="text-muted-foreground">
                        Результат должен выглядеть естественно, как пробуждение собственных чувств жены.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Результаты */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center">
                <div className="w-8 h-8 bg-success/10 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                  <Icon name="Trophy" size={20} className="text-success" />
                </div>
                Чего можно ожидать от ритуала
              </h2>
              
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-success/5 to-transparent p-6 rounded-lg border-l-4 border-success">
                  <h3 className="font-semibold text-foreground mb-2">✨ Возрождение интереса</h3>
                  <p className="text-muted-foreground">Жена снова начнет проявлять к вам внимание и заботу</p>
                </div>
                
                <div className="bg-gradient-to-r from-primary/5 to-transparent p-6 rounded-lg border-l-4 border-primary">
                  <h3 className="font-semibold text-foreground mb-2">💕 Восстановление близости</h3>
                  <p className="text-muted-foreground">Вернется физическая и эмоциональная близость в отношениях</p>
                </div>
                
                <div className="bg-gradient-to-r from-accent/5 to-transparent p-6 rounded-lg border-l-4 border-accent">
                  <h3 className="font-semibold text-foreground mb-2">🏠 Семейное счастье</h3>
                  <p className="text-muted-foreground">Дом снова наполнится теплом, пониманием и взаимной любовью</p>
                </div>
              </div>
            </section>
          </div>
        </article>

        {/* Призыв к действию */}
        <div className="mt-12 sm:mt-16 mb-8 sm:mb-12 px-2">
          <div className="relative bg-card/50 backdrop-blur-sm p-6 sm:p-8 rounded-xl sm:rounded-2xl border border-border shadow-lg text-center overflow-hidden">
            {/* Декоративные элементы */}
            <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-2xl"></div>
            <div className="absolute bottom-0 right-0 w-16 h-16 bg-gradient-to-tl from-accent/20 to-transparent rounded-full blur-xl"></div>
            
            <div className="relative max-w-2xl mx-auto">
              {/* Профиль */}
              <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 mb-6">
                <div className="relative">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-3 border-white shadow-lg">
                    <img 
                      src="/img/ad82ffc8-0c3b-4ed9-9e55-893635b263d1.jpg" 
                      alt="Раиса Ильинская"
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  {/* Индикатор онлайн */}
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-white border-2 border-card rounded-full flex items-center justify-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  </div>
                </div>
                
                <div className="text-center sm:text-left flex-1">
                  <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-1">
                    Готовы вернуть любовь в ваш брак?
                  </h2>
                  <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                    Не позволяйте отношениям разрушиться. Обратитесь ко мне за помощью.
                  </p>
                </div>
              </div>
              
              {/* Кнопка действия */}
              <div className="mb-6">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-primary hover:bg-primary/90 text-primary-foreground px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-base sm:text-lg transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  <Icon name="MessageCircle" size={20} className="group-hover:scale-110 transition-transform" />
                  <span>Получить консультацию</span>
                </button>
              </div>
                
              {/* Преимущества */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 text-sm">
                <div className="flex items-center justify-center gap-2 p-3 rounded-lg bg-background/50">
                  <Icon name="Shield" size={16} className="text-success flex-shrink-0" />
                  <span className="text-muted-foreground">Конфиденциально</span>
                </div>
                <div className="flex items-center justify-center gap-2 p-3 rounded-lg bg-background/50">
                  <Icon name="Clock" size={16} className="text-accent flex-shrink-0" />
                  <span className="text-muted-foreground">Быстрый результат</span>
                </div>
                <div className="flex items-center justify-center gap-2 p-3 rounded-lg bg-background/50">
                  <Icon name="Heart" size={16} className="text-primary flex-shrink-0" />
                  <span className="text-muted-foreground">Без вреда</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      </main>

      <ContactModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
}