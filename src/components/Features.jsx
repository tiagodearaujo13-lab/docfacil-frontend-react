import styles from './Features.module.css';

function FeaturesCard(props) {
    return (
        <div className={styles.card}>
            <div className={styles.icon}>☰</div>
            <h3>{props.titulo}</h3>
            <p>{props.texto}</p>

        </div>
    );
}

function Features() {
    return (
        <div className={styles.featuresSection}>
            <h2 className={styles.tituloSecao}>
                A sua Caixa de Ferramentas Anti-Stress
            </h2>
            <p className={styles.subitituloSecao}>
                Foque-se no seu trabalho. Nós tratomos da papelada
            </p>

            <div className={styles.gridDeCards}>
                <FeaturesCard
                titulo="Modelos com Cláusulas Reais"
                texto="Envie propostas que são também contratos. Proteja-se com termos de pagamento, propriedade intelectual e confidencialidade adaptados para Portugal."
                />

                <FeaturesCard
                titulo="Rápido e Intuitivo"
                texto="Esqueca o word e as formatações complicadas. O nosso assistente guiado permite-lhe criar um documento perfeito em minutos."
                />

                <FeaturesCard
                titulo="Profissionalismo que Impressiona"
                texto="Adicione seu logótipo e envie um PDF com um design de elite. Mostre aos seus clientes que você não é um amador, mas sim um profissional de topo."
                />
            </div>
        </div>
    );
}

export default Features;