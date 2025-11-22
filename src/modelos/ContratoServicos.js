export const gerarTextoContrato = (dados) => {
  const dataHoje = new Date().toLocaleDateString("pt-PT");

  // --- IDENTIFICAÇÃO ---
  const prestador = dados.prestador || "___________________ (Nome/Empresa)";
  const prestadorNIF = dados.prestadorNIF || "_________";
  const prestadorMorada = dados.prestadorMorada || "___________________";
  
  const cliente = dados.cliente || "___________________ (Nome/Empresa)";
  const clienteNIF = dados.clienteNIF || "_________";
  const clienteMorada = dados.clienteMorada || "___________________";

  // --- DETALHES COMERCIAIS ---
  const servico = dados.descricaoServico || "Descrição detalhada dos serviços a prestar.";
  const valor = dados.valor || "0,00";
  const prazo = dados.prazo || "indeterminado"; // Data fim ou duração
  const comarca = dados.comarca || "Lisboa";

  // INÍCIO DAS CLÁUSULAS
  let clausulas = [
    {
      titulo: "CLÁUSULA 1.ª (IDENTIFICAÇÃO DAS PARTES)",
      texto: `ENTRE:\n\n1. PRIMEIRO OUTORGANTE: ${prestador}, contribuinte fiscal n.º ${prestadorNIF}, com domicílio profissional/sede em ${prestadorMorada}, doravante designado por PRESTADOR.\n\n2. SEGUNDO OUTORGANTE: ${cliente}, contribuinte fiscal n.º ${clienteNIF}, com sede/domicílio em ${clienteMorada}, doravante designado por CLIENTE.\n\nÉ celebrado, de boa fé, o presente Contrato de Prestação de Serviços, que se rege pelas cláusulas seguintes:`
    },
    {
      titulo: "CLÁUSULA 2.ª (OBJETO)",
      texto: `1. Pelo presente contrato, o Prestador obriga-se a realizar para o Cliente, com autonomia técnica e isenção, os serviços de: ${servico}.\n2. O Prestador compromete-se a afetar os meios humanos e técnicos necessários e adequados para a boa execução do serviço contratado.`
    },
    {
      titulo: "CLÁUSULA 3.ª (REGIME DE PRESTAÇÃO)",
      texto: `1. O Prestador atuará com total autonomia técnica, sem sujeição a horário de trabalho, poder disciplinar ou direção técnica do Cliente.\n2. O presente contrato tem natureza estritamente civil/comercial, declarando as partes que não existe qualquer vínculo de subordinação jurídica ou relação laboral entre elas.`
    },
    {
      titulo: "CLÁUSULA 4.ª (PREÇO E CONDIÇÕES DE PAGAMENTO)",
      texto: `1. Como contrapartida pelos serviços, o Cliente pagará ao Prestador a quantia de ${valor}€ (Euros), acrescida de IVA à taxa legal em vigor, se aplicável.\n2. O pagamento será efetuado mediante a apresentação da respetiva fatura/recibo, devendo ser liquidado no prazo de até 30 dias após a sua emissão.\n3. Em caso de atraso no pagamento, o Cliente ficará sujeito ao pagamento de juros de mora à taxa legal comercial em vigor.`
    },
    {
      titulo: "CLÁUSULA 5.ª (DESPESAS)",
      texto: `Salvo acordo escrito em contrário, todas as despesas necessárias à execução do serviço (deslocações, materiais, estadias) correm por conta do Cliente, desde que previamente aprovadas por este e mediante apresentação de comprovativos.`
    },
    {
      titulo: "CLÁUSULA 6.ª (DURAÇÃO E VIGÊNCIA)",
      texto: `O presente contrato entra em vigor na data da sua assinatura e é válido até ${prazo}. Qualquer das partes poderá denunciar o contrato mediante aviso prévio por escrito (carta registada ou email com confirmação de leitura) com a antecedência mínima de 30 dias.`
    }
  ];

  // --- CLÁUSULAS OPCIONAIS (ATIVADAS NO EDITOR) ---

  // 1. Propriedade Intelectual (Vital para criativos/devs)
  clausulas.push({
    titulo: "CLÁUSULA 7.ª (PROPRIEDADE INTELECTUAL)",
    texto: "Com o pagamento integral do preço acordado, a titularidade dos direitos de propriedade intelectual sobre os resultados finais do serviço transfere-se para o Cliente. O Prestador mantém, contudo, o direito de utilizar o trabalho realizado para efeitos de portfólio e autopromoção, salvo indicação em contrário."
  });

  // 2. Confidencialidade
  if (dados.temConfidencialidade) {
    clausulas.push({
      titulo: "CLÁUSULA 8.ª (CONFIDENCIALIDADE)",
      texto: "Ambas as partes obrigam-se a manter o mais estrito sigilo sobre todas as informações técnicas, comerciais ou financeiras a que tenham acesso no âmbito deste contrato, não podendo divulgá-las a terceiros durante a vigência do contrato e pelo período de 2 anos após o seu termo."
    });
  }

  // 3. Exclusividade
  if (dados.temExclusividade) {
    clausulas.push({
      titulo: "CLÁUSULA 9.ª (EXCLUSIVIDADE)",
      texto: "Durante a vigência deste contrato, o Prestador compromete-se a não prestar serviços de natureza idêntica a concorrentes diretos do Cliente, garantindo a exclusividade no setor de atividade acordado."
    });
  }

  // 4. Suspensão de Serviços (Proteção contra falta de pagamento)
  clausulas.push({
    titulo: "CLÁUSULA 10.ª (SUSPENSÃO DOS SERVIÇOS)",
    texto: "O Prestador reserva-se o direito de suspender a execução dos serviços caso se verifique um atraso no pagamento superior a 15 dias, sem que tal constitua incumprimento da sua parte."
  });

  // 5. Proteção de Dados
  clausulas.push({
    titulo: "CLÁUSULA 11.ª (PROTEÇÃO DE DADOS - RGPD)",
    texto: "As partes comprometem-se a tratar os dados pessoais a que tenham acesso estritamente para a execução deste contrato, cumprindo o Regulamento Geral sobre a Proteção de Dados (RGPD), não os cedendo a terceiros sem consentimento."
  });

  // --- CAMPO LIVRE (CLÁUSULAS EXTRAS DA EMPRESA) ---
  if (dados.clausulasExtras && dados.clausulasExtras.trim() !== "") {
    const num = clausulas.length + 1;
    clausulas.push({
      titulo: `CLÁUSULA ${num}.ª (DISPOSIÇÕES ESPECÍFICAS)`,
      texto: dados.clausulasExtras
    });
  }

  // --- FECHO ---
  clausulas.push({
    titulo: "CLÁUSULA FINAL (LEI E FORO)",
    texto: `Para a resolução de qualquer litígio emergente deste contrato, as partes escolhem o foro da Comarca de ${comarca}, com expressa renúncia a qualquer outro.`
  });

  clausulas.push({
    titulo: "ASSINATURAS",
    texto: `O presente contrato é feito em duplicado, valendo como título executivo.\n\nAssinado em ${comarca}, no dia ${dataHoje}.`
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