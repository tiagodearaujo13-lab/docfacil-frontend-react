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

      <div 
        className={styles.menuIcon} 
        onClick={() => setMenuAberto(true)}
      >
        {iconeMenu}
        
      </div>
      
    </header>

    {menuAberto && (
      <div>
      <h2>O MENU ESTÁ ABERTO!</h2>
      <p>Aqui vão estar os nossos links</p>
      <button onClick={() => setMenuAberto(false)}>Fechar Menu</button>
      </div>
    )}
    </>
  );
}

export default Header;