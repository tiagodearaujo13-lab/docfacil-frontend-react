export const gerarTextoContrato = (dados) => {
  const dataHoje = new Date().toLocaleDateString("pt-PT");

  // Dados do Prestador
  const prestador = dados.prestador || "___________________";
  const prestadorNIF = dados.prestadorNIF || "_________";
  const prestadorMorada = dados.prestadorMorada || "___________________";

  // Dados do Cliente
  const cliente = dados.cliente || "___________________";
  const clienteNIF = dados.clienteNIF || "_________";
  const clienteMorada = dados.clienteMorada || "___________________";

  const servico = dados.descricaoServico || "___________________";
  const valor = dados.valor || "_____";
  const dataFim = dados.prazo || "indeterminado";
  const comarca = dados.comarca || "Lisboa";

  // Cláusulas Robustas
  let clausulas = [
    {
      titulo: "PRIMEIRA (IDENTIFICAÇÃO DAS PARTES)",
      texto: `ENTRE:\n\n1. PRIMEIRO OUTORGANTE: ${prestador}, contribuinte fiscal n.º ${prestadorNIF}, com domicílio profissional/sede em ${prestadorMorada}, doravante designado por PRESTADOR DE SERVIÇOS.\n\n2. SEGUNDO OUTORGANTE: ${cliente}, contribuinte fiscal n.º ${clienteNIF}, com sede/domicílio em ${clienteMorada}, doravante designado por CLIENTE.\n\nÉ celebrado, de boa fé, o presente Contrato de Prestação de Serviços, que se rege pelas cláusulas seguintes:`
    },
    {
      titulo: "SEGUNDA (OBJETO)",
      texto: `O Prestador obriga-se a realizar para o Cliente, com autonomia técnica e isenção, os serviços de: ${servico}. O Prestador compromete-se a afetar os meios humanos e técnicos necessários para a boa execução do serviço.`
    },
    {
      titulo: "TERCEIRA (PREÇO E PAGAMENTO)",
      texto: `1. Como contrapartida pelos serviços prestados, o Cliente pagará ao Prestador a quantia de ${valor}€ (Euros), acrescida de IVA à taxa legal em vigor, se aplicável.\n2. O pagamento será efetuado mediante a apresentação da respetiva fatura/recibo, devendo ser liquidado no prazo de 30 dias após a sua emissão.`
    },
    {
      titulo: "QUARTA (AUSÊNCIA DE VÍNCULO LABORAL)",
      texto: `O presente contrato tem natureza estritamente civil/comercial. O Prestador atuará com total autonomia, sem sujeição a horário de trabalho, poder disciplinar ou direção técnica do Cliente, não existindo qualquer vínculo de subordinação jurídica ou relação laboral entre as partes.`
    },
    {
      titulo: "QUINTA (OBRIGAÇÕES DO CLIENTE)",
      texto: `O Cliente obriga-se a fornecer todas as informações e acessos necessários para que o Prestador possa executar o serviço, bem como a efetuar os pagamentos nas datas acordadas.`
    },
    {
      titulo: "SEXTA (VIGÊNCIA E DENÚNCIA)",
      texto: `O presente contrato entra em vigor na data da sua assinatura e é válido até ${dataFim}. Qualquer das partes poderá denunciar o contrato mediante aviso prévio por escrito com a antecedência mínima de 30 dias.`
    }
  ];

  // --- CLÁUSULAS EXTRAS ---
  
  // Propriedade Intelectual (Importante para criativos/devs)
  clausulas.push({
    titulo: "SÉTIMA (PROPRIEDADE INTELECTUAL)",
    texto: "Salvo acordo escrito em contrário, todos os direitos de propriedade intelectual sobre os resultados finais do serviço prestado (excluindo ferramentas pré-existentes do Prestador) serão transferidos para o Cliente após o pagamento integral do preço."
  });

  if (dados.temConfidencialidade) {
    clausulas.push({
      titulo: "OITAVA (CONFIDENCIALIDADE)",
      texto: "Ambas as partes obrigam-se a manter o mais estrito sigilo sobre todas as informações técnicas, comerciais ou financeiras a que tenham acesso, não podendo divulgá-las a terceiros durante a vigência do contrato e pelo período de 2 anos após o seu termo."
    });
  }

  if (dados.temExclusividade) {
    clausulas.push({
      titulo: "NONA (EXCLUSIVIDADE)",
      texto: "O Prestador compromete-se a não prestar serviços de natureza idêntica a concorrentes diretos do Cliente durante a vigência deste contrato."
    });
  }

  // Cláusula RGPD (Obrigatória hoje em dia)
  clausulas.push({
    titulo: "DÉCIMA (PROTEÇÃO DE DADOS)",
    texto: "As partes comprometem-se a tratar os dados pessoais a que tenham acesso estritamente para a execução deste contrato, cumprindo o Regulamento Geral sobre a Proteção de Dados (RGPD)."
  });

  clausulas.push({
    titulo: "DÉCIMA PRIMEIRA (LEI E FORO)",
    texto: `Para dirimir litígios emergentes deste contrato, aplica-se a lei portuguesa e é competente o foro da Comarca de ${comarca}, com renúncia expressa a qualquer outro.`
  });

  clausulas.push({
    titulo: "ASSINATURAS",
    texto: `O presente contrato é feito em duplicado, ficando um exemplar para cada parte.\n\nAssinado em ${comarca}, no dia ${dataHoje}.`
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