import { useState } from 'react';
import Icon from '@/components/ui/icon';

const faqItems = [
  {
    question: 'Как я могу связаться с вами?',
    answer: 'Вы можете выбрать любой удобный способ связи нажав –  СЮДА'
  },
  {
    question: 'Как я могу вас отблагодарить?',
    answer: 'Как посчитаете нужным, если захотите – отблагодарите.'
  },
  {
    question: 'Вы практикуете порчу?',
    answer: 'Уважаемые сестры и братья, настоятельно прошу вас не обращаться ко мне с такими вопросами, порча – есть высшая степень сатанизма, которая несет только разрушение всем сторонам обряда.'
  },
  {
    question: 'Вы можете погадать на наши отношения с парнем/девушкой или просто погадать мне на что либо?',
    answer: 'Моя основа это практическая магия, практическая помощь людям у меня в приоритете, так как обычные гадания в большинстве своем не решают проблему. Поэтому если вам нужно просто погадать на будущее, настоящее или прошлое, я не смогу вам помочь, так как повторюсь – мой приоритет это реальная помощь людям именно в практической направленности любовных проблем.'
  },
  {
    question: 'Сколько стоят ваши услуги?',
    answer: 'Моя магия не имеет цен, настоятельно не советую обращаться к магам, которые устанавливают цены за свои услуги.'
  },
  {
    question: 'Со скольки лет вы принимаете?',
    answer: 'Все обращения принимаются строго с 18 лет!'
  },
  {
    question: 'Чем конкретно вы занимаетесь?',
    answer: 'Моя работа связана с обрядной практикой нацеленной на разрешения любовных проблем между людьми. С самого начала я занималась гаданиями на будущее и всем что связано с гаданием. Однако со временем я осознала, что это требует слишком много энергии и времени. Поэтому я приняла решение отказаться от всех видов гаданий и связанных с ними практик, полностью перейдя на практическую обрядную работу связанную с любовными проблемами.'
  },
  {
    question: 'У вас есть ограничение в помощи по религии?',
    answer: 'Как правило все мои методы универсальны по отношению к той или иной религии. Иными словами с какой бы верой вы не шли по своему жизненному пути, вы всегда можете обратится ко мне, не опасаясь последствий.'
  },
  {
    question: 'Ваши обряды не навредят мне или моей семье?',
    answer: 'Самым важным в моей работе, как и в любой другой, являются знания. Я хорошо разбираюсь в своей области и отношусь к ней с полной ответственностью и серьезностью, осознавая, что имею дело с жизнями людей. Можете быть уверены, что обратившись ко мне, я не применю опасные методики, которые могли бы навредить вам или вашим близким.'
  }
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
        {faqItems.map((item, index) => {
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
                  <div 
                    className="absolute right-2 top-4 w-8 h-8 rounded-md flex items-center justify-center transition-all duration-300 transform rotate-12" 
                    style={{
                      backgroundColor: 'rgba(255, 152, 0, 0.08)',
                      border: '1px solid rgba(255, 152, 0, 0.15)'
                    }}
                  >
                    <span 
                      className="text-lg font-bold transition-colors duration-300" 
                      style={{color: isOpen ? 'rgb(255, 152, 0)' : 'rgba(255, 152, 0, 0.15)'}}
                    >
                      ?
                    </span>
                  </div>

                  {/* Дополнительные иконки в хаотичном порядке */}

                  <div 
                    className="absolute right-1 bottom-2 w-5 h-5 rounded flex items-center justify-center transform rotate-45" 
                    style={{
                      backgroundColor: 'rgba(255, 152, 0, 0.02)',
                      border: '1px solid rgba(255, 152, 0, 0.06)'
                    }}
                  >
                    <span className="text-xs font-bold" style={{color: 'rgba(255, 152, 0, 0.15)'}}>?</span>
                  </div>



                  <div 
                    className="absolute right-8 top-1/2 w-6 h-6 rounded flex items-center justify-center transform -rotate-30" 
                    style={{
                      backgroundColor: 'rgba(255, 152, 0, 0.03)',
                      border: '1px solid rgba(255, 152, 0, 0.08)'
                    }}
                  >
                    <span className="text-xs font-bold" style={{color: 'rgba(255, 152, 0, 0.15)'}}>?</span>
                  </div>
                </div>
                
                <div className="relative">
                  <div className="flex-1 pr-12">
                    <p className={`text-lg font-medium transition-colors duration-300 leading-relaxed ${
                      isOpen ? 'text-accent' : 'text-foreground group-hover:text-accent'
                    }`}>{item.question}</p>
                  </div>
                </div>

                {/* Раскрывающийся контент */}
                <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  isOpen ? 'max-h-[500px] opacity-100 mt-4' : 'max-h-0 opacity-0'
                }`}>
                  <div className="pr-12">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {item.answer}
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