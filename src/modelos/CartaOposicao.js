export const gerarTextoOposicao = (dados) => {
  const dataHoje = new Date().toLocaleDateString("pt-PT");

  // --- Lógica para determinar quem envia ---
  // Se o utilizador preencheu "Senhorio" no campo 'prestador', assumimos que é o Senhorio a enviar.
  // Caso contrário, é o Inquilino. Vamos usar um campo 'tipoRemetente' se existir, ou deduzir.
  const isSenhorio = dados.role === "senhorio" || dados.prestador !== ""; 
  
  // Remetente (Quem envia a carta)
  const remetenteNome = isSenhorio ? (dados.senhorio || dados.prestador) : (dados.inquilino || dados.cliente);
  const remetenteMorada = isSenhorio ? dados.senhorioMorada : dados.inquilinoMorada;

  // Destinatário (Quem recebe)
  const destinatarioNome = isSenhorio ? (dados.inquilino || dados.cliente) : (dados.senhorio || dados.prestador);
  const destinatarioMorada = isSenhorio ? dados.inquilinoMorada : dados.senhorioMorada;

  const moradaImovel = dados.moradaImovel || "___________________";
  const dataFimContrato = dados.prazo || "DD/MM/AAAA"; // Data em que o contrato termina

  // --- LEGISLAÇÃO APLICÁVEL (O Segredo do documento oficial) ---
  // Artigo 1097.º do Código Civil (Oposição pelo Senhorio)
  // Artigo 1098.º do Código Civil (Oposição pelo Arrendatário)
  const artigoLei = isSenhorio 
    ? "artigo 1097.º do Código Civil" 
    : "artigo 1098.º do Código Civil";

  const prazoLei = isSenhorio
    ? "respeitando a antecedência legal exigida para a comunicação pelo Senhorio"
    : "respeitando a antecedência legal exigida para a comunicação pelo Arrendatário";

  return {
    titulo: "COMUNICAÇÃO DE OPOSIÇÃO À RENOVAÇÃO DO CONTRATO DE ARRENDAMENTO",
    clausulas: [
      {
        titulo: "ENVIO",
        texto: `REGISTADA COM AVISO DE RECEÇÃO`
      },
      {
        titulo: "REMETENTE:",
        texto: `${remetenteNome}\n${remetenteMorada || "Morada do Remetente"}`
      },
      {
        titulo: "DESTINATÁRIO:",
        texto: `${destinatarioNome}\n${destinatarioMorada || "Morada do Destinatário"}`
      },
      {
        titulo: "Data e Local:",
        texto: `${dados.comarca || "Lisboa"}, ${dataHoje}`
      },
      {
        titulo: "ASSUNTO:",
        texto: `Oposição à renovação do contrato de arrendamento relativo ao imóvel sito em: ${moradaImovel}.`
      },
      {
        titulo: "Exmo(s). Senhor(es),",
        texto: `Na qualidade de outorgante no contrato de arrendamento habitacional celebrado referente à fração autónoma/imóvel acima identificado, venho por este meio comunicar a V. Exas. a minha vontade de **NÃO RENOVAR** o referido contrato.`
      },
      {
        titulo: "1. Fundamentação Legal",
        texto: `A presente comunicação é efetuada ao abrigo do disposto no ${artigoLei}, sendo expedida nesta data, ${prazoLei}, para que produza os seus efeitos no termo do prazo contratual em curso.`
      },
      {
        titulo: "2. Cessação e Entrega",
        texto: `Assim, o contrato de arrendamento cessará impreterivelmente no dia ${dataFimContrato}. Nesta data, o imóvel deverá estar livre de pessoas e bens e em bom estado de conservação, ressalvadas as deteriorações inerentes a uma prudente utilização.`
      },
      {
        titulo: "3. Vistoria e Chaves",
        texto: `Solicito o agendamento de uma data e hora, próxima do termo do contrato, para efetuarmos a vistoria conjunta ao local e proceder à entrega formal das chaves.`
      },
      {
        titulo: "Fecho",
        texto: `Sem outro assunto de momento, subscrevo-me com os melhores cumprimentos,`
      },
      {
        titulo: "Assinatura",
        texto: `\n__________________________________\n(Assinatura do Remetente)`
      }
    ],
    assinantes: {
      parte1: "", // Cartas não têm "Partes" assinadas em baixo da mesma forma que contratos
      parte2: ""
    }
  };
};