import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import styles from "./LoginForm.module.css";
import GoogleLoginButton from "./GoogleLoginButton.jsx";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Estados visuais
  const [mostrarSenha, setMostrarSenha] = useState(false); // O Olhinho
  const [mensagem, setMensagem] = useState(""); // Mensagem na tela
  const [tipoMensagem, setTipoMensagem] = useState(""); // 'sucesso' ou 'erro'

  const navigate = useNavigate();

  const handleSubmit = async (evento) => {
    evento.preventDefault();
    setMensagem(""); // Limpa mensagens antigas

    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.status === 200) {
        // SUCESSO!
        console.log("Login com sucesso!", data.token);
        localStorage.setItem("token", data.token);

        setMensagem("Login efetuado com sucesso! A entrar...");
        setTipoMensagem("sucesso");

        // Redireciona automaticamente após 1.5 segundos
        setTimeout(() => {
          navigate("/dashboard");
        }, 1500);
      } else {
        // ERRO (Senha errada, etc)
        setMensagem(data.message || "Email ou password incorretos.");
        setTipoMensagem("erro");
      }
    } catch (error) {
      console.error("Erro de rede:", error);
      setMensagem("Não foi possível ligar ao servidor.");
      setTipoMensagem("erro");
    }
  };

  return (
    <div className={styles.formCard}>
      <h2>Login</h2>
      <p>Bem-vindo de volta! Faça login para aceder aos seus documentos.</p>

      {/* MENSAGEM DE STATUS (Sem Alert) */}
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

        <label htmlFor="password">Password</label>

        {/* Wrapper para colocar o olhinho junto com o input */}
        <div className={styles.passwordWrapper}>
          <input
            type={mostrarSenha ? "text" : "password"} // A Mágica acontece aqui
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
