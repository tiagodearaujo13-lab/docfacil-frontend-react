export const gerarTextoTrabalhoSemTermo = (dados) => {
  const dataHoje = new Date().toLocaleDateString("pt-PT");

  // --- IDENTIFICAÇÃO COMPLETA ---
  const empregador = dados.empregador || "___________________ (Nome da Empresa)";
  const empregadorNIF = dados.nifEmpregador || "_________";
  const empregadorMorada = dados.moradaEmpregador || "___________________";

  const trabalhador = dados.trabalhador || "___________________ (Nome Completo)";
  const trabalhadorNIF = dados.nifTrabalhador || "_________";
  const trabalhadorNISS = dados.nissTrabalhador || "_________"; // Obrigatório
  const trabalhadorMorada = dados.moradaTrabalhador || "___________________";

  // --- CONDIÇÕES CONTRATUAIS ---
  const funcao = dados.funcao || "___________________";
  const salario = dados.salario || "0,00";
  const dataInicio = dados.dataInicio || "___/___/____";
  const local = dados.moradaImovel || "Sede da empresa"; // Local de Trabalho

  let clausulas = [
    {
      titulo: "CLÁUSULA 1.ª (IDENTIFICAÇÃO E REGIME)",
      texto: `ENTRE:\n\n1. ${empregador}, pessoa coletiva n.º ${empregadorNIF}, com sede em ${empregadorMorada}, doravante designado por EMPREGADOR.\n\n2. ${trabalhador}, contribuinte fiscal n.º ${trabalhadorNIF} e beneficiário da Segurança Social n.º ${trabalhadorNISS}, residente em ${trabalhadorMorada}, doravante designado por TRABALHADOR.\n\nÉ celebrado, de boa fé, o presente CONTRATO DE TRABALHO POR TEMPO INDETERMINADO, que se rege pelo Código do Trabalho (Lei n.º 7/2009) e pelas cláusulas seguintes:`
    },
    {
      titulo: "CLÁUSULA 2.ª (FUNÇÃO E POLIVALÊNCIA)",
      texto: `1. O Trabalhador é admitido para exercer as funções de ${funcao}.\n2. Nos termos do Artigo 118.º do Código do Trabalho, o Empregador poderá encarregar o Trabalhador de exercer, temporariamente, funções não compreendidas na atividade contratada, desde que afins ou funcionalmente ligadas à mesma, para as quais o trabalhador tenha qualificação adequada e que não impliquem desvalorização profissional.`
    },
    {
      titulo: "CLÁUSULA 3.ª (LOCAL DE TRABALHO E MOBILIDADE)",
      texto: `1. O local de trabalho situa-se em: ${local}.\n2. O Trabalhador aceita expressamente que o local de trabalho possa ser alterado pelo Empregador, a título temporário ou definitivo, dentro da mesma área geográfica ou concelhos limítrofes, ou noutros casos previstos no Artigo 194.º do Código do Trabalho, sempre que a mudança não cause prejuízo sério ao Trabalhador.`
    },
    {
      titulo: "CLÁUSULA 4.ª (VIGÊNCIA)",
      texto: `O presente contrato produz efeitos a partir de ${dataInicio} e é celebrado por tempo indeterminado, mantendo-se em vigor enquanto não for denunciado ou resolvido nos termos legais.`
    },
    {
      titulo: "CLÁUSULA 5.ª (PERÍODO EXPERIMENTAL)",
      texto: `O período experimental tem a duração de 90 dias. (Nota Jurídica: Para cargos de elevada responsabilidade ou confiança, este prazo é de 180 dias; para cargos de direção superior, 240 dias). Durante este período, qualquer das partes pode resolver o contrato sem aviso prévio e sem justa causa.`
    },
    {
      titulo: "CLÁUSULA 6.ª (HORÁRIO DE TRABALHO)",
      texto: `O período normal de trabalho é de 40 horas semanais, distribuídas de segunda a sexta-feira, sendo o horário diário definido pelo Empregador dentro dos limites legais, com direito aos respetivos intervalos de descanso.`
    },
    {
      titulo: "CLÁUSULA 7.ª (RETRIBUIÇÃO)",
      texto: `1. O Trabalhador auferirá a retribuição base mensal ilíquida de ${salario}€ (Euros), sujeita aos descontos legais obrigatórios.\n2. Acresce o Subsídio de Refeição diário, pago pelos dias de trabalho efetivo, de acordo com a tabela em vigor na empresa.`
    },
    {
      titulo: "CLÁUSULA 8.ª (FÉRIAS E SUBSÍDIOS)",
      texto: `1. O Trabalhador tem direito a um período anual de férias remuneradas de 22 dias úteis.\n2. O Trabalhador tem direito a Subsídio de Férias e Subsídio de Natal, pagos nos termos da lei geral aplicável.`
    },
    {
      titulo: "CLÁUSULA 9.ª (DEVERES ACESSÓRIOS)",
      texto: `O Trabalhador obriga-se a:\na) Comparecer ao serviço com assiduidade e pontualidade;\nb) Tratar com correção os clientes e fornecedores do Empregador;\nc) Zelar pela conservação e boa utilização dos bens e equipamentos que lhe forem confiados.`
    }
  ];

  // --- CHECKBOXES (AUTOMÁTICAS) ---
  
  if (dados.temConfidencialidade) {
    clausulas.push({
      titulo: "CLÁUSULA 10.ª (CONFIDENCIALIDADE E RGPD)",
      texto: "1. O Trabalhador obriga-se a guardar rigoroso sigilo profissional sobre segredos comerciais ou industriais da empresa.\n2. O Trabalhador autoriza o tratamento dos seus dados pessoais para fins de execução do contrato e gestão administrativa, nos termos do RGPD."
    });
  }

  if (dados.temExclusividade) {
    clausulas.push({
      titulo: "CLÁUSULA 11.ª (EXCLUSIVIDADE)",
      texto: "O Trabalhador prestará a sua atividade em regime de exclusividade, não podendo exercer qualquer outra atividade remunerada concorrente sem prévia autorização escrita do Empregador."
    });
  }

  // --- CAMPO LIVRE (TEXTO EXTRA) ---
  // Se a empresa escreveu algo no campo "Cláusulas Extras" do Editor
  if (dados.clausulasExtras && dados.clausulasExtras.trim() !== "") {
    const numClausula = clausulas.length + 1; 
    clausulas.push({
      titulo: `CLÁUSULA ${numClausula}.ª (DISPOSIÇÕES ESPECÍFICAS)`,
      texto: dados.clausulasExtras
    });
  }

  // --- FECHO ---
  clausulas.push({
    titulo: "CLÁUSULA FINAL",
    texto: `Para todas as questões emergentes deste contrato, é competente o Tribunal do Trabalho da comarca de ${dados.comarca || "Lisboa"}.`
  });

  clausulas.push({
    titulo: "ASSINATURAS",
    texto: `O presente contrato é feito em duplicado, ficando um exemplar para cada parte.\n\nAssinado em ${local}, no dia ${dataHoje}.`
  });

  return {
    titulo: "CONTRATO DE TRABALHO POR TEMPO INDETERMINADO",
    clausulas: clausulas,
    assinantes: {
      parte1: "A Gerência",
      parte2: "O Trabalhador"
    }
  };
};