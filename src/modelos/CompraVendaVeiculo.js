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
  const vendedor = dados.vendedor || "___________________ (Nome Vendedor)";
  const vendedorNIF = dados.vendedorNIF || "_________";
  // Deteta se é Empresa (NIF começa por 5) para ajustar a lei aplicável
  const isVendedorProfissional = vendedorNIF.startsWith("5"); 
  const vendedorCC = dados.vendedorCC || "_________"; // Ou N.º Registo Comercial
  const vendedorMorada = dados.vendedorMorada || "___________________";

  const comprador = dados.comprador || "___________________ (Nome Comprador)";
  const compradorNIF = dados.compradorNIF || "_________";
  const compradorCC = dados.compradorCC || "_________";
  const compradorMorada = dados.compradorMorada || "___________________";

  // --- LÓGICA DE GARANTIA (CRÍTICA) ---
  let textoGarantia;
  if (isVendedorProfissional) {
    // Lei das Garantias (DL 84/2021) - Mínimo 18 meses para usados por acordo
    textoGarantia = `Sendo o Vendedor um profissional, aplica-se o regime do Decreto-Lei n.º 84/2021. As partes acordam expressamente reduzir o prazo de garantia para 18 meses, incidindo a mesma sobre os componentes mecânicos essenciais, considerando o desgaste normal decorrente da idade e quilometragem do veículo.`;
  } else {
    // Venda entre Particulares (Código Civil) - Pode vender "sem garantia"
    textoGarantia = `Tratando-se de um negócio jurídico entre particulares, o veículo é vendido no estado físico e mecânico em que se encontra ("as is"), o qual é do perfeito conhecimento do Comprador, que aceita a inexistência de garantia convencional, dispensando qualquer reclamação futura por vícios aparentes.`;
  }

  let clausulas = [
    {
      titulo: "CLÁUSULA 1.ª (IDENTIFICAÇÃO)",
      texto: `ENTRE:\n\n1. VENDEDOR: ${vendedor}, NIF/NIPC ${vendedorNIF}, com domicílio/sede em ${vendedorMorada}.\n\n2. COMPRADOR: ${comprador}, NIF/NIPC ${compradorNIF}, com domicílio/sede em ${compradorMorada}.`
    },
    {
      titulo: "CLÁUSULA 2.ª (OBJETO)",
      texto: `O Vendedor é legítimo proprietário do veículo automóvel com as seguintes características:\n\nMarca: ${marca} | Modelo: ${modelo}\nMatrícula: ${matricula} | VIN: ${vin}\nQuilometragem declarada: ${km} km.`
    },
    {
      titulo: "CLÁUSULA 3.ª (PREÇO E QUITAÇÃO)",
      texto: `O veículo é vendido livre de ónus ou encargos pelo preço de ${valor}€ (Euros). O Vendedor declara ter recebido, nesta data e hora, a referida quantia, servindo a assinatura deste contrato como quitação integral e definitiva.`
    },
    {
      titulo: "CLÁUSULA 4.ª (ESTADO E GARANTIA)",
      texto: `1. O Comprador declara ter examinado e testado o veículo, bem como inspecionado a respetiva documentação.\n2. ${textoGarantia}`
    },
    {
      titulo: "CLÁUSULA 5.ª (SITUAÇÃO JURÍDICA E FISCAL)",
      texto: `O Vendedor declara, sob compromisso de honra, que:\na) O veículo não tem reserva de propriedade a favor de terceiros (Financeiras/Bancos);\nb) Não impendem sobre o veículo penhoras, arrestos ou apreensões;\nc) O IUC (Imposto Único de Circulação) referente ao ano em curso encontra-se liquidado.`
    },
    {
      titulo: "CLÁUSULA 6.ª (TRANSFERÊNCIA DE RESPONSABILIDADE)",
      texto: `A posse do veículo transfere-se para o Comprador HOJE (${dataHoje}), exatamente às ${horaAtual} HORAS.\nA partir deste minuto preciso, o Comprador assume a responsabilidade exclusiva por:\na) Danos causados a terceiros ou ao próprio veículo;\nb) Pagamento de taxas de portagem (Via Verde, SCUTs);\nc) Coimas ou multas de trânsito e demais encargos de circulação.`
    },
    {
      titulo: "CLÁUSULA 7.ª (REGISTO OBRIGATÓRIO)",
      texto: `O Comprador obriga-se a efetuar o registo da transferência de propriedade no prazo máximo de 30 dias (Artigo 42.º do Regulamento do Registo Automóvel), sob pena de o Vendedor proceder ao pedido de apreensão do veículo junto das autoridades.`
    }
  ];

  // --- CAMPO LIVRE ---
  if (dados.clausulasExtras && dados.clausulasExtras.trim() !== "") {
    const num = clausulas.length + 1;
    clausulas.push({
      titulo: `CLÁUSULA ${num}.ª (DISPOSIÇÕES ESPECÍFICAS)`,
      texto: dados.clausulasExtras
    });
  }

  // --- FECHO ---
  clausulas.push({
    titulo: "ASSINATURAS E ENTREGA",
    texto: `O contrato é feito em duplicado.\nO Comprador declara ter recebido neste ato: (1) As chaves; (2) O DUA/Certificado de Matrícula; (3) A ficha de Inspeção Periódica.\n\nAssinado em ${dados.comarca || "Portugal"}, às ${horaAtual} de ${dataHoje}.`
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