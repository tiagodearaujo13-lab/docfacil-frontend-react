import { useState } from "react";
import styles from "./Pricing.module.css";
import PricingCard from "./PricingCard.jsx";
import ScrollReveal from "./ScrollReveal.jsx"; // <--- IMPORTANTE: O nosso motor de animação

function Pricing() {
  const [anual, setAnual] = useState(true);

  return (
    <div id="precos" className={styles.pricingSection}>
      <div className={styles.headerPricing}>
        <ScrollReveal>
          <h2 className={styles.tituloSecao}>
            Investimento Transparente. <br />
            <span className={styles.destaque}>Sem Surpresas.</span>
          </h2>
          <p className={styles.subtituloSecao}>
            Comece gratuitamente e faça upgrade quando o seu negócio crescer.
          </p>
        </ScrollReveal>

        {/* --- TOGGLE MENSAL / ANUAL --- */}
        <ScrollReveal delay="0.2s">
          <div className={styles.toggleContainer}>
            <span
              className={!anual ? styles.opcaoAtiva : styles.opcaoInativa}
              onClick={() => setAnual(false)}
            >
              Mensal
            </span>

            <div
              className={styles.switchTrack}
              onClick={() => setAnual(!anual)}
            >
              <div
                className={`${styles.switchKnob} ${
                  anual ? styles.knobRight : styles.knobLeft
                }`}
              ></div>
            </div>

            <span
              className={anual ? styles.opcaoAtiva : styles.opcaoInativa}
              onClick={() => setAnual(true)}
            >
              Anual <span className={styles.discountBadge}>-20%</span>
            </span>
          </div>
        </ScrollReveal>
      </div>

      <div className={styles.gridCards}>
        {/* --- CARD GRÁTIS (Vem da Esquerda) --- */}
        <ScrollReveal direction="left">
          <PricingCard
            plano="Iniciante"
            descricao="Para testar a plataforma."
            preco="0€"
            precoDetalhe="/mês"
            features={[
              "3 Documentos por mês",
              "Acesso a modelos básicos",
              "Exportação com marca d'água",
              "Suporte comunitário",
            ]}
            botaoTexto="Criar Conta Grátis"
            isPopular={false}
            linkPara="/registo"
          />
        </ScrollReveal>

        {/* --- CARD PRO (Vem da Direita) --- */}
        <ScrollReveal direction="right">
          {/* PLANO PRO */}
          <PricingCard
            plano="Profissional"
            descricao="Para quem leva o negócio a sério."
            // MUDANÇA AQUI: Preços psicológicos
            preco={anual ? "7,90€" : "9,90€"}
            precoDetalhe={anual ? "/mês (faturado anualmente)" : "/mês"}
            features={[
              "Documentos Ilimitados",
              "Acesso a Modelos Premium (Atas, Contratos)",
              "Sem marca d'água",
              "Upload do seu Logótipo",
              "Suporte Prioritário",
            ]}
            botaoTexto="Começar Agora"
            isPopular={true}
            linkPara="/registo"
          />
        </ScrollReveal>
      </div>
    </div>
  );
}

export default Pricing;
