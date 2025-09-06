import React from 'react';
import { BlogPost } from '@/data/blogPosts';

interface BlogPostHeroProps {
  post: BlogPost;
}

export default function BlogPostHero({ post }: BlogPostHeroProps) {
  return (
    <div className="relative z-0">
      {/* Тень от липкой шапки */}
      <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-b from-background/60 via-background/20 to-transparent pointer-events-none z-10"></div>
      
      <div className="w-full h-32 sm:h-40 md:h-48 relative overflow-hidden">
        <img 
          src={post.image} 
          alt={post.title} 
          className="w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-primary/20"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-background/30 to-transparent"></div>
      </div>
      
      {/* Закругленные углы снизу с тенью */}
      <div className="absolute bottom-0 left-0 right-0 h-8">
        <div className="w-full h-full bg-background rounded-t-3xl shadow-[0_-8px_24px_rgba(0,0,0,0.3)]"></div>
      </div>
    </div>
  );
}