export const gerarTextoDivida = (dados) => {
  const dataHoje = new Date().toLocaleDateString("pt-PT");

  // --- CREDOR (Quem tem a receber) ---
  const credor = dados.credor || "___________________ (Nome do Credor)";
  const credorNIF = dados.credorNIF || "_________";
  const credorMorada = dados.credorMorada || "___________________";

  // --- DEVEDOR (Quem deve) ---
  const devedor = dados.devedor || "___________________ (Nome do Devedor)";
  const devedorNIF = dados.devedorNIF || "_________";
  const devedorCC = dados.devedorCC || "_________";
  const devedorMorada = dados.devedorMorada || "___________________";

  // --- DETALHES DA DÍVIDA ---
  const valor = dados.valor || "0,00";
  const dataLimite = dados.dataPagamento || "DD/MM/AAAA"; // Data limite para pagar
  const metodo = dados.metodoPagamento || "Transferência Bancária para o IBAN PT50...";
  
  // Origem da dívida (Importante para o Art. 458 CC - A causa deve constar)
  // Ex: "Empréstimo concedido nesta data" ou "Prestação de serviços de X"
  const origem = dados.motivoDivida || "Mútuo (Empréstimo) concedido nesta data pelo Credor ao Devedor.";

  let clausulas = [
    {
      titulo: "1. IDENTIFICAÇÃO DAS PARTES",
      texto: `1. CREDOR: ${credor}, NIF ${credorNIF}, residente/sediado em ${credorMorada}.\n2. DEVEDOR: ${devedor}, titular do Cartão de Cidadão n.º ${devedorCC} e NIF ${devedorNIF}, residente em ${devedorMorada}.`
    },
    {
      titulo: "2. CONFISSÃO DE DÍVIDA (ART. 458.º CC)",
      texto: `Pelo presente documento, e para os efeitos do disposto no artigo 458.º do Código Civil, o Devedor declara expressamente e confessa ser devedor ao Credor da quantia líquida e exigível de ${valor}€ (Euros).\nMais declara que esta dívida tem origem em: ${origem}, da qual se reconhece beneficiário.`
    },
    {
      titulo: "3. PLANO DE PAGAMENTO",
      texto: `1. O Devedor obriga-se a reembolsar a totalidade da dívida ao Credor impreterivelmente até ao dia ${dataLimite}.\n2. O pagamento será efetuado através de: ${metodo}.\n3. O pagamento parcial não extingue a dívida, sendo imputado primeiramente nos juros e despesas e só depois no capital.`
    },
    {
      titulo: "4. INCUMPRIMENTO E PENALIZAÇÃO",
      texto: `A falta de pagamento na data estipulada constitui o Devedor imediatamente em mora, sendo devidos juros de mora à taxa legal em vigor, acrescidos de uma cláusula penal de 10% sobre o valor em dívida a título de custos administrativos de cobrança, sem prejuízo da exigibilidade imediata da totalidade da dívida.`
    },
    {
      titulo: "5. TÍTULO EXECUTIVO E RECONHECIMENTO",
      texto: `As partes atribuem ao presente documento força de Título Executivo. Para tal, o Devedor obriga-se a proceder ao Reconhecimento Presencial da sua assinatura (por Advogado, Solicitador ou Notário), reconhecendo que este requisito é essencial para permitir a execução imediata dos seus bens em caso de incumprimento, nos termos do Artigo 703.º do Código de Processo Civil.`
    },
    {
      titulo: "6. DOMICÍLIO CONVENCIONADO",
      texto: `Para efeitos de citação ou notificação judicial em caso de litígio, as partes convencionam as moradas indicadas na Cláusula 1.ª como domicílio convencionado, nos termos do artigo 190.º do CPC, obrigando-se a comunicar qualquer alteração por carta registada.`
    },
    {
      titulo: "7. OBRIGAÇÕES FISCAIS (IMPOSTO SELO)",
      texto: `Caso a dívida resulte de operação financeira (empréstimo), o pagamento do Imposto do Selo devido é da exclusiva responsabilidade do Devedor, que deverá apresentar o comprovativo de liquidação ao Credor se solicitado.`
    }
  ];

  // --- CLÁUSULAS EXTRAS ---
  if (dados.clausulasExtras && dados.clausulasExtras.trim() !== "") {
    const num = clausulas.length + 1;
    clausulas.push({
      titulo: `${num}. DISPOSIÇÕES ESPECÍFICAS`,
      texto: dados.clausulasExtras
    });
  } else {
    // Sugestão automática se não houver extras: Vencimento antecipado
    const num = clausulas.length + 1;
    clausulas.push({
      titulo: `${num}. VENCIMENTO ANTECIPADO (Se aplicável)`,
      texto: `Caso o pagamento tenha sido acordado em prestações, a falta de pagamento de uma única prestação implica o vencimento imediato e automático de todas as restantes (perda do benefício do prazo).`
    });
  }

  // --- FECHO ---
  clausulas.push({
    titulo: "ASSINATURAS",
    texto: `Feito em duplicado, em ${dados.comarca || "Portugal"}, no dia ${dataHoje}.\nO Devedor declara ter lido, compreendido e aceite o teor deste documento.`
  });

  return {
    titulo: "DECLARAÇÃO DE CONFISSÃO DE DÍVIDA E ACORDO DE PAGAMENTO",
    clausulas: clausulas,
    assinantes: {
      parte1: "O Devedor (Confesso)",
      parte2: "O Credor (Aceito)"
    }
  };
};