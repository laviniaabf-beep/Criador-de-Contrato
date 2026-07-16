import { useState } from 'react';
import { useAuth } from './contexts/AuthContext';
import { gerarContrato } from './templates/contractTemplates';
import Login from './components/Login';
import Register from './components/Register';
import './App.css';

function App() {
  const { user, loading, logout } = useAuth();
  const [authPage, setAuthPage] = useState('login');

  const [etapa, setEtapa] = useState('tema');
  const [tema, setTema] = useState('');
  const [formData, setFormData] = useState({});
  const [contratoGerado, setContratoGerado] = useState('');

  const handleChange = (nome, valor) => {
    setFormData((prev) => ({ ...prev, [nome]: valor }));
  };

  const confirmarTema = (e) => {
    e.preventDefault();
    if (!tema.trim()) return;
    setEtapa('form');
  };

  const gerar = (e) => {
    e.preventDefault();
    const texto = gerarContrato(tema, formData);
    setContratoGerado(texto);
    setEtapa('preview');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const exportarPDF = () => {
    const elemento = document.getElementById('contrato-texto');
    if (!elemento) return;

    import('html2pdf.js').then((html2pdf) => {
      const opt = {
        margin: [10, 10],
        filename: 'contrato.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
        pageblock: { mode: ['avoid-all', 'css', 'legacy'] }
      };
      html2pdf.default().set(opt).from(elemento).save();
    });
  };

  const novoContrato = () => {
    setEtapa('tema');
    setTema('');
    setFormData({});
    setContratoGerado('');
  };

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="spinner" />
        <p>Carregando...</p>
      </div>
    );
  }

  if (!user) {
    return authPage === 'login' ? (
      <Login onToggleForm={() => setAuthPage('register')} />
    ) : (
      <Register onToggleForm={() => setAuthPage('login')} />
    );
  }

  const campos = [
    { nome: 'parte1', label: 'Nome do Contratante', tipo: 'text', obrigatorio: true },
    { nome: 'doc1', label: 'CPF/CNPJ do Contratante', tipo: 'text', obrigatorio: true },
    { nome: 'endereco1', label: 'Endereço do Contratante', tipo: 'text' },
    { nome: 'parte2', label: 'Nome do Contratado', tipo: 'text', obrigatorio: true },
    { nome: 'doc2', label: 'CPF/CNPJ do Contratado', tipo: 'text', obrigatorio: true },
    { nome: 'endereco2', label: 'Endereço do Contratado', tipo: 'text' },
    { nome: 'objeto', label: 'Objeto do Contrato (descrição detalhada)', tipo: 'textarea', obrigatorio: true },
    { nome: 'condicoes', label: 'Condições Específicas', tipo: 'textarea' },
    { nome: 'valor', label: 'Valor (R$)', tipo: 'text' },
    { nome: 'forma_pagamento', label: 'Forma de Pagamento', tipo: 'text' },
    { nome: 'prazo', label: 'Prazo de Vigência', tipo: 'text', obrigatorio: true },
    { nome: 'data_inicio', label: 'Data de Início', tipo: 'date' },
    { nome: 'cidade', label: 'Cidade', tipo: 'text', obrigatorio: true },
    { nome: 'disposicoes', label: 'Disposições Gerais / Foro', tipo: 'textarea' },
  ];

  return (
    <div className="app">
      <header className="header">
        <div className="header-brand">
          <div className="brand-icon">⚖️</div>
          <h1>Criador de Contratos <span className="brand-badge">Legal</span></h1>
        </div>
        <div className="header-user">
          <span className="user-email">{user.email}</span>
          <button className="btn-logout" onClick={logout}>Sair</button>
        </div>
      </header>

      <main className="main">
        {etapa === 'tema' && (
          <section className="tema-section">
            <h2>Qual o tipo de contrato você deseja criar?</h2>
            <p className="tema-desc">Ex: Contrato de Prestação de Serviços, Contrato de Namoro, Contrato de Confidencialidade, Contrato de Comodato...</p>
            <form onSubmit={confirmarTema} className="tema-form">
              <input
                type="text"
                value={tema}
                onChange={(e) => setTema(e.target.value)}
                placeholder="Digite o tema do contrato..."
                autoFocus
                required
              />
              <button type="submit" className="btn-primary btn-large">Continuar</button>
            </form>
          </section>
        )}

        {etapa === 'form' && (
          <section className="form-section">
            <div className="section-header">
              <button className="btn-back" onClick={() => setEtapa('tema')}>← Trocar Tema</button>
              <h2>{tema}</h2>
            </div>
            <form onSubmit={gerar} className="contract-form">
              <div className="form-grid">
                {campos.map((campo) => (
                  <div key={campo.nome} className={`form-group ${campo.tipo === 'textarea' ? 'full-width' : ''}`}>
                    <label htmlFor={campo.nome}>
                      {campo.label}
                      {campo.obrigatorio && <span className="required">*</span>}
                    </label>
                    {campo.tipo === 'textarea' ? (
                      <textarea
                        id={campo.nome}
                        value={formData[campo.nome] || ''}
                        onChange={(e) => handleChange(campo.nome, e.target.value)}
                        rows={3}
                        required={campo.obrigatorio}
                      />
                    ) : (
                      <input
                        type={campo.tipo}
                        id={campo.nome}
                        value={formData[campo.nome] || ''}
                        onChange={(e) => handleChange(campo.nome, e.target.value)}
                        required={campo.obrigatorio}
                      />
                    )}
                  </div>
                ))}
              </div>
              <button type="submit" className="btn-primary btn-large">Gerar Contrato</button>
            </form>
          </section>
        )}

        {etapa === 'preview' && contratoGerado && (
          <section className="preview-section">
            <div className="section-header">
              <button className="btn-back" onClick={() => setEtapa('form')}>← Editar</button>
              <h2>Pré-visualização</h2>
              <div className="preview-actions">
                <button className="btn-secondary" onClick={exportarPDF}>📄 Exportar PDF</button>
                <button className="btn-secondary" onClick={novoContrato}>Novo Contrato</button>
              </div>
            </div>
            <div className="preview-container" id="contrato-texto">
              {contratoGerado.split('\n').map((linha, i) => (
                <p key={i} className={
                  i === 0 && linha === linha.toUpperCase() ? 'contrato-titulo' :
                  linha.match(/^[A-ZÀ-Ú\s]{3,}$/) && linha.length > 5 ? 'contrato-subtitulo' :
                  'contrato-linha'
                }>
                  {linha || '\u00A0'}
                </p>
              ))}
            </div>
          </section>
        )}
      </main>

      <footer className="footer">
        <p>Criador de Contratos &copy; {new Date().getFullYear()} - Documentos gerados não possuem validade jurídica sem assinatura de testemunhas e reconhecimento de firma quando exigido por lei.</p>
      </footer>
    </div>
  );
}

export default App;
