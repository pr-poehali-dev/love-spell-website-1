import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Icon from '@/components/ui/icon';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // TODO: Implement password reset API call
    // const response = await api.sendPasswordReset(email);
    // if (response.success) {
    //   setSent(true);
    // }
    
    // Temporary mock behavior
    setTimeout(() => {
      setSent(true);
      setLoading(false);
    }, 2000);
  };

  if (sent) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <Icon name="Mail" size={48} className="mx-auto text-primary mb-4" />
            <CardTitle className="text-2xl font-bold">Письмо отправлено</CardTitle>
            <CardDescription>
              Проверьте свою почту и следуйте инструкциям для восстановления пароля
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Alert>
              <Icon name="Info" size={16} />
              <AlertDescription>
                Если письмо не пришло в течение нескольких минут, проверьте папку "Спам"
              </AlertDescription>
            </Alert>
            <div className="mt-4 text-center">
              <Link to="/admin" className="text-primary hover:underline">
                Вернуться к входу
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Восстановление пароля</CardTitle>
          <CardDescription>
            Введите email или логин для восстановления доступа
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email или логин</Label>
              <Input
                id="email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Введите email или логин"
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <>
                  <Icon name="Loader2" size={16} className="animate-spin mr-2" />
                  Отправка...
                </>
              ) : (
                'Отправить инструкции'
              )}
            </Button>
            <div className="text-center">
              <Link to="/admin" className="text-sm text-muted-foreground hover:text-primary">
                ← Вернуться к входу
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ForgotPassword;