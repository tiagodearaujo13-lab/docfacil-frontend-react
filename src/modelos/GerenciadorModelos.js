import { gerarTextoContrato } from "./ContratoServicos.js";
import { gerarTextoArrendamento } from "./ContratoArrendamento.js";
import { gerarTextoNDA } from "./AcordoConfidencialidade.js";
import { gerarTextoProposta } from "./PropostaComercial.js";
import { gerarTextoOrcamento } from "./OrcamentoObras.js";

// --- O ERRO ESTAVA AQUI: FALTAVAM ESTES DOIS IMPORTS ---
import { gerarTextoTrabalho } from "./ContratoTrabalho.js";
import { gerarTextoRGPD } from "./PoliticaPrivacidade.js";
// -------------------------------------------------------

export const obterModeloPorTipo = (tipo, dados) => {
  // O tipo vem do Banco de Dados ou do Botão clicado
  
  switch (tipo) {
    case "contrato": // Prestação de Serviços
      return gerarTextoContrato(dados);
      
    case "imobiliario": // Arrendamento
      return gerarTextoArrendamento(dados);
      
    case "nda": // Acordo de Confidencialidade
    case "juridico": 
      return gerarTextoNDA(dados);

    case "proposta": // Proposta Comercial
      return gerarTextoProposta(dados);

    case "orcamento": // Orçamento de Obras
      return gerarTextoOrcamento(dados);

    // Estes casos precisavam dos imports acima para funcionar:
    case "trabalho":
      return gerarTextoTrabalho(dados);

    case "rgpd":
      return gerarTextoRGPD(dados);
      
    default:
      // Se não souber o que é, retorna Serviços por segurança
      return gerarTextoContrato(dados);
  }
};