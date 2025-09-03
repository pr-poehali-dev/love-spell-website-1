import React, { useState } from 'react';
import Icon from '@/components/ui/icon';
import Header from '@/components/Header';
import ContactModal from '@/components/ContactModal';

export default function PhotoSpellPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTitle, setCurrentTitle] = useState('Маг');

  return (
    <div className="min-h-screen bg-background">
      <Header currentTitle={currentTitle} setCurrentTitle={setCurrentTitle} />
      <div className="relative z-0">
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-b from-background/60 via-background/20 to-transparent pointer-events-none z-10"></div>
        <div className="w-full h-32 sm:h-40 md:h-48 relative overflow-hidden">
          <img 
            src="/img/59bfd030-02d4-4875-a2f1-7741f69b901a.jpg" 
            alt="Обряд приворота на фото" 
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-primary/20"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-background/30 to-transparent"></div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-8">
          <div className="w-full h-full bg-background rounded-t-3xl shadow-[0_-8px_24px_rgba(0,0,0,0.3)]"></div>
        </div>
      </div>

      <main className="bg-background relative z-10">
        <div className="max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-12 sm:space-y-16">
        <div>
          <h2 className="text-xl font-bold text-foreground mb-8 relative pt-0">
            <span className="relative inline-block">
              <span className="text-2xl font-bold relative z-10 text-primary">О</span>
              <div className="absolute w-9 h-9 rounded-full opacity-40" style={{
                background: 'linear-gradient(135deg, hsl(var(--primary) / 0.6) 0%, hsl(var(--primary) / 0.1) 100%)',
                top: '-1px',
                left: '-10px'
              }}></div>
            </span>бряд приворота на фото
          </h2>
          <p className="text-muted-foreground leading-relaxed text-base mb-8">
            Дистанционное воздействие через энергетическую связь с изображением человека.
          </p>
        </div>

        <article className="text-foreground">
          <div className="mb-8">
            <p className="text-xl leading-relaxed mb-6 text-muted-foreground">
              Приворот на фото — один из самых распространенных способов дистанционного воздействия. 
              Фотография сохраняет энергетический отпечаток человека, через который можно влиять 
              на его чувства и эмоции на любом расстоянии.
            </p>
          </div>

          <div className="space-y-12">
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                  <Icon name="Camera" size={20} className="text-primary" />
                </div>
                Принцип работы с фотографией
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Каждое изображение человека содержит его энергетический код — уникальную 
                  информационную матрицу. Через фотографию можно установить связь с тонким 
                  телом человека и воздействовать на его подсознание.
                </p>
                <p>
                  Ритуал создает энергетический мост между исполнителем и объектом воздействия. 
                  Чем качественнее фото и чем больше на нем видно лицо человека, тем сильнее 
                  будет связь и эффективнее ритуал.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center">
                <div className="w-8 h-8 bg-warning/10 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                  <Icon name="Image" size={20} className="text-warning" />
                </div>
                Требования к фотографии
              </h2>
              
              <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div className="space-y-4">
                  <div className="bg-card p-6 rounded-lg border border-border">
                    <div className="flex items-start space-x-3">
                      <Icon name="Eye" size={20} className="text-success mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">Четкие глаза</h3>
                        <p className="text-muted-foreground text-sm">
                          Глаза должны быть открыты и хорошо видны
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-card p-6 rounded-lg border border-border">
                    <div className="flex items-start space-x-3">
                      <Icon name="User" size={20} className="text-success mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">Один человек</h3>
                        <p className="text-muted-foreground text-sm">
                          На фото не должно быть других людей
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="bg-card p-6 rounded-lg border border-border">
                    <div className="flex items-start space-x-3">
                      <Icon name="Zap" size={20} className="text-success mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">Свежесть</h3>
                        <p className="text-muted-foreground text-sm">
                          Фото должно быть сделано недавно
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-card p-6 rounded-lg border border-border">
                    <div className="flex items-start space-x-3">
                      <Icon name="Sun" size={20} className="text-success mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">Хорошее качество</h3>
                        <p className="text-muted-foreground text-sm">
                          Изображение должно быть четким и ярким
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center">
                <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                  <Icon name="Clock" size={20} className="text-accent" />
                </div>
                Этапы воздействия через фото
              </h2>
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon name="Link" size={24} className="text-primary" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">Установка связи</h3>
                    <p className="text-muted-foreground text-sm">Создание энергетического моста через фото</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon name="Radio" size={24} className="text-accent" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">Передача импульса</h3>
                    <p className="text-muted-foreground text-sm">Направление любовной энергии к объекту</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon name="Heart" size={24} className="text-success" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">Пробуждение чувств</h3>
                    <p className="text-muted-foreground text-sm">Активация эмоциональной привязанности</p>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center">
                <div className="w-8 h-8 bg-info/10 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                  <Icon name="Layers" size={20} className="text-info" />
                </div>
                Виды фото-приворотов
              </h2>
              
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-primary/5 to-transparent p-6 rounded-lg border-l-4 border-primary">
                  <h3 className="font-semibold text-foreground mb-2 flex items-center">
                    <Icon name="Flame" size={18} className="text-primary mr-2" />
                    Свечной приворот
                  </h3>
                  <p className="text-muted-foreground">Воздействие через огонь свечи, направленный на фотографию.</p>
                </div>
                
                <div className="bg-gradient-to-r from-accent/5 to-transparent p-6 rounded-lg border-l-4 border-accent">
                  <h3 className="font-semibold text-foreground mb-2 flex items-center">
                    <Icon name="Droplets" size={18} className="text-accent mr-2" />
                    Водный ритуал
                  </h3>
                  <p className="text-muted-foreground">Использование заговоренной воды для активации фотографии.</p>
                </div>
                
                <div className="bg-gradient-to-r from-success/5 to-transparent p-6 rounded-lg border-l-4 border-success">
                  <h3 className="font-semibold text-foreground mb-2 flex items-center">
                    <Icon name="Moon" size={18} className="text-success mr-2" />
                    Лунный обряд
                  </h3>
                  <p className="text-muted-foreground">Проведение ритуала в определенные лунные фазы.</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center">
                <div className="w-8 h-8 bg-warning/10 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                  <Icon name="AlertTriangle" size={20} className="text-warning" />
                </div>
                Важные предостережения
              </h2>
              
              <div className="bg-card p-8 rounded-xl border border-border">
                <div className="space-y-6">
                  <div className="flex items-start space-x-3 sm:space-x-4">
                    <div className="w-6 h-6 sm:w-7 sm:h-7 bg-warning/10 rounded-lg flex items-center justify-center mt-1 flex-shrink-0">
                      <Icon name="Shield" size={16} className="text-warning" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">Защита фотографии</h3>
                      <p className="text-muted-foreground">
                        После ритуала фото должно быть надежно спрятано от посторонних глаз.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3 sm:space-x-4">
                    <div className="w-6 h-6 sm:w-7 sm:h-7 bg-primary/10 rounded-lg flex items-center justify-center mt-1 flex-shrink-0">
                      <Icon name="Clock" size={16} className="text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">Время воздействия</h3>
                      <p className="text-muted-foreground">
                        Результат проявляется постепенно в течение 2-6 недель.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3 sm:space-x-4">
                    <div className="w-6 h-6 sm:w-7 sm:h-7 bg-info/10 rounded-lg flex items-center justify-center mt-1 flex-shrink-0">
                      <Icon name="Heart" size={16} className="text-info" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">Искренность намерений</h3>
                      <p className="text-muted-foreground">
                        Ритуал работает только при истинном желании быть с человеком.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center">
                <div className="w-8 h-8 bg-success/10 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                  <Icon name="CheckCircle" size={20} className="text-success" />
                </div>
                Признаки успешного воздействия
              </h2>
              
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-success/5 to-transparent p-6 rounded-lg border-l-4 border-success">
                  <h3 className="font-semibold text-foreground mb-2">📱 Первые контакты</h3>
                  <p className="text-muted-foreground">Человек начинает писать, звонить без видимых причин</p>
                </div>
                
                <div className="bg-gradient-to-r from-primary/5 to-transparent p-6 rounded-lg border-l-4 border-primary">
                  <h3 className="font-semibold text-foreground mb-2">💭 Мысли о вас</h3>
                  <p className="text-muted-foreground">Объект воздействия часто вспоминает и думает о вас</p>
                </div>
                
                <div className="bg-gradient-to-r from-accent/5 to-transparent p-6 rounded-lg border-l-4 border-accent">
                  <h3 className="font-semibold text-foreground mb-2">🌟 Изменение отношения</h3>
                  <p className="text-muted-foreground">Становится более открытым и дружелюбным в общении</p>
                </div>
              </div>
            </section>
          </div>
        </article>

        <div className="mt-12 sm:mt-16 mb-8 sm:mb-12 px-2">
          <div className="relative bg-card/50 backdrop-blur-sm p-6 sm:p-8 rounded-xl sm:rounded-2xl border border-border shadow-lg text-center overflow-hidden">
            <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-2xl"></div>
            <div className="absolute bottom-0 right-0 w-16 h-16 bg-gradient-to-tl from-accent/20 to-transparent rounded-full blur-xl"></div>
            
            <div className="relative max-w-2xl mx-auto">
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

              <div className="mb-6">
                <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-3">
                  Проведите дистанционный приворот на фото
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Воздействуйте на чувства человека через его фотографию. Получите подробную 
                  консультацию по выбору подходящего ритуала и требованиям к изображению.
                </p>
              </div>

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

      <ContactModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
}