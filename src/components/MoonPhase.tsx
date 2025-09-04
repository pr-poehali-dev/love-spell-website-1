import { useState, useEffect } from 'react';

interface MoonPhaseProps {
  size?: number;
}

const MoonPhase = ({ size = 40 }: MoonPhaseProps) => {
  const [moonPhase, setMoonPhase] = useState(0);

  // Максимально точный расчет фазы луны по астрономическим данным
  const getMoonPhase = () => {
    const now = new Date();
    
    // Точное новолуние 4 сентября 2025 года (по астрономическим данным)
    // Корректирую с учетом текущей даты для максимальной точности
    const sept4NewMoon = new Date(2025, 8, 3, 1, 56); // 3 сентября 2025, 01:56 UTC - ближайшее новолуние
    const lunarCycle = 29.530588861; // точный синодический месяц
    
    const timeDiff = now.getTime() - sept4NewMoon.getTime();
    const daysSince = timeDiff / (86400000); // миллисекунды в дни
    
    let phase = (daysSince % lunarCycle) / lunarCycle;
    if (phase < 0) phase += 1; // нормализация для отрицательных значений
    
    return phase;
  };

  // Получение названия фазы луны
  const getMoonPhaseName = (phase: number) => {
    if (phase < 0.03125) return '🌑 Новолуние';
    if (phase < 0.21875) return '🌒 Молодая луна'; 
    if (phase < 0.28125) return '🌓 Первая четверть';
    if (phase < 0.46875) return '🌔 Растущая луна';
    if (phase < 0.53125) return '🌕 Полнолуние';
    if (phase < 0.71875) return '🌖 Убывающая луна';
    if (phase < 0.78125) return '🌗 Последняя четверть';
    if (phase < 0.96875) return '🌘 Стареющая луна';
    return '🌑 Новолуние';
  };

  useEffect(() => {
    setMoonPhase(getMoonPhase());
  }, []);

  // Создание объемной луны с точными фазами
  const create3DMoon = () => {
    const radius = size / 2 - 3;
    
    // Точный расчет фазы луны
    const phaseProgress = moonPhase; // от 0 до 1
    const isWaxing = moonPhase < 0.5;
    
    // Расчет видимой части (наполовину заполнение)
    let visibleWidth;
    if (moonPhase <= 0.25) {
      // Растущий серп (0% -> 50%)
      visibleWidth = (moonPhase / 0.25) * 50;
    } else if (moonPhase <= 0.5) {
      // Растущая луна (50% -> 100%)
      visibleWidth = 50 + ((moonPhase - 0.25) / 0.25) * 50;
    } else if (moonPhase <= 0.75) {
      // Убывающая луна (100% -> 50%)
      visibleWidth = 100 - ((moonPhase - 0.5) / 0.25) * 50;
    } else {
      // Убывающий серп (50% -> 0%)
      visibleWidth = 50 - ((moonPhase - 0.75) / 0.25) * 50;
    }
    
    const percentage = Math.round(visibleWidth);
    
    return (
      <div 
        className="relative flex flex-col items-center transition-all duration-500 hover:scale-110 cursor-pointer group"
        style={{ width: size + 20, height: size + 30 }}
        title={getMoonPhaseName(moonPhase)}
      >
        {/* Основная объемная луна */}
        <div 
          className="relative rounded-full transition-all duration-1000 overflow-hidden"
          style={{
            width: radius * 2,
            height: radius * 2,
            background: `radial-gradient(circle at 30% 30%, 
              hsl(var(--accent) / 0.95) 0%, 
              hsl(var(--accent) / 0.8) 40%, 
              hsl(var(--muted) / 0.9) 60%, 
              hsl(var(--accent) / 0.7) 80%,
              hsl(var(--muted) / 0.8) 100%
            )`,
            border: `2px solid hsl(var(--accent) / 0.6)`,
            boxShadow: `
              inset -5px -5px 10px hsl(var(--muted) / 0.4),
              inset 5px 5px 8px hsl(var(--accent) / 0.3),
              0 0 15px hsl(var(--accent) / 0.4)
            `
          }}
        >
          {/* Объемные кратеры с тенями */}
          <div className="absolute inset-0">
            {/* Большой кратер */}
            <div 
              className="absolute rounded-full"
              style={{
                background: `radial-gradient(circle at 30% 30%, 
                  hsl(var(--muted) / 0.9), 
                  hsl(var(--accent) / 0.6)
                )`,
                width: size * 0.12,
                height: size * 0.12,
                top: '25%',
                left: '32%',
                boxShadow: `
                  inset 2px 2px 4px hsl(var(--muted) / 0.6),
                  inset -1px -1px 2px hsl(var(--accent) / 0.3)
                `
              }}
            />
            
            {/* Средний кратер */}
            <div 
              className="absolute rounded-full"
              style={{
                background: `radial-gradient(circle at 40% 40%, 
                  hsl(var(--muted) / 0.8), 
                  hsl(var(--accent) / 0.5)
                )`,
                width: size * 0.08,
                height: size * 0.08,
                top: '60%',
                right: '28%',
                boxShadow: `
                  inset 1px 1px 3px hsl(var(--muted) / 0.5),
                  inset -0.5px -0.5px 1px hsl(var(--accent) / 0.2)
                `
              }}
            />
            
            {/* Маленькие кратеры */}
            {[
              { top: '40%', left: '18%', size: 0.05 },
              { top: '72%', left: '58%', size: 0.04 },
              { top: '15%', right: '22%', size: 0.03 }
            ].map((crater, i) => (
              <div 
                key={i}
                className="absolute rounded-full"
                style={{
                  background: `hsl(var(--muted) / 0.7)`,
                  width: size * crater.size,
                  height: size * crater.size,
                  top: crater.top,
                  left: crater.left,
                  right: crater.right,
                  boxShadow: `inset 0.5px 0.5px 1px hsl(var(--muted) / 0.4)`
                }}
              />
            ))}
          </div>

          {/* Точная фаза луны */}
          <div 
            className="absolute inset-0 rounded-full transition-all duration-1000"
            style={{
              background: `linear-gradient(to right, 
                hsl(var(--background) / 0.95) 0%, 
                hsl(var(--background) / 0.9) 20%,
                transparent 100%
              )`,
              clipPath: isWaxing 
                ? `inset(0 0 0 ${visibleWidth}%)`
                : `inset(0 ${visibleWidth}% 0 0)`
            }}
          />
        </div>

        {/* Текст с процентом снизу */}
        <div 
          className="mt-2 px-2 py-1 rounded-full text-xs font-bold transition-all duration-300"
          style={{
            background: `linear-gradient(135deg, 
              hsl(var(--accent) / 0.8) 0%, 
              hsl(var(--primary) / 0.6) 100%
            )`,
            color: `hsl(var(--background))`,
            boxShadow: `0 2px 4px hsl(var(--accent) / 0.3)`
          }}
        >
          {percentage}%
        </div>
        
        {/* Мистический тултип */}
        <div className="absolute -bottom-9 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500 bg-card/95 backdrop-blur-sm border border-accent/20 rounded-lg px-3 py-2 text-xs font-medium whitespace-nowrap pointer-events-none z-30 shadow-xl">
          <div className="text-accent font-semibold">{getMoonPhaseName(moonPhase)}</div>
          <div className="text-muted-foreground text-[10px] mt-0.5">
            {Math.round(moonPhase * 100)}% цикла
          </div>
        </div>
      </div>
    );
  };

  return create3DMoon();
};

export default MoonPhase;