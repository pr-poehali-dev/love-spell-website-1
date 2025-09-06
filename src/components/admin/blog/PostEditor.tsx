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
    const updatedData = { ...formData, [field]: value };
    
    // Автогенерация slug из заголовка
    if (field === 'title' && value) {
      updatedData.slug = value
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .substring(0, 50);
    }
    
    setFormData(updatedData);
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
              <Input
                id="slug"
                value={formData.slug}
                onChange={(e) => handleInputChange('slug', e.target.value)}
                placeholder="url-stranitsy"
                className="mt-2"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Автоматически генерируется из заголовка
              </p>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <Label htmlFor="category">Категория</Label>
                <span className="text-xs text-muted-foreground">
                  Управляйте категориями через кнопку "Управление" выше
                </span>
              </div>
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
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onload = () => {
                          handleInputChange('image', reader.result as string);
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
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
                {formData.image && (
                  <div className="flex items-center gap-2 p-2 bg-muted rounded mt-2">
                    <img src={formData.image} alt="Preview" className="w-12 h-12 object-cover rounded" />
                    <span className="text-sm text-muted-foreground">Изображение выбрано</span>
                    <button
                      type="button"
                      onClick={() => handleInputChange('image', '')}
                      className="ml-auto text-destructive hover:text-destructive/80"
                    >
                      <Icon name="X" size={16} />
                    </button>
                  </div>
                )}
                <p className="text-xs text-muted-foreground">
                  Выберите файл с компьютера или сгенерируйте изображение с помощью ИИ
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
              <div className="flex items-center gap-2">
                <Label htmlFor="seoTitle">SEO заголовок</Label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const generated = `${formData.title} - Полное руководство от ворожеи`;
                    handleInputChange('seoTitle', generated);
                  }}
                  disabled={!formData.title}
                  className="h-6 px-2 text-xs"
                >
                  <Icon name="Wand2" size={12} className="mr-1" />
                  ИИ
                </Button>
              </div>
              <Input
                id="seoTitle"
                value={formData.seoTitle}
                onChange={(e) => handleInputChange('seoTitle', e.target.value)}
                placeholder="SEO заголовок (если отличается от основного)"
                className="mt-2"
              />
            </div>
            
            <div>
              <div className="flex items-center gap-2">
                <Label htmlFor="seoDescription">SEO описание</Label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const generated = `Узнайте всё о "${formData.title}" от потомственной ворожеи. Проверенные методы и ритуалы.`;
                    handleInputChange('seoDescription', generated);
                  }}
                  disabled={!formData.title}
                  className="h-6 px-2 text-xs"
                >
                  <Icon name="Wand2" size={12} className="mr-1" />
                  ИИ
                </Button>
              </div>
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
              <div className="flex items-center gap-2">
                <Label htmlFor="keywords">Ключевые слова</Label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const keywords = [formData.title.toLowerCase(), 'магия', 'ритуалы', 'эзотерика', 'ворожея'].filter(k => k);
                    handleInputChange('keywords', keywords);
                  }}
                  disabled={!formData.title}
                  className="h-6 px-2 text-xs"
                >
                  <Icon name="Wand2" size={12} className="mr-1" />
                  ИИ
                </Button>
              </div>
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
              disabled={!formData.title.trim() || !formData.content.trim()}
              className="w-full sm:w-auto"
            >
              Сохранить как черновик
            </Button>
            <Button
              onClick={handleSave}
              disabled={!formData.title.trim() || !formData.content.trim()}
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