export const gerarTextoOrcamento = (dados) => {
  const dataHoje = new Date().toLocaleDateString("pt-PT");

  const cliente = dados.cliente || "___________________ (Dono da Obra)";
  const empreiteiro = dados.prestador || "___________________ (Empreiteiro/Prestador)";
  const localObra = dados.moradaImovel || "___________________"; // Reutilizamos 'moradaImovel'
  const materiaisDesc = dados.materiais || "A fornecer pelo Empreiteiro, gama média/alta.";
  const valorTotal = dados.valor || "0,00";
  const prazo = dados.prazo || "30 dias úteis";
  const validade = "30 dias"; // Validade do orçamento

  let clausulas = [
    {
      titulo: "1. DADOS DA OBRA E INTERVENIENTES",
      texto: `Este documento formaliza o orçamento para execução de serviços de construção civil/remodelação no imóvel sito em: ${localObra}.\n\nSolicitante (Dono da Obra): ${cliente}.\nExecutor (Empreiteiro): ${empreiteiro}.`
    },
    {
      titulo: "2. DESCRIÇÃO DOS TRABALHOS (ESCOPO)",
      texto: `Serão realizados estritamente os seguintes trabalhos:\n\n${dados.descricaoServico || "Listar detalhadamente as intervenções (ex: picar paredes, aplicar estuque, pintura...)"}\n\nQualquer trabalho não listado nesta cláusula considera-se "Trabalho a Mais" e será orçamentado à parte.`
    },
    {
      titulo: "3. MATERIAIS E ACABAMENTOS",
      texto: `Definição de fornecimento: ${materiaisDesc}.\nNota: Caso o Dono da Obra pretenda materiais de gama superior ou marcas específicas não acordadas, a diferença de preço será ajustada na fatura final.`
    },
    {
      titulo: "4. VALOR E PAGAMENTO",
      texto: `O valor total estimado para a execução da obra é de ${valorTotal}€ (Acresce IVA à taxa legal em vigor).\n\nCondições de Pagamento Sugeridas:\n- 40% na Adjudicação (início dos trabalhos e compra de materiais);\n- 30% a meio da obra;\n- 30% na conclusão e entrega da obra.`
    },
    {
      titulo: "5. PRAZOS E ACESSO",
      texto: `Prazo estimado de execução: ${prazo}, contado a partir do início efetivo dos trabalhos e garantido o acesso livre ao imóvel.\nO prazo suspende-se caso o Dono da Obra não forneça materiais da sua responsabilidade a tempo ou por motivos de força maior (ex: secagem de massas devido à humidade).`
    },
    {
      titulo: "6. RESÍDUOS E ENTULHO",
      texto: `A recolha, transporte e depósito de entulhos em vazadouro autorizado são da responsabilidade do Empreiteiro, estando o custo incluído neste orçamento (salvo indicação em contrário).`
    },
    {
      titulo: "7. LICENÇAS E RUÍDO",
      texto: `Compete ao Dono da Obra obter as licenças camarárias necessárias e comunicar a realização de obras ruidosas ao Condomínio, respeitando o Regulamento Geral do Ruído.`
    },
    {
      titulo: "8. VALIDADE DO ORÇAMENTO",
      texto: `Devido à flutuação de preços dos materiais de construção, este orçamento é válido por ${validade} a contar da data de emissão. Após este período, poderá ser sujeito a revisão.`
    }
  ];

  // --- CAMPO LIVRE (CLÁUSULAS EXTRAS) ---
  // Útil para: "Não inclui pintura de tetos" ou "Cliente fornece os azulejos"
  if (dados.clausulasExtras && dados.clausulasExtras.trim() !== "") {
    const num = clausulas.length + 1;
    clausulas.push({
      titulo: `${num}. DISPOSIÇÕES ESPECÍFICAS`,
      texto: dados.clausulasExtras
    });
  }

  clausulas.push({
    titulo: "ACEITAÇÃO (ADJUDICAÇÃO)",
    texto: `A assinatura deste documento valida a aceitação das condições e autoriza o início dos trabalhos.\n\nEmitido em: ${dataHoje}`
  });

  return {
    titulo: "ORÇAMENTO DE OBRAS E REMODELAÇÕES",
    clausulas: clausulas,
    assinantes: {
      parte1: "O Empreiteiro",
      parte2: "O Dono da Obra"
    }
  };
};