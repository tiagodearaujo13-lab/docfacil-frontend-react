export const gerarTextoDivida = (dados) => {
  const dataHoje = new Date().toLocaleDateString("pt-PT");

  // --- CREDOR (Quem emprestou/tem a receber) ---
  // Nota: Se o formulário não tiver campos específicos para NIF do credor, 
  // o utilizador pode preencher à mão no PDF ou adicionaremos inputs depois.
  const credor = dados.credor || "___________________ (Nome Completo)";
  const credorNIF = dados.credorNIF || "_________";
  const credorMorada = dados.credorMorada || "___________________";

  // --- DEVEDOR (Quem deve) ---
  const devedor = dados.devedor || "___________________ (Nome Completo)";
  const devedorNIF = dados.devedorNIF || "_________";
  const devedorCC = dados.devedorCC || "_________";
  const devedorMorada = dados.devedorMorada || "___________________";

  // --- VALORES ---
  const valor = dados.valor || "0,00";
  const dataLimite = dados.dataPagamento || "DD/MM/AAAA";
  const metodo = dados.metodoPagamento || "Transferência Bancária";

  let clausulas = [
    {
      titulo: "1. PARTES",
      texto: `1. CREDOR: ${credor}, NIF ${credorNIF}, residente em ${credorMorada}.\n2. DEVEDOR: ${devedor}, titular do Cartão de Cidadão n.º ${devedorCC} e NIF ${devedorNIF}, residente em ${devedorMorada}.`
    },
    {
      titulo: "2. CONFISSÃO DE DÍVIDA E CAUSA",
      texto: `Nos termos e para os efeitos do disposto no artigo 458.º do Código Civil, o Devedor declara e confessa ser devedor ao Credor da quantia de ${valor}€ (Euros).\nEsta dívida tem origem em: mútuo (empréstimo) concedido nesta data (ou prestação de serviços realizada), do qual o Devedor se confessa beneficiário.`
    },
    {
      titulo: "3. PAGAMENTO",
      texto: `O Devedor compromete-se a reembolsar a totalidade da dívida ao Credor até ao dia ${dataLimite}.\nO pagamento será efetuado através de: ${metodo}.`
    },
    {
      titulo: "4. INCUMPRIMENTO E JUROS",
      texto: `Em caso de não pagamento na data estipulada, o Devedor entrará imediatamente em mora, sendo devidos juros de mora à taxa legal em vigor para dívidas civis, calculados desde a data do vencimento até integral pagamento, sem prejuízo do direito do Credor a recorrer à via judicial para cobrança coerciva.`
    },
    {
      titulo: "5. FORÇA EXECUTIVA",
      texto: `O presente documento é assinado pelo Devedor com a consciência de que o mesmo poderá valer como título executivo em ação judicial, nos termos da lei de processo civil, caso não proceda ao pagamento voluntário.`
    }
  ];

  // --- CAMPO LIVRE (Para parcelamentos, etc) ---
  if (dados.clausulasExtras && dados.clausulasExtras.trim() !== "") {
    const num = clausulas.length + 1;
    clausulas.push({
      titulo: `${num}. DISPOSIÇÕES ESPECÍFICAS`,
      texto: dados.clausulasExtras
    });
  } else {
    // Se não houver extras, adicionamos a cláusula de prestações como sugestão se o user quiser editar
    clausulas.push({
      titulo: "6. PAGAMENTO EM PRESTAÇÕES (Opcional)",
      texto: `Caso seja acordado o pagamento em prestações, a falta de pagamento de uma única prestação implica o vencimento imediato de todas as restantes (perda do benefício do prazo).`
    });
  }

  // --- FECHO ---
  clausulas.push({
    titulo: "ASSINATURAS",
    texto: `O Devedor declara ter lido e compreendido o teor deste documento, assinando-o de livre vontade.\n\nLocal e Data: ${dados.comarca || "Portugal"}, ${dataHoje}.`
  });

  return {
    titulo: "DECLARAÇÃO DE RECONHECIMENTO DE DÍVIDA",
    clausulas: clausulas,
    assinantes: {
      parte1: "O Devedor (Confessa a dívida)",
      parte2: "O Credor (Toma conhecimento)"
    }
  };
};