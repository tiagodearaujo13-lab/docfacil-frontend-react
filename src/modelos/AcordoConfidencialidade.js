export const gerarTextoNDA = (dados) => {
  const dataHoje = new Date().toLocaleDateString("pt-PT");

  const parteReveladora = dados.parteReveladora || "___________________ (Quem detém o segredo)";
  const parteReceptora = dados.parteReceptora || "___________________ (Quem recebe a info)";
  const objetivo = dados.objetivo || "Avaliação de potencial parceria comercial ou investimento.";
  
  // A multa é vital. Se o utilizador não puser nada, sugerimos 25.000€ para ser dissuasor.
  const pena = dados.multa || "25.000"; 
  const comarca = dados.comarca || "Lisboa";

  return {
    titulo: "ACORDO DE CONFIDENCIALIDADE E NÃO-DIVULGAÇÃO (NDA)",
    clausulas: [
      {
        titulo: "1. PARTES",
        texto: `ENTRE:\n\n1. PARTE REVELADORA: ${parteReveladora}.\n2. PARTE RECEPTORA: ${parteReceptora}.\n\nAs partes pretendem encetar conversações com vista a: ${objetivo}. Para tal, será necessário partilhar informações de natureza confidencial.`
      },
      {
        titulo: "2. DEFINIÇÃO DE INFORMAÇÃO CONFIDENCIAL",
        texto: `Considera-se "Informação Confidencial" toda a informação, técnica, financeira, comercial, estratégica ou de "know-how", transmitida oralmente, por escrito ou digitalmente, incluindo, mas não se limitando a: listas de clientes, segredos de negócio, códigos-fonte, planos de marketing e modelos financeiros.`
      },
      {
        titulo: "3. DEVERES DA PARTE RECEPTORA",
        texto: `A Parte Receptora obriga-se a:\na) Manter a informação estritamente confidencial e não a divulgar a terceiros sem consentimento escrito;\nb) Utilizar a informação exclusivamente para o objetivo descrito na Cláusula 1;\nc) Não copiar, reproduzir ou realizar engenharia reversa sobre a informação partilhada.`
      },
      {
        titulo: "4. EXCEÇÕES",
        texto: `O dever de confidencialidade não se aplica a informações que:\na) Sejam ou se tornem do domínio público sem culpa da Parte Receptora;\nb) Já estivessem na posse legítima da Parte Receptora antes da revelação;\nc) Tenham de ser reveladas por ordem judicial ou imperativo legal.`
      },
      {
        titulo: "5. CLÁUSULA PENAL (INDEMNIZAÇÃO)",
        texto: `Em caso de violação culposa do dever de confidencialidade estabelecido neste acordo, a Parte Receptora obriga-se a pagar à Parte Reveladora, a título de cláusula penal, a quantia fixa de ${pena}€ (Euros), sem prejuízo do direito da Parte Reveladora de exigir indemnização por danos excedentes que consiga comprovar.`
      },
      {
        titulo: "6. NÃO-CONTORNO (NON-CIRCUMVENTION)",
        texto: `A Parte Receptora compromete-se a não utilizar a Informação Confidencial para, direta ou indiretamente, contornar a Parte Reveladora e contactar os seus clientes, fornecedores ou parceiros com o intuito de obter vantagem económica própria em prejuízo da Parte Reveladora.`
      },
      {
        titulo: "7. DEVOLUÇÃO DA INFORMAÇÃO",
        texto: `A pedido da Parte Reveladora, ou aquando do termo das negociações, a Parte Receptora deverá devolver ou destruir (apresentando comprovativo) todos os documentos e cópias que contenham Informação Confidencial.`
      },
      {
        titulo: "8. VIGÊNCIA",
        texto: `As obrigações de confidencialidade aqui previstas manter-se-ão em vigor durante as negociações e pelo período de 5 (cinco) anos após o seu termo, independentemente da concretização ou não do negócio principal.`
      },
      {
        titulo: "ASSINATURAS",
        texto: `Assinado em ${comarca}, no dia ${dataHoje}, em dois exemplares de igual valor.`
      }
    ],
    assinantes: {
      parte1: "Parte Reveladora",
      parte2: "Parte Receptora"
    }
  };
};