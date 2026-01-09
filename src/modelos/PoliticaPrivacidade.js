export const gerarTextoRGPD = (dados) => {
  const dataHoje = new Date().toLocaleDateString("pt-PT");

  // --- IDENTIFICAÇÃO ---
  const empresa = dados.empresa || "___________________ (Nome da Empresa/Responsável)";
  const nifEmpresa = dados.nifEmpregador || "_________"; // Reutilizamos campo NIF
  const morada = dados.moradaImovel || "Sede da Empresa";
  const site = dados.site || "www.oseusite.pt";
  const emailPrivacidade = dados.emailDPO || "privacidade@oseusite.pt";

  let clausulas = [
    {
      titulo: "1. OBJETIVO E ÂMBITO",
      texto: `A presente Política de Privacidade visa informar os clientes e utilizadores do site ${site} sobre as regras de tratamento de dados pessoais recolhidos e tratados pela ${empresa} (NIPC ${nifEmpresa}), com sede em ${morada}, em estrito cumprimento do Regulamento Geral sobre a Proteção de Dados (RGPD - Regulamento UE 2016/679) e da Lei n.º 58/2019 (Lei de Execução Nacional).`
    },
    {
      titulo: "2. RESPONSÁVEL PELO TRATAMENTO",
      texto: `A entidade Responsável pelo Tratamento dos dados é a ${empresa}, que determina as finalidades e os meios de tratamento dos seus dados pessoais.\nPara assuntos relacionados com a proteção de dados, deverá contactar-nos através do email: ${emailPrivacidade}.`
    },
    {
      titulo: "3. CATEGORIAS DE DADOS E FINALIDADES",
      texto: `Recolhemos apenas os dados estritamente necessários para a prestação do serviço:\n\na) Gestão de Clientes e Faturação: Nome, NIF, Morada e Email (Base legal: Execução de contrato e Obrigação Legal);\nb) Marketing e Newsletters: Email e Nome (Base legal: Consentimento expresso, revogável a qualquer momento);\nc) Apoio ao Cliente: Dados fornecidos nos formulários de contacto (Base legal: Interesse Legítimo na resposta).`
    },
    {
      titulo: "4. PRAZOS DE CONSERVAÇÃO",
      texto: `Os dados serão conservados apenas pelo período necessário:\n- Dados Fiscais/Contabilísticos: 10 anos (conforme exigido pelo Código do IVA e IRC);\n- Dados de Marketing: Até que o titular cancele a subscrição ("unsubscribe");\n- Outros Dados: Enquanto se mantiver a relação contratual ou o interesse legítimo, sendo apagados de forma segura após esse período.`
    },
    {
      titulo: "5. PARTILHA DE DADOS E SUBCONTRATANTES",
      texto: `Não vendemos os seus dados a terceiros. A partilha ocorre apenas com:\na) Autoridade Tributária e outras entidades oficiais, por imposição legal;\nb) Prestadores de serviços essenciais (Subcontratantes), como empresas de alojamento web, processamento de pagamentos ou software de faturação, que atuam sob nossas instruções e garantias de segurança.`
    },
    {
      titulo: "6. TRANSFERÊNCIAS INTERNACIONAIS",
      texto: `O tratamento de dados ocorre preferencialmente no Espaço Económico Europeu (EEE). Caso exista transferência para países fora do EEE (ex: uso de ferramentas Google ou servidores nos EUA), asseguramos que a mesma ocorre ao abrigo de uma Decisão de Adequação da Comissão Europeia ou mediante Cláusulas Contratuais-Tipo que garantam a segurança dos dados.`
    },
    {
      titulo: "7. DIREITOS DOS TITULARES",
      texto: `O titular tem o direito de solicitar, a qualquer momento:\n- O acesso, retificação ou apagamento dos seus dados;\n- A limitação ou oposição ao tratamento;\n- A portabilidade dos dados.\n\nPara exercer estes direitos, envie um email para ${emailPrivacidade}. Tem ainda o direito de apresentar reclamação à autoridade de controlo nacional: CNPD – Comissão Nacional de Proteção de Dados (www.cnpd.pt).`
    },
    {
      titulo: "8. COOKIES E RASTREIO",
      texto: `Utilizamos cookies essenciais para garantir o funcionamento técnico do site. Cookies de análise ou marketing (ex: Google Analytics) apenas serão ativados mediante a sua aceitação expressa no nosso banner de cookies. Pode configurar o seu navegador para recusar cookies, embora isso possa afetar a navegação.`
    },
    {
      titulo: "9. SEGURANÇA",
      texto: `Implementamos medidas técnicas e organizativas (físicas e lógicas) adequadas para proteger os dados contra a perda, destruição, alteração ou acesso não autorizado, incluindo o uso de protocolos seguros (HTTPS) e encriptação.`
    }
  ];

  // --- CLÁUSULAS EXTRAS ---
  if (dados.clausulasExtras && dados.clausulasExtras.trim() !== "") {
    const num = clausulas.length + 1;
    clausulas.push({
      titulo: `${num}. DISPOSIÇÕES ESPECÍFICAS`,
      texto: dados.clausulasExtras
    });
  }

  clausulas.push({
    titulo: "VIGÊNCIA E ALTERAÇÕES",
    texto: `Esta Política de Privacidade entra em vigor em ${dataHoje}. A ${empresa} reserva-se o direito de a atualizar, publicando a nova versão neste local.`
  });

  return {
    titulo: "POLÍTICA DE PRIVACIDADE E TRATAMENTO DE DADOS",
    clausulas: clausulas,
    assinantes: {
      parte1: "A Gerência",
      parte2: null // Políticas de privacidade não são assinadas pelo cliente, são aceites/consultadas
    }
  };
};