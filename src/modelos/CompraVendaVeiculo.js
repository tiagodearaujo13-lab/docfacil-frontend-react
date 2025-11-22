export const gerarTextoVeiculo = (dados) => {
  const dataHoje = new Date().toLocaleDateString("pt-PT");
  const horaAtual = new Date().toLocaleTimeString("pt-PT", { hour: '2-digit', minute: '2-digit' });

  // --- DADOS DO VEÍCULO ---
  const marca = dados.marca || "________________";
  const modelo = dados.modelo || "________________";
  const matricula = dados.matricula || "XX-XX-XX";
  const vin = dados.chassis || "__________________________________ (N.º Quadro)";
  const km = dados.km || "0";
  const valor = dados.valor || "0,00";

  // --- PARTES ---
  const vendedor = dados.vendedor || "___________________";
  const vendedorNIF = dados.vendedorNIF || "_________";
  const vendedorCC = dados.vendedorCC || "_________";
  const vendedorMorada = dados.vendedorMorada || "___________________";

  const comprador = dados.comprador || "___________________";
  const compradorNIF = dados.compradorNIF || "_________";
  const compradorCC = dados.compradorCC || "_________";
  const compradorMorada = dados.compradorMorada || "___________________";

  let clausulas = [
    {
      titulo: "CLÁUSULA 1.ª (IDENTIFICAÇÃO)",
      texto: `ENTRE:\n\n1. VENDEDOR: ${vendedor}, titular do CC n.º ${vendedorCC} e NIF ${vendedorNIF}, residente em ${vendedorMorada}.\n\n2. COMPRADOR: ${comprador}, titular do CC n.º ${compradorCC} e NIF ${compradorNIF}, residente em ${compradorMorada}.`
    },
    {
      titulo: "CLÁUSULA 2.ª (OBJETO)",
      texto: `O Vendedor é proprietário e legítimo possuidor do veículo automóvel ligeiro de passageiros/mercadorias, com as seguintes características:\n\nMarca: ${marca}\nModelo: ${modelo}\nMatrícula: ${matricula}\nNúmero de Quadro (VIN): ${vin}\nQuilometragem declarada: ${km} km.`
    },
    {
      titulo: "CLÁUSULA 3.ª (PREÇO E QUITAÇÃO)",
      texto: `Pelo presente contrato, o Vendedor vende ao Comprador o veículo identificado, pelo preço de ${valor}€ (Euros). O Vendedor declara ter recebido nesta data a referida quantia, servindo este documento de quitação integral.`
    },
    {
      titulo: "CLÁUSULA 4.ª (ESTADO DA VIATURA)",
      texto: `O Comprador declara ter examinado o veículo, bem como a respetiva documentação, aceitando adquiri-lo no estado físico e mecânico em que se encontra ("as is"), reconhecendo que se trata de um bem usado sujeito a desgaste natural.`
    },
    {
      titulo: "CLÁUSULA 5.ª (AUSÊNCIA DE ÓNUS OU ENCARGOS)",
      texto: `O Vendedor declara expressamente que o veículo é vendido livre de quaisquer ónus, encargos, reservas de propriedade, penhoras ou apreensões, e que sobre ele não impende qualquer dívida fiscal (IUC) até à presente data.`
    },
    {
      titulo: "CLÁUSULA 6.ª (TRANSFERÊNCIA DE PROPRIEDADE)",
      texto: `O Comprador obriga-se a efetuar o registo da transferência de propriedade na Conservatória do Registo Automóvel no prazo máximo de 30 (trinta) dias a contar da data deste contrato, assumindo todas as despesas inerentes a esse ato.`
    },
    {
      titulo: "CLÁUSULA 7.ª (RESPONSABILIDADE CIVIL E CONTRAORDENAÇÕES)",
      texto: `A posse do veículo é transmitida para o Comprador no dia ${dataHoje}, pelas ${horaAtual} horas.\nA partir deste momento exato, o Comprador assume a total e exclusiva responsabilidade pela circulação da viatura, bem como pelo pagamento de quaisquer coimas, multas, portagens (Via Verde/SCUTs), IUC futuro ou danos causados a terceiros, isentando o Vendedor de qualquer responsabilidade.`
    }
  ];

  // --- CAMPO LIVRE (CLÁUSULAS EXTRAS) ---
  if (dados.clausulasExtras && dados.clausulasExtras.trim() !== "") {
    const num = clausulas.length + 1;
    clausulas.push({
      titulo: `CLÁUSULA ${num}.ª (DISPOSIÇÕES ESPECÍFICAS)`,
      texto: dados.clausulasExtras
    });
  }

  // --- FECHO ---
  clausulas.push({
    titulo: "CLÁUSULA FINAL (FORO)",
    texto: `Para dirimir litígios emergentes deste contrato, é competente o foro da comarca do Vendedor.`
  });

  clausulas.push({
    titulo: "ASSINATURAS",
    texto: `Feito em duplicado, em ${dados.comarca || "Portugal"}, no dia ${dataHoje}.\nO Comprador declara ter recebido as chaves, o Documento Único Automóvel e o certificado de inspeção.`
  });

  return {
    titulo: "CONTRATO DE COMPRA E VENDA AUTOMÓVEL",
    clausulas: clausulas,
    assinantes: {
      parte1: "O Vendedor",
      parte2: "O Comprador"
    }
  };
};