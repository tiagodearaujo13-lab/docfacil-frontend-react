export const gerarTextoTrabalho = (dados) => {
  const dataHoje = new Date().toLocaleDateString("pt-PT");

  // --- DADOS DAS PARTES ---
  const empregador = dados.empregador || "___________________ (Nome da Empresa)";
  const empregadorNIF = dados.nifEmpregador || "_________";
  const empregadorMorada = dados.moradaEmpregador || "___________________";

  const trabalhador = dados.trabalhador || "___________________ (Nome Completo)";
  const trabalhadorNIF = dados.nifTrabalhador || "_________";
  const trabalhadorNISS = dados.nissTrabalhador || "_________";
  const trabalhadorMorada = dados.moradaTrabalhador || "___________________";
  // NOVO CAMPO
  const iban = dados.ibanTrabalhador || "PT50 _________________________"; 

  // --- CONDIÇÕES ---
  const funcao = dados.funcao || "___________________";
  const salario = dados.salario || "0,00";
  const dataInicio = dados.dataInicio || "___/___/____";
  const dataFim = dados.dataFim || "___/___/____";
  const motivo = dados.motivoTermo || "Acréscimo excecional de atividade da empresa.";
  const local = dados.moradaImovel || "Sede da empresa";

  // INÍCIO DAS CLÁUSULAS
  let clausulas = [
    {
      titulo: "CLÁUSULA 1.ª (IDENTIFICAÇÃO DAS PARTES)",
      texto: `ENTRE:\n\n1. ${empregador}, pessoa coletiva n.º ${empregadorNIF}, com sede em ${empregadorMorada}, adiante designado por PRIMEIRO OUTORGANTE ou EMPREGADOR.\n\n2. ${trabalhador}, contribuinte fiscal n.º ${trabalhadorNIF} e beneficiário da Segurança Social n.º ${trabalhadorNISS}, residente em ${trabalhadorMorada}, adiante designado por SEGUNDO OUTORGANTE ou TRABALHADOR.\n\nÉ celebrado, de livre vontade e boa fé, o presente CONTRATO DE TRABALHO A TERMO CERTO, que se rege pelo Código do Trabalho (Lei n.º 7/2009) e pelas cláusulas seguintes:`
    },
    {
      titulo: "CLÁUSULA 2.ª (FUNÇÃO E CATEGORIA)",
      texto: `1. O Trabalhador é admitido ao serviço do Empregador para exercer as funções de ${funcao}, inerentes à categoria profissional correspondente.\n2. O Trabalhador compromete-se a desempenhar as suas funções com zelo, lealdade e assiduidade, cumprindo as ordens e instruções do Empregador.`
    },
    {
      titulo: "CLÁUSULA 3.ª (LOCAL DE TRABALHO E MOBILIDADE)",
      texto: `1. O local de trabalho situa-se em: ${local}.\n2. O Empregador reserva-se o direito de transferir o Trabalhador para outro local de trabalho, temporária ou definitivamente, nas condições previstas no Artigo 194.º do Código do Trabalho.`
    },
    {
      titulo: "CLÁUSULA 4.ª (DURAÇÃO E MOTIVO DO TERMO)",
      texto: `1. O presente contrato tem início em ${dataInicio} e termo em ${dataFim}.\n2. A estipulação do termo certo fundamenta-se no Artigo 140.º do Código do Trabalho, concretamente devido a: ${motivo}.\n3. As partes declaram que o motivo justificativo acima indicado é verdadeiro e corresponde à realidade.`
    },
    {
      titulo: "CLÁUSULA 5.ª (RENOVAÇÃO)",
      texto: `O contrato não se renova automaticamente no final do prazo estipulado, caducando na data prevista, salvo se as partes acordarem a sua renovação por escrito.`
    },
    {
      titulo: "CLÁUSULA 6.ª (HORÁRIO DE TRABALHO)",
      texto: `O período normal de trabalho é de 40 horas semanais, sendo o horário definido pelo Empregador, respeitando os limites legais e os dias de descanso semanal obrigatório e complementar.`
    },
    {
      titulo: "CLÁUSULA 7.ª (RETRIBUIÇÃO E PAGAMENTO)",
      texto: `1. Como contrapartida pelo trabalho prestado, o Empregador pagará ao Trabalhador a retribuição base mensal ilíquida de ${salario}€ (Euros).\n2. O pagamento será efetuado por transferência bancária para o IBAN indicado pelo Trabalhador: ${iban}.\n3. Compete ao Trabalhador informar o Empregador, por escrito e com a devida antecedência, de qualquer alteração ao IBAN acima indicado.`
    },
    {
      titulo: "CLÁUSULA 8.ª (PERÍODO EXPERIMENTAL)",
      texto: `Durante os primeiros 30 dias de vigência do contrato (ou o prazo legal aplicável à função), qualquer das partes pode denunciá-lo sem necessidade de aviso prévio ou invocação de justa causa, não havendo lugar a indemnização.`
    },
    {
      titulo: "CLÁUSULA 9.ª (FÉRIAS E SUBSÍDIOS)",
      texto: `O Trabalhador tem direito a férias, subsídio de férias e subsídio de Natal proporcionais à duração do contrato, nos termos da lei geral.`
    }
  ];

  if (dados.temConfidencialidade) {
    clausulas.push({
      titulo: "CLÁUSULA 10.ª (DEVER DE CONFIDENCIALIDADE)",
      texto: "O Trabalhador obriga-se a guardar rigoroso sigilo profissional sobre todos os factos, informações, métodos ou negócios da empresa de que tome conhecimento."
    });
  }

  if (dados.temExclusividade) {
    clausulas.push({
      titulo: "CLÁUSULA 11.ª (EXCLUSIVIDADE)",
      texto: "Durante a vigência deste contrato, o Trabalhador obriga-se a prestar a sua atividade profissional em regime de exclusividade ao Empregador."
    });
  }

  if (dados.clausulasExtras && dados.clausulasExtras.trim() !== "") {
    const numClausula = clausulas.length + 1; 
    clausulas.push({
      titulo: `CLÁUSULA ${numClausula}.ª (DISPOSIÇÕES ESPECÍFICAS)`,
      texto: dados.clausulasExtras
    });
  }

  clausulas.push({
    titulo: "CLÁUSULA FINAL (FORO E LEI APLICÁVEL)",
    texto: `Em tudo o que for omisso neste contrato, aplica-se a Legislação Portuguesa. Para dirimir quaisquer litígios emergentes, é competente o Tribunal do Trabalho da comarca de ${dados.comarca || "Lisboa"}.`
  });

  clausulas.push({
    titulo: "ASSINATURAS",
    texto: `O presente contrato é feito em duplicado, valendo como recibo do exemplar entregue ao Trabalhador.\n\nAssinado em ${local}, no dia ${dataHoje}.`
  });

  return {
    titulo: "CONTRATO DE TRABALHO A TERMO CERTO",
    clausulas: clausulas,
    assinantes: {
      parte1: "O Empregador",
      parte2: "O Trabalhador"
    }
  };
};