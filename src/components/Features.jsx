// --- src/components/Features.jsx ---
import styles from './Features.module.css';

// 1. A FUNÇÃO FeatureCard TEM DE VIR PRIMEIRO
function FeatureCard(props) {
  let iconeSvg;
  if (props.tipoIcone === "real") {
    iconeSvg = (
      <svg className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
    );
  } else if (props.tipoIcone === "fast") {
    iconeSvg = (
      <svg className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path>
      </svg>
    );
  } else if (props.tipoIcone === "pro") {
    iconeSvg = (
      <svg className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
      </svg>
    );
  } else {
    iconeSvg = ( // Ícone padrão se não houver um tipo específico
      <svg className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="16" x2="12" y2="12"></line>
        <line x1="12" y1="8" x2="12.01" y2="8"></line>
      </svg>
    );
  }

  return (
    <div className={styles.card}>
      <div className={styles.iconContainer}>{iconeSvg}</div>
      <h3>{props.titulo}</h3>
      <p>{props.texto}</p>
    </div>
  );
}

// 2. A FUNÇÃO Features VEM DEPOIS (e usa o FeatureCard)
function Features() {
  return (
    <div className={styles.featuresSection}>
      <h2 className={styles.tituloSecao}>
        A sua Caixa de Ferramentas Anti-Stress
      </h2>
      <p className={styles.subtituloSecao}> {/* <<< Verifique se 'subtituloSecao' está correto aqui */}
        Foque-se no seu trabalho. Nós tratamos da papelada
      </p>

      <div className={styles.gridDeCards}>
        <FeatureCard 
          titulo="Modelos com Cláusulas Reais"
          texto="Envie propostas que são também contratos. Proteja-se com termos de pagamento, propriedade intelectual e confidencialidade adaptados para Portugal." 
          tipoIcone="real"
        />

        <FeatureCard 
          titulo="Rápido e Intuitivo"
          texto="Esqueça o Word e as formatações complicadas. O nosso assistente guiado permite-lhe criar um documento perfeito em minutos." 
          tipoIcone="fast"
        />

        <FeatureCard 
          titulo="Profissionalismo que Impressiona"
          texto="Adicione o seu logótipo e envie um PDF com um design de elite. Mostre aos seus clientes que você não é um amador, mas sim um profissional de topo." 
          tipoIcone="pro"
        />
      </div>
    </div>
  );
}

export default Features; //