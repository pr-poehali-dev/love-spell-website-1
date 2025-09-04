import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';

interface Message {
  id: string;
  type: 'client' | 'admin' | 'auto';
  content: string;
  timestamp: Date;
  sender?: {
    name: string;
    email: string;
    avatar?: string;
  };
  status?: 'sent' | 'delivered' | 'read';
}

interface Conversation {
  id: string;
  clientName: string;
  clientEmail: string;
  subject: string;
  lastMessage: string;
  lastMessageTime: Date;
  unreadCount: number;
  status: 'new' | 'in-progress' | 'closed';
  messages: Message[];
}

const MessagesChat = () => {
  const [conversations] = useState<Conversation[]>([
    {
      id: '1',
      clientName: 'Анна Петрова',
      clientEmail: 'anna@example.com',
      subject: 'Приворот на возврат мужа',
      lastMessage: 'Здравствуйте! Хочу заказать приворот...',
      lastMessageTime: new Date('2024-09-04T14:30:00'),
      unreadCount: 2,
      status: 'new',
      messages: [
        {
          id: '1',
          type: 'client',
          content: 'Здравствуйте! Хочу заказать приворот на возврат мужа. Ушел к другой женщине месяц назад. Можете помочь?',
          timestamp: new Date('2024-09-04T14:30:00'),
          sender: {
            name: 'Анна Петрова',
            email: 'anna@example.com'
          }
        },
        {
          id: '2',
          type: 'auto',
          content: 'Спасибо за обращение! Я получила ваш запрос и обязательно отвечу в ближайшее время.',
          timestamp: new Date('2024-09-04T14:30:30'),
          status: 'delivered'
        }
      ]
    },
    {
      id: '2',
      clientName: 'Мария Смирнова',
      clientEmail: 'maria@example.com',
      subject: 'Снятие порчи',
      lastMessage: 'Спасибо за консультацию!',
      lastMessageTime: new Date('2024-09-04T12:15:00'),
      unreadCount: 0,
      status: 'closed',
      messages: [
        {
          id: '3',
          type: 'client',
          content: 'Добрый день! Подозреваю что на мне порча. Постоянные неудачи в личной жизни...',
          timestamp: new Date('2024-09-04T10:00:00'),
          sender: {
            name: 'Мария Смирнова',
            email: 'maria@example.com'
          }
        },
        {
          id: '4',
          type: 'admin',
          content: 'Здравствуйте, Мария! По вашему описанию действительно похоже на негативное воздействие. Рекомендую провести диагностику...',
          timestamp: new Date('2024-09-04T11:30:00'),
          status: 'read'
        },
        {
          id: '5',
          type: 'client',
          content: 'Спасибо за консультацию! Когда можно записаться на работу?',
          timestamp: new Date('2024-09-04T12:15:00'),
          sender: {
            name: 'Мария Смирнова',
            email: 'maria@example.com'
          }
        }
      ]
    }
  ]);

  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(conversations[0]);
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [selectedConversation?.messages]);

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedConversation) return;

    const message: Message = {
      id: Date.now().toString(),
      type: 'admin',
      content: newMessage,
      timestamp: new Date(),
      status: 'sent'
    };

    // TODO: API call to send message
    // await api.sendMessage(selectedConversation.id, message);
    
    console.log('Sending message:', message);
    setNewMessage('');
  };

  const filteredConversations = conversations.filter(conv =>
    conv.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    conv.clientEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
    conv.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-red-500';
      case 'in-progress': return 'bg-yellow-500';
      case 'closed': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'new': return 'Новая';
      case 'in-progress': return 'В работе';
      case 'closed': return 'Закрыта';
      default: return 'Неизвестно';
    }
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = diffMs / (1000 * 60 * 60);
    const diffDays = diffMs / (1000 * 60 * 60 * 24);

    if (diffHours < 1) {
      return 'только что';
    } else if (diffHours < 24) {
      return `${Math.floor(diffHours)} ч назад`;
    } else if (diffDays < 7) {
      return `${Math.floor(diffDays)} дн назад`;
    } else {
      return date.toLocaleDateString('ru-RU');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Заявки и сообщения</h2>
        <p className="text-muted-foreground">
          Общение с клиентами через email интеграцию
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 min-h-[500px] max-h-[80vh]">
        {/* Список разговоров */}
        <Card className="lg:col-span-1 max-h-[50vh] lg:max-h-full">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">Разговоры</CardTitle>
              <Badge variant="secondary">{filteredConversations.length}</Badge>
            </div>
            <div className="relative">
              <Icon name="Search" size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Поиск по имени, email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[300px] lg:h-[500px]">
              <div className="space-y-1 p-4">
                {filteredConversations.map((conversation) => (
                  <div
                    key={conversation.id}
                    className={`p-3 rounded-lg cursor-pointer transition-colors ${
                      selectedConversation?.id === conversation.id
                        ? 'bg-primary/10 border border-primary/20'
                        : 'hover:bg-muted/50'
                    }`}
                    onClick={() => setSelectedConversation(conversation)}
                  >
                    <div className="flex items-start gap-3">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={`/api/placeholder/32/32`} />
                        <AvatarFallback>
                          {conversation.clientName.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-medium text-sm truncate">
                            {conversation.clientName}
                          </h4>
                          <div className="flex items-center gap-1">
                            {conversation.unreadCount > 0 && (
                              <Badge variant="destructive" className="text-xs h-5 w-5 p-0 flex items-center justify-center">
                                {conversation.unreadCount}
                              </Badge>
                            )}
                            <div className={`w-2 h-2 rounded-full ${getStatusColor(conversation.status)}`} />
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground mb-1 truncate">
                          {conversation.subject}
                        </p>
                        <p className="text-xs text-muted-foreground truncate">
                          {conversation.lastMessage}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {formatTime(conversation.lastMessageTime)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Чат */}
        <Card className="lg:col-span-2">
          {selectedConversation ? (
            <>
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={`/api/placeholder/40/40`} />
                      <AvatarFallback>
                        {selectedConversation.clientName.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg">{selectedConversation.clientName}</CardTitle>
                      <CardDescription>{selectedConversation.clientEmail}</CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">
                      {getStatusText(selectedConversation.status)}
                    </Badge>
                    <Button variant="ghost" size="sm">
                      <Icon name="MoreVertical" size={16} />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex flex-col h-[500px]">
                <ScrollArea className="flex-1 pr-4">
                  <div className="space-y-4">
                    {selectedConversation.messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.type === 'admin' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[70%] rounded-lg p-3 ${
                            message.type === 'admin'
                              ? 'bg-primary text-primary-foreground'
                              : message.type === 'auto'
                              ? 'bg-yellow-100 text-yellow-800 border border-yellow-200'
                              : 'bg-muted'
                          }`}
                        >
                          {message.type === 'auto' && (
                            <div className="flex items-center gap-1 text-xs mb-2">
                              <Icon name="Bot" size={12} />
                              Автоответ
                            </div>
                          )}
                          <p className="text-sm">{message.content}</p>
                          <div className="flex items-center justify-between mt-2 text-xs opacity-70">
                            <span>{formatTime(message.timestamp)}</span>
                            {message.type === 'admin' && message.status && (
                              <Icon 
                                name={message.status === 'read' ? 'CheckCheck' : 'Check'} 
                                size={12} 
                              />
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>
                </ScrollArea>
                
                <div className="pt-4 border-t">
                  <div className="flex gap-2">
                    <Textarea
                      placeholder="Введите ответ..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      className="flex-1 min-h-[60px] max-h-[120px]"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage();
                        }
                      }}
                    />
                    <Button 
                      onClick={handleSendMessage}
                      disabled={!newMessage.trim()}
                      className="self-end"
                    >
                      <Icon name="Send" size={16} />
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Enter для отправки, Shift+Enter для новой строки
                  </p>
                </div>
              </CardContent>
            </>
          ) : (
            <CardContent className="flex items-center justify-center h-full">
              <div className="text-center">
                <Icon name="MessageSquare" size={48} className="mx-auto mb-4 text-muted-foreground" />
                <h3 className="font-medium mb-2">Выберите разговор</h3>
                <p className="text-sm text-muted-foreground">
                  Выберите разговор из списка, чтобы начать общение
                </p>
              </div>
            </CardContent>
          )}
        </Card>
      </div>
    </div>
  );
};

export default MessagesChat;