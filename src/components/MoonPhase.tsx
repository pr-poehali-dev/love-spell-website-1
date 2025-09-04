import { useState, useEffect } from 'react';

interface MoonPhaseProps {
  size?: number;
}

const MoonPhase = ({ size = 40 }: MoonPhaseProps) => {
  const [moonPhase, setMoonPhase] = useState(0);

  // Простой и понятный расчет фазы луны
  const getMoonPhase = () => {
    const now = new Date();
    
    // Базовая точка: известное новолуние 3 сентября 2025, 01:56 UTC
    const knownNewMoon = new Date('2025-09-03T01:56:00.000Z');
    
    // Лунный цикл = 29.53 дня (среднее значение)
    const lunarCycleDays = 29.53;
    const millisecondsPerDay = 24 * 60 * 60 * 1000;
    
    // Сколько дней прошло с известного новолуния
    const daysSinceNewMoon = (now.getTime() - knownNewMoon.getTime()) / millisecondsPerDay;
    
    // Нормализуем в диапазон 0-1 (где 0 = новолуние, 0.5 = полнолуние)
    let phase = (daysSinceNewMoon % lunarCycleDays) / lunarCycleDays;
    
    // Убираем отрицательные значения
    if (phase < 0) phase += 1;
    
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

  // Создание детализированной луны
  const createDetailedMoon = () => {
    const radius = size / 2 - 2;
    
    // Простой и понятный расчет фаз
    const isWaxing = moonPhase < 0.5;
    
    // Заполненность всегда максимум 50%
    let illumination;
    if (moonPhase <= 0.5) {
      // Растущая: от 0% до 50%
      illumination = moonPhase * 100; // 0 -> 50%
    } else {
      // Убывающая: от 50% до 0%
      illumination = (1 - moonPhase) * 100; // 50% -> 0%
    }
    
    // Ограничиваем максимум 50%
    illumination = Math.min(illumination, 50);
    const percentage = Math.round(illumination);
    
    return (
      <div 
        className="relative flex flex-col items-center transition-all duration-500 hover:scale-110 cursor-pointer group"
        style={{ width: size + 30, height: size + 40 }}
        title={getMoonPhaseName(moonPhase)}
      >
        {/* Основная луна без обводки и внутренних теней */}
        <div 
          className="relative rounded-full transition-all duration-1000 overflow-hidden"
          style={{
            width: radius * 2,
            height: radius * 2,
            background: `radial-gradient(circle at 35% 25%, 
              hsl(var(--accent) / 0.9) 0%, 
              hsl(var(--accent) / 0.85) 25%, 
              hsl(var(--accent) / 0.8) 50%, 
              hsl(var(--accent) / 0.75) 75%,
              hsl(var(--accent) / 0.7) 100%
            )`
          }}
        >
          {/* Детализированные кратеры и лунный ландшафт */}
          <div className="absolute inset-0">
            {/* Mare Tranquillitatis - большое темное море */}
            <div 
              className="absolute rounded-full"
              style={{
                background: `radial-gradient(ellipse at 40% 30%, 
                  hsl(var(--muted) / 0.6) 0%, 
                  hsl(var(--muted) / 0.8) 50%,
                  hsl(var(--accent) / 0.7) 100%
                )`,
                width: size * 0.18,
                height: size * 0.15,
                top: '22%',
                left: '28%',
                transform: 'rotate(-15deg)'
              }}
            />
            
            {/* Кратер Тихо - крупный кратер */}
            <div 
              className="absolute rounded-full"
              style={{
                background: `radial-gradient(circle at 30% 30%, 
                  hsl(var(--muted) / 0.9) 0%, 
                  hsl(var(--muted) / 0.7) 40%,
                  hsl(var(--accent) / 0.6) 100%
                )`,
                width: size * 0.09,
                height: size * 0.09,
                top: '58%',
                right: '25%'
              }}
            />
            
            {/* Кратер Коперник */}
            <div 
              className="absolute rounded-full"
              style={{
                background: `radial-gradient(circle at 25% 25%, 
                  hsl(var(--muted) / 0.85) 0%, 
                  hsl(var(--accent) / 0.65) 100%
                )`,
                width: size * 0.06,
                height: size * 0.06,
                top: '35%',
                left: '15%'
              }}
            />
            
            {/* Мелкие кратеры */}
            {[
              { top: '45%', left: '65%', size: 0.04 },
              { top: '75%', left: '45%', size: 0.035 },
              { top: '12%', right: '18%', size: 0.025 },
              { top: '68%', left: '25%', size: 0.03 },
              { top: '25%', right: '35%', size: 0.02 }
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
                  right: crater.right
                }}
              />
            ))}
            
            {/* Лунные горы и хребты */}
            <div 
              className="absolute"
              style={{
                background: `linear-gradient(45deg, 
                  transparent 40%, 
                  hsl(var(--accent) / 0.3) 50%,
                  transparent 60%
                )`,
                width: size * 0.3,
                height: size * 0.05,
                top: '40%',
                right: '10%',
                transform: 'rotate(25deg)',
                borderRadius: '50px'
              }}
            />
            
            {/* Мелкие детали поверхности */}
            {Array.from({ length: 8 }).map((_, i) => (
              <div 
                key={`detail-${i}`}
                className="absolute rounded-full"
                style={{
                  background: `hsl(var(--muted) / ${0.3 + Math.random() * 0.2})`,
                  width: size * (0.008 + Math.random() * 0.01),
                  height: size * (0.008 + Math.random() * 0.01),
                  top: `${15 + Math.random() * 70}%`,
                  left: `${15 + Math.random() * 70}%`
                }}
              />
            ))}
          </div>

          {/* Фаза луны с максимум 50% заполнением */}
          <div 
            className="absolute inset-0 rounded-full transition-all duration-1000"
            style={{
              background: `hsl(var(--background) / 0.9)`,
              clipPath: isWaxing 
                ? `inset(0 0 0 ${50 + illumination}%)`
                : `inset(0 ${50 + illumination}% 0 0)`
            }}
          />
        </div>

        {/* Процент с улучшенным дизайном */}
        <div 
          className="mt-3 px-3 py-1 rounded-full text-sm font-bold transition-all duration-300 group-hover:scale-105"
          style={{
            background: `linear-gradient(135deg, 
              hsl(var(--accent) / 0.9) 0%, 
              hsl(var(--primary) / 0.7) 100%
            )`,
            color: `hsl(var(--background))`,
            boxShadow: `0 3px 6px hsl(var(--accent) / 0.3)`,
            border: `1px solid hsl(var(--accent) / 0.4)`
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

  return createDetailedMoon();
};

export default MoonPhase;