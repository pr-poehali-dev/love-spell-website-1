import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';
import { Label } from '@/components/ui/label';
import { BlogPost, Category } from '@/types/blog';

interface PostEditorProps {
  post: BlogPost;
  onSave: (post: BlogPost) => void;
  onCancel: () => void;
  categories: Category[];
  isCreating: boolean;
}

export default function PostEditor({ post, onSave, onCancel, categories, isCreating }: PostEditorProps) {
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
      <CardContent className="space-y-4 md:space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
          {/* Основная информация */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Заголовок статьи *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder="Введите заголовок статьи"
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="slug">URL (slug)</Label>
              <div className="flex flex-col sm:flex-row gap-2 mt-2">
                <Input
                  id="slug"
                  value={formData.slug}
                  onChange={(e) => handleInputChange('slug', e.target.value)}
                  placeholder="url-stranitsy"
                  className="flex-1"
                />
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={handleGenerateSlug}
                  className="w-full sm:w-auto"
                >
                  <Icon name="RefreshCw" size={16} />
                  <span className="sm:hidden ml-2">Генерировать</span>
                </Button>
              </div>
            </div>

            <div>
              <Label htmlFor="category">Категория</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => handleInputChange('category', value)}
              >
                <SelectTrigger className="mt-2">
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
                <SelectTrigger className="mt-2">
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
                <div className="flex flex-col sm:flex-row gap-2">
                  <Input
                    id="image"
                    value={formData.image}
                    onChange={(e) => handleInputChange('image', e.target.value)}
                    placeholder="URL изображения"
                    className="flex-1"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleGenerateImage}
                    disabled={isGeneratingImage || !formData.title}
                    className="w-full sm:w-auto"
                  >
                    {isGeneratingImage ? (
                      <Icon name="Loader2" size={16} className="animate-spin" />
                    ) : (
                      <Icon name="Sparkles" size={16} />
                    )}
                    <span className="sm:hidden ml-2">
                      {isGeneratingImage ? 'Генерируем...' : 'Генерировать'}
                    </span>
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Можете указать URL или сгенерировать изображение с помощью ИИ
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="readTime">Время чтения (мин)</Label>
                <Input
                  id="readTime"
                  type="number"
                  value={formData.readTime}
                  onChange={(e) => handleInputChange('readTime', parseInt(e.target.value) || 5)}
                  min="1"
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="publishedDate">Дата публикации</Label>
                <Input
                  id="publishedDate"
                  type="date"
                  value={formData.publishedDate}
                  onChange={(e) => handleInputChange('publishedDate', e.target.value)}
                  className="mt-2"
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
            className="mt-2"
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
            rows={12}
            className="font-mono text-xs md:text-sm mt-2"
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
                className="mt-2"
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
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="keywords">Ключевые слова</Label>
              <Input
                id="keywords"
                value={formData.keywords.join(', ')}
                onChange={(e) => handleInputChange('keywords', e.target.value.split(', ').filter(k => k.trim()))}
                placeholder="ключевое слово 1, ключевое слово 2, ключевое слово 3"
                className="mt-2"
              />
            </div>
          </CardContent>
        </Card>

        {/* Кнопки действий */}
        <div className="flex flex-col sm:flex-row justify-between gap-3 pt-4 md:pt-6 border-t">
          <Button variant="outline" onClick={onCancel} className="order-1 sm:order-none">
            Отмена
          </Button>
          <div className="flex flex-col sm:flex-row gap-2 order-0 sm:order-none">
            <Button
              variant="outline"
              onClick={() => handleInputChange('status', 'draft')}
              disabled={!formData.title || !formData.content}
              className="w-full sm:w-auto"
            >
              Сохранить как черновик
            </Button>
            <Button
              onClick={handleSave}
              disabled={!formData.title || !formData.content}
              className="w-full sm:w-auto"
            >
              {formData.status === 'published' ? 'Опубликовать' : 'Сохранить'}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}