import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import styles from "./LoginForm.module.css";
import GoogleLoginButton from "./GoogleLoginButton.jsx";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [mensagem, setMensagem] = useState("");
  const [tipoMensagem, setTipoMensagem] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (evento) => {
    evento.preventDefault();
    setMensagem("");

    try {
      const response = await fetch(
        "https://meu-backend-api-rohr.onrender.com/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await response.json();

      if (response.status === 200) {
        localStorage.setItem("token", data.token);
        setMensagem("Login efetuado com sucesso! A entrar...");
        setTipoMensagem("sucesso");
        setTimeout(() => {
          navigate("/dashboard");
        }, 1500);
      } else {
        setMensagem(data.message || "Email ou password incorretos.");
        setTipoMensagem("erro");
      }
    } catch (error) {
      setMensagem("Não foi possível ligar ao servidor.");
      setTipoMensagem("erro");
    }
  };

  return (
    <div className={styles.formCard}>
      <h2>Login</h2>
      <p>Bem-vindo de volta! Faça login para aceder aos seus documentos.</p>

      {mensagem && (
        <div
          className={`${styles.mensagem} ${
            tipoMensagem === "sucesso" ? styles.sucesso : styles.erro
          }`}
        >
          {mensagem}
        </div>
      )}

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

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <label htmlFor="password">Password</label>

          {/* --- O NOVO LINK AQUI --- */}
          <Link to="/recuperar-senha" className={styles.linkEsqueceu}>
            Esqueceu-se?
          </Link>
        </div>

        <div className={styles.passwordWrapper}>
          <input
            type={mostrarSenha ? "text" : "password"}
            id="password"
            placeholder="A sua password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="button"
            className={styles.eyeButton}
            onClick={() => setMostrarSenha(!mostrarSenha)}
          >
            {mostrarSenha ? "🙈" : "👁️"}
          </button>
        </div>

        <button type="submit" className={styles.botaoLaranja}>
          Entrar
        </button>
      </form>

      <div className={styles.divisor}>
        <h4 className={styles.Ou}>Ou</h4>
      </div>

      <GoogleLoginButton />

      <div className={styles.linkRegisto}>
        Não tem uma conta?
        <Link to="/registo">Cadastre-se gratuitamente</Link>
      </div>
    </div>
  );
}

export default LoginForm;
