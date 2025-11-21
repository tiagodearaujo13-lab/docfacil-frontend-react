export const gerarTextoDivida = (dados) => {
  const dataHoje = new Date().toLocaleDateString("pt-PT");

  const credor = dados.credor || "___________________"; // Quem emprestou
  const devedor = dados.devedor || "___________________"; // Quem deve
  const valor = dados.valor || "0,00";
  const dataPagamento = dados.dataPagamento || "_____";
  const metodo = dados.metodoPagamento || "transferência bancária";

  return {
    titulo: "DECLARAÇÃO DE RECONHECIMENTO DE DÍVIDA",
    clausulas: [
      {
        titulo: "1. Confissão de Dívida",
        texto: `Pelo presente instrumento, ${devedor}, adiante designado de DEVEDOR, declara e confessa ser devedor da quantia de ${valor}€ (Euros) a ${credor}, adiante designado de CREDOR.`
      },
      {
        titulo: "2. Origem da Dívida",
        texto: `A dívida supra mencionada tem origem em mútuo (empréstimo) ou prestação de serviços realizado anteriormente a esta data.`
      },
      {
        titulo: "3. Forma e Prazo de Pagamento",
        texto: `O Devedor compromete-se a liquidar a totalidade da dívida até ao dia ${dataPagamento}, através de ${metodo}.`
      },
      {
        titulo: "4. Incumprimento",
        texto: `O não pagamento da quantia na data estipulada implica o vencimento imediato da dívida, podendo o Credor recorrer aos meios judiciais competentes para a sua cobrança, acrescida de juros de mora à taxa legal em vigor.`
      },
      {
        titulo: "Assinaturas",
        texto: `Por ser verdade e expressar a vontade das partes, assinam a presente declaração em duplicado, em ${dataHoje}.`
      }
    ],
    assinantes: {
      parte1: "O Devedor (Confessa a dívida)",
      parte2: "O Credor"
    }
  };
};