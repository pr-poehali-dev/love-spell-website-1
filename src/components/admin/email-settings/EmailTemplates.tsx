import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';

interface EmailTemplatesData {
  toClient: {
    subject: string;
    body: string;
  };
  toAdmin: {
    subject: string;
    fields: string[];
  };
}

interface EmailTemplatesProps {
  emailTemplates: EmailTemplatesData;
  setEmailTemplates: (templates: EmailTemplatesData) => void;
  handleSaveTemplates: () => Promise<void>;
}

const EmailTemplates = ({ emailTemplates, setEmailTemplates, handleSaveTemplates }: EmailTemplatesProps) => {
  const handleFieldToggle = (field: string, checked: boolean) => {
    const fields = checked
      ? [...emailTemplates.toAdmin.fields, field]
      : emailTemplates.toAdmin.fields.filter(f => f !== field);
    
    setEmailTemplates({
      ...emailTemplates,
      toAdmin: { ...emailTemplates.toAdmin, fields }
    });
  };

  const getFieldLabel = (field: string) => {
    switch (field) {
      case 'name': return 'Имя';
      case 'email': return 'Email';
      case 'phone': return 'Телефон';
      case 'message': return 'Сообщение';
      case 'service': return 'Услуга';
      case 'source': return 'Источник';
      default: return field;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Письмо клиенту</CardTitle>
          <CardDescription>
            Автоматическое письмо, отправляемое клиенту после заполнения формы
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="client-subject">Тема письма</Label>
            <Input
              id="client-subject"
              value={emailTemplates.toClient.subject}
              onChange={(e) => setEmailTemplates({
                ...emailTemplates,
                toClient: { ...emailTemplates.toClient, subject: e.target.value }
              })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="client-body">Текст письма</Label>
            <Textarea
              id="client-body"
              rows={8}
              value={emailTemplates.toClient.body}
              onChange={(e) => setEmailTemplates({
                ...emailTemplates,
                toClient: { ...emailTemplates.toClient, body: e.target.value }
              })}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Письмо себе</CardTitle>
          <CardDescription>
            Уведомление о новой заявке с данными клиента
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="admin-subject">Тема письма</Label>
            <Input
              id="admin-subject"
              value={emailTemplates.toAdmin.subject}
              onChange={(e) => setEmailTemplates({
                ...emailTemplates,
                toAdmin: { ...emailTemplates.toAdmin, subject: e.target.value }
              })}
            />
          </div>
          <div className="space-y-2">
            <Label>Поля для включения в письмо</Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {['name', 'email', 'phone', 'message', 'service', 'source'].map((field) => (
                <div key={field} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id={field}
                    checked={emailTemplates.toAdmin.fields.includes(field)}
                    onChange={(e) => handleFieldToggle(field, e.target.checked)}
                  />
                  <Label htmlFor={field} className="text-sm capitalize">
                    {getFieldLabel(field)}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Button onClick={handleSaveTemplates}>
        <Icon name="Save" size={16} className="mr-2" />
        Сохранить шаблоны
      </Button>
    </div>
  );
};

export default EmailTemplates;