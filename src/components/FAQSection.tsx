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
      
      <div className="space-y-3">
        {faqItems.map((question, index) => (
          <div key={index} className="group relative p-5 cursor-pointer transition-all duration-300 rounded-xl hover:bg-gradient-to-r hover:from-accent/8 hover:to-accent/3 border border-transparent hover:border-accent/20">
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 rounded-full flex items-center justify-center group-hover:bg-accent/15 transition-colors duration-300">
                  <span className="text-sm font-semibold text-accent">{index + 1}</span>
                </div>
              </div>
              <div className="flex-1">
                <p className="font-medium text-foreground group-hover:text-accent transition-colors duration-300 leading-relaxed">{question}</p>
              </div>
              <div className="flex-shrink-0">
                <Icon name="ChevronRight" size={18} className="text-muted-foreground group-hover:text-accent group-hover:translate-x-1 transition-all duration-300" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}