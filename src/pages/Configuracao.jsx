import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Configuracao.module.css";

function Configuracao() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [statusMsg, setStatusMsg] = useState("");
  const [loadingPortal, setLoadingPortal] = useState(false); // Novo estado
  const navigate = useNavigate();

  useEffect(() => {
    const carregarPerfil = async () => {
      try {
        const token = localStorage.getItem("token");
        const resposta = await fetch(
          "https://meu-backend-api-rohr.onrender.com/perfil",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (resposta.ok) {
          const dados = await resposta.json();
          setNome(dados.nome || "");
          setEmail(dados.email);
        }
      } catch (erro) {
        console.error(erro);
      }
    };
    carregarPerfil();
  }, []);

  const handleSalvar = async (e) => {
    e.preventDefault();
    setStatusMsg("A guardar...");

    if (password && password !== confirmPassword) {
      alert("As passwords não coincidem!");
      setStatusMsg("");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const resposta = await fetch(
        "https://meu-backend-api-rohr.onrender.com/perfil",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ nome, password: password || undefined }),
        }
      );

      if (resposta.ok) {
        setStatusMsg("✅ Dados atualizados!");
        setPassword("");
        setConfirmPassword("");
        setTimeout(() => setStatusMsg(""), 3000);
      } else {
        setStatusMsg("❌ Erro ao atualizar.");
      }
    } catch (erro) {
      setStatusMsg("Erro de conexão.");
    }
  };

  // --- NOVA FUNÇÃO: ABRIR PORTAL STRIPE ---
  const handleGerirSubscricao = async () => {
    setLoadingPortal(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        "https://meu-backend-api-rohr.onrender.com/portal-cliente",
        {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (res.ok) {
        const data = await res.json();
        window.location.href = data.url; // Vai para o Stripe
      } else {
        // MUDANÇA AQUI: Mensagem mais clara
        if (res.status === 404) {
          alert(
            "Ainda não tem uma assinatura ativa para gerir. \n\nVá à página de Planos para aderir ao Pro."
          );
        } else {
          alert("Erro ao conectar ao Stripe. Tente novamente.");
        }
      }
    } catch (error) {
      alert("Erro de conexão.");
    } finally {
      setLoadingPortal(false);
    }
  };

  const handleApagarConta = async () => {
    if (
      window.confirm("TEM A CERTEZA? Esta ação apaga tudo permanentemente.")
    ) {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(
          "https://meu-backend-api-rohr.onrender.com/perfil",
          {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (res.ok) {
          localStorage.removeItem("token");
          navigate("/");
        }
      } catch (erro) {
        alert("Erro ao apagar.");
      }
    }
  };

  return (
    <div className={styles.pageBackground}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2>⚙️ Configuração da Conta</h2>
          <p>Gerencie os seus dados e subscrição.</p>
        </div>

        <div className={styles.cardConfig}>
          <form onSubmit={handleSalvar}>
            <h3 className={styles.subTitulo}>Dados Pessoais</h3>

            <div className={styles.grupoInput}>
              <label>Email</label>
              <input
                type="email"
                value={email}
                disabled
                className={styles.inputDisabled}
              />
            </div>

            <div className={styles.grupoInput}>
              <label>Nome Completo</label>
              <input
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                className={styles.input}
              />
            </div>

            <hr className={styles.divisor} />

            <h3 className={styles.subTitulo}>Segurança</h3>
            <div className={styles.row}>
              <div className={styles.grupoInput}>
                <label>Nova Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={styles.input}
                  placeholder="Nova senha"
                />
              </div>
              <div className={styles.grupoInput}>
                <label>Confirmar</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={styles.input}
                  placeholder="Repita a senha"
                />
              </div>
            </div>

            <div className={styles.footerAcoes}>
              <span className={styles.status}>{statusMsg}</span>
              <button type="submit" className={styles.botaoSalvar}>
                💾 Guardar
              </button>
            </div>
          </form>
        </div>

        {/* --- NOVA SECÇÃO: GESTÃO DE ASSINATURA --- */}
        <div className={styles.cardSubscription}>
          <div className={styles.subInfo}>
            <h3>💳 A sua Subscrição</h3>
            <p>Faça download de faturas, mude o cartão ou cancele o plano.</p>
          </div>
          <button
            onClick={handleGerirSubscricao}
            className={styles.botaoGerir}
            disabled={loadingPortal}
          >
            {loadingPortal ? "A carregar..." : "Gerir Subscrição / Faturas"}
          </button>
        </div>

        {/* Zona de Perigo */}
        <div className={styles.dangerZone}>
          <h3>🚨 Zona de Perigo</h3>
          <p>Ao apagar a conta, todos os documentos serão removidos.</p>
          <button onClick={handleApagarConta} className={styles.botaoApagar}>
            Apagar Minha Conta
          </button>
        </div>
      </div>
    </div>
  );
}

export default Configuracao;
