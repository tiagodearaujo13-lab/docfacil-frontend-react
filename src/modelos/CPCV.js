export const gerarTextoCPCV = (dados) => {
  const dataHoje = new Date().toLocaleDateString("pt-PT");

  // --- DADOS DO VENDEDOR ---
  const vendedor = dados.vendedor || "___________________ (Nome Completo)";
  const vendedorEstadoCivil = dados.estCivilVendedor || "Casado(a) / Solteiro(a)"; // Vital para consentimento conjugal
  const vendedorNIF = dados.vendedorNIF || "_________";
  const vendedorCC = dados.vendedorCC || "_________";
  const vendedorMorada = dados.vendedorMorada || "___________________";

  // --- DADOS DO COMPRADOR ---
  const comprador = dados.comprador || "___________________ (Nome Completo)";
  const compradorEstadoCivil = dados.estCivilComprador || "Casado(a) / Solteiro(a)";
  const compradorNIF = dados.compradorNIF || "_________";
  const compradorCC = dados.compradorCC || "_________";
  const compradorMorada = dados.compradorMorada || "___________________";

  // --- DADOS DO IMÓVEL (A "Blindagem" Legal) ---
  const morada = dados.moradaImovel || "___________________";
  const artigo = dados.artigoMatricial || "Artigo Urbano n.º ______ da freguesia de ______";
  const conservatoria = dados.predial || "CRP de ________, sob o registo n.º ______";
  // Obrigatório por lei (Art. 410.º n.º 3 CC)
  const licenca = dados.licencaUtilizacao || "Licença de Utilização n.º ____, emitida em __/__/____ (ou Isento)";
  const certificado = dados.certEnergetico || "Certificado Energético n.º _________";

  // --- VALORES E PAGAMENTOS ---
  const valorTotal = dados.valor || "0,00"; // Valor total da venda
  const sinal = dados.valorSinal || "0,00"; // Valor entregue agora
  
  // Cálculo simples do remanescente (se forem números válidos)
  // Se o user puser texto ("100.000"), a lógica tenta calcular, senão põe um placeholder.
  let remanescente = "________";
  try {
    const vTotal = parseFloat(valorTotal.replace(/\./g, '').replace(',', '.'));
    const vSinal = parseFloat(sinal.replace(/\./g, '').replace(',', '.'));
    if (!isNaN(vTotal) && !isNaN(vSinal)) {
      remanescente = (vTotal - vSinal).toLocaleString('pt-PT', { minimumFractionDigits: 2 });
    }
  } catch (e) {
    remanescente = "(Valor Total - Sinal)";
  }

  const prazo = dados.prazo || "90"; // Dias para a escritura

  return {
    titulo: "CONTRATO PROMESSA DE COMPRA E VENDA (CPCV)",
    clausulas: [
      {
        titulo: "CLÁUSULA 1.ª (IDENTIFICAÇÃO DAS PARTES)",
        texto: `ENTRE:\n\n1. PROMITENTE VENDEDOR: ${vendedor}, estado civil ${vendedorEstadoCivil}, titular do CC n.º ${vendedorCC} e NIF ${vendedorNIF}, residente em ${vendedorMorada}.\n\n2. PROMITENTE COMPRADOR: ${comprador}, estado civil ${compradorEstadoCivil}, titular do CC n.º ${compradorCC} e NIF ${compradorNIF}, residente em ${compradorMorada}.\n\n(Se casados em regime de comunhão, presume-se o consentimento do cônjuge ou a sua intervenção direta na assinatura).`
      },
      {
        titulo: "CLÁUSULA 2.ª (OBJETO E SITUAÇÃO JURÍDICA)",
        texto: `1. O Primeiro Outorgante é dono e legítimo proprietário da fração autónoma/prédio urbano sito em ${morada}.\n2. O imóvel encontra-se inscrito na matriz sob o ${artigo} e descrito na Conservatória do Registo Predial sob a descrição ${conservatoria}.\n3. O imóvel possui a ${licenca} e o ${certificado}, documentos cuja existência é essencial à validade deste negócio.`
      },
      {
        titulo: "CLÁUSULA 3.ª (PROMESSA)",
        texto: `Pelo presente contrato, o Vendedor promete vender ao Comprador, que promete comprar, o imóvel identificado na cláusula anterior, livre de quaisquer ónus, encargos, hipotecas ou arrendamentos.`
      },
      {
        titulo: "CLÁUSULA 4.ª (PREÇO E FORMA DE PAGAMENTO)",
        texto: `O preço da prometida compra e venda é de ${valorTotal}€ (Euros), a pagar da seguinte forma:\na) A título de sinal e princípio de pagamento, o Comprador entrega nesta data a quantia de ${sinal}€, da qual o Vendedor dá quitação com a assinatura deste contrato;\nb) O remanescente, no valor de ${remanescente}€, será pago na data da Escritura Pública, através de cheque visado ou bancário.`
      },
      {
        titulo: "CLÁUSULA 5.ª (PRAZO E ESCRITURA)",
        texto: `A escritura pública de compra e venda será realizada no prazo máximo de ${prazo} dias a contar da presente data. Compete ao Promitente Comprador a marcação da escritura e a notificação à outra parte com a antecedência mínima de 10 dias.`
      },
      {
        titulo: "CLÁUSULA 6.ª (INCUMPRIMENTO E SINAL)",
        texto: `Em caso de incumprimento imputável a quem deu o sinal (Comprador), perde este as quantias entregues a favor do Vendedor. Se o incumprimento for imputável a quem recebeu o sinal (Vendedor), terá este de restituir o sinal em dobro, nos termos do artigo 442.º do Código Civil.`
      },
      {
        titulo: "CLÁUSULA 7.ª (EXECUÇÃO ESPECÍFICA)",
        texto: `As partes atribuem ao presente contrato eficácia real ou, em alternativa, acordam expressamente a possibilidade de recurso à Execução Específica nos termos do artigo 830.º do Código Civil, para obter sentença judicial que produza os efeitos da declaração negocial do faltoso.`
      },
      {
        titulo: "CLÁUSULA 8.ª (FORMALIDADES)",
        texto: `Para cumprimento do n.º 3 do Artigo 410.º do Código Civil, as partes reconhecem a obrigatoriedade do reconhecimento presencial das suas assinaturas perante entidade competente (Notário, Advogado ou Solicitador), prescindindo de quaisquer outras formalidades.`
      }
    ],
    assinantes: {
      parte1: "O Promitente Vendedor",
      parte2: "O Promitente Comprador"
    }
  };
};