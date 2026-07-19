export default function AuthLayout({ children, company }) {
  return (
    <div className="auth-container">
      <div className="auth-institutional">
        <div className="auth-institutional-brand">
          <div className="logo-icon">
            <img src={company?.logo || '/logos/default.svg'} alt={company?.nome || ''} className="auth-logo" />
          </div>
          <h1>{company?.nome || 'Criador de Contratos'}</h1>
          <p className="tagline">
            "A segurança jurídica começa com documentos bem elaborados."
          </p>
          <div className="auth-institutional-divider" />
        </div>
        <div className="auth-institutional-features">
          <div className="feature">
            <span className="icon">🔒</span>
            <span>Dados protegidos com criptografia de ponta a ponta</span>
          </div>
          <div className="feature">
            <span className="icon">📜</span>
            <span>Documentos em conformidade com a legislação vigente</span>
          </div>
          <div className="feature">
            <span className="icon">🛡️</span>
            <span>Sigilo profissional e privacidade garantidas (LGPD)</span>
          </div>
        </div>
      </div>
      <div className="auth-form-panel">{children}</div>
    </div>
  );
}
