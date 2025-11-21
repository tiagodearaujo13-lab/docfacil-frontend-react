export const gerarTextoTrabalho = (dados) => {
  const dataHoje = new Date().toLocaleDateString("pt-PT");

  const empregador = dados.empregador || "___________________";
  const trabalhador = dados.trabalhador || "___________________";
  const funcao = dados.funcao || "___________________";
  const salario = dados.salario || "0,00";
  const dataInicio = dados.dataInicio || "_____";
  const dataFim = dados.dataFim || "_____";
  const motivo = dados.motivoTermo || "Acréscimo excecional de atividade da empresa.";
  const local = dados.localTrabalho || "Sede da empresa";

  return {
    titulo: "CONTRATO DE TRABALHO A TERMO CERTO",
    clausulas: [
      {
        titulo: "CLÁUSULA 1.ª (Identificação das Partes)",
        texto: `ENTRE:\n1. ${empregador}, adiante designado por EMPREGADOR.\n2. ${trabalhador}, adiante designado por TRABALHADOR.\n\nÉ celebrado o presente contrato de trabalho a termo certo, nos termos do Código do Trabalho.`
      },
      {
        titulo: "CLÁUSULA 2.ª (Função e Local)",
        texto: `O Trabalhador obriga-se a prestar a sua atividade profissional de ${funcao}, sob a autoridade e direção do Empregador, exercendo as funções inerentes à categoria profissional, no local: ${local}.`
      },
      {
        titulo: "CLÁUSULA 3.ª (Duração e Motivo)",
        texto: `O contrato tem início em ${dataInicio} e termo em ${dataFim}.\n\nJustificação legal do termo: Este contrato é celebrado ao abrigo do Artigo 140.º do Código do Trabalho, motivado por: ${motivo}.`
      },
      {
        titulo: "CLÁUSULA 4.ª (Retribuição)",
        texto: `Como contrapartida do trabalho, o Empregador pagará ao Trabalhador a retribuição base mensal ilíquida de ${salario}€, acrescida de subsídio de refeição nos termos legais em vigor.`
      },
      {
        titulo: "CLÁUSULA 5.ª (Período Experimental)",
        texto: `O período experimental corresponde aos primeiros 30 dias de execução do contrato (ou o previsto em IRCT aplicável), durante o qual qualquer das partes pode denunciar o contrato sem aviso prévio.`
      },
      {
        titulo: "CLÁUSULA 6.ª (Férias e Subsídios)",
        texto: `O Trabalhador tem direito a férias, subsídio de férias e subsídio de Natal proporcionais à duração do contrato, nos termos da lei geral.`
      },
      {
        titulo: "Assinaturas",
        texto: `Feito em duplicado, ficando um exemplar para cada parte, em ${dataHoje}.`
      }
    ],
    assinantes: {
      parte1: "O Empregador",
      parte2: "O Trabalhador"
    }
  };
};