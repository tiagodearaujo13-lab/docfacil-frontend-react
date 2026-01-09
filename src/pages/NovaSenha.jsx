import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import AuthLayout from "../components/AuthLayout.jsx";
import styles from "../components/LoginForm.module.css";

function NovaSenha() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [status, setStatus] = useState("idle");

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const id = searchParams.get("id");
  const token = searchParams.get("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirm) return alert("As senhas não coincidem!");

    setStatus("loading");

    try {
      const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";

      const res = await fetch(`${baseUrl}/reset-senha/${id}/${token}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        setStatus("success");
        setTimeout(() => navigate("/login"), 3000);
      } else {
        setStatus("error");
      }
    } catch (err) {
      setStatus("error");
    }
  };

  if (!id || !token)
    return (
      <AuthLayout>
        <h2 style={{ color: "white" }}>Link inválido.</h2>
      </AuthLayout>
    );

  return (
    <AuthLayout>
      <div className={styles.formCard}>
        {status === "success" ? (
          <div>
            <h2>✅ Sucesso!</h2>
            <p>A sua password foi alterada. A redirecionar...</p>
          </div>
        ) : (
          <>
            <h2>Definir Nova Password</h2>
            <p>Escolha uma senha forte.</p>

            {status === "error" && (
              <div className={styles.mensagem + " " + styles.erro}>
                Link expirado ou inválido.
              </div>
            )}

            <form className={styles.form} onSubmit={handleSubmit}>
              <label>Nova Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <label>Confirmar Password</label>
              <input
                type="password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                required
              />

              <button
                type="submit"
                className={styles.botaoLaranja}
                disabled={status === "loading"}
              >
                {status === "loading" ? "A guardar..." : "Alterar Password"}
              </button>
            </form>
          </>
        )}
      </div>
    </AuthLayout>
  );
}

export default NovaSenha;
