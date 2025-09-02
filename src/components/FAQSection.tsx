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
  const [openItems, setOpenItems] = useState<Set<number>>(new Set());

  const toggleItem = (index: number) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(index)) {
      newOpenItems.delete(index);
    } else {
      newOpenItems.add(index);
    }
    setOpenItems(newOpenItems);
  };

  return (
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
      
      <div className="grid gap-4">
        {faqItems.map((question, index) => {
          const isOpen = openItems.has(index);
          return (
            <div key={index} className="group relative overflow-hidden">
              <div 
                className="relative p-5 cursor-pointer bg-gradient-to-br from-background to-muted/20 hover:from-accent/5 hover:to-accent/10 transition-all duration-300 rounded-2xl border border-border/50 hover:border-accent/30"
                onClick={() => toggleItem(index)}
              >
                {/* Множественные хаотичные иконки вопросов */}
                <div className="absolute inset-0 overflow-hidden select-none pointer-events-none">
                  {/* Основная иконка - правый верх */}
                  <div 
                    className="absolute right-2 top-4 w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-300 transform rotate-12" 
                    style={{
                      backgroundColor: 'rgba(255, 152, 0, 0.05)',
                      border: '1px solid rgba(255, 152, 0, 0.1)'
                    }}
                  >
                    <span 
                      className="text-2xl font-bold transition-colors duration-300" 
                      style={{color: isOpen ? 'rgba(255, 152, 0, 0.8)' : 'rgba(255, 152, 0, 0.15)'}}
                    >
                      ?
                    </span>
                  </div>

                  {/* Дополнительные иконки в хаотичном порядке */}
                  <div 
                    className="absolute left-1 top-2 w-8 h-8 rounded-md flex items-center justify-center transform -rotate-45" 
                    style={{
                      backgroundColor: 'rgba(255, 152, 0, 0.03)',
                      border: '1px solid rgba(255, 152, 0, 0.05)'
                    }}
                  >
                    <span className="text-sm font-bold" style={{color: 'rgba(255, 152, 0, 0.08)'}}>?</span>
                  </div>

                  <div 
                    className="absolute right-1 bottom-2 w-6 h-6 rounded flex items-center justify-center transform rotate-45" 
                    style={{
                      backgroundColor: 'rgba(255, 152, 0, 0.02)',
                      border: '1px solid rgba(255, 152, 0, 0.04)'
                    }}
                  >
                    <span className="text-xs font-bold" style={{color: 'rgba(255, 152, 0, 0.06)'}}>?</span>
                  </div>

                  <div 
                    className="absolute left-4 bottom-4 w-10 h-10 rounded-xl flex items-center justify-center transform rotate-75" 
                    style={{
                      backgroundColor: 'rgba(255, 152, 0, 0.04)',
                      border: '1px solid rgba(255, 152, 0, 0.06)'
                    }}
                  >
                    <span className="text-lg font-bold" style={{color: 'rgba(255, 152, 0, 0.1)'}}>?</span>
                  </div>

                  <div 
                    className="absolute right-8 top-1/2 w-7 h-7 rounded-lg flex items-center justify-center transform -rotate-30" 
                    style={{
                      backgroundColor: 'rgba(255, 152, 0, 0.025)',
                      border: '1px solid rgba(255, 152, 0, 0.05)'
                    }}
                  >
                    <span className="text-sm font-bold" style={{color: 'rgba(255, 152, 0, 0.07)'}}>?</span>
                  </div>
                </div>
                
                <div className="relative flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <Icon 
                      name="ChevronDown" 
                      size={20} 
                      className={`text-muted-foreground group-hover:text-accent transition-all duration-300 ${
                        isOpen ? 'rotate-180 text-accent' : ''
                      }`}
                    />
                  </div>
                  <div className="flex-1 pr-6">
                    <p className="text-lg font-medium text-foreground group-hover:text-accent transition-colors duration-300 leading-relaxed">{question}</p>
                  </div>
                </div>

                {/* Раскрывающийся контент */}
                <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  isOpen ? 'max-h-40 opacity-100 mt-4' : 'max-h-0 opacity-0'
                }`}>
                  <div className="pl-10 pr-6">
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