import { useState } from "react";
import { Link } from "react-router-dom";
import AuthLayout from "../components/AuthLayout.jsx";
import styles from "../components/LoginForm.module.css"; // Reusa o estilo do Login

function RecuperarSenha() {
  const [email, setEmail] = useState("");
  const [enviado, setEnviado] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aqui futuramente ligaremos ao Backend para enviar o email de reset
    setEnviado(true);
  };

  return (
    <AuthLayout>
      <div className={styles.formCard}>
        {!enviado ? (
          <>
            <h2>Recuperar Conta</h2>
            <p>
              Insira o seu email. Enviaremos instruções para redefinir a sua
              password.
            </p>

            <form className={styles.form} onSubmit={handleSubmit}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="o.seu.email@exemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <button type="submit" className={styles.botaoLaranja}>
                Enviar Email de Recuperação
              </button>
            </form>
          </>
        ) : (
          <div style={{ textAlign: "center", padding: "20px 0" }}>
            <span style={{ fontSize: "50px" }}>📩</span>
            <h3 style={{ color: "white", marginTop: "20px" }}>
              Verifique o seu email
            </h3>
            <p style={{ color: "#a0aec0" }}>
              Se existir uma conta com o email <strong>{email}</strong>,
              enviámos um link de recuperação.
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
