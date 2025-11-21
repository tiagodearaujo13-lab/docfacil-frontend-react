export const gerarTextoArrendamento = (dados) => {
  const dataHoje = new Date().toLocaleDateString("pt-PT");

  // Dados do Senhorio
  const senhorio = dados.senhorio || "___________________";
  const senhorioNIF = dados.senhorioNIF || "_________";
  const senhorioCC = dados.senhorioCC || "_________";
  const senhorioMorada = dados.senhorioMorada || "___________________";

  // Dados do Inquilino
  const inquilino = dados.inquilino || "___________________";
  const inquilinoNIF = dados.inquilinoNIF || "_________";
  const inquilinoCC = dados.inquilinoCC || "_________";
  const inquilinoMorada = dados.inquilinoMorada || "___________________";

  // Dados do Imóvel e Contrato
  const moradaImovel = dados.moradaImovel || "___________________";
  const renda = dados.valorRenda || "_____";
  const dataInicio = dados.dataInicio || "_____";
  const duracao = dados.prazoMeses || "12";

  let clausulas = [
    {
      titulo: "PRIMEIRA (IDENTIFICAÇÃO DAS PARTES)",
      texto: `ENTRE:\n\n1. PRIMEIRO OUTORGANTE (SENHORIO): ${senhorio}, titular do Cartão de Cidadão n.º ${senhorioCC} e NIF ${senhorioNIF}, residente em ${senhorioMorada}.\n\n2. SEGUNDO OUTORGANTE (INQUILINO): ${inquilino}, titular do Cartão de Cidadão n.º ${inquilinoCC} e NIF ${inquilinoNIF}, residente em ${inquilinoMorada}.`
    },
    {
      titulo: "SEGUNDA (OBJETO)",
      texto: `O Primeiro Outorgante é dono e legítimo proprietário da fração autónoma designada para habitação, sita em: ${moradaImovel}. Pelo presente contrato, dá-a de arrendamento ao Segundo Outorgante, que a aceita nos termos das cláusulas seguintes.`
    },
    {
      titulo: "TERCEIRA (FIM A QUE SE DESTINA)",
      texto: `O local arrendado destina-se exclusivamente a habitação própria e permanente do Inquilino e do seu agregado familiar, não lhe podendo ser dado outro uso (como comércio, indústria ou profissão liberal), nem podendo o Inquilino sublocar ou ceder a sua posição contratual, no todo ou em parte, sem autorização prévia e por escrito do Senhorio.`
    },
    {
      titulo: "QUARTA (DURAÇÃO E RENOVAÇÃO)",
      texto: `1. O contrato é celebrado pelo prazo certo de ${duracao} meses, tendo o seu início em ${dataInicio}.\n2. O contrato renova-se automaticamente por períodos sucessivos de igual duração, salvo se alguma das partes se opuser à renovação, cumprindo os prazos de pré-aviso estipulados no Novo Regime do Arrendamento Urbano (NRAU).`
    },
    {
      titulo: "QUINTA (RENDA)",
      texto: `A renda mensal convencionada é de ${renda}€ (Euros), a pagar pelo Inquilino ao Senhorio até ao dia 8 do mês anterior àquele a que respeitar, através de transferência bancária para o IBAN a indicar pelo Senhorio.`
    },
    {
      titulo: "SEXTA (ATUALIZAÇÃO DA RENDA)",
      texto: `A renda poderá ser atualizada anualmente, de acordo com o coeficiente de atualização para o arrendamento habitacional publicado pelo Instituto Nacional de Estatística (INE) em Diário da República, devendo o Senhorio comunicar o novo valor ao Inquilino com a antecedência mínima de 30 dias.`
    },
    {
      titulo: "SÉTIMA (DESPESAS E ENCARGOS)",
      texto: `Todas as despesas decorrentes da utilização do locado, nomeadamente consumos de água, eletricidade, gás, telecomunicações e taxas de saneamento, são da exclusiva responsabilidade do Inquilino, que deverá contratar os respetivos fornecimentos em seu nome.`
    },
    {
      titulo: "OITAVA (CONDOMÍNIO)",
      texto: `As despesas ordinárias de condomínio ficam a cargo do Senhorio, salvo se acordado o contrário. As despesas extraordinárias de conservação do edifício são sempre da responsabilidade do Senhorio.`
    },
    {
      titulo: "NONA (CONSERVAÇÃO DO IMÓVEL)",
      texto: `O Inquilino declara receber o imóvel em bom estado de conservação e limpeza, com todas as instalações (elétrica, água e gás) em funcionamento, obrigando-se a mantê-lo e a restituí-lo no mesmo estado, ressalvadas as deteriorações inerentes a uma prudente utilização.`
    },
    {
      titulo: "DÉCIMA (OBRAS E BENFEITORIAS)",
      texto: `1. O Inquilino não pode realizar quaisquer obras ou benfeitorias no local arrendado sem prévia autorização por escrito do Senhorio.\n2. Todas as benfeitorias autorizadas e realizadas ficarão a pertencer ao imóvel, não tendo o Inquilino direito a qualquer indemnização ou retenção por elas.`
    },
    {
      titulo: "DÉCIMA PRIMEIRA (VISITAS)",
      texto: `O Senhorio reserva-se o direito de visitar o local arrendado para verificar o seu estado de conservação, mediante aviso prévio de 48 horas e em horário a acordar com o Inquilino.`
    },
    {
      titulo: "DÉCIMA SEGUNDA (RESOLUÇÃO PELO SENHORIO)",
      texto: `O Senhorio pode resolver o contrato em caso de incumprimento grave por parte do Inquilino, nomeadamente: falta de pagamento da renda por período superior a 3 meses; realização de obras não autorizadas; ou uso do imóvel contrário aos bons costumes ou sossego da vizinhança.`
    },
    {
      titulo: "DÉCIMA TERCEIRA (DENÚNCIA PELO INQUILINO)",
      texto: `Após seis meses de duração efetiva do contrato, o Inquilino pode denunciá-lo a todo o tempo, mediante comunicação ao Senhorio com a antecedência mínima prevista na lei (geralmente 120 dias para contratos superiores a 1 ano).`
    },
    {
      titulo: "DÉCIMA QUARTA (ENTREGA DAS CHAVES)",
      texto: `Findo o contrato, o Inquilino obriga-se a entregar as chaves do imóvel ao Senhorio na data da cessação, livre de pessoas e bens e em estado de limpeza e conservação idêntico ao inicial.`
    },
    {
      titulo: "DÉCIMA QUINTA (NOTIFICAÇÕES E DOMICÍLIO CONVENCIONADO)",
      texto: `Para efeitos de citações ou notificações, as partes convencionam como domicílios as moradas indicadas na Cláusula Primeira. Qualquer alteração de morada deve ser comunicada à outra parte por carta registada.`
    },
    {
      titulo: "DÉCIMA SEXTA (LEI APLICÁVEL E FORO)",
      texto: `Em tudo o que for omisso neste contrato, aplica-se a legislação portuguesa em vigor (Código Civil e NRAU). Para dirimir litígios emergentes deste contrato, é competente o foro da Comarca da situação do imóvel, com renúncia expressa a qualquer outro.`
    }
  ];

  // Adiciona o Fiador se existir (Cláusula Extra)
  if (dados.temFiador) {
    clausulas.splice(1, 0, { // Insere logo após a identificação
      titulo: "CLÁUSULA ESPECIAL (FIADOR)",
      texto: `Intervém ainda como FIADOR: ${dados.nomeFiador || "___________________"}, com NIF ${dados.fiadorNIF || "______"}, que assume, solidariamente com o Inquilino, todas as obrigações decorrentes deste contrato, renunciando ao benefício da excussão prévia, mantendo-se a fiança válida mesmo em caso de renovação ou alteração da renda.`
    });
  }

  clausulas.push({
    titulo: "ASSINATURAS",
    texto: `O presente contrato é feito em triplicado, sendo um exemplar para o Senhorio, um para o Inquilino e outro para entregar na Autoridade Tributária (Finanças).\n\nAssinado em ${dataHoje}.`
  });

  return {
    titulo: "CONTRATO DE ARRENDAMENTO",
    clausulas: clausulas,
    assinantes: {
      parte1: "O Senhorio",
      parte2: "O Inquilino"
    }
  };
};