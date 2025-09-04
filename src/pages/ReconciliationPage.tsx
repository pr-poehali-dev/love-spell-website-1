import React, { useState } from 'react';
import Icon from '@/components/ui/icon';
import Header from '@/components/Header';
import ContactModal from '@/components/ContactModal';
import Layout from '@/components/Layout';

export default function ReconciliationPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTitle, setCurrentTitle] = useState('Маг');

  return (
    <Layout>
      <Header currentTitle={currentTitle} setCurrentTitle={setCurrentTitle} />
      <div className="relative z-0">
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-b from-background/60 via-background/20 to-transparent pointer-events-none z-10"></div>
        <div className="w-full h-32 sm:h-40 md:h-48 relative overflow-hidden">
          <img 
            src="/img/73b42f81-be9b-40b0-baf0-22aa0df03341.jpg" 
            alt="Обряд на примирение" 
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
            </span>бряд на примирение
          </h2>
          <p className="text-muted-foreground leading-relaxed text-base mb-8">
            Восстановление мира и гармонии в отношениях после ссор и конфликтов.
          </p>
        </div>

        <article className="text-foreground">
          <div className="mb-8">
            <p className="text-xl leading-relaxed mb-6 text-muted-foreground">
              Обряд на примирение помогает преодолеть последствия серьезных ссор, обид и недопонимания. 
              Ритуал смягчает сердца, убирает гордыню и восстанавливает любовь между партнерами, 
              возвращая в отношения мир и взаимопонимание.
            </p>
          </div>

          <div className="space-y-12">
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                  <Icon name="HeartHandshake" size={20} className="text-primary" />
                </div>
                Принцип восстановления гармонии
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  После серьезного конфликта между людьми возникают энергетические барьеры — стены 
                  обиды, гордыни и непрощения. Эти блоки препятствуют естественному течению любви 
                  и создают постоянное напряжение в отношениях.
                </p>
                <p>
                  Обряд растворяет эти энергетические препятствия, восстанавливает связь сердец 
                  и пробуждает желание идти навстречу друг другу. Люди начинают видеть ситуацию 
                  глазами партнера и находить компромиссы.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center">
                <div className="w-8 h-8 bg-warning/10 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                  <Icon name="AlertTriangle" size={20} className="text-warning" />
                </div>
                Показания для обряда примирения
              </h2>
              
              <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div className="space-y-4">
                  <div className="bg-card p-6 rounded-lg border border-border">
                    <div className="flex items-start space-x-3">
                      <Icon name="MessageSquareX" size={20} className="text-warning mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">Долгое молчание</h3>
                        <p className="text-muted-foreground text-sm">
                          Партнеры не разговаривают после крупной ссоры
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-card p-6 rounded-lg border border-border">
                    <div className="flex items-start space-x-3">
                      <Icon name="Home" size={20} className="text-warning mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">Раздельное проживание</h3>
                        <p className="text-muted-foreground text-sm">
                          Один из партнеров ушел из дома
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="bg-card p-6 rounded-lg border border-border">
                    <div className="flex items-start space-x-3">
                      <Icon name="Scale" size={20} className="text-warning mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">Угроза развода</h3>
                        <p className="text-muted-foreground text-sm">
                          Обсуждение расставания и раздела имущества
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-card p-6 rounded-lg border border-border">
                    <div className="flex items-start space-x-3">
                      <Icon name="Shield" size={20} className="text-warning mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">Вмешательство родных</h3>
                        <p className="text-muted-foreground text-sm">
                          Родственники настраивают против партнера
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
                  <Icon name="RefreshCw" size={20} className="text-accent" />
                </div>
                Этапы процесса примирения
              </h2>
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon name="Trash2" size={24} className="text-primary" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">Очищение обид</h3>
                    <p className="text-muted-foreground text-sm">Снятие энергетических блоков гнева и обиды</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon name="Heart" size={24} className="text-accent" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">Пробуждение любви</h3>
                    <p className="text-muted-foreground text-sm">Активация воспоминаний о хороших моментах</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon name="Handshake" size={24} className="text-success" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">Первый контакт</h3>
                    <p className="text-muted-foreground text-sm">Появление желания помириться и общаться</p>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center">
                <div className="w-8 h-8 bg-info/10 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                  <Icon name="Layers" size={20} className="text-info" />
                </div>
                Виды обрядов примирения
              </h2>
              
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-primary/5 to-transparent p-6 rounded-lg border-l-4 border-primary">
                  <h3 className="font-semibold text-foreground mb-2 flex items-center">
                    <Icon name="Flame" size={18} className="text-primary mr-2" />
                    Свечной ритуал единства
                  </h3>
                  <p className="text-muted-foreground">Соединение двух свечей в одну для восстановления связи сердец.</p>
                </div>
                
                <div className="bg-gradient-to-r from-accent/5 to-transparent p-6 rounded-lg border-l-4 border-accent">
                  <h3 className="font-semibold text-foreground mb-2 flex items-center">
                    <Icon name="Droplets" size={18} className="text-accent mr-2" />
                    Водный обряд прощения
                  </h3>
                  <p className="text-muted-foreground">Смывание обид и негатива заговоренной водой.</p>
                </div>
                
                <div className="bg-gradient-to-r from-success/5 to-transparent p-6 rounded-lg border-l-4 border-success">
                  <h3 className="font-semibold text-foreground mb-2 flex items-center">
                    <Icon name="Flower" size={18} className="text-success mr-2" />
                    Травяной настой мира
                  </h3>
                  <p className="text-muted-foreground">Использование трав для умиротворения и примирения душ.</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center">
                <div className="w-8 h-8 bg-warning/10 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                  <Icon name="Clock" size={20} className="text-warning" />
                </div>
                Время для обряда примирения
              </h2>
              
              <div className="bg-card p-8 rounded-xl border border-border">
                <div className="space-y-6">
                  <div className="flex items-start space-x-3 sm:space-x-4">
                    <div className="w-6 h-6 sm:w-7 sm:h-7 bg-primary/10 rounded-lg flex items-center justify-center mt-1 flex-shrink-0">
                      <Icon name="Moon" size={16} className="text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">Растущая луна</h3>
                      <p className="text-muted-foreground">
                        Лучшее время для привлечения примирения и роста понимания.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3 sm:space-x-4">
                    <div className="w-6 h-6 sm:w-7 sm:h-7 bg-success/10 rounded-lg flex items-center justify-center mt-1 flex-shrink-0">
                      <Icon name="Sun" size={16} className="text-success" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">Пятница</h3>
                      <p className="text-muted-foreground">
                        День Венеры, покровительницы любви и гармонии в отношениях.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3 sm:space-x-4">
                    <div className="w-6 h-6 sm:w-7 sm:h-7 bg-info/10 rounded-lg flex items-center justify-center mt-1 flex-shrink-0">
                      <Icon name="Clock" size={16} className="text-info" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">Важность скорости</h3>
                      <p className="text-muted-foreground">
                        Чем быстрее проведен обряд после ссоры, тем эффективнее результат.
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
                Признаки успешного примирения
              </h2>
              
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-success/5 to-transparent p-6 rounded-lg border-l-4 border-success">
                  <h3 className="font-semibold text-foreground mb-2">📞 Первый звонок</h3>
                  <p className="text-muted-foreground">Партнер сам идет на контакт, ищет повод для разговора</p>
                </div>
                
                <div className="bg-gradient-to-r from-primary/5 to-transparent p-6 rounded-lg border-l-4 border-primary">
                  <h3 className="font-semibold text-foreground mb-2">💝 Проявления внимания</h3>
                  <p className="text-muted-foreground">Подарки, извинения, желание загладить вину</p>
                </div>
                
                <div className="bg-gradient-to-r from-accent/5 to-transparent p-6 rounded-lg border-l-4 border-accent">
                  <h3 className="font-semibold text-foreground mb-2">🏠 Возвращение домой</h3>
                  <p className="text-muted-foreground">Если партнер ушел, появляется желание вернуться</p>
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
                  <h3 className="text-lg sm:text-xl font-bold text-foreground mb-3">Раиса Ильинская</h3>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-3">
                  Верните мир и гармонию в отношения
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Не дайте ссоре разрушить ваше счастье. Восстановите любовь и взаимопонимание 
                  с помощью мощных обрядов примирения уже в ближайшие дни.
                </p>
              </div>

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

      <ContactModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        onSuccess={(email) => console.log('Email sent to:', email)}
      />
    </Layout>
  );
}