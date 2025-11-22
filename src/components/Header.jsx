import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./Header.module.css";

function Header() {
  const [menuAberto, setMenuAberto] = useState(false);
  const { pathname } = useLocation();

  const isHomePage = pathname === "/";

  const fecharMenu = () => {
    setMenuAberto(false);
  };

  const handleScrollClick = (evento, targetId) => {
    evento.preventDefault();
    if (!isHomePage) {
      fecharMenu();
      return;
    }
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
    fecharMenu();
  };

  return (
    <>
      <header className={styles.navBar}>
        {/* LOGO */}
        <Link to="/" className={styles.logo}>
          DocFacil.pt
        </Link>

        {/* MENU DESKTOP */}
        {isHomePage ? (
          <nav className={styles.menuDesktop}>
            <a
              href="#funcionalidades"
              onClick={(e) => handleScrollClick(e, "#funcionalidades")}
              className={styles.linkDesktop}
            >
              Funcionalidades
            </a>
            <a
              href="#como-funciona"
              onClick={(e) => handleScrollClick(e, "#como-funciona")}
              className={styles.linkDesktop}
            >
              Como Funciona
            </a>
            <a
              href="#testemunhos"
              onClick={(e) => handleScrollClick(e, "#testemunhos")}
              className={styles.linkDesktop}
            >
              Testemunhos
            </a>
            <a
              href="#precos"
              onClick={(e) => handleScrollClick(e, "#precos")}
              className={styles.linkDesktop}
            >
              Preços
            </a>
            <a
              href="#faq"
              onClick={(e) => handleScrollClick(e, "#faq")}
              className={styles.linkDesktop}
            >
              FAQ
            </a>

            {/* Botão Home: Área de Cliente */}
            <Link to="/login" className={styles.botaoLogin}>
              Área de Cliente
            </Link>
          </nav>
        ) : (
          // MUDANÇA AQUI: Botão "Voltar à Home" com estilo padrão
          <nav className={styles.menuDesktop}>
            <Link to="/" className={styles.botaoLogin}>
              ← Voltar à Home
            </Link>
          </nav>
        )}

        {/* ÍCONE HAMBÚRGUER (Mobile) */}
        <div className={styles.menuIcon} onClick={() => setMenuAberto(true)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
            />
          </svg>
        </div>
      </header>

      {/* MENU MOBILE (Igual ao anterior) */}
      {menuAberto && (
        <div className={styles.menuMobileAberto}>
          <div className={styles.fecharMobile} onClick={fecharMenu}>
            &times;
          </div>

          {isHomePage ? (
            <>
              <a
                href="#funcionalidades"
                onClick={(e) => handleScrollClick(e, "#funcionalidades")}
                className={styles.linkMenuMobile}
              >
                Funcionalidades
              </a>
              <a
                href="#como-funciona"
                onClick={(e) => handleScrollClick(e, "#como-funciona")}
                className={styles.linkMenuMobile}
              >
                Como Funciona
              </a>
              <a
                href="#testemunhos"
                onClick={(e) => handleScrollClick(e, "#testemunhos")}
                className={styles.linkMenuMobile}
              >
                Testemunhos
              </a>
              <a
                href="#precos"
                onClick={(e) => handleScrollClick(e, "#precos")}
                className={styles.linkMenuMobile}
              >
                Preços
              </a>
              <a
                href="#faq"
                onClick={(e) => handleScrollClick(e, "#faq")}
                className={styles.linkMenuMobile}
              >
                FAQ
              </a>

              <Link
                to="/login"
                onClick={fecharMenu}
                className={styles.linkLoginMobile}
              >
                Entrar
              </Link>
            </>
          ) : (
            // Menu Mobile quando NÃO estamos na Home
            <Link
              to="/"
              onClick={fecharMenu}
              className={styles.linkLoginMobile}
            >
              Voltar à Home
            </Link>
          )}
        </div>
      )}
    </>
  );
}

export default Header;
