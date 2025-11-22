export const gerarTextoTrabalhoSemTermo = (dados) => {
  const dataHoje = new Date().toLocaleDateString("pt-PT");

  // --- IDENTIFICAÇÃO ---
  const empregador = dados.empregador || "___________________";
  const empregadorNIF = dados.nifEmpregador || "_________";
  const empregadorMorada = dados.moradaEmpregador || "___________________";

  const trabalhador = dados.trabalhador || "___________________";
  const trabalhadorNIF = dados.nifTrabalhador || "_________";
  const trabalhadorNISS = dados.nissTrabalhador || "_________";
  const trabalhadorMorada = dados.moradaTrabalhador || "___________________";
  
  // NOVO CAMPO
  const iban = dados.ibanTrabalhador || "PT50 _________________________";

  const funcao = dados.funcao || "___________________";
  const salario = dados.salario || "0,00";
  const dataInicio = dados.dataInicio || "___/___/____";
  const local = dados.moradaImovel || "Sede da empresa"; 

  let clausulas = [
    {
      titulo: "CLÁUSULA 1.ª (IDENTIFICAÇÃO E REGIME)",
      texto: `ENTRE:\n\n1. ${empregador}, pessoa coletiva n.º ${empregadorNIF}, com sede em ${empregadorMorada}, doravante designado por EMPREGADOR.\n\n2. ${trabalhador}, contribuinte fiscal n.º ${trabalhadorNIF} e beneficiário da Segurança Social n.º ${trabalhadorNISS}, residente em ${trabalhadorMorada}, doravante designado por TRABALHADOR.\n\nÉ celebrado, de boa fé, o presente CONTRATO DE TRABALHO POR TEMPO INDETERMINADO, que se rege pelo Código do Trabalho (Lei n.º 7/2009) e pelas cláusulas seguintes:`
    },
    {
      titulo: "CLÁUSULA 2.ª (FUNÇÃO E POLIVALÊNCIA)",
      texto: `1. O Trabalhador é admitido para exercer as funções de ${funcao}.\n2. Nos termos do Artigo 118.º do Código do Trabalho, o Empregador poderá encarregar o Trabalhador de exercer, temporariamente, funções não compreendidas na atividade contratada, desde que afins ou funcionalmente ligadas à mesma.`
    },
    {
      titulo: "CLÁUSULA 3.ª (LOCAL DE TRABALHO E MOBILIDADE)",
      texto: `1. O local de trabalho situa-se em: ${local}.\n2. O Trabalhador aceita expressamente que o local de trabalho possa ser alterado pelo Empregador, dentro da mesma área geográfica ou concelhos limítrofes, nos termos do Artigo 194.º do Código do Trabalho.`
    },
    {
      titulo: "CLÁUSULA 4.ª (VIGÊNCIA)",
      texto: `O presente contrato produz efeitos a partir de ${dataInicio} e é celebrado por tempo indeterminado, mantendo-se em vigor enquanto não for denunciado ou resolvido nos termos legais.`
    },
    {
      titulo: "CLÁUSULA 5.ª (PERÍODO EXPERIMENTAL)",
      texto: `O período experimental tem a duração de 90 dias (ou prazo superior se aplicável à função, conforme Artigo 112.º CT). Durante este período, qualquer das partes pode resolver o contrato sem aviso prévio.`
    },
    {
      titulo: "CLÁUSULA 6.ª (HORÁRIO DE TRABALHO)",
      texto: `O período normal de trabalho é de 40 horas semanais, distribuídas de segunda a sexta-feira, sendo o horário diário definido pelo Empregador dentro dos limites legais.`
    },
    {
      titulo: "CLÁUSULA 7.ª (RETRIBUIÇÃO E PAGAMENTO)",
      texto: `1. O Trabalhador auferirá a retribuição base mensal ilíquida de ${salario}€ (Euros).\n2. O pagamento será efetuado até ao último dia útil do mês a que respeita, através de transferência bancária para o IBAN: ${iban}.\n3. O Trabalhador obriga-se a manter a informação bancária atualizada junto dos serviços administrativos do Empregador.`
    },
    {
      titulo: "CLÁUSULA 8.ª (FÉRIAS E SUBSÍDIOS)",
      texto: `O Trabalhador tem direito a um período anual de férias remuneradas de 22 dias úteis, bem como ao subsídio de férias e de Natal, nos termos da lei.`
    },
    {
      titulo: "CLÁUSULA 9.ª (DEVERES ACESSÓRIOS)",
      texto: `O Trabalhador obriga-se a comparecer ao serviço com assiduidade e pontualidade, e a zelar pela conservação e boa utilização dos bens e equipamentos que lhe forem confiados.`
    }
  ];

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

  if (dados.clausulasExtras && dados.clausulasExtras.trim() !== "") {
    const numClausula = clausulas.length + 1; 
    clausulas.push({
      titulo: `CLÁUSULA ${numClausula}.ª (DISPOSIÇÕES ESPECÍFICAS)`,
      texto: dados.clausulasExtras
    });
  }

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