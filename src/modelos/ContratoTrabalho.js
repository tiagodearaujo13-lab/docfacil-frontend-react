export const gerarTextoTrabalho = (dados) => {
  const dataHoje = new Date().toLocaleDateString("pt-PT");

  // --- DADOS DO EMPREGADOR ---
  const empregador = dados.empregador || "___________________ (Nome da Empresa)";
  const empregadorNIF = dados.nifEmpregador || "_________";
  const empregadorMorada = dados.moradaEmpregador || "___________________";

  // --- DADOS DO TRABALHADOR ---
  const trabalhador = dados.trabalhador || "___________________ (Nome Completo)";
  const trabalhadorNIF = dados.nifTrabalhador || "_________";
  const trabalhadorNISS = dados.nissTrabalhador || "_________ (NISS)";
  const trabalhadorMorada = dados.moradaTrabalhador || "___________________";
  const iban = dados.ibanTrabalhador || "PT50 _________________________"; 

  // --- DADOS CONTRATUAIS ---
  const funcao = dados.funcao || "___________________";
  const salario = dados.salario || "0,00";
  const dataInicio = dados.dataInicio || "DD/MM/AAAA";
  const dataFim = dados.dataFim || "DD/MM/AAAA";
  const local = dados.moradaImovel || "Sede da empresa";
  
  // Seguro (Obrigatório)
  const seguradora = dados.seguradora || "___________________";
  const apolice = dados.apolice || "___________________";

  // --- LÓGICA DO MOTIVO (CRÍTICA) ---
  // O ideal é que o 'dados.motivoTermo' já venha com a referência à lei (ex: "Acréscimo de trabalho - Art. 140 nº2 al. f)")
  const motivo = dados.motivoTermo || "Acréscimo excecional de atividade da empresa (Artigo 140.º n.º 2 alínea f) do CT).";

  // INÍCIO DAS CLÁUSULAS
  let clausulas = [
    {
      titulo: "CLÁUSULA 1.ª (IDENTIFICAÇÃO DAS PARTES)",
      texto: `ENTRE:\n\n1. EMPREGADOR: ${empregador}, NIPC ${empregadorNIF}, com sede em ${empregadorMorada}.\n\n2. TRABALHADOR: ${trabalhador}, NIF ${trabalhadorNIF} e Beneficiário da Segurança Social n.º ${trabalhadorNISS}, residente em ${trabalhadorMorada}.\n\nÉ celebrado, de livre vontade e boa fé, o presente CONTRATO DE TRABALHO A TERMO RESOLUTIVO CERTO, nos termos do Código do Trabalho (Lei n.º 7/2009).`
    },
    {
      titulo: "CLÁUSULA 2.ª (FUNÇÃO E CATEGORIA)",
      texto: `1. O Trabalhador é admitido para exercer as funções de ${funcao}, inerentes à categoria profissional correspondente.\n2. O Trabalhador desempenhará as suas funções com zelo e lealdade, no local de trabalho sito em: ${local}, sem prejuízo do regime de mobilidade geográfica previsto no art. 194.º do Código do Trabalho.`
    },
    {
      titulo: "CLÁUSULA 3.ª (DURAÇÃO E VIGÊNCIA)",
      texto: `O presente contrato tem início em ${dataInicio} e termo em ${dataFim}, tendo a duração certa estipulada pelas partes.`
    },
    {
      titulo: "CLÁUSULA 4.ª (MOTIVO JUSTIFICATIVO DO TERMO)",
      texto: `1. A estipulação do termo certo fundamenta-se estritamente no disposto no Artigo 140.º do Código do Trabalho, concretamente devido a:\n"${motivo}"\n2. As partes declaram expressamente que o motivo indicado é verdadeiro e corresponde à realidade material da empresa, aceitando o Trabalhador a transitoriedade do vínculo.`
    },
    {
      titulo: "CLÁUSULA 5.ª (RENOVAÇÃO)",
      texto: `O contrato renova-se automaticamente no final do prazo estipulado, por igual período (se legalmente admissível), salvo se qualquer das partes comunicar à outra a vontade de o não renovar, por escrito, com a antecedência mínima legal (15 dias para o Empregador, 8 dias para o Trabalhador).`
    },
    {
      titulo: "CLÁUSULA 6.ª (PERÍODO EXPERIMENTAL)",
      texto: `O período experimental tem a duração de 30 dias (para contratos com duração igual ou superior a 6 meses) ou 15 dias (para contratos inferiores), conforme o Artigo 112.º do Código do Trabalho. Durante este período, qualquer das partes pode denunciar o contrato sem aviso prévio nem indemnização.`
    },
    {
      titulo: "CLÁUSULA 7.ª (RETRIBUIÇÃO)",
      texto: `1. O Trabalhador auferirá a retribuição base mensal ilíquida de ${salario}€ (Euros), sujeita aos descontos legais.\n2. O pagamento será efetuado por transferência bancária para o IBAN: ${iban}.\n3. O Trabalhador tem ainda direito a Subsídio de Alimentação (se aplicável na empresa) e aos subsídios de Férias e de Natal, proporcionais à duração do contrato.`
    },
    {
      titulo: "CLÁUSULA 8.ª (SEGURO DE ACIDENTES DE TRABALHO)",
      texto: `O Empregador declara ter transferido a responsabilidade por acidentes de trabalho para a Seguradora ${seguradora}, através da Apólice n.º ${apolice}, garantindo a proteção do Trabalhador desde o início da vigência do contrato.`
    },
    {
      titulo: "CLÁUSULA 9.ª (PROTEÇÃO DE DADOS - RGPD)",
      texto: `O Trabalhador autoriza o tratamento dos seus dados pessoais e biométricos para fins estritamente ligados à execução do contrato, processamento salarial e cumprimento de obrigações legais (Segurança Social, Autoridade Tributária e Seguradora), comprometendo-se o Empregador a garantir a sua confidencialidade.`
    },
    {
      titulo: "CLÁUSULA 10.ª (FORMAÇÃO PROFISSIONAL)",
      texto: `O Trabalhador tem direito a um mínimo de 40 horas de formação contínua anual (ou proporcional à duração do contrato), cabendo ao Empregador assegurar a sua realização ou o pagamento do respetivo crédito de horas no final do contrato.`
    }
  ];

  // --- CLÁUSULAS CONDICIONAIS ---

  if (dados.temConfidencialidade) {
    const num = clausulas.length + 1;
    clausulas.push({
      titulo: `CLÁUSULA ${num}.ª (DEVER DE CONFIDENCIALIDADE)`,
      texto: "O Trabalhador obriga-se a guardar rigoroso sigilo profissional sobre segredos comerciais, processos de fabrico, listas de clientes e dados financeiros da empresa, mantendo-se esta obrigação mesmo após a cessação do contrato."
    });
  }

  if (dados.temExclusividade) {
    const num = clausulas.length + 1;
    clausulas.push({
      titulo: `CLÁUSULA ${num}.ª (EXCLUSIVIDADE)`,
      texto: "O Trabalhador obriga-se a prestar a sua atividade em regime de exclusividade, não podendo exercer outras atividades profissionais remuneradas, concorrentes ou não, sem autorização prévia e escrita do Empregador."
    });
  }

  if (dados.clausulasExtras && dados.clausulasExtras.trim() !== "") {
    const num = clausulas.length + 1;
    clausulas.push({
      titulo: `CLÁUSULA ${num}.ª (DISPOSIÇÕES ESPECÍFICAS)`,
      texto: dados.clausulasExtras
    });
  }

  // --- FECHO ---
  clausulas.push({
    titulo: "FORO E LEI APLICÁVEL",
    texto: `Para todas as questões emergentes deste contrato, é competente o Tribunal do Trabalho da comarca de ${dados.comarca || "Lisboa"}.`
  });

  clausulas.push({
    titulo: "ASSINATURAS",
    texto: `Feito em duplicado, ficando um exemplar para cada parte.\n\nAssinado em ${local}, no dia ${dataHoje}.`
  });

  return {
    titulo: "CONTRATO DE TRABALHO A TERMO RESOLUTIVO CERTO",
    clausulas: clausulas,
    assinantes: {
      parte1: "O Empregador",
      parte2: "O Trabalhador"
    }
  };
};