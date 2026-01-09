export const gerarTextoOposicao = (dados) => {
  const dataHoje = new Date().toLocaleDateString("pt-PT");

  // --- LÓGICA DE IDENTIFICAÇÃO (CRÍTICA) ---
  // Tenta determinar quem está a enviar a carta com base num campo explícito 'tipoRemetente'
  // Se não existir, tenta deduzir pelos campos preenchidos.
  // IMPORTANTE: No seu frontend, adicione um Select: "Sou o Senhorio" ou "Sou o Inquilino".
  const tipoRemetente = dados.tipoRemetente ? dados.tipoRemetente.toLowerCase() : "inquilino";
  const isSenhorio = tipoRemetente === "senhorio";

  // --- DADOS DO REMETENTE (Quem assina) ---
  const remetenteNome = isSenhorio ? dados.senhorio : dados.inquilino;
  const remetenteMorada = isSenhorio ? dados.senhorioMorada : dados.inquilinoMorada;
  const remetenteLabel = isSenhorio ? "O Senhorio" : "O Arrendatário";

  // --- DADOS DO DESTINATÁRIO (Quem recebe) ---
  const destinatarioNome = isSenhorio ? dados.inquilino : dados.senhorio;
  const destinatarioMorada = isSenhorio ? dados.inquilinoMorada : dados.senhorioMorada;

  // --- DADOS DO CONTRATO ---
  const moradaImovel = dados.moradaImovel || "___________________ (Morada do Imóvel)";
  const dataFimContrato = dados.dataFim || "DD/MM/AAAA"; // Data em que o contrato termina

  // --- LÓGICA JURÍDICA DINÂMICA ---
  let fundamentoLegal, textoCorpo, textoAviso;

  if (isSenhorio) {
    // Senhorio opõe-se à renovação (Art. 1097 CC)
    // Prazos exigentes: 240 dias (contratos >6 anos), 120 dias (1-6 anos), etc.
    fundamentoLegal = "artigo 1097.º do Código Civil";
    textoCorpo = `Comunico a V. Exa. a minha intenção de opor-me à renovação automática do contrato de arrendamento que vigorará até ${dataFimContrato}. Pretendo, assim, que o contrato cesse os seus efeitos nessa data.`;
    textoAviso = "Nota: O Senhorio deve respeitar prazos de pré-aviso longos (ex: 120 ou 240 dias). Verifique a data de envio.";
  } else {
    // Inquilino opõe-se à renovação ou denuncia (Art. 1098 CC)
    fundamentoLegal = "artigo 1098.º do Código Civil";
    textoCorpo = `Comunico a V. Exas. que não pretendo a renovação do contrato de arrendamento atualmente em vigor, devendo o mesmo cessar os seus efeitos no dia ${dataFimContrato}.`;
    textoAviso = "Nota: O Inquilino deve respeitar um pré-aviso legal (geralmente 120 dias antes do fim do prazo).";
  }

  return {
    titulo: "CARTA DE OPOSIÇÃO À RENOVAÇÃO DO ARRENDAMENTO",
    clausulas: [
      {
        titulo: "FORMA DE ENVIO",
        texto: `VIA: CARTA REGISTADA COM AVISO DE RECEÇÃO`
      },
      {
        titulo: "REMETENTE",
        texto: `${remetenteNome}\n${remetenteMorada || "(Endereço do Remetente)"}`
      },
      {
        titulo: "DESTINATÁRIO",
        texto: `${destinatarioNome}\n${destinatarioMorada || "(Endereço do Destinatário)"}`
      },
      {
        titulo: "LOCAL E DATA",
        texto: `${dados.comarca || "Portugal"}, ${dataHoje}`
      },
      {
        titulo: "ASSUNTO",
        texto: `Oposição à renovação do contrato de arrendamento.\nImóvel: ${moradaImovel}`
      },
      {
        titulo: "TEXTO DA COMUNICAÇÃO",
        texto: `Exmos. Senhores,\n\n${textoCorpo}\n\nA presente comunicação é efetuada ao abrigo do disposto no ${fundamentoLegal}, respeitando a antecedência legalmente exigida para o efeito.`
      },
      {
        titulo: "ENTREGA DO LOCADO E VISTORIA",
        texto: `Na data da cessação (${dataFimContrato}), o imóvel será entregue livre de pessoas e bens e em bom estado de conservação (ressalvado o desgaste decorrente da sua prudente utilização).\n\nPara o efeito, solicito o agendamento de uma vistoria conjunta ao imóvel e a consequente entrega das chaves, devendo V. Exas. confirmar a disponibilidade de horário com a maior brevidade possível.`
      },
      {
        titulo: "CAUÇÃO (Se aplicável)",
        texto: `Mais se recorda que, verificada a inexistência de danos no imóvel, deverá proceder-se à devolução do montante da caução prestada no início do contrato.`
      },
      {
        titulo: "FECHO",
        texto: `Sem outro assunto de momento, apresento os meus melhores cumprimentos,`
      },
      {
        titulo: "ASSINATURA",
        texto: `\n______________________________________________\n${remetenteNome}\n(${remetenteLabel})`
      }
    ],
    
  };
};