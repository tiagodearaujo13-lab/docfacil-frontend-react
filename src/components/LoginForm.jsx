import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import styles from "./LoginForm.module.css";
import GoogleLoginButton from "./GoogleLoginButton.jsx";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (evento) => {
    evento.preventDefault();

    console.log("A 'telefonar' para o Backend para fazer LOGIN:", email);
    // Ligar o Login
    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      // Ouvir o Backend
      const data = await response.json(); // <- ler resposta Json
      if (response.status === 200) {
        // SUCESSO! (200 = OK)
        // O Backend enviou a Chave Mestra
        console.log("Login com sucesso!", data.token);

        // Guarda a Chave Mestra na Gaveta Secreta
        localStorage.setItem("token", data.token);
        alert("Login com sucesso! Bem-vindo!");
        // Ler o Usuario Cliente para o Dashboard
        navigate("/dashboard");
      } else {
        // ERRO! (ex: 400 = Email ou password incorretos)
        console.log("Erro de login:", data.message);
        alert(
          "Erro ao fazer login: " + (data || "Email ou password incorretos.")
        );
      }
    } catch (error) {
      // ERRO DE REDE! ex: o Backend esta desligado
      console.error("Erro de rede:", error);
      alert("Não foi possivel ligar ao servidor. O Backend esta ligado?");
    }
  };

  return (
    <div className={styles.formCard}>
      <h2>Login</h2>

      <p>Bem-vindo de volta! Faça login para aceder aos seus documentos.</p>

      <form className={styles.form} onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          placeholder="o.seu.email@exemplo.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          placeholder="A sua password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

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
