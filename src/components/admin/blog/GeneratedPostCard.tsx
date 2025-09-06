import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { BlogPost, Category } from '@/types/blog';

interface GeneratedPostCardProps {
  post: BlogPost;
  onEdit: (id: string, updates: Partial<BlogPost>) => void;
  onDelete: (id: string) => void;
  categories: Category[];
}

export default function GeneratedPostCard({ post, onEdit, onDelete, categories }: GeneratedPostCardProps) {
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
      <CardContent className="p-4 md:p-6">
        <div className="flex flex-col lg:flex-row items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <Badge variant="outline" className="bg-blue-50 text-blue-700 text-xs">
                Сгенерировано
              </Badge>
              <Badge variant="outline" className="text-xs">
                {categories.find(c => c.id === post.category)?.name}
              </Badge>
              <span className="text-xs text-muted-foreground whitespace-nowrap">
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

          <div className="flex flex-row lg:flex-col gap-2 w-full lg:w-auto">
            <Button
              size="sm"
              variant="outline"
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex-1 lg:flex-none"
            >
              <Icon name={isExpanded ? 'ChevronUp' : 'ChevronDown'} size={16} />
              <span className="lg:hidden ml-2">{isExpanded ? 'Свернуть' : 'Развернуть'}</span>
            </Button>
            
            {!isEditing && (
              <>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setIsEditing(true)}
                  className="flex-1 lg:flex-none"
                >
                  <Icon name="Edit" size={16} />
                  <span className="lg:hidden ml-2">Править</span>
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onDelete(post.id)}
                  className="flex-1 lg:flex-none"
                >
                  <Icon name="Trash2" size={16} />
                  <span className="lg:hidden ml-2">Удалить</span>
                </Button>
                <Button
                  size="sm"
                  onClick={handlePublishSingle}
                  disabled={post.status === 'published'}
                  className="flex-1 lg:flex-none"
                >
                  <Icon name="Send" size={16} />
                  <span className="lg:hidden ml-2">Опубликовать</span>
                </Button>
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}