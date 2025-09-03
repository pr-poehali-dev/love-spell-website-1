import React, { useState } from 'react';
import Icon from '@/components/ui/icon';
import ContactModal from '@/components/ContactModal';

export default function ArticlePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Липкая шапка */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <a href="/" className="text-xl font-bold text-primary hover:text-primary/80 transition-colors">
              Раиса Ильинская
            </a>
            <nav className="hidden md:flex space-x-6">
              <a href="/" className="text-foreground hover:text-primary transition-colors">Главная</a>
              <a href="#услуги" className="text-muted-foreground hover:text-primary transition-colors">Услуги</a>
              <a href="#отзывы" className="text-muted-foreground hover:text-primary transition-colors">Отзывы</a>
              <a href="#контакты" className="text-muted-foreground hover:text-primary transition-colors">Контакты</a>
            </nav>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
            >
              Связаться
            </button>
          </div>
        </div>
      </header>

      {/* Разделитель */}
      <div className="h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>

      {/* Основной контент */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        {/* Заголовок статьи */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 leading-tight">
            Приворот на жену: восстановление гармонии в браке
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Как вернуть любовь и взаимопонимание в отношения с супругой через древние магические практики
          </p>
        </div>

        {/* Иллюстрация */}
        <div className="mb-12 text-center">
          <div className="relative inline-block">
            <img 
              src="/img/0e081d67-4997-4e3c-8b95-aab516500b10.jpg" 
              alt="Приворот на жену - магические свечи и ритуальные предметы" 
              className="w-full max-w-2xl mx-auto rounded-2xl shadow-2xl"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent rounded-2xl"></div>
          </div>
        </div>

        {/* Содержание статьи */}
        <article className="prose prose-lg max-w-none text-foreground">
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
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center mr-3">
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
                <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center mr-3">
                  <Icon name="AlertCircle" size={20} className="text-accent" />
                </div>
                Когда стоит обращаться к приворотной магии
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
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
                <div className="w-8 h-8 bg-info/10 rounded-lg flex items-center justify-center mr-3">
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
                
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon name="Moon" size={24} className="text-primary" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">1-7 дней</h3>
                    <p className="text-muted-foreground text-sm">Первые изменения в поведении жены</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon name="Sun" size={24} className="text-accent" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">2-3 недели</h3>
                    <p className="text-muted-foreground text-sm">Восстановление близости и доверия</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
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
                <div className="w-8 h-8 bg-warning/10 rounded-lg flex items-center justify-center mr-3">
                  <Icon name="Shield" size={20} className="text-warning" />
                </div>
                Важные принципы безопасного приворота
              </h2>
              
              <div className="bg-card p-8 rounded-xl border border-border">
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <Icon name="Heart" size={24} className="text-primary mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">Только с любовью</h3>
                      <p className="text-muted-foreground">
                        Приворот должен основываться на истинных чувствах, а не на желании контролировать человека.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <Icon name="Leaf" size={24} className="text-success mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">Без вреда</h3>
                      <p className="text-muted-foreground">
                        Используются только белые магические практики, которые не несут негативных последствий.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <Icon name="Clock" size={24} className="text-info mt-1 flex-shrink-0" />
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
                <div className="w-8 h-8 bg-success/10 rounded-lg flex items-center justify-center mr-3">
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
        <div className="mt-16 mb-12">
          <div className="bg-gradient-to-br from-primary/5 via-accent/5 to-primary/5 p-8 rounded-2xl border border-primary/20 text-center">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Готовы вернуть любовь в ваш брак?
              </h2>
              <p className="text-muted-foreground mb-8 text-lg">
                Не позволяйте отношениям разрушиться. Обратитесь ко мне за помощью, 
                и вместе мы восстановим гармонию в вашей семье.
              </p>
              
              <div className="space-y-4">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="inline-flex items-center gap-3 bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  <Icon name="MessageCircle" size={24} />
                  Получить консультацию
                </button>
                
                <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground mt-6">
                  <div className="flex items-center gap-2">
                    <Icon name="Shield" size={16} className="text-success" />
                    <span>Конфиденциально</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon name="Clock" size={16} className="text-accent" />
                    <span>Быстрый результат</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon name="Heart" size={16} className="text-primary" />
                    <span>Без вреда</span>
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