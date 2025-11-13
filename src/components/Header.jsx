import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Header.module.css';

function Header() {
  
  const [menuAberto, setMenuAberto] = useState(false);
  const iconeMenu = '☰';
  const { pathname } = useLocation();
  const isHomePage = (pathname === '/');
  const fecharMenu = () => {
    setMenuAberto(false);
  };
  const handleScrollClick = (evento, targetId) => {
    evento.preventDefault();
    if (!isHomePage) {
      console.log("Precisa de estar na Home Page para rolar!");
      fecharMenu();
      return;
    }
    const targetElemet = document.querySelector(targetId);
    if (targetElemet) {
      targetElemet.scrollIntoView({ behavior: 'smooth'});
    }
    fecharMenu();
  };
  


  return (
    <>
    <header className={styles.navBar}>
      
      <Link to="/" className={styles.logo}>
        DocFacil.pt
      </Link>

    {isHomePage && (
      <nav className={styles.menuDesktop}>

          <a href="#funcionalidades" onClick={(e) => handleScrollClick(e, '#funcionalidades')} className={styles.linkDesktop}>Funcionalidades</a>
          <a href="#como-funciona" onClick={(e) => handleScrollClick(e, '#como-funciona')} className={`${styles.linkDesktop} ${styles.ativo}`}>Como Funciona</a>
          <a href="#testemunhos" onClick={(e) => handleScrollClick(e, '#testemunhos')} className={styles.linkDesktop}>Testemunhos</a>
          <a href="#precos" onClick={(e) => handleScrollClick(e, '#precos')} className={styles.linkDesktop}>Preços</a>
          <a href="#faq" onClick={(e) => handleScrollClick(e, '#faq')} className={styles.linkDesktop}>FAQ</a>
          <Link to="/login" className={styles.linkDesktop}>Login</Link>
        </nav>
    )}

    {isHomePage && (
      <div 
        className={styles.menuIcon} 
        onClick={() => setMenuAberto(true)}
      >
        {iconeMenu}
      </div>
    )}

    </header>

    {menuAberto && (
     <div className={styles.menuMobileAberto}>
        <div 
         className={styles.menuIcon}
         onClick={fecharMenu}
         >
         x
    </div>
     
        <a href="#funcionalidades" onClick={(e) => handleScrollClick(e, '#funcionalidades')} className={styles.linkMenuMobile}>Funcionalidades</a>
        <a href="#como-funciona" onClick={(e) => handleScrollClick(e, '#como-funciona')} className={styles.linkMenuMobile}>Como Funciona</a>
        <a href="#testemunhos" onClick={(e) => handleScrollClick(e, '#testemunhos')} className={styles.linkMenuMobile}>Testemunhos</a>
        <a href="#precos" onClick={(e) => handleScrollClick(e, '#precos')} className={styles.linkMenuMobile}>Preços</a>
        <a href="#faq" onClick={(e) => handleScrollClick(e, '#faq')} className={styles.linkMenuMobile}>FAQ</a>
        <Link to="/login" onClick={fecharMenu} className={styles.linkMenuMobile}>Login</Link>

     </div>
    )}
    </>
  );
}

export default Header;