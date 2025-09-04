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
    <div className="space-y-4 md:space-y-6 px-1 md:px-0">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-bold">Аналитика и статистика</h2>
          <p className="text-muted-foreground text-sm md:text-base">
            География клиентов, конверсии и метрики
          </p>
        </div>
        <Select value={dateRange} onValueChange={setDateRange}>
          <SelectTrigger className="w-full md:w-40">
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

      <Tabs defaultValue="overview" className="space-y-4 md:space-y-6">
        <div className="w-full overflow-x-auto pb-1">
          <TabsList className="inline-flex w-full min-w-max md:grid md:grid-cols-4 h-auto md:h-10 gap-1 p-1">
            <TabsTrigger value="overview" className="text-xs md:text-sm whitespace-nowrap px-3 md:px-4 py-2 flex-shrink-0">Обзор</TabsTrigger>
            <TabsTrigger value="conversions" className="text-xs md:text-sm whitespace-nowrap px-3 md:px-4 py-2 flex-shrink-0">Конверсии</TabsTrigger>
            <TabsTrigger value="geography" className="text-xs md:text-sm whitespace-nowrap px-3 md:px-4 py-2 flex-shrink-0">География</TabsTrigger>
            <TabsTrigger value="tracking" className="text-xs md:text-sm whitespace-nowrap px-3 md:px-4 py-2 flex-shrink-0">Метрики</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="overview">
          <div className="space-y-4 md:space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
              <Card>
                <CardHeader className="p-3 md:p-6 pb-2">
                  <CardTitle className="text-xs md:text-sm font-medium text-muted-foreground leading-tight">
                    Всего посетителей
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-3 md:p-6 pt-0">
                  <div className="text-lg md:text-2xl font-bold">{analyticsData.visitors.total}</div>
                  <p className="text-xs text-muted-foreground leading-tight">
                    За период
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="p-3 md:p-6 pb-2">
                  <CardTitle className="text-xs md:text-sm font-medium text-muted-foreground leading-tight">
                    Уникальные
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-3 md:p-6 pt-0">
                  <div className="text-lg md:text-2xl font-bold">{analyticsData.visitors.unique}</div>
                  <p className="text-xs text-muted-foreground leading-tight">
                    без повторов
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="p-3 md:p-6 pb-2">
                  <CardTitle className="text-xs md:text-sm font-medium text-muted-foreground leading-tight">
                    Онлайн сейчас
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-3 md:p-6 pt-0">
                  <div className="text-lg md:text-2xl font-bold text-green-600">
                    {analyticsData.visitors.online}
                  </div>
                  <p className="text-xs text-muted-foreground leading-tight">
                    активных
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="p-3 md:p-6 pb-2">
                  <CardTitle className="text-xs md:text-sm font-medium text-muted-foreground leading-tight">
                    За сегодня
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-3 md:p-6 pt-0">
                  <div className="text-lg md:text-2xl font-bold">{analyticsData.visitors.today}</div>
                  <p className="text-xs text-muted-foreground leading-tight">
                    посетителей
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader className="p-4 md:p-6 pb-3">
                <CardTitle className="text-lg md:text-xl">Динамика по дням</CardTitle>
                <CardDescription className="text-sm md:text-base">
                  Посетители и конверсии за последние дни
                </CardDescription>
              </CardHeader>
              <CardContent className="p-4 md:p-6">
                <div className="space-y-4">
                  {analyticsData.dailyStats.map((day) => (
                    <div key={day.date} className="flex flex-col md:flex-row md:items-center md:justify-between p-3 bg-muted/50 rounded-lg gap-2 md:gap-0">
                      <div className="font-medium">{day.date}</div>
                      <div className="flex flex-col md:flex-row gap-2 md:gap-6 text-sm">
                        <div className="flex items-center">
                          <Icon name="Users" size={16} className="inline mr-1" />
                          <span className="md:hidden">Посет: </span>{day.visitors}
                          <span className="hidden md:inline"> посетителей</span>
                        </div>
                        <div className="flex items-center">
                          <Icon name="Target" size={16} className="inline mr-1" />
                          <span className="md:hidden">Конв: </span>{day.conversions}
                          <span className="hidden md:inline"> конверсий</span>
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
          <div className="space-y-4 md:space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
              <Card>
                <CardHeader className="p-3 md:p-6 pb-2">
                  <CardTitle className="text-xs md:text-sm font-medium text-muted-foreground leading-tight">
                    Email заявки
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-3 md:p-6 pt-0">
                  <div className="text-lg md:text-2xl font-bold">{analyticsData.conversions.email}</div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Icon name="Mail" size={12} />
                    <span className="hidden md:inline">Через форму</span>
                    <span className="md:hidden">форма</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="p-3 md:p-6 pb-2">
                  <CardTitle className="text-xs md:text-sm font-medium text-muted-foreground leading-tight">
                    Telegram
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-3 md:p-6 pt-0">
                  <div className="text-lg md:text-2xl font-bold">{analyticsData.conversions.telegram}</div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Icon name="MessageCircle" size={12} />
                    <span className="hidden md:inline">кликов</span>
                    <span className="md:hidden">клики</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="p-3 md:p-6 pb-2">
                  <CardTitle className="text-xs md:text-sm font-medium text-muted-foreground leading-tight">
                    WhatsApp
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-3 md:p-6 pt-0">
                  <div className="text-lg md:text-2xl font-bold">{analyticsData.conversions.whatsapp}</div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Icon name="Phone" size={12} />
                    <span className="hidden md:inline">кликов</span>
                    <span className="md:hidden">клики</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="p-3 md:p-6 pb-2">
                  <CardTitle className="text-xs md:text-sm font-medium text-muted-foreground leading-tight">
                    Всего
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-3 md:p-6 pt-0">
                  <div className="text-lg md:text-2xl font-bold">{analyticsData.conversions.total}</div>
                  <div className="text-xs text-muted-foreground leading-tight">
                    <span className="hidden md:inline">Общая конверсия: </span>{((analyticsData.conversions.total / analyticsData.visitors.unique) * 100).toFixed(1)}%
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader className="p-4 md:p-6 pb-3">
                <CardTitle className="text-lg md:text-xl">Конверсия по каналам</CardTitle>
                <CardDescription className="text-sm md:text-base">
                  Эффективность различных способов связи
                </CardDescription>
              </CardHeader>
              <CardContent className="p-4 md:p-6">
                <div className="space-y-4">
                  {[
                    { name: 'Email форма', value: analyticsData.conversions.email, color: 'bg-blue-500' },
                    { name: 'Telegram', value: analyticsData.conversions.telegram, color: 'bg-cyan-500' },
                    { name: 'WhatsApp', value: analyticsData.conversions.whatsapp, color: 'bg-green-500' }
                  ].map((channel) => (
                    <div key={channel.name} className="flex items-center gap-2 md:gap-3">
                      <div className={`w-3 h-3 md:w-4 md:h-4 rounded ${channel.color} flex-shrink-0`} />
                      <div className="flex-1 flex justify-between items-center min-w-0">
                        <span className="font-medium text-sm md:text-base truncate">{channel.name}</span>
                        <div className="text-right flex-shrink-0">
                          <div className="font-bold text-sm md:text-base">{channel.value}</div>
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
            <CardHeader className="p-4 md:p-6 pb-3">
              <CardTitle className="text-lg md:text-xl">География посетителей</CardTitle>
              <CardDescription className="text-sm md:text-base">
                Распределение посетителей по странам
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4 md:p-6">
              <div className="space-y-4">
                {analyticsData.geography.map((country) => (
                  <div key={country.country} className="flex items-center justify-between p-3 md:p-4 border rounded-lg">
                    <div className="flex items-center gap-2 md:gap-3 min-w-0 flex-1">
                      <div className="w-6 h-6 md:w-8 md:h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <Icon name="MapPin" size={14} className="md:w-4 md:h-4" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="font-medium text-sm md:text-base truncate">{country.country}</div>
                        <div className="text-xs md:text-sm text-muted-foreground">
                          {country.visitors} <span className="hidden md:inline">посетителей</span><span className="md:hidden">пос.</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="text-lg md:text-2xl font-bold">{country.percent}%</div>
                      <div className="w-12 md:w-20 h-2 bg-muted rounded-full overflow-hidden">
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
          <div className="space-y-4 md:space-y-6">
            <Card>
              <CardHeader className="p-4 md:p-6 pb-3">
                <CardTitle className="text-lg md:text-xl">Код счетчика</CardTitle>
                <CardDescription className="text-sm md:text-base">
                  Вставьте код Google Analytics, Яндекс.Метрики или другого счетчика
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 p-4 md:p-6">
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
                <Button onClick={handleSaveTracking} className="w-full md:w-auto">
                  <Icon name="Save" size={16} className="mr-2" />
                  Сохранить код
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="p-4 md:p-6 pb-3">
                <CardTitle className="text-lg md:text-xl">Популярные метрики</CardTitle>
                <CardDescription className="text-sm md:text-base">
                  Рекомендуемые системы аналитики для отслеживания
                </CardDescription>
              </CardHeader>
              <CardContent className="p-4 md:p-6">
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
                    <div key={service.name} className="p-3 md:p-4 border rounded-lg">
                      <div className="flex items-start gap-2 md:gap-3">
                        <div className="w-8 h-8 md:w-10 md:h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Icon name={service.icon as any} size={16} className="md:w-5 md:h-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-sm md:text-base">{service.name}</h4>
                          <p className="text-xs md:text-sm text-muted-foreground mb-2 leading-tight">
                            {service.description}
                          </p>
                          <Button variant="outline" size="sm" asChild className="w-full md:w-auto">
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