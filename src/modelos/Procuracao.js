export const gerarTextoProcuracao = (dados) => {
  const dataHoje = new Date().toLocaleDateString("pt-PT");

  // --- MANDANTE (Quem passa a procuração) ---
  const mandante = dados.prestador || "___________________ (Nome Completo)";
  const mandanteNIF = dados.prestadorNIF || "_________";
  const mandanteCC = dados.prestadorCC || "_________";
  // Importante: Cartórios exigem validade do CC e Estado Civil
  const mandanteValidade = dados.validadeCC || "Válido até __/__/____"; 
  const mandanteEstCivil = dados.estadoCivil || "Casado(a)/Solteiro(a)"; 
  const mandanteMorada = dados.prestadorMorada || "___________________";

  // --- MANDATÁRIO (Procurador/Advogado) ---
  const mandatario = dados.cliente || "___________________ (Nome Completo)";
  const mandatarioNIF = dados.clienteNIF || "_________";
  const mandatarioCC = dados.clienteCC || "_________";
  const mandatarioMorada = dados.clienteMorada || "___________________";

  // --- PODERES ---
  // Se vazio, assume poderes forenses gerais.
  const poderesDescritos = dados.descricaoServico || "Os necessários para o exercício do mandato forense geral, incluindo os de confessar, desistir ou transigir em qualquer pleito.";

  // --- LÓGICA DE SUBSTABELECIMENTO (CORRIGIDA) ---
  // Usa uma variável específica 'podeSubstabelecer' em vez de reutilizar 'temConfidencialidade'
  const substabelecimento = dados.podeSubstabelecer 
    ? "COM a faculdade de substabelecer (delegar poderes)" 
    : "SEM a faculdade de substabelecer";

  return {
    titulo: "PROCURAÇÃO FORENSE",
    clausulas: [
      {
        titulo: "IDENTIFICAÇÃO DO MANDANTE",
        texto: `${mandante}, estado civil ${mandanteEstCivil}, portador do Cartão de Cidadão n.º ${mandanteCC}, ${mandanteValidade}, e NIF ${mandanteNIF}, residente em: ${mandanteMorada}.`
      },
      {
        titulo: "IDENTIFICAÇÃO DO MANDATÁRIO",
        texto: `${mandatario}, portador do Cartão de Cidadão n.º ${mandatarioCC} e NIF ${mandatarioNIF}, com domicílio profissional/residência em: ${mandatarioMorada}.`
      },
      {
        titulo: "PODERES CONFERIDOS",
        texto: `Pelo presente instrumento, o Mandante constitui seu bastante procurador o Mandatário, a quem confere:\n\n${poderesDescritos}\n\nMais confere poderes para praticar todos os atos preparatórios, acessórios ou complementares que se mostrem necessários ao fiel cumprimento deste mandato, prometendo haver por bom, firme e valioso tudo o que pelo dito procurador for obrado.`
      },
      {
        titulo: "SUBSTABELECIMENTO",
        texto: `O presente mandato é conferido ${substabelecimento} a terceiros.`
      },
      {
        titulo: "VALIDADE E FORMA",
        texto: `Esta procuração é válida por tempo indeterminado até revogação expressa.\nNOTA LEGAL: Para que esta procuração tenha efeitos em atos notariais (ex: compra e venda de imóveis) ou judiciais, a assinatura do Mandante deve ser objeto de Reconhecimento Presencial de Letra e Assinatura ou Termo de Autenticação por entidade competente (Advogado, Solicitador ou Notário).`
      },
      {
        titulo: "ASSINATURA",
        texto: `Feito em ${dados.comarca || "Portugal"}, no dia ${dataHoje}.\n\nO Mandante,\n\n______________________________________________\n(Assinatura conforme documento de identificação)`
      }
    ],
    assinantes: {
      parte1: "" // Procuração é ato unilateral, só assina o mandante no corpo principal
    }
  };
};