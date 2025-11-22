import { useEffect } from "react";
import styles from "./Toast.module.css";

function Toast({ mensagem, tipo, onClose }) {
  useEffect(() => {
    // O Toast desaparece sozinho após 3 segundos
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`${styles.toast} ${
        tipo === "erro" ? styles.erro : styles.sucesso
      }`}
    >
      <div className={styles.icon}>{tipo === "erro" ? "✕" : "✓"}</div>
      <div className={styles.message}>{mensagem}</div>
      <button onClick={onClose} className={styles.closeBtn}>
        &times;
      </button>
    </div>
  );
}

export default Toast;
