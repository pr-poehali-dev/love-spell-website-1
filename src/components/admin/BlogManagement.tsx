import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { Label } from '@/components/ui/label';

interface BlogPost {
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

const categories = [
  { id: 'love-magic', name: 'Любовная магия' },
  { id: 'protection', name: 'Защита' },
  { id: 'divination', name: 'Гадания' },
  { id: 'rituals', name: 'Ритуалы' },
  { id: 'herbs', name: 'Травы и обереги' },
];

const mockPosts: BlogPost[] = [
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

export default function BlogManagement() {
  const [posts, setPosts] = useState<BlogPost[]>(mockPosts);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const handleCreateNew = () => {
    const newPost: BlogPost = {
      id: Date.now().toString(),
      title: '',
      excerpt: '',
      content: '',
      category: 'love-magic',
      status: 'draft',
      publishedDate: new Date().toISOString().split('T')[0],
      image: '',
      slug: '',
      keywords: [],
      readTime: 5,
      seoTitle: '',
      seoDescription: ''
    };
    setSelectedPost(newPost);
    setIsCreating(true);
  };

  const handleSavePost = (post: BlogPost) => {
    if (isCreating) {
      setPosts([...posts, post]);
      setIsCreating(false);
    } else {
      setPosts(posts.map(p => p.id === post.id ? post : p));
    }
    setSelectedPost(null);
  };

  const handleDeletePost = (id: string) => {
    setPosts(posts.filter(p => p.id !== id));
  };

  const getStatusColor = (status: BlogPost['status']) => {
    switch (status) {
      case 'published': return 'bg-green-500/20 text-green-700';
      case 'draft': return 'bg-yellow-500/20 text-yellow-700';
      case 'scheduled': return 'bg-blue-500/20 text-blue-700';
      default: return 'bg-gray-500/20 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Управление блогом</h2>
          <p className="text-muted-foreground">Создание и редактирование статей блога</p>
        </div>
        <Button onClick={handleCreateNew} className="flex items-center gap-2">
          <Icon name="Plus" size={16} />
          Новая статья
        </Button>
      </div>

      <Tabs defaultValue="manual" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="manual" className="flex items-center gap-2">
            <Icon name="Edit" size={16} />
            Ручной постинг
          </TabsTrigger>
          <TabsTrigger value="ai" className="flex items-center gap-2">
            <Icon name="Bot" size={16} />
            ИИ автопостинг
          </TabsTrigger>
        </TabsList>

        <TabsContent value="manual" className="space-y-6">
          {selectedPost ? (
            <PostEditor
              post={selectedPost}
              onSave={handleSavePost}
              onCancel={() => {
                setSelectedPost(null);
                setIsCreating(false);
              }}
              categories={categories}
              isCreating={isCreating}
            />
          ) : (
            <PostsList
              posts={posts}
              onEdit={setSelectedPost}
              onDelete={handleDeletePost}
              categories={categories}
              getStatusColor={getStatusColor}
            />
          )}
        </TabsContent>

        <TabsContent value="ai" className="space-y-6">
          <AIAutoPoster categories={categories} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

interface PostsListProps {
  posts: BlogPost[];
  onEdit: (post: BlogPost) => void;
  onDelete: (id: string) => void;
  categories: { id: string; name: string }[];
  getStatusColor: (status: BlogPost['status']) => string;
}

function PostsList({ posts, onEdit, onDelete, categories, getStatusColor }: PostsListProps) {
  return (
    <div className="grid gap-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Все статьи ({posts.length})</h3>
        <div className="flex gap-2">
          <Input placeholder="Поиск статей..." className="w-64" />
          <Select>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Статус" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Все</SelectItem>
              <SelectItem value="published">Опубликованные</SelectItem>
              <SelectItem value="draft">Черновики</SelectItem>
              <SelectItem value="scheduled">Запланированные</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {posts.map(post => (
        <Card key={post.id} className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-20 h-20 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                {post.image ? (
                  <img src={post.image} alt="" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Icon name="Image" size={24} className="text-muted-foreground" />
                  </div>
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h4 className="font-semibold text-lg line-clamp-1">{post.title || 'Без названия'}</h4>
                    <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                      {post.excerpt || 'Описание отсутствует'}
                    </p>
                    <div className="flex items-center gap-4 mt-3">
                      <Badge variant="outline" className={getStatusColor(post.status)}>
                        {post.status === 'published' ? 'Опубликовано' : 
                         post.status === 'draft' ? 'Черновик' : 'Запланировано'}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {categories.find(c => c.id === post.category)?.name}
                      </span>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Icon name="Calendar" size={12} />
                        {new Date(post.publishedDate).toLocaleDateString('ru-RU')}
                      </span>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Icon name="Clock" size={12} />
                        {post.readTime} мин
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onEdit(post)}
                    >
                      <Icon name="Edit" size={16} />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onDelete(post.id)}
                    >
                      <Icon name="Trash2" size={16} />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      {posts.length === 0 && (
        <Card className="p-12 text-center">
          <Icon name="FileText" size={48} className="mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">Статей пока нет</h3>
          <p className="text-muted-foreground">Создайте первую статью для блога</p>
        </Card>
      )}
    </div>
  );
}

interface PostEditorProps {
  post: BlogPost;
  onSave: (post: BlogPost) => void;
  onCancel: () => void;
  categories: { id: string; name: string }[];
  isCreating: boolean;
}

function PostEditor({ post, onSave, onCancel, categories, isCreating }: PostEditorProps) {
  const [formData, setFormData] = useState<BlogPost>(post);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);

  const handleInputChange = (field: keyof BlogPost, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleGenerateSlug = () => {
    const slug = formData.title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
    setFormData(prev => ({ ...prev, slug }));
  };

  const handleGenerateImage = async () => {
    if (!formData.title) return;
    
    setIsGeneratingImage(true);
    try {
      // Имитация генерации изображения
      await new Promise(resolve => setTimeout(resolve, 2000));
      const imageUrl = `/img/generated-${Date.now()}.jpg`;
      setFormData(prev => ({ ...prev, image: imageUrl }));
    } finally {
      setIsGeneratingImage(false);
    }
  };

  const handleSave = () => {
    if (!formData.title || !formData.content) return;
    onSave(formData);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{isCreating ? 'Создание новой статьи' : 'Редактирование статьи'}</CardTitle>
        <CardDescription>Заполните все поля для создания статьи</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Основная информация */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Заголовок статьи *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder="Введите заголовок статьи"
              />
            </div>

            <div>
              <Label htmlFor="slug">URL (slug)</Label>
              <div className="flex gap-2">
                <Input
                  id="slug"
                  value={formData.slug}
                  onChange={(e) => handleInputChange('slug', e.target.value)}
                  placeholder="url-stranitsy"
                />
                <Button type="button" variant="outline" onClick={handleGenerateSlug}>
                  <Icon name="RefreshCw" size={16} />
                </Button>
              </div>
            </div>

            <div>
              <Label htmlFor="category">Категория</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => handleInputChange('category', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(cat => (
                    <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="status">Статус</Label>
              <Select
                value={formData.status}
                onValueChange={(value: BlogPost['status']) => handleInputChange('status', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Черновик</SelectItem>
                  <SelectItem value="published">Опубликовать</SelectItem>
                  <SelectItem value="scheduled">Запланировать</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Изображение */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="image">Изображение статьи</Label>
              <div className="space-y-3">
                {formData.image && (
                  <div className="w-full h-32 bg-muted rounded-lg overflow-hidden">
                    <img src={formData.image} alt="" className="w-full h-full object-cover" />
                  </div>
                )}
                <div className="flex gap-2">
                  <Input
                    id="image"
                    value={formData.image}
                    onChange={(e) => handleInputChange('image', e.target.value)}
                    placeholder="URL изображения"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleGenerateImage}
                    disabled={isGeneratingImage || !formData.title}
                  >
                    {isGeneratingImage ? (
                      <Icon name="Loader2" size={16} className="animate-spin" />
                    ) : (
                      <Icon name="Sparkles" size={16} />
                    )}
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Можете указать URL или сгенерировать изображение с помощью ИИ
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="readTime">Время чтения (мин)</Label>
                <Input
                  id="readTime"
                  type="number"
                  value={formData.readTime}
                  onChange={(e) => handleInputChange('readTime', parseInt(e.target.value) || 5)}
                  min="1"
                />
              </div>
              <div>
                <Label htmlFor="publishedDate">Дата публикации</Label>
                <Input
                  id="publishedDate"
                  type="date"
                  value={formData.publishedDate}
                  onChange={(e) => handleInputChange('publishedDate', e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Краткое описание */}
        <div>
          <Label htmlFor="excerpt">Краткое описание</Label>
          <Textarea
            id="excerpt"
            value={formData.excerpt}
            onChange={(e) => handleInputChange('excerpt', e.target.value)}
            placeholder="Краткое описание статьи для превью"
            rows={3}
          />
        </div>

        {/* Контент */}
        <div>
          <Label htmlFor="content">Содержание статьи *</Label>
          <Textarea
            id="content"
            value={formData.content}
            onChange={(e) => handleInputChange('content', e.target.value)}
            placeholder="Основной текст статьи в HTML формате"
            rows={15}
            className="font-mono text-sm"
          />
        </div>

        {/* SEO */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">SEO оптимизация</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="seoTitle">SEO заголовок</Label>
              <Input
                id="seoTitle"
                value={formData.seoTitle}
                onChange={(e) => handleInputChange('seoTitle', e.target.value)}
                placeholder="SEO заголовок (если отличается от основного)"
              />
            </div>
            
            <div>
              <Label htmlFor="seoDescription">SEO описание</Label>
              <Textarea
                id="seoDescription"
                value={formData.seoDescription}
                onChange={(e) => handleInputChange('seoDescription', e.target.value)}
                placeholder="Краткое описание для поисковых систем"
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="keywords">Ключевые слова</Label>
              <Input
                id="keywords"
                value={formData.keywords.join(', ')}
                onChange={(e) => handleInputChange('keywords', e.target.value.split(', ').filter(k => k.trim()))}
                placeholder="ключевое слово 1, ключевое слово 2, ключевое слово 3"
              />
            </div>
          </CardContent>
        </Card>

        {/* Кнопки действий */}
        <div className="flex justify-between pt-6 border-t">
          <Button variant="outline" onClick={onCancel}>
            Отмена
          </Button>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => handleInputChange('status', 'draft')}
              disabled={!formData.title || !formData.content}
            >
              Сохранить как черновик
            </Button>
            <Button
              onClick={handleSave}
              disabled={!formData.title || !formData.content}
            >
              {formData.status === 'published' ? 'Опубликовать' : 'Сохранить'}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

interface AIAutoPosterProps {
  categories: { id: string; name: string }[];
}

function AIAutoPoster({ categories }: AIAutoPosterProps) {
  const [articleCount, setArticleCount] = useState(1);
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [customTopic, setCustomTopic] = useState('');
  const [publishMode, setPublishMode] = useState<'auto' | 'review'>('review');
  const [generatedPosts, setGeneratedPosts] = useState<BlogPost[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const topicSuggestions = [
    'Защита от негатива',
    'Привлечение любви',
    'Денежные ритуалы',
    'Лунная магия',
    'Гадание на картах',
    'Защитные амулеты',
    'Очищение дома',
    'Магические свойства трав',
    'Энергетические практики',
    'Славянские обряды'
  ];

  const handleTopicToggle = (topic: string) => {
    setSelectedTopics(prev => 
      prev.includes(topic) 
        ? prev.filter(t => t !== topic)
        : [...prev, topic]
    );
  };

  const handleAddCustomTopic = () => {
    if (customTopic && !selectedTopics.includes(customTopic)) {
      setSelectedTopics(prev => [...prev, customTopic]);
      setCustomTopic('');
    }
  };

  const handleGenerate = async () => {
    if (selectedTopics.length === 0) return;

    setIsGenerating(true);
    try {
      // Имитация генерации статей
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const generated: BlogPost[] = [];
      for (let i = 0; i < articleCount; i++) {
        const topic = selectedTopics[i % selectedTopics.length];
        generated.push({
          id: `generated-${Date.now()}-${i}`,
          title: `${topic}: подробное руководство`,
          excerpt: `Полное руководство по теме "${topic}" от потомственной ворожеи`,
          content: `<div class="prose"><p>Сгенерированный контент для статьи "${topic}"...</p></div>`,
          category: 'love-magic',
          status: 'draft',
          publishedDate: new Date().toISOString().split('T')[0],
          image: `/img/generated-${topic.toLowerCase().replace(/\s+/g, '-')}.jpg`,
          slug: topic.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-'),
          keywords: [topic, 'магия', 'ритуалы'],
          readTime: Math.floor(Math.random() * 10) + 5,
          seoTitle: `${topic} - Подробное руководство от ворожеи`,
          seoDescription: `Узнайте всё о "${topic}" от потомственной ворожеи`
        });
      }
      
      setGeneratedPosts(generated);
      
      if (publishMode === 'auto') {
        // Автоматическая публикация
        console.log('Статьи опубликованы автоматически');
      }
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePublishAll = () => {
    setGeneratedPosts(posts => posts.map(post => ({ ...post, status: 'published' as const })));
    console.log('Все статьи опубликованы');
  };

  const handleEditPost = (id: string, updates: Partial<BlogPost>) => {
    setGeneratedPosts(posts => 
      posts.map(post => post.id === id ? { ...post, ...updates } : post)
    );
  };

  const handleDeletePost = (id: string) => {
    setGeneratedPosts(posts => posts.filter(post => post.id !== id));
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>ИИ генератор статей</CardTitle>
          <CardDescription>
            Создайте статьи автоматически с помощью искусственного интеллекта
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label>Количество статей</Label>
                <Input
                  type="number"
                  min="1"
                  max="10"
                  value={articleCount}
                  onChange={(e) => setArticleCount(parseInt(e.target.value) || 1)}
                />
              </div>

              <div>
                <Label>Режим публикации</Label>
                <div className="space-y-3 mt-2">
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="review"
                      name="publishMode"
                      checked={publishMode === 'review'}
                      onChange={() => setPublishMode('review')}
                    />
                    <Label htmlFor="review">Опубликовать после проверки</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="auto"
                      name="publishMode"
                      checked={publishMode === 'auto'}
                      onChange={() => setPublishMode('auto')}
                    />
                    <Label htmlFor="auto">Опубликовать сразу</Label>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label>Темы для статей ({selectedTopics.length} выбрано)</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {topicSuggestions.map(topic => (
                    <button
                      key={topic}
                      onClick={() => handleTopicToggle(topic)}
                      className={`px-3 py-1 rounded-full text-sm border transition-colors ${
                        selectedTopics.includes(topic)
                          ? 'bg-primary text-primary-foreground border-primary'
                          : 'bg-background hover:bg-muted border-muted-foreground/20'
                      }`}
                    >
                      {topic}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <Label>Добавить свою тему</Label>
                <div className="flex gap-2 mt-2">
                  <Input
                    value={customTopic}
                    onChange={(e) => setCustomTopic(e.target.value)}
                    placeholder="Введите тему статьи"
                    onKeyPress={(e) => e.key === 'Enter' && handleAddCustomTopic()}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleAddCustomTopic}
                    disabled={!customTopic}
                  >
                    <Icon name="Plus" size={16} />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center pt-4">
            <Button
              onClick={handleGenerate}
              disabled={isGenerating || selectedTopics.length === 0}
              className="px-8"
            >
              {isGenerating ? (
                <>
                  <Icon name="Loader2" size={16} className="animate-spin mr-2" />
                  Генерируем статьи...
                </>
              ) : (
                <>
                  <Icon name="Sparkles" size={16} className="mr-2" />
                  Сгенерировать статьи
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Сгенерированные статьи */}
      {generatedPosts.length > 0 && (
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Сгенерированные статьи ({generatedPosts.length})</CardTitle>
                <CardDescription>Проверьте и отредактируйте статьи перед публикацией</CardDescription>
              </div>
              {publishMode === 'review' && (
                <Button onClick={handlePublishAll}>
                  <Icon name="Send" size={16} className="mr-2" />
                  Опубликовать все
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {generatedPosts.map(post => (
                <GeneratedPostCard
                  key={post.id}
                  post={post}
                  onEdit={handleEditPost}
                  onDelete={handleDeletePost}
                  categories={categories}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

interface GeneratedPostCardProps {
  post: BlogPost;
  onEdit: (id: string, updates: Partial<BlogPost>) => void;
  onDelete: (id: string) => void;
  categories: { id: string; name: string }[];
}

function GeneratedPostCard({ post, onEdit, onDelete, categories }: GeneratedPostCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({ title: post.title, excerpt: post.excerpt });

  const handleSaveEdit = () => {
    onEdit(post.id, editData);
    setIsEditing(false);
  };

  const handlePublishSingle = () => {
    onEdit(post.id, { status: 'published' });
  };

  return (
    <Card className="border-l-4 border-l-blue-500">
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline" className="bg-blue-50 text-blue-700">
                Сгенерировано
              </Badge>
              <Badge variant="outline">
                {categories.find(c => c.id === post.category)?.name}
              </Badge>
              <span className="text-xs text-muted-foreground">
                {post.readTime} мин чтения
              </span>
            </div>

            {isEditing ? (
              <div className="space-y-3">
                <Input
                  value={editData.title}
                  onChange={(e) => setEditData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Заголовок статьи"
                />
                <Textarea
                  value={editData.excerpt}
                  onChange={(e) => setEditData(prev => ({ ...prev, excerpt: e.target.value }))}
                  placeholder="Краткое описание"
                  rows={3}
                />
                <div className="flex gap-2">
                  <Button size="sm" onClick={handleSaveEdit}>
                    Сохранить
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setIsEditing(false);
                      setEditData({ title: post.title, excerpt: post.excerpt });
                    }}
                  >
                    Отмена
                  </Button>
                </div>
              </div>
            ) : (
              <>
                <h4 className="font-semibold text-lg">{post.title}</h4>
                <p className="text-sm text-muted-foreground mt-1">{post.excerpt}</p>
              </>
            )}

            {isExpanded && !isEditing && (
              <div className="mt-4 p-4 bg-muted/30 rounded-lg">
                <div 
                  className="prose prose-sm max-w-none text-sm"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
              </div>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              <Icon name={isExpanded ? 'ChevronUp' : 'ChevronDown'} size={16} />
            </Button>
            
            {!isEditing && (
              <>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setIsEditing(true)}
                >
                  <Icon name="Edit" size={16} />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onDelete(post.id)}
                >
                  <Icon name="Trash2" size={16} />
                </Button>
                <Button
                  size="sm"
                  onClick={handlePublishSingle}
                  disabled={post.status === 'published'}
                >
                  <Icon name="Send" size={16} />
                </Button>
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}