import React, { useState } from 'react';
import Icon from '@/components/ui/icon';
import Header from '@/components/Header';
import ContactModal from '@/components/ContactModal';

export default function ArticleHusbandPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTitle, setCurrentTitle] = useState('Маг');

  return (
    <div className="min-h-screen bg-background">
      <Header currentTitle={currentTitle} setCurrentTitle={setCurrentTitle} />

      {/* Широкое изображение-баннер */}
      <div className="relative z-0">
        {/* Тень от липкой шапки */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-b from-background/60 via-background/20 to-transparent pointer-events-none z-10"></div>
        
        <div className="w-full h-32 sm:h-40 md:h-48 relative overflow-hidden">
          <img 
            src="/img/9b5bb5e7-9a48-43c0-a089-59924ea39e86.jpg" 
            alt="Приворот на мужа - возвращение любви и верности" 
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
      <main className="bg-background relative z-10">
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
            </span>риворот на мужа
          </h2>
          <p className="text-muted-foreground leading-relaxed text-base mb-8">
            Как вернуть внимание и любовь супруга, восстановить доверие и гармонию в семейных отношениях.
          </p>
        </div>

        {/* Содержание статьи */}
        <article className="text-foreground">
          {/* Введение */}
          <div className="mb-8">
            <p className="text-xl leading-relaxed mb-6 text-muted-foreground">
              Когда муж становится равнодушным, холодным или начинает искать внимание на стороне, 
              женщина готова на многое, чтобы вернуть его любовь. Приворот на супруга может стать 
              эффективным способом восстановления утраченной близости и доверия в браке.
            </p>
          </div>

          {/* Основные разделы */}
          <div className="space-y-12">
            {/* Особенности приворота на мужа */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                  <Icon name="Users" size={20} className="text-primary" />
                </div>
                Особенности приворота на супруга
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Приворот на мужа отличается от других видов любовной магии тем, что направлен на 
                  восстановление уже существующей связи между супругами. Это работа с энергетикой брака, 
                  которая помогает убрать препятствия и восстановить естественное влечение.
                </p>
                <p>
                  Мужская энергетика имеет свои особенности — мужчины больше реагируют на уважение, 
                  признание их силы и значимости. Поэтому ритуалы строятся с учетом мужской психологии 
                  и энергетических потребностей.
                </p>
              </div>
            </section>

            {/* Признаки охлаждения */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center">
                <div className="w-8 h-8 bg-warning/10 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                  <Icon name="AlertTriangle" size={20} className="text-warning" />
                </div>
                Признаки охлаждения в отношениях
              </h2>
              
              <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div className="space-y-4">
                  <div className="bg-card p-6 rounded-lg border border-border">
                    <div className="flex items-start space-x-3">
                      <Icon name="Clock" size={20} className="text-warning mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">Мало времени дома</h3>
                        <p className="text-muted-foreground text-sm">
                          Муж находит причины задерживаться на работе или проводить время с друзьями
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-card p-6 rounded-lg border border-border">
                    <div className="flex items-start space-x-3">
                      <Icon name="MessageSquare" size={20} className="text-warning mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">Скрытность</h3>
                        <p className="text-muted-foreground text-sm">
                          Прячет телефон, избегает разговоров о своих планах и делах
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="bg-card p-6 rounded-lg border border-border">
                    <div className="flex items-start space-x-3">
                      <Icon name="Heart" size={20} className="text-warning mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">Отсутствие нежности</h3>
                        <p className="text-muted-foreground text-sm">
                          Избегает объятий, поцелуев, стал менее внимательным к вашим потребностям
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-card p-6 rounded-lg border border-border">
                    <div className="flex items-start space-x-3">
                      <Icon name="Frown" size={20} className="text-warning mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">Раздражительность</h3>
                        <p className="text-muted-foreground text-sm">
                          Легко выходит из себя по мелочам, критикует ваши действия
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Как работает ритуал */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center">
                <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                  <Icon name="Zap" size={20} className="text-accent" />
                </div>
                Механизм воздействия приворота
              </h2>
              <div className="space-y-6">
                <p className="text-muted-foreground">
                  Ритуал работает на тонком энергетическом уровне, воздействуя на подсознание мужчины 
                  и пробуждая в нем те чувства, которые были заблокированы стрессом, рутиной или 
                  внешними влияниями.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon name="Brain" size={24} className="text-primary" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">Первая неделя</h3>
                    <p className="text-muted-foreground text-sm">Изменения на подсознательном уровне, улучшение настроения мужа</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon name="Eye" size={24} className="text-accent" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">2-3 недели</h3>
                    <p className="text-muted-foreground text-sm">Возрастает интерес к жене, желание проводить время вместе</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon name="Home" size={24} className="text-success" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">1-2 месяца</h3>
                    <p className="text-muted-foreground text-sm">Полное восстановление семейной гармонии и взаимопонимания</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Виды приворотов */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center">
                <div className="w-8 h-8 bg-info/10 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                  <Icon name="Layers" size={20} className="text-info" />
                </div>
                Виды приворотов на супруга
              </h2>
              
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-primary/5 to-transparent p-6 rounded-lg border-l-4 border-primary">
                  <h3 className="font-semibold text-foreground mb-2 flex items-center">
                    <Icon name="Flower" size={18} className="text-primary mr-2" />
                    Белый приворот
                  </h3>
                  <p className="text-muted-foreground">Самый мягкий и безопасный способ. Работает через положительную энергию любви и благословений.</p>
                </div>
                
                <div className="bg-gradient-to-r from-accent/5 to-transparent p-6 rounded-lg border-l-4 border-accent">
                  <h3 className="font-semibold text-foreground mb-2 flex items-center">
                    <Icon name="Flame" size={18} className="text-accent mr-2" />
                    Свечной ритуал
                  </h3>
                  <p className="text-muted-foreground">Использует силу огня для очищения и активации чувств. Эффективен при серьезных проблемах.</p>
                </div>
                
                <div className="bg-gradient-to-r from-success/5 to-transparent p-6 rounded-lg border-l-4 border-success">
                  <h3 className="font-semibold text-foreground mb-2 flex items-center">
                    <Icon name="Leaf" size={18} className="text-success mr-2" />
                    Травяной приворот
                  </h3>
                  <p className="text-muted-foreground">Основан на силе природы и растений. Подходит для укрепления длительных отношений.</p>
                </div>
              </div>
            </section>

            {/* Важные принципы */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center">
                <div className="w-8 h-8 bg-warning/10 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                  <Icon name="Shield" size={20} className="text-warning" />
                </div>
                Принципы этичного приворота
              </h2>
              
              <div className="bg-card p-8 rounded-xl border border-border">
                <div className="space-y-6">
                  <div className="flex items-start space-x-3 sm:space-x-4">
                    <div className="w-6 h-6 sm:w-7 sm:h-7 bg-primary/10 rounded-lg flex items-center justify-center mt-1 flex-shrink-0">
                      <Icon name="Heart" size={16} className="text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">С уважением к личности</h3>
                      <p className="text-muted-foreground">
                        Ритуал не должен подавлять волю мужчины, а лишь убирать препятствия для естественных чувств.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3 sm:space-x-4">
                    <div className="w-6 h-6 sm:w-7 sm:h-7 bg-success/10 rounded-lg flex items-center justify-center mt-1 flex-shrink-0">
                      <Icon name="Compass" size={16} className="text-success" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">Только для брака</h3>
                      <p className="text-muted-foreground">
                        Приворот на мужа работает только в рамках законного брака или серьезных отношений.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3 sm:space-x-4">
                    <div className="w-6 h-6 sm:w-7 sm:h-7 bg-info/10 rounded-lg flex items-center justify-center mt-1 flex-shrink-0">
                      <Icon name="Scale" size={16} className="text-info" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">Взаимная работа</h3>
                      <p className="text-muted-foreground">
                        Вместе с ритуалом важно работать над собой и отношениями в реальной жизни.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Ожидаемые результаты */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center">
                <div className="w-8 h-8 bg-success/10 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                  <Icon name="Target" size={20} className="text-success" />
                </div>
                Ожидаемые изменения
              </h2>
              
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-success/5 to-transparent p-6 rounded-lg border-l-4 border-success">
                  <h3 className="font-semibold text-foreground mb-2">💫 Возвращение внимания</h3>
                  <p className="text-muted-foreground">Муж снова начнет замечать вас, интересоваться вашими делами и чувствами</p>
                </div>
                
                <div className="bg-gradient-to-r from-primary/5 to-transparent p-6 rounded-lg border-l-4 border-primary">
                  <h3 className="font-semibold text-foreground mb-2">🏠 Желание быть дома</h3>
                  <p className="text-muted-foreground">Появится стремление проводить больше времени в семейном кругу</p>
                </div>
                
                <div className="bg-gradient-to-r from-accent/5 to-transparent p-6 rounded-lg border-l-4 border-accent">
                  <h3 className="font-semibold text-foreground mb-2">💕 Восстановление романтики</h3>
                  <p className="text-muted-foreground">Вернутся нежность, забота и романтические проявления чувств</p>
                </div>
                
                <div className="bg-gradient-to-r from-info/5 to-transparent p-6 rounded-lg border-l-4 border-info">
                  <h3 className="font-semibold text-foreground mb-2">🤝 Укрепление доверия</h3>
                  <p className="text-muted-foreground">Исчезнет скрытность, вернется открытость в общении</p>
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
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-success rounded-full border-2 border-white flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  </div>
                </div>
                <div className="text-center sm:text-left">
                  <h3 className="text-lg sm:text-xl font-bold text-foreground mb-1">Раиса Ильинская</h3>
                  <p className="text-accent font-medium mb-2">Потомственная ворожея</p>
                  <div className="flex items-center justify-center sm:justify-start gap-1 text-warning">
                    {[...Array(5)].map((_, i) => (
                      <Icon key={i} name="Star" size={16} className="fill-current" />
                    ))}
                    <span className="text-muted-foreground text-sm ml-2">4.9 из 5</span>
                  </div>
                </div>
              </div>

              {/* Текст призыва */}
              <div className="mb-6">
                <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-3">
                  Верните любовь мужа с помощью проверенных ритуалов
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Не позволяйте равнодушию разрушить ваш брак. Обратитесь за помощью к опытному специалисту 
                  и верните гармонию в семейные отношения уже через несколько недель.
                </p>
              </div>

              {/* Кнопка */}
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground font-semibold py-3 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl inline-flex items-center gap-2"
              >
                <Icon name="MessageCircle" size={20} />
                Получить консультацию
              </button>
              
              <p className="text-xs text-muted-foreground mt-4 opacity-75">
                Конфиденциальность гарантирована • Консультация бесплатна
              </p>
            </div>
          </div>
        </div>
        </div>
      </main>

      {/* Модальное окно */}
      <ContactModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
}