import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SecuritySettings from './SecuritySettings';
import ProfileSettings from './ProfileSettings';

const AdminSettings = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Настройки администратора</h2>
        <p className="text-muted-foreground">
          Управление аккаунтом и безопасностью
        </p>
      </div>

      <Tabs defaultValue="security" className="space-y-4">
        <TabsList className="grid w-full grid-cols-1 md:grid-cols-2">
          <TabsTrigger value="security">Безопасность</TabsTrigger>
          <TabsTrigger value="profile">Профиль</TabsTrigger>
        </TabsList>

        <TabsContent value="security" className="space-y-4">
          <SecuritySettings />
        </TabsContent>

        <TabsContent value="profile" className="space-y-4">
          <ProfileSettings />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminSettings;