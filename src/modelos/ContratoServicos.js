export const gerarTextoContrato = (dados) => {
  const dataHoje = new Date().toLocaleDateString("pt-PT");

  const prestador = dados.prestador || "___________________";
  const cliente = dados.cliente || "___________________";
  const servico = dados.descricaoServico || "___________________";
  const valor = dados.valor || "_____";
  const dataFim = dados.prazo || "_____";
  const comarca = dados.comarca || "Lisboa";

  // Cláusulas Base (Obrigatórias)
  let clausulas = [
    {
      titulo: "PRIMEIRA: (Identificação das Partes)",
      texto: `ENTRE: \n\n1. ${prestador}, doravante designado por PRIMEIRO OUTORGANTE ou PRESTADOR DE SERVIÇOS.\n\n2. ${cliente}, doravante designado por SEGUNDO OUTORGANTE ou CLIENTE.\n\nÉ celebrado e reciprocamente aceite o presente Contrato, que se rege pelas cláusulas seguintes e, no que for omisso, pela legislação portuguesa aplicável.`
    },
    {
      titulo: "SEGUNDA: (Objeto)",
      texto: `O Primeiro Outorgante obriga-se a prestar ao Segundo Outorgante os seguintes serviços: ${servico}, com zelo e competência técnica.`
    },
    {
      titulo: "TERCEIRA: (Preço e Pagamento)",
      texto: `Pelos serviços prestados, o Segundo Outorgante pagará a quantia de ${valor}€ (Euros), acrescida de IVA à taxa legal em vigor, se aplicável.`
    },
    {
      titulo: "QUARTA: (Vigência)",
      texto: `O presente contrato entra em vigor na data da sua assinatura e terá a duração até ${dataFim}, podendo ser renovado por acordo entre as partes.`
    }
  ];

  // --- CLÁUSULAS OPCIONAIS (SÓ ENTRAM SE O UTILIZADOR QUISER) ---
  
  if (dados.temConfidencialidade) {
    clausulas.push({
      titulo: "QUINTA: (Confidencialidade)",
      texto: "Ambas as partes obrigam-se a manter o mais estrito sigilo sobre todas as informações confidenciais a que tenham acesso no âmbito da execução deste contrato, não podendo divulgá-las a terceiros sem prévio consentimento escrito."
    });
  }

  if (dados.temExclusividade) {
    clausulas.push({
      titulo: "SEXTA: (Exclusividade)",
      texto: "O Prestador compromete-se a não prestar serviços da mesma natureza a concorrentes diretos do Cliente durante a vigência deste contrato."
    });
  }

  // Cláusulas Finais
  clausulas.push({
    titulo: "SÉTIMA: (Foro e Lei Aplicável)",
    texto: `Para a resolução de qualquer litígio emergente deste contrato, as partes estipulam como competente o foro da Comarca de ${comarca}, com expressa renúncia a qualquer outro, aplicando-se a Lei Portuguesa.`
  });

  clausulas.push({
    titulo: "Assinaturas",
    texto: `Feito em duplicado, em ${comarca}, no dia ${dataHoje}.`
  });

 // ...
  return {
    titulo: "CONTRATO DE PRESTAÇÃO DE SERVIÇOS",
    clausulas: clausulas,
    // ADICIONA ISTO:
    assinantes: {
      parte1: "O Prestador",
      parte2: "O Cliente"
    }
  };
};