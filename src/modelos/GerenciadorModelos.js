// --- MODELOS EXISTENTES ---
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
import { gerarTextoCPCV } from "./CPCV.js";

// --- NOVOS MODELOS PREMIUM (ADICIONADOS AGORA) ---
import { gerarTextoOposicao } from "./CartaOposicao.js";
import { gerarTextoRescisao } from "./CartaRescisao.js";
import { gerarTextoAta } from "./AtaAssembleia.js";
import { gerarTextoProcuracao } from "./Procuracao.js";
import { gerarTextoDomestico } from "./ContratoDomestico.js";

export const obterModeloPorTipo = (tipo, dados) => {
  
  switch (tipo) {
    // --- CATEGORIA COMERCIAL ---
    case "contrato": return gerarTextoContrato(dados); // Prestação de Serviços
    case "proposta": return gerarTextoProposta(dados);
    case "orcamento": return gerarTextoOrcamento(dados);
    
    // --- CATEGORIA IMOBILIÁRIO ---
    case "imobiliario": return gerarTextoArrendamento(dados);
    case "cpcv": return gerarTextoCPCV(dados);
    case "oposicao": return gerarTextoOposicao(dados); // <--- NOVO

    // --- CATEGORIA RH (TRABALHO) ---
    case "trabalho": return gerarTextoTrabalho(dados); // Termo Certo
    case "trabalho_efetivo": return gerarTextoTrabalhoSemTermo(dados);
    case "domestico": return gerarTextoDomestico(dados); // <--- NOVO
    case "rescisao_trabalho": return gerarTextoRescisao(dados); // <--- NOVO

    // --- CATEGORIA JURÍDICO / GERAL ---
    case "nda": 
    case "juridico": return gerarTextoNDA(dados);
    case "rgpd": return gerarTextoRGPD(dados);
    case "divida": return gerarTextoDivida(dados);
    case "veiculo": return gerarTextoVeiculo(dados);
    case "ata_assembleia": return gerarTextoAta(dados); // <--- NOVO
    case "procuracao": return gerarTextoProcuracao(dados); // <--- NOVO

    default:
      console.warn(`Tipo de documento desconhecido: ${tipo}. A usar padrão.`);
      return gerarTextoContrato(dados);
  }
};