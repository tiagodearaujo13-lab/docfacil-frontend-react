export const gerarTextoCPCV = (dados) => {
  const dataHoje = new Date().toLocaleDateString("pt-PT");

  // Promitentes
  const vendedor = dados.vendedor || "___________________";
  const vendedorNIF = dados.vendedorNIF || "_________";
  const vendedorCC = dados.vendedorCC || "_________";
  const vendedorMorada = dados.vendedorMorada || "___________________";

  const comprador = dados.comprador || "___________________";
  const compradorNIF = dados.compradorNIF || "_________";
  const compradorCC = dados.compradorCC || "_________";
  const compradorMorada = dados.compradorMorada || "___________________";

  // Imóvel
  const moradaImovel = dados.moradaImovel || "___________________";
  const artigo = dados.artigoMatricial || "____";
  const conservatória = dados.conservatoria || "____";
  const predio = dados.numeroPredial || "____";

  // Valores e Prazos (Cálculo Seguro)
  const valorTotal = dados.valor || "0";
  const sinal = dados.valorSinal || "0";
  
  // Evitar erro "NaN" se estiver vazio
  const valorNum = parseFloat(valorTotal) || 0;
  const sinalNum = parseFloat(sinal) || 0;
  const remanescente = (valorNum - sinalNum).toFixed(2);
  
  const prazoEscritura = dados.prazo || "90";

  return {
    titulo: "CONTRATO PROMESSA DE COMPRA E VENDA",
    clausulas: [
      {
        titulo: "PRIMEIRA (IDENTIFICAÇÃO DAS PARTES)",
        texto: `ENTRE:\n\nPRIMEIRO OUTORGANTE (PROMITENTE VENDEDOR):\n${vendedor}, NIF ${vendedorNIF}, CC nº ${vendedorCC}, residente em ${vendedorMorada}.\n\nSEGUNDO OUTORGANTE (PROMITENTE COMPRADOR):\n${comprador}, NIF ${compradorNIF}, CC nº ${compradorCC}, residente em ${compradorMorada}.`
      },
      {
        titulo: "SEGUNDA (OBJETO)",
        texto: `O Primeiro Outorgante é dono e legítimo proprietário da fração autónoma/prédio urbano destinado a habitação, sito em ${moradaImovel}, inscrito na matriz predial urbana sob o artigo ${artigo} e descrito na Conservatória do Registo Predial de ${conservatória} sob o número ${predio}.`
      },
      {
        titulo: "TERCEIRA (PROMESSA)",
        texto: `Pelo presente contrato, o Primeiro Outorgante promete vender ao Segundo Outorgante, que por sua vez promete comprar, o imóvel identificado na cláusula anterior, livre de quaisquer ónus, encargos, hipotecas ou inquilinos.`
      },
      {
        titulo: "QUARTA (PREÇO)",
        texto: `O preço convencionado para a compra e venda é de ${valorNum}€ (Euros), que será pago da seguinte forma:`
      },
      {
        titulo: "QUINTA (SINAL E PAGAMENTO)",
        texto: `1. A título de sinal e princípio de pagamento, o Promitente Comprador entrega nesta data ao Promitente Vendedor a quantia de ${sinalNum}€, da qual é dada a respetiva quitação com a assinatura deste contrato.\n\n2. O remanescente do preço, no valor de ${remanescente}€, será pago no ato da Escritura Pública de Compra e Venda, através de cheque visado ou bancário.`
      },
      {
        titulo: "SEXTA (ESCRITURA PÚBLICA)",
        texto: `A escritura pública de compra e venda será realizada no prazo máximo de ${prazoEscritura} dias a contar da data da assinatura deste contrato.`
      },
      {
        titulo: "SÉTIMA (INCUMPRIMENTO)",
        texto: `1. Em caso de incumprimento pelo Promitente Comprador, este perde o sinal a favor do Vendedor.\n2. Em caso de incumprimento pelo Promitente Vendedor, este terá de restituir o sinal em dobro.`
      },
      {
        titulo: "ASSINATURAS",
        texto: `O presente contrato é feito em duplicado, ficando um exemplar para cada uma das partes.\n\nAssinado em ${dataHoje}.`
      }
    ],
    assinantes: {
      parte1: "Promitente Vendedor",
      parte2: "Promitente Comprador"
    }
  };
};