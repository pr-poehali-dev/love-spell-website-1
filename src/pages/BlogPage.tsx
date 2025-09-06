import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import Header from '@/components/Header';
import SEO from '@/components/SEO';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  publishedDate: string;
  image: string;
  slug: string;
  keywords: string[];
  readTime: number;
}

const blogCategories = [
  { id: 'all', name: 'Все статьи', icon: 'BookOpen' },
  { id: 'love-magic', name: 'Любовная магия', icon: 'Heart' },
  { id: 'protection', name: 'Защита', icon: 'Shield' },
  { id: 'divination', name: 'Гадания', icon: 'Crystal' },
  { id: 'rituals', name: 'Ритуалы', icon: 'Flame' },
  { id: 'herbs', name: 'Травы и обереги', icon: 'Leaf' },
];

const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Лунные циклы и их влияние на магические практики',
    excerpt: 'Как правильно использовать энергию Луны для усиления ритуалов и заклинаний. Подробное руководство по работе с лунными фазами.',
    content: '',
    category: 'rituals',
    author: 'Раиса Ильинская',
    publishedDate: '2024-03-15',
    image: '/img/736dc175-0720-4fa3-83c7-2ede4b54400d.jpg',
    slug: 'lunnye-cikly-i-magiya',
    keywords: ['лунная магия', 'лунные циклы', 'ритуалы', 'полнолуние', 'новолуние'],
    readTime: 8
  },
  {
    id: '2',
    title: 'Защитные амулеты: создание и активация',
    excerpt: 'Пошаговое руководство по изготовлению защитных амулетов своими руками. Секреты правильной активации и зарядки оберегов.',
    content: '',
    category: 'protection',
    author: 'Раиса Ильинская',
    publishedDate: '2024-03-12',
    image: '/img/8867e7ca-685e-446f-975e-2b355d32f253.jpg',
    slug: 'zashhitnye-amulety',
    keywords: ['защитные амулеты', 'обереги', 'защитная магия', 'талисманы'],
    readTime: 6
  },
  {
    id: '3',
    title: 'Гадание на картах Таро: основы для начинающих',
    excerpt: 'Введение в мир карт Таро. Основные значения арканов, методы раскладов и интерпретация символов для начинающих.',
    content: '',
    category: 'divination',
    author: 'Раиса Ильинская',
    publishedDate: '2024-03-08',
    image: '/img/d8cd2c3b-01ba-410d-a448-5d44f78c7ad9.jpg',
    slug: 'gadanie-na-kartah-taro',
    keywords: ['гадание на таро', 'карты таро', 'гадание', 'предсказание', 'арканы'],
    readTime: 12
  },
  {
    id: '4',
    title: 'Магические свойства трав: полное руководство',
    excerpt: 'Исчерпывающий справочник по магическим травам и их применению. Рецепты настоек, окуриваний и защитных смесей.',
    content: '',
    category: 'herbs',
    author: 'Раиса Ильинская',
    publishedDate: '2024-03-05',
    image: '/img/8867e7ca-685e-446f-975e-2b355d32f253.jpg',
    slug: 'magicheskie-svoystva-trav',
    keywords: ['магические травы', 'травничество', 'растения в магии', 'настойки', 'обереги'],
    readTime: 15
  },
  {
    id: '5',
    title: 'Ритуал привлечения любви: древние секреты',
    excerpt: 'Мощный ритуал для привлечения истинной любви, основанный на древних славянских традициях. Безопасные методы работы с энергией сердца.',
    content: '',
    category: 'love-magic',
    author: 'Раиса Ильинская',
    publishedDate: '2024-03-01',
    image: '/img/736dc175-0720-4fa3-83c7-2ede4b54400d.jpg',
    slug: 'ritual-privlecheniya-lyubvi',
    keywords: ['привлечение любви', 'любовная магия', 'ритуалы любви', 'магия сердца'],
    readTime: 10
  },
  {
    id: '6',
    title: 'Энергетическая защита дома и семьи',
    excerpt: 'Комплексные методы защиты жилища от негативных воздействий. Создание защитного барьера и очищение пространства.',
    content: '',
    category: 'protection',
    author: 'Раиса Ильинская',
    publishedDate: '2024-02-28',
    image: '/img/8867e7ca-685e-446f-975e-2b355d32f253.jpg',
    slug: 'energeticheskaya-zashhita-doma',
    keywords: ['защита дома', 'энергетическая защита', 'очищение пространства', 'защита семьи'],
    readTime: 9
  }
];

export default function BlogPage() {
  const [currentTitle, setCurrentTitle] = useState('Блог');
  const [activeCategory, setActiveCategory] = useState('all');
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>(blogPosts);
  const navigate = useNavigate();

  useEffect(() => {
    if (activeCategory === 'all') {
      setFilteredPosts(blogPosts);
    } else {
      setFilteredPosts(blogPosts.filter(post => post.category === activeCategory));
    }
  }, [activeCategory]);

  const handlePostClick = (post: BlogPost) => {
    navigate(`/blog/${post.slug}`);
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "Блог Раисы Ильинской",
    "description": "Статьи о магии, ритуалах, гаданиях и эзотерике от потомственной ворожеи",
    "url": "https://poehali.dev/blog",
    "author": {
      "@type": "Person",
      "name": "Раиса Ильинская"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Раиса Ильинская - Потомственная ворожея"
    },
    "blogPost": filteredPosts.map(post => ({
      "@type": "BlogPosting",
      "headline": post.title,
      "description": post.excerpt,
      "url": `https://poehali.dev/blog/${post.slug}`,
      "datePublished": post.publishedDate,
      "author": {
        "@type": "Person",
        "name": post.author
      }
    }))
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Блог о магии и эзотерике | Раиса Ильинская - Потомственная ворожея"
        description="Статьи о любовной магии, защитных ритуалах, гаданиях и травничестве от потомственной ворожеи Раисы Ильинской. Практические советы и древние знания."
        keywords="блог о магии, эзотерика, любовная магия, гадания, ритуалы, защитная магия, травы, обереги"
        url="/blog"
        type="blog"
        structuredData={structuredData}
      />
      
      <Header currentTitle={currentTitle} setCurrentTitle={setCurrentTitle} />

      {/* Hero Section */}
      <div className="relative z-0 pt-16 md:pt-20 lg:pt-24">
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-b from-background/60 via-background/20 to-transparent pointer-events-none z-10"></div>
        
        <div className="w-full h-40 md:h-56 lg:h-64 relative overflow-hidden">
          <img 
            src="/img/d8cd2c3b-01ba-410d-a448-5d44f78c7ad9.jpg" 
            alt="Блог о магии и эзотерике"
            className="w-full h-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/60"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white px-4">
              <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-2 md:mb-4">
                Блог о магии и эзотерике
              </h1>
              <p className="text-sm md:text-lg lg:text-xl opacity-90 max-w-2xl">
                Древние знания и современные практики от потомственной ворожеи
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="bg-background/95 backdrop-blur-sm border-b sticky top-16 md:top-20 lg:top-24 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex overflow-x-auto scrollbar-hide gap-2 pb-2">
            {blogCategories.map(category => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-all duration-200 flex-shrink-0 ${
                  activeCategory === category.id
                    ? 'bg-primary text-primary-foreground shadow-lg scale-105'
                    : 'bg-muted hover:bg-muted-foreground/10 text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon name={category.icon as any} size={16} />
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Blog Posts Grid */}
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filteredPosts.map(post => (
            <article
              key={post.id}
              onClick={() => handlePostClick(post)}
              className="bg-card rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer group border"
            >
              <div className="relative overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute top-4 right-4">
                  <span className="bg-primary/90 backdrop-blur-sm text-primary-foreground px-3 py-1 rounded-full text-xs font-medium">
                    {blogCategories.find(cat => cat.id === post.category)?.name}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                  <div className="flex items-center gap-1">
                    <Icon name="Calendar" size={12} />
                    {new Date(post.publishedDate).toLocaleDateString('ru-RU')}
                  </div>
                  <div className="flex items-center gap-1">
                    <Icon name="Clock" size={12} />
                    {post.readTime} мин
                  </div>
                </div>
                
                <h2 className="text-lg font-bold text-foreground mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                  {post.title}
                </h2>
                
                <p className="text-muted-foreground text-sm line-clamp-3 mb-4">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Icon name="User" size={12} />
                    {post.author}
                  </div>
                  
                  <div className="flex items-center gap-1 text-primary text-sm font-medium group-hover:gap-2 transition-all">
                    Читать
                    <Icon name="ArrowRight" size={16} />
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <Icon name="FileX" size={48} className="mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold text-muted-foreground mb-2">
              Статей не найдено
            </h3>
            <p className="text-muted-foreground">
              В этой категории пока нет статей. Попробуйте выбрать другую категорию.
            </p>
          </div>
        )}
      </div>

      {/* Newsletter Subscription */}
      <div className="bg-muted/50 py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <Icon name="Mail" size={48} className="mx-auto text-primary mb-6" />
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Получайте новые статьи первыми
            </h3>
            <p className="text-muted-foreground mb-8">
              Подпишитесь на нашу рассылку и узнавайте о новых статьях, ритуалах и магических практиках
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Ваш email"
                className="flex-1 px-4 py-3 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors">
                Подписаться
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}