export const gerarTextoDomestico = (dados) => {
  const dataHoje = new Date().toLocaleDateString("pt-PT");

  // Dados do Empregador
  const empregador = dados.empregador || "___________________";
  const empregadorNIF = dados.nifEmpregador || "_________"; // Vamos precisar adicionar este campo no Editor depois
  const empregadorMorada = dados.moradaEmpregador || "___________________";

  // Dados do Trabalhador
  const trabalhador = dados.trabalhador || "___________________";
  const trabalhadorNIF = dados.nifTrabalhador || "_________";
  const trabalhadorNISS = dados.nissTrabalhador || "_________"; // Segurança Social é vital aqui
  const trabalhadorMorada = dados.moradaTrabalhador || "___________________";

  // Condições
  const localTrabalho = dados.moradaImovel || "Domicílio do Empregador";
  const dataInicio = dados.dataInicio || "___/___/____";
  const funcoes = dados.descricaoServico || "Limpeza da habitação, tratamento de roupas e confeção de refeições.";
  
  // Remuneração
  const salario = dados.salario || "0,00";
  const formaPagamento = dados.metodoPagamento || "transferência bancária";

  return {
    titulo: "CONTRATO DE TRABALHO DE SERVIÇO DOMÉSTICO",
    clausulas: [
      {
        titulo: "PRIMEIRA (IDENTIFICAÇÃO DAS PARTES)",
        texto: `ENTRE:\n\n1. ${empregador}, NIF ${empregadorNIF}, residente em ${empregadorMorada}, doravante designado por EMPREGADOR.\n\n2. ${trabalhador}, NIF ${trabalhadorNIF} e NISS ${trabalhadorNISS}, residente em ${trabalhadorMorada}, doravante designado por TRABALHADOR.\n\nÉ celebrado o presente contrato de serviço doméstico, regulado pelo Decreto-Lei n.º 235/92, de 24 de outubro.`
      },
      {
        titulo: "SEGUNDA (FUNÇÕES E CATEGORIA)",
        texto: `1. O Trabalhador é admitido ao serviço do Empregador para desempenhar as funções inerentes à atividade doméstica, nomeadamente: ${funcoes}.\n2. O Trabalhador obriga-se a desempenhar as suas funções com zelo, lealdade e obediência às instruções do Empregador.`
      },
      {
        titulo: "TERCEIRA (LOCAL DE TRABALHO)",
        texto: `A atividade será prestada no domicílio do Empregador, sito em: ${localTrabalho}.`
      },
      {
        titulo: "QUARTA (DURAÇÃO E PERÍODO EXPERIMENTAL)",
        texto: `1. O contrato tem início em ${dataInicio} e é celebrado por tempo indeterminado (ou a termo, se especificado).\n2. Os primeiros 90 dias consideram-se período experimental, durante o qual qualquer das partes pode rescindir o contrato sem aviso prévio e sem justa causa.`
      },
      {
        titulo: "QUINTA (RETRIBUIÇÃO)",
        texto: `1. Como contrapartida pelo trabalho prestado, o Empregador pagará ao Trabalhador a retribuição mensal ilíquida de ${salario}€ (Euros).\n2. O pagamento será efetuado até ao último dia útil de cada mês, através de ${formaPagamento}.`
      },
      {
        titulo: "SEXTA (ALIMENTAÇÃO E ALOJAMENTO)",
        texto: `Salvo acordo em contrário, o Empregador fornecerá as refeições ao Trabalhador durante o período de trabalho. (Nota: Se houver alojamento incluído, deve ser descrito em anexo, pois conta como retribuição em espécie).`
      },
      {
        titulo: "SÉTIMA (SUBSÍDIOS DE FÉRIAS E NATAL)",
        texto: `O Trabalhador tem direito a receber o Subsídio de Férias e o Subsídio de Natal, de montante igual à retribuição mensal, a serem pagos nos termos da lei vigente.`
      },
      {
        titulo: "OITAVA (SEGUROS E SEGURANÇA SOCIAL)",
        texto: `1. O Empregador obriga-se a inscrever o Trabalhador na Segurança Social e a efetuar os respetivos descontos e pagamentos.\n2. O Empregador declara ter transferido a responsabilidade por acidentes de trabalho para uma Companhia de Seguros, cumprindo a obrigação legal obrigatória.`
      },
      {
        titulo: "NONA (CONFIDENCIALIDADE)",
        texto: `O Trabalhador compromete-se a guardar sigilo sobre a vida privada e familiar do Empregador, não divulgando quaisquer factos de que tome conhecimento no exercício das suas funções.`
      },
      {
        titulo: "ASSINATURAS",
        texto: `O presente contrato é feito em duplicado, ficando um exemplar para cada uma das partes.\n\nAssinado em ${localTrabalho}, no dia ${dataHoje}.`
      }
    ],
    assinantes: {
      parte1: "O Empregador",
      parte2: "O Trabalhador"
    }
  };
};