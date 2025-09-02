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
      
      <div className="space-y-2">
        {faqItems.map((question, index) => (
          <div key={index} className="group py-4 px-2 cursor-pointer transition-all duration-200 hover:bg-accent/8 rounded-md">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-1">
                <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center">
                  <Icon name="HelpCircle" size={14} style={{color: '#ff9800'}} />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-base font-medium text-foreground group-hover:text-accent transition-colors duration-200 leading-relaxed">{question}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}