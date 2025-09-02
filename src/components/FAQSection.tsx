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
        {faqItems.map((question, index) => (
          <div key={index} className="group relative overflow-hidden">
            <div className="relative p-5 cursor-pointer bg-gradient-to-br from-background to-muted/20 hover:from-accent/5 hover:to-accent/10 transition-all duration-300 rounded-2xl border border-border/50 hover:border-accent/30">
              {/* Полупрозрачный оранжевый знак вопроса справа */}
              <div className="absolute -right-2 top-1/2 -translate-y-1/2 text-8xl font-bold transition-colors duration-300 transform rotate-12 select-none pointer-events-none" style={{color: 'rgba(255, 152, 0, 0.1)'}} onMouseEnter={(e) => {e.currentTarget.style.color = 'rgba(255, 152, 0, 0.2)'}} onMouseLeave={(e) => {e.currentTarget.style.color = 'rgba(255, 152, 0, 0.1)'}}>
                ?
              </div>
              
              <div className="relative flex items-start gap-4">
                <div className="flex-shrink-0">
                  <Icon 
                    name="ChevronDown" 
                    size={20} 
                    className="text-muted-foreground group-hover:text-accent transition-all duration-300 group-hover:rotate-180" 
                  />
                </div>
                <div className="flex-1 pr-6">
                  <p className="text-lg font-medium text-foreground group-hover:text-accent transition-colors duration-300 leading-relaxed">{question}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}