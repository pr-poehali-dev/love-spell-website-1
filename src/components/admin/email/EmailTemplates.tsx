import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface EmailTemplate {
  id: string;
  templateType: string;
  templateName: string;
  subjectTemplate: string;
  bodyTemplate: string;
  variables: Record<string, string>;
  isActive: boolean;
}

interface EmailTemplatesProps {
  templates: EmailTemplate[];
  onEditTemplate: (template: EmailTemplate) => void;
  onCreateTemplate: () => void;
}

export default function EmailTemplates({
  templates,
  onEditTemplate,
  onCreateTemplate
}: EmailTemplatesProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Icon name="FileText" size={20} />
          Шаблоны писем
        </CardTitle>
        <CardDescription>
          Настройка шаблонов для автоматических и ручных ответов
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {templates.map((template) => (
            <div
              key={template.id}
              className="p-4 border rounded-lg hover:bg-muted/50 cursor-pointer"
              onClick={() => onEditTemplate(template)}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">{template.templateName}</h4>
                  <p className="text-sm text-muted-foreground">
                    {template.templateType} • {template.subjectTemplate}
                  </p>
                </div>
                <Badge variant={template.isActive ? "default" : "secondary"}>
                  {template.isActive ? "Активен" : "Неактивен"}
                </Badge>
              </div>
            </div>
          ))}
          
          {templates.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <Icon name="FileText" size={48} className="mx-auto mb-4 opacity-50" />
              <p>Шаблоны не найдены</p>
              <p className="text-sm">Создайте первый шаблон для автоматических ответов</p>
            </div>
          )}
          
          <Button
            onClick={onCreateTemplate}
            className="w-full"
          >
            <Icon name="Plus" size={16} className="mr-2" />
            Создать шаблон
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}