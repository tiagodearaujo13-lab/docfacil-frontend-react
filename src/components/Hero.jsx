import styles from './Hero.module.css';
import ImagemDeFundo from '../assets/hero-background.jpg';
import { Link } from 'react-router-dom';

function Hero() {

    const estiloDoHero = {
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${ImagemDeFundo})`
    };
    return (
        <div className={styles.heroSection} style={estiloDoHero}>

            <h1 className={styles.titulo}>
                Menos Burocracia, <br />

                <span className={styles.destaque}>Mais Negócios Fechados.</span>

            </h1>

            <p className={styles.subtitulo}>O DocFacil.pt é a sua arma secreta contra a papelada. Crie propostas e
        contratos profissionais, juridicamente informados para Portugal, em menos
        tempo do que leva a tomar um café.
        </p>

        <Link to="/login" className={styles.botaoCta}>
            Começar a Criar
        </Link>

        </div>
    );
}

export default Hero;