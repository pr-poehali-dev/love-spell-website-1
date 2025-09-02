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
                <div className="relative">
                  <div className="flex-1">
                    <p className="text-lg font-medium text-foreground group-hover:text-accent transition-colors duration-300 leading-relaxed">{question}</p>
                  </div>
                </div>

                {/* Раскрывающийся контент */}
                <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  isOpen ? 'max-h-40 opacity-100 mt-4' : 'max-h-0 opacity-0'
                }`}>
                  <div>
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