import { Link } from "react-router-dom";
import styles from "./Pricing.module.css";

function PricingCard({
  plano,
  descricao,
  preco,
  precoDetalhe,
  features,
  botaoTexto,
  isPopular,
  linkPara,
  badgeExtra,
  onClick, // ✅ AGORA FUNCIONA: Para handling personalizado
}) {
  // 🎯 Determinar se é um botão de ação ou link
  const ConteudoBotao = onClick ? (
    <button
      className={isPopular ? styles.botaoPopular : styles.botaoNormal}
      onClick={onClick}
      disabled={botaoTexto === "Plano Atual"}
    >
      {botaoTexto}
    </button>
  ) : (
    <Link
      to={linkPara || "#"}
      className={isPopular ? styles.botaoPopular : styles.botaoNormal}
    >
      {botaoTexto}
    </Link>
  );

  return (
    <div className={`${styles.card} ${isPopular ? styles.popular : ""}`}>
      {/* 🎯 BADGE PRINCIPAL - MAIS POPULAR */}
      {isPopular && <div className={styles.fitaPopular}>MAIS POPULAR</div>}

      {/* 🆕 BADGE EXTRA (ex: MAIS ECONÓMICO) */}
      {badgeExtra && <div className={styles.badgeExtra}>{badgeExtra}</div>}

      <h3 className={styles.planoTitulo}>{plano}</h3>
      <p className={styles.planoDescricao}>{descricao}</p>

      <div className={styles.planoPreco}>
        {preco}
        <span className={styles.precoDetalhe}>{precoDetalhe}</span>
      </div>

      <ul className={styles.featuresList}>
        {features.map((feature, index) => (
          <li key={index}>
            {/* Ícone de Check SVG */}
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
            {feature}
          </li>
        ))}
      </ul>

      {ConteudoBotao}

      {isPopular && (
        <p
          style={{
            fontSize: "0.75rem",
            color: "#718096",
            marginTop: "10px",
            textAlign: "center",
          }}
        >
          🔒 Pagamento seguro via Stripe
        </p>
      )}
    </div>
  );
}

export default PricingCard;
