export const gerarTextoArrendamento = (dados) => {
  const dataHoje = new Date().toLocaleDateString("pt-PT");

  // --- DADOS DO SENHORIO ---
  const senhorio = dados.senhorio || "___________________ (Nome Completo)";
  const senhorioNIF = dados.senhorioNIF || "_________";
  const senhorioCC = dados.senhorioCC || "_________";
  const senhorioMorada = dados.senhorioMorada || "___________________ (Morada Completa)";
  const senhorioEstadoCivil = dados.estadoCivilSenhorio || "Casado(a)/Solteiro(a)";

  // --- DADOS DO INQUILINO ---
  const inquilino = dados.inquilino || "___________________ (Nome Completo)";
  const inquilinoNIF = dados.inquilinoNIF || "_________";
  const inquilinoCC = dados.inquilinoCC || "_________";
  const inquilinoMorada = dados.inquilinoMorada || "___________________ (Morada Completa)";

  // --- DADOS DO IMÓVEL ---
  const moradaImovel = dados.moradaImovel || "___________________";
  const artigoMatricial = dados.artigoMatricial || "Artigo Urbano n.º ______ da freguesia de ______";
  const licenca = dados.licencaUtilizacao || "Licença de Utilização n.º ______, emitida em __/__/____ pela C.M. de ______ (ou Isento por construção anterior a 1951)";
  const certEnergetico = dados.certEnergetico || "Certificado Energético n.º _________ (Válido)";

  // --- CONDIÇÕES ---
  // CORREÇÃO CRÍTICA: Valor não pode ser 0,00 por padrão
  const renda = dados.valorRenda || "[VALOR DA RENDA]";
  const dataInicio = dados.dataInicio || "__/__/____";
  const duracao = dados.prazoMeses || "12";
  
  const isRenovavel = dados.renovavel !== false;
  const textoRenovacao = isRenovavel 
    ? "renovando-se automaticamente por períodos sucessivos de igual duração, salvo se alguma das partes se opuser à renovação nos termos legais."
    : "caducando impreterivelmente no termo do prazo estipulado, sem necessidade de aviso prévio (Contrato Não Renovável).";

  let clausulas = [
    {
      titulo: "CLÁUSULA 1.ª (IDENTIFICAÇÃO DAS PARTES)",
      texto: `ENTRE:\n\n1. PRIMEIRO OUTORGANTE: ${senhorio}, estado civil ${senhorioEstadoCivil}, portador do CC n.º ${senhorioCC} e NIF ${senhorioNIF}, residente em ${senhorioMorada}, adiante designado por SENHORIO.\n\n2. SEGUNDO OUTORGANTE: ${inquilino}, portador do CC n.º ${inquilinoCC} e NIF ${inquilinoNIF}, residente em ${inquilinoMorada}, adiante designado por ARRENDATÁRIO.`
    },
    {
      titulo: "CLÁUSULA 2.ª (OBJETO E SITUAÇÃO JURÍDICA)",
      texto: `1. O Senhorio é dono e legítimo proprietário da fração autónoma designada para habitação, sita em: ${moradaImovel}, inscrita na matriz sob o ${artigoMatricial}.\n2. O locado possui a ${licenca} e o ${certEnergetico}, documentos que as partes reconhecem como essenciais à validade deste contrato.`
    },
    {
      titulo: "CLÁUSULA 3.ª (FINS E PROIBIÇÃO DE HOSPEDAGEM)",
      texto: `1. O local arrendado destina-se exclusivamente a habitação própria e permanente do Arrendatário e do seu agregado familiar, não podendo ser-lhe dado outro destino.\n2. É expressamente proibida a sublocação total ou parcial, bem como a hospedagem de terceiros a título oneroso (ex: Alojamento Local, Airbnb) ou a cessão da posição contratual, sem autorização prévia e por escrito do Senhorio.`
    },
    {
      titulo: "CLÁUSULA 4.ª (PRAZO E RENOVAÇÃO)",
      texto: `O arrendamento é celebrado pelo prazo certo de ${duracao} meses, com início em ${dataInicio}, ${textoRenovacao}`
    },
    {
      titulo: "CLÁUSULA 5.ª (RENDA E PAGAMENTO)",
      // CORREÇÃO: Placeholder claro para evitar nulidade
      texto: `1. A renda mensal é de ${renda}€ (Euros).\n2. A renda vence-se no primeiro dia útil do mês anterior àquele a que respeita e deve ser paga até ao dia 8 desse mês.\n3. O pagamento será efetuado por transferência bancária para o IBAN indicado pelo Senhorio, servindo o comprovativo bancário como recibo provisório até à emissão do recibo eletrónico nas Finanças.`
    }
  ];

  // --- CAUÇÃO OBRIGATÓRIA (Nova Lei) ---
  // CORREÇÃO: Caução é obrigatória por lei, mesmo que seja 0
  const valorCaucao = dados.valorCaucao || dados.valorRenda || "1 renda";
  clausulas.push({
    titulo: "CLÁUSULA 6.ª (CAUÇÃO)",
    texto: `Nos termos do artigo 9.º do DL 95/2019, o Arrendatário entrega ao Senhorio a quantia de ${valorCaucao}€ a título de caução, que será depositada em conta bancária aberta para o efeito. Esta caução serve de garantia do cumprimento das obrigações decorrentes do contrato, sendo devolvida no prazo máximo de 30 dias após a restituição do imóvel, deduzidos os valores em dívida ou os danos causados.`
  });

  clausulas.push({
    titulo: "CLÁUSULA 7.ª (ATUALIZAÇÃO ANUAL)",
    texto: `A renda será objeto de atualização anual sucessiva, de acordo com o coeficiente de atualização aplicável ao arrendamento urbano publicado pelo INE em Diário da República, a vigorar a partir do mês em que for legalmente exigível.`
  });

  clausulas.push({
    titulo: "CLÁUSULA 8.ª (DESPESAS E OBRAS)",
    texto: `1. São da exclusiva responsabilidade do Arrendatário todas as despesas decorrentes da utilização do locado (água, eletricidade, gás, internet, telecomunicações).\n2. O Arrendatário reconhece receber o imóvel em bom estado de conservação, obrigando-se a mantê-lo assim e não podendo realizar quaisquer obras sem autorização escrita do Senhorio.\n3. As obras de conservação ordinária são da responsabilidade do Arrendatário, cabendo ao Senhorio as obras de conservação extraordinária.`
  });

  // --- DIREITO DE PREFERÊNCIA OBRIGATÓRIO ---
  // CORREÇÃO: Esta cláusula é obrigatória por lei
  clausulas.push({
    titulo: "CLÁUSULA 9.ª (DIREITO DE PREFERÊNCIA)",
    texto: `Nos termos do artigo 1098.º-A do Código Civil, o Arrendatário tem direito de preferência em caso de venda do imóvel, devendo o Senhorio comunicar por escrito a intenção de vender, o preço e as condições, concedendo ao Arrendatário prazo de 30 dias para exercer o seu direito.`
  });

  clausulas.push({
    titulo: "CLÁUSULA 10.ª (RESOLUÇÃO E INCUMPRIMENTO)",
    texto: `O Senhorio pode resolver o contrato se o Arrendatário se constituir em mora superior a 3 meses no pagamento da renda, encargos ou despesas, ou se, existindo mora superior a 8 dias, tal suceder por mais de 4 vezes (seguidas ou interpoladas) num período de 12 meses, nos termos do art. 1083.º do Código Civil.`
  });

  // --- FIADOR (Lógica Condicional) ---
  if (dados.temFiador) {
    const nomeFiador = dados.nomeFiador || "___________________";
    const nifFiador = dados.fiadorNIF || "_________";
    const ccFiador = dados.fiadorCC || "_________";
    const moradaFiador = dados.fiadorMorada || "___________________";
    
    clausulas.splice(2, 0, {
      titulo: "CLÁUSULA 1.ª-A (FIADOR)",
      texto: `Intervém no presente contrato, na qualidade de FIADOR, ${nomeFiador}, CC n.º ${ccFiador}, NIF ${nifFiador}, residente em ${moradaFiador}, que se constitui principal pagador e assume, solidariamente com o Arrendatário, todas as obrigações emergentes deste contrato, renunciando expressamente ao benefício da excussão prévia.`
    });
  }

  // --- CLAUSULAS EXTRAS ---
  if (dados.clausulasExtras && dados.clausulasExtras.trim() !== "") {
    clausulas.push({
      titulo: `CLÁUSULA ${clausulas.length + 1}.ª (DISPOSIÇÕES ESPECÍFICAS)`,
      texto: dados.clausulasExtras
    });
  }

  // --- FECHO ---
  clausulas.push({
    titulo: "FORO E COMUNICAÇÕES",
    texto: `Para a resolução de qualquer litígio, as partes estipulam como competente o foro da situação do imóvel (${dados.comarca || "Comarca do Imóvel"}). As comunicações entre as partes devem ser realizadas por carta registada com aviso de receção para as moradas indicadas na Cláusula 1.ª. O presente contrato rege-se pelo Novo Regime do Arrendamento Urbano (NRAU).`
  });

  clausulas.push({
    titulo: "ASSINATURAS",
    texto: `Feito em triplicado (Senhorio, Arrendatário e Autoridade Tributária), em ${dataHoje}.`
  });

  return {
    titulo: "CONTRATO DE ARRENDAMENTO URBANO PARA FIM HABITACIONAL",
    clausulas: clausulas,
    assinantes: {
      parte1: "O Senhorio",
      parte2: "O Arrendatário",
      extra: dados.temFiador ? "O Fiador" : null
    }
  };
};