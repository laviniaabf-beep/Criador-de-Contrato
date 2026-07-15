import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

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
        err.code === 'auth/user-not-found' || err.code === 'auth/invalid-credential'
          ? 'Email ou senha inválidos.'
          : err.code === 'auth/invalid-email'
          ? 'Email inválido.'
          : err.code === 'auth/too-many-requests'
          ? 'Conta bloqueada temporariamente. Tente novamente mais tarde.'
          : 'Erro ao fazer login. Tente novamente.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="logo">📝 Criador de Contratos</h1>
        <h2>Entrar</h2>
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
            <label>Senha</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Sua senha"
              required
            />
          </div>
          <button type="submit" className="btn-primary btn-large" disabled={loading}>
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>
        <p className="auth-toggle">
          Não tem conta?{' '}
          <button onClick={onToggleForm}>Cadastre-se</button>
        </p>
      </div>
    </div>
  );
}
