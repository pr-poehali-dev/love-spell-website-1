import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';
import { Label } from '@/components/ui/label';
import { BlogPost, Category } from '@/types/blog';
import GeneratedPostCard from './GeneratedPostCard';

interface AIAutoPosterProps {
  categories: Category[];
}

export default function AIAutoPoster({ categories }: AIAutoPosterProps) {
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