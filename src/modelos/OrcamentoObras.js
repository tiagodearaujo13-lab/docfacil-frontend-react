export const gerarTextoOrcamento = (dados) => {
  const dataHoje = new Date().toLocaleDateString("pt-PT");

  // --- INTERVENIENTES ---
  const donoObra = dados.cliente || "___________________ (Nome do Cliente)";
  const donoObraNIF = dados.clienteNIF || "_________";
  const empreiteiro = dados.prestador || "___________________ (Nome da Empresa)";
  const empreiteiroNIF = dados.prestadorNIF || "_________"; 
  const alvara = dados.alvara || "(N.º Alvará ou Registo IMPIC)";
  
  // --- OBRA ---
  const local = dados.moradaImovel || "___________________";
  const descricao = dados.descricaoServico || "Descrição detalhada dos trabalhos e materiais incluídos.";
  
  // --- VALORES ---
  const valorTotal = dados.valor || "0,00";
  // Importante: Permitir IVA a 6% para reabilitação urbana (Verbas 2.18 ou 2.27 da Lista I do CIVA)
  const ivaTaxa = dados.iva || "23"; 
  const prazoExecucao = dados.prazo || "30 dias úteis";
  const validadeProposta = dados.validadeProposta || "30 dias";

  return {
    titulo: "ORÇAMENTO E CONTRATO DE EMPREITADA",
    clausulas: [
      {
        titulo: "1. PARTES E HABILITAÇÃO",
        texto: `1. DONO DA OBRA: ${donoObra}, NIF ${donoObraNIF}.\n2. EMPREITEIRO: ${empreiteiro}, NIF ${empreiteiroNIF}, titular do título habilitante n.º ${alvara}.\nAs partes acordam a realização da obra no imóvel sito em: ${local}.`
      },
      {
        titulo: "2. ESCOPO DOS TRABALHOS",
        texto: `O Empreiteiro obriga-se a executar os seguintes trabalhos:\n\n${descricao}\n\nNota: Tudo o que não constar expressamente desta lista considera-se excluído do orçamento (trabalhos extra).`
      },
      {
        titulo: "3. PREÇO E IVA",
        texto: `O preço global da empreitada é de ${valorTotal}€ (Euros), ao qual acresce IVA à taxa de ${ivaTaxa}%. O valor inclui mão-de-obra, equipamentos e os materiais descritos como 'a fornecer pelo Empreiteiro'.`
      },
      {
        titulo: "4. CONDIÇÕES DE PAGAMENTO",
        texto: `O pagamento será efetuado de forma faseada:\na) 40% com a adjudicação (para aquisição de materiais e início de trabalhos);\nb) 30% quando executado 50% do cronograma previsto;\nc) 30% com a conclusão da obra e assinatura do Auto de Receção.`
      },
      {
        titulo: "5. TRABALHOS A MAIS (ALTERAÇÕES)",
        texto: `Qualquer alteração ao projeto ou pedido de trabalho extra pelo Dono da Obra só será vinculativo se aprovado por escrito (email ou adenda), com a respetiva revisão de preço e prazo. O Empreiteiro reserva-se o direito de não executar trabalhos extra que não tenham sido previamente orçamentados e pagos.`
      },
      {
        titulo: "6. PRAZO E ACESSO À OBRA",
        texto: `1. O prazo de execução é de ${prazoExecucao}, contados a partir da data de início dos trabalhos ou da disponibilização do local.\n2. O prazo suspende-se automaticamente se o Dono da Obra não fornecer materiais a seu cargo atempadamente ou por motivos de força maior (intempéries, greves).`
      },
      {
        titulo: "7. GARANTIA DA OBRA",
        texto: `A obra goza da garantia legal prevista no Código Civil (Art. 1225.º):\na) 10 Anos para defeitos estruturais que afetem a estabilidade ou solidez do imóvel;\nb) 5 Anos para os restantes defeitos da empreitada;\nc) 3 Anos para equipamentos móveis incorporados (ex: eletrodomésticos), nos termos do DL 84/2021.`
      },
      {
        titulo: "8. RECEÇÃO DA OBRA",
        texto: `No final da obra, as partes procederão a uma vistoria conjunta e assinarão um "Auto de Receção". A recusa injustificada do Dono da Obra em comparecer ou assinar o auto não impede que a obra se considere aceite tacitamente para efeitos de garantia e pagamento final.`
      },
      {
        titulo: "9. VALIDADE DA PROPOSTA",
        texto: `As condições deste orçamento são válidas por ${validadeProposta} a contar da data de emissão (${dataHoje}). Após este período, o Empreiteiro reserva-se o direito de atualizar os valores face aos preços de mercado dos materiais.`
      },
      {
        titulo: "10. RESOLUÇÃO DE LITÍGIOS (RAL)",
        texto: `Em cumprimento da Lei n.º 144/2015, informa-se que em caso de litígio de consumo, o Dono da Obra pode recorrer ao Centro de Arbitragem de Conflitos de Consumo da área geográfica do imóvel (ex: CIAC, CNIACC) ou ao CICAP.`
      }
    ],
    assinantes: {
      parte1: "O Empreiteiro",
      parte2: "O Dono da Obra (Adjudico)"
    }
  };
};