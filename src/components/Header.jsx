import { useState } from 'react';
import styles from './Header.module.css';

function Header() {
  
  const [menuAberto, setMenuAberto] = useState(false);
  
  const iconeMenu = '☰';

  return (
    <>
    <header className={styles.navBar}>
      
      <a href="#" className={styles.logo}>
        DocFacil.pt
      </a>

      <nav className={styles.menuDesktop}>

          <a href="#funcionalidades" className={styles.linkDesktop}>Funcionalidades</a>
          <a href="#como-funciona" className={`${styles.linkDesktop} ${styles.ativo}`}>Como Funciona</a>
          <a href="#testemunhos" className={styles.linkDesktop}>Testemunhos</a>
          <a href="#precos" className={styles.linkDesktop}>Preços</a>
          <a href="#faq" className={styles.linkDesktop}>FAQ</a>
          <a href="#" className={styles.linkDesktop}>Login</a>
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
        <div className={styles.menuIcon} onClick={() => setMenuAberto(false)}
         >
         x
    </div>

    <a href="#funcionalidades" className={styles.linkMenuMobile}>Funcionalidades</a>
    <a href="#como-funciona" className={styles.linkMenuMobile}>Como Funciona</a>
    <a href="#testemunhos" className={styles.linkMenuMobile}>Testemunhos</a>
    <a href="#precos" className={styles.linkMenuMobile}>Preços</a>
    <a href="#faq" className={styles.linkMenuMobile}>FAQ</a>
    <a href="#" className={styles.linkMenuMobile}>Login</a>

     </div>
    )}
    </>
  );
}

export default Header;