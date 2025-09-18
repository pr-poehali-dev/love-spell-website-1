import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface UserProfile {
  id: string;
  username: string;
  email: string;
  role: string;
  totpEnabled: boolean;
  lastLogin: string | null;
  createdAt: string | null;
}

interface ProfileFormData {
  email: string;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface ProfileFormProps {
  profile: UserProfile | null;
  profileForm: ProfileFormData;
  updating: boolean;
  onFormChange: (updates: Partial<ProfileFormData>) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export default function ProfileForm({ 
  profile, 
  profileForm, 
  updating, 
  onFormChange, 
  onSubmit 
}: ProfileFormProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Информация о профиле</CardTitle>
        <CardDescription>Управление основными данными аккаунта</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label htmlFor="username">Логин</Label>
              <Input
                id="username"
                value={profile?.username || ''}
                disabled
                className="bg-muted"
              />
              <p className="text-xs text-muted-foreground mt-1">Логин нельзя изменить</p>
            </div>
            
            <div>
              <Label htmlFor="role">Роль</Label>
              <div className="mt-2">
                <Badge variant="default">{profile?.role === 'admin' ? 'Администратор' : 'Пользователь'}</Badge>
              </div>
            </div>
          </div>

          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={profileForm.email}
              onChange={(e) => onFormChange({ email: e.target.value })}
              required
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label htmlFor="newPassword">Новый пароль</Label>
              <Input
                id="newPassword"
                type="password"
                value={profileForm.newPassword}
                onChange={(e) => onFormChange({ newPassword: e.target.value })}
                placeholder="Оставьте пустым, если не хотите менять"
              />
            </div>
            
            <div>
              <Label htmlFor="confirmPassword">Подтвердите пароль</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={profileForm.confirmPassword}
                onChange={(e) => onFormChange({ confirmPassword: e.target.value })}
                placeholder="Повторите новый пароль"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="currentPassword">Текущий пароль *</Label>
            <Input
              id="currentPassword"
              type="password"
              value={profileForm.currentPassword}
              onChange={(e) => onFormChange({ currentPassword: e.target.value })}
              placeholder="Введите текущий пароль для подтверждения"
              required
            />
          </div>

          <Button type="submit" disabled={updating}>
            {updating ? (
              <>
                <Icon name="Loader2" size={16} className="animate-spin mr-2" />
                Сохранение...
              </>
            ) : (
              'Сохранить изменения'
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}