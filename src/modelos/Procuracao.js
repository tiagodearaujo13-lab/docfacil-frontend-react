export const gerarTextoProcuracao = (dados) => {
  const dataHoje = new Date().toLocaleDateString("pt-PT");

  // Mandante (Quem dá os poderes - ex: o seu cliente)
  // Reutilizamos os campos de 'prestador' para o Mandante
  const mandante = dados.prestador || "Nome Completo do Mandante";
  const mandanteNIF = dados.prestadorNIF || "_________";
  const mandanteCC = dados.prestadorCC || "_________"; // Vamos precisar mapear este campo
  const mandanteMorada = dados.prestadorMorada || "Morada Completa";

  // Mandatário (Quem recebe os poderes - ex: advogado, contabilista, familiar)
  // Reutilizamos os campos de 'cliente' para o Mandatário
  const mandatario = dados.cliente || "Nome Completo do Procurador";
  const mandatarioNIF = dados.clienteNIF || "_________";
  const mandatarioCC = dados.clienteCC || "_________"; // Vamos precisar mapear este campo
  const mandatarioMorada = dados.clienteMorada || "Morada Completa";

  // Poderes Específicos
  // O utilizador escreve "Vender o imóvel X" ou "Movimentar conta Y" no campo descrição
  const poderesDescritos = dados.descricaoServico || "Poderes gerais de administração civil.";
  
  // Opções Extras
  const permiteSubstabelecer = dados.temConfidencialidade ? "COM" : "SEM"; // Usamos a checkbox 'confidencialidade' como 'substabelecimento' por enquanto

  return {
    titulo: "PROCURAÇÃO",
    clausulas: [
      {
        titulo: "1. MANDANTE (Quem confere os poderes)",
        texto: `${mandante}, portador do Cartão de Cidadão n.º ${mandanteCC} e contribuinte fiscal n.º ${mandanteNIF}, residente em: ${mandanteMorada}.`
      },
      {
        titulo: "2. MANDATÁRIO (Quem recebe os poderes)",
        texto: `${mandatario}, portador do Cartão de Cidadão n.º ${mandatarioCC} e contribuinte fiscal n.º ${mandatarioNIF}, residente em: ${mandatarioMorada}.`
      },
      {
        titulo: "3. PODERES CONFERIDOS",
        texto: `Pelo presente instrumento e nos termos do artigo 262.º do Código Civil, o Mandante constitui seu bastante procurador o Mandatário, a quem confere os poderes necessários para:\n\n${poderesDescritos}\n\nMais confere os poderes para praticar todos os atos preparatórios, acessórios ou complementares que se mostrem necessários ao fiel cumprimento deste mandato, incluindo assinar requerimentos, contratos ou escrituras públicas.`
      },
      {
        titulo: "4. SUBSTABELECIMENTO",
        texto: `O presente mandato é conferido ${permiteSubstabelecer} a faculdade de substabelecimento (ou seja, o Mandatário poderá/não poderá delegar estes poderes noutra pessoa).`
      },
      {
        titulo: "5. VALIDADE",
        texto: `Esta procuração é válida por tempo indeterminado (ou até revogação expressa), servindo de título executivo bastante para os fins a que se destina.`
      },
      {
        titulo: "Assinatura",
        texto: `Feito e assinado em ${dados.comarca || "Portugal"}, no dia ${dataHoje}.\n\nO Mandante,\n__________________________\n(Assinatura conforme CC)`
      }
    ],
    assinantes: {
      parte1: "", 
      parte2: ""
    }
  };
};