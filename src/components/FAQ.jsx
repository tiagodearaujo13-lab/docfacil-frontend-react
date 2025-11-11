import styles from './FAQ.module.css';
import FAQItem from './FAQItem.jsx';

function FAQ () {

    return (
        <div className={styles.faqSection}>
            <h2 className={styles.tituloSecao}>Perguntas Frenquentes</h2>
            <p className={styles.subtituloSecao}>
                Tudo o que precisa de saber antes de começar.
            </p>

            <div className={styles.faqContainer}>

                <FAQItem
                pergunta="O DocFacil é legamente válido em Portugal?"
                resposta="Sim! Todos od nossos modelos são baseados na legislação portuguesa e desenhados para serem jurudicamente sólidos, mas recomendamos sempre a revisão por um advogado."
                />

                <FAQItem
                pergunta="Posso cancelar o meu plano Pro a qualquer altura?"
          resposta="Absolutamente. O seu plano é sem fidelização. Pode cancelar a qualquer momento, sem perguntas, e continuará com acesso Pro até ao final do seu ciclo de faturação."
        />

        <FAQItem 
          pergunta="O que acontece aos meus documentos se eu cancelar?"
          resposta="Os seus documentos são seus. Poderá descarregar todos os seus PDFs antes de cancelar. Após o cancelamento, a sua conta voltará ao plano 'Grátis'."
        />

            </div>
        </div>
    );
}

export default FAQ;