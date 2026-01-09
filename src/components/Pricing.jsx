import { useState, useRef, useEffect } from "react";
import styles from "./Pricing.module.css";
import PricingCard from "./PricingCard.jsx";

// Hook customizado para detectar quando elemento está na viewport
function useInView(ref, threshold = 0.3) {
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(element);
        }
      },
      { threshold }
    );

    observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, [ref, threshold]);

  return isInView;
}

// Componente wrapper para animações
function AnimatedSection({ children, direction = "none" }) {
  const ref = useRef(null);
  const isInView = useInView(ref, 0.3);

  const getAnimationStyle = () => {
    if (!isInView) {
      switch (direction) {
        case "left":
          return {
            opacity: 0,
            transform: "translateX(-100px)",
          };
        case "up":
          return {
            opacity: 0,
            transform: "translateY(100px)",
          };
        case "right":
          return {
            opacity: 0,
            transform: "translateX(100px)",
          };
        default:
          return { opacity: 0 };
      }
    }
    return {
      opacity: 1,
      transform: "translateX(0) translateY(0)",
      transition: "all 0.6s ease-out",
    };
  };

  return (
    <div ref={ref} style={getAnimationStyle()}>
      {children}
    </div>
  );
}

function Pricing() {
  const [anual, setAnual] = useState(true);

  const planos = {
    iniciante: {
      precoMensal: "0€",
      precoAnual: "0€",
      descricao: "Para testar a plataforma.",
      features: [
        "1 Documento por mês",
        "Acesso a modelos básicos",
        "Exportação com marca d'água",
        "Suporte comunitário",
      ],
    },
    essential: {
      precoMensal: "6,90€", // 🔥 PREÇO REDUZIDO
      precoAnual: "4,90€", // 🔥 PREÇO REDUZIDO
      descricao: "O essencial por um preço simbólico.",
      features: [
        "5 Documentos por mês",
        "Acesso a modelos premium",
        "Sem marca d'água",
        "Suporte por email",
        "Atualizações legais incluídas",
      ],
    },
    professional: {
      precoMensal: "14,90€", // 🔥 PREÇO REDUZIDO
      precoAnual: "9,90€", // 🔥 PREÇO REDUZIDO
      descricao: "Liberdade total para o seu negócio.",
      features: [
        "Documentos Ilimitados",
        "Acesso a TODOS os modelos",
        "Upload do seu Logótipo",
        "Suporte Prioritário 24/7",
        "Atualizações legais automáticas",
      ],
    },
  };

  return (
    <div id="precos" className={styles.pricingSection}>
      <div className={styles.headerPricing}>
        <h2 className={styles.tituloSecao}>
          Invista no Seu Negócio. <br />
          <span className={styles.destaque}>Não em Burocracia.</span>
        </h2>
        <p className={styles.subtituloSecao}>
          Preços de lançamento por tempo limitado. Cancele quando quiser.
        </p>

        {/* TOGGLE SIMPLIFICADO E FUNCIONAL */}
        <div className={styles.toggleContainer}>
          <span
            className={!anual ? styles.opcaoAtiva : styles.opcaoInativa}
            onClick={() => setAnual(false)}
          >
            Mensal
          </span>

          <div className={styles.switchTrack} onClick={() => setAnual(!anual)}>
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
            Anual <span className={styles.discountBadge}>-30% EXTRA</span>
          </span>
        </div>
      </div>

      <div className={styles.gridCards}>
        {/* CARD INICIANTE - Vem da ESQUERDA */}
        <AnimatedSection direction="left">
          <PricingCard
            plano="Iniciante"
            descricao={planos.iniciante.descricao}
            preco={planos.iniciante.precoMensal}
            precoDetalhe="/mês"
            features={planos.iniciante.features}
            botaoTexto="Criar Conta Grátis"
            isPopular={false}
            linkPara="/registo"
          />
        </AnimatedSection>

        {/* CARD ESSENTIAL - Vem de BAIXO */}
        <AnimatedSection direction="up">
          <PricingCard
            plano="Essential"
            descricao={planos.essential.descricao}
            preco={
              anual ? planos.essential.precoAnual : planos.essential.precoMensal
            }
            precoDetalhe={anual ? "/mês (faturado anualmente)" : "/mês"}
            features={planos.essential.features}
            botaoTexto="Começar Agora"
            isPopular={false}
            badgeExtra="MAIS ECONÓMICO"
            linkPara="/registo"
          />
        </AnimatedSection>

        {/* CARD PROFESSIONAL - Vem da DIREITA */}
        <AnimatedSection direction="right">
          <PricingCard
            plano="Profissional"
            descricao={planos.professional.descricao}
            preco={
              anual
                ? planos.professional.precoAnual
                : planos.professional.precoMensal
            }
            precoDetalhe={anual ? "/mês (faturado anualmente)" : "/mês"}
            features={planos.professional.features}
            botaoTexto="Começar Agora"
            isPopular={true}
            linkPara="/registo"
          />
        </AnimatedSection>
      </div>

      {/* SEÇÃO DE COMPARAÇÃO ATUALIZADA */}
      <div className={styles.comparacaoAdvogado}>
        <h3>💰 Compare e Economize</h3>
        <div className={styles.comparacaoGrid}>
          <div className={styles.comparacaoItem}>
            <strong>Serviços Tradicionais</strong>
            <span>€150-€300 por contrato</span>
          </div>
          <div className={styles.comparacaoItem}>
            <strong>DocFacil Profissional</strong>
            <span>€14,90/mês (documentos ilimitados)</span>
          </div>
          <div className={styles.comparacaoItem}>
            <strong>Sua Economia</strong>
            <span className={styles.economia}>Mais de 90%</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pricing;
