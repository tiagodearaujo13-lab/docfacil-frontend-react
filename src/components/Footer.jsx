import { Link } from "react-router-dom";
import styles from "./Footer.module.css";

function Footer() {
  return (
    <footer className={styles.footerWrapper}>
      <div className={styles.footerContainer}>
        {/* COLUNA 1: Marca */}
        <div className={styles.footerColuna}>
          <Link to="/" className={styles.logo}>
            DocFacil.pt
          </Link>
          <p className={styles.descricao}>
            Menos burocracia, mais negócios fechados. A sua ferramenta para
            propostas e contratos profissionais em Portugal.
          </p>
        </div>

        {/* COLUNA 2: Navegação Rápida (Links da Home) */}
        <div className={styles.footerColuna}>
          <h4>Produto</h4>
          <a href="/#funcionalidades">Funcionalidades</a>
          <a href="/#como-funciona">Como Funciona</a>
          <a href="/#precos">Preços</a>
          <a href="/#faq">Perguntas Frequentes</a>
        </div>

        {/* COLUNA 3: Legal & Suporte (Novas Páginas) */}
        <div className={styles.footerColuna}>
          <h4>Legal & Suporte</h4>
          <Link to="/termos">Termos de Serviço</Link>
          <Link to="/privacidade">Política de Privacidade</Link>
          <Link to="/contacto">Contacto</Link>
        </div>
      </div>

      <div className={styles.copyright}>
        © {new Date().getFullYear()} DocFacil.pt. Desenvolvido com ❤️ em
        Portugal.
      </div>
    </footer>
  );
}

export default Footer;
