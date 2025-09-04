import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';

const Analytics = () => {
  const [dateRange, setDateRange] = useState('7days');
  const [trackingCode, setTrackingCode] = useState('');

  // Mock analytics data
  const analyticsData = {
    visitors: {
      total: 1247,
      unique: 892,
      online: 8,
      today: 64
    },
    conversions: {
      email: 23,
      telegram: 15,
      whatsapp: 8,
      total: 46
    },
    geography: [
      { country: 'Россия', visitors: 412, percent: 68 },
      { country: 'Украина', visitors: 124, percent: 20 },
      { country: 'Беларусь', visitors: 45, percent: 7 },
      { country: 'Казахстан', visitors: 31, percent: 5 }
    ],
    dailyStats: [
      { date: '01.09', visitors: 45, conversions: 3 },
      { date: '02.09', visitors: 52, conversions: 4 },
      { date: '03.09', visitors: 38, conversions: 2 },
      { date: '04.09', visitors: 64, conversions: 5 },
      { date: '05.09', visitors: 71, conversions: 6 },
      { date: '06.09', visitors: 48, conversions: 3 },
      { date: '07.09', visitors: 58, conversions: 4 }
    ]
  };

  const handleSaveTracking = async () => {
    // TODO: API call to save tracking code
    console.log('Saving tracking code:', trackingCode);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Аналитика и статистика</h2>
          <p className="text-muted-foreground">
            География клиентов, конверсии и метрики
          </p>
        </div>
        <Select value={dateRange} onValueChange={setDateRange}>
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="today">Сегодня</SelectItem>
            <SelectItem value="7days">7 дней</SelectItem>
            <SelectItem value="30days">30 дней</SelectItem>
            <SelectItem value="90days">90 дней</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Обзор</TabsTrigger>
          <TabsTrigger value="conversions">Конверсии</TabsTrigger>
          <TabsTrigger value="geography">География</TabsTrigger>
          <TabsTrigger value="tracking">Метрики</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Всего посетителей
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{analyticsData.visitors.total}</div>
                  <p className="text-xs text-muted-foreground">
                    За выбранный период
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Уникальные посетители
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{analyticsData.visitors.unique}</div>
                  <p className="text-xs text-muted-foreground">
                    Без повторных заходов
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Онлайн сейчас
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">
                    {analyticsData.visitors.online}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Активных пользователей
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    За сегодня
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{analyticsData.visitors.today}</div>
                  <p className="text-xs text-muted-foreground">
                    Посетителей сегодня
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Динамика по дням</CardTitle>
                <CardDescription>
                  Посетители и конверсии за последние дни
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analyticsData.dailyStats.map((day) => (
                    <div key={day.date} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div className="font-medium">{day.date}</div>
                      <div className="flex gap-6 text-sm">
                        <div>
                          <Icon name="Users" size={16} className="inline mr-1" />
                          {day.visitors} посетителей
                        </div>
                        <div>
                          <Icon name="Target" size={16} className="inline mr-1" />
                          {day.conversions} конверсий
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="conversions">
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Email заявки
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{analyticsData.conversions.email}</div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Icon name="Mail" size={12} />
                    Через форму контактов
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Telegram переходы
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{analyticsData.conversions.telegram}</div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Icon name="MessageCircle" size={12} />
                    Кликов по Telegram
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    WhatsApp переходы
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{analyticsData.conversions.whatsapp}</div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Icon name="Phone" size={12} />
                    Кликов по WhatsApp
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Всего конверсий
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{analyticsData.conversions.total}</div>
                  <div className="text-xs text-muted-foreground">
                    Общая конверсия: {((analyticsData.conversions.total / analyticsData.visitors.unique) * 100).toFixed(1)}%
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Конверсия по каналам</CardTitle>
                <CardDescription>
                  Эффективность различных способов связи
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: 'Email форма', value: analyticsData.conversions.email, color: 'bg-blue-500' },
                    { name: 'Telegram', value: analyticsData.conversions.telegram, color: 'bg-cyan-500' },
                    { name: 'WhatsApp', value: analyticsData.conversions.whatsapp, color: 'bg-green-500' }
                  ].map((channel) => (
                    <div key={channel.name} className="flex items-center gap-3">
                      <div className={`w-4 h-4 rounded ${channel.color}`} />
                      <div className="flex-1 flex justify-between items-center">
                        <span className="font-medium">{channel.name}</span>
                        <div className="text-right">
                          <div className="font-bold">{channel.value}</div>
                          <div className="text-xs text-muted-foreground">
                            {((channel.value / analyticsData.conversions.total) * 100).toFixed(0)}%
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="geography">
          <Card>
            <CardHeader>
              <CardTitle>География посетителей</CardTitle>
              <CardDescription>
                Распределение посетителей по странам
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analyticsData.geography.map((country) => (
                  <div key={country.country} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                        <Icon name="MapPin" size={16} />
                      </div>
                      <div>
                        <div className="font-medium">{country.country}</div>
                        <div className="text-sm text-muted-foreground">
                          {country.visitors} посетителей
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold">{country.percent}%</div>
                      <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary transition-all"
                          style={{ width: `${country.percent}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tracking">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Код счетчика</CardTitle>
                <CardDescription>
                  Вставьте код Google Analytics, Яндекс.Метрики или другого счетчика
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="tracking-code">HTML код счетчика</Label>
                  <Textarea
                    id="tracking-code"
                    rows={10}
                    value={trackingCode}
                    onChange={(e) => setTrackingCode(e.target.value)}
                    placeholder={`<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>

<!-- Яндекс.Метрика -->
<script type="text/javascript">
   (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
   m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
   (window, document, "script", "https://mc.yandex.ru/metrika/watch.js", "ym");
   ym(COUNTER_ID, "init", {
        clickmap:true,
        trackLinks:true,
        accurateTrackBounce:true
   });
</script>`}
                  />
                </div>
                <Button onClick={handleSaveTracking}>
                  <Icon name="Save" size={16} className="mr-2" />
                  Сохранить код
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Популярные метрики</CardTitle>
                <CardDescription>
                  Рекомендуемые системы аналитики для отслеживания
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    {
                      name: 'Google Analytics',
                      description: 'Подробная аналитика посещений и поведения',
                      icon: 'BarChart3',
                      link: 'https://analytics.google.com'
                    },
                    {
                      name: 'Яндекс.Метрика',
                      description: 'Российская система веб-аналитики',
                      icon: 'TrendingUp',
                      link: 'https://metrica.yandex.ru'
                    },
                    {
                      name: 'Hotjar',
                      description: 'Тепловые карты и записи сессий',
                      icon: 'MousePointer',
                      link: 'https://www.hotjar.com'
                    },
                    {
                      name: 'Facebook Pixel',
                      description: 'Отслеживание для рекламы в Facebook',
                      icon: 'Target',
                      link: 'https://www.facebook.com/business/tools/meta-pixel'
                    }
                  ].map((service) => (
                    <div key={service.name} className="p-4 border rounded-lg">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                          <Icon name={service.icon as any} size={20} />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium">{service.name}</h4>
                          <p className="text-sm text-muted-foreground mb-2">
                            {service.description}
                          </p>
                          <Button variant="outline" size="sm" asChild>
                            <a href={service.link} target="_blank" rel="noopener noreferrer">
                              <Icon name="ExternalLink" size={14} className="mr-1" />
                              Перейти
                            </a>
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Analytics;