import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';

function Header() {
  
  const [menuAberto, setMenuAberto] = useState(false);
  
  const iconeMenu = '☰';

  const handleScrollClick = (evento, targetId) => {

    evento.preventDefalt();

    const targetElement = document.querySelector(targetId);
  
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth'});
    }
    setMenuAberto(false)
  };


  return (
    <>
    <header className={styles.navBar}>
      
      <Link to="/" className={styles.logo}>
        DocFacil.pt
      </Link>

      <nav className={styles.menuDesktop}>

          <a href="#funcionalidades" onClick={(e) => handleScrollClick(e, '#funcionalidades')} className={styles.linkDesktop}>Funcionalidades</a>
          <a href="#como-funciona" onClick={(e) => handleScrollClick(e, '#como-funciona')} className={`${styles.linkDesktop} ${styles.ativo}`}>Como Funciona</a>
          <a href="#testemunhos" onClick={(e) => handleScrollClick(e, '#testemunhos')} className={styles.linkDesktop}>Testemunhos</a>
          <a href="#precos" onClick={(e) => handleScrollClick(e, '#precos')} className={styles.linkDesktop}>Preços</a>
          <a href="#faq" onClick={(e) => handleScrollClick(e, '#faq')} className={styles.linkDesktop}>FAQ</a>
          <Link to="/login" className={styles.linkDesktop}>Login</Link>
        </nav>

      <div 
        className={styles.menuIcon} 
        onClick={() => setMenuAberto(true)}
      >
        {iconeMenu}
      </div>
      
    </header>

    {menuAberto && (
     <div className={styles.menuMobileAberto}>
        <div 
         className={styles.menuIcon}
         onClick={() => handleScrollClick(e, '#')}
         >
         x
    </div>
     
        <a href="#funcionalidades" onClick={(e) => handleScrollClick(e, '#funcionalidades')} className={styles.linkMenuMobile}>Funcionalidades</a>
        <a href="#como-funciona" onClick={(e) => handleScrollClick(e, '#como-funciona')} className={styles.linkMenuMobile}>Como Funciona</a>
        <a href="#testemunhos" onClick={(e) => handleScrollClick(e, '#testemunhos')} className={styles.linkMenuMobile}>Testemunhos</a>
        <a href="#precos" onClick={(e) => handleScrollClick(e, '#precos')} className={styles.linkMenuMobile}>Preços</a>
        <a href="#faq" onClick={(e) => handleScrollClick(e, '#faq')} className={styles.linkMenuMobile}>FAQ</a>
        <Link to="/login" onClick={() => setMenuAberto(false)} className={styles.linkMenuMobile}>Login</Link>

     </div>
    )}
    </>
  );
}

export default Header;