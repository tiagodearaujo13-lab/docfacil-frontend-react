import styles from './Header.module.css';

function Header () {
    
    const iconeMenu = '☰';
    
    return (
        <header className={styles.navBar}>
            
            <a href="#" className={styles.logo}>DocFacil.pt</a>

            <div className={styles.menuIcon}>{iconeMenu}</div>
            </header>
    );
}

export default Header;