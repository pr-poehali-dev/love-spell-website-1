import React, { useState } from 'react';
import Icon from '@/components/ui/icon';
import Header from '@/components/Header';
import ContactModal from '@/components/ContactModal';

export default function LoveAttractionPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTitle, setCurrentTitle] = useState('Маг');

  return (
    <div className="min-h-screen bg-background">
      <Header currentTitle={currentTitle} setCurrentTitle={setCurrentTitle} />
      <div className="relative z-0">
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-b from-background/60 via-background/20 to-transparent pointer-events-none z-10"></div>
        <div className="w-full h-32 sm:h-40 md:h-48 relative overflow-hidden">
          <img 
            src="/img/15b483c3-1ad6-41bc-9c6f-baadf7978a9f.jpg" 
            alt="Обряд на привлечение любви" 
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
            </span>бряд на привлечение любви
          </h2>
          <p className="text-muted-foreground leading-relaxed text-base mb-8">
            Универсальный ритуал для притяжения истинной любви и создания гармоничных отношений.
          </p>
        </div>

        <article className="text-foreground">
          <div className="mb-8">
            <p className="text-xl leading-relaxed mb-6 text-muted-foreground">
              Обряд на привлечение любви — это мощный инструмент для создания энергетического 
              магнита, притягивающего родственную душу. Ритуал работает на принципе подобия, 
              привлекая человека, подходящего именно вам.
            </p>
          </div>

          <div className="space-y-12">
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                  <Icon name="Magnet" size={20} className="text-primary" />
                </div>
                Принцип магнетического притяжения
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Ритуал создает вокруг вас особое энергетическое поле, которое резонирует 
                  с аурой вашего идеального партнера. Это не принуждение конкретного человека, 
                  а привлечение того, кто действительно подходит вам по духу.
                </p>
                <p>
                  Энергия любви начинает активно циркулировать в вашей жизни, открывая новые 
                  возможности для знакомств и создавая благоприятные обстоятельства для встречи 
                  с будущим партнером.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center">
                <div className="w-8 h-8 bg-success/10 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                  <Icon name="Target" size={20} className="text-success" />
                </div>
                Что притягивает обряд
              </h2>
              
              <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div className="space-y-4">
                  <div className="bg-card p-6 rounded-lg border border-border">
                    <div className="flex items-start space-x-3">
                      <Icon name="Heart" size={20} className="text-success mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">Искренние чувства</h3>
                        <p className="text-muted-foreground text-sm">
                          Партнера, способного на глубокую и настоящую любовь
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-card p-6 rounded-lg border border-border">
                    <div className="flex items-start space-x-3">
                      <Icon name="Users" size={20} className="text-success mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">Совместимость</h3>
                        <p className="text-muted-foreground text-sm">
                          Человека с похожими ценностями и жизненными целями
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="bg-card p-6 rounded-lg border border-border">
                    <div className="flex items-start space-x-3">
                      <Icon name="Shield" size={20} className="text-success mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">Надежность</h3>
                        <p className="text-muted-foreground text-sm">
                          Стабильного партнера для серьезных отношений
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-card p-6 rounded-lg border border-border">
                    <div className="flex items-start space-x-3">
                      <Icon name="Sun" size={20} className="text-success mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">Счастье</h3>
                        <p className="text-muted-foreground text-sm">
                          Отношения, наполненные радостью и взаимопониманием
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
                  <Icon name="Zap" size={20} className="text-accent" />
                </div>
                Этапы привлечения любви
              </h2>
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon name="Sparkles" size={24} className="text-primary" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">Подготовка</h3>
                    <p className="text-muted-foreground text-sm">Очищение ауры и настрой на любовь</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon name="Search" size={24} className="text-accent" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">Поиск</h3>
                    <p className="text-muted-foreground text-sm">Активация энергетического магнита</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon name="Users" size={24} className="text-success" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">Встреча</h3>
                    <p className="text-muted-foreground text-sm">Появление подходящего партнера</p>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center">
                <div className="w-8 h-8 bg-info/10 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                  <Icon name="Layers" size={20} className="text-info" />
                </div>
                Виды любовных ритуалов
              </h2>
              
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-primary/5 to-transparent p-6 rounded-lg border-l-4 border-primary">
                  <h3 className="font-semibold text-foreground mb-2 flex items-center">
                    <Icon name="Rose" size={18} className="text-primary mr-2" />
                    Розовый ритуал
                  </h3>
                  <p className="text-muted-foreground">Мягкое привлечение романтической любви с помощью розовых свечей и лепестков.</p>
                </div>
                
                <div className="bg-gradient-to-r from-accent/5 to-transparent p-6 rounded-lg border-l-4 border-accent">
                  <h3 className="font-semibold text-foreground mb-2 flex items-center">
                    <Icon name="Star" size={18} className="text-accent mr-2" />
                    Звездный обряд
                  </h3>
                  <p className="text-muted-foreground">Привлечение суженого под покровительством звезд и планет.</p>
                </div>
                
                <div className="bg-gradient-to-r from-success/5 to-transparent p-6 rounded-lg border-l-4 border-success">
                  <h3 className="font-semibold text-foreground mb-2 flex items-center">
                    <Icon name="Clover" size={18} className="text-success mr-2" />
                    Медовый ритуал
                  </h3>
                  <p className="text-muted-foreground">Сладкое привлечение любви с использованием меда и трав.</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center">
                <div className="w-8 h-8 bg-success/10 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                  <Icon name="CheckCircle" size={20} className="text-success" />
                </div>
                Признаки работы ритуала
              </h2>
              
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-success/5 to-transparent p-6 rounded-lg border-l-4 border-success">
                  <h3 className="font-semibold text-foreground mb-2">💫 Новые знакомства</h3>
                  <p className="text-muted-foreground">Появление интересных людей в вашем окружении</p>
                </div>
                
                <div className="bg-gradient-to-r from-primary/5 to-transparent p-6 rounded-lg border-l-4 border-primary">
                  <h3 className="font-semibold text-foreground mb-2">✨ Повышенная привлекательность</h3>
                  <p className="text-muted-foreground">Усиление природного магнетизма и обаяния</p>
                </div>
                
                <div className="bg-gradient-to-r from-accent/5 to-transparent p-6 rounded-lg border-l-4 border-accent">
                  <h3 className="font-semibold text-foreground mb-2">🎯 Удачные встречи</h3>
                  <p className="text-muted-foreground">Совпадения и знаки судьбы в отношениях</p>
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
                  Привлеките истинную любовь в свою жизнь
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Позвольте магии любви найти для вас идеального партнера. Создайте энергетический 
                  магнит для притяжения родственной души и счастливых отношений.
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
        onSuccess={(email) => console.log('Email sent to:', email)}
      />
    </div>
  );
}