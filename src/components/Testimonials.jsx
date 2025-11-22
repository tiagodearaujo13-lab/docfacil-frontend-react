import styles from "./Testimonials.module.css";

// Dados simulados (No futuro, isto virá do seu Banco de Dados Neon!)
const testemunhosData = [
  {
    id: 1,
    nome: "Marina Ferreira",
    cargo: "UX/UI Designer",
    texto:
      "Finalmente uma ferramenta que percebe as necessidades de um freelancer em Portugal. Poupo horas todas as semanas e os meus clientes comentam o quão profissionais as minhas propostas parecem agora.",
    iniciais: "MF",
  },
  {
    id: 2,
    nome: "Pedro Santos",
    cargo: "Consultor de Marketing",
    texto:
      "O DocFacil mudou a forma como gerimos os orçamentos na nossa agência. É tão simples que toda a equipa adotou a ferramenta no primeiro dia. Recomendo a 100%!",
    iniciais: "PS",
  },
  {
    id: 3,
    nome: "Ana Ribeiro",
    cargo: "Gestora de Alojamento Local",
    texto:
      "Usava o Word e perdia imenso tempo a formatar contratos de arrendamento. Com o DocFacil, tenho a certeza que as cláusulas estão legais e o design sai perfeito.",
    iniciais: "AR",
  },
];

function TestimonialCard({ nome, cargo, texto, iniciais }) {
  return (
    <div className={styles.card}>
      {/* Cabeçalho do Card: Autor */}
      <div className={styles.headerCard}>
        <div className={styles.avatar}>{iniciais}</div>
        <div className={styles.infoAutor}>
          <h4 className={styles.nomeAutor}>{nome}</h4>
          <span className={styles.cargoAutor}>{cargo}</span>
        </div>
      </div>

      {/* Estrelas */}
      <div className={styles.estrelas}>★★★★★</div>

      {/* Texto (Citação) */}
      <p className={styles.citacao}>"{texto}"</p>
    </div>
  );
}

function Testimonials() {
  return (
    <div id="testemunhos" className={styles.testimonialsSection}>
      <div className={styles.headerSection}>
        <h2 className={styles.tituloSecao}>
          Não acredite apenas em nós. <br />
          <span className={styles.destaque}>Acredite neles.</span>
        </h2>
        <p className={styles.subtituloSecao}>
          Junte-se a centenas de profissionais portugueses que já modernizaram a
          sua burocracia.
        </p>
      </div>

      <div className={styles.gridDeCards}>
        {testemunhosData.map((item) => (
          <TestimonialCard
            key={item.id}
            nome={item.nome}
            cargo={item.cargo}
            texto={item.texto}
            iniciais={item.iniciais}
          />
        ))}
      </div>
    </div>
  );
}

export default Testimonials;
