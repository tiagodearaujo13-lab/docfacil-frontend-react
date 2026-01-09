export const gerarTextoAta = (dados) => {
  // --- GESTÃO DE DATAS ---
  const dataHoje = new Date().toLocaleDateString("pt-PT");
  const anoAtual = new Date().getFullYear();
  // A aprovação de contas refere-se sempre ao ano anterior
  const anoExercicio = anoAtual - 1; 

  // --- DADOS DA SOCIEDADE ---
  const empresa = dados.empresa || "___________________ (Firma da Empresa)";
  const nipc = dados.nifEmpregador || "_________"; // NIF/NIPC da empresa
  const sede = dados.moradaImovel || "Sede Social"; 
  const capitalSocial = dados.valor || "5.000,00"; // Capital Social

  // --- DADOS DA REUNIÃO ---
  const hora = dados.prazo || "10:00"; 
  const presidente = dados.prestador || "Nome do Presidente da Mesa"; // Quem preside
  
  // Lista de sócios: O utilizador deve listar "Nome (Quota X%)"
  const listaSocios = dados.descricaoServico || "Sócio A (Quota de X€); Sócio B (Quota de Y€)...";

  // Resultado: O utilizador escreve se houve Lucro ou Prejuízo no input
  // Ex: "um Lucro Líquido de 10.000€" ou "um Prejuízo de 2.000€"
  const resultadoTexto = dados.valorRenda || "um Lucro/Prejuízo de X Euros"; 

  return {
    titulo: `ATA N.º ___ / ${anoAtual}`,
    subtitulo: `ASSEMBLEIA GERAL ANUAL DA SOCIEDADE "${empresa.toUpperCase()}"`,
    clausulas: [
      {
        titulo: "1. CONSTITUIÇÃO DA ASSEMBLEIA",
        texto: `Aos ${dataHoje}, pelas ${hora} horas, reuniu-se na sede social sita em ${sede}, a Assembleia Geral da sociedade comercial por quotas "${empresa}", pessoa coletiva n.º ${nipc}, com o capital social de ${capitalSocial} Euros.`
      },
      {
        titulo: "2. PRESENÇAS E QUÓRUM (ASSEMBLEIA UNIVERSAL)",
        texto: `Encontram-se presentes ou devidamente representados os sócios titulares da totalidade do capital social, conforme lista de presenças anexa:\n\n${listaSocios}.\n\nReconhecendo todos a capacidade para deliberar e manifestando a vontade de reunir-se em Assembleia Universal para tratar dos assuntos da ordem de trabalhos, prescindem unanimemente das formalidades prévias de convocatória, ao abrigo do disposto no artigo 54.º do Código das Sociedades Comerciais.`
      },
      {
        titulo: "3. MESA E ORDEM DE TRABALHOS",
        texto: `Assumiu a presidência da Mesa o sócio ${presidente}, que verificou a existência de quórum constitutivo e declarou a sessão aberta, propondo a seguinte Ordem de Trabalhos:\n\nPONTO UM: Deliberar sobre o Relatório de Gestão e as Contas do exercício findo em 31 de Dezembro de ${anoExercicio};\nPONTO DOIS: Deliberar sobre a proposta de aplicação de resultados do exercício de ${anoExercicio}.`
      },
      {
        titulo: "4. DELIBERAÇÃO SOBRE O PONTO UM (CONTAS)",
        texto: `O Presidente apresentou o Relatório de Gestão e as Contas do exercício de ${anoExercicio}, prestando os esclarecimentos solicitados.\nPostos à votação, os documentos foram APROVADOS POR UNANIMIDADE dos votos emitidos.\n(Nota Legal: Caso os sócios sejam também gerentes, estes não votaram na parte respeitante à apreciação da sua própria administração, nos termos do n.º 6 do Artigo 252.º do CSC).`
      },
      {
        titulo: "5. DELIBERAÇÃO SOBRE O PONTO DOIS (RESULTADOS)",
        texto: `Entrando no segundo ponto da ordem de trabalhos, constatou-se que as contas aprovadas evidenciam ${resultadoTexto}.\n\nApós análise da situação financeira e legal, a Assembleia deliberou, por unanimidade, aplicar o referido resultado da seguinte forma:\n\na) [Se Lucro] 5% para reforço da Reserva Legal (obrigatório até esta perfazer 20% do capital social);\nb) O remanescente para: ___________________ (ex: Distribuição de Dividendos ou Resultados Transitados).\n\n[Se Prejuízo] O prejuízo transita para a conta de Resultados Transitados para cobertura por lucros futuros.`
      },
      {
        titulo: "6. ENCERRAMENTO E ASSINATURAS",
        texto: `Nada mais havendo a tratar, o Presidente deu por encerrada a sessão, da qual se lavrou a presente ata que, depois de lida em voz alta e aprovada, vai ser assinada por todos os sócios presentes.`
      },
      {
        titulo: "ASSINATURAS (A preencher no Livro de Atas)",
        texto: `\nO Presidente da Mesa:\n__________________________________\n\nOs Sócios:\n__________________________________\n\n__________________________________`
      }
    ],
    assinantes: {
      parte1: "", // Atas não têm assinaturas laterais, são assinadas no fim
      parte2: ""
    }
  };
};