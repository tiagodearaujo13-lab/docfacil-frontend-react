export const gerarTextoVeiculo = (dados) => {
  const dataHoje = new Date().toLocaleDateString("pt-PT");

  // Dados do Veículo
  const marca = dados.marca || "________________";
  const modelo = dados.modelo || "________________";
  const matricula = dados.matricula || "XX-XX-XX";
  const vin = dados.chassis || "__________________________________";
  const km = dados.km || "0";
  const valor = dados.valor || "0,00";

  // Vendedor
  const vendedorNome = dados.vendedor || "___________________";
  const vendedorNIF = dados.vendedorNIF || "_________";
  const vendedorMorada = dados.vendedorMorada || "___________________";
  const vendedorCC = dados.vendedorCC || "_________";

  // Comprador
  const compradorNome = dados.comprador || "___________________";
  const compradorNIF = dados.compradorNIF || "_________";
  const compradorMorada = dados.compradorMorada || "___________________";
  const compradorCC = dados.compradorCC || "_________";

  return {
    titulo: "CONTRATO DE COMPRA E VENDA DE VEÍCULO USADO",
    clausulas: [
      {
        titulo: "PRIMEIRA: (Identificação das Partes)",
        texto: `ENTRE:\n\nPRIMEIRO OUTORGANTE (VENDEDOR):\nNome: ${vendedorNome}\nNIF: ${vendedorNIF}\nCC: ${vendedorCC}\nMorada: ${vendedorMorada}\n\nSEGUNDO OUTORGANTE (COMPRADOR):\nNome: ${compradorNome}\nNIF: ${compradorNIF}\nCC: ${compradorCC}\nMorada: ${compradorMorada}`
      },
      {
        titulo: "SEGUNDA: (Objeto do Contrato)",
        texto: `O Primeiro Outorgante é legítimo proprietário do veículo automóvel com as seguintes características:\n\nMarca: ${marca}\nModelo: ${modelo}\nMatrícula: ${matricula}\nNúmero de Quadro (VIN): ${vin}\nQuilometragem declarada: ${km} km.`
      },
      {
        titulo: "TERCEIRA: (Preço e Pagamento)",
        texto: `Pelo presente contrato, o Vendedor vende ao Comprador o veículo identificado, livre de quaisquer ónus, encargos ou reservas de propriedade, pelo preço de ${valor}€ (Euros). O Vendedor declara que já recebeu esta quantia na íntegra, servindo este documento de quitação.`
      },
      {
        titulo: "QUARTA: (Estado do Veículo)",
        texto: `O Comprador declara ter vistoriado o veículo e examinado o seu estado de conservação e funcionamento mecânico, aceitando adquiri-lo "no estado em que se encontra" (as is), prescindindo de garantia, salvo acordo escrito em contrário ou dolo comprovado do vendedor.`
      },
      {
        titulo: "QUINTA: (Transferência de Propriedade)",
        texto: `O Comprador obriga-se a promover o registo da transferência de propriedade na Conservatória do Registo Automóvel no prazo máximo de 30 (trinta) dias a contar da data deste contrato.`
      },
      {
        titulo: "SEXTA: (Responsabilidade Civil e Contraordenações)",
        texto: `A partir da hora da assinatura deste contrato, a responsabilidade pela circulação do veículo, bem como o pagamento de coimas, multas, portagens, IUC ou quaisquer outros encargos, passa a ser exclusiva do Comprador, mesmo que o registo de propriedade ainda não tenha sido atualizado.`
      },
      {
        titulo: "SÉTIMA: (Foro)",
        texto: `Para dirimir quaisquer questões emergentes deste contrato, as partes escolhem o foro da comarca da residência do Vendedor, com expressa renúncia a qualquer outro.`
      },
      {
        titulo: "Assinaturas",
        texto: `Feito em duplicado, em ${dados.comarca || "Portugal"}, no dia ${dataHoje}.`
      }
    ],
    assinantes: {
      parte1: "O Vendedor",
      parte2: "O Comprador"
    }
  };
};