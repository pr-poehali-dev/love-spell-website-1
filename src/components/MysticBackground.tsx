import { useEffect, useState } from 'react';

const MysticBackground = () => {
  const [stars, setStars] = useState<Array<{ id: number; x: number; y: number; size: number; delay: number }>>([]);

  useEffect(() => {
    // Создаем случайные звезды для фона
    const newStars = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 0.5,
      delay: Math.random() * 4
    }));
    setStars(newStars);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 opacity-30">
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute animate-pulse"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            animationDelay: `${star.delay}s`,
            animationDuration: '3s'
          }}
        >
          <div
            className="rounded-full bg-accent/40"
            style={{
              width: `${star.size}px`,
              height: `${star.size}px`,
              boxShadow: `0 0 ${star.size * 2}px hsl(var(--accent) / 0.3)`
            }}
          />
        </div>
      ))}
      
      {/* Мягкий градиент по краям */}
      <div 
        className="absolute inset-0" 
        style={{
          background: `radial-gradient(ellipse at center, transparent 40%, hsl(var(--background) / 0.1) 100%)`
        }}
      />
    </div>
  );
};

export default MysticBackground;