import Icon from '@/components/ui/icon';

export default function ServicesSection() {
  return (
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
      
      <div className="space-y-6">
        {/* Christian Magic */}
        <div>
          <div className="w-12 h-12 rounded-full flex items-center justify-center mb-3 bg-accent/10">
            <Icon name="Plus" size={20} className="text-accent" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-3">Христианской магией</h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Основана на работе с архангелами, ангелами, святыми, а также известными архетипами Пресвятой Девы и Отца Небесного.
          </p>
        </div>

        {/* Runic Magic */}
        <div>
          <div className="w-12 h-12 rounded-full flex items-center justify-center mb-3 bg-accent/10">
            <Icon name="Zap" size={20} className="text-accent" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-3">Рунической магией</h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Использование специальных знаков и символов (рун) для получения нужного результата.
          </p>
        </div>

        {/* Candle Magic */}
        <div>
          <div className="w-12 h-12 rounded-full flex items-center justify-center mb-3 bg-accent/10">
            <Icon name="Flame" size={20} className="text-accent" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-3">Магией свечей</h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Искусство управления жизненными событиями и влияния на окружающий мир через работу со свечами.
          </p>
        </div>

        {/* Knot Magic */}
        <div>
          <div className="w-12 h-12 rounded-full flex items-center justify-center mb-3 bg-accent/10">
            <Icon name="GitBranch" size={20} className="text-accent" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-3">Магией узлов</h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Магическое направление связи специальных узлов с судьбой и энергиями человека.
          </p>
        </div>
      </div>
    </div>
  );
}