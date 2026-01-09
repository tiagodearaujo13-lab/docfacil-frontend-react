export const gerarTextoRescisao = (dados) => {
  const dataHoje = new Date().toLocaleDateString("pt-PT");

  // --- DADOS DO TRABALHADOR (REMETENTE) ---
  const trabalhadorNome = dados.trabalhador || "___________________ (Nome do Trabalhador)";
  const trabalhadorMorada = dados.moradaTrabalhador || "___________________ (Morada Completa)";

  // --- DADOS DA EMPRESA (DESTINATÁRIO) ---
  const empresaNome = dados.empregador || "___________________ (Nome da Empresa)";
  const empresaMorada = dados.moradaEmpregador || "___________________ (Sede da Empresa)";

  // --- DADOS DA CESSAÇÃO ---
  // Data do último dia de trabalho efetivo
  const dataFim = dados.dataFim || "DD/MM/AAAA"; 
  
  // O utilizador deve indicar quantos dias está a dar.
  // Se vazio, colocamos um placeholder para ele não se esquecer de verificar.
  const diasAviso = dados.prazo || "30 / 60"; 

  return {
    titulo: "CARTA DE DENÚNCIA DE CONTRATO DE TRABALHO",
    clausulas: [
      {
        titulo: "MODO DE ENVIO",
        texto: "CARTA REGISTADA COM AVISO DE RECEÇÃO"
      },
      {
        titulo: "REMETENTE:",
        texto: `${trabalhadorNome}\n${trabalhadorMorada}`
      },
      {
        titulo: "DESTINATÁRIO:",
        texto: `À Gerência / Recursos Humanos da\n${empresaNome}\n${empresaMorada}`
      },
      {
        titulo: "LOCAL E DATA",
        texto: `${dados.comarca || "Portugal"}, ${dataHoje}`
      },
      {
        titulo: "ASSUNTO:",
        texto: "Denúncia do contrato de trabalho e aviso prévio."
      },
      {
        titulo: "TEXTO DA COMUNICAÇÃO",
        texto: `Exmos. Senhores,\n\nNos termos e para os efeitos do disposto no artigo 400.º do Código do Trabalho, venho pela presente comunicar a minha decisão de denunciar o contrato de trabalho que mantenho com V. Exas., com efeitos definitivos a partir do dia ${dataFim} (o meu último dia de trabalho).`
      },
      {
        titulo: "1. CUMPRIMENTO DO AVISO PRÉVIO",
        texto: `Com a presente comunicação, observo o prazo de aviso prévio de ${diasAviso} dias legalmente exigido, garantindo a transição das minhas tarefas e a normalidade do serviço até à data da cessação.`
      },
      {
        titulo: "2. APURAMENTO DE CRÉDITOS LABORAIS",
        texto: `Solicito que, na data da cessação, procedam ao apuramento e pagamento de todos os créditos laborais vencidos e vincendos a que tenho direito, nomeadamente:\n\na) Retribuição do mês em curso (ou proporcional);\nb) Subsídio de Férias e de Natal proporcionais ao tempo de serviço prestado no ano da cessação;\nc) Pagamento das férias não gozadas (vencidas e não gozadas);\nd) Pagamento das horas de formação profissional obrigatória não ministradas nos últimos anos (crédito de horas), nos termos dos artigos 131.º e 134.º do Código do Trabalho.`
      },
      {
        titulo: "3. DOCUMENTAÇÃO OBRIGATÓRIA",
        texto: `Mais solicito que me seja entregue, no meu último dia de trabalho, o Certificado de Trabalho (indicando as datas de admissão/saída e funções desempenhadas), conforme obriga o artigo 341.º do Código do Trabalho.`
      },
      {
        titulo: "FECHO",
        texto: `Agradecendo a oportunidade de colaboração profissional que mantivemos até à data, subscrevo-me com elevada consideração.`
      },
      {
        titulo: "ASSINATURA",
        texto: `\n__________________________________\n${trabalhadorNome}`
      }
    ],
    assinante: {
      parte1: ""
    }
  };
};