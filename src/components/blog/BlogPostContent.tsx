import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import Divider from '@/components/Divider';
import { BlogPost } from '@/data/blogPosts';

interface BlogPostContentProps {
  post: BlogPost;
  onConsultationClick: () => void;
}

export default function BlogPostContent({ post, onConsultationClick }: BlogPostContentProps) {
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
                className="bg-muted text-muted-foreground px-3 py-1 rounded-full text-xs"
              >
                {keyword}
              </span>
            ))}
          </div>
        </div>

        <Divider />

        {/* Article content */}
        <article className="text-foreground">
          <div 
            className="prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-foreground prose-li:text-foreground prose-strong:text-foreground"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>

        <Divider />

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <button 
            onClick={() => navigate('/blog')}
            className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
          >
            <Icon name="ArrowLeft" size={20} />
            Вернуться к блогу
          </button>
          
          <button 
            onClick={onConsultationClick}
            className="bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors"
          >
            Консультация
          </button>
        </div>
      </div>
    </main>
  );
}