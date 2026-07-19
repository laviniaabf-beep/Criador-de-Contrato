import { useState } from 'react';

function maskCPF(value) {
  const digits = value.replace(/\D/g, '').slice(0, 11);
  return digits
    .replace(/^(\d{3})(\d)/, '$1.$2')
    .replace(/^(\d{3})\.(\d{3})(\d)/, '$1.$2.$3')
    .replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d)/, '$1.$2.$3-$4');
}

function maskCNPJ(value) {
  const digits = value.replace(/\D/g, '').slice(0, 14);
  return digits
    .replace(/^(\d{2})(\d)/, '$1.$2')
    .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
    .replace(/^(\d{2})\.(\d{3})\.(\d{3})(\d)/, '$1.$2.$3/$4')
    .replace(/^(\d{2})\.(\d{3})\.(\d{3})\/(\d{4})(\d)/, '$1.$2.$3/$4-$5');
}

function clean(doc) {
  return doc.replace(/\D/g, '');
}

export default function DocumentForm() {
  const [cpf, setCpf] = useState(() => maskCPF('12345678901'));
  const [cnpj, setCnpj] = useState(() => maskCNPJ('12345678000199'));

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('CPF:', clean(cpf));
    console.log('CNPJ:', clean(cnpj));
  };

  return (
    <form className="doc-form" onSubmit={handleSubmit}>
      <div className="doc-form-header">
        <span className="doc-form-icon">📋</span>
        <h3>Documentos</h3>
      </div>

      <div className="doc-field">
        <label htmlFor="cpf">
          CPF <span className="doc-badge">Pessoa Física</span>
        </label>
        <div className="doc-input-wrapper">
          <span className="doc-input-icon">👤</span>
          <input
            id="cpf"
            type="text"
            value={cpf}
            onChange={(e) => setCpf(maskCPF(e.target.value))}
            placeholder="000.000.000-00"
            maxLength={14}
          />
        </div>
      </div>

      <div className="doc-field">
        <label htmlFor="cnpj">
          CNPJ <span className="doc-badge">Pessoa Jurídica</span>
        </label>
        <div className="doc-input-wrapper">
          <span className="doc-input-icon">🏢</span>
          <input
            id="cnpj"
            type="text"
            value={cnpj}
            onChange={(e) => setCnpj(maskCNPJ(e.target.value))}
            placeholder="00.000.000/0000-00"
            maxLength={18}
          />
        </div>
      </div>

      <button type="submit" className="btn-primary btn-large">
        Validar Documentos
      </button>

      <div className="doc-output">
        <div className="doc-output-item">
          <span className="doc-output-label">CPF (banco)</span>
          <code>{clean(cpf) || '—'}</code>
        </div>
        <div className="doc-output-item">
          <span className="doc-output-label">CNPJ (banco)</span>
          <code>{clean(cnpj) || '—'}</code>
        </div>
      </div>
    </form>
  );
}
