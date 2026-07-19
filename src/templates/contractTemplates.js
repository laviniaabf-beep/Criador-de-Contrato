function fmtDoc(val) {
  return val || '_________________________';
}

function fmtCurrency(val) {
  if (!val) return '_________________________';
  const digits = val.replace(/\D/g, '');
  if (!digits || digits === '000') return '_________________________';
  const padded = digits.padStart(3, '0');
  const intPart = padded.slice(0, -2).replace(/^0+/, '') || '0';
  const decPart = padded.slice(-2);
  const num = parseInt(intPart + decPart, 10);
  const formatter = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });
  return formatter.format(num / 100);
}

function extenso(num) {
  if (!num) return '';
  const unidades = ['', 'um', 'dois', 'três', 'quatro', 'cinco', 'seis', 'sete', 'oito', 'nove'];
  const especiais = ['dez', 'onze', 'doze', 'treze', 'quatorze', 'quinze', 'dezesseis', 'dezessete', 'dezoito', 'dezenove'];
  const dezenas = ['', '', 'vinte', 'trinta', 'quarenta', 'cinquenta', 'sessenta', 'setenta', 'oitenta', 'noventa'];
  const centenas = ['', 'cento', 'duzentos', 'trezentos', 'quatrocentos', 'quinhentos', 'seiscentos', 'setecentos', 'oitocentos', 'novecentos'];

  function converter(n) {
    if (n === 0) return '';
    if (n < 10) return unidades[n];
    if (n < 20) return especiais[n - 10];
    if (n < 100) {
      const d = Math.floor(n / 10);
      const u = n % 10;
      return dezenas[d] + (u ? ' e ' + unidades[u] : '');
    }
    if (n < 1000) {
      const c = Math.floor(n / 100);
      const r = n % 100;
      if (c === 1 && r === 0) return 'cem';
      return centenas[c] + (r ? ' e ' + converter(r) : '');
    }
    return '';
  }

  const valor = parseInt(num.replace(/\D/g, '').padStart(3, '0').slice(0, -2) || '0', 10);
  if (valor === 0) return '';
  const dec = parseInt(num.replace(/\D/g, '').padStart(3, '0').slice(-2), 10);
  const centavos = dec ? (dec === 1 ? ' centavo' : ' centavos') : '';

  if (valor >= 1000000) {
    const milhao = Math.floor(valor / 1000000);
    const resto = valor % 1000000;
    const prefixo = milhao === 1 ? 'um milhão' : converter(milhao) + ' milhões';
    const meio = resto ? ' e ' + converter(resto) : '';
    return prefixo + meio + centavos;
  }
  if (valor >= 1000) {
    const mil = Math.floor(valor / 1000);
    const resto = valor % 1000;
    const prefixo = mil === 1 ? 'mil' : converter(mil) + ' mil';
    const meio = resto ? ' e ' + converter(resto) : '';
    return prefixo + meio + centavos;
  }
  return converter(valor) + centavos;
}

function linha() {
  return '───────────────────────────────────────────────';
}

export const gerarContrato = (tema, dados) => {
  const dataAtual = new Date().toLocaleDateString('pt-BR');
  const valorFmt = fmtCurrency(dados.valor);
  const valorExt = extenso(dados.valor);
  const extensoStr = valorExt ? ` (${valorExt})` : '';

  const condicoes = dados.condicoes
    ? `\n2.6. Condições específicas adicionais: ${dados.condicoes}`
    : '';

  const pagamento = dados.forma_pagamento
    ? `da seguinte forma: ${dados.forma_pagamento}.`
    : 'conforme acordado entre as partes, por meio de transferência bancária ou PIX, no prazo estipulado.';

  const foro = dados.disposicoes
    ? dados.disposicoes
    : 'Fica eleito o foro da Comarca de domicílio da parte requerida para dirimir quaisquer dúvidas, controvérsias ou litígios decorrentes da interpretação ou execução deste contrato, com expressa renúncia a qualquer outro foro, por mais privilegiado que seja.';

  return `${linha()}
${tema.toUpperCase()}
${linha()}

DAS PARTES

Pelo presente instrumento particular, de um lado:

CONTRATANTE: ${fmtDoc(dados.parte1)}, inscrito(a) no CPF/CNPJ sob o nº ${fmtDoc(dados.doc1)}, residente e domiciliado(a) na ${fmtDoc(dados.endereco1)}, doravante denominado(a) simplesmente CONTRATANTE;

E, de outro lado:

CONTRATADO: ${fmtDoc(dados.parte2)}, inscrito(a) no CPF/CNPJ sob o nº ${fmtDoc(dados.doc2)}, residente e domiciliado(a) na ${fmtDoc(dados.endereco2)}, doravante denominado(a) simplesmente CONTRATADO;

As partes acima identificadas têm, entre si, justo e acertado o presente instrumento contratual de ${tema.toLowerCase()}, que se regerá pelas cláusulas e condições seguintes.

${linha()}

CLÁUSULA PRIMEIRA – DO OBJETO

O presente contrato tem por objeto: ${dados.objeto || '_________________________'}.

Parágrafo único. O serviço objeto deste contrato deverá obrigatoriamente atender às especificações previamente definidas e alinhadas entre as partes, respeitando os prazos estabelecidos e garantindo a qualidade técnica e o correto funcionamento de todas as funcionalidades contratadas.

${linha()}

CLÁUSULA SEGUNDA – DAS CONDIÇÕES E OBRIGAÇÕES

2.1. As partes comprometem-se a executar todas as obrigações descritas estritamente conforme as especificações técnicas e funcionais acordadas entre as partes.

2.2. O prazo para conclusão dos serviços será de ${fmtDoc(dados.prazo)}, contado a partir da data de assinatura deste instrumento${dados.data_inicio ? `, iniciando-se em ${dados.data_inicio}.` : '.'}

2.3. Cada parte obriga-se a fornecer tempestivamente todas as informações, dados e materiais necessários para a integral realização do objeto contratual.

2.4. Quaisquer alterações no escopo inicial do projeto deverão ser formalmente aprovadas por ambas as partes antes do início de sua respectiva execução, sob pena de não serem consideradas válidas.

2.5. As partes comprometem-se mutuamente a cumprir todas as cláusulas deste contrato, agindo sempre pautadas nos princípios da boa-fé e do respeito mútuo.
${condicoes}

${linha()}

CLÁUSULA TERCEIRA – DO VALOR

Pela prestação dos serviços objeto deste contrato, o CONTRATANTE pagará ao CONTRATADO o valor total de ${valorFmt}${extensoStr}.

${linha()}

CLÁUSULA QUARTA – DA FORMA DE PAGAMENTO

O pagamento será realizado ${pagamento}

${linha()}

CLÁUSULA QUINTA – DA VIGÊNCIA

O presente contrato terá vigência pelo período de ${fmtDoc(dados.prazo)}, iniciando-se em ${dados.data_inicio || dataAtual}, e encerrando-se automaticamente após o integral cumprimento de todas as obrigações previstas neste instrumento, salvo acordo formal em contrário estabelecido entre as partes.

${linha()}

CLÁUSULA SEXTA – DA RESCISÃO

Qualquer das partes poderá rescindir o presente contrato mediante notificação prévia por escrito com antecedência mínima de 30 (trinta) dias, salvo disposição em contrário acordada entre as partes.

Em caso de descumprimento de qualquer cláusula contratual, a parte prejudicada poderá rescindir o contrato de pleno direito, independentemente de notificação judicial ou extrajudicial.

${linha()}

CLÁUSULA SÉTIMA – DAS DISPOSIÇÕES GERAIS E FORO

7.1. As partes declaram expressamente que leram e concordam com todas as cláusulas deste contrato, comprometendo-se a cumpri-las integralmente em todos os seus termos.

7.2. Qualquer alteração ou aditamento a este contrato somente terá validade jurídica se realizada por escrito e devidamente assinada por ambas as partes.

7.3. ${foro}

${linha()}

E, por estarem assim justas e contratadas, as partes assinam o presente instrumento em duas vias de igual teor e forma, na presença das testemunhas abaixo.

${dados.cidade || '_________________________'}, ${dados.data || dataAtual}.

____________________________________
CONTRATANTE: ${fmtDoc(dados.parte1)}

____________________________________
CONTRATADO: ${fmtDoc(dados.parte2)}

${linha()}

TESTEMUNHAS:

${'─'.repeat(30)}
1ª Testemunha
  Nome: _________________________
  CPF: _________________________
  Assinatura: _________________________

${'─'.repeat(30)}
2ª Testemunha
  Nome: _________________________
  CPF: _________________________
  Assinatura: _________________________`;
};
