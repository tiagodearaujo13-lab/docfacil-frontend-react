import styles from "./Features.module.css";

// Sub-componente para o Cartão (Mantemos o código limpo)
function FeatureCard({ titulo, texto, iconPath }) {
  return (
    <div className={styles.card}>
      <div className={styles.iconContainer}>
        <svg
          className={styles.icon}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {iconPath}
        </svg>
      </div>
      <h3>{titulo}</h3>
      <p>{texto}</p>
    </div>
  );
}

function Features() {
  return (
    // Adicionei o ID para o link do menu funcionar
    <div id="funcionalidades" className={styles.featuresSection}>
      <div className={styles.headerFeatures}>
        <h2 className={styles.tituloSecao}>
          Porquê escolher o <span className={styles.destaque}>DocFacil?</span>
        </h2>
        <p className={styles.subtituloSecao}>
          Não somos apenas um editor de texto. Somos o seu departamento
          jurídico, administrativo e de design, tudo numa só plataforma.
        </p>
      </div>

      <div className={styles.gridDeCards}>
        {/* CARD 1: Segurança Jurídica */}
        <FeatureCard
          titulo="Segurança Jurídica Total"
          texto="Os nossos modelos não são genéricos. São atualizados conforme o Código do Trabalho e o Código Civil português. Durma descansado sabendo que os seus contratos são válidos."
          iconPath={<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />}
        />

        {/* CARD 2: Rapidez (Automação) */}
        <FeatureCard
          titulo="Preenchimento Automático"
          texto="Preencha os dados uma vez e veja a magia acontecer. O nosso editor inteligente adapta as cláusulas (singular/plural, masculino/feminino) e formata tudo automaticamente."
          iconPath={<path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />}
        />

        {/* CARD 3: Profissionalismo (Design) */}
        <FeatureCard
          titulo="Imagem Profissional"
          texto="Impressione os seus clientes. Entregue PDFs imaculados, organizados e com o seu logótipo. Uma boa apresentação é metade da venda fechada."
          iconPath={
            <path d="M12 19l7-7 3 3-7 7-3-3zM18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5zM2 2l7.586 7.586M11 11l-4 4" />
          }
        />

        {/* CARD 4: Nuvem (Cloud) - NOVO! Já que temos o PostgreSQL */}
        <FeatureCard
          titulo="Arquivo na Nuvem"
          texto="Nunca mais perca um contrato. Todos os seus documentos ficam salvos na sua área privada, acessíveis em qualquer lugar e seguros com encriptação de nível bancário."
          iconPath={<path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />}
        />

        {/* CARD 5: Multi-Dispositivo */}
        <FeatureCard
          titulo="Funciona onde você estiver"
          texto="No escritório ou em viagem. O DocFacil funciona perfeitamente no seu computador, tablet ou telemóvel. Feche negócios na hora."
          iconPath={<rect x="5" y="2" width="14" height="20" rx="2" ry="2" />}
        />

        {/* CARD 6: Suporte Dedicado */}
        <FeatureCard
          titulo="Suporte em Português"
          texto="Dúvidas sobre qual modelo usar? A nossa equipa de suporte fala a sua língua e está pronta para ajudar a desbloquear o seu trabalho."
          iconPath={
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
          }
        />
      </div>
    </div>
  );
}

export default Features;
