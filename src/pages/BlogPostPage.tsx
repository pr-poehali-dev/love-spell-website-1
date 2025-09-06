import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import SEO from '@/components/SEO';
import ContactModal from '@/components/ContactModal';
import BlogPostHero from '@/components/blog/BlogPostHero';
import BlogPostContent from '@/components/blog/BlogPostContent';
import { blogPosts } from '@/data/blogPosts';

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTitle, setCurrentTitle] = useState('Блог');
  
  const post = slug ? blogPosts[slug] : null;

  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <Header currentTitle={currentTitle} setCurrentTitle={setCurrentTitle} />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">Статья не найдена</h1>
            <p className="text-muted-foreground mb-6">Извините, но запрошенная статья не существует.</p>
            <button 
              onClick={() => navigate('/blog')}
              className="bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors"
            >
              Вернуться к блогу
            </button>
          </div>
        </div>
      </div>
    );
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt,
    "image": `https://poehali.dev${post.image}`,
    "author": {
      "@type": "Person",
      "name": post.author
    },
    "publisher": {
      "@type": "Organization",
      "name": "Раиса Ильинская - Потомственная ворожея"
    },
    "datePublished": post.publishedDate,
    "dateModified": post.publishedDate,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://poehali.dev/blog/${post.slug}`
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title={`${post.title} | Раиса Ильинская - Потомственная ворожея`}
        description={post.excerpt}
        keywords={post.keywords.join(', ')}
        url={`/blog/${post.slug}`}
        type="article"
        structuredData={structuredData}
      />
      <Header currentTitle={currentTitle} setCurrentTitle={setCurrentTitle} />

      <BlogPostHero post={post} />
      <BlogPostContent post={post} onOpenModal={() => setIsModalOpen(true)} />

      <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}