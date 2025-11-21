export const gerarTextoRGPD = (dados) => {
  const dataHoje = new Date().toLocaleDateString("pt-PT");

  const empresa = dados.empresa || "___________________";
  const site = dados.site || "www.exemplo.pt";
  const emailDPO = dados.emailDPO || "privacidade@exemplo.pt";

  return {
    titulo: "POLÍTICA DE PRIVACIDADE E TRATAMENTO DE DADOS (RGPD)",
    clausulas: [
      {
        titulo: "1. Enquadramento",
        texto: `A ${empresa} está empenhada em proteger a privacidade dos seus clientes e utilizadores do website ${site}, cumprindo integralmente o Regulamento (UE) 2016/679 (Regulamento Geral sobre a Proteção de Dados - RGPD).`
      },
      {
        titulo: "2. Responsável pelo Tratamento",
        texto: `A responsabilidade pelo tratamento dos dados recai sobre a ${empresa}. Para qualquer questão relacionada, poderá contactar através do e-mail: ${emailDPO}.`
      },
      {
        titulo: "3. Finalidade dos Dados",
        texto: `Os dados recolhidos (como nome, e-mail, telefone) destinam-se exclusivamente à gestão da relação contratual, faturação, e envio de comunicações informativas, se consentido.`
      },
      {
        titulo: "4. Direitos do Titular",
        texto: `O titular dos dados tem o direito de solicitar à ${empresa}, a qualquer momento: o acesso aos seus dados pessoais; a retificação dos dados inexatos; o apagamento dos dados ("direito a ser esquecido"); a limitação do tratamento.`
      },
      {
        titulo: "5. Partilha com Terceiros",
        texto: `Os dados pessoais não serão transmitidos a terceiros, exceto para cumprimento de obrigações legais (ex: Autoridade Tributária) ou prestadores de serviços estritamente necessários (ex: contabilidade).`
      },
      {
        titulo: "Vigência",
        texto: `Esta política entra em vigor imediatamente (${dataHoje}) e pode ser atualizada a qualquer momento.`
      }
    ],
    assinantes: {
      parte1: "A Gerência",
      parte2: ""
    }
  };
};