import { useState } from "react";
import styles from "./Planos.module.css";
import PricingCard from "../components/PricingCard.jsx";
import StripeButton from "../components/StripeButton.jsx"; // <--- Importado e usado

function Planos() {
  const [planoAtual, setPlanoAtual] = useState("Grátis");
  const [cicloAnual, setCicloAnual] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleUpgrade = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:3000/criar-checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ciclo: cicloAnual ? "anual" : "mensal" }),
      });

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        alert("Erro ao iniciar pagamento. Tente novamente.");
      }
    } catch (error) {
      console.error(error);
      alert("Erro de conexão.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.pageBackground}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2>💎 Subscrição e Faturação</h2>
          <p>Escolha o plano ideal para o seu volume de trabalho.</p>
        </div>

        {/* Toggle Mensal / Anual */}
        <div className={styles.toggleArea}>
          <span
            className={!cicloAnual ? styles.toggleAtivo : styles.toggleInativo}
            onClick={() => setCicloAnual(false)}
          >
            Mensal
          </span>
          <span
            className={cicloAnual ? styles.toggleAtivo : styles.toggleInativo}
            onClick={() => setCicloAnual(true)}
          >
            Anual (-20%)
          </span>
        </div>

        <div className={styles.gridPlanos}>
          {/* PLANO GRÁTIS */}
          <PricingCard
            plano="Grátis"
            descricao="Para quem está a começar."
            preco="0€"
            precoDetalhe="/mês"
            features={[
              "3 Documentos por mês",
              "Modelos Básicos",
              "Com Marca d'água",
            ]}
            botaoTexto="Plano Atual"
            isPopular={false}
          />

          {/* PLANO PRO (Customizado) */}
          <div className={`${styles.card} ${styles.popular}`}>
            <div className={styles.fitaPopular}>MAIS POPULAR</div>

            <h3 className={styles.planoTitulo}>Profissional</h3>
            <p className={styles.planoDescricao}>Para profissionais sérios.</p>

            <div className={styles.planoPreco}>
              {cicloAnual ? "7,90€" : "9,90€"}
              <span className={styles.precoDetalhe}>
                {cicloAnual ? "/mês (cobrado anualmente)" : "/mês"}
              </span>
            </div>

            <ul className={styles.featuresList}>
              {[
                "Documentos Ilimitados",
                "Acesso a Modelos Premium",
                "Sem Marca d'água",
                "Upload de Logótipo",
              ].map((feat, i) => (
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
              text={loading ? "A processar..." : "Fazer Upgrade"}
              onClick={handleUpgrade}
              loading={loading}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Planos;
