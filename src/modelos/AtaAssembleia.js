export const gerarTextoAta = (dados) => {
  // Ajustes de Datas e Horas
  const dataHoje = new Date().toLocaleDateString("pt-PT");
  const anoAtual = new Date().getFullYear();
  const anoExercicio = anoAtual - 1; // Aprova-se sempre o ano anterior

  // Dados da Empresa
  const empresa = dados.empresa || "___________________ (Firma Completa)";
  const nipc = dados.nifEmpregador || "_________"; // Reutiliza campo NIF/NIPC
  const sede = dados.moradaImovel || "Sede Social"; // Reutiliza morada
  const capitalSocial = dados.valor || "5.000,00"; // Reutiliza valor

  // Dados da Reunião
  const hora = dados.prazo || "10:00"; // Reutiliza campo prazo para hora
  const presidente = dados.prestador || "Nome do Presidente da Mesa";
  
  // Sócios (Reutiliza a descrição para listar os sócios e quotas)
  // Ex: "João Silva, titular de uma quota de 2.500€; Maria Santos, titular de..."
  const listaSocios = dados.descricaoServico || "Sócio A (quota x%), Sócio B (quota y%)...";

  // Resultados (Lucro ou Prejuízo)
  // Pode usar um campo extra ou assumir texto padrão para edição
  const resultadoExercicio = dados.valorRenda || "positivo/negativo"; 

  return {
    titulo: `ATA DA ASSEMBLEIA GERAL ANUAL DA SOCIEDADE "${empresa.toUpperCase()}"`,
    clausulas: [
      {
        titulo: "CABEÇALHO E CONVOCATÓRIA",
        texto: `Aos ${dataHoje}, pelas ${hora} horas, reuniu-se na sede social sita em ${sede}, a Assembleia Geral da sociedade comercial por quotas "${empresa}", pessoa coletiva n.º ${nipc}, com o capital social de ${capitalSocial} Euros.`
      },
      {
        titulo: "PRESENÇAS (QUÓRUM)",
        texto: `Estiveram presentes os sócios representando a totalidade do capital social, a saber:\n\n${listaSocios}.\n\nEncontrando-se presentes todos os sócios e tendo todos manifestado vontade de reunir, a Assembleia constituiu-se como Universal, dispensando-se as formalidades prévias de convocatória, nos termos do art. 54.º do Código das Sociedades Comerciais (CSC).`
      },
      {
        titulo: "MESA DA ASSEMBLEIA",
        texto: `Assumiu a presidência da Mesa o sócio ${presidente}, que verificou a existência de quórum e declarou a sessão aberta.`
      },
      {
        titulo: "ORDEM DE TRABALHOS",
        texto: `De seguida, entrou-se na Ordem de Trabalhos, que constou dos seguintes pontos:\n\n1. Deliberar sobre o Relatório de Gestão e as Contas do exercício findo em 31 de Dezembro de ${anoExercicio};\n2. Deliberar sobre a proposta de aplicação de resultados do exercício de ${anoExercicio}.`
      },
      {
        titulo: "PONTO UM (APROVAÇÃO DE CONTAS)",
        texto: `Relativamente ao primeiro ponto, foi apresentado, analisado e discutido o Relatório de Gestão e as Contas anuais. Posto à votação, foi o mesmo APROVADO POR UNANIMIDADE dos votos emitidos, não tendo votado os sócios gerentes na parte respeitante à apreciação da sua própria administração.`
      },
      {
        titulo: "PONTO DOIS (APLICAÇÃO DE RESULTADOS)",
        texto: `Passando ao segundo ponto, verificou-se que o exercício de ${anoExercicio} registou um resultado líquido ${resultadoExercicio}.\n\nA Assembleia deliberou, por unanimidade, aplicar o resultado da seguinte forma:\n\na) Cobertura de prejuízos transitados (se aplicável);\nb) 5% para a Reserva Legal (obrigatório se houver lucro até atingir 20% do capital);\nc) O remanescente para: (Dividendos ou Resultados Transitados).`
      },
      {
        titulo: "ENCERRAMENTO",
        texto: `Nada mais havendo a tratar, o Presidente deu por encerrada a sessão, da qual se lavrou a presente ata que, depois de lida e aprovada, vai ser assinada por todos os sócios presentes.`
      },
      {
        titulo: "ASSINATURAS",
        texto: `\nO Presidente da Mesa:\n__________________________\n\nOs Sócios:\n__________________________\n\n__________________________`
      }
    ],
    assinantes: {
      parte1: "", 
      parte2: ""
    }
  };
};