import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import Header from '@/components/Header';
import SEO from '@/components/SEO';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

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
  { id: 'all', name: 'Все статьи', icon: 'BookOpen', color: 'bg-slate-500' },
  { id: 'love-magic', name: 'Любовная магия', icon: 'Heart', color: 'bg-rose-500' },
  { id: 'protection', name: 'Защита', icon: 'Shield', color: 'bg-blue-500' },
  { id: 'divination', name: 'Гадания', icon: 'Crystal', color: 'bg-purple-500' },
  { id: 'rituals', name: 'Ритуалы', icon: 'Flame', color: 'bg-orange-500' },
  { id: 'herbs', name: 'Травы и обереги', icon: 'Leaf', color: 'bg-green-500' },
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
    image: '/img/ebdc226a-9404-4f60-8d6e-7f605410ecbb.jpg',
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
    image: '/img/a6e575b1-7bde-4b93-a826-3c78f511be23.jpg',
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
    image: '/img/d0d43515-a91b-4b91-b78b-71ed60121073.jpg',
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
    image: '/img/a6e575b1-7bde-4b93-a826-3c78f511be23.jpg',
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
    image: '/img/ebdc226a-9404-4f60-8d6e-7f605410ecbb.jpg',
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
    image: '/img/a6e575b1-7bde-4b93-a826-3c78f511be23.jpg',
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

  const getCategoryColor = (categoryId: string) => {
    return blogCategories.find(cat => cat.id === categoryId)?.color || 'bg-gray-500';
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
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
      <div className="relative pt-20 pb-8 md:pb-12">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-purple-100/20 dark:to-purple-900/10"></div>
        <div className="container mx-auto px-4 relative">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Icon name="BookOpen" size={16} />
              Блог о магии и эзотерике
            </div>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              Древние знания и 
              <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent"> современные практики</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
              Изучайте магические искусства, ритуалы и эзотерические практики 
              от потомственной ворожеи Раисы Ильинской
            </p>
            
            {/* Search Bar */}
            <div className="max-w-md mx-auto relative mb-8">
              <div className="relative">
                <Icon name="Search" size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Поиск статей..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-3 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-xl shadow-sm focus:shadow-lg transition-all"
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
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="container mx-auto px-4 mb-8">
        <div className="flex flex-wrap gap-3 justify-center">
          {blogCategories.map(category => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`group flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all duration-300 ${
                activeCategory === category.id
                  ? 'bg-white dark:bg-slate-800 text-foreground shadow-lg scale-105 border border-primary/20'
                  : 'bg-white/60 dark:bg-slate-800/60 text-muted-foreground hover:text-foreground hover:bg-white dark:hover:bg-slate-800 hover:shadow-md backdrop-blur-sm'
              }`}
            >
              <div className={`w-2 h-2 rounded-full ${activeCategory === category.id ? category.color : 'bg-muted-foreground'} transition-all`}></div>
              <Icon name={category.icon as any} size={16} />
              <span className="text-sm">{category.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Results Info */}
      <div className="container mx-auto px-4 mb-6">
        <div className="text-center text-sm text-muted-foreground">
          {searchQuery && (
            <span>Найдено {filteredPosts.length} статей по запросу "{searchQuery}"</span>
          )}
          {!searchQuery && activeCategory !== 'all' && (
            <span>Показано {filteredPosts.length} статей в категории "{blogCategories.find(c => c.id === activeCategory)?.name}"</span>
          )}
        </div>
      </div>

      {/* Blog Posts Grid */}
      <div className="container mx-auto px-4 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post, index) => (
            <article
              key={post.id}
              onClick={() => handlePostClick(post)}
              className="group bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 cursor-pointer border border-slate-200/50 dark:border-slate-700/50 hover:border-primary/20 hover:-translate-y-1"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Image */}
              <div className="relative overflow-hidden aspect-[4/3]">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className={`${getCategoryColor(post.category)} text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg`}>
                    {blogCategories.find(cat => cat.id === post.category)?.name}
                  </span>
                </div>
                
                {/* Read Time */}
                <div className="absolute top-4 right-4 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm text-foreground px-2 py-1 rounded-full text-xs font-medium">
                  {post.readTime} мин
                </div>
              </div>
              
              {/* Content */}
              <div className="p-6">
                {/* Meta Info */}
                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                  <div className="flex items-center gap-1.5">
                    <Icon name="Calendar" size={12} />
                    {new Date(post.publishedDate).toLocaleDateString('ru-RU', { 
                      day: 'numeric', 
                      month: 'long', 
                      year: 'numeric' 
                    })}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Icon name="User" size={12} />
                    {post.author}
                  </div>
                </div>
                
                {/* Title */}
                <h2 className="text-xl font-bold text-foreground mb-3 leading-tight group-hover:text-primary transition-colors line-clamp-2">
                  {post.title}
                </h2>
                
                {/* Excerpt */}
                <p className="text-muted-foreground text-sm leading-relaxed mb-6 line-clamp-3">
                  {post.excerpt}
                </p>
                
                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-700">
                  <div className="flex flex-wrap gap-1">
                    {post.keywords.slice(0, 2).map((keyword, idx) => (
                      <span key={idx} className="bg-slate-100 dark:bg-slate-700 text-muted-foreground px-2 py-1 rounded text-xs">
                        {keyword}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center gap-2 text-primary text-sm font-medium group-hover:gap-3 transition-all">
                    Читать
                    <Icon name="ArrowRight" size={16} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Empty State */}
        {filteredPosts.length === 0 && (
          <div className="text-center py-16">
            <div className="bg-slate-100 dark:bg-slate-800 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
              <Icon name="FileX" size={32} className="text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Статей не найдено
            </h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
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
      </div>

      {/* Newsletter Section */}
      <div className="bg-gradient-to-r from-primary/5 via-purple-50/50 to-primary/5 dark:from-primary/10 dark:via-slate-800/50 dark:to-primary/10 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <Icon name="Mail" size={24} className="text-primary" />
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Получайте новые статьи первыми
            </h3>
            <p className="text-muted-foreground mb-8 text-lg">
              Подпишитесь на рассылку и узнавайте о новых магических практиках, ритуалах и эзотерических знаниях
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Введите ваш email"
                className="flex-1 py-3 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-xl"
              />
              <Button className="px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all">
                <Icon name="Send" size={16} className="mr-2" />
                Подписаться
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-4">
              Никакого спама. Отписаться можно в любое время.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}