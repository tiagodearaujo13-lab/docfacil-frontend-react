import styles from "./Steps.module.css";

function Steps() {
  return (
    <div className={styles.stepsSection}>
      <h2 className={styles.tituloSecao}>
        De "Olá" a Documentos Rapidos em 3 Passos.
      </h2>
      <p className={styles.subtituloSecao}>Simples. Direto. Eficaz.</p>

      <div className={styles.listaDePassos}>
        <div className={styles.passo}>
          <div className={styles.circuloNumero}>1</div>
          <h3>Escolha o Documento</h3>
          <p>
            Pode ser um Contrato de Prestação de Serviço, Contrato de
            Arrendamento, Documento Único Automóvel (DUA) entre outros.
          </p>
        </div>

        <div className={styles.passo}>
          <div className={styles.circuloNumero}>2</div>
          <h3>Preencha os Dados</h3>
          <p>
            Insira as informações, os detalhes do serviço e os valores no nosso
            formulário guiado.
          </p>
        </div>

        <div className={styles.passo}>
          <div className={styles.circuloNumero}>3</div>
          <h3>Descarregue o PDF</h3>
          <p>
            Receba instantaneamente um PDF de alta qualidade, pronto para enviar
            ao seu cliente.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Steps;
