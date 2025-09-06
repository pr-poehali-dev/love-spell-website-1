export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  status: 'draft' | 'published' | 'scheduled';
  publishedDate: string;
  image: string;
  slug: string;
  keywords: string[];
  readTime: number;
  seoTitle: string;
  seoDescription: string;
}

export interface Category {
  id: string;
  name: string;
}

export const categories: Category[] = [
  { id: 'love-magic', name: 'Любовная магия' },
  { id: 'protection', name: 'Защита' },
  { id: 'divination', name: 'Гадания' },
  { id: 'rituals', name: 'Ритуалы' },
  { id: 'herbs', name: 'Травы и обереги' },
];

export const mockPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Лунные циклы и их влияние на магические практики',
    excerpt: 'Как правильно использовать энергию Луны для усиления ритуалов',
    content: '',
    category: 'rituals',
    status: 'published',
    publishedDate: '2024-03-15',
    image: '/img/moon-magic.jpg',
    slug: 'lunnye-cikly-i-magiya',
    keywords: ['лунная магия', 'лунные циклы', 'ритуалы'],
    readTime: 8,
    seoTitle: 'Лунные циклы и магия: полное руководство',
    seoDescription: 'Узнайте как использовать энергию Луны в магических практиках'
  },
  {
    id: '2',
    title: 'Защитные амулеты: создание и активация',
    excerpt: 'Пошаговое руководство по изготовлению защитных амулетов',
    content: '',
    category: 'protection',
    status: 'draft',
    publishedDate: '2024-03-12',
    image: '/img/protection-amulets.jpg',
    slug: 'zashhitnye-amulety',
    keywords: ['защитные амулеты', 'обереги', 'защитная магия'],
    readTime: 6,
    seoTitle: 'Как создать защитный амулет своими руками',
    seoDescription: 'Пошаговое руководство по созданию мощных защитных амулетов'
  }
];