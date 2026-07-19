const companies = {
  'criador-contrato': {
    nome: 'Criador de Contratos',
    logo: '/logos/default.svg',
    cor: '#0F172A',
    corSecundaria: '#C5A880',
  },
  'empresaa': {
    nome: 'Empresa A Ltda',
    logo: '/logos/default.svg',
    cor: '#1B4332',
    corSecundaria: '#D4A373',
  },
  'empresab': {
    nome: 'Empresa B S.A.',
    logo: '/logos/default.svg',
    cor: '#5B2E91',
    corSecundaria: '#E8C547',
  },
};

const devHosts = ['localhost', '127.0.0.1'];

export function getCurrentCompany() {
  const host = window.location.hostname;
  const dev = devHosts.some((h) => host.includes(h));

  if (dev) {
    const stored = localStorage.getItem('contrato_company_slug');
    if (stored && companies[stored]) {
      return { ...companies[stored], dev: true };
    }
    console.log('[Multi-tenant] Debug: mude de empresa com:', "localStorage.setItem('contrato_company_slug','empresaa')");
    return { ...companies['criador-contrato'], dev: true };
  }

  const slug = host.split('.')[0];
  return companies[slug] || { ...companies['criador-contrato'] };
}

export function applyBranding(company) {
  const root = document.documentElement;
  root.style.setProperty('--navy', company.cor);
  root.style.setProperty('--gold', company.corSecundaria);
  root.style.setProperty('--navy-light', company.cor + 'e6');
  root.style.setProperty('--navy-mid', company.cor + '99');
  root.style.setProperty('--gold-light', company.corSecundaria + 'cc');
  root.style.setProperty('--gold-dark', company.corSecundaria + '88');
  document.title = company.nome;
}
