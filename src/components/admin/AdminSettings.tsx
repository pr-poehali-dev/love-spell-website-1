import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SecuritySettings from './SecuritySettings';
import ProfileSettings from './ProfileSettings';

const AdminSettings = () => {
  return (
    <div className="space-y-4 md:space-y-6 px-1 md:px-0">
      <div>
        <h2 className="text-xl md:text-3xl font-bold tracking-tight">Настройки администратора</h2>
        <p className="text-muted-foreground text-sm md:text-base">
          Управление аккаунтом и безопасностью
        </p>
      </div>

      <Tabs defaultValue="security" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2 h-auto">
          <TabsTrigger value="security" className="text-sm md:text-base py-2">Безопасность</TabsTrigger>
          <TabsTrigger value="profile" className="text-sm md:text-base py-2">Профиль</TabsTrigger>
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