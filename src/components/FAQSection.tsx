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
      
      <div className="space-y-4">
        {faqItems.map((question, index) => (
          <div key={index} className="group relative">
            <div className="flex items-start gap-4 p-4 cursor-pointer transition-all duration-200 hover:bg-muted/30 rounded-lg">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-muted flex items-center justify-center group-hover:bg-accent/20 transition-colors duration-200">
                <span className="text-sm font-bold text-muted-foreground group-hover:text-accent transition-colors duration-200">Q</span>
              </div>
              <div className="flex-1">
                <p className="text-base text-foreground group-hover:text-accent/90 transition-colors duration-200 leading-relaxed font-medium">{question}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}