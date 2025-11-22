export const gerarTextoRGPD = (dados) => {
  const dataHoje = new Date().toLocaleDateString("pt-PT");

  const empresa = dados.empresa || "___________________ (Nome da Empresa/Responsável)";
  const nifEmpresa = dados.nifEmpregador || "_________"; // Reutilizamos NIF
  const site = dados.site || "www.oseusite.pt";
  const emailDPO = dados.emailDPO || "privacidade@oseusite.pt";

  let clausulas = [
    {
      titulo: "1. OBJETIVO E ÂMBITO",
      texto: `A presente Política de Privacidade visa informar os clientes e utilizadores do site ${site} sobre as regras de tratamento de dados pessoais recolhidos e tratados pela ${empresa} (NIF ${nifEmpresa}), em estrito cumprimento do Regulamento (UE) 2016/679 (RGPD) e da Lei n.º 58/2019.`
    },
    {
      titulo: "2. RESPONSÁVEL PELO TRATAMENTO",
      texto: `A entidade responsável pela recolha e tratamento dos dados pessoais é a ${empresa}, que decide quais os dados recolhidos, os meios de tratamento e as finalidades para que são utilizados.\nContacto para assuntos de privacidade: ${emailDPO}.`
    },
    {
      titulo: "3. DADOS RECOLHIDOS E FINALIDADE",
      texto: `A ${empresa} recolhe apenas os dados essenciais para a prestação do serviço, nomeadamente:\n\na) Dados de Identificação: Nome, NIF (para faturação);\nb) Dados de Contacto: Email, telefone, morada;\nc) Dados de Navegação: Cookies técnicos para funcionamento do site.\n\nFinalidades: Gestão contratual, cumprimento de obrigações fiscais, melhoria do serviço e apoio ao cliente.`
    },
    {
      titulo: "4. PRAZO DE CONSERVAÇÃO",
      texto: `Os dados pessoais serão conservados apenas durante o período necessário para as finalidades para as quais foram recolhidos:\n- Dados de Faturação: 10 anos (obrigação legal perante a Autoridade Tributária);\n- Dados de Conta/Cliente: Enquanto a relação contratual se mantiver ativa ou até o titular solicitar o apagamento.`
    },
    {
      titulo: "5. DIREITOS DO TITULAR DOS DADOS",
      texto: `O titular dos dados tem o direito de solicitar, a qualquer momento e gratuitamente:\n- O acesso aos seus dados pessoais;\n- A retificação de dados inexatos ou incompletos;\n- O apagamento dos seus dados ("direito a ser esquecido"), exceto quando a lei imponha a sua conservação;\n- A portabilidade dos dados para outra entidade;\n- A oposição ao tratamento para fins de marketing.`
    },
    {
      titulo: "6. PARTILHA COM TERCEIROS",
      texto: `Os dados pessoais não serão transmitidos a terceiros, exceto:\na) A entidades a quem os dados devam ser comunicados por força de obrigação legal (ex: Autoridade Tributária);\nb) A empresas subcontratantes estritamente necessárias à prestação do serviço (ex: processamento de pagamentos, alojamento web), que atuarão sob as nossas instruções e medidas de segurança.`
    },
    {
      titulo: "7. SEGURANÇA",
      texto: `A ${empresa} implementa medidas de segurança, técnicas e organizativas adequadas para proteger os dados pessoais contra a destruição acidental ou ilícita, a perda acidental, a alteração, a difusão ou o acesso não autorizados.`
    }
  ];

  // --- CAMPO LIVRE (CLÁUSULAS EXTRAS) ---
  // Útil para: "Utilizamos Google Analytics" ou "Recolhemos dados biométricos"
  if (dados.clausulasExtras && dados.clausulasExtras.trim() !== "") {
    const num = clausulas.length + 1;
    clausulas.push({
      titulo: `${num}. DISPOSIÇÕES ESPECÍFICAS`,
      texto: dados.clausulasExtras
    });
  }

  clausulas.push({
    titulo: "VIGÊNCIA E ALTERAÇÕES",
    texto: `Esta política entra em vigor em ${dataHoje}. A ${empresa} reserva-se o direito de atualizar este documento a qualquer momento, sendo as alterações publicadas no website.`
  });

  return {
    titulo: "POLÍTICA DE PRIVACIDADE (RGPD)",
    clausulas: clausulas,
    assinantes: {
      parte1: "A Gerência",
      parte2: "" // Não requer assinatura do cliente, é um documento informativo/normativo
    }
  };
};