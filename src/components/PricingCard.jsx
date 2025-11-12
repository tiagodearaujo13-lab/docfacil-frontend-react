import { Link } from 'react-router-dom';
import styles from './Pricing.module.css';

function PricingCard(props) {

    const cardClasses = `${styles.card} ${props.isPopular ? styles.popular : ''}`;

    return (
        <div className={cardClasses}>

            {props.isPopular && (
                <div className={StyleSheetList.fitaPopular}>MAIS POPULAR</div>
            )}

            <h3 className={styles.planoTitulo}>{props.plano}</h3>
            <p className={styles.planoDescricao}>{props.descricao}</p>

            <div className={styles.planoPreco}>
                {props.preco}
                <span className={styles.precoDetalhe}>{props.precoDetalhe}</span>
            </div>

            <ul className={styles.featuresList}>
                {props.features.map((feature, index) => (
                    <li key={index}>✓ {feature}</li>
                ))}
            </ul>

            {props.linkPara ? (
            <Link to={props.linkPara} className={styles.botaoPlano}>{props.botaoTexto}</Link>
            ) : (
              
                <a href="#" className={styles.botaoPlano}>
                    {props.botaoTexto}
                </a>
            )}
        </div>


    );
}


export default PricingCard;