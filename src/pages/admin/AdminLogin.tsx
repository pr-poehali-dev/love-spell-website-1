import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    totpCode: ''
  });
  const [step, setStep] = useState<'credentials' | 'totp'>('credentials');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleCredentialsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // TODO: Implement backend API call
    // const response = await api.adminLogin(formData.username, formData.password);
    // if (response.requiresTotp) {
    //   setStep('totp');
    // } else if (response.success) {
    //   navigate('/admin/dashboard');
    // }
    
    // Temporary mock behavior
    setTimeout(() => {
      setStep('totp');
      setLoading(false);
    }, 1000);
  };

  const handleTotpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // TODO: Implement TOTP verification
    // const response = await api.verifyTotp(formData.totpCode);
    // if (response.success) {
    //   navigate('/admin/dashboard');
    // }
    
    // Temporary mock behavior
    setTimeout(() => {
      console.log('TOTP verified, redirecting to dashboard...');
      setLoading(false);
    }, 1000);
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Админ Панель</CardTitle>
          <CardDescription>
            {step === 'credentials' 
              ? 'Введите данные для входа' 
              : 'Введите код из приложения аутентификатора'
            }
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {step === 'credentials' ? (
            <form onSubmit={handleCredentialsSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Логин или Email</Label>
                <Input
                  id="username"
                  type="text"
                  value={formData.username}
                  onChange={(e) => handleChange('username', e.target.value)}
                  placeholder="Введите логин или email"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Пароль</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => handleChange('password', e.target.value)}
                    placeholder="Введите пароль"
                    className="pr-10"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <Icon name={showPassword ? 'EyeOff' : 'Eye'} size={16} />
                  </Button>
                </div>
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? (
                  <>
                    <Icon name="Loader2" size={16} className="animate-spin mr-2" />
                    Проверка...
                  </>
                ) : (
                  'Войти'
                )}
              </Button>
              <div className="text-center">
                <Link 
                  to="/admin/forgot-password" 
                  className="text-sm text-primary hover:underline"
                >
                  Забыли пароль?
                </Link>
              </div>
            </form>
          ) : (
            <form onSubmit={handleTotpSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="totpCode">Код аутентификации</Label>
                <Input
                  id="totpCode"
                  type="text"
                  value={formData.totpCode}
                  onChange={(e) => handleChange('totpCode', e.target.value.replace(/\D/g, '').slice(0, 6))}
                  placeholder="000000"
                  maxLength={6}
                  className="text-center text-2xl tracking-widest"
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={loading || formData.totpCode.length !== 6}>
                {loading ? (
                  <>
                    <Icon name="Loader2" size={16} className="animate-spin mr-2" />
                    Проверка...
                  </>
                ) : (
                  'Подтвердить'
                )}
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                className="w-full" 
                onClick={() => setStep('credentials')}
              >
                Назад
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLogin;