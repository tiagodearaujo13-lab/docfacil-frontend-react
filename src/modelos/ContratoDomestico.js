export const gerarTextoDomestico = (dados) => {
  const dataHoje = new Date().toLocaleDateString("pt-PT");

  // --- DADOS DO EMPREGADOR ---
  const empregador = dados.empregador || "___________________ (Nome do Empregador)";
  const empregadorNIF = dados.nifEmpregador || "_________"; 
  const empregadorMorada = dados.moradaEmpregador || "___________________";

  // --- DADOS DO TRABALHADOR ---
  const trabalhador = dados.trabalhador || "___________________ (Nome do Trabalhador)";
  const trabalhadorNIF = dados.nifTrabalhador || "_________";
  const trabalhadorNISS = dados.nissTrabalhador || "_________ (NISS Obrigatório)"; 
  const trabalhadorMorada = dados.moradaTrabalhador || "___________________";
  const iban = dados.ibanTrabalhador || "PT50 _________________________";

  // --- CONDIÇÕES DE TRABALHO ---
  const localTrabalho = dados.moradaImovel || "Domicílio do Empregador";
  const dataInicio = dados.dataInicio || "___/___/____";
  const funcoes = dados.descricaoServico || "Limpeza da habitação, tratamento de roupas, engomadoria e confeção de refeições.";
  
  // --- RETRIBUIÇÃO E HORÁRIO ---
  const salario = dados.salario || "0,00"; // Salário em numerário
  const horario = dados.cargaHoraria || "40 horas semanais"; // Ex: 40h ou Part-time
  const regime = dados.regime || "Interno / Externo"; // Regime de alojamento

  // --- SEGURO (CRÍTICO) ---
  const seguradora = dados.seguradora || "___________________";
  const apolice = dados.apolice || "___________________";

  return {
    titulo: "CONTRATO DE TRABALHO DE SERVIÇO DOMÉSTICO",
    clausulas: [
      {
        titulo: "CLÁUSULA 1.ª (IDENTIFICAÇÃO DAS PARTES)",
        texto: `ENTRE:\n\n1. EMPREGADOR: ${empregador}, NIF ${empregadorNIF}, residente em ${empregadorMorada}.\n\n2. TRABALHADOR: ${trabalhador}, NIF ${trabalhadorNIF} e Beneficiário da Segurança Social n.º ${trabalhadorNISS}, residente em ${trabalhadorMorada}.\n\nÉ celebrado o presente contrato de serviço doméstico, que se rege pelo Decreto-Lei n.º 235/92, de 24 de Outubro, e legislação complementar.`
      },
      {
        titulo: "CLÁUSULA 2.ª (FUNÇÕES E CATEGORIA)",
        texto: `1. O Trabalhador é admitido para exercer, sob a autoridade e direção do Empregador, as funções inerentes à atividade doméstica, nomeadamente: ${funcoes}.\n2. O Trabalhador compromete-se a exercer as funções com zelo, pontualidade e lealdade, respeitando a privacidade do agregado familiar.`
      },
      {
        titulo: "CLÁUSULA 3.ª (LOCAL E REGIME)",
        texto: `A atividade será prestada no domicílio do Empregador, sito em ${localTrabalho}, em regime de ${regime}.`
      },
      {
        titulo: "CLÁUSULA 4.ª (DURAÇÃO E PERÍODO EXPERIMENTAL)",
        texto: `1. O contrato tem início em ${dataInicio} e é celebrado por tempo indeterminado (salvo indicação expressa em contrário).\n2. O período experimental tem a duração de 90 dias, durante o qual qualquer das partes pode denunciar o contrato sem aviso prévio nem indemnização.`
      },
      {
        titulo: "CLÁUSULA 5.ª (HORÁRIO DE TRABALHO)",
        texto: `O período normal de trabalho é de ${horario}, sendo os dias de descanso semanal gozados preferencialmente ao Domingo.`
      },
      {
        titulo: "CLÁUSULA 6.ª (RETRIBUIÇÃO)",
        texto: `1. O Empregador pagará ao Trabalhador a retribuição mensal ilíquida de ${salario}€ (Euros), acrescida do subsídio de refeição (se aplicável, em espécie ou numerário).\n2. O pagamento será efetuado por transferência bancária para o IBAN: ${iban}, até ao último dia útil do mês a que respeita.`
      },
      {
        titulo: "CLÁUSULA 7.ª (ALIMENTAÇÃO E ALOJAMENTO)",
        texto: `Salvo acordo escrito em contrário, o fornecimento de refeições ou alojamento pelo Empregador considera-se pagamento em espécie até aos limites legais previstos no Artigo 15.º do DL 235/92 (máx. 25% para alimentação), devendo constar do recibo de vencimento.`
      },
      {
        titulo: "CLÁUSULA 8.ª (SEGURO DE ACIDENTES DE TRABALHO)",
        texto: `O Empregador declara, sob compromisso de honra, que transferiu a responsabilidade infortunística (Acidentes de Trabalho) para a Companhia de Seguros ${seguradora}, através da Apólice n.º ${apolice}, cumprindo a obrigação legal vigente.`
      },
      {
        titulo: "CLÁUSULA 9.ª (CONFIDENCIALIDADE E PRIVACIDADE)",
        texto: `Dada a natureza do serviço prestado no seio do lar, o Trabalhador obriga-se a guardar rigoroso sigilo sobre a vida privada, rotinas, conversas e bens do Empregador e seu agregado familiar, constituindo a violação deste dever justa causa para despedimento.`
      },
      {
        titulo: "ASSINATURAS",
        texto: `Feito em duplicado, em ${localTrabalho}, no dia ${dataHoje}.`
      }
    ],
    assinantes: {
      parte1: "O Empregador",
      parte2: "O Trabalhador"
    }
  };
};