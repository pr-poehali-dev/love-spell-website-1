import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { BlogPost, Category } from '@/types/blog';

interface PostsListProps {
  posts: BlogPost[];
  onEdit: (post: BlogPost) => void;
  onDelete: (id: string) => void;
  categories: Category[];
  getStatusColor: (status: BlogPost['status']) => string;
}

export default function PostsList({ posts, onEdit, onDelete, categories, getStatusColor }: PostsListProps) {
  return (
    <div className="grid gap-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h3 className="text-lg font-semibold">Все статьи ({posts.length})</h3>
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <Input placeholder="Поиск статей..." className="w-full sm:w-64" />
          <Select>
            <SelectTrigger className="w-full sm:w-40">
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
          <CardContent className="p-4 md:p-6">
            <div className="flex items-start gap-3 md:gap-4">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                {post.image ? (
                  <img src={post.image} alt="" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Icon name="Image" size={20} className="md:w-6 md:h-6 text-muted-foreground" />
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
                    <div className="flex flex-wrap items-center gap-2 md:gap-4 mt-3">
                      <Badge variant="outline" className={getStatusColor(post.status)}>
                        {post.status === 'published' ? 'Опубликовано' : 
                         post.status === 'draft' ? 'Черновик' : 'Запланировано'}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {categories.find(c => c.id === post.category)?.name}
                      </span>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Icon name="Calendar" size={12} />
                        <span className="hidden sm:inline">{new Date(post.publishedDate).toLocaleDateString('ru-RU')}</span>
                        <span className="sm:hidden">{new Date(post.publishedDate).toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit' })}</span>
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