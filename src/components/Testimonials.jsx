import styles from "./Testimonials.module.css";

function TestimonialCard(props) {
  return (
    <div className={styles.card}>
      <div className={styles.estrelas}>★★★★★</div>

      <p className={styles.citacao}>"{props.citacao}"</p>

      <div className={styles.autoInfo}>
        <div className={styles.avatar}>{props.iniciais}</div>
        <div>
          <div className={styles.nomeAutor}>{props.nome}</div>
          <div className={styles.tituloAutor}>{props.titulo}</div>
        </div>
      </div>
    </div>
  );
}

function Testimonials() {
  return (
    <div className={styles.testimonialsSection}>
      <h2 className={styles.tituloSecao}>
        Não acerdite em nós. Acredite neles.
      </h2>

      <p className={styles.subtituloSecao}>
        Veja o que os nossos utilizadores dizem.
      </p>

      <div className={styles.gridDeCards}>
        <TestimonialCard
          citacao="Finalmente uma ferramenta que percebe as necessidades de um freelancer em Portugal. Pouco horas todas as semanas e os meus clientes comentam o quão profissionais as minha propostas parecem agora."
          iniciais="MF"
          nome="Marina Ferreira"
          titulo="UX/UI Designer"
        />

        <TestimonialCard
          citacao="O DocFacil mudou a forma como gerimos os orçamentos na nossa pequena agência. É tão simples que toda a equipa adotou a ferramenta no primeiro dia. Recomendo a 100%!"
          iniciais="PS"
          nome="Pedro Santos"
          titulo="Autonomo"
        />

        <TestimonialCard
          citacao="Agora essa ferramenta deixar tudo fácil."
          iniciais="MF"
          nome="Maria das Flores"
          titulo="Reformada"
        />
      </div>
    </div>
  );
}

export default Testimonials;
