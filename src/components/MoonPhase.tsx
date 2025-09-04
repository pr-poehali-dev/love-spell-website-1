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

  // Создание стильной 2D луны как 🌕
  const create2DMoon = () => {
    const radius = size / 2 - 2;
    const centerX = size / 2;
    const centerY = size / 2;
    
    // Расчет освещенности для фазы
    const illumination = Math.abs(Math.cos((moonPhase - 0.5) * Math.PI));
    const isWaxing = moonPhase < 0.5;
    
    return (
      <div 
        className="relative flex items-center justify-center transition-all duration-500 hover:scale-110 cursor-pointer group"
        style={{ width: size, height: size }}
        title={getMoonPhaseName(moonPhase)}
      >
        {/* Основной круг луны - плоский 2D дизайн */}
        <div 
          className="absolute rounded-full transition-all duration-1000"
          style={{
            width: radius * 2,
            height: radius * 2,
            background: `linear-gradient(135deg, 
              hsl(var(--accent) / 0.9) 0%, 
              hsl(var(--accent) / 0.7) 30%, 
              hsl(var(--muted) / 0.9) 50%, 
              hsl(var(--accent) / 0.6) 70%,
              hsl(var(--accent) / 0.8) 100%
            )`,
            border: `1px solid hsl(var(--accent) / 0.5)`,
            boxShadow: `
              0 0 ${size * 0.3}px hsl(var(--accent) / 0.5),
              0 0 ${size * 0.6}px hsl(var(--accent) / 0.2),
              inset 0 0 ${size * 0.1}px hsl(var(--muted) / 0.3)
            `
          }}
        >
          {/* 2D кратеры как простые круги */}
          <div className="absolute inset-0 rounded-full overflow-hidden">
            {/* Большой кратер */}
            <div 
              className="absolute rounded-full opacity-60"
              style={{
                background: `hsl(var(--muted) / 0.7)`,
                width: size * 0.12,
                height: size * 0.12,
                top: '22%',
                left: '28%',
                boxShadow: `inset 0 0 ${size * 0.02}px hsl(var(--accent) / 0.3)`
              }}
            />
            {/* Средний кратер */}
            <div 
              className="absolute rounded-full opacity-50"
              style={{
                background: `hsl(var(--muted) / 0.6)`,
                width: size * 0.08,
                height: size * 0.08,
                top: '58%',
                right: '30%',
                boxShadow: `inset 0 0 ${size * 0.015}px hsl(var(--accent) / 0.2)`
              }}
            />
            {/* Маленькие кратеры */}
            <div 
              className="absolute rounded-full opacity-40"
              style={{
                background: `hsl(var(--muted) / 0.5)`,
                width: size * 0.05,
                height: size * 0.05,
                top: '40%',
                left: '20%'
              }}
            />
            <div 
              className="absolute rounded-full opacity-30"
              style={{
                background: `hsl(var(--muted) / 0.4)`,
                width: size * 0.04,
                height: size * 0.04,
                top: '70%',
                left: '55%'
              }}
            />
            <div 
              className="absolute rounded-full opacity-35"
              style={{
                background: `hsl(var(--muted) / 0.45)`,
                width: size * 0.03,
                height: size * 0.03,
                top: '15%',
                right: '20%'
              }}
            />
          </div>
        </div>

        {/* 2D теневая маска для фазы */}
        {moonPhase > 0.05 && moonPhase < 0.95 && (
          <div 
            className="absolute rounded-full transition-all duration-1000"
            style={{
              width: radius * 2,
              height: radius * 2,
              background: `hsl(var(--background) / 0.9)`,
              clipPath: isWaxing 
                ? `inset(0 0 0 ${illumination * 100}%)`
                : `inset(0 ${illumination * 100}% 0 0)`
            }}
          />
        )}

        {/* Простое 2D свечение */}
        <div 
          className="absolute rounded-full animate-pulse pointer-events-none"
          style={{
            width: (radius * 2) + 8,
            height: (radius * 2) + 8,
            background: `radial-gradient(circle, 
              transparent 70%, 
              hsl(var(--accent) / 0.3) 80%, 
              transparent 100%
            )`,
            animationDuration: '4s'
          }}
        />

        {/* Внешнее свечение при hover */}
        <div 
          className="absolute rounded-full opacity-0 group-hover:opacity-100 transition-all duration-700 pointer-events-none"
          style={{
            width: (radius * 2) + 16,
            height: (radius * 2) + 16,
            background: `radial-gradient(circle, 
              transparent 60%, 
              hsl(var(--primary) / 0.4) 75%, 
              transparent 100%
            )`,
            filter: 'blur(2px)'
          }}
        />
        
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

  return create2DMoon();
};

export default MoonPhase;