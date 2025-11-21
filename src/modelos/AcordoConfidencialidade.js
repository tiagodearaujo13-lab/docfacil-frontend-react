export const gerarTextoNDA = (dados) => {
  const dataHoje = new Date().toLocaleDateString("pt-PT");

  const parteReveladora = dados.parteReveladora || "___________________";
  const parteReceptora = dados.parteReceptora || "___________________";
  const objetivo = dados.objetivo || "Avaliação de parceria comercial";
  const pena = dados.multa || "10.000";

  return {
    titulo: "ACORDO DE CONFIDENCIALIDADE (NDA)",
    clausulas: [
      {
        titulo: "1. Partes",
        texto: `Celebrado entre ${parteReveladora} (Parte Reveladora) e ${parteReceptora} (Parte Receptora).`
      },
      {
        titulo: "2. Definição de Informação Confidencial",
        texto: `Considera-se confidencial toda a informação técnica, financeira ou comercial partilhada com o objetivo de: ${objetivo}.`
      },
      {
        titulo: "3. Dever de Sigilo",
        texto: `A Parte Receptora compromete-se a não divulgar, copiar ou utilizar a informação para fins alheios ao presente acordo.`
      },
      {
        titulo: "4. Exceções",
        texto: `Não estão abrangidas informações que já sejam do conhecimento público ou que tenham sido recebidas legitimamente de terceiros.`
      },
      {
        titulo: "5. Penalidade (Cláusula Penal)",
        texto: `Em caso de violação deste acordo, a Parte Receptora pagará à Parte Reveladora uma indemnização fixa de ${pena}€, sem prejuízo de indemnização por danos superiores comprovados.`
      },
      {
        titulo: "Assinaturas",
        texto: `Assinado em ${dataHoje}.`
      }
    ],
    assinantes: {
      parte1: "Parte Reveladora",
      parte2: "Parte Receptora"
    }
  };
};