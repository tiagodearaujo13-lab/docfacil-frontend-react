export const gerarTextoProposta = (dados) => {
  const dataHoje = new Date().toLocaleDateString("pt-PT");

  // --- DADOS ---
  const fornecedor = dados.prestador || "___________________ (Prestador)";
  const fornecedorNIF = dados.prestadorNIF || "_________";
  const cliente = dados.cliente || "___________________ (Cliente)";
  const validade = dados.validadeProposta || "15 dias"; 
  
  // Valores
  const valor = dados.valor || "0,00";
  const iva = dados.iva || "23"; // Taxa de IVA padrão
  const condicoesPagamento = dados.condicoesPagamento || "50% na Adjudicação e 50% na Entrega Final.";
  const prazoExecucao = dados.prazo || "30 dias úteis";
  const escopo = dados.descricaoServico || "Descrição detalhada do projeto, etapas e entregáveis.";

  // --- INÍCIO DAS CLÁUSULAS FIXAS ---
  let clausulas = [
    {
      titulo: "1. ENQUADRAMENTO E PARTES",
      texto: `A presente proposta regula a prestação de serviços entre:\nPRESTADOR: ${fornecedor}, NIF ${fornecedorNIF}.\nCLIENTE: ${cliente}.\n\nEsta proposta, uma vez adjudicada (aceite), converte-se automaticamente em Contrato de Prestação de Serviços, regendo-se pelas cláusulas seguintes.`
    },
    {
      titulo: "2. ESCOPO DO PROJETO (DELIVERABLES)",
      texto: `O serviço inclui estritamente:\n\n${escopo}\n\nEXCLUSÕES: Quaisquer tarefas, funcionalidades, reuniões extra ou revisões não listadas acima consideram-se trabalhos extra ("Out of Scope"), sujeitos a novo orçamento e aprovação.`
    },
    {
      titulo: "3. INVESTIMENTO E PAGAMENTO",
      texto: `Valor do Investimento: ${valor}€ (Euros), acrescido de IVA à taxa de ${iva}% (se aplicável).\nCondições: ${condicoesPagamento}.\n\nO atraso no pagamento de qualquer tranche confere ao Prestador o direito de cobrar juros de mora à taxa legal comercial em vigor, acrescidos de indemnização pelos custos administrativos de cobrança (40€ por fatura).`
    },
    {
      titulo: "4. PRAZOS E COLABORAÇÃO",
      texto: `Prazo estimado: ${prazoExecucao}, contado a partir da receção de todos os elementos necessários (textos, imagens, acessos) a fornecer pelo Cliente. A inércia do Cliente na entrega de elementos suspende a contagem do prazo de execução.`
    },
    {
      titulo: "5. ALTERAÇÕES E REVISÕES",
      texto: `O orçamento inclui até 2 (duas) rondas de revisões sobre o trabalho apresentado. Alterações estruturais (mudança de briefing) ou pedidos de revisão que excedam este limite serão faturados à taxa horária vigente do Prestador.`
    },
    {
      titulo: "6. RESERVA DE PROPRIEDADE INTELECTUAL",
      texto: `A titularidade dos Direitos Patrimoniais sobre o trabalho final transfere-se para o Cliente apenas após o integral e efetivo pagamento do preço. O Prestador mantém os Direitos Morais (autoria) e o direito de utilizar o trabalho em portfólio para autopromoção.`
    },
    {
      titulo: "7. VALIDADE E ADJUDICAÇÃO",
      texto: `Esta proposta é válida por ${validade} a contar de ${dataHoje}. A adjudicação pode ser formalizada por assinatura deste documento ou mediante resposta por email com declaração inequívoca de aceitação (ex: "Aceito a proposta"), valendo tal como celebração do contrato para todos os efeitos legais.`
    }
  ];

  // --- LÓGICA DINÂMICA (NUMERAÇÃO CORRETA) ---
  
  // Passo 1: Verifica se tem confidencialidade
  if (dados.temConfidencialidade) {
    const num = clausulas.length + 1; // Calcula o número (será 8)
    clausulas.push({
      titulo: `${num}. CONFIDENCIALIDADE`,
      texto: "Ambas as partes obrigam-se a manter estrito sigilo sobre quaisquer dados, estratégias, segredos de negócio ou informações técnicas a que tenham acesso durante a execução deste projeto."
    });
  }

  // Passo 2: Verifica se tem cláusulas extras
  if (dados.clausulasExtras && dados.clausulasExtras.trim() !== "") {
    const num = clausulas.length + 1; // Calcula o número (será 8 ou 9, dependendo do anterior)
    clausulas.push({
      titulo: `${num}. DISPOSIÇÕES ESPECÍFICAS`,
      texto: dados.clausulasExtras
    });
  }

  // Passo 3: Adiciona a Aceitação (sem número, pois é o fecho)
  clausulas.push({
    titulo: "ACEITAÇÃO EXPRESSA",
    texto: `Ao adjudicar esta proposta, o Cliente declara ter lido e aceite todos os termos e condições acima descritos.\n\nEmitido em: ${dataHoje}`
  });

  return {
    titulo: "PROPOSTA COMERCIAL E CONTRATO",
    clausulas: clausulas,
    assinantes: {
      parte1: "O Prestador",
      parte2: "O Cliente (Li e Aceito)"
    }
  };
};