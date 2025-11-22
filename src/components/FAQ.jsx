import styles from "./FAQ.module.css";
import FAQItem from "./FAQItem.jsx";

const faqData = [
  {
    id: 1,
    pergunta: "Os documentos têm validade legal em Portugal?",
    resposta:
      "Sim. Todos os nossos modelos são redigidos com base na legislação portuguesa em vigor (Código Civil, Código do Trabalho, NRAU, etc.). No entanto, para situações de elevada complexidade ou risco, recomendamos sempre a revisão final por um advogado.",
  },
  {
    id: 2,
    pergunta: "Posso cancelar a subscrição quando quiser?",
    resposta:
      "Absolutamente. Não acreditamos em fidelizações forçadas. Pode cancelar a sua conta Pro a qualquer momento no seu painel de controlo, e manterá o acesso até ao fim do período já pago.",
  },
  {
    id: 3,
    pergunta: "Os meus dados e documentos estão seguros?",
    resposta:
      "A segurança é a nossa prioridade. Utilizamos encriptação de ponta a ponta e os seus dados são armazenados em servidores seguros na Europa, em conformidade com o RGPD.",
  },
  {
    id: 4,
    pergunta: "Posso usar o DocFacil no telemóvel?",
    resposta:
      "Claro! A nossa plataforma web é 100% responsiva e funciona perfeitamente no navegador do seu smartphone. Além disso, estamos a desenvolver a nossa própria Aplicação Móvel (App) para Android e iOS, que estará disponível muito em breve!",
  },
  {
    id: 5,
    pergunta: "Emitem fatura para a minha empresa?",
    resposta:
      "Sim. Após qualquer pagamento, receberá automaticamente a fatura com o NIF que indicou, válida para dedução de despesas no IRS ou IRC.",
  },
];

function FAQ() {
  return (
    <div id="faq" className={styles.faqSection}>
      <div className={styles.headerFAQ}>
        <h2 className={styles.tituloSecao}>
          Dúvidas? <span className={styles.destaque}>Nós esclarecemos.</span>
        </h2>
        <p className={styles.subtituloSecao}>
          Tudo o que precisa saber para começar a trabalhar de forma mais
          inteligente hoje mesmo.
        </p>
      </div>

      <div className={styles.faqLista}>
        {faqData.map((item) => (
          <FAQItem
            key={item.id}
            pergunta={item.pergunta}
            resposta={item.resposta}
          />
        ))}
      </div>
    </div>
  );
}

export default FAQ;
