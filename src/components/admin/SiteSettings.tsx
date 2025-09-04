import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';

const SiteSettings = () => {
  const [avatar, setAvatar] = useState('/default-avatar.jpg');
  const [name, setName] = useState('Анастасия');
  const [heroBackground, setHeroBackground] = useState('/hero-bg.jpg');
  const [contacts, setContacts] = useState({
    telegram: '@anastasia_magic',
    whatsapp: '+7900123456',
    phone: '+7900123456',
    email: 'info@example.com'
  });

  const handleAvatarUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // TODO: Implement file upload to server
      // const formData = new FormData();
      // formData.append('avatar', file);
      // const response = await api.uploadAvatar(formData);
      // setAvatar(response.url);
      
      // Temporary preview
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setAvatar(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleHeroBackgroundUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // TODO: Implement file upload to server
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setHeroBackground(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    // TODO: Implement save API call
    // const response = await api.updateSiteSettings({
    //   avatar,
    //   name,
    //   heroBackground,
    //   contacts
    // });
    console.log('Saving settings...', { avatar, name, heroBackground, contacts });
  };

  const ContactEditModal = ({ type, label, value, placeholder }: {
    type: string;
    label: string;
    value: string;
    placeholder: string;
  }) => {
    const [tempValue, setTempValue] = useState(value);

    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm">
            <Icon name="Edit" size={16} className="mr-2" />
            Изменить
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Изменить {label}</DialogTitle>
            <DialogDescription>
              Обновите контактную информацию для {label.toLowerCase()}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor={type}>{label}</Label>
              <Input
                id={type}
                value={tempValue}
                onChange={(e) => setTempValue(e.target.value)}
                placeholder={placeholder}
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={() => {
                setContacts(prev => ({ ...prev, [type]: tempValue }));
              }}>
                Сохранить
              </Button>
              <Button variant="outline" onClick={() => setTempValue(value)}>
                Отмена
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Настройки сайта</h2>
        <p className="text-muted-foreground">
          Управление внешним видом и контактной информацией
        </p>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="general">Основные</TabsTrigger>
          <TabsTrigger value="contacts">Контакты</TabsTrigger>
          <TabsTrigger value="design">Дизайн</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>Основная информация</CardTitle>
              <CardDescription>
                Аватар и имя, отображаемые на сайте
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Avatar Section */}
              <div className="space-y-4">
                <Label>Аватар</Label>
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 rounded-full overflow-hidden bg-muted">
                    <img 
                      src={avatar} 
                      alt="Avatar" 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/api/placeholder/80/80';
                      }}
                    />
                  </div>
                  <div className="space-y-2">
                    <input
                      type="file"
                      id="avatar-upload"
                      accept="image/*"
                      className="hidden"
                      onChange={handleAvatarUpload}
                    />
                    <Label htmlFor="avatar-upload" className="cursor-pointer">
                      <Button variant="outline" type="button">
                        <Icon name="Upload" size={16} className="mr-2" />
                        Загрузить аватар
                      </Button>
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Рекомендуемый размер: 200x200px, JPG или PNG
                    </p>
                  </div>
                </div>
              </div>

              {/* Name Section */}
              <div className="space-y-2">
                <Label htmlFor="name">Имя</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Введите ваше имя"
                />
                <p className="text-sm text-muted-foreground">
                  Это имя будет отображаться на всех страницах сайта
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contacts">
          <Card>
            <CardHeader>
              <CardTitle>Контактная информация</CardTitle>
              <CardDescription>
                Настройки для модального окна "Выберите способ связи"
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { type: 'telegram', label: 'Telegram', icon: 'MessageCircle', placeholder: '@username' },
                { type: 'whatsapp', label: 'WhatsApp', icon: 'Phone', placeholder: '+7900123456' },
                { type: 'phone', label: 'Телефон', icon: 'Phone', placeholder: '+7900123456' },
                { type: 'email', label: 'Email', icon: 'Mail', placeholder: 'info@example.com' }
              ].map((contact) => (
                <div key={contact.type} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Icon name={contact.icon as any} size={20} />
                    </div>
                    <div>
                      <p className="font-medium">{contact.label}</p>
                      <p className="text-sm text-muted-foreground">
                        {contacts[contact.type as keyof typeof contacts] || 'Не указано'}
                      </p>
                    </div>
                  </div>
                  <ContactEditModal
                    type={contact.type}
                    label={contact.label}
                    value={contacts[contact.type as keyof typeof contacts]}
                    placeholder={contact.placeholder}
                  />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="design">
          <Card>
            <CardHeader>
              <CardTitle>Дизайн сайта</CardTitle>
              <CardDescription>
                Фон героя блока и другие элементы дизайна
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Hero Background */}
              <div className="space-y-4">
                <Label>Фон главного блока</Label>
                <div className="space-y-4">
                  <div className="w-full h-32 rounded-lg overflow-hidden bg-muted border">
                    <img 
                      src={heroBackground} 
                      alt="Hero Background" 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/api/placeholder/400/128';
                      }}
                    />
                  </div>
                  <div className="space-y-2">
                    <input
                      type="file"
                      id="hero-bg-upload"
                      accept="image/*"
                      className="hidden"
                      onChange={handleHeroBackgroundUpload}
                    />
                    <Label htmlFor="hero-bg-upload" className="cursor-pointer">
                      <Button variant="outline" type="button">
                        <Icon name="Upload" size={16} className="mr-2" />
                        Загрузить фон
                      </Button>
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Рекомендуемый размер: 1920x1080px, JPG или PNG
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex gap-3">
        <Button onClick={handleSave}>
          <Icon name="Save" size={16} className="mr-2" />
          Сохранить изменения
        </Button>
        <Button variant="outline">
          <Icon name="Eye" size={16} className="mr-2" />
          Предварительный просмотр
        </Button>
      </div>
    </div>
  );
};

export default SiteSettings;