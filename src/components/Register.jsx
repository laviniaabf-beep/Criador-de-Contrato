import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import AuthLayout from './AuthLayout';

export default function Register({ onToggleForm }) {
  const { register } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirm) {
      setError('As senhas não conferem.');
      return;
    }
    if (password.length < 6) {
      setError('A senha deve ter no mínimo 6 caracteres.');
      return;
    }

    setLoading(true);
    try {
      await register(email, password);
    } catch (err) {
      const msg =
        err.code === 'auth/email-already-in-use'
          ? 'Este email já está cadastrado.'
          : err.code === 'auth/invalid-email'
          ? 'Email inválido.'
          : err.code === 'auth/weak-password'
          ? 'Senha muito fraca.'
          : 'Erro ao cadastrar. Tente novamente.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="auth-brand-mobile">
        <span className="logo-icon">⚖️</span>
        <h1>Criador de Contratos</h1>
      </div>
      <h2>Criar Conta</h2>
      <p className="auth-subtitle">Cadastre-se para criar contratos profissionais</p>
      {error && <div className="auth-error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="auth-field">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="seu@email.com"
            required
          />
        </div>
        <div className="auth-field">
          <label>Senha (mín. 6 caracteres)</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Crie uma senha"
            required
          />
        </div>
        <div className="auth-field">
          <label>Confirmar Senha</label>
          <input
            type="password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            placeholder="Repita a senha"
            required
          />
        </div>
        <button type="submit" className="btn-primary btn-large" disabled={loading}>
          {loading ? 'Cadastrando...' : 'Cadastrar'}
        </button>
      </form>
      <div className="auth-security-note">
        <span>🔒</span>
        <span>Seus dados estão protegidos pela LGPD</span>
      </div>
      <p className="auth-toggle">
        Já tem conta?{' '}
        <button onClick={onToggleForm}>Entre aqui</button>
      </p>
    </AuthLayout>
  );
}
