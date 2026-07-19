const base = import.meta.env.BASE_URL || '/';

const companies = {
  'criador-contrato': {
    nome: 'Criador de Contratos',
    logo: `${base}logos/default.svg`,
    cor: '#0F172A',
    corSecundaria: '#C5A880',
  },
  'empresaa': {
    nome: 'Empresa A Ltda',
    logo: `${base}logos/empresaa.svg`,
    cor: '#1B4332',
    corSecundaria: '#D4A373',
  },
  'empresab': {
    nome: 'Empresa B S.A.',
    logo: `${base}logos/empresab.svg`,
    cor: '#5B2E91',
    corSecundaria: '#E8C547',
  },
};

export function getCurrentCompany() {
  const stored = localStorage.getItem('contrato_company_slug');
  if (stored && companies[stored]) {
    return { ...companies[stored] };
  }

  const host = window.location.hostname;
  const slug = host.split('.')[0];
  return companies[slug] || { ...companies['criador-contrato'] };
}

export function applyBranding(company) {
  const root = document.documentElement;
  root.style.setProperty('--company-primary', company.cor);
  root.style.setProperty('--company-secondary', company.corSecundaria);
  document.title = company.nome;
}
