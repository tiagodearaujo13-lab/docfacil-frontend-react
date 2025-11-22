import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./CookieBanner.module.css";

function CookieBanner() {
  const [mostrar, setMostrar] = useState(false);

  useEffect(() => {
    // Verifica se já aceitou antes
    const consentimento = localStorage.getItem("docfacil_cookie_consent");
    if (!consentimento) {
      // Pequeno delay para não ser agressivo logo ao abrir o site
      setTimeout(() => setMostrar(true), 1000);
    }
  }, []);

  const aceitarCookies = () => {
    localStorage.setItem("docfacil_cookie_consent", "true");
    setMostrar(false);
  };

  if (!mostrar) return null;

  return (
    <div className={styles.bannerContainer}>
      <div className={styles.content}>
        <p>
          🍪 <strong>Este site utiliza cookies.</strong> Usamos cookies para
          garantir que obtém a melhor experiência no nosso site e para manter a
          sua sessão segura. Ao continuar, concorda com a nossa{" "}
          <Link to="/privacidade" className={styles.link}>
            Política de Privacidade
          </Link>
          .
        </p>
        <div className={styles.actions}>
          <button onClick={aceitarCookies} className={styles.btnAccept}>
            Aceitar e Fechar
          </button>
        </div>
      </div>
    </div>
  );
}

export default CookieBanner;
