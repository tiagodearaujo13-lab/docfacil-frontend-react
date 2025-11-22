// src/modelos/GerenciadorModelos.js

import { gerarTextoContrato } from "./ContratoServicos.js";
import { gerarTextoArrendamento } from "./ContratoArrendamento.js";
import { gerarTextoNDA } from "./AcordoConfidencialidade.js";
import { gerarTextoProposta } from "./PropostaComercial.js";
import { gerarTextoOrcamento } from "./OrcamentoObras.js";
import { gerarTextoTrabalho } from "./ContratoTrabalho.js";
import { gerarTextoTrabalhoSemTermo } from "./ContratoTrabalhoSemTermo.js";
import { gerarTextoRGPD } from "./PoliticaPrivacidade.js";
import { gerarTextoDivida } from "./ReconhecimentoDivida.js";
import { gerarTextoVeiculo } from "./CompraVendaVeiculo.js";
import { gerarTextoOposicao } from "./CartaOposicao.js";
import { gerarTextoRescisao } from "./CartaRescisao.js";
import { gerarTextoAta } from "./AtaAssembleia.js";
import { gerarTextoProcuracao } from "./Procuracao.js";
import { gerarTextoDomestico } from "./ContratoDomestico.js";

// AQUI ESTÁ A CORREÇÃO CRÍTICA:
import { gerarTextoCPCV } from "./CPCV.js"; 

export const obterModeloPorTipo = (tipo, dados) => {
  
  // Normalizar para evitar erros de maiúsculas/minúsculas
  const tipoLimpo = tipo ? tipo.toLowerCase().trim() : "";

  switch (tipoLimpo) {
    // COMERCIAL
    case "contrato": 
    case "servicos": return gerarTextoContrato(dados);
    case "proposta": return gerarTextoProposta(dados);
    case "orcamento": return gerarTextoOrcamento(dados);
    
    // IMOBILIÁRIO
    case "imobiliario": return gerarTextoArrendamento(dados);
    case "oposicao": return gerarTextoOposicao(dados);
    
    // O CPCV ESTÁ AQUI:
    case "cpcv": return gerarTextoCPCV(dados);

    // RH / TRABALHO
    case "trabalho": return gerarTextoTrabalho(dados);
    case "trabalho_efetivo": return gerarTextoTrabalhoSemTermo(dados);
    case "domestico": return gerarTextoDomestico(dados);
    case "rescisao_trabalho": return gerarTextoRescisao(dados);

    // JURÍDICO / GERAL
    case "nda": 
    case "juridico": return gerarTextoNDA(dados);
    case "rgpd": return gerarTextoRGPD(dados);
    case "divida": return gerarTextoDivida(dados);
    case "veiculo": return gerarTextoVeiculo(dados);
    case "ata_assembleia": return gerarTextoAta(dados);
    case "procuracao": return gerarTextoProcuracao(dados);

    default:
      console.warn(`Modelo não encontrado: ${tipo}. A carregar Prestação de Serviços.`);
      return gerarTextoContrato(dados);
  }
};