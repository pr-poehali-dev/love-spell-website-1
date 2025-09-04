import React, { useState } from 'react';
import Icon from '@/components/ui/icon';
import Header from '@/components/Header';
import ContactModal from '@/components/ContactModal';
import Layout from '@/components/Layout';

export default function LonelinessRemovalPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTitle, setCurrentTitle] = useState('Маг');

  return (
    <Layout>
      <Header currentTitle={currentTitle} setCurrentTitle={setCurrentTitle} />

      {/* Широкое изображение-баннер */}
      <div className="relative z-0">
        {/* Тень от липкой шапки */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-b from-background/60 via-background/20 to-transparent pointer-events-none z-10"></div>
        
        <div className="w-full h-32 sm:h-40 md:h-48 relative overflow-hidden">
          <img 
            src="/img/bb9b0bb1-5a79-4be0-bc10-59c65011e716.jpg" 
            alt="Обряд на снятие одиночества - привлечение любви в жизнь" 
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
              <span className="text-2xl font-bold relative z-10 text-primary">О</span>
              <div className="absolute w-9 h-9 rounded-full opacity-40" style={{
                background: 'linear-gradient(135deg, hsl(var(--primary) / 0.6) 0%, hsl(var(--primary) / 0.1) 100%)',
                top: '-1px',
                left: '-10px'
              }}></div>
            </span>бряд на снятие одиночества
          </h2>
          <p className="text-muted-foreground leading-relaxed text-base mb-8">
            Мощный ритуал для освобождения от энергетических блоков, препятствующих созданию счастливых отношений.
          </p>
        </div>

        {/* Содержание статьи */}
        <article className="text-foreground">
          {/* Введение */}
          <div className="mb-8">
            <p className="text-xl leading-relaxed mb-6 text-muted-foreground">
              Одиночество часто вызвано не внешними обстоятельствами, а внутренними энергетическими блоками. 
              Обряд на снятие одиночества помогает устранить эти преграды и открыть сердце для новой любви.
            </p>
          </div>

          {/* Основные разделы */}
          <div className="space-y-12">
            {/* Причины одиночества */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                  <Icon name="Lock" size={20} className="text-primary" />
                </div>
                Энергетические причины одиночества
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Одиночество может быть следствием энергетических блоков, наложенных негативными 
                  переживаниями, страхами или внешним воздействием. Эти барьеры создают невидимую 
                  стену, отталкивающую потенциальных партнеров.
                </p>
                <p>
                  Обряд работает на тонком плане, снимая энергетические оковы и восстанавливая 
                  естественную притягательность человека. После очищения аура начинает излучать 
                  позитивную энергию, привлекающую любовь.
                </p>
              </div>
            </section>

            {/* Признаки энергетических блоков */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center">
                <div className="w-8 h-8 bg-warning/10 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                  <Icon name="AlertTriangle" size={20} className="text-warning" />
                </div>
                Признаки энергетических блоков
              </h2>
              
              <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div className="space-y-4">
                  <div className="bg-card p-6 rounded-lg border border-border">
                    <div className="flex items-start space-x-3">
                      <Icon name="Frown" size={20} className="text-warning mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">Отсутствие знакомств</h3>
                        <p className="text-muted-foreground text-sm">
                          Люди противоположного пола словно не замечают вас
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-card p-6 rounded-lg border border-border">
                    <div className="flex items-start space-x-3">
                      <Icon name="XCircle" size={20} className="text-warning mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">Неудачные отношения</h3>
                        <p className="text-muted-foreground text-sm">
                          Отношения быстро заканчиваются без видимых причин
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="bg-card p-6 rounded-lg border border-border">
                    <div className="flex items-start space-x-3">
                      <Icon name="CloudRain" size={20} className="text-warning mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">Апатия и грусть</h3>
                        <p className="text-muted-foreground text-sm">
                          Постоянное чувство внутренней пустоты и тоски
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-card p-6 rounded-lg border border-border">
                    <div className="flex items-start space-x-3">
                      <Icon name="Shield" size={20} className="text-warning mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">Страх близости</h3>
                        <p className="text-muted-foreground text-sm">
                          Подсознательное отталкивание потенциальных партнеров
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Этапы очищения */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center">
                <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                  <Icon name="RefreshCw" size={20} className="text-accent" />
                </div>
                Этапы энергетического очищения
              </h2>
              <div className="space-y-6">
                <p className="text-muted-foreground">
                  Процесс снятия одиночества происходит поэтапно, каждый уровень глубже 
                  очищает энергетическое поле от накопленного негатива.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon name="Trash2" size={24} className="text-primary" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">1 неделя</h3>
                    <p className="text-muted-foreground text-sm">Очищение от поверхностных блоков и страхов</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon name="Sparkles" size={24} className="text-accent" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">2-3 недели</h3>
                    <p className="text-muted-foreground text-sm">Восстановление природной притягательности</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon name="Heart" size={24} className="text-success" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">1-2 месяца</h3>
                    <p className="text-muted-foreground text-sm">Активное привлечение новых отношений</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Методы снятия одиночества */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center">
                <div className="w-8 h-8 bg-info/10 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                  <Icon name="Layers" size={20} className="text-info" />
                </div>
                Методы снятия одиночества
              </h2>
              
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-primary/5 to-transparent p-6 rounded-lg border-l-4 border-primary">
                  <h3 className="font-semibold text-foreground mb-2 flex items-center">
                    <Icon name="Flame" size={18} className="text-primary mr-2" />
                    Огненное очищение
                  </h3>
                  <p className="text-muted-foreground">Сжигание энергетических блоков с помощью специальных свечей и трав.</p>
                </div>
                
                <div className="bg-gradient-to-r from-accent/5 to-transparent p-6 rounded-lg border-l-4 border-accent">
                  <h3 className="font-semibold text-foreground mb-2 flex items-center">
                    <Icon name="Droplets" size={18} className="text-accent mr-2" />
                    Водное очищение
                  </h3>
                  <p className="text-muted-foreground">Смывание негатива заговоренной водой и специальными купаниями.</p>
                </div>
                
                <div className="bg-gradient-to-r from-success/5 to-transparent p-6 rounded-lg border-l-4 border-success">
                  <h3 className="font-semibold text-foreground mb-2 flex items-center">
                    <Icon name="Wind" size={18} className="text-success mr-2" />
                    Воздушное освобождение
                  </h3>
                  <p className="text-muted-foreground">Развеивание блоков с помощью специальных дыхательных практик.</p>
                </div>
              </div>
            </section>

            {/* Подготовка к обряду */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center">
                <div className="w-8 h-8 bg-warning/10 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                  <Icon name="Settings" size={20} className="text-warning" />
                </div>
                Подготовка к ритуалу
              </h2>
              
              <div className="bg-card p-8 rounded-xl border border-border">
                <div className="space-y-6">
                  <div className="flex items-start space-x-3 sm:space-x-4">
                    <div className="w-6 h-6 sm:w-7 sm:h-7 bg-primary/10 rounded-lg flex items-center justify-center mt-1 flex-shrink-0">
                      <Icon name="Calendar" size={16} className="text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">Выбор времени</h3>
                      <p className="text-muted-foreground">
                        Лучшее время для обряда — убывающая луна, когда легче избавляться от негатива.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3 sm:space-x-4">
                    <div className="w-6 h-6 sm:w-7 sm:h-7 bg-success/10 rounded-lg flex items-center justify-center mt-1 flex-shrink-0">
                      <Icon name="Leaf" size={16} className="text-success" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">Очищение тела</h3>
                      <p className="text-muted-foreground">
                        За 3 дня до обряда желательно поститься и принимать очищающие ванны.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3 sm:space-x-4">
                    <div className="w-6 h-6 sm:w-7 sm:h-7 bg-info/10 rounded-lg flex items-center justify-center mt-1 flex-shrink-0">
                      <Icon name="Compass" size={16} className="text-info" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">Настрой души</h3>
                      <p className="text-muted-foreground">
                        Важно искренне желать освободиться от одиночества и быть готовым к переменам.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Признаки успешного снятия */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center">
                <div className="w-8 h-8 bg-success/10 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                  <Icon name="CheckCircle" size={20} className="text-success" />
                </div>
                Признаки успешного снятия одиночества
              </h2>
              
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-success/5 to-transparent p-6 rounded-lg border-l-4 border-success">
                  <h3 className="font-semibold text-foreground mb-2">✨ Внутреннее освобождение</h3>
                  <p className="text-muted-foreground">Уходит чувство тяжести, появляется легкость и радость жизни</p>
                </div>
                
                <div className="bg-gradient-to-r from-primary/5 to-transparent p-6 rounded-lg border-l-4 border-primary">
                  <h3 className="font-semibold text-foreground mb-2">🌟 Повышенная привлекательность</h3>
                  <p className="text-muted-foreground">Окружающие начинают замечать и проявлять интерес к вам</p>
                </div>
                
                <div className="bg-gradient-to-r from-accent/5 to-transparent p-6 rounded-lg border-l-4 border-accent">
                  <h3 className="font-semibold text-foreground mb-2">💫 Новые знакомства</h3>
                  <p className="text-muted-foreground">Появляются возможности для романтических встреч</p>
                </div>
                
                <div className="bg-gradient-to-r from-info/5 to-transparent p-6 rounded-lg border-l-4 border-info">
                  <h3 className="font-semibold text-foreground mb-2">💖 Готовность к любви</h3>
                  <p className="text-muted-foreground">Исчезает страх близости, появляется желание любить и быть любимым</p>
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
                  <h3 className="text-lg sm:text-xl font-bold text-foreground mb-3">Раиса Ильинская</h3>
                </div>
              </div>

              {/* Текст призыва */}
              <div className="mb-6">
                <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-3">
                  Освободитесь от одиночества раз и навсегда
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Не позволяйте энергетическим блокам лишать вас счастья. Снимите оковы одиночества 
                  и откройте свое сердце для новой, искренней любви.
                </p>
              </div>

              {/* Кнопка */}
              <button
                onClick={() => setIsModalOpen(true)}
                className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-4 px-8 rounded-xl transition-all duration-300 hover:scale-[1.02] shadow-lg hover:shadow-xl inline-flex items-center justify-center gap-3 text-lg"
              >
                <Icon name="MessageCircle" size={22} />
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
        onSuccess={(email) => console.log('Email sent to:', email)}
      />
    </Layout>
  );
}