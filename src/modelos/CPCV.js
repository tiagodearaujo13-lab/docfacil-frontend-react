export const gerarTextoCPCV = (dados) => {
  const dataHoje = new Date().toLocaleDateString("pt-PT");

  // Campos Simples (sem lógica complexa para não quebrar)
  const vendedor = dados.vendedor || "___________________";
  const comprador = dados.comprador || "___________________";
  const morada = dados.moradaImovel || "___________________";
  
  const valor = dados.valor || "0,00";
  const sinal = dados.valorSinal || "0,00";
  const prazo = dados.prazo || "90";

  return {
    titulo: "CONTRATO PROMESSA DE COMPRA E VENDA",
    clausulas: [
      {
        titulo: "PRIMEIRA (Partes)",
        texto: `ENTRE:\n\n1. ${vendedor}, na qualidade de PROMITENTE VENDEDOR.\n2. ${comprador}, na qualidade de PROMITENTE COMPRADOR.`
      },
      {
        titulo: "SEGUNDA (Objeto)",
        texto: `O Vendedor é dono e legítimo possuidor do imóvel sito em: ${morada}. Pelo presente contrato, promete vender ao Comprador, que promete comprar, o referido imóvel, livre de quaisquer ónus ou encargos.`
      },
      {
        titulo: "TERCEIRA (Preço e Pagamento)",
        texto: `1. O preço da venda é de ${valor}€.\n2. A título de sinal e princípio de pagamento, o Comprador entrega agora a quantia de ${sinal}€.\n3. O restante será pago no ato da escritura.`
      },
      {
        titulo: "QUARTA (Escritura)",
        texto: `A escritura pública de compra e venda será realizada no prazo máximo de ${prazo} dias a contar de hoje.`
      },
      {
        titulo: "QUINTA (Incumprimento - Sinal)",
        texto: `Em caso de incumprimento:\na) Se for do Comprador, perde o sinal a favor do Vendedor.\nb) Se for do Vendedor, terá de devolver o sinal em dobro ao Comprador.`
      },
      {
        titulo: "ASSINATURAS",
        texto: `Feito em duplicado, em ${dataHoje}.`
      }
    ],
    assinantes: {
      parte1: "Vendedor",
      parte2: "Comprador"
    }
  };
};