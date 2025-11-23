import styles from "./StripeButton.module.css";

function StripeButton({ onClick, loading, text = "Fazer Upgrade" }) {
  return (
    <div className={styles.container}>
      <button className={styles.stripeBtn} onClick={onClick} disabled={loading}>
        {loading ? <span className={styles.spinner}>↻</span> : text}
      </button>

      {/* Selo de Confiança */}
      <p className={styles.securityNote}>
        🔒 Pagamento seguro via <strong>Stripe</strong>
      </p>
    </div>
  );
}

export default StripeButton;
