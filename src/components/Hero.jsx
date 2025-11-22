import styles from "./Hero.module.css";
import ImagemDeFundo from "../assets/hero-background.jpg";
import { Link } from "react-router-dom";

function Hero() {
  // Mantemos a lógica da imagem dinâmica, mas escureci um pouco (0.75)
  // para o texto branco brilhar mais e ser mais legível.
  const estiloDoHero = {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.75)), url(${ImagemDeFundo})`,
  };

  return (
    <div className={styles.heroSection} style={estiloDoHero}>
      <div className={styles.heroContent}>
        <h1 className={styles.titulo}>
          Documentos Jurídicos <br />
          <span className={styles.destaque}>Blindados e Rápidos.</span>
        </h1>

        <p className={styles.subtitulo}>
          Esqueça o Word e a insegurança jurídica. Crie contratos de trabalho,
          propostas comerciais e atas de assembleia em conformidade com a lei
          portuguesa, em menos de 2 minutos.
        </p>

        <div className={styles.ctaGroup}>
          <Link to="/registo" className={styles.botaoPrimary}>
            Começar Grátis
          </Link>

          <a href="#como-funciona" className={styles.botaoSecondary}>
            Ver como funciona
          </a>
        </div>

        <p className={styles.trustText}>
          🔒 Mais de 500 documentos gerados este mês.
        </p>
      </div>
    </div>
  );
}

export default Hero;
