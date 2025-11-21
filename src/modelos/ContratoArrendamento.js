export const gerarTextoArrendamento = (dados) => {
  const dataHoje = new Date().toLocaleDateString("pt-PT");

  // Valores padrão
  const senhorio = dados.senhorio || "___________________";
  const inquilino = dados.inquilino || "___________________";
  const morada = dados.moradaImovel || "___________________";
  const renda = dados.valorRenda || "_____";
  const dataInicio = dados.dataInicio || "_____";
  const duracao = dados.prazoMeses || "12"; // Padrão 1 ano

  let clausulas = [
    {
      titulo: "PRIMEIRA: (Identificação das Partes)",
      texto: `ENTRE:\n\n1. ${senhorio}, na qualidade de SENHORIO.\n\n2. ${inquilino}, na qualidade de INQUILINO.\n\nÉ celebrado o presente Contrato de Arrendamento para Habitação, sujeito ao regime do NRAU (Novo Regime do Arrendamento Urbano).`
    },
    {
      titulo: "SEGUNDA: (Objeto)",
      texto: `O Senhorio é proprietário da fração autónoma sita em: ${morada}, que arrenda ao Inquilino para sua habitação própria e permanente.`
    },
    {
      titulo: "TERCEIRA: (Duração)",
      texto: `O arrendamento é celebrado pelo prazo de ${duracao} meses, com início em ${dataInicio}, renovando-se automaticamente por iguais períodos, salvo oposição das partes nos termos da lei.`
    },
    {
      titulo: "QUARTA: (Renda)",
      texto: `A renda mensal é fixada em ${renda}€ (Euros), a pagar até ao dia 8 do mês anterior àquele a que respeita.`
    },
    {
      titulo: "QUINTA: (Obras e Benfeitorias)",
      texto: `O Inquilino não pode realizar obras sem autorização prévia e por escrito do Senhorio.`
    }
  ];

  // Cláusula Opcional: Fiador (Muito comum em Portugal)
  if (dados.temFiador) {
    clausulas.push({
      titulo: "SEXTA: (Fiança)",
      texto: `O Fiador, ${dados.nomeFiador || "___________________"}, assume solidariamente com o Inquilino todas as obrigações emergentes deste contrato, renunciando ao benefício da excussão prévia.`
    });
  }

  clausulas.push({
    titulo: "Assinaturas",
    texto: `Feito em duplicado em ${dataHoje}.`
  });


  return {
    titulo: "CONTRATO DE ARRENDAMENTO",
    clausulas: clausulas,
    // ADICIONA ISTO AQUI:
    assinantes: {
      parte1: "O Senhorio",
      parte2: "O Inquilino"
    }
  };
};