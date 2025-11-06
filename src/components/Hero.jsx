import styles from './Hero.module.css';

function Hero() {
    return (
        <div className={styles.heroSection}>

            <h1 className={styles.titulo}>
                Menos Burocracia, <br />

                <span className={styles.destaque}>Mais Negócios Fechados.</span>

            </h1>

            <p className={styles.subtitulo}>O DocFacil.pt é a sua arma secreta contra a papelada. Crie propostas e
        contratos profissionais, juridicamente informados para Portugal, em menos
        tempo do que leva a tomar um café.
        </p>

        <a href="#" className={styles.botaoCta}>
            Começar a Criar (É Grátis)
        </a>

        </div>
    );
}

export default Hero;