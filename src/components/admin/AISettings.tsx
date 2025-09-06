import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface AIProvider {
  id: string;
  name: string;
  description: string;
  icon: string;
  features: string[];
  pricing: string;
  status: 'active' | 'inactive' | 'error';
}

interface AISettings {
  provider: string;
  apiKey: string;
  model: string;
  temperature: number;
  maxTokens: number;
  systemPrompt: string;
  autoGenerate: boolean;
  language: string;
  style: string;
}

const aiProviders: AIProvider[] = [
  {
    id: 'openai',
    name: 'OpenAI GPT',
    description: 'Мощная модель для генерации высококачественных текстов',
    icon: 'Bot',
    features: ['GPT-4', 'GPT-3.5-turbo', 'Генерация изображений DALL-E'],
    pricing: 'От $0.002/1K токенов',
    status: 'active'
  },
  {
    id: 'anthropic',
    name: 'Anthropic Claude',
    description: 'Надежная модель с фокусом на безопасность и качество',
    icon: 'Brain',
    features: ['Claude-3', 'Длинный контекст', 'Анализ документов'],
    pricing: 'От $0.008/1K токенов',
    status: 'inactive'
  },
  {
    id: 'yandexgpt',
    name: 'YandexGPT',
    description: 'Российская языковая модель с хорошей поддержкой русского языка',
    icon: 'MessageCircle',
    features: ['YandexGPT 3', 'Русский язык', 'Локальные данные'],
    pricing: 'От 1₽/1K токенов',
    status: 'inactive'
  },
  {
    id: 'gemini',
    name: 'Google Gemini',
    description: 'Многомодальная модель от Google с поддержкой изображений',
    icon: 'Sparkles',
    features: ['Gemini Pro', 'Vision API', 'Мультимодальность'],
    pricing: 'Бесплатно до 15 запросов/мин',
    status: 'error'
  }
];

const modelOptions = {
  openai: ['gpt-4', 'gpt-4-turbo', 'gpt-3.5-turbo'],
  anthropic: ['claude-3-opus', 'claude-3-sonnet', 'claude-3-haiku'],
  yandexgpt: ['yandexgpt', 'yandexgpt-lite'],
  gemini: ['gemini-pro', 'gemini-pro-vision']
};

