export const gerarTextoRescisao = (dados) => {
  const dataHoje = new Date().toLocaleDateString("pt-PT");

  // Dados do Trabalhador (Quem envia)
  const trabalhadorNome = dados.trabalhador || "Nome do Trabalhador";
  const trabalhadorMorada = dados.moradaTrabalhador || "Morada Completa";

  // Dados da Empresa (Quem recebe)
  const empresaNome = dados.empregador || "Nome da Empresa";
  const empresaMorada = dados.moradaEmpregador || "Sede da Empresa";

  // Datas
  const dataFim = dados.dataFim || "DD/MM/AAAA"; // O último dia de trabalho
  
  // A lei define: < 2 anos de casa = 30 dias aviso; > 2 anos = 60 dias.
  // Vamos deixar um texto genérico que se adapta.
  const diasAviso = dados.prazo || "30/60"; 

  return {
    titulo: "CARTA DE DENÚNCIA DE CONTRATO DE TRABALHO",
    clausulas: [
      {
        titulo: "ENVIO",
        texto: "REGISTADA COM AVISO DE RECEÇÃO"
      },
      {
        titulo: "REMETENTE (Trabalhador):",
        texto: `${trabalhadorNome}\n${trabalhadorMorada}`
      },
      {
        titulo: "DESTINATÁRIO (Empresa):",
        texto: `${empresaNome}\nA/C Gerência / Recursos Humanos\n${empresaMorada}`
      },
      {
        titulo: "ASSUNTO:",
        texto: "Denúncia do contrato de trabalho"
      },
      {
        titulo: "Exmos. Senhores,",
        texto: `Nos termos e para os efeitos do disposto no Artigo 400.º do Código do Trabalho, venho pela presente comunicar a minha decisão de denunciar o contrato de trabalho que mantenho com V. Exas.`
      },
      {
        titulo: "1. Aviso Prévio e Cessação",
        texto: `Esta denúncia produzirá efeitos no dia ${dataFim}, data em que cessarei as minhas funções, cumprindo assim o aviso prévio legal de ${diasAviso} dias a que estou obrigado(a).`
      },
      {
        titulo: "2. Apuramento de Créditos Laborais",
        texto: `Solicito que, na data da cessação do contrato, procedam ao pagamento de todos os créditos laborais a que tenho direito, nomeadamente:\n- Retribuição do mês em curso;\n- Subsídios de férias e de Natal proporcionais ao tempo de trabalho prestado no ano da cessação;\n- Pagamento de dias de férias não gozados (se aplicável).`
      },
      {
        titulo: "3. Documentação",
        texto: `Mais solicito a emissão e entrega, na mesma data, do Certificado de Trabalho, conforme previsto no Artigo 341.º do Código do Trabalho, bem como da declaração de remunerações para a Segurança Social.`
      },
      {
        titulo: "Agradecimento",
        texto: "Aproveito a oportunidade para agradecer a confiança depositada durante o período em que colaborei com a vossa empresa."
      },
      {
        titulo: "Atenciosamente,",
        texto: `\n__________________________\n${trabalhadorNome}\n\n(Data: ${dataHoje})`
      }
    ],
    assinantes: {
      parte1: "",
      parte2: ""
    }
  };
};