export const gerarTextoContrato = (dados) => {
  const dataHoje = new Date().toLocaleDateString("pt-PT");

  // --- IDENTIFICAÇÃO ---
  const prestador = dados.prestador || "___________________ (Nome/Empresa Prestador)";
  const prestadorNIF = dados.prestadorNIF || "_________";
  const prestadorMorada = dados.prestadorMorada || "___________________";
  
  const cliente = dados.cliente || "___________________ (Nome/Empresa Cliente)";
  const clienteNIF = dados.clienteNIF || "_________";
  const clienteMorada = dados.clienteMorada || "___________________";

  // --- DETALHES ---
  const servico = dados.descricaoServico || "Descrição detalhada dos serviços e entregáveis.";
  const valor = dados.valor || "0,00";
  const prazo = dados.prazo || "indeterminado"; // ou data específica
  const comarca = dados.comarca || "Lisboa";
  
  // Taxa de IVA (Importante distinguir se é autoliquidação ou taxa normal)
  // Se o user não especificar, assume-se "à taxa legal em vigor".
  const textoIVA = dados.iva ? `acrescido de IVA à taxa de ${dados.iva}%` : "acrescido de IVA à taxa legal em vigor (ou sujeito a autoliquidação, se aplicável)";

  let clausulas = [
    {
      titulo: "CLÁUSULA 1.ª (IDENTIFICAÇÃO DAS PARTES)",
      texto: `ENTRE:\n\n1. PRIMEIRO OUTORGANTE: ${prestador}, NIF/NIPC ${prestadorNIF}, com domicílio/sede em ${prestadorMorada}, doravante designado por PRESTADOR.\n\n2. SEGUNDO OUTORGANTE: ${cliente}, NIF/NIPC ${clienteNIF}, com domicílio/sede em ${clienteMorada}, doravante designado por CLIENTE.\n\nÉ celebrado, de boa fé e livre vontade, o presente Contrato de Prestação de Serviços, que se rege pelas cláusulas seguintes:`
    },
    {
      titulo: "CLÁUSULA 2.ª (OBJETO DO CONTRATO)",
      texto: `1. Pelo presente contrato, o Prestador obriga-se a realizar para o Cliente, com autonomia técnica e isenção, os serviços de: ${servico}.\n2. O Prestador compromete-se a afetar os meios humanos e técnicos necessários e adequados para a boa execução do serviço contratado, garantindo um padrão de qualidade compatível com as melhores práticas de mercado.`
    },
    {
      titulo: "CLÁUSULA 3.ª (AUTONOMIA E NÃO SUBORDINAÇÃO)",
      texto: `1. O Prestador atuará com total autonomia técnica e organizativa, não estando sujeito a horário de trabalho, poder disciplinar ou ordens diretas da hierarquia do Cliente.\n2. Para a execução do serviço, o Prestador utilizará os seus próprios meios, equipamentos e ferramentas.\n3. As partes declaram expressamente que este contrato tem natureza estritamente comercial, afastando qualquer vínculo de subordinação jurídica ou presunção de laboralidade.`
    },
    {
      titulo: "CLÁUSULA 4.ª (PREÇO E PAGAMENTO)",
      texto: `1. Como contrapartida pelos serviços, o Cliente pagará ao Prestador a quantia de ${valor}€ (Euros), ${textoIVA}.\n2. O pagamento será efetuado contra a apresentação da respetiva fatura, devendo ser liquidado no prazo de até 30 dias após a sua emissão.\n3. Em caso de atraso no pagamento, o Cliente ficará sujeito ao pagamento de juros de mora à taxa legal comercial em vigor, acrescidos de 40€ a título de custos administrativos de cobrança (DL 62/2013).`
    },
    {
      titulo: "CLÁUSULA 5.ª (DESPESAS)",
      texto: `O valor acordado inclui todos os custos normais do Prestador. Despesas extraordinárias (ex: deslocações fora do concelho, estadias, materiais específicos) só serão reembolsadas pelo Cliente se previamente aprovadas por escrito.`
    },
    {
      titulo: "CLÁUSULA 6.ª (VIGÊNCIA E DENÚNCIA)",
      texto: `1. O presente contrato entra em vigor na data da sua assinatura e é válido até ${prazo}.\n2. Qualquer das partes poderá denunciar o contrato a todo o tempo, mediante aviso prévio por escrito (email ou carta registada) com a antecedência mínima de 30 dias.\n3. Em caso de denúncia pelo Cliente antes do termo, este deverá pagar o valor proporcional ao trabalho já efetivamente realizado.`
    },
    {
      titulo: "CLÁUSULA 7.ª (PROPRIEDADE INTELECTUAL)",
      texto: `1. Com o pagamento integral do preço, transferem-se para o Cliente os Direitos Patrimoniais de autor sobre os resultados finais do serviço (ex: o logótipo final, o código compilado, o texto final).\n2. O Prestador mantém a titularidade dos Direitos Morais (direito a ser reconhecido como criador) e reserva-se o direito de utilizar o trabalho realizado em portfólio para fins de autopromoção, salvo indicação escrita em contrário.`
    }
  ];

  // --- CLÁUSULAS OPCIONAIS DINÂMICAS ---
  
  // Confidencialidade
  if (dados.temConfidencialidade) {
    const num = clausulas.length + 1;
    clausulas.push({
      titulo: `CLÁUSULA ${num}.ª (CONFIDENCIALIDADE)`,
      texto: "Ambas as partes obrigam-se a manter estrito sigilo sobre todas as informações técnicas, comerciais ou financeiras ('Know-how') a que tenham acesso, não podendo divulgá-las a terceiros durante a vigência do contrato e pelo período de 2 anos após o seu termo."
    });
  }

  // Exclusividade
  if (dados.temExclusividade) {
    const num = clausulas.length + 1;
    clausulas.push({
      titulo: `CLÁUSULA ${num}.ª (EXCLUSIVIDADE)`,
      texto: "Durante a vigência deste contrato, o Prestador compromete-se a não prestar serviços de natureza idêntica a concorrentes diretos do Cliente, garantindo a exclusividade no setor de atividade acordado."
    });
  }

  // Proteção de Dados (Sempre boa ideia incluir, mas pode ser opcional ou fixa)
  // Vamos colocá-la como fixa mas com numero dinâmico para não quebrar a ordem
  let numRGPD = clausulas.length + 1;
  clausulas.push({
    titulo: `CLÁUSULA ${numRGPD}.ª (PROTEÇÃO DE DADOS)`,
    texto: "As partes comprometem-se a tratar os dados pessoais a que tenham acesso estritamente para a execução deste contrato, cumprindo o RGPD, sendo vedada a cedência a terceiros para fins de marketing."
  });
  
  // Disposições Específicas (Campo Livre)
  if (dados.clausulasExtras && dados.clausulasExtras.trim() !== "") {
    const num = clausulas.length + 1;
    clausulas.push({
      titulo: `CLÁUSULA ${num}.ª (DISPOSIÇÕES ESPECÍFICAS)`,
      texto: dados.clausulasExtras
    });
  }

  // RAL (Consumidor) e Foro
  // Adicionamos a cláusula RAL obrigatória por lei para B2C
  const numFinal = clausulas.length + 1;
  clausulas.push({
    titulo: `CLÁUSULA ${numFinal}.ª (LITÍGIOS E FORO)`,
    texto: `1. Em caso de litígio de consumo (se o Cliente for Consumidor Final), este pode recorrer a uma Entidade de Resolução Alternativa de Litígios (RAL) da sua área de residência ou ao CNIACC.\n2. Para litígios entre empresas ou não abrangidos pela arbitragem necessária, estipula-se o foro da Comarca de ${comarca}.`
  });

  clausulas.push({
    titulo: "ASSINATURAS",
    texto: `Feito em duplicado, valendo como título executivo, em ${comarca}, no dia ${dataHoje}.`
  });

  return {
    titulo: "CONTRATO DE PRESTAÇÃO DE SERVIÇOS",
    clausulas: clausulas,
    assinantes: {
      parte1: "O Prestador",
      parte2: "O Cliente"
    }
  };
};