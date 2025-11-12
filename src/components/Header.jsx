import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';

function Header() {
  
  const [menuAberto, setMenuAberto] = useState(false);
  
  const iconeMenu = '☰';

  return (
    <>
    <header className={styles.navBar}>
      
      <Link to="/" className={styles.logo}>
        DocFacil.pt
      </Link>

      <nav className={styles.menuDesktop}>

          <a href="#funcionalidades" className={styles.linkDesktop}>Funcionalidades</a>
          <a href="#como-funciona" className={`${styles.linkDesktop} ${styles.ativo}`}>Como Funciona</a>
          <a href="#testemunhos" className={styles.linkDesktop}>Testemunhos</a>
          <a href="#precos" className={styles.linkDesktop}>Preços</a>
          <a href="#faq" className={styles.linkDesktop}>FAQ</a>
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
         onClick={() => setMenuAberto(false)}
         >
         x
    </div>

    <a href="#funcionalidades" className={styles.linkMenuMobile} onClick={() => setMenuAberto(false)}>Funcionalidades</a>
    <a href="#como-funciona" className={styles.linkMenuMobile} onClick={() => setMenuAberto(false)}>Como Funciona</a>
    <a href="#testemunhos" className={styles.linkMenuMobile} onClick={() => setMenuAberto(false)}>Testemunhos</a>
    <a href="#precos" className={styles.linkMenuMobile} onClick={() => setMenuAberto(false)}>Preços</a>
    <a href="#faq" className={styles.linkMenuMobile} onClick={() => setMenuAberto(false)}>FAQ</a>
   
    <Link to="/login" className={styles.linkMenuMobile} onClick={() => setMenuAberto(false)}>Login</Link>

     </div>
    )}
    </>
  );
}

export default Header;