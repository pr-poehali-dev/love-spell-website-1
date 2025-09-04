import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
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
  const [cdnSettings, setCdnSettings] = useState({
    enabled: false,
    cdnUrl: '',
    originalUrl: ''
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
          <Button variant="outline" size="sm" className="w-full md:w-auto">
            <Icon name="Edit" size={16} className="mr-2" />
            Изменить
          </Button>
        </DialogTrigger>
        <DialogContent className="w-[95vw] max-w-md mx-auto">
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
            <div className="flex flex-col md:flex-row gap-2">
              <Button 
                onClick={() => {
                  setContacts(prev => ({ ...prev, [type]: tempValue }));
                }}
                className="w-full md:w-auto"
              >
                Сохранить
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setTempValue(value)}
                className="w-full md:w-auto"
              >
                Отмена
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  };

  return (
    <div className="space-y-6 px-1 md:px-0">
      <div>
        <h2 className="text-xl md:text-2xl font-bold">Настройки сайта</h2>
        <p className="text-sm md:text-base text-muted-foreground">
          Управление внешним видом и контактной информацией
        </p>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <div className="w-full overflow-x-auto">
          <TabsList className="inline-flex w-full min-w-max md:grid md:grid-cols-3 h-auto md:h-10">
            <TabsTrigger value="general" className="text-xs md:text-sm whitespace-nowrap px-4 md:px-3">Основные и Дизайн</TabsTrigger>
            <TabsTrigger value="contacts" className="text-xs md:text-sm whitespace-nowrap px-4 md:px-3">Контакты</TabsTrigger>
            <TabsTrigger value="cdn" className="text-xs md:text-sm whitespace-nowrap px-4 md:px-3">CDN</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="general">
          <Card>
            <CardHeader className="p-4 md:p-6 pb-3">
              <CardTitle className="text-lg md:text-xl">Основная информация и дизайн</CardTitle>
              <CardDescription className="text-sm md:text-base">
                Аватар, имя, favicon и элементы дизайна сайта
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 p-4 md:p-6">
              {/* Avatar Section */}
              <div className="space-y-4">
                <Label>Аватар</Label>
                <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                  <div className="w-20 h-20 rounded-full overflow-hidden bg-muted mx-auto md:mx-0">
                    <img 
                      src={avatar} 
                      alt="Avatar" 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/api/placeholder/80/80';
                      }}
                    />
                  </div>
                  <div className="space-y-2 w-full">
                    <input
                      type="file"
                      id="avatar-upload"
                      accept="image/*"
                      className="hidden"
                      onChange={handleAvatarUpload}
                    />
                    <Label htmlFor="avatar-upload" className="cursor-pointer">
                      <Button variant="outline" type="button" className="w-full md:w-auto">
                        <Icon name="Upload" size={16} className="mr-2" />
                        Загрузить аватар
                      </Button>
                    </Label>
                    <p className="text-xs md:text-sm text-muted-foreground text-center md:text-left">
                      Размер: 200x200px, JPG или PNG
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

              {/* Favicon Section */}
              <div className="space-y-4">
                <Label>Favicon сайта</Label>
                <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                  <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted border mx-auto md:mx-0 flex items-center justify-center">
                    <img 
                      src="/favicon.svg" 
                      alt="Favicon" 
                      className="w-10 h-10 object-contain"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/api/placeholder/40/40';
                      }}
                    />
                  </div>
                  <div className="space-y-2 w-full">
                    <input
                      type="file"
                      id="favicon-upload"
                      accept=".ico,.svg,.png"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          console.log('Uploading favicon:', file.name);
                          // TODO: Implement favicon upload
                        }
                      }}
                    />
                    <Label htmlFor="favicon-upload" className="cursor-pointer">
                      <Button variant="outline" type="button" className="w-full md:w-auto">
                        <Icon name="Upload" size={16} className="mr-2" />
                        Загрузить favicon
                      </Button>
                    </Label>
                    <p className="text-xs md:text-sm text-muted-foreground text-center md:text-left">
                      Размер: 32x32px, ICO, SVG или PNG
                    </p>
                  </div>
                </div>
              </div>

              {/* Hero Background Section */}
              <div className="space-y-4">
                <Label>Фон главного блока</Label>
                <div className="space-y-4">
                  <div className="w-full h-32 md:h-40 rounded-lg overflow-hidden bg-muted border">
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
                      <Button variant="outline" type="button" className="w-full md:w-auto">
                        <Icon name="Upload" size={16} className="mr-2" />
                        Загрузить фон
                      </Button>
                    </Label>
                    <p className="text-xs md:text-sm text-muted-foreground">
                      Размер: 1920x1080px, JPG или PNG
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contacts">
          <Card>
            <CardHeader className="p-4 md:p-6 pb-3">
              <CardTitle className="text-lg md:text-xl">Контактная информация</CardTitle>
              <CardDescription className="text-sm md:text-base">
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
                <div key={contact.type} className="flex flex-col md:flex-row md:items-center justify-between p-4 border rounded-lg gap-3 md:gap-0">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Icon name={contact.icon as any} size={20} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-medium">{contact.label}</p>
                      <p className="text-sm text-muted-foreground truncate">
                        {contacts[contact.type as keyof typeof contacts] || 'Не указано'}
                      </p>
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    <ContactEditModal
                      type={contact.type}
                      label={contact.label}
                      value={contacts[contact.type as keyof typeof contacts]}
                      placeholder={contact.placeholder}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>



        <TabsContent value="cdn">
          <Card>
            <CardHeader className="p-4 md:p-6 pb-3">
              <CardTitle className="text-lg md:text-xl">CDN настройки</CardTitle>
              <CardDescription className="text-sm md:text-base">
                Настройка кастомного CDN для ускорения загрузки сайта
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 p-4 md:p-6">
              {/* CDN Enable/Disable */}
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h4 className="font-medium text-sm md:text-base">Включить CDN</h4>
                  <p className="text-xs md:text-sm text-muted-foreground">
                    {cdnSettings.enabled ? 'CDN активен' : 'CDN отключен'}
                  </p>
                </div>
                <Switch
                  checked={cdnSettings.enabled}
                  onCheckedChange={(checked) => 
                    setCdnSettings(prev => ({ ...prev, enabled: checked }))
                  }
                />
              </div>

              {cdnSettings.enabled && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="cdn-url">CDN URL</Label>
                    <Input
                      id="cdn-url"
                      type="url"
                      value={cdnSettings.cdnUrl}
                      onChange={(e) => 
                        setCdnSettings(prev => ({ ...prev, cdnUrl: e.target.value }))
                      }
                      placeholder="https://cdn.example.com"
                    />
                    <p className="text-xs text-muted-foreground">
                      URL вашего CDN сервиса (например, CloudFront, CloudFlare)
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="original-url">Оригинальный URL сайта</Label>
                    <Input
                      id="original-url"
                      type="url"
                      value={cdnSettings.originalUrl}
                      onChange={(e) => 
                        setCdnSettings(prev => ({ ...prev, originalUrl: e.target.value }))
                      }
                      placeholder="https://yoursite.com"
                    />
                    <p className="text-xs text-muted-foreground">
                      Основной URL вашего сайта для настройки Origin в CDN
                    </p>
                  </div>


                </div>
              )}

              {/* CDN Info */}
              <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-start gap-3">
                  <Icon name="AlertCircle" size={16} className="text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h5 className="font-medium text-blue-900 text-sm">Информация о CDN</h5>
                    <p className="text-blue-700 text-xs mt-1 leading-relaxed">
                      CDN автоматически заменяет ссылки на фотографии, видео, стили, шрифты и другие статические файлы 
                      на быстрые серверы по всему миру, значительно ускоряя загрузку всех ресурсов сайта.
                    </p>
                    <ul className="text-blue-700 text-xs mt-2 space-y-1">
                      <li>• Быстрая загрузка статических файлов</li>
                      <li>• Снижение нагрузки на основной сервер</li>
                      <li>• Улучшение SEO за счет скорости</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Button onClick={handleSave} className="w-full md:w-auto">
        <Icon name="Save" size={16} className="mr-2" />
        Сохранить изменения
      </Button>
    </div>
  );
};

export default SiteSettings;