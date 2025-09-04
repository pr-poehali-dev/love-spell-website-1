import { useState, useEffect } from 'react';

interface MoonPhaseProps {
  size?: number;
}

const MoonPhase = ({ size = 40 }: MoonPhaseProps) => {
  const [moonPhase, setMoonPhase] = useState(0);

  // Функция для расчета фазы луны
  const getMoonPhase = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const day = now.getDate();

    // Алгоритм расчета фазы луны (упрощенный)
    const n = (year - 2000) * 12.3685 + (month - 1) * 1.0 + (day / 30.4375);
    const moonAge = (n - Math.floor(n)) * 29.5306;
    const phase = moonAge / 29.5306;

    return phase;
  };

  // Получение названия фазы луны
  const getMoonPhaseName = (phase: number) => {
    if (phase < 0.0625) return 'Новолуние';
    if (phase < 0.1875) return 'Молодая луна';
    if (phase < 0.3125) return 'Первая четверть';
    if (phase < 0.4375) return 'Растущая луна';
    if (phase < 0.5625) return 'Полнолуние';
    if (phase < 0.6875) return 'Убывающая луна';
    if (phase < 0.8125) return 'Последняя четверть';
    if (phase < 0.9375) return 'Старая луна';
    return 'Новолуние';
  };

  useEffect(() => {
    setMoonPhase(getMoonPhase());
  }, []);

  // Создание SVG для визуализации фазы луны
  const createMoonSVG = () => {
    const radius = size / 2 - 2;
    const centerX = size / 2;
    const centerY = size / 2;

    // Вычисление освещенной части
    const illumination = Math.cos((moonPhase - 0.5) * 2 * Math.PI);
    
    return (
      <div 
        className="relative flex items-center justify-center transition-transform duration-1000 hover:scale-110"
        style={{ width: size, height: size }}
        title={getMoonPhaseName(moonPhase)}
      >
        <svg
          width={size}
          height={size}
          className="animate-pulse"
          style={{ filter: 'drop-shadow(0 0 8px rgba(147, 51, 234, 0.3))' }}
        >
          {/* Основной круг луны */}
          <circle
            cx={centerX}
            cy={centerY}
            r={radius}
            fill="rgba(229, 231, 235, 0.8)"
            stroke="rgba(147, 51, 234, 0.2)"
            strokeWidth="1"
          />
          
          {/* Тень для создания фазы */}
          <defs>
            <clipPath id="moonClip">
              <circle cx={centerX} cy={centerY} r={radius} />
            </clipPath>
          </defs>
          
          {illumination < 0 && (
            <ellipse
              cx={centerX}
              cy={centerY}
              rx={Math.abs(illumination) * radius}
              ry={radius}
              fill="rgba(71, 85, 105, 0.7)"
              clipPath="url(#moonClip)"
            />
          )}
          
          {illumination > 0 && (
            <ellipse
              cx={centerX}
              cy={centerY}
              rx={illumination * radius}
              ry={radius}
              fill="rgba(255, 255, 255, 0.9)"
              clipPath="url(#moonClip)"
            />
          )}
          
          {/* Звездочки вокруг луны */}
          {[...Array(5)].map((_, i) => {
            const angle = (i * 72) * Math.PI / 180;
            const distance = radius + 15;
            const x = centerX + Math.cos(angle) * distance;
            const y = centerY + Math.sin(angle) * distance;
            
            return (
              <g key={i}>
                <circle
                  cx={x}
                  cy={y}
                  r="1"
                  fill="rgba(147, 51, 234, 0.6)"
                  className="animate-pulse"
                  style={{
                    animationDelay: `${i * 0.2}s`,
                    animationDuration: '2s'
                  }}
                />
              </g>
            );
          })}
        </svg>
        
        {/* Тултип с информацией */}
        <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 opacity-0 hover:opacity-100 transition-opacity bg-card border border-border rounded px-2 py-1 text-xs whitespace-nowrap pointer-events-none z-10">
          {getMoonPhaseName(moonPhase)}
        </div>
      </div>
    );
  };

  return createMoonSVG();
};

export default MoonPhase;