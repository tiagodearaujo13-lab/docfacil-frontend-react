export const gerarTextoTrabalhoSemTermo = (dados) => {
  const dataHoje = new Date().toLocaleDateString("pt-PT");

  // --- DADOS DO EMPREGADOR ---
  const empregador = dados.empregador || "___________________ (Nome da Empresa)";
  const empregadorNIF = dados.nifEmpregador || "_________";
  const empregadorMorada = dados.moradaEmpregador || "___________________";

  // --- DADOS DO TRABALHADOR ---
  const trabalhador = dados.trabalhador || "___________________ (Nome Completo)";
  const trabalhadorNIF = dados.nifTrabalhador || "_________";
  const trabalhadorNISS = dados.nissTrabalhador || "_________ (NISS Obrigatório)";
  const trabalhadorMorada = dados.moradaTrabalhador || "___________________";
  const iban = dados.ibanTrabalhador || "PT50 _________________________";

  // --- CONDIÇÕES CONTRATUAIS ---
  const funcao = dados.funcao || "___________________";
  const salario = dados.salario || "0,00";
  const dataInicio = dados.dataInicio || "___/___/____";
  const local = dados.moradaImovel || "Sede da empresa";
  
  // Seguro Obrigatório
  const seguradora = dados.seguradora || "___________________";
  const apolice = dados.apolice || "___________________";

  // INÍCIO DAS CLÁUSULAS
  let clausulas = [
    {
      titulo: "CLÁUSULA 1.ª (IDENTIFICAÇÃO DAS PARTES)",
      texto: `ENTRE:\n\n1. EMPREGADOR: ${empregador}, pessoa coletiva n.º ${empregadorNIF}, com sede em ${empregadorMorada}.\n\n2. TRABALHADOR: ${trabalhador}, NIF ${trabalhadorNIF} e Beneficiário da Segurança Social n.º ${trabalhadorNISS}, residente em ${trabalhadorMorada}.\n\nÉ celebrado, de livre vontade e boa fé, o presente CONTRATO DE TRABALHO POR TEMPO INDETERMINADO, que se rege pelo Código do Trabalho (Lei n.º 7/2009) e pelas cláusulas seguintes:`
    },
    {
      titulo: "CLÁUSULA 2.ª (FUNÇÃO E POLIVALÊNCIA)",
      texto: `1. O Trabalhador é admitido para exercer as funções de ${funcao}, inerentes à categoria profissional correspondente.\n2. Ao abrigo do Artigo 118.º do Código do Trabalho (Polivalência Funcional), o Empregador poderá encarregar o Trabalhador de exercer, temporariamente, funções não compreendidas na atividade contratada, desde que afins ou funcionalmente ligadas à mesma e para as quais o trabalhador detenha qualificação adequada.`
    },
    {
      titulo: "CLÁUSULA 3.ª (LOCAL DE TRABALHO E MOBILIDADE)",
      texto: `1. O local de trabalho situa-se em: ${local}.\n2. O Trabalhador aceita expressamente que o local de trabalho possa ser alterado pelo Empregador, dentro da mesma área geográfica ou concelhos limítrofes, ou em regime de mobilidade geográfica mais ampla se tal for indispensável à atividade da empresa, nos termos do Artigo 194.º do Código do Trabalho.`
    },
    {
      titulo: "CLÁUSULA 4.ª (VIGÊNCIA)",
      texto: `O presente contrato produz efeitos a partir de ${dataInicio} e é celebrado por tempo indeterminado, mantendo-se em vigor enquanto não for denunciado ou resolvido nos termos legais.`
    },
    {
      titulo: "CLÁUSULA 5.ª (PERÍODO EXPERIMENTAL)",
      texto: `O período experimental tem a duração de:\na) 90 dias para a generalidade dos trabalhadores;\nb) 180 dias para cargos de complexidade técnica, elevado grau de responsabilidade ou funções de confiança;\nc) 240 dias para cargos de direção ou quadros superiores.\n(Aplica-se ao presente contrato o prazo legal correspondente à função contratada, durante o qual qualquer das partes pode denunciar o vínculo sem aviso prévio ou indemnização).`
    },
    {
      titulo: "CLÁUSULA 6.ª (HORÁRIO DE TRABALHO)",
      texto: `O período normal de trabalho é de 40 horas semanais, sendo o horário diário (início, termo e intervalos de descanso) definido pelo Empregador, podendo ser alterado dentro dos limites legais e de acordo com as necessidades de serviço.`
    },
    {
      titulo: "CLÁUSULA 7.ª (RETRIBUIÇÃO)",
      texto: `1. O Trabalhador auferirá a retribuição base mensal ilíquida de ${salario}€ (Euros), sujeita aos descontos legais em vigor.\n2. O pagamento será efetuado até ao último dia útil do mês a que respeita, por transferência para o IBAN: ${iban}.\n3. Acrescem à retribuição base o Subsídio de Alimentação (se aplicável), Subsídio de Férias e Subsídio de Natal, nos termos da lei.`
    },
    {
      titulo: "CLÁUSULA 8.ª (SEGURO DE ACIDENTES DE TRABALHO)",
      texto: `O Empregador garante a cobertura dos riscos profissionais através de contrato de Seguro de Acidentes de Trabalho celebrado com a Seguradora ${seguradora}, Apólice n.º ${apolice}, conforme obrigatoriedade legal.`
    },
    {
      titulo: "CLÁUSULA 9.ª (FORMAÇÃO PROFISSIONAL)",
      texto: `O Trabalhador tem direito a um mínimo de 40 horas de formação contínua anual. Caso o Empregador não ministre a formação devida, o correspondente crédito de horas vence-se e será liquidado nos termos do Artigo 132.º do Código do Trabalho.`
    },
    {
      titulo: "CLÁUSULA 10.ª (PROTEÇÃO DE DADOS - RGPD)",
      texto: `O Trabalhador presta o seu consentimento expresso para o tratamento dos seus dados pessoais e biométricos pelo Empregador, estritamente para finalidades de execução do contrato, processamento salarial, controlo de assiduidade e cumprimento de obrigações legais perante entidades oficiais.`
    }
  ];

  // --- CLÁUSULAS OPCIONAIS ---

  if (dados.temConfidencialidade) {
    const num = clausulas.length + 1;
    clausulas.push({
      titulo: `CLÁUSULA ${num}.ª (CONFIDENCIALIDADE)`,
      texto: "O Trabalhador obriga-se a guardar rigoroso sigilo profissional sobre segredos comerciais, industriais, listas de clientes ou 'know-how' da empresa, sendo-lhe vedada a sua divulgação ou uso em benefício próprio, mesmo após a cessação do contrato."
    });
  }

  if (dados.temExclusividade) {
    const num = clausulas.length + 1;
    clausulas.push({
      titulo: `CLÁUSULA ${num}.ª (EXCLUSIVIDADE)`,
      texto: "O Trabalhador exercerá as suas funções em regime de exclusividade, não podendo prestar atividade profissional, remunerada ou não, a outra entidade, concorrente ou não, sem autorização prévia e escrita do Empregador."
    });
  }

  if (dados.clausulasExtras && dados.clausulasExtras.trim() !== "") {
    const num = clausulas.length + 1; 
    clausulas.push({
      titulo: `CLÁUSULA ${num}.ª (DISPOSIÇÕES ESPECÍFICAS)`,
      texto: dados.clausulasExtras
    });
  }

  // --- FECHO ---
  clausulas.push({
    titulo: "FORO E LEI APLICÁVEL",
    texto: `Os litígios emergentes deste contrato serão dirimidos pelo Tribunal do Trabalho da Comarca de ${dados.comarca || "Lisboa"}.`
  });

  clausulas.push({
    titulo: "ASSINATURAS",
    texto: `O presente contrato é feito em duplicado, ficando um exemplar na posse de cada parte.\n\nAssinado em ${local}, no dia ${dataHoje}.`
  });

  return {
    titulo: "CONTRATO DE TRABALHO POR TEMPO INDETERMINADO",
    clausulas: clausulas,
    assinantes: {
      parte1: "O Empregador",
      parte2: "O Trabalhador"
    }
  };
};