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
    ? `\n2.8. Condições específicas adicionais acordadas entre as partes: ${dados.condicoes}`
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

O presente contrato tem por objeto a prestação de serviços advocatícios de defesa criminal em favor do CONTRATANTE, conforme detalhamento a seguir: ${dados.objeto || '_________________________'}.

Parágrafo único. A atuação profissional objeto deste contrato abrange todos os atos necessários ao exercício da defesa dos interesses do CONTRATANTE, incluindo a elaboração de peças processuais, acompanhamento de audiências, interposição de recursos e demais medidas cabíveis no âmbito da ação penal.

${linha()}

CLÁUSULA SEGUNDA – DAS CONDIÇÕES ESPECÍFICAS DA AÇÃO PENAL

2.1. O CONTRATADO assume o compromisso de defender os interesses do CONTRATANTE no âmbito da ação penal em que este figure como parte, atuando com diligência, lealdade e estrita observância das normas ético-disciplinares da advocacia e do Código de Processo Penal.

2.2. O CONTRATADO obriga-se a:
   a) Elaborar e protocolar todas as peças processuais cabíveis, incluindo defesa preliminar, resposta à acusação, alegações finais, memoriais e recursos;
   b) Acompanhar pessoalmente as audiências designadas, salvo motivo de força maior devidamente justificado;
   c) Manter o CONTRATANTE informado sobre o andamento processual, prazos e atos relevantes;
   d) Requerer as provas necessárias à defesa, incluindo oitiva de testemunhas, perícias e diligências;
   e) Interpor recursos ordinários e extraordinários quando cabíveis e tecnicamente recomendáveis.

2.3. O prazo de vigência da atuação profissional será de ${fmtDoc(dados.prazo)}, contado a partir da data de assinatura deste instrumento${dados.data_inicio ? `, iniciando-se em ${dados.data_inicio}.` : '.'}

2.4. O CONTRATANTE obriga-se a:
   a) Fornecer tempestivamente todos os documentos, informações e elementos necessários à elaboração da defesa técnica;
   b) Comparecer aos atos processuais quando sua presença for obrigatória;
   c) Manter seus dados de contato atualizados perante o CONTRATADO e o Juízo;
   d) Comunicar imediatamente qualquer intimação ou citação recebida;
   e) Honrar pontualmente os honorários contratados.

2.5. A substituição do profissional ou a renúncia ao mandato somente ocorrerá mediante comunicação prévia por escrito, respeitado o prazo legal de 10 (dez) dias para que o CONTRATANTE constitua novo defensor, nos termos do art. 5º, § 3º, do Estatuto da Advocacia.

2.6. As partes comprometem-se a atuar com absoluta boa-fé, lealdade processual e respeito mútuo durante toda a relação contratual.

2.7. Fica ressalvado que o CONTRATADO não se responsabiliza por resultados específicos, comprometendo-se com a adoção de todos os meios lícitos e cabíveis para a defesa dos interesses do CONTRATANTE, sem garantia de êxito.
${condicoes}

${linha()}

CLÁUSULA TERCEIRA – DO VALOR

Pelos serviços advocatícios ora contratados, o CONTRATANTE pagará ao CONTRATADO os honorários no valor total de ${valorFmt}${extensoStr}.

${linha()}

CLÁUSULA QUARTA – DA FORMA DE PAGAMENTO DOS HONORÁRIOS

O pagamento dos honorários será realizado ${pagamento}

${linha()}

CLÁUSULA QUINTA – DA VIGÊNCIA

O presente contrato terá vigência pelo período de ${fmtDoc(dados.prazo)}, iniciando-se em ${dados.data_inicio || dataAtual}, e encerrando-se automaticamente após o integral cumprimento de todas as obrigações previstas neste instrumento, salvo acordo formal em contrário estabelecido entre as partes.

${linha()}

CLÁUSULA SEXTA – DA RESCISÃO E RENÚNCIA

O CONTRATANTE poderá rescindir o presente contrato a qualquer tempo, mediante comunicação por escrito, respondendo pelos honorários devidos pelos serviços já prestados.

O CONTRATADO poderá renunciar ao mandato na forma do art. 5º, § 3º, do Estatuto da Advocacia, mediante comunicação prévia com antecedência mínima de 10 (dez) dias, para que o CONTRATANTE constitua novo defensor.

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
