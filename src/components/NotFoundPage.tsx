import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from '@/components/Header';
import Icon from '@/components/ui/icon';

const NotFoundPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [currentTitle, setCurrentTitle] = useState('Маг');

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header currentTitle={currentTitle} setCurrentTitle={setCurrentTitle} />
      
      <div className="flex items-center justify-center min-h-[calc(100vh-200px)] px-4">
        <div className="text-center max-w-lg mx-auto">
          <div className="mb-8">
            <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
              <Icon name="Search" size={48} className="text-muted-foreground" />
            </div>
          </div>
          
          <h1 className="text-6xl font-bold text-foreground mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-foreground mb-4">Страница не найдена</h2>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            Кажется, эта страница ушла в астрал. Давайте вернемся к реальности и найдем то, что вам нужно.
          </p>
          
          <div className="space-y-4">
            <button 
              onClick={() => navigate('/')}
              className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 px-8 rounded-lg transition-all duration-300 inline-flex items-center justify-center gap-2"
            >
              <Icon name="Home" size={20} />
              Вернуться на главную
            </button>
            
            <div className="pt-4">
              <p className="text-sm text-muted-foreground mb-4">Или перейдите к разделам:</p>
              <div className="flex flex-wrap gap-2 justify-center">
                <button 
                  onClick={() => navigate('/#ktoya')}
                  className="px-4 py-2 text-sm border border-border rounded-lg hover:bg-muted transition-colors"
                >
                  Обо мне
                </button>
                <button 
                  onClick={() => navigate('/#obryad')}
                  className="px-4 py-2 text-sm border border-border rounded-lg hover:bg-muted transition-colors"
                >
                  Обряды
                </button>
                <button 
                  onClick={() => navigate('/#otziv')}
                  className="px-4 py-2 text-sm border border-border rounded-lg hover:bg-muted transition-colors"
                >
                  Отзывы
                </button>
                <button 
                  onClick={() => navigate('/#contact')}
                  className="px-4 py-2 text-sm border border-border rounded-lg hover:bg-muted transition-colors"
                >
                  Контакты
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;