import { useState } from "react";
import { Link } from "react-router-dom";
import AuthLayout from "../components/AuthLayout.jsx";
import styles from "../components/LoginForm.module.css";

function RecuperarSenha() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle, loading, success, error
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    setMsg("");

    try {
      // URL Dinâmica para funcionar no Render e Localhost

      const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";

      const res = await fetch(`${baseUrl}/esqueceu-senha`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setStatus("success");
      } else {
        setStatus("error");
        setMsg("Email não encontrado ou erro no servidor.");
      }
    } catch (err) {
      setStatus("error");
      setMsg("Erro de conexão.");
    }
  };

  return (
    <AuthLayout>
      <div className={styles.formCard}>
        {status !== "success" ? (
          <>
            <h2>Recuperar Conta</h2>
            <p>Insira o seu email. Enviaremos um link seguro.</p>

            {status === "error" && (
              <div className={styles.mensagem + " " + styles.erro}>{msg}</div>
            )}

            <form className={styles.form} onSubmit={handleSubmit}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <button
                type="submit"
                className={styles.botaoLaranja}
                disabled={status === "loading"}
              >
                {status === "loading" ? "A enviar..." : "Enviar Link"}
              </button>
            </form>
          </>
        ) : (
          <div style={{ textAlign: "center", padding: "20px 0" }}>
            <span style={{ fontSize: "50px" }}>📩</span>
            <h3 style={{ color: "white", marginTop: "20px" }}>
              Email Enviado!
            </h3>
            <p style={{ color: "#a0aec0" }}>
              Verifique a sua caixa de entrada (e o spam). O link é válido por
              20 minutos.
            </p>
          </div>
        )}

        <div className={styles.linkRegisto} style={{ marginTop: "30px" }}>
          <Link to="/login">← Voltar ao Login</Link>
        </div>
      </div>
    </AuthLayout>
  );
}

export default RecuperarSenha;
