import { useState } from 'react';
import styles from './Pricing.module.css';
import PricingCard from './PricingCard.jsx';

function Pricing() {

    const [planoAnual, setPlanoAnual] = useState(false);

    return (
        <div className={styles.pricingSection}>

            <h2 className={styles.tituloSecao}>
                Comece Grátis. Use e Cresça sem Medo.
            </h2>
            <p className={styles.subtituloSecao}>
                Comece de gráça e evolua quando precisar. Sem fidelização.
            </p>

            <div className={styles.toggleContainer}>
                 <span className={!planoAnual ? styles.toggleAtivo : ''} onClick={() => setPlanoAnual(false)}
                    >
                     Mensal   
                  </span>
                <span className={planoAnual ? styles.toggleAtivo : ''} onClick={() => setPlanoAnual(true)}
                    >
                    Anual <span className={styles.desconto}>-20%</span>
                </span>
            </div>

            <div className={styles.gridCards}>
                <PricingCard
                plano="Grátis"
                descricao="Para quem está a começar."
                preco={planoAnual ? "0€" : "0€"}
                precoDetalhe="/ para sempre"
                features={[
                    "Até 3 documentos por mês",
                    "Acesso a todos od modelos",
                    "Exportação para PDF com Marca DocFacil.pt"
                ]}
                botaoTexto="Começar Gratuitamente"
                isPopular={false}
                />

                <PricingCard
                 plano="Pro"
                 descricao="Para profissionais e equipas."
                 preco={planoAnual ? "8€" : "10€"}
                 precoDetalhe="/ mês"
                 features={[
                    "Documentos ilimitados",
                    "Remoção da marca d'água DocFacil.pt",
                    "Personalizaçao com logótipo",
                    "Suporte prioritário"
                ]}
                 botaoTexto="Aderir ao Pro"
                 isPopular={true}
                />

            </div>
        </div>
    );
}

export default Pricing;