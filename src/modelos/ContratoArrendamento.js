export const gerarTextoArrendamento = (dados) => {
  const dataHoje = new Date().toLocaleDateString("pt-PT");

  // --- DADOS DO SENHORIO ---
  const senhorio = dados.senhorio || "___________________ (Nome Completo)";
  const senhorioNIF = dados.senhorioNIF || "_________";
  const senhorioCC = dados.senhorioCC || "_________";
  const senhorioMorada = dados.senhorioMorada || "___________________";

  // --- DADOS DO INQUILINO ---
  const inquilino = dados.inquilino || "___________________ (Nome Completo)";
  const inquilinoNIF = dados.inquilinoNIF || "_________";
  const inquilinoCC = dados.inquilinoCC || "_________";
  const inquilinoMorada = dados.inquilinoMorada || "___________________";

  // --- DADOS DO IMÓVEL ---
  const moradaImovel = dados.moradaImovel || "___________________";
  // Nota: Num contrato real deve constar a Licença de Utilização e Artigo Matricial.
  // Como não temos esses campos no form simples, deixamos espaço para preencher ou genérico.
  
  const renda = dados.valorRenda || "0,00";
  const dataInicio = dados.dataInicio || "___/___/____";
  const duracao = dados.prazoMeses || "12"; // Padrão 1 ano se vazio

  let clausulas = [
    {
      titulo: "CLÁUSULA 1.ª (IDENTIFICAÇÃO DAS PARTES)",
      texto: `ENTRE:\n\n1. PRIMEIRO OUTORGANTE: ${senhorio}, portador do Cartão de Cidadão n.º ${senhorioCC} e NIF ${senhorioNIF}, residente em ${senhorioMorada}, na qualidade de SENHORIO.\n\n2. SEGUNDO OUTORGANTE: ${inquilino}, portador do Cartão de Cidadão n.º ${inquilinoCC} e NIF ${inquilinoNIF}, residente em ${inquilinoMorada}, na qualidade de ARRENDATÁRIO (INQUILINO).`
    },
    {
      titulo: "CLÁUSULA 2.ª (OBJETO)",
      texto: `1. O Senhorio é dono e legítimo proprietário da fração autónoma designada para habitação, sita em: ${moradaImovel}.\n2. Pelo presente contrato, o Senhorio dá de arrendamento ao Inquilino a referida fração, que a aceita no estado de conservação em que se encontra.`
    },
    {
      titulo: "CLÁUSULA 3.ª (DESTINO E PROIBIÇÃO DE AL)",
      texto: `1. O local arrendado destina-se exclusivamente a habitação própria e permanente do Inquilino e do seu agregado familiar.\n2. É expressamente proibido ao Inquilino subarrendar, hospedar terceiros a título oneroso (Alojamento Local / Airbnb) ou ceder a sua posição contratual sem autorização prévia por escrito do Senhorio.`
    },
    {
      titulo: "CLÁUSULA 4.ª (DURAÇÃO E RENOVAÇÃO)",
      texto: `1. O arrendamento é celebrado pelo prazo certo de ${duracao} meses, com início em ${dataInicio}.\n2. O contrato renova-se automaticamente por períodos sucessivos de igual duração, salvo se alguma das partes se opuser à renovação nos prazos legais estipulados no Novo Regime do Arrendamento Urbano (NRAU).`
    },
    {
      titulo: "CLÁUSULA 5.ª (RENDA)",
      texto: `1. A renda mensal é de ${renda}€ (Euros).\n2. A renda vence-se no primeiro dia útil do mês anterior àquele a que respeita e deve ser paga até ao dia 8 desse mês.\n3. O pagamento será efetuado por transferência bancária para o IBAN a indicar pelo Senhorio.`
    },
    {
      titulo: "CLÁUSULA 6.ª (CAUÇÃO E GARANTIA)",
      texto: `1. Nesta data, o Inquilino entrega ao Senhorio, a título de caução, o valor equivalente a uma renda.\n2. A caução visa garantir o cumprimento das obrigações contratuais e a reparação de eventuais danos no imóvel.\n3. A caução NÃO poderá ser utilizada pelo Inquilino para pagamento do último mês de renda.`
    },
    {
      titulo: "CLÁUSULA 7.ª (ATUALIZAÇÃO DA RENDA)",
      texto: `A renda poderá ser atualizada anualmente, de acordo com o coeficiente de atualização publicado pelo INE (Instituto Nacional de Estatística) em Diário da República, mediante comunicação do Senhorio com a antecedência mínima legal de 30 dias.`
    },
    {
      titulo: "CLÁUSULA 8.ª (DESPESAS E CONDOMÍNIO)",
      texto: `1. Correm por conta do Inquilino todas as despesas correntes de utilização (água, luz, gás, telecomunicações).\n2. As despesas ordinárias de condomínio são da responsabilidade do Senhorio, salvo acordo em contrário nas Disposições Específicas.`
    },
    {
      titulo: "CLÁUSULA 9.ª (OBRAS E CONSERVAÇÃO)",
      texto: `1. O Inquilino não pode realizar obras sem autorização escrita do Senhorio.\n2. O Inquilino obriga-se a manter o imóvel em bom estado e a devolvê-lo nas mesmas condições, ressalvando o desgaste normal decorrente de uma prudente utilização.`
    },
    {
      titulo: "CLÁUSULA 10.ª (VISITAS)",
      texto: `Nos três meses anteriores à desocupação do locado (seja por denúncia ou caducidade), o Inquilino obriga-se a facultar a visita do imóvel a interessados, em horário a acordar, nos termos do Artigo 1081.º do Código Civil.`
    },
    {
      titulo: "CLÁUSULA 11.ª (RESOLUÇÃO E DESPEJO)",
      texto: `O incumprimento da obrigação de pagamento da renda por período superior a 3 meses, ou o atraso superior a 8 dias no pagamento por mais de 4 vezes seguidas ou interpoladas num período de 12 meses, confere ao Senhorio o direito à resolução do contrato e recurso ao Balcão Nacional do Arrendamento (BNA).`
    }
  ];

  // --- CLÁUSULAS EXTRAS ---

  // Fiador (Se existir)
  if (dados.temFiador) {
    const nomeFiador = dados.nomeFiador || "___________________";
    const nifFiador = dados.fiadorNIF || "_________";
    
    clausulas.splice(1, 0, { // Insere na posição 1 (logo após as Partes)
      titulo: "CLÁUSULA 1.ª-A (FIANÇA)",
      texto: `Intervém no presente contrato, na qualidade de FIADOR, ${nomeFiador}, contribuinte n.º ${nifFiador}, que se constitui principal pagador e assume, solidariamente com o Inquilino, todas as obrigações emergentes deste contrato, renunciando expressamente ao benefício da excussão prévia.`
    });
  }

  // Campo Livre da Empresa (Regras da casa, animais, etc.)
  if (dados.clausulasExtras && dados.clausulasExtras.trim() !== "") {
    const num = clausulas.length + 1;
    clausulas.push({
      titulo: `CLÁUSULA ${num}.ª (DISPOSIÇÕES ESPECÍFICAS)`,
      texto: dados.clausulasExtras
    });
  }

  // Fecho e Foro
  clausulas.push({
    titulo: "CLÁUSULA FINAL (LEI E FORO)",
    texto: `Em tudo o que for omisso, aplica-se o NRAU e o Código Civil. Para dirimir litígios, é competente o foro da situação do imóvel (${dados.comarca || "Local do Imóvel"}).`
  });

  clausulas.push({
    titulo: "ASSINATURAS",
    texto: `O contrato é feito em triplicado (um exemplar para as Finanças).\n\nAssinado em ${dataHoje}.`
  });

  return {
    titulo: "CONTRATO DE ARRENDAMENTO HABITACIONAL",
    clausulas: clausulas,
    assinantes: {
      parte1: "O Senhorio",
      parte2: "O Inquilino"
    }
  };
};