import styles from './Footer.module.css';

function Footer() {
    return (

        <footer className={styles.footerWrapper}>

            <div className={styles.footerContainer}>

                <div className={styles.footerColuna}>

                    <a href="#" className={styles.logo}>DocFacil.pt</a>
                    <p className={styles.descricao}>
                      Menos burocracia, mais negócios fechados. A sua ferramenta para propostas e contratos profissionais em Portugal.  
                    </p>
                </div>

                <div className={styles.footerColuna}>
                    <h4>Produtos</h4>
                    <a href="#">Funcionalidades</a>
                    <a href="#">Como Funciona</a>
                    <a href="#">Preços</a>
                    <a href="#">Login</a>
                </div>

                <div className={styles.footerColuna}>
                    <h4>Legal</h4>
                    <a href="#">Termos de Serviço</a>
                    <a href="#">Política de Privacidade</a>
                    <a href="#">Contacto</a>
                </div>
            </div>

            <div className={styles.copyrignt}>
                © {new Date().getFullYear()} DocFacil.pt. Todos os direitos reservados.
            </div>
        </footer>
    );
}

export default Footer;