export const gerarTextoProposta = (dados) => {
  const dataHoje = new Date().toLocaleDateString("pt-PT");

  const cliente = dados.cliente || "___________________";
  const fornecedor = dados.prestador || "___________________"; // Reutilizamos 'prestador'
  const validade = dados.validadeProposta || "15 dias";
  const escopo = dados.descricaoServico || "Descrição do projeto...";
  const valor = dados.valor || "0,00";
  const condicoesPagamento = dados.condicoesPagamento || "50% na adjudicação, 50% na entrega";

  return {
    titulo: "PROPOSTA COMERCIAL",
    clausulas: [
      {
        titulo: "1. Apresentação",
        texto: `A empresa/profissional ${fornecedor} tem o prazer de apresentar esta proposta comercial para ${cliente}, visando o fornecimento de serviços/produtos de alta qualidade.`
      },
      {
        titulo: "2. Escopo da Proposta",
        texto: `O objetivo desta proposta é a execução do seguinte: ${escopo}.`
      },
      {
        titulo: "3. Investimento e Condições",
        texto: `O valor total do investimento é de ${valor}€ (mais IVA à taxa legal, se aplicável).\n\nCondições de Pagamento: ${condicoesPagamento}.`
      },
      {
        titulo: "4. Validade",
        texto: `Esta proposta é válida por ${validade} a contar da data de emissão (${dataHoje}). Após este período, os valores podem sofrer reajustes.`
      },
      {
        titulo: "5. Aceitação",
        texto: `Para aceitar esta proposta, basta assinar abaixo ou enviar um "De Acordo" por e-mail referenciando este documento.`
      }
    ],
    assinantes: {
      parte1: "Fornecedor",
      parte2: "Cliente (De Acordo)"
    }
  };
};