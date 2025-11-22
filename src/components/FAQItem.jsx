import { useState } from "react";
import styles from "./FAQ.module.css";

function FAQItem({ pergunta, resposta }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={`${styles.faqItem} ${isOpen ? styles.aberto : ""}`}
      onClick={() => setIsOpen(!isOpen)}
    >
      {/* Cabeçalho da Pergunta */}
      <div className={styles.perguntaHeader}>
        <h4 className={styles.textoPergunta}>{pergunta}</h4>

        {/* Ícone Seta (SVG) */}
        <div className={styles.iconContainer}>
          <svg
            className={styles.chevronIcon}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </div>
      </div>

      {/* Resposta (Com animação de altura máxima no CSS) */}
      <div className={styles.respostaContainer}>
        <div className={styles.respostaConteudo}>
          <p>{resposta}</p>
        </div>
      </div>
    </div>
  );
}

export default FAQItem;
