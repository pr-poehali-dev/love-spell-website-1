import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { BlogPost, Category, categories, mockPosts } from '@/types/blog';
import PostsList from './blog/PostsList';
import PostEditor from './blog/PostEditor';
import AIAutoPoster from './blog/AIAutoPoster';
import CategoryManager from './blog/CategoryManager';

export default function BlogManagement() {
  const [posts, setPosts] = useState<BlogPost[]>(mockPosts);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [currentTab, setCurrentTab] = useState('manual');
  const [blogCategories, setBlogCategories] = useState<Category[]>(categories);

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

  const handleAddCategory = (newCategory: Omit<Category, 'id'>) => {
    const category: Category = {
      ...newCategory,
      id: `category-${Date.now()}`
    };
    setBlogCategories(prev => [...prev, category]);
  };

  const handleDeleteCategory = (categoryId: string) => {
    setBlogCategories(prev => prev.filter(cat => cat.id !== categoryId));
  };

  const handleBackToList = () => {
    setSelectedPost(null);
    setIsCreating(false);
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
        {currentTab === 'manual' && (
          <Button onClick={handleCreateNew} className="flex items-center gap-2">
            <Icon name="Plus" size={16} />
            Новая статья
          </Button>
        )}
      </div>

      <Tabs defaultValue="manual" className="w-full" onValueChange={setCurrentTab}>
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
            <div>
              <div className="flex items-center gap-4 mb-6">
                <Button
                  variant="outline"
                  onClick={handleBackToList}
                  className="flex items-center gap-2"
                >
                  <Icon name="ArrowLeft" size={16} />
                  К списку статей
                </Button>
              </div>
              <PostEditor
                post={selectedPost}
                onSave={handleSavePost}
                onCancel={handleBackToList}
                categories={blogCategories}
                isCreating={isCreating}
                onAddCategory={handleAddCategory}
                onDeleteCategory={handleDeleteCategory}
              />
            </div>
          ) : (
            <PostsList
              posts={posts}
              onEdit={setSelectedPost}
              onDelete={handleDeletePost}
              categories={blogCategories}
              getStatusColor={getStatusColor}
            />
          )}
        </TabsContent>

        <TabsContent value="ai" className="space-y-6">
          <AIAutoPoster categories={blogCategories} />
        </TabsContent>
      </Tabs>
    </div>
  );
}