export const gerarTextoProposta = (dados) => {
  const dataHoje = new Date().toLocaleDateString("pt-PT");

  const cliente = dados.cliente || "___________________ (Cliente)";
  const fornecedor = dados.prestador || "___________________ (Sua Empresa)"; 
  const validade = dados.validadeProposta || "15 dias";
  const escopo = dados.descricaoServico || "Descrição detalhada do projeto, etapas e entregáveis.";
  const valor = dados.valor || "0,00";
  const prazoExecucao = dados.prazo || "30 dias úteis";
  const condicoesPagamento = dados.condicoesPagamento || "50% na adjudicação e 50% na entrega final.";

  let clausulas = [
    {
      titulo: "1. ENQUADRAMENTO",
      texto: `A empresa/profissional ${fornecedor} apresenta a seguinte proposta comercial para ${cliente}, com o objetivo de fornecer serviços especializados de alta qualidade, garantindo profissionalismo e cumprimento rigoroso de prazos.`
    },
    {
      titulo: "2. ESCOPO DO PROJETO (Deliverables)",
      texto: `O serviço a prestar inclui estritamente os seguintes itens:\n\n${escopo}\n\nQualquer serviço ou tarefa não explicitamente listada acima será considerada "fora do escopo" e sujeita a orçamentação adicional.`
    },
    {
      titulo: "3. INVESTIMENTO E PAGAMENTO",
      texto: `O investimento total para a execução deste projeto é de ${valor}€ (Euros), acrescido de IVA à taxa legal em vigor, se aplicável.\n\nCondições de Pagamento: ${condicoesPagamento}.\nO trabalho terá início apenas após a confirmação do pagamento da primeira tranche (adjudicação).`
    },
    {
      titulo: "4. PRAZOS E DEPENDÊNCIAS",
      texto: `O prazo estimado para a conclusão é de ${prazoExecucao}. Este prazo inicia-se apenas quando o Cliente fornecer todos os materiais, acessos e informações necessárias.\nAtrasos na entrega de feedback ou materiais por parte do Cliente suspendem a contagem do prazo de execução.`
    },
    {
      titulo: "5. ALTERAÇÕES E REVISÕES",
      texto: `Estão incluídas até 2 (duas) rondas de revisões/alterações ao trabalho apresentado. Revisões adicionais ou alterações estruturais após a aprovação inicial serão cobradas à taxa horária em vigor.`
    },
    {
      titulo: "6. PROPRIEDADE INTELECTUAL",
      texto: `A propriedade intelectual e os direitos de uso sobre o trabalho final só serão transferidos para o Cliente após o pagamento integral do valor acordado. Até lá, o Fornecedor reserva a propriedade de todos os materiais desenvolvidos.`
    },
    {
      titulo: "7. VALIDADE DA PROPOSTA",
      texto: `As condições financeiras e comerciais apresentadas nesta proposta são válidas por ${validade} a contar da data de emissão (${dataHoje}). Após este período, o Fornecedor reserva-se o direito de atualizar os valores.`
    }
  ];

  // --- CLÁUSULAS OPCIONAIS DO EDITOR ---
  
  if (dados.temConfidencialidade) {
    clausulas.push({
      titulo: "8. CONFIDENCIALIDADE",
      texto: "O Fornecedor compromete-se a manter estrito sigilo sobre quaisquer dados ou estratégias do Cliente a que tenha acesso durante a execução deste projeto."
    });
  }

  // --- CAMPO LIVRE (CLÁUSULAS EXTRAS) ---
  // Ótimo para: "O cliente paga o alojamento do site" ou "Custos de impressão não incluídos"
  if (dados.clausulasExtras && dados.clausulasExtras.trim() !== "") {
    const num = clausulas.length + 1;
    clausulas.push({
      titulo: `${num}. DISPOSIÇÕES ESPECÍFICAS`,
      texto: dados.clausulasExtras
    });
  }

  clausulas.push({
    titulo: "ACEITAÇÃO (ADJUDICAÇÃO)",
    texto: `A assinatura deste documento, ou o envio de um e-mail com a expressão "De Acordo" em resposta a esta proposta, formaliza a adjudicação do serviço e a aceitação de todos os termos acima descritos.\n\nEmitido em: ${dataHoje}`
  });

  return {
    titulo: "PROPOSTA COMERCIAL DE SERVIÇOS",
    clausulas: clausulas,
    assinantes: {
      parte1: "O Fornecedor",
      parte2: "O Cliente (Li e Aceito)"
    }
  };
};