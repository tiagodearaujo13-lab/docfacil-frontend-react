export const gerarTextoNDA = (dados) => {
  const dataHoje = new Date().toLocaleDateString("pt-PT");

  // --- IDENTIFICAÇÃO RIGOROSA ---
  const parteReveladora = dados.parteReveladora || "___________________ (Nome/Empresa Reveladora)";
  const revNIF = dados.reveladoraNIF || "_________";
  const revMorada = dados.reveladoraMorada || "Sede/Domicílio";

  const parteReceptora = dados.parteReceptora || "___________________ (Nome/Empresa Receptora)";
  const recNIF = dados.receptoraNIF || "_________";
  const recMorada = dados.receptoraMorada || "Sede/Domicílio";

  // --- DADOS DO NEGÓCIO ---
  const objetivo = dados.objetivo || "Avaliação de potencial parceria comercial, investimento ou desenvolvimento conjunto.";
  
  // A multa deve ser alta para dissuadir. Padrão sugerido: 25.000€
  const pena = dados.multa || "25.000"; 
  const comarca = dados.comarca || "Lisboa";

  return {
    titulo: "ACORDO DE CONFIDENCIALIDADE E NÃO-DIVULGAÇÃO (NDA)",
    clausulas: [
      {
        titulo: "1. IDENTIFICAÇÃO DAS PARTES",
        texto: `ENTRE:\n\n1. PARTE REVELADORA: ${parteReveladora}, NIF ${revNIF}, com sede/domicílio em ${revMorada}.\n\n2. PARTE RECEPTORA: ${parteReceptora}, NIF ${recNIF}, com sede/domicílio em ${recMorada}.\n\n(Desejando as partes encetar conversações com vista a: "${objetivo}", e reconhecendo que para tal será necessário partilhar informações de natureza sensível e proprietária, celebram o presente acordo nos termos seguintes).`
      },
      {
        titulo: "2. DEFINIÇÃO DE INFORMAÇÃO CONFIDENCIAL",
        texto: `2.1. Considera-se "Informação Confidencial" toda a informação técnica, financeira, comercial, estratégica, segredos de negócio ou "know-how", transmitida por qualquer meio (oral, escrito, digital), incluindo, mas não se limitando a: bases de dados de clientes, códigos-fonte, algoritmos, planos de marketing, estruturas de custos e modelos financeiros.\n2.2. A classificação de informação como confidencial independe de marcação expressa como tal, bastando que, pela sua natureza, não seja do conhecimento público.`
      },
      {
        titulo: "3. DEVERES DE CONFIDENCIALIDADE E SEGURANÇA",
        texto: `A Parte Receptora obriga-se a:\na) Manter o mais estrito sigilo sobre a Informação Confidencial, não a divulgando a terceiros sem prévio consentimento escrito da Parte Reveladora;\nb) Utilizar a informação exclusivamente para o objetivo descrito na Cláusula 1, sendo vedado o uso para benefício próprio ou concorrencial;\nc) Implementar medidas de segurança informática e física adequadas para prevenir o acesso não autorizado.`
      },
      {
        titulo: "4. RESPONSABILIDADE POR COLABORADORES",
        texto: `A Parte Receptora poderá partilhar a informação estritamente com os seus colaboradores ou consultores que tenham "necessidade de conhecer" (need-to-know) para o cumprimento do objetivo. Contudo, a Parte Receptora assume total e solidária responsabilidade por qualquer violação deste acordo perpetrada pelos seus colaboradores, diretores ou consultores.`
      },
      {
        titulo: "5. EXCEÇÕES",
        texto: `O dever de confidencialidade cessa se a informação:\na) Se tornar do domínio público sem culpa da Parte Receptora;\nb) Já estivesse na posse legítima e comprovada da Parte Receptora antes da revelação;\nc) Tiver de ser revelada por imperativo legal ou ordem judicial, devendo a Parte Receptora avisar a Parte Reveladora de imediato para que esta possa reagir processualmente.`
      },
      {
        titulo: "6. CLÁUSULA PENAL E INDEMNIZAÇÃO",
        texto: `Em caso de violação, dolosa ou negligente, das obrigações aqui assumidas, a Parte Receptora obriga-se a pagar à Parte Reveladora, a título de cláusula penal fixada antecipadamente, a quantia de ${pena}€ (Euros).\nO pagamento desta pena não impede a Parte Reveladora de exigir indemnização por danos excedentes (patrimoniais e não patrimoniais) que consiga comprovar, nos termos do artigo 811.º do Código Civil.`
      },
      {
        titulo: "7. NÃO-CONTORNO (NON-CIRCUMVENTION)",
        texto: `A Parte Receptora compromete-se expressamente a não utilizar a Informação Confidencial para contornar a Parte Reveladora, contactando diretamente os seus clientes, fornecedores ou parceiros estratégicos com o intuito de celebrar negócios em prejuízo ou exclusão da Parte Reveladora.`
      },
      {
        titulo: "8. DEVOLUÇÃO E DESTRUIÇÃO DE DADOS",
        texto: `A pedido da Parte Reveladora ou após o termo do objetivo, a Parte Receptora deve devolver ou destruir (apresentando certificado de destruição) todos os suportes que contenham Informação Confidencial, não mantendo quaisquer cópias, exceto para cumprimento de obrigações legais de arquivo.`
      },
      {
        titulo: "9. VIGÊNCIA E LEI APLICÁVEL",
        texto: `9.1. O dever de confidencialidade mantém-se em vigor durante 5 (cinco) anos após o termo das negociações.\n9.2. O presente acordo rege-se pela Lei Portuguesa. Para dirimir quaisquer litígios, as partes estipulam a competência exclusiva do Tribunal da Comarca de ${comarca}.`
      },
      {
        titulo: "ASSINATURAS",
        texto: `Feito em duplicado, valendo como título executivo.\nAssinado em ${comarca}, no dia ${dataHoje}.`
      }
    ],
    assinantes: {
      parte1: "A Parte Reveladora",
      parte2: "A Parte Receptora"
    }
  };
};