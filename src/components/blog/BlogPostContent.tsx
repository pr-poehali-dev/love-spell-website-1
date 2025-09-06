import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import { BlogPost } from '@/data/blogPosts';

interface BlogPostContentProps {
  post: BlogPost;
  onOpenModal: () => void;
}

export default function BlogPostContent({ post, onOpenModal }: BlogPostContentProps) {
  const navigate = useNavigate();

  return (
    <main className="bg-background relative z-10">
      <div className="max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-12 sm:space-y-16">
        {/* Заголовок статьи */}
        <div>
          <h2 className="text-xl font-bold text-foreground mb-8 relative pt-0">
            <span className="relative inline-block">
              <span className="text-2xl font-bold relative z-10 text-primary">{post.title.charAt(0)}</span>
              <div className="absolute w-9 h-9 rounded-full opacity-40" style={{
                background: 'linear-gradient(135deg, hsl(var(--primary) / 0.6) 0%, hsl(var(--primary) / 0.1) 100%)',
                top: '-1px',
                left: '-10px'
              }}></div>
            </span>{post.title.slice(1)}
          </h2>
          <p className="text-muted-foreground leading-relaxed text-base mb-8">
            {post.excerpt}
          </p>
        </div>

        {/* Article meta */}
        <div className="mb-8">
          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
            <div className="flex items-center gap-1">
              <Icon name="Calendar" size={16} />
              {new Date(post.publishedDate).toLocaleDateString('ru-RU', { 
                day: 'numeric', 
                month: 'long', 
                year: 'numeric' 
              })}
            </div>
            <div className="flex items-center gap-1">
              <Icon name="Clock" size={16} />
              {post.readTime} мин чтения
            </div>
            <div className="flex items-center gap-1">
              <Icon name="User" size={16} />
              {post.author}
            </div>
          </div>
          
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {post.keywords.map((keyword, index) => (
              <span 
                key={index}
                className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-medium"
              >
                {keyword}
              </span>
            ))}
          </div>
        </div>

        {/* Article content */}
        <article className="text-foreground">
          <div 
            className="prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-li:text-muted-foreground prose-strong:text-foreground prose-h2:text-xl prose-h2:font-bold prose-h2:mb-6 prose-h2:mt-8 prose-h3:text-lg prose-h3:font-semibold prose-h3:mb-4 prose-h3:mt-6 prose-p:leading-relaxed prose-p:mb-4"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>

        {/* Призыв к действию */}
        <div className="mt-12 sm:mt-16 mb-8 sm:mb-12 px-2">
          <div className="relative bg-card/50 backdrop-blur-sm p-6 sm:p-8 rounded-xl sm:rounded-2xl border border-border shadow-lg text-center overflow-hidden">
            {/* Декоративные элементы */}
            <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-2xl"></div>
            <div className="absolute bottom-0 right-0 w-16 h-16 bg-gradient-to-tl from-accent/20 to-transparent rounded-full blur-xl"></div>
            
            <div className="relative max-w-2xl mx-auto">
              {/* Профиль */}
              <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 mb-6">
                <div className="relative">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-3 border-white shadow-lg">
                    <img 
                      src="/img/ad82ffc8-0c3b-4ed9-9e55-893635b263d1.jpg" 
                      alt="Раиса Ильинская"
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  {/* Индикатор онлайн */}
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-white border-2 border-card rounded-full flex items-center justify-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  </div>
                </div>
                
                <div className="text-center sm:text-left flex-1">
                  <h3 className="text-lg sm:text-xl font-bold text-foreground mb-3">Раиса Ильинская</h3>
                  <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-1">
                    Нужна консультация по этой теме?
                  </h2>
                  <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                    Получите персональную помощь от потомственной ворожеи
                  </p>
                </div>
              </div>
              
              {/* Кнопка действия */}
              <div className="mb-6">
                <button
                  onClick={onOpenModal}
                  className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-4 px-8 rounded-xl transition-all duration-300 hover:scale-[1.02] shadow-lg hover:shadow-xl inline-flex items-center justify-center gap-3 text-lg"
                >
                  <Icon name="MessageCircle" size={22} />
                  Получить консультацию
                </button>
              </div>
                
              {/* Преимущества */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 text-sm">
                <div className="flex items-center justify-center gap-2 p-3 rounded-lg bg-background/50">
                  <Icon name="Shield" size={16} className="text-success flex-shrink-0" />
                  <span className="text-muted-foreground">Конфиденциально</span>
                </div>
                <div className="flex items-center justify-center gap-2 p-3 rounded-lg bg-background/50">
                  <Icon name="Clock" size={16} className="text-accent flex-shrink-0" />
                  <span className="text-muted-foreground">Быстрый результат</span>
                </div>
                <div className="flex items-center justify-center gap-2 p-3 rounded-lg bg-background/50">
                  <Icon name="Heart" size={16} className="text-primary flex-shrink-0" />
                  <span className="text-muted-foreground">Без вреда</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <button 
            onClick={() => navigate('/blog')}
            className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
          >
            <Icon name="ArrowLeft" size={20} />
            Вернуться к блогу
          </button>
        </div>
      </div>
    </main>
  );
}