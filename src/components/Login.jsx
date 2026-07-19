import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import AuthLayout from './AuthLayout';

export default function Login({ onToggleForm }) {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
    } catch (err) {
      const msg =
        err.code === 'user-not-found' || err.code === 'wrong-password'
          ? 'Email ou senha inválidos.'
          : 'Erro ao fazer login. Tente novamente.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <button className="auth-top-link" onClick={onToggleForm}>Cadastre-se</button>
      <div className="auth-card">
        <div className="auth-brand">
          <span className="logo-icon">⚖️</span>
          <h1>Criador de Contratos</h1>
        </div>
        {error && <div className="auth-error">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="auth-field">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
            />
          </div>
          <div className="auth-field">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Senha"
              required
            />
          </div>
          <button type="submit" className="btn-primary btn-large" disabled={loading}>
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>
      </div>
    </AuthLayout>
  );
}
