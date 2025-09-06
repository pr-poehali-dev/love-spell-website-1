import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { Category } from '@/types/blog';

interface CategoryManagerProps {
  categories: Category[];
  onAddCategory: (category: Omit<Category, 'id'>) => void;
  onDeleteCategory: (id: string) => void;
  trigger?: React.ReactNode;
}

export default function CategoryManager({ categories, onAddCategory, onDeleteCategory, trigger }: CategoryManagerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategoryColor, setNewCategoryColor] = useState('#8B5CF6');
  const [categoryToDelete, setCategoryToDelete] = useState<string | null>(null);

  const handleAddCategory = () => {
    if (!newCategoryName.trim()) return;
    
    const newCategory = {
      name: newCategoryName.trim(),
      color: newCategoryColor,
      count: 0
    };
    
    onAddCategory(newCategory);
    setNewCategoryName('');
    setNewCategoryColor('#8B5CF6');
  };

  const handleDeleteCategory = (categoryId: string) => {
    setCategoryToDelete(categoryId);
  };

  const confirmDelete = () => {
    if (categoryToDelete) {
      onDeleteCategory(categoryToDelete);
      setCategoryToDelete(null);
    }
  };

  const cancelDelete = () => {
    setCategoryToDelete(null);
  };

  const colorOptions = [
    '#8B5CF6', // purple
    '#EF4444', // red  
    '#10B981', // green
    '#F59E0B', // amber
    '#3B82F6', // blue
    '#8B5A2B', // brown
    '#EC4899', // pink
    '#6B7280'  // gray
  ];

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" size="sm" className="h-6 px-2 text-xs">
            <Icon name="Settings" size={12} className="mr-1" />
            Управление
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Управление категориями</DialogTitle>
          <DialogDescription>
            Добавляйте новые категории или удаляйте существующие
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Список существующих категорий */}
          <div>
            <h4 className="font-medium text-sm mb-2">Существующие категории:</h4>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {categories.map((category) => (
                <div key={category.id} className="flex items-center justify-between p-2 border rounded">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: category.color }}
                    />
                    <span className="text-sm">{category.name}</span>
                    <span className="text-xs text-muted-foreground">({category.count})</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteCategory(category.id)}
                    className="h-6 w-6 p-0 text-destructive hover:text-destructive hover:bg-destructive/10"
                  >
                    <Icon name="Trash2" size={12} />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Модальное окно подтверждения удаления */}
          {categoryToDelete && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
              <div className="bg-background border rounded-lg p-6 max-w-sm w-full mx-4">
                <h3 className="font-semibold text-lg mb-2">Удалить категорию?</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Вы уверены, что хотите удалить эту категорию? Это действие нельзя отменить.
                </p>
                <div className="flex gap-2 justify-end">
                  <Button variant="outline" onClick={cancelDelete} size="sm">
                    Отмена
                  </Button>
                  <Button variant="destructive" onClick={confirmDelete} size="sm">
                    Удалить
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Добавление новой категории */}
          <div className="border-t pt-4">
            <h4 className="font-medium text-sm mb-3">Добавить новую категорию:</h4>
            <div className="space-y-3">
              <div>
                <Label htmlFor="categoryName">Название категории</Label>
                <Input
                  id="categoryName"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  placeholder="Введите название категории"
                  className="mt-1"
                  onKeyPress={(e) => e.key === 'Enter' && handleAddCategory()}
                />
              </div>
              
              <div>
                <Label>Цвет категории</Label>
                <div className="flex gap-2 mt-2 flex-wrap">
                  {colorOptions.map((color) => (
                    <button
                      key={color}
                      type="button"
                      className={`w-6 h-6 rounded-full border-2 transition-all ${
                        newCategoryColor === color 
                          ? 'border-foreground scale-110' 
                          : 'border-muted-foreground/30 hover:border-muted-foreground/60'
                      }`}
                      style={{ backgroundColor: color }}
                      onClick={() => setNewCategoryColor(color)}
                    />
                  ))}
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button
                  onClick={handleAddCategory}
                  disabled={!newCategoryName.trim()}
                  className="flex-1"
                >
                  <Icon name="Plus" size={16} className="mr-2" />
                  Добавить категорию
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setIsOpen(false)}
                >
                  Закрыть
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}