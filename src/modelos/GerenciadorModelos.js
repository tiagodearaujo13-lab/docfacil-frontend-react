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

// CORREÇÃO: Adicionar tratamento de erro para o CPCV
import { gerarTextoCPCV } from "./CPCV.js"; 

// 🔧 FUNÇÃO DE FALLBACK PARA MODELOS AUSENTES
const criarModeloFallback = (tipo, dados) => ({
  titulo: `CONTRATO ${tipo.toUpperCase()}`,
  clausulas: [
    {
      titulo: "INFORMAÇÃO IMPORTANTE",
      texto: `O modelo para "${tipo}" está temporariamente indisponível. Por favor, contacte o suporte.`
    },
    {
      titulo: "DADOS INSERIDOS",
      texto: `Foram registados os seguintes dados: ${JSON.stringify(dados, null, 2)}`
    }
  ],
  assinantes: {
    parte1: "Parte 1",
    parte2: "Parte 2"
  }
});

// 🔧 VALIDAÇÃO DE DADOS CRÍTICOS
const validarDadosObrigatorios = (tipo, dados) => {
  const validacoes = {
    imobiliario: () => {
      if (!dados.valorRenda || dados.valorRenda === "0" || dados.valorRenda === "0,00") {
        console.warn("⚠️  Contrato de arrendamento sem renda definida - pode ser nulo");
      }
      if (!dados.valorCaucao) {
        console.warn("⚠️  Contrato de arrendamento sem caução - obrigatório por lei");
      }
    },
    servicos: () => {
      if (!dados.valor || dados.valor === "0" || dados.valor === "0,00") {
        console.warn("⚠️  Contrato de serviços sem valor definido - pode ser nulo");
      }
    },
    cpcv: () => {
      if (!dados.valor || dados.valor === "0" || dados.valor === "0,00") {
        console.warn("⚠️  CPCV sem valor definido - pode ser nulo");
      }
    }
  };

  if (validacoes[tipo]) {
    validacoes[tipo]();
  }
};

export const obterModeloPorTipo = (tipo, dados) => {
  // Normalizar para evitar erros de maiúsculas/minúsculas
  const tipoLimpo = tipo ? tipo.toLowerCase().trim() : "";
  
  // 🔧 VALIDAR DADOS CRÍTICOS ANTES DE GERAR
  validarDadosObrigatorios(tipoLimpo, dados);

  // 🔧 TRY-CATCH PARA RESILIÊNCIA
  try {
    switch (tipoLimpo) {
      // COMERCIAL
      case "contrato": 
      case "servicos": 
        return gerarTextoContrato(dados);
      
      case "proposta": 
        return gerarTextoProposta(dados);
      
      case "orcamento": 
        return gerarTextoOrcamento(dados);
      
      // IMOBILIÁRIO
      case "imobiliario": 
        return gerarTextoArrendamento(dados);
      
      case "oposicao": 
        return gerarTextoOposicao(dados);
      
      // CPCV COM TRATAMENTO DE ERRO
      case "cpcv": 
        if (typeof gerarTextoCPCV === 'function') {
          return gerarTextoCPCV(dados);
        } else {
          console.error("❌ Modelo CPCV não encontrado");
          return criarModeloFallback("cpcv", dados);
        }

      // RH / TRABALHO
      case "trabalho": 
        return gerarTextoTrabalho(dados);
      
      case "trabalho_efetivo": 
        return gerarTextoTrabalhoSemTermo(dados);
      
      case "domestico": 
        return gerarTextoDomestico(dados);
      
      case "rescisao_trabalho": 
        return gerarTextoRescisao(dados);

      // JURÍDICO / GERAL
      case "nda": 
      case "juridico": 
        return gerarTextoNDA(dados);
      
      case "rgpd": 
        return gerarTextoRGPD(dados);
      
      case "divida": 
        return gerarTextoDivida(dados);
      
      case "veiculo": 
        return gerarTextoVeiculo(dados);
      
      case "ata_assembleia": 
        return gerarTextoAta(dados);
      
      case "procuracao": 
        return gerarTextoProcuracao(dados);

      default:
        console.warn(`⚠️  Modelo não encontrado: ${tipo}. A carregar Prestação de Serviços.`);
        return gerarTextoContrato(dados);
    }
  } catch (erro) {
    console.error(`❌ Erro crítico ao gerar modelo ${tipo}:`, erro);
    
    // 🔧 FALLBACK GRACEFUL
    return criarModeloFallback(tipo, dados);
  }
};

// 🔧 FUNÇÃO AUXILIAR PARA LISTAR MODELOS DISPONÍVEIS (útil para debug)
export const listarModelosDisponiveis = () => {
  const modelos = {
    comercial: ["contrato", "servicos", "proposta", "orcamento"],
    imobiliario: ["imobiliario", "cpcv", "oposicao"],
    trabalho: ["trabalho", "trabalho_efetivo", "domestico", "rescisao_trabalho"],
    juridico: ["nda", "juridico", "rgpd", "divida", "veiculo", "ata_assembleia", "procuracao"]
  };
  
  return modelos;
};