import styles from "./Steps.module.css";
import ScrollReveal from "./ScrollReveal.jsx"; // Importante importar o nosso motor

function Steps() {
  return (
    <div id="como-funciona" className={styles.stepsSection}>
      <div className={styles.headerSteps}>
        <h2 className={styles.tituloSecao}>
          Do "Início" ao PDF <br />
          <span className={styles.destaque}>em 3 Passos Simples.</span>
        </h2>
        <p className={styles.subtituloSecao}>
          Sem complicações jurídicas. Sem formatações quebradas. Apenas
          resultados.
        </p>
      </div>

      <div className={styles.listaDePassos}>
        {/* PASSO 1: Aparece imediatamente */}
        <ScrollReveal>
          <div className={styles.passoCard}>
            <div className={styles.numeroBadge}>1</div>
            <div className={styles.conteudoPasso}>
              <h3>Escolha o Modelo</h3>
              <p>
                Navegue pela nossa biblioteca verificada. Temos desde Contratos
                de Trabalho a Atas e Promessas de Compra e Venda.
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* Seta Visual */}
        <div className={styles.setaSeparadora}>→</div>

        {/* PASSO 2: Espera 0.2 segundos */}
        <ScrollReveal delay="0.2s">
          <div className={styles.passoCard}>
            <div className={styles.numeroBadge}>2</div>
            <div className={styles.conteudoPasso}>
              <h3>Personalize</h3>
              <p>
                Preencha o nosso formulário inteligente. O sistema adapta as
                cláusulas e os textos automaticamente às suas respostas.
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* Seta Visual */}
        <div className={styles.setaSeparadora}>→</div>

        {/* PASSO 3: Espera 0.4 segundos */}
        <ScrollReveal delay="0.4s">
          <div className={styles.passoCard}>
            <div className={styles.numeroBadge}>3</div>
            <div className={styles.conteudoPasso}>
              <h3>Baixe o PDF</h3>
              <p>
                Gere o documento final instantaneamente. Um PDF profissional,
                formatado e pronto para ser assinado pelas partes.
              </p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}

export default Steps;
