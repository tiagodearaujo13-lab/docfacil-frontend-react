import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./LoginForm.module.css"; // Reaproveitamos o estilo
import GoogleLoginButton from "./GoogleLoginButton.jsx";

function RegistoForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [mensagem, setMensagem] = useState("");
  const [tipoMensagem, setTipoMensagem] = useState("");

  const navigate = useNavigate();

  // Função para validar força da senha
  const validarSenhaForte = (senha) => {
    const temLetra = /[a-zA-Z]/.test(senha);
    const temNumero = /\d/.test(senha);
    const temEspecial = /[!@#$%^&*(),.?":{}|<>]/.test(senha);
    const tamanhoMinimo = senha.length >= 8;

    return temLetra && temNumero && temEspecial && tamanhoMinimo;
  };

  const handleSubmit = async (evento) => {
    evento.preventDefault();
    setMensagem("");

    // 1. Validar correspondência
    if (password !== confirmPassword) {
      setMensagem("As passwords não coincidem!");
      setTipoMensagem("erro");
      return;
    }

    // 2. Validar força da senha
    if (!validarSenhaForte(password)) {
      setMensagem(
        "A password é muito fraca. Deve ter pelo menos 8 caracteres, 1 letra, 1 número e 1 símbolo (ex: !@#)."
      );
      setTipoMensagem("erro");
      return;
    }

    try {
      const response = await fetch(
        "https://meu-backend-api-rohr.onrender.com/registo",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      if (response.status === 201) {
        setMensagem("Conta criada com sucesso! A redirecionar para o login...");
        setTipoMensagem("sucesso");

        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        const data = await response.json();
        setMensagem(data.message || "Erro ao criar conta.");
        setTipoMensagem("erro");
      }
    } catch (erro) {
      console.error("Erro de rede:", erro);
      setMensagem("Não foi possível ligar ao servidor.");
      setTipoMensagem("erro");
    }
  };

  return (
    <div className={styles.formCard}>
      <h2>Crie a sua conta</h2>
      <p>Comece de graça. Não é preciso cartão de crédito.</p>

      {/* Mensagens */}
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
        <div className={styles.passwordWrapper}>
          <input
            type={mostrarSenha ? "text" : "password"}
            id="password"
            placeholder="Mínimo 8 chars, letras e números"
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

        <label htmlFor="confirmPassword">Confirmar Password</label>
        <input
          type="password"
          id="confirmPassword"
          placeholder="Repita a password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        <button type="submit" className={styles.botaoLaranja}>
          Criar Conta Gratuita
        </button>
      </form>

      <div className={styles.divisor}>
        <h4 className={styles.Ou}>Ou</h4>
      </div>

      <GoogleLoginButton />

      <div className={styles.linkRegisto}>
        Já tem uma conta?
        <Link to="/login">Faça login</Link>
      </div>
    </div>
  );
}

export default RegistoForm;
