export const gerarTextoOrcamento = (dados) => {
  const dataHoje = new Date().toLocaleDateString("pt-PT");

  const cliente = dados.cliente || "___________________";
  const empreiteiro = dados.prestador || "___________________";
  const localObra = dados.moradaImovel || "___________________"; // Reutilizamos 'moradaImovel'
  const materiais = dados.materiais || "Por conta do cliente";
  const maoDeObra = dados.valor || "0,00";
  const prazo = dados.prazo || "30 dias";

  return {
    titulo: "ORÇAMENTO DE OBRAS E REFORMAS",
    clausulas: [
      {
        titulo: "1. Dados da Obra",
        texto: `Este orçamento refere-se à execução de serviços de construção/reforma no imóvel situado em: ${localObra}.\nSolicitante: ${cliente}.\nExecutor: ${empreiteiro}.`
      },
      {
        titulo: "2. Descrição dos Serviços",
        texto: `Serão realizados os seguintes trabalhos:\n${dados.descricaoServico || "Listar serviços..."}`
      },
      {
        titulo: "3. Materiais",
        texto: `Definição sobre fornecimento de materiais: ${materiais}.`
      },
      {
        titulo: "4. Custos e Prazos",
        texto: `Valor da Mão de Obra: ${maoDeObra}€.\nPrazo estimado de execução: ${prazo}, contado a partir do início efetivo dos trabalhos.`
      },
      {
        titulo: "Nota Importante",
        texto: `Este orçamento não inclui serviços extras não listados na cláusula 2. Quaisquer alterações no escopo serão orçadas separadamente.`
      },
      {
        titulo: "Data",
        texto: `Emitido em ${dataHoje}.`
      }
    ],
    assinantes: {
      parte1: "Empreiteiro",
      parte2: "Cliente"
    }
  };
};