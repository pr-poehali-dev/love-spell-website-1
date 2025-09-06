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