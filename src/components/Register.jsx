import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import AuthLayout from './AuthLayout';

export default function Register({ onToggleForm, company }) {
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
        err.code === 'email-already-in-use'
          ? 'Este email já está cadastrado.'
          : 'Erro ao cadastrar. Tente novamente.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout company={company}>
      <button className="auth-top-link" onClick={onToggleForm}>Entre</button>
      <div className="auth-card">
        <div className="auth-brand">
          <span className="logo-icon">
            <img src={company?.logo || '/logos/default.svg'} alt="" className="brand-logo" />
          </span>
          <h1>{company?.nome || 'Criador de Contratos'}</h1>
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
          <div className="auth-field">
            <input
              type="password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              placeholder="Confirmar senha"
              required
            />
          </div>
          <button type="submit" className="btn-primary btn-large" disabled={loading}>
            {loading ? 'Cadastrando...' : 'Cadastrar'}
          </button>
        </form>
      </div>
    </AuthLayout>
  );
}
