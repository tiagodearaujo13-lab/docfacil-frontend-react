import React, { useState } from "react";
import { Link } from "react-router-dom";

const NotificationBar = () => {
  const [isOpen, setIsOpen] = useState(true);

  if (!isOpen) return null;

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <span style={styles.icon}>⚖️</span>
        <p style={styles.text}>
          <strong>Atualização em Breve:</strong> Chega a Consultoria Jurídica
          Especializada!
          <span style={styles.mobileHide}>
            {" "}
            Aproveite as condições atuais antes da mudança.
          </span>
        </p>

        <Link to="/registo" style={styles.button}>
          VER PLANOS
        </Link>
      </div>

      <button onClick={() => setIsOpen(false)} style={styles.closeButton}>
        ✕
      </button>
    </div>
  );
};

// Estilos em objeto para não precisar de criar ficheiro CSS separado agora
const styles = {
  container: {
    backgroundColor: "#1e3a8a", // Azul forte (autoridade)
    color: "#ffffff",
    padding: "10px 15px",
    position: "sticky",
    top: 0,
    zIndex: 9999,
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    fontFamily: "'Inter', sans-serif",
    fontSize: "14px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "40px",
  },
  content: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: "15px",
    marginRight: "20px",
  },
  icon: {
    fontSize: "16px",
  },
  text: {
    margin: 0,
    lineHeight: "1.4",
  },
  mobileHide: {
    // Nota: Para esconder em mobile precisaria de media query,
    // mas aqui deixamos visivel ou usamos CSS externo.
    // Por enquanto fica visível para reforçar a mensagem.
    opacity: 0.9,
    fontWeight: "normal",
    marginLeft: "5px",
  },
  button: {
    backgroundColor: "#f59e0b", // Laranja para chamar atenção (CTA)
    color: "#000",
    textDecoration: "none",
    padding: "4px 12px",
    borderRadius: "4px",
    fontWeight: "700",
    fontSize: "12px",
    textTransform: "uppercase",
    border: "none",
    cursor: "pointer",
    whiteSpace: "nowrap",
  },
  closeButton: {
    background: "transparent",
    border: "none",
    color: "white",
    fontSize: "16px",
    cursor: "pointer",
    opacity: 0.7,
    padding: "0 5px",
    marginLeft: "auto", // Empurra o X para a direita se flex permitir
  },
};

export default NotificationBar;
