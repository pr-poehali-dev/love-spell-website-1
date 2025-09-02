import { useState } from 'react';
import Icon from '@/components/ui/icon';

const faqItems = [
  'Как я могу связаться с вами?',
  'Как я могу вас отблагодарить?',
  'Вы практикуете порчу?',
  'Вы можете погадать на наши отношения с парнем/девушкой или просто погадать мне на что либо?',
  'Сколько стоят ваши услуги?',
  'Со скольки лет вы принимаете?',
  'Чем конкретно вы занимаетесь?',
  'У вас есть ограничение в помощи по религии?'
];

export default function FAQSection() {
  const [openItem, setOpenItem] = useState<number | null>(0);

  const toggleItem = (index: number) => {
    setOpenItem(openItem === index ? null : index);
  };

  return (
    <div>
      <h2 className="text-xl font-bold text-foreground mb-8 relative">
        <span className="relative inline-block">
          <span className="text-2xl font-bold relative z-10 text-primary">В</span>
          <div className="absolute w-9 h-9 rounded-full opacity-40" style={{
            background: 'linear-gradient(135deg, hsl(var(--primary) / 0.6) 0%, hsl(var(--primary) / 0.1) 100%)',
            top: '-1px',
            left: '-10px'
          }}></div>
        </span>опросы и ответы
      </h2>
      
      <div className="grid gap-4">
        {faqItems.map((question, index) => {
          const isOpen = openItem === index;
          return (
            <div key={index} className="group relative overflow-hidden">
              <div 
                className={`relative p-5 cursor-pointer transition-all duration-300 rounded-2xl ${
                  isOpen 
                    ? 'bg-gradient-to-br from-accent/10 to-accent/5 border-accent/40 shadow-md' 
                    : 'bg-gradient-to-br from-background to-muted/20 hover:from-accent/5 hover:to-accent/10 border-border/50 hover:border-accent/30'
                } border`}
                onClick={() => toggleItem(index)}
              >
                {/* Множественные хаотичные иконки вопросов */}
                <div className="absolute inset-0 overflow-hidden select-none pointer-events-none">
                  {/* Основная иконка - правый верх (самая яркая) */}
                  <div 
                    className="absolute right-2 top-4 w-8 h-8 rounded-md flex items-center justify-center transition-all duration-300 transform rotate-12" 
                    style={{
                      backgroundColor: 'hsl(var(--primary) / 0.2)',
                      border: '1px solid hsl(var(--primary) / 0.35)'
                    }}
                  >
                    <span 
                      className="text-lg font-bold transition-colors duration-300" 
                      style={{color: isOpen ? 'hsl(var(--primary))' : 'hsl(var(--primary) / 0.6)'}}
                    >
                      ?
                    </span>
                  </div>

                  {/* Дополнительные иконки в хаотичном порядке */}

                  {/* Маленькая иконка (минимальная яркость) */}
                  <div 
                    className="absolute right-1 bottom-2 w-5 h-5 rounded flex items-center justify-center transform rotate-45" 
                    style={{
                      backgroundColor: 'hsl(var(--primary) / 0.05)',
                      border: '1px solid hsl(var(--primary) / 0.1)'
                    }}
                  >
                    <span className="text-xs font-bold" style={{color: 'hsl(var(--primary) / 0.15)'}}>?</span>
                  </div>



                  {/* Средняя иконка (средняя яркость) */}
                  <div 
                    className="absolute right-8 top-1/2 w-6 h-6 rounded flex items-center justify-center transform -rotate-30" 
                    style={{
                      backgroundColor: 'hsl(var(--primary) / 0.12)',
                      border: '1px solid hsl(var(--primary) / 0.2)'
                    }}
                  >
                    <span className="text-xs font-bold" style={{color: 'hsl(var(--primary) / 0.35)'}}>?</span>
                  </div>
                </div>
                
                <div className="relative">
                  <div className="flex-1 pr-12">
                    <p className={`text-lg font-medium transition-colors duration-300 leading-relaxed ${
                      isOpen ? 'text-accent' : 'text-foreground group-hover:text-accent'
                    }`}>{question}</p>
                  </div>
                </div>

                {/* Раскрывающийся контент */}
                <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  isOpen ? 'max-h-40 opacity-100 mt-4' : 'max-h-0 opacity-0'
                }`}>
                  <div className="pr-12">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Здесь будет ответ на вопрос. Пока что это заглушка для демонстрации анимации раскрытия контента.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}