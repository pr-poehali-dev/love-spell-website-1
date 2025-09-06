import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';

interface AIProvider {
  id: string;
  name: string;
  description: string;
  icon: string;
  features: string[];
  pricing: string;
  status: 'active' | 'inactive' | 'error';
  models: string[];
}

interface AISettings {
  provider: string;
  apiKey: string;
  model: string;
  temperature: number;
  maxTokens: number;
}

const aiProviders: AIProvider[] = [
  {
    id: 'openai',
    name: 'OpenAI GPT',
    description: 'Мощная модель для генерации высококачественных текстов',
    icon: 'Bot',
    features: ['GPT-4', 'GPT-3.5-turbo', 'Генерация изображений DALL-E'],
    pricing: 'От $0.002/1K токенов',
    status: 'active',
    models: ['gpt-4', 'gpt-4-turbo', 'gpt-3.5-turbo']
  },
  {
    id: 'anthropic',
    name: 'Anthropic Claude',
    description: 'Надежная модель с фокусом на безопасность и качество',
    icon: 'Brain',
    features: ['Claude-3', 'Длинный контекст', 'Анализ документов'],
    pricing: 'От $0.008/1K токенов',
    status: 'inactive',
    models: ['claude-3-opus', 'claude-3-sonnet', 'claude-3-haiku']
  },
  {
    id: 'yandexgpt',
    name: 'YandexGPT',
    description: 'Российская языковая модель с хорошей поддержкой русского языка',
    icon: 'MessageCircle',
    features: ['YandexGPT 3', 'Русский язык', 'Локальные данные'],
    pricing: 'От 1₽/1K токенов',
    status: 'inactive',
    models: ['yandexgpt', 'yandexgpt-lite']
  },
  {
    id: 'gemini',
    name: 'Google Gemini',
    description: 'Многомодальная модель от Google с поддержкой изображений',
    icon: 'Sparkles',
    features: ['Gemini Pro', 'Vision API', 'Мультимодальность'],
    pricing: 'Бесплатно до 15 запросов/мин',
    status: 'error',
    models: ['gemini-pro', 'gemini-pro-vision']
  }
];

