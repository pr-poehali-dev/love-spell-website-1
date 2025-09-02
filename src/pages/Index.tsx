import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

export default function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header Profile Section */}
      <div className="bg-background border-b border-border">
        <div className="max-w-sm mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-primary/20">
              <img 
                src="/img/ad82ffc8-0c3b-4ed9-9e55-893635b263d1.jpg" 
                alt="Раиса Ильинская"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-foreground">Раиса Ильинская</h1>
              <p className="text-sm font-medium text-accent">Ма</p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <div className="bg-background border-b border-border">
        <div className="max-w-sm mx-auto px-4 py-4">
          <div className="grid grid-cols-4 gap-1">
            <button className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-muted/50 transition-colors">
              <Icon name="User" size={20} className="text-accent" />
              <span className="text-xs font-medium text-foreground">КТО Я</span>
            </button>
            <button className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-muted/50 transition-colors">
              <Icon name="Leaf" size={20} className="text-foreground" />
              <span className="text-xs font-medium text-foreground">ОБРЯДЫ</span>
            </button>
            <button className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-muted/50 transition-colors">
              <Icon name="MessageCircle" size={20} className="text-foreground" />
              <span className="text-xs font-medium text-foreground">ОТЗЫВЫ</span>
            </button>
            <button className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-muted/50 transition-colors">
              <Icon name="Mail" size={20} className="text-foreground" />
              <span className="text-xs font-medium text-foreground">СВЯЗЬ</span>
            </button>
          </div>
        </div>
      </div>

      {/* Hero Section with Sunset Background */}
      <div className="relative min-h-screen">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/img/360087e3-3b50-4f2f-932f-be1fbf78267b.jpg')`
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent"></div>
        </div>
        
        <div className="relative z-10 min-h-screen flex flex-col justify-end pb-20">
          <div className="max-w-sm mx-auto px-4 text-center">
            {/* Large Profile Image */}
            <div className="mb-8">
              <div className="w-32 h-32 mx-auto rounded-full overflow-hidden ring-4 ring-accent/30 shadow-2xl">
                <img 
                  src="/img/ad82ffc8-0c3b-4ed9-9e55-893635b263d1.jpg" 
                  alt="Раиса Ильинская"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            
            {/* Name and Title */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-white mb-2 drop-shadow-lg">
                Раиса Ильинская
              </h2>
              <p className="text-accent font-semibold text-lg drop-shadow-lg">Ма</p>
            </div>
            
            {/* Call to Action */}
            <Button 
              size="lg" 
              className="w-full bg-background/10 backdrop-blur-sm text-white border border-white/20 hover:bg-white/20 transition-all duration-300 font-semibold text-base py-6"
            >
              НАПИШИТЕ МНЕ
              <Icon name="ChevronRight" size={20} className="ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}