import React, { useState, useEffect } from 'react';
import Icon from '@/components/ui/icon';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isVisible, setIsVisible] = useState(false);
  const [stepTransition, setStepTransition] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
      setTimeout(() => setCurrentStep(1), 300);
    }
  }, [isOpen]);

  if (!isOpen && !isVisible) return null;

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      setCurrentStep(1);
      onClose();
    }, 300);
  };

  const handleNext = () => {
    if (currentStep < 4) {
      setStepTransition(true);
      setTimeout(() => {
        setCurrentStep(currentStep + 1);
        setStepTransition(false);
      }, 150);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setStepTransition(true);
      setTimeout(() => {
        setCurrentStep(currentStep - 1);
        setStepTransition(false);
      }, 150);
    }
  };

  const handleWhatsApp = () => {
    window.open('https://wa.me/79000000000', '_blank');
    handleClose();
  };

  const handleTelegram = () => {
    window.open('https://t.me/username', '_blank');
    handleClose();
  };

  const handleEmail = () => {
    window.open('mailto:example@example.com', '_blank');
    handleClose();
  };

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 transition-all duration-300 ${
        isVisible ? 'bg-black/60 backdrop-blur-sm' : 'bg-black/0 backdrop-blur-none'
      }`}
      onClick={handleClose}
    >
      <div 
        className={`relative w-full max-w-xs sm:max-w-md transition-all duration-300 transform ${
          isVisible ? 'scale-100 opacity-100 translate-y-0' : 'scale-95 opacity-0 translate-y-4'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-card border border-border rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-2xl max-h-[95vh] overflow-y-auto">
        <button 
          onClick={handleClose}
          className="absolute right-3 sm:right-4 top-3 sm:top-4 text-muted-foreground hover:text-foreground transition-colors z-10 p-1 rounded-full hover:bg-muted"
        >
          <Icon name="X" size={20} className="sm:w-6 sm:h-6" />
        </button>

          <div className={`transition-all duration-300 ${stepTransition ? 'opacity-0 translate-x-2' : 'opacity-100 translate-x-0'}`}>
            {/* Шаг 1: Предупреждение о возрасте */}
            {currentStep === 1 && (
              <div className="text-center pt-2 sm:pt-0">
                <div className="mb-4 sm:mb-6">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center animate-pulse-glow">
                    <Icon name="AlertTriangle" size={32} className="text-primary sm:w-10 sm:h-10" />
                  </div>
                  <h2 className="text-foreground text-xl sm:text-2xl font-bold mb-3 sm:mb-4 font-[Montserrat]">
                    Внимание<span className="text-primary">!</span>
                  </h2>
                </div>
                
                <div className="bg-muted/50 border border-border rounded-lg p-4 mb-6 sm:mb-8">
                  <p className="text-foreground text-base sm:text-lg leading-relaxed">
                    Все обращения принимаются строго с <span className="font-bold text-primary">18 лет</span>.
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <button 
                    onClick={handleClose}
                    className="flex-1 bg-muted hover:bg-muted/80 text-foreground py-3 px-6 rounded-full font-medium transition-all duration-200 active:scale-95"
                  >
                    Назад
                  </button>
                  <button 
                    onClick={handleNext}
                    className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground py-3 px-6 rounded-full font-medium transition-all duration-200 active:scale-95 shadow-lg"
                  >
                    Мне есть 18
                  </button>
                </div>
              </div>
            )}

            {/* Шаг 2: Важная информация */}
            {currentStep === 2 && (
              <div className="pt-2 sm:pt-0">
                <div className="text-center mb-4 sm:mb-6">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 bg-info/10 rounded-full flex items-center justify-center animate-pulse-glow">
                    <Icon name="Info" size={32} className="text-info sm:w-10 sm:h-10" />
                  </div>
                  <h2 className="text-foreground text-lg sm:text-xl font-bold font-[Montserrat]">Важная информация</h2>
                </div>
                
                <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                  <div className="bg-info/10 border border-info/20 rounded-lg p-3 sm:p-4">
                    <p className="text-foreground text-sm sm:text-base leading-relaxed border-b border-border pb-2 mb-2">
                      Сейчас я занимаюсь исключительно любовными обрядами и ритуалами.
                    </p>
                  </div>
                  
                  <div className="bg-warning/10 border border-warning/20 rounded-lg p-3 sm:p-4">
                    <p className="text-warning text-sm sm:text-base leading-relaxed">
                      Гадание на будущее, настоящее или расклады карт для простого любопытства, к сожалению, не провожу.
                    </p>
                  </div>
                  
                  <div className="bg-success/10 border border-success/20 rounded-lg p-3 sm:p-4">
                    <p className="text-success text-sm sm:text-base leading-relaxed">
                      Но если вам нужно вернуть отношения или провести любовный обряд, я готова помочь.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <button 
                    onClick={handleBack}
                    className="flex-1 bg-muted hover:bg-muted/80 text-foreground py-3 px-6 rounded-full font-medium transition-all duration-200 active:scale-95"
                  >
                    Назад
                  </button>
                  <button 
                    onClick={handleNext}
                    className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground py-3 px-6 rounded-full font-medium transition-all duration-200 active:scale-95 shadow-lg"
                  >
                    Далее
                  </button>
                </div>
              </div>
            )}

            {/* Шаг 3: Что НЕ делаю */}
            {currentStep === 3 && (
              <div className="pt-2 sm:pt-0">
                <div className="text-center mb-4 sm:mb-6">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 bg-destructive/10 rounded-full flex items-center justify-center animate-pulse-glow">
                    <Icon name="XCircle" size={32} className="text-destructive sm:w-10 sm:h-10" />
                  </div>
                  <h2 className="text-destructive text-lg sm:text-xl font-bold font-[Montserrat]">То, чем я НЕ ЗАНИМАЮСЬ!</h2>
                </div>
                
                <div className="space-y-3 mb-4 sm:mb-6">
                  <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-3">
                    <p className="text-destructive text-xs sm:text-sm leading-relaxed">
                      <span className="font-semibold text-destructive/80">1.</span> Не гадаю на будущее, настоящее или прошлое. Если вы ищете гадалку, это не ко мне.
                    </p>
                  </div>
                  
                  <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-3">
                    <p className="text-destructive text-xs sm:text-sm leading-relaxed">
                      <span className="font-semibold text-destructive/80">2.</span> Не доказываю свои способности. Без веры в духовность наш разговор не имеет смысла.
                    </p>
                  </div>
                  
                  <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-3">
                    <p className="text-destructive text-xs sm:text-sm leading-relaxed">
                      <span className="font-semibold text-destructive/80">3.</span> Не даю советы по общим вопросам жизни. Ко мне обращаются когда точно знают чего хотят.
                    </p>
                  </div>
                </div>

                <div className="bg-primary/10 border border-primary/20 rounded-lg p-3 sm:p-4 mb-6 sm:mb-8">
                  <p className="text-center text-primary text-sm sm:text-base font-medium">
                    Моя специализация — ТОЛЬКО ЛЮБОВНЫЕ ОБРЯДЫ!
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <button 
                    onClick={handleClose}
                    className="flex-1 bg-muted hover:bg-muted/80 text-foreground py-3 px-6 rounded-full font-medium transition-all duration-200 active:scale-95"
                  >
                    Выйти
                  </button>
                  <button 
                    onClick={handleNext}
                    className="flex-1 bg-success hover:bg-success/90 text-white py-3 px-6 rounded-full font-medium transition-all duration-200 active:scale-95 shadow-lg"
                  >
                    Я по делу
                  </button>
                </div>
              </div>
            )}

            {/* Шаг 4: Выбор способа связи */}
            {currentStep === 4 && (
              <div className="text-center pt-2 sm:pt-0">
                <div className="mb-4 sm:mb-6">
                  <div className="flex justify-center mb-4">
                    <div className="relative animate-float">
                      <div className="w-14 h-14 sm:w-16 sm:h-16 bg-primary rounded-2xl transform rotate-12 flex items-center justify-center shadow-lg">
                        <Icon name="MessageSquare" size={24} className="text-primary-foreground sm:w-8 sm:h-8" />
                      </div>
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/80 rounded-xl transform -rotate-12 absolute -right-1 sm:-right-2 -top-1 sm:-top-2 flex items-center justify-center shadow-lg">
                        <Icon name="MessageCircle" size={16} className="text-primary-foreground sm:w-5 sm:h-5" />
                      </div>
                    </div>
                  </div>
                  <h2 className="text-foreground text-lg sm:text-xl font-bold font-[Montserrat]">Выберите способ связи</h2>
                </div>

                <div className="space-y-4 sm:space-y-6">
                  <div className="grid grid-cols-2 gap-3 sm:gap-4">
                    <button
                      onClick={handleWhatsApp}
                      className="flex flex-col items-center gap-2 sm:gap-3 p-3 sm:p-4 rounded-xl hover:bg-muted transition-all duration-200 active:scale-95 border border-border hover:border-success/30 hover-lift"
                    >
                      <div className="w-12 h-12 sm:w-16 sm:h-16 bg-success rounded-full flex items-center justify-center shadow-lg">
                        <Icon name="MessageCircle" size={20} className="text-white sm:w-7 sm:h-7" />
                      </div>
                      <span className="text-foreground font-medium text-sm sm:text-base">WhatsApp</span>
                    </button>

                    <button
                      onClick={handleTelegram}
                      className="flex flex-col items-center gap-2 sm:gap-3 p-3 sm:p-4 rounded-xl hover:bg-muted transition-all duration-200 active:scale-95 border border-border hover:border-info/30 hover-lift"
                    >
                      <div className="w-12 h-12 sm:w-16 sm:h-16 bg-info rounded-full flex items-center justify-center shadow-lg">
                        <Icon name="Send" size={20} className="text-white sm:w-7 sm:h-7" />
                      </div>
                      <span className="text-foreground font-medium text-sm sm:text-base">Telegram</span>
                    </button>
                  </div>

                  <button
                    onClick={handleEmail}
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3 px-6 rounded-full font-medium transition-all duration-200 active:scale-95 shadow-lg flex items-center justify-center gap-2 hover-lift"
                  >
                    <Icon name="Mail" size={18} className="text-primary-foreground" />
                    <span>Написать на Email</span>
                  </button>
                </div>
              </div>
            )}
          </div>
          
          {/* Индикатор прогресса */}
          <div className="flex justify-center mt-6 sm:mt-8 pt-4 border-t border-border">
            <div className="flex gap-2">
              {[1, 2, 3, 4].map((step) => (
                <div 
                  key={step}
                  className={`h-2 rounded-full transition-all duration-500 ${
                    step === currentStep 
                      ? 'bg-primary w-6' 
                      : step < currentStep 
                      ? 'bg-primary/60 w-2' 
                      : 'bg-muted w-2'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}