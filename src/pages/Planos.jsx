import { useState } from "react";
import styles from "./Planos.module.css";
import PricingCard from "../components/PricingCard.jsx";
import StripeButton from "../components/StripeButton.jsx";

function Planos() {
  const [cicloAnual, setCicloAnual] = useState(false);
  const [planoSelecionado, setPlanoSelecionado] = useState("professional"); // 🎯 Default para o mais vendido
  const [loading, setLoading] = useState(false);

  // 🎯 NOVOS PREÇOS ESTRATÉGICOS (PREÇO DE LANÇAMENTO)
  const planos = {
    essential: {
      nome: "Essential",
      descricao: "Para quem está a começar.",
      precoMensal: "6,90€", // 🔥 Antes 14,99€
      precoAnual: "4,90€", // 🔥 Antes 11,99€
      features: [
        "5 Documentos por mês",
        "Acesso a modelos premium",
        "Sem marca d'água",
        "Suporte por email",
        "Atualizações legais incluídas",
      ],
      stripePriceId: {
        mensal: "price_essential_mensal",
        anual: "price_essential_anual",
      },
    },
    professional: {
      nome: "Profissional",
      descricao: "Para uso ilimitado e sem restrições.",
      precoMensal: "14,90€", // 🔥 Antes 24,99€
      precoAnual: "9,90€", // 🔥 Antes 19,99€
      features: [
        "Documentos Ilimitados",
        "Acesso a TODOS os modelos",
        "Upload do seu Logótipo",
        "Suporte Prioritário 24/7",
        "Atualizações legais automáticas",
      ],
      stripePriceId: {
        mensal: "price_professional_mensal",
        anual: "price_professional_anual",
      },
    },
  };

  const handleUpgrade = async (plano) => {
    setPlanoSelecionado(plano);
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";

      // 🚨 Mapeamento importante: "professional" no front vira "pro" no back
      const planoCorrigido = plano === "professional" ? "pro" : "essential";

      console.log("Enviando para backend:", {
        plano: planoCorrigido,
        ciclo: cicloAnual ? "anual" : "mensal",
      });

      const response = await fetch(`${baseUrl}/criar-checkout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          plano: planoCorrigido,
          ciclo: cicloAnual ? "anual" : "mensal",
        }),
      });

      const data = await response.json();
      console.log("Resposta do backend:", data);

      if (data.url) {
        // 📊 GA4 - RASTREAR INÍCIO DE UPGRADE
        if (window.gtag) {
          window.gtag("event", "upgrade_purchase_initiate", {
            value: cicloAnual
              ? plano === "essential"
                ? 4.9
                : 9.9
              : plano === "essential"
              ? 6.9
              : 14.9,
            currency: "EUR",
            payment_plan: cicloAnual ? "annual" : "monthly",
            plan_type: plano,
          });
        }

        window.location.href = data.url;
      } else {
        alert(
          "Erro ao iniciar pagamento: " + (data.error || "Tente novamente.")
        );
      }
    } catch (error) {
      console.error("Erro completo:", error);
      alert("Erro de conexão: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  // 🎯 CALCULAR ECONOMIA REAL
  const calcularEconomia = (plano) => {
    // Agora a comparação é brutal: 15€ vs 150€ do advogado
    const precoMensal = plano === "essential" ? 6.9 : 14.9;
    const servicoTradicional = 150;
    const economia = (
      ((servicoTradicional - precoMensal) / servicoTradicional) *
      100
    ).toFixed(0);
    return economia; // Vai dar > 90%
  };

  return (
    <div className={styles.pageBackground}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2>Preços de Lançamento (Tempo Limitado)</h2>
          <p>
            Aproveite para garantir o acesso vitalício a estes valores.
            <br />
            <span style={{ color: "#48bb78", fontWeight: "bold" }}>
              Economize {calcularEconomia("professional")}% vs um advogado
              tradicional
            </span>
          </p>
        </div>

        {/* --- TOGGLE MELHORADO --- */}
        <div className={styles.toggleArea}>
          <div
            className={`${styles.btnToggle} ${
              !cicloAnual ? styles.toggleAtivo : styles.toggleInativo
            }`}
            onClick={() => setCicloAnual(false)}
          >
            Mensal
          </div>
          <div
            className={`${styles.btnToggle} ${
              cicloAnual ? styles.toggleAtivo : styles.toggleInativo
            }`}
            onClick={() => setCicloAnual(true)}
          >
            Anual{" "}
            <span
              style={{
                fontSize: "0.7rem",
                marginLeft: "5px",
                background: "#ff8c00",
                color: "black",
                padding: "2px 6px",
                borderRadius: "10px",
              }}
            >
              -30% EXTRA
            </span>
          </div>
        </div>

        <div className={styles.gridPlanos}>
          {/* 🎯 PLANO ATUAL (INICIANTE) */}
          <PricingCard
            plano="Iniciante"
            descricao="O seu plano atual."
            preco="0€"
            precoDetalhe="/mês"
            features={[
              "1 Documento por mês",
              "Modelos Básicos",
              "Com Marca d'água",
              "Suporte Comunitário",
            ]}
            botaoTexto="Plano Atual"
            isPopular={false}
          />

          {/* 🆕 PLANO ESSENTIAL */}
          <div className={styles.card}>
            <div
              style={{
                position: "absolute",
                top: "-12px",
                left: "50%",
                transform: "translateX(-50%)",
                backgroundColor: "#48bb78",
                color: "white",
                fontSize: "0.8rem",
                fontWeight: "bold",
                padding: "4px 12px",
                borderRadius: "12px",
              }}
            >
              MAIS BARATO
            </div>

            <h3 className={styles.planoTitulo}>{planos.essential.nome}</h3>
            <p className={styles.planoDescricao}>
              {planos.essential.descricao}
            </p>

            <div className={styles.planoPreco}>
              {cicloAnual
                ? planos.essential.precoAnual
                : planos.essential.precoMensal}
              <span className={styles.precoDetalhe}>
                {cicloAnual ? "/mês (faturado anualmente)" : "/mês"}
              </span>
            </div>

            {/* 🎯 BADGE DE ECONOMIA */}
            <div
              style={{
                background: "rgba(72, 187, 120, 0.1)",
                border: "1px solid #48bb78",
                borderRadius: "8px",
                padding: "8px 12px",
                marginBottom: "20px",
                textAlign: "center",
              }}
            >
              <span
                style={{
                  color: "#48bb78",
                  fontSize: "0.9rem",
                  fontWeight: "bold",
                }}
              >
                Menos que um pequeno-almoço ☕
              </span>
            </div>

            <ul className={styles.featuresList}>
              {planos.essential.features.map((feat, i) => (
                <li key={i}>
                  <svg
                    className={styles.checkIcon}
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {feat}
                </li>
              ))}
            </ul>

            <StripeButton
              text={
                loading && planoSelecionado === "essential"
                  ? "A processar..."
                  : "Escolher Essential"
              }
              onClick={() => handleUpgrade("essential")}
              loading={loading && planoSelecionado === "essential"}
              style={{ backgroundColor: "#48bb78" }}
            />
          </div>

          {/* 🏆 PLANO PROFESSIONAL (MAIS POPULAR) */}
          <div className={`${styles.card} ${styles.popular}`}>
            <div className={styles.fitaPopular}>RECOMENDADO</div>

            <h3 className={styles.planoTitulo}>{planos.professional.nome}</h3>
            <p className={styles.planoDescricao}>
              {planos.professional.descricao}
            </p>

            <div className={styles.planoPreco}>
              {cicloAnual
                ? planos.professional.precoAnual
                : planos.professional.precoMensal}
              <span className={styles.precoDetalhe}>
                {cicloAnual ? "/mês (faturado anualmente)" : "/mês"}
              </span>
            </div>

            {/* 🎯 BADGE DE ECONOMIA */}
            <div
              style={{
                background: "rgba(255, 140, 0, 0.1)",
                border: "1px solid #ff8c00",
                borderRadius: "8px",
                padding: "8px 12px",
                marginBottom: "20px",
                textAlign: "center",
              }}
            >
              <span
                style={{
                  color: "#ff8c00",
                  fontSize: "0.9rem",
                  fontWeight: "bold",
                }}
              >
                🔥 O preferido dos clientes
              </span>
            </div>

            <ul className={styles.featuresList}>
              {planos.professional.features.map((feat, i) => (
                <li key={i}>
                  <svg
                    className={styles.checkIcon}
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {feat}
                </li>
              ))}
            </ul>

            <StripeButton
              text={
                loading && planoSelecionado === "professional"
                  ? "A processar..."
                  : "Quero Acesso Ilimitado"
              }
              onClick={() => handleUpgrade("professional")}
              loading={loading && planoSelecionado === "professional"}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Planos;
