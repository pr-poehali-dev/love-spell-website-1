import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { useState, useEffect } from 'react';

export default function Index() {
  const [currentTitle, setCurrentTitle] = useState('Маг');
  const [showMoreRituals, setShowMoreRituals] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTitle(prev => prev === 'Маг' ? 'Ворожея' : 'Маг');
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header Profile Section */}
      <div className="bg-background border-b border-border sticky top-0 z-30">
        <div className="max-w-sm mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full overflow-hidden">
              <img 
                src="/img/ad82ffc8-0c3b-4ed9-9e55-893635b263d1.jpg" 
                alt="Раиса Ильинская"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-foreground">Раиса Ильинская</h1>
              <div className="text-sm font-medium text-accent">
                <span className="typewriter" key={currentTitle}>{currentTitle}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <div className="bg-background border-b border-border sticky top-[84px] z-20">
        <div className="max-w-sm mx-auto px-4 py-4">
          <div className="grid grid-cols-4 gap-1">
            <button className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-muted/50 transition-colors">
              <Icon name="User" size={20} className="text-accent" />
              <span className="text-xs font-medium text-foreground">КТО Я</span>
            </button>
            <button className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-muted/50 transition-colors">
              <Icon name="Leaf" size={20} className="text-foreground" />
              <span className="text-xs font-medium text-foreground">ОБРЯДЫ</span>
            </button>
            <button className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-muted/50 transition-colors">
              <Icon name="MessageCircle" size={20} className="text-foreground" />
              <span className="text-xs font-medium text-foreground">ОТЗЫВЫ</span>
            </button>
            <button className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-muted/50 transition-colors">
              <Icon name="Mail" size={20} className="text-foreground" />
              <span className="text-xs font-medium text-foreground">СВЯЗЬ</span>
            </button>
          </div>
        </div>
      </div>

      {/* Hero Section with V-Mask Design */}
      <div className="relative -mt-[240px] sm:-mt-[280px] md:-mt-[320px] z-10">
        {/* Background Image with V-Mask */}
        <div className="relative h-[70vh] sm:h-[75vh]">
          <div 
            className="absolute inset-0 hero-bg v-mask"
            style={{
              backgroundImage: `url('/img/360087e3-3b50-4f2f-932f-be1fbf78267b.jpg')`
            }}
          >
          </div>
        </div>
        
        {/* Profile Section Overlapping */}
        <div className="relative -mt-16 sm:-mt-20 md:-mt-24 z-10">
          <div className="max-w-xs mx-auto px-4 text-center">
            {/* Large Profile Image with Realistic Shadow */}
            <div className="mb-6 relative">
              {/* Container for avatar and shadow rings */}
              <div className="relative w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 mx-auto">
                
                {/* Shadow ring */}
                <div className="absolute w-[104%] h-[104%] rounded-full opacity-65"
                     style={{ 
                       left: '-10px', 
                       top: '6px',
                       zIndex: 1,
                       background: 'linear-gradient(180deg, rgba(255, 152, 0, 0.85) 0%, rgba(255, 152, 0, 0.6) 30%, rgba(255, 152, 0, 0.3) 70%, rgba(255, 152, 0, 0.15) 100%)'
                     }}>
                </div>
                
                {/* Main Avatar */}
                <div className="relative w-full h-full rounded-full overflow-hidden bg-background"
                     style={{ 
                       zIndex: 10,
                       filter: 'drop-shadow(0 14px 24px rgba(0, 0, 0, 0.35))'
                     }}>
                  <img 
                    src="/img/ad82ffc8-0c3b-4ed9-9e55-893635b263d1.jpg" 
                    alt="Раиса Ильинская"
                    className="w-full h-full object-cover"
                  />
                  {/* Sunset reflection overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-400/30 via-yellow-300/20 to-red-500/25 rounded-full mix-blend-overlay"></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-amber-600/40 via-transparent to-transparent rounded-full mix-blend-soft-light"></div>
                </div>
              </div>
            </div>
            
            {/* Name and Title */}
            <div className="mb-6 sm:mb-8">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 drop-shadow-lg">
                Раиса Ильинская
              </h2>
              <div className="text-accent font-semibold text-lg sm:text-xl md:text-2xl drop-shadow-lg min-h-[1.5em]">
                <span className="typewriter" key={currentTitle}>{currentTitle}</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Section */}
        <div className="bg-background pt-2 pb-8">
          <div className="max-w-xs mx-auto px-4">
            {/* Call to Action */}
            <Button 
              size="lg" 
              className="w-full bg-primary hover:bg-primary/90 text-white transition-all duration-300 font-semibold text-sm sm:text-base py-4 sm:py-6"
            >
              НАПИШИТЕ МНЕ
              <Icon name="ChevronRight" size={18} className="ml-2" />
            </Button>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="h-6 bg-[#27262d]"></div>

      {/* Who Am I Section */}
      <div className="bg-background">
        <div className="max-w-sm mx-auto px-6 py-8 space-y-16">
          
          {/* About Me */}
          <div>
            <h2 className="text-xl font-bold text-foreground mb-6 relative">
              <span className="relative inline-block">
                <span className="text-2xl font-bold relative z-10" style={{color: '#ff9800'}}>О</span>
                <div className="absolute w-9 h-9 rounded-full opacity-40" style={{
                  background: 'linear-gradient(135deg, rgba(255, 152, 0, 0.6) 0%, rgba(255, 152, 0, 0.1) 100%)',
                  top: '-1px',
                  left: '-10px'
                }}></div>
              </span>бо мне
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Магия пришла в мою жизнь очень рано. Я не понимала, как с этим справляться и как это контролировать. Не могла рассказать, что чувствую внутри. Думала, от меня откажутся. Уже с возрастом стала осознавать, что могу быть нужной, могу помогать людям и получать от них позитивную энергию, которая питает меня, как батарея питает теплом холодный дом. Мои дорогие сестры, товарищи, не стесняйтесь просить помощи, ведь наша сила в единстве. Постараюсь помочь вам, чем смогу. Делаю все, что в моих силах.
            </p>
          </div>

          {/* What I Do */}
          <div>
            <h2 className="text-xl font-bold text-foreground mb-6 relative">
              <span className="relative inline-block">
                <span className="text-2xl font-bold relative z-10" style={{color: '#ff9800'}}>Ч</span>
                <div className="absolute w-9 h-9 rounded-full opacity-40" style={{
                  background: 'linear-gradient(135deg, rgba(255, 152, 0, 0.6) 0%, rgba(255, 152, 0, 0.1) 100%)',
                  top: '-1px',
                  left: '-10px'
                }}></div>
              </span>ем я занимаюсь
            </h2>
            
            <div className="space-y-8">
              {/* Christian Magic */}
              <div>
                <div className="w-14 h-14 rounded-full flex items-center justify-center mb-3" style={{
                  background: 'linear-gradient(135deg, rgba(255, 152, 0, 0.15) 0%, rgba(255, 152, 0, 0.03) 100%)'
                }}>
                  <Icon name="Plus" size={28} style={{color: '#ff9800', strokeWidth: 3}} />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Христианской магией</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Основана на работе с архангелами, ангелами, святыми, а также известными архетипами Пресвятой Девы и Отца Небесного.
                </p>
              </div>

              {/* Runic Magic */}
              <div>
                <div className="w-14 h-14 rounded-full flex items-center justify-center mb-3" style={{
                  background: 'linear-gradient(135deg, rgba(255, 152, 0, 0.15) 0%, rgba(255, 152, 0, 0.03) 100%)'
                }}>
                  <Icon name="Zap" size={28} style={{color: '#ff9800', strokeWidth: 3}} />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Рунической магией</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Использование специальных знаков и символов (рун) для получения нужного результата.
                </p>
              </div>

              {/* Candle Magic */}
              <div>
                <div className="w-14 h-14 rounded-full flex items-center justify-center mb-3" style={{
                  background: 'linear-gradient(135deg, rgba(255, 152, 0, 0.15) 0%, rgba(255, 152, 0, 0.03) 100%)'
                }}>
                  <Icon name="Flame" size={28} style={{color: '#ff9800', strokeWidth: 3}} />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Магией свечей</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Искусство управления жизненными событиями и влияния на окружающий мир через работу со свечами.
                </p>
              </div>

              {/* Knot Magic */}
              <div>
                <div className="w-14 h-14 rounded-full flex items-center justify-center mb-3" style={{
                  background: 'linear-gradient(135deg, rgba(255, 152, 0, 0.15) 0%, rgba(255, 152, 0, 0.03) 100%)'
                }}>
                  <Icon name="GitBranch" size={28} style={{color: '#ff9800', strokeWidth: 3}} />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Магией узлов</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Магическое направление связи специальных узлов с судьбой и энергиями человека.
                </p>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="h-6 bg-[#27262d]"></div>

          {/* Rituals Section */}
          <div>
            <h2 className="text-xl font-bold text-foreground mb-6 relative">
              <span className="relative inline-block">
                <span className="text-2xl font-bold relative z-10" style={{color: '#ff9800'}}>О</span>
                <div className="absolute w-9 h-9 rounded-full opacity-40" style={{
                  background: 'linear-gradient(135deg, rgba(255, 152, 0, 0.6) 0%, rgba(255, 152, 0, 0.1) 100%)',
                  top: '-1px',
                  left: '-10px'
                }}></div>
              </span>бряды
            </h2>
            
            <div className="space-y-4">
              {/* Ritual Cards */}
              <div className="border border-border rounded-lg p-4 hover:bg-muted/20 hover:shadow-lg transition-all duration-300 cursor-pointer group" style={{
                boxShadow: 'none'
              }} onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(255, 152, 0, 0.2)';
              }} onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = 'none';
              }}>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center flex-shrink-0 transform-gpu" style={{
                    background: 'linear-gradient(135deg, rgba(255, 152, 0, 0.15) 0%, rgba(255, 152, 0, 0.03) 100%)'
                  }}>
                    <Icon name="Heart" size={24} className="sm:!w-7 sm:!h-7" style={{color: '#ff9800', strokeWidth: 2}} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base sm:text-lg font-semibold text-foreground mb-1">Приворот на жену</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">Обряд для восстановления отношений и привлечения внимания супруги</p>
                  </div>
                  <Icon name="ChevronRight" size={20} className="text-muted-foreground group-hover:text-accent transition-colors" />
                </div>
              </div>

              <div className="border border-border rounded-lg p-4 hover:bg-muted/20 hover:shadow-lg transition-all duration-300 cursor-pointer group" style={{
                boxShadow: 'none'
              }} onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(255, 152, 0, 0.2)';
              }} onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = 'none';
              }}>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center flex-shrink-0 transform-gpu" style={{
                    background: 'linear-gradient(135deg, rgba(255, 152, 0, 0.15) 0%, rgba(255, 152, 0, 0.03) 100%)'
                  }}>
                    <Icon name="Users" size={24} className="sm:!w-7 sm:!h-7" style={{color: '#ff9800', strokeWidth: 2}} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base sm:text-lg font-semibold text-foreground mb-1">Приворот на мужа</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">Обряд для укрепления семейных отношений и возвращения мужа</p>
                  </div>
                  <Icon name="ChevronRight" size={20} className="text-muted-foreground group-hover:text-accent transition-colors" />
                </div>
              </div>

              <div className="border border-border rounded-lg p-4 hover:bg-muted/20 hover:shadow-lg transition-all duration-300 cursor-pointer group" style={{
                boxShadow: 'none'
              }} onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(255, 152, 0, 0.2)';
              }} onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = 'none';
              }}>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center flex-shrink-0 transform-gpu" style={{
                    background: 'linear-gradient(135deg, rgba(255, 152, 0, 0.15) 0%, rgba(255, 152, 0, 0.03) 100%)'
                  }}>
                    <Icon name="Sparkles" size={24} className="sm:!w-7 sm:!h-7" style={{color: '#ff9800', strokeWidth: 2}} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base sm:text-lg font-semibold text-foreground mb-1">Обряд на внушение любви</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">Магический ритуал для пробуждения искренних чувств</p>
                  </div>
                  <Icon name="ChevronRight" size={20} className="text-muted-foreground group-hover:text-accent transition-colors" />
                </div>
              </div>

              <div className="border border-border rounded-lg p-4 hover:bg-muted/20 hover:shadow-lg transition-all duration-300 cursor-pointer group" style={{
                boxShadow: 'none'
              }} onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(255, 152, 0, 0.2)';
              }} onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = 'none';
              }}>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center flex-shrink-0 transform-gpu" style={{
                    background: 'linear-gradient(135deg, rgba(255, 152, 0, 0.15) 0%, rgba(255, 152, 0, 0.03) 100%)'
                  }}>
                    <Icon name="Sun" size={24} className="sm:!w-7 sm:!h-7" style={{color: '#ff9800', strokeWidth: 2}} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base sm:text-lg font-semibold text-foreground mb-1">Обряд на снятие одиночества</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">Ритуал для привлечения спутника жизни и избавления от одиночества</p>
                  </div>
                  <Icon name="ChevronRight" size={20} className="text-muted-foreground group-hover:text-accent transition-colors" />
                </div>
              </div>

              {/* Hidden Rituals */}
              {showMoreRituals && (
                <>
                  <div className="border border-border rounded-lg p-4 hover:bg-muted/20 hover:shadow-lg transition-all duration-300 cursor-pointer group" style={{
                    boxShadow: 'none'
                  }} onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 8px 25px rgba(255, 152, 0, 0.2)';
                  }} onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = 'none';
                  }}>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center flex-shrink-0 transform-gpu" style={{
                        background: 'linear-gradient(135deg, rgba(255, 152, 0, 0.15) 0%, rgba(255, 152, 0, 0.03) 100%)'
                      }}>
                        <Icon name="HeartHandshake" size={24} className="sm:!w-7 sm:!h-7" style={{color: '#ff9800', strokeWidth: 2}} />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-base sm:text-lg font-semibold text-foreground mb-1">Обряд на привлечение любви</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">Магический ритуал для привлечения истинной любви в жизнь</p>
                      </div>
                      <Icon name="ChevronRight" size={20} className="text-muted-foreground group-hover:text-accent transition-colors" />
                    </div>
                  </div>

                  <div className="border border-border rounded-lg p-4 hover:bg-muted/20 hover:shadow-lg transition-all duration-300 cursor-pointer group" style={{
                    boxShadow: 'none'
                  }} onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 8px 25px rgba(255, 152, 0, 0.2)';
                  }} onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = 'none';
                  }}>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center flex-shrink-0 transform-gpu" style={{
                        background: 'linear-gradient(135deg, rgba(255, 152, 0, 0.15) 0%, rgba(255, 152, 0, 0.03) 100%)'
                      }}>
                        <Icon name="Image" size={24} className="sm:!w-7 sm:!h-7" style={{color: '#ff9800', strokeWidth: 2}} />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-base sm:text-lg font-semibold text-foreground mb-1">Обряд приворота на фото</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">Дистанционный обряд с использованием фотографии человека</p>
                      </div>
                      <Icon name="ChevronRight" size={20} className="text-muted-foreground group-hover:text-accent transition-colors" />
                    </div>
                  </div>

                  <div className="border border-border rounded-lg p-4 hover:bg-muted/20 hover:shadow-lg transition-all duration-300 cursor-pointer group" style={{
                    boxShadow: 'none'
                  }} onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 8px 25px rgba(255, 152, 0, 0.2)';
                  }} onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = 'none';
                  }}>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center flex-shrink-0 transform-gpu" style={{
                        background: 'linear-gradient(135deg, rgba(255, 152, 0, 0.15) 0%, rgba(255, 152, 0, 0.03) 100%)'
                      }}>
                        <Icon name="Shield" size={24} className="sm:!w-7 sm:!h-7" style={{color: '#ff9800', strokeWidth: 2}} />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-base sm:text-lg font-semibold text-foreground mb-1">Обряд от соперницы</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">Защитный ритуал для устранения влияния соперницы</p>
                      </div>
                      <Icon name="ChevronRight" size={20} className="text-muted-foreground group-hover:text-accent transition-colors" />
                    </div>
                  </div>

                  <div className="border border-border rounded-lg p-4 hover:bg-muted/20 hover:shadow-lg transition-all duration-300 cursor-pointer group" style={{
                    boxShadow: 'none'
                  }} onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 8px 25px rgba(255, 152, 0, 0.2)';
                  }} onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = 'none';
                  }}>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center flex-shrink-0 transform-gpu" style={{
                        background: 'linear-gradient(135deg, rgba(255, 152, 0, 0.15) 0%, rgba(255, 152, 0, 0.03) 100%)'
                      }}>
                        <Icon name="Battery" size={24} className="sm:!w-7 sm:!h-7" style={{color: '#ff9800', strokeWidth: 2}} />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-base sm:text-lg font-semibold text-foreground mb-1">Обряд на набор энергии</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">Ритуал для восстановления жизненной энергии и сил</p>
                      </div>
                      <Icon name="ChevronRight" size={20} className="text-muted-foreground group-hover:text-accent transition-colors" />
                    </div>
                  </div>

                  <div className="border border-border rounded-lg p-4 hover:bg-muted/20 hover:shadow-lg transition-all duration-300 cursor-pointer group" style={{
                    boxShadow: 'none'
                  }} onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 8px 25px rgba(255, 152, 0, 0.2)';
                  }} onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = 'none';
                  }}>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center flex-shrink-0 transform-gpu" style={{
                        background: 'linear-gradient(135deg, rgba(255, 152, 0, 0.15) 0%, rgba(255, 152, 0, 0.03) 100%)'
                      }}>
                        <Icon name="Handshake" size={24} className="sm:!w-7 sm:!h-7" style={{color: '#ff9800', strokeWidth: 2}} />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-base sm:text-lg font-semibold text-foreground mb-1">Обряд на примирение</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">Ритуал для восстановления мира и согласия в отношениях</p>
                      </div>
                      <Icon name="ChevronRight" size={20} className="text-muted-foreground group-hover:text-accent transition-colors" />
                    </div>
                  </div>

                  <div className="border border-border rounded-lg p-4 hover:bg-muted/20 hover:shadow-lg transition-all duration-300 cursor-pointer group" style={{
                    boxShadow: 'none'
                  }} onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 8px 25px rgba(255, 152, 0, 0.2)';
                  }} onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = 'none';
                  }}>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center flex-shrink-0 transform-gpu" style={{
                        background: 'linear-gradient(135deg, rgba(255, 152, 0, 0.15) 0%, rgba(255, 152, 0, 0.03) 100%)'
                      }}>
                        <Icon name="Zap" size={24} className="sm:!w-7 sm:!h-7" style={{color: '#ff9800', strokeWidth: 2}} />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-base sm:text-lg font-semibold text-foreground mb-1">Обряд на вольта</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">Мощный магический ритуал с использованием восковой куклы</p>
                      </div>
                      <Icon name="ChevronRight" size={20} className="text-muted-foreground group-hover:text-accent transition-colors" />
                    </div>
                  </div>
                </>
              )}

              {/* Show More Button */}
              <div className="pt-4">
                <Button 
                  variant="outline" 
                  className="w-full border-accent text-accent hover:bg-accent hover:text-white transition-all duration-300"
                  onClick={() => setShowMoreRituals(!showMoreRituals)}
                >
                  {showMoreRituals ? 'Скрыть' : 'Показать больше'}
                  <Icon name={showMoreRituals ? 'ChevronUp' : 'ChevronDown'} size={16} className="ml-2" />
                </Button>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="h-6 bg-[#27262d]"></div>

          {/* FAQ Section */}
          <div>
            <h2 className="text-xl font-bold text-foreground mb-6 relative">
              <span className="relative inline-block">
                <span className="text-2xl font-bold relative z-10" style={{color: '#ff9800'}}>В</span>
                <div className="absolute w-9 h-9 rounded-full opacity-40" style={{
                  background: 'linear-gradient(135deg, rgba(255, 152, 0, 0.6) 0%, rgba(255, 152, 0, 0.1) 100%)',
                  top: '-1px',
                  left: '-10px'
                }}></div>
              </span>опросы и ответы
            </h2>
            
            <div className="space-y-4">
              <div className="border border-border rounded-lg p-4 hover:bg-muted/20 transition-colors cursor-pointer">
                <div className="flex items-center justify-between">
                  <p className="font-medium text-foreground">Как я могу связаться с вами?</p>
                  <Icon name="ChevronDown" size={20} className="text-muted-foreground" />
                </div>
              </div>
              
              <div className="border border-border rounded-lg p-4 hover:bg-muted/20 transition-colors cursor-pointer">
                <div className="flex items-center justify-between">
                  <p className="font-medium text-foreground">Как я могу вас отблагодарить?</p>
                  <Icon name="ChevronDown" size={20} className="text-muted-foreground" />
                </div>
              </div>
              
              <div className="border border-border rounded-lg p-4 hover:bg-muted/20 transition-colors cursor-pointer">
                <div className="flex items-center justify-between">
                  <p className="font-medium text-foreground">Вы практикуете порчу?</p>
                  <Icon name="ChevronDown" size={20} className="text-muted-foreground" />
                </div>
              </div>
              
              <div className="border border-border rounded-lg p-4 hover:bg-muted/20 transition-colors cursor-pointer">
                <div className="flex items-center justify-between">
                  <p className="font-medium text-foreground pr-2">Вы можете погадать на наши отношения с парнем/девушкой или просто погадать мне на что либо?</p>
                  <Icon name="ChevronDown" size={20} className="text-muted-foreground flex-shrink-0" />
                </div>
              </div>
              
              <div className="border border-border rounded-lg p-4 hover:bg-muted/20 transition-colors cursor-pointer">
                <div className="flex items-center justify-between">
                  <p className="font-medium text-foreground">Сколько стоят ваши услуги?</p>
                  <Icon name="ChevronDown" size={20} className="text-muted-foreground" />
                </div>
              </div>
              
              <div className="border border-border rounded-lg p-4 hover:bg-muted/20 transition-colors cursor-pointer">
                <div className="flex items-center justify-between">
                  <p className="font-medium text-foreground">Со скольки лет вы принимаете?</p>
                  <Icon name="ChevronDown" size={20} className="text-muted-foreground" />
                </div>
              </div>
              
              <div className="border border-border rounded-lg p-4 hover:bg-muted/20 transition-colors cursor-pointer">
                <div className="flex items-center justify-between">
                  <p className="font-medium text-foreground">Чем конкретно вы занимаетесь?</p>
                  <Icon name="ChevronDown" size={20} className="text-muted-foreground" />
                </div>
              </div>
              
              <div className="border border-border rounded-lg p-4 hover:bg-muted/20 transition-colors cursor-pointer">
                <div className="flex items-center justify-between">
                  <p className="font-medium text-foreground pr-2">У вас есть ограничение в помощи по религии?</p>
                  <Icon name="ChevronDown" size={20} className="text-muted-foreground flex-shrink-0" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}