import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import Header from '@/components/Header';
import SEO from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Divider from '@/components/Divider';

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
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>(blogPosts);
  const navigate = useNavigate();

  useEffect(() => {
    let filtered = blogPosts;
    
    // Фильтр по категории
    if (activeCategory !== 'all') {
      filtered = filtered.filter(post => post.category === activeCategory);
    }
    
    // Фильтр по поиску
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(post => 
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.keywords.some(keyword => keyword.toLowerCase().includes(query))
      );
    }
    
    setFilteredPosts(filtered);
  }, [activeCategory, searchQuery]);

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
    <div className="min-h-screen bg-background text-foreground">
      <SEO 
        title="Блог о магии и эзотерике | Раиса Ильинская - Потомственная ворожея"
        description="Статьи о любовной магии, защитных ритуалах, гаданиях и травничестве от потомственной ворожеи Раисы Ильинской. Практические советы и древние знания."
        keywords="блог о магии, эзотерика, любовная магия, гадания, ритуалы, защитная магия, травы, обереги"
        url="/blog"
        type="blog"
        structuredData={structuredData}
      />
      
      <Header currentTitle={currentTitle} setCurrentTitle={setCurrentTitle} />

      {/* Hero Section в стиле главной страницы */}
      <div className="relative -mt-[240px] sm:-mt-[280px] md:-mt-[320px] z-10">
        {/* Background Image with V-Mask */}
        <div className="relative h-[70vh] sm:h-[75vh] overflow-hidden">
          <div 
            className="absolute inset-0 hero-bg v-mask"
            style={{
              backgroundImage: `url('/img/d8cd2c3b-01ba-410d-a448-5d44f78c7ad9.jpg')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            {/* Overlay для улучшения контраста */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/40"></div>
          </div>
        </div>
        
        {/* Profile Section Overlapping */}
        <div className="relative -mt-16 sm:-mt-20 md:-mt-24 z-10">
          <div className="max-w-xs sm:max-w-sm md:max-w-md mx-auto px-4 text-center">
            {/* Blog Icon */}
            <div className="mb-6 relative">
              <div className="relative w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 mx-auto">
                <div className="relative w-full h-full rounded-full overflow-hidden bg-primary flex items-center justify-center"
                     style={{ 
                       filter: 'drop-shadow(0 14px 24px rgba(0, 0, 0, 0.35))'
                     }}>
                  <Icon name="BookOpen" size={80} className="text-white" />
                </div>
              </div>
            </div>
            
            {/* Title */}
            <div className="mb-6 sm:mb-8">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 drop-shadow-lg tracking-wide">
                Блог о магии и эзотерике
              </h1>
              <div className="text-accent font-semibold text-lg sm:text-xl md:text-2xl drop-shadow-lg">
                Древние знания от потомственной ворожеи
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="bg-background pt-8 pb-12">
        <div className="max-w-4xl mx-auto px-4">
          
          {/* Search */}
          <div className="mb-8">
            <div className="relative max-w-md mx-auto">
              <Icon name="Search" size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Поиск статей..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-3 bg-card border-border rounded-lg"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <Icon name="X" size={16} />
                </button>
              )}
            </div>
          </div>

          <Divider />

          {/* Categories */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-3 justify-center">
              {blogCategories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all duration-200 ${
                    activeCategory === category.id
                      ? 'bg-primary text-primary-foreground shadow-lg'
                      : 'bg-card text-muted-foreground hover:text-foreground hover:bg-muted border border-border'
                  }`}
                >
                  <Icon name={category.icon as any} size={16} />
                  <span className="text-sm">{category.name}</span>
                </button>
              ))}
            </div>
          </div>

          <Divider />

          {/* Results Info */}
          {searchQuery && (
            <div className="text-center text-sm text-muted-foreground mb-6">
              Найдено {filteredPosts.length} статей по запросу "{searchQuery}"
            </div>
          )}

          {/* Blog Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map(post => (
              <article
                key={post.id}
                onClick={() => handlePostClick(post)}
                className="group bg-card rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer border border-border"
              >
                {/* Image */}
                <div className="relative overflow-hidden aspect-[4/3]">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Category Badge */}
                  <div className="absolute top-3 left-3">
                    <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-medium">
                      {blogCategories.find(cat => cat.id === post.category)?.name}
                    </span>
                  </div>
                </div>
                
                {/* Content */}
                <div className="p-6">
                  {/* Meta Info */}
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
                  
                  {/* Title */}
                  <h2 className="text-lg font-bold text-foreground mb-3 leading-tight group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </h2>
                  
                  {/* Excerpt */}
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  {/* Footer */}
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

          {/* Empty State */}
          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <div className="bg-muted rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <Icon name="FileX" size={24} className="text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Статей не найдено
              </h3>
              <p className="text-muted-foreground mb-6">
                {searchQuery ? 
                  `По запросу "${searchQuery}" ничего не найдено. Попробуйте изменить поисковый запрос.` :
                  'В этой категории пока нет статей. Попробуйте выбрать другую категорию.'
                }
              </p>
              {(searchQuery || activeCategory !== 'all') && (
                <div className="flex gap-3 justify-center">
                  {searchQuery && (
                    <Button onClick={() => setSearchQuery('')} variant="outline" size="sm">
                      <Icon name="X" size={16} className="mr-2" />
                      Очистить поиск
                    </Button>
                  )}
                  {activeCategory !== 'all' && (
                    <Button onClick={() => setActiveCategory('all')} variant="outline" size="sm">
                      <Icon name="RotateCcw" size={16} className="mr-2" />
                      Все статьи
                    </Button>
                  )}
                </div>
              )}
            </div>
          )}

          <Divider />

          {/* Newsletter Section */}
          <div className="text-center py-8">
            <Icon name="Mail" size={48} className="text-primary mx-auto mb-4" />
            <h3 className="text-xl font-bold text-foreground mb-4">
              Получайте новые статьи первыми
            </h3>
            <p className="text-muted-foreground mb-6">
              Подпишитесь на рассылку и узнавайте о новых магических практиках и древних знаниях
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Ваш email"
                className="flex-1"
              />
              <Button className="px-6">
                <Icon name="Send" size={16} className="mr-2" />
                Подписаться
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-3">
              Никакого спама. Отписаться можно в любое время.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}