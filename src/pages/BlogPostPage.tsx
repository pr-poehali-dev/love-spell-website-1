import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import Header from '@/components/Header';
import SEO from '@/components/SEO';
import ContactModal from '@/components/ContactModal';

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

const blogPosts: Record<string, BlogPost> = {
  'lunnye-cikly-i-magiya': {
    id: '1',
    title: 'Лунные циклы и их влияние на магические практики',
    excerpt: 'Как правильно использовать энергию Луны для усиления ритуалов и заклинаний',
    content: `
      <div class="prose prose-lg max-w-none">
        <p class="lead">Луна всегда была мощным источником магической энергии. Её циклы влияют не только на приливы и отливы, но и на тонкие энергетические потоки, которые мы используем в магических практиках.</p>

        <h2>Фазы Луны и их магическое значение</h2>

        <h3>Новолуние - время новых начинаний</h3>
        <p>Новолуние - это период максимальной восприимчивости к новым энергиям. В это время лучше всего:</p>
        <ul>
          <li>Начинать новые магические практики</li>
          <li>Проводить ритуалы на привлечение</li>
          <li>Заряжать амулеты и талисманы</li>
          <li>Планировать важные дела</li>
        </ul>

        <h3>Растущая Луна - накопление энергии</h3>
        <p>Период роста лунного диска способствует накоплению и усилению энергий:</p>
        <ul>
          <li>Ритуалы на увеличение благосостояния</li>
          <li>Привлечение любви и отношений</li>
          <li>Усиление магических способностей</li>
          <li>Лечебные практики</li>
        </ul>

        <h3>Полнолуние - пик магической силы</h3>
        <p>Полнолуние - время максимальной магической активности. Все ритуалы в этот период обладают особой силой:</p>
        <ul>
          <li>Мощные защитные ритуалы</li>
          <li>Очищение от негатива</li>
          <li>Гадания и предсказания</li>
          <li>Исцеляющие практики</li>
        </ul>

        <h3>Убывающая Луна - время очищения</h3>
        <p>Убывающая Луна помогает избавиться от нежелательного:</p>
        <ul>
          <li>Снятие негативных воздействий</li>
          <li>Избавление от вредных привычек</li>
          <li>Разрыв нежелательных связей</li>
          <li>Очищение ауры и пространства</li>
        </ul>

        <h2>Практические рекомендации</h2>

        <p>Для эффективной работы с лунными энергиями важно:</p>

        <ol>
          <li><strong>Ведите лунный календарь</strong> - отмечайте фазы и планируйте практики</li>
          <li><strong>Настройтесь на энергию</strong> - проводите время на природе в лунном свете</li>
          <li><strong>Используйте лунную воду</strong> - заряжайте воду под лунными лучами</li>
          <li><strong>Работайте с кристаллами</strong> - лунный камень, селенит, горный хрусталь</li>
        </ol>

        <h2>Заключение</h2>
        <p>Понимание лунных циклов - основа успешной магической практики. Работая в гармонии с природными ритмами, вы усиливаете свои способности и достигаете лучших результатов.</p>
      </div>
    `,
    category: 'rituals',
    author: 'Раиса Ильинская',
    publishedDate: '2024-03-15',
    image: '/img/736dc175-0720-4fa3-83c7-2ede4b54400d.jpg',
    slug: 'lunnye-cikly-i-magiya',
    keywords: ['лунная магия', 'лунные циклы', 'ритуалы', 'полнолуние', 'новолуние'],
    readTime: 8
  },
  'zashhitnye-amulety': {
    id: '2',
    title: 'Защитные амулеты: создание и активация',
    excerpt: 'Пошаговое руководство по изготовлению защитных амулетов своими руками',
    content: `
      <div class="prose prose-lg max-w-none">
        <p class="lead">Защитные амулеты - это мощные инструменты, которые помогают оградить нас от негативных воздействий и привлечь благоприятную энергию. Создание амулета своими руками усиливает его эффективность многократно.</p>

        <h2>Основные виды защитных амулетов</h2>

        <h3>Амулеты стихий</h3>
        <p>Каждая стихия дает свою особую защиту:</p>
        <ul>
          <li><strong>Огонь</strong> - защита от врагов и недоброжелателей</li>
          <li><strong>Вода</strong> - эмоциональная защита, очищение</li>
          <li><strong>Земля</strong> - стабильность, материальная защита</li>
          <li><strong>Воздух</strong> - ментальная защита, ясность мысли</li>
        </ul>

        <h3>Травяные амулеты</h3>
        <p>Сила растений в защитной магии:</p>
        <ul>
          <li>Рябина - от сглаза и порчи</li>
          <li>Зверобой - от депрессии и тоски</li>
          <li>Полынь - от злых духов</li>
          <li>Чеснок - универсальная защита</li>
        </ul>

        <h2>Создание амулета пошагово</h2>

        <h3>Подготовка</h3>
        <ol>
          <li>Выберите подходящее время (лучше на растущую луну)</li>
          <li>Очистите рабочее пространство</li>
          <li>Подготовьте все необходимые материалы</li>
          <li>Настройтесь на позитивную энергию</li>
        </ol>

        <h3>Изготовление</h3>
        <ol>
          <li>Возьмите основу амулета (камень, металл, дерево)</li>
          <li>Нанесите защитные символы</li>
          <li>Добавьте травы или другие компоненты</li>
          <li>Скрепите все элементы вместе</li>
        </ol>

        <h3>Активация</h3>
        <p>Для активации амулета проведите следующий ритуал:</p>
        <ol>
          <li>Возьмите амулет в руки</li>
          <li>Сконцентрируйтесь на цели защиты</li>
          <li>Произнесите заклинание или молитву</li>
          <li>Подержите амулет в дыму благовоний</li>
          <li>Носите постоянно при себе первую неделю</li>
        </ol>

        <h2>Правила ношения и ухода</h2>

        <p>Чтобы амулет служил долго и эффективно:</p>
        <ul>
          <li>Носите амулет рядом с телом</li>
          <li>Не показывайте посторонним</li>
          <li>Регулярно очищайте энергетически</li>
          <li>Перезаряжайте при полной луне</li>
          <li>Заменяйте при повреждении</li>
        </ul>

        <h2>Заключение</h2>
        <p>Создание защитного амулета - это древняя практика, которая работает благодаря вашей вере и правильному намерению. Помните: самый мощный амулет - тот, который создан с любовью и верой в его силу.</p>
      </div>
    `,
    category: 'protection',
    author: 'Раиса Ильинская',
    publishedDate: '2024-03-12',
    image: '/img/8867e7ca-685e-446f-975e-2b355d32f253.jpg',
    slug: 'zashhitnye-amulety',
    keywords: ['защитные амулеты', 'обереги', 'защитная магия', 'талисманы'],
    readTime: 6
  }
};

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [currentTitle, setCurrentTitle] = useState('Статья');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [post, setPost] = useState<BlogPost | null>(null);

  useEffect(() => {
    if (slug && blogPosts[slug]) {
      setPost(blogPosts[slug]);
      setCurrentTitle('Статья');
    } else {
      navigate('/blog');
    }
  }, [slug, navigate]);

  if (!post) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Icon name="Loader2" size={48} className="mx-auto animate-spin text-primary mb-4" />
          <p className="text-muted-foreground">Загрузка статьи...</p>
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
        title={`${post.title} | Блог Раисы Ильинской`}
        description={post.excerpt}
        keywords={post.keywords.join(', ')}
        url={`/blog/${post.slug}`}
        type="article"
        structuredData={structuredData}
      />
      
      <Header currentTitle={currentTitle} setCurrentTitle={setCurrentTitle} />

      {/* Article Header */}
      <div className="relative z-0 pt-16 md:pt-20 lg:pt-24">
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-b from-background/60 via-background/20 to-transparent pointer-events-none z-10"></div>
        
        <div className="w-full h-48 md:h-64 lg:h-80 relative overflow-hidden">
          <img 
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20"></div>
          <div className="absolute inset-0 flex items-end">
            <div className="container mx-auto px-4 pb-8">
              <div className="max-w-4xl">
                <div className="flex items-center gap-4 text-white/80 text-sm mb-4">
                  <button
                    onClick={() => navigate('/blog')}
                    className="flex items-center gap-2 hover:text-white transition-colors"
                  >
                    <Icon name="ArrowLeft" size={16} />
                    Назад к блогу
                  </button>
                  <div className="flex items-center gap-1">
                    <Icon name="Calendar" size={14} />
                    {new Date(post.publishedDate).toLocaleDateString('ru-RU')}
                  </div>
                  <div className="flex items-center gap-1">
                    <Icon name="Clock" size={14} />
                    {post.readTime} мин
                  </div>
                </div>
                <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                  {post.title}
                </h1>
                <p className="text-lg md:text-xl text-white/90 max-w-3xl">
                  {post.excerpt}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          {/* Author info */}
          <div className="flex items-center gap-3 md:gap-4 mb-6 md:mb-8 p-4 md:p-6 bg-muted/30 rounded-xl border">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
              <Icon name="User" size={20} className="md:w-6 md:h-6 text-primary-foreground" />
            </div>
            <div>
              <p className="font-semibold text-foreground text-sm md:text-base">{post.author}</p>
              <p className="text-xs md:text-sm text-muted-foreground">Потомственная ворожея</p>
            </div>
          </div>

          {/* Article body */}
          <div 
            className="article-content text-foreground leading-relaxed"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Call to action */}
          <div className="mt-8 md:mt-12 p-6 md:p-8 bg-primary/10 rounded-xl border-2 border-primary/20 text-center">
            <Icon name="MessageCircle" size={40} className="md:w-12 md:h-12 mx-auto text-primary mb-3 md:mb-4" />
            <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">
              Нужна персональная консультация?
            </h3>
            <p className="text-sm md:text-base text-muted-foreground mb-4 md:mb-6 max-w-2xl mx-auto px-4">
              Получите индивидуальный совет от потомственной ворожеи. 
              Первая консультация - бесплатно!
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-primary text-primary-foreground px-6 md:px-8 py-2.5 md:py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors text-sm md:text-base"
            >
              Получить консультацию
            </button>
          </div>

          {/* Share buttons */}
          <div className="mt-6 md:mt-8 flex items-center justify-center gap-3 md:gap-4">
            <p className="text-sm md:text-base text-muted-foreground">Поделиться:</p>
            <div className="flex gap-2">
              <button className="p-2 rounded-full bg-muted hover:bg-muted-foreground/20 transition-colors">
                <Icon name="Share" size={18} className="md:w-5 md:h-5" />
              </button>
            </div>
          </div>

          {/* Related articles */}
          <div className="mt-12 md:mt-16">
            <h3 className="text-xl md:text-2xl font-bold mb-6 md:mb-8">Похожие статьи</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {Object.values(blogPosts)
                .filter(p => p.id !== post.id && p.category === post.category)
                .slice(0, 2)
                .map(relatedPost => (
                  <article
                    key={relatedPost.id}
                    onClick={() => navigate(`/blog/${relatedPost.slug}`)}
                    className="bg-card rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer border"
                  >
                    <img
                      src={relatedPost.image}
                      alt={relatedPost.title}
                      className="w-full h-32 object-cover"
                      loading="lazy"
                    />
                    <div className="p-3 md:p-4">
                      <h4 className="font-semibold mb-2 line-clamp-2 text-sm md:text-base">
                        {relatedPost.title}
                      </h4>
                      <p className="text-xs md:text-sm text-muted-foreground line-clamp-2">
                        {relatedPost.excerpt}
                      </p>
                    </div>
                  </article>
                ))}
            </div>
          </div>
        </div>
      </div>

      <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}