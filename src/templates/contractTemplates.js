export const gerarContrato = (tema, dados) => {
  const dataAtual = new Date().toLocaleDateString('pt-BR');

  return `${tema.toUpperCase()}

Pelo presente instrumento particular, de um lado:

CONTRATANTE: ${dados.parte1 || '_________________________'}, inscrito(a) no CPF/CNPJ sob nº ${dados.doc1 || '_________________________'}, com endereço na ${dados.endereco1 || '_________________________'}, doravante denominado(a) simplesmente CONTRATANTE;

E de outro lado:

CONTRATADO: ${dados.parte2 || '_________________________'}, inscrito(a) no CPF/CNPJ sob nº ${dados.doc2 || '_________________________'}, com endereço na ${dados.endereco2 || '_________________________'}, doravante denominado(a) simplesmente CONTRATADO;

As partes acima identificadas têm, entre si, justo e acertado o presente instrumento contratual de ${tema.toLowerCase()}, que se regerá pelas cláusulas seguintes e pelas condições descritas no presente instrumento.

CLÁUSULA PRIMEIRA - DO OBJETO

O presente contrato tem como objeto: ${dados.objeto || '_________________________'}.

CLÁUSULA SEGUNDA - DAS CONDIÇÕES

As partes estabelecem as seguintes condições para a execução do objeto deste contrato: ${dados.condicoes || '_________________________'}.

CLÁUSULA TERCEIRA - DO VALOR E FORMA DE PAGAMENTO

Pelo objeto deste contrato, fica estabelecido o valor de R$ ${dados.valor || '_________________________'}, na seguinte forma de pagamento: ${dados.forma_pagamento || '_________________________'}.

CLÁUSULA QUARTA - DO PRAZO

O prazo de vigência do presente contrato é de ${dados.prazo || '_________________________'}, com início em ${dados.data_inicio || dataAtual}.

CLÁUSULA QUINTA - DAS OBRIGAÇÕES DAS PARTES

As partes se comprometem a cumprir fielmente todas as cláusulas e condições estabelecidas neste instrumento, agindo com boa-fé e lealdade durante toda a vigência contratual.

CLÁUSULA SEXTA - DA RESCISÃO

Qualquer das partes poderá rescindir o presente contrato mediante notificação prévia por escrito com antecedência mínima de 30 (trinta) dias, salvo disposição em contrário acordada entre as partes.

CLÁUSULA SÉTIMA - DAS DISPOSIÇÕES GERAIS

Ficam eleitas como disposições gerais aplicáveis ao presente contrato: ${dados.disposicoes || 'As partes elegem o foro da comarca de domicílio da parte requerida para dirimir quaisquer controvérsias.'}

E, por estarem assim justas e contratadas, as partes firmam o presente instrumento em duas vias de igual teor e forma, na presença das testemunhas abaixo.

${dados.cidade || '_________________________'}, ${dados.data || dataAtual}.

____________________________________
CONTRATANTE: ${dados.parte1 || '_________________________'}

____________________________________
CONTRATADO: ${dados.parte2 || '_________________________'}

____________________________________
Testemunha 1: _________________________

____________________________________
Testemunha 2: _________________________`;
};