export default function AISettings() {
  const [settings, setSettings] = useState<AISettings>({
    provider: 'openai',
    apiKey: '',
    model: 'gpt-4',
    temperature: 0.7,
    maxTokens: 2000,
    systemPrompt: 'Ты - опытная ворожея Раиса Ильинская. Пиши статьи о магии, ритуалах и эзотерике в дружелюбном и понятном стиле.',
    autoGenerate: false,
    language: 'ru',
    style: 'friendly'
  });

  const [isTestingConnection, setIsTestingConnection] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'none' | 'success' | 'error'>('none');

  const handleSettingsChange = (field: keyof AISettings, value: any) => {
    setSettings(prev => ({ ...prev, [field]: value }));
  };

  const handleProviderChange = (providerId: string) => {
    const newModel = modelOptions[providerId as keyof typeof modelOptions]?.[0] || '';
    setSettings(prev => ({
      ...prev,
      provider: providerId,
      model: newModel
    }));
  };

  const handleTestConnection = async () => {
    setIsTestingConnection(true);
    setConnectionStatus('none');
    
    try {
      // Имитация тестирования подключения
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      if (settings.apiKey) {
        setConnectionStatus('success');
      } else {
        setConnectionStatus('error');
      }
    } finally {
      setIsTestingConnection(false);
    }
  };

  const handleSaveSettings = () => {
    console.log('Настройки ИИ сохранены:', settings);
    // Здесь будет логика сохранения настроек
  };

  const selectedProvider = aiProviders.find(p => p.id === settings.provider);
  const availableModels = modelOptions[settings.provider as keyof typeof modelOptions] || [];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Настройки ИИ</h2>
        <p className="text-muted-foreground">Настройте провайдера ИИ для автоматической генерации контента</p>
      </div>

      {/* Выбор провайдера */}
      <Card>
        <CardHeader>
          <CardTitle>Провайдер ИИ</CardTitle>
          <CardDescription>Выберите сервис искусственного интеллекта для генерации статей</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {aiProviders.map(provider => (
              <div
                key={provider.id}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  settings.provider === provider.id
                    ? 'border-primary bg-primary/5'
                    : 'border-muted hover:border-muted-foreground/50'
                }`}
                onClick={() => handleProviderChange(provider.id)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-muted">
                      <Icon name={provider.icon as any} size={20} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold">{provider.name}</h3>
                        <Badge
                          variant={provider.status === 'active' ? 'default' : 
                                   provider.status === 'error' ? 'destructive' : 'secondary'}
                        >
                          {provider.status === 'active' ? 'Подключен' :
                           provider.status === 'error' ? 'Ошибка' : 'Неактивен'}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{provider.description}</p>
                      <div className="flex flex-wrap gap-1 mb-2">
                        {provider.features.map(feature => (
                          <span key={feature} className="text-xs px-2 py-1 bg-muted rounded">
                            {feature}
                          </span>
                        ))}
                      </div>
                      <p className="text-xs text-muted-foreground">{provider.pricing}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className={`w-4 h-4 rounded-full border-2 ${
                      settings.provider === provider.id
                        ? 'border-primary bg-primary'
                        : 'border-muted'
                    }`}>
                      {settings.provider === provider.id && (
                        <div className="w-full h-full rounded-full bg-primary"></div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Настройки выбранного провайдера */}
      {selectedProvider && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name={selectedProvider.icon as any} size={20} />
              Настройки {selectedProvider.name}
            </CardTitle>
            <CardDescription>Конфигурация подключения и параметры генерации</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* API ключ и подключение */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="apiKey">API ключ *</Label>
                <div className="flex gap-2">
                  <Input
                    id="apiKey"
                    type="password"
                    value={settings.apiKey}
                    onChange={(e) => handleSettingsChange('apiKey', e.target.value)}
                    placeholder="Введите API ключ"
                  />
                  <Button
                    variant="outline"
                    onClick={handleTestConnection}
                    disabled={isTestingConnection || !settings.apiKey}
                  >
                    {isTestingConnection ? (
                      <Icon name="Loader2" size={16} className="animate-spin" />
                    ) : (
                      <Icon name="Wifi" size={16} />
                    )}
                  </Button>
                </div>
                {connectionStatus === 'success' && (
                  <p className="text-sm text-green-600 flex items-center gap-1 mt-1">
                    <Icon name="CheckCircle" size={14} />
                    Подключение успешно
                  </p>
                )}
                {connectionStatus === 'error' && (
                  <p className="text-sm text-red-600 flex items-center gap-1 mt-1">
                    <Icon name="XCircle" size={14} />
                    Ошибка подключения
                  </p>
                )}
              </div>

              {/* Выбор модели */}
              <div>
                <Label htmlFor="model">Модель</Label>
                <Select value={settings.model} onValueChange={(value) => handleSettingsChange('model', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {availableModels.map(model => (
                      <SelectItem key={model} value={model}>{model}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Параметры генерации */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-semibold">Параметры генерации</h4>
                
                <div>
                  <Label htmlFor="temperature">Творческость (Temperature): {settings.temperature}</Label>
                  <input
                    id="temperature"
                    type="range"
                    min="0"
                    max="2"
                    step="0.1"
                    value={settings.temperature}
                    onChange={(e) => handleSettingsChange('temperature', parseFloat(e.target.value))}
                    className="w-full mt-2"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>Точно</span>
                    <span>Креативно</span>
                  </div>
                </div>

                <div>
                  <Label htmlFor="maxTokens">Максимум токенов</Label>
                  <Input
                    id="maxTokens"
                    type="number"
                    min="100"
                    max="8000"
                    value={settings.maxTokens}
                    onChange={(e) => handleSettingsChange('maxTokens', parseInt(e.target.value) || 2000)}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold">Стиль и язык</h4>
                
                <div>
                  <Label htmlFor="language">Язык</Label>
                  <Select value={settings.language} onValueChange={(value) => handleSettingsChange('language', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ru">Русский</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="uk">Українська</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="style">Стиль написания</Label>
                  <Select value={settings.style} onValueChange={(value) => handleSettingsChange('style', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="friendly">Дружелюбный</SelectItem>
                      <SelectItem value="professional">Профессиональный</SelectItem>
                      <SelectItem value="casual">Неформальный</SelectItem>
                      <SelectItem value="academic">Академический</SelectItem>
                      <SelectItem value="mystical">Мистический</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Системный промпт */}
            <div>
              <Label htmlFor="systemPrompt">Системный промпт</Label>
              <Textarea
                id="systemPrompt"
                value={settings.systemPrompt}
                onChange={(e) => handleSettingsChange('systemPrompt', e.target.value)}
                rows={4}
                placeholder="Опишите роль и стиль, которого должен придерживаться ИИ при генерации статей"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Этот текст определяет личность и стиль ИИ при генерации статей
              </p>
            </div>

            {/* Дополнительные настройки */}
            <div className="space-y-4">
              <h4 className="font-semibold">Дополнительные настройки</h4>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="autoGenerate">Автоматическая генерация</Label>
                  <p className="text-sm text-muted-foreground">Генерировать статьи по расписанию</p>
                </div>
                <Switch
                  id="autoGenerate"
                  checked={settings.autoGenerate}
                  onCheckedChange={(checked) => handleSettingsChange('autoGenerate', checked)}
                />
              </div>
            </div>

            {/* Кнопки действий */}
            <div className="flex justify-between pt-6 border-t">
              <div className="flex gap-2">
                <Button variant="outline">
                  Сбросить настройки
                </Button>
                <Button variant="outline">
                  Экспорт настроек
                </Button>
              </div>
              <Button onClick={handleSaveSettings}>
                Сохранить настройки
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Статистика использования */}
      <Card>
        <CardHeader>
          <CardTitle>Статистика использования</CardTitle>
          <CardDescription>Мониторинг расходов и использования ИИ</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">127</div>
              <p className="text-sm text-muted-foreground">Статей создано</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">₽1,240</div>
              <p className="text-sm text-muted-foreground">Потрачено в месяц</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">2.4M</div>
              <p className="text-sm text-muted-foreground">Токенов использовано</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">94%</div>
              <p className="text-sm text-muted-foreground">Успешность генерации</p>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-muted/30 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Icon name="TrendingUp" size={16} className="text-green-600" />
              <span className="font-medium">Тренд использования</span>
            </div>
            <p className="text-sm text-muted-foreground">
              За последние 30 дней сгенерировано на 23% больше статей по сравнению с предыдущим периодом
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}