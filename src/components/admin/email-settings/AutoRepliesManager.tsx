import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';

export interface AutoReply {
  id: string;
  name: string;
  conditions: {
    email?: string;
    contains?: string;
    exactMatch?: string;
  };
  response: string;
  delay: number;
  order: number;
  enabled: boolean;
}

interface AutoRepliesManagerProps {
  autoReplies: AutoReply[];
  setAutoReplies: (replies: AutoReply[]) => void;
}

const AutoRepliesManager = ({ autoReplies, setAutoReplies }: AutoRepliesManagerProps) => {
  const [newAutoReply, setNewAutoReply] = useState<Partial<AutoReply>>({
    name: '',
    conditions: {},
    response: '',
    delay: 0,
    enabled: true
  });

  const addAutoReply = () => {
    if (newAutoReply.name && newAutoReply.response) {
      const autoReply: AutoReply = {
        id: Date.now().toString(),
        name: newAutoReply.name,
        conditions: newAutoReply.conditions || {},
        response: newAutoReply.response,
        delay: newAutoReply.delay || 0,
        order: autoReplies.length + 1,
        enabled: newAutoReply.enabled !== false
      };
      setAutoReplies([...autoReplies, autoReply]);
      setNewAutoReply({ name: '', conditions: {}, response: '', delay: 0, enabled: true });
    }
  };

  const removeAutoReply = (id: string) => {
    setAutoReplies(autoReplies.filter(reply => reply.id !== id));
  };

  const toggleAutoReply = (id: string) => {
    setAutoReplies(autoReplies.map(reply => 
      reply.id === id ? { ...reply, enabled: !reply.enabled } : reply
    ));
  };

  const getConditionText = (conditions: AutoReply['conditions']) => {
    if (conditions.email) return `Email: ${conditions.email}`;
    if (conditions.contains) return `Содержит: "${conditions.contains}"`;
    if (conditions.exactMatch) return `Точное совпадение: "${conditions.exactMatch}"`;
    return 'Любое письмо';
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Автоответы</CardTitle>
          <CardDescription>
            Автоматические ответы на письма клиентов по условиям
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {autoReplies.map((reply) => (
            <div key={reply.id} className="p-4 border rounded-lg">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="font-medium">{reply.name}</h4>
                    <Badge variant={reply.enabled ? 'default' : 'secondary'}>
                      {reply.enabled ? 'Активен' : 'Отключен'}
                    </Badge>
                  </div>
                  <div className="text-sm text-muted-foreground mb-2">
                    <strong>Условие:</strong> {getConditionText(reply.conditions)}
                  </div>
                  <div className="text-sm text-muted-foreground mb-2">
                    <strong>Задержка:</strong> {reply.delay === 0 ? 'Сразу' : `${reply.delay} сек`}
                  </div>
                  <div className="text-sm bg-muted p-2 rounded">
                    {reply.response}
                  </div>
                </div>
                <div className="flex gap-2 ml-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleAutoReply(reply.id)}
                  >
                    <Icon name={reply.enabled ? 'Pause' : 'Play'} size={16} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeAutoReply(reply.id)}
                  >
                    <Icon name="Trash2" size={16} />
                  </Button>
                </div>
              </div>
            </div>
          ))}

          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="w-full">
                <Icon name="Plus" size={16} className="mr-2" />
                Добавить автоответ
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Новый автоответ</DialogTitle>
                <DialogDescription>
                  Создайте правило для автоматического ответа на письма
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="new-name">Название</Label>
                  <Input
                    id="new-name"
                    value={newAutoReply.name || ''}
                    onChange={(e) => setNewAutoReply(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Название правила"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Условие срабатывания</Label>
                  <div className="grid grid-cols-1 gap-2">
                    <Input
                      placeholder="Email получателя (оставьте пустым для любого)"
                      value={newAutoReply.conditions?.email || ''}
                      onChange={(e) => setNewAutoReply(prev => ({
                        ...prev,
                        conditions: { ...prev.conditions, email: e.target.value }
                      }))}
                    />
                    <Input
                      placeholder="Письмо содержит текст"
                      value={newAutoReply.conditions?.contains || ''}
                      onChange={(e) => setNewAutoReply(prev => ({
                        ...prev,
                        conditions: { ...prev.conditions, contains: e.target.value }
                      }))}
                    />
                    <Input
                      placeholder="Точное совпадение текста"
                      value={newAutoReply.conditions?.exactMatch || ''}
                      onChange={(e) => setNewAutoReply(prev => ({
                        ...prev,
                        conditions: { ...prev.conditions, exactMatch: e.target.value }
                      }))}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="new-response">Ответное сообщение</Label>
                  <Textarea
                    id="new-response"
                    rows={4}
                    value={newAutoReply.response || ''}
                    onChange={(e) => setNewAutoReply(prev => ({ ...prev, response: e.target.value }))}
                    placeholder="Текст автоматического ответа"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="new-delay">Задержка (секунды)</Label>
                  <Input
                    id="new-delay"
                    type="number"
                    min="0"
                    value={newAutoReply.delay || 0}
                    onChange={(e) => setNewAutoReply(prev => ({ ...prev, delay: parseInt(e.target.value) || 0 }))}
                  />
                </div>

                <div className="flex gap-2">
                  <Button onClick={addAutoReply}>
                    Добавить автоответ
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setNewAutoReply({ name: '', conditions: {}, response: '', delay: 0, enabled: true })}
                  >
                    Очистить
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>
    </div>
  );
};

export default AutoRepliesManager;