export default function AISettings() {
  const [selectedProvider, setSelectedProvider] = useState<string | null>(null);
  const [providerSettings, setProviderSettings] = useState<Record<string, AISettings>>({});

  const handleProviderSelect = (providerId: string) => {
    setSelectedProvider(providerId);
  };

  const handleSaveProviderSettings = (providerId: string, settings: AISettings) => {
    setProviderSettings(prev => ({
      ...prev,
      [providerId]: settings
    }));
    setSelectedProvider(null);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Настройки ИИ</h2>
        <p className="text-muted-foreground">Настройте провайдеров ИИ для автоматической генерации контента</p>
      </div>

      {/* Выбор провайдера */}
      <Card>
        <CardHeader>
          <CardTitle>Провайдеры ИИ</CardTitle>
          <CardDescription>Выберите и настройте сервисы искусственного интеллекта</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2">
            {aiProviders.map(provider => (
              <div
                key={provider.id}
                className="p-4 md:p-5 rounded-lg border-2 transition-all hover:border-muted-foreground/50"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-muted flex-shrink-0">
                      <Icon name={provider.icon as any} size={20} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                        <h3 className="font-semibold text-base">{provider.name}</h3>
                        <Badge
                          variant={provider.status === 'active' ? 'default' : 
                                   provider.status === 'error' ? 'destructive' : 'secondary'}
                          className="w-fit"
                        >
                          {provider.status === 'active' ? 'Настроен' :
                           provider.status === 'error' ? 'Ошибка' : 'Не настроен'}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                        {provider.description}
                      </p>
                      <div className="flex flex-wrap gap-1 mb-3">
                        {provider.features.map(feature => (
                          <span key={feature} className="text-xs px-2 py-1 bg-muted rounded text-muted-foreground">
                            {feature}
                          </span>
                        ))}
                      </div>
                      <p className="text-xs text-muted-foreground font-medium">{provider.pricing}</p>
                    </div>
                  </div>
                </div>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="w-full"
                      onClick={() => handleProviderSelect(provider.id)}
                    >
                      <Icon name="Settings" size={16} className="mr-2" />
                      Настроить
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle className="flex items-center gap-2">
                        <Icon name={provider.icon as any} size={20} />
                        Настройки {provider.name}
                      </DialogTitle>
                      <DialogDescription>
                        Настройте подключение к {provider.name}
                      </DialogDescription>
                    </DialogHeader>
                    
                    <ProviderSettingsForm 
                      provider={provider}
                      onSave={(settings) => handleSaveProviderSettings(provider.id, settings)}
                      existingSettings={providerSettings[provider.id]}
                    />
                  </DialogContent>
                </Dialog>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Статистика использования */}
      <Card>
        <CardHeader>
          <CardTitle>Статистика использования</CardTitle>
          <CardDescription>Мониторинг расходов и использования ИИ</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            <div className="text-center p-4 md:p-0">
              <div className="text-xl md:text-2xl font-bold text-primary">127</div>
              <p className="text-xs md:text-sm text-muted-foreground">Статей создано</p>
            </div>
            <div className="text-center p-4 md:p-0">
              <div className="text-xl md:text-2xl font-bold text-green-600">₽1,240</div>
              <p className="text-xs md:text-sm text-muted-foreground">Потрачено в месяц</p>
            </div>
            <div className="text-center p-4 md:p-0">
              <div className="text-xl md:text-2xl font-bold text-blue-600">2.4M</div>
              <p className="text-xs md:text-sm text-muted-foreground">Токенов использовано</p>
            </div>
            <div className="text-center p-4 md:p-0">
              <div className="text-xl md:text-2xl font-bold text-orange-600">94%</div>
              <p className="text-xs md:text-sm text-muted-foreground">Успешность генерации</p>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-muted/30 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Icon name="TrendingUp" size={16} className="text-green-600 flex-shrink-0" />
              <span className="font-medium text-sm md:text-base">Тренд использования</span>
            </div>
            <p className="text-xs md:text-sm text-muted-foreground">
              За последние 30 дней сгенерировано на 23% больше статей по сравнению с предыдущим периодом
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

interface ProviderSettingsFormProps {
  provider: AIProvider;
  onSave: (settings: AISettings) => void;
  existingSettings?: AISettings;
}

function ProviderSettingsForm({ provider, onSave, existingSettings }: ProviderSettingsFormProps) {
  const [settings, setSettings] = useState<AISettings>(existingSettings || {
    provider: provider.id,
    apiKey: '',
    model: provider.models[0] || '',
    temperature: 0.7,
    maxTokens: 2000,
  });
  const [isTestingConnection, setIsTestingConnection] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'none' | 'success' | 'error'>('none');

  const handleTestConnection = async () => {
    setIsTestingConnection(true);
    setConnectionStatus('none');
    
    try {
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

  const handleSave = () => {
    onSave(settings);
  };

  return (
    <div className="space-y-4 md:space-y-6">
      {/* API ключ и подключение */}
      <div className="space-y-4">
        <div>
          <Label htmlFor="apiKey">API ключ *</Label>
          <div className="flex flex-col sm:flex-row gap-2 mt-2">
            <Input
              id="apiKey"
              type="password"
              value={settings.apiKey}
              onChange={(e) => setSettings(prev => ({ ...prev, apiKey: e.target.value }))}
              placeholder="Введите API ключ"
              className="flex-1"
            />
            <Button
              variant="outline"
              onClick={handleTestConnection}
              disabled={isTestingConnection || !settings.apiKey}
              className="w-full sm:w-auto"
            >
              {isTestingConnection ? (
                <Icon name="Loader2" size={16} className="animate-spin" />
              ) : (
                <Icon name="Wifi" size={16} />
              )}
              <span className="ml-2">Тест</span>
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
          <Select 
            value={settings.model} 
            onValueChange={(value) => setSettings(prev => ({ ...prev, model: value }))}
          >
            <SelectTrigger className="mt-2">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {provider.models.map(model => (
                <SelectItem key={model} value={model}>{model}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Параметры генерации */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="temperature">
            Творческость: {settings.temperature}
          </Label>
          <input
            id="temperature"
            type="range"
            min="0"
            max="2"
            step="0.1"
            value={settings.temperature}
            onChange={(e) => setSettings(prev => ({ ...prev, temperature: parseFloat(e.target.value) }))}
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
            onChange={(e) => setSettings(prev => ({ ...prev, maxTokens: parseInt(e.target.value) || 2000 }))}
            className="mt-2"
          />
        </div>
      </div>

      {/* Кнопки действий */}
      <div className="flex flex-col sm:flex-row justify-between gap-3 pt-4 border-t">
        <Button variant="outline" className="w-full sm:w-auto">
          Сбросить
        </Button>
        <Button onClick={handleSave} className="w-full sm:w-auto">
          Сохранить настройки
        </Button>
      </div>
    </div>
  );
}