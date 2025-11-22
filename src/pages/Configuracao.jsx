import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Configuracao.module.css";

function Configuracao() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [statusMsg, setStatusMsg] = useState("");
  const navigate = useNavigate();

  // 1. Carregar dados
  useEffect(() => {
    const carregarPerfil = async () => {
      try {
        const token = localStorage.getItem("token");
        const resposta = await fetch("http://localhost:3000/perfil", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (resposta.ok) {
          const dados = await resposta.json();
          setNome(dados.nome || "");
          setEmail(dados.email);
        }
      } catch (erro) {
        console.error("Erro de conexão:", erro);
      }
    };
    carregarPerfil();
  }, []);

  // 2. Salvar Alterações
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
      const resposta = await fetch("http://localhost:3000/perfil", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          nome: nome,
          password: password || undefined,
        }),
      });

      if (resposta.ok) {
        setStatusMsg("✅ Dados atualizados com sucesso!");
        setPassword("");
        setConfirmPassword("");
        setTimeout(() => setStatusMsg(""), 3000);
      } else {
        setStatusMsg("❌ Erro ao atualizar.");
      }
    } catch (erro) {
      console.error(erro);
      setStatusMsg("Erro de conexão.");
    }
  };

  // 3. APAGAR CONTA (NOVO)
  const handleApagarConta = async () => {
    const confirmacao = window.confirm(
      "TEM A CERTEZA? Esta ação é irreversível. Todos os seus documentos serão apagados para sempre."
    );

    if (confirmacao) {
      try {
        const token = localStorage.getItem("token");
        const resposta = await fetch("http://localhost:3000/perfil", {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        });

        if (resposta.ok) {
          alert("A sua conta foi apagada. Obrigado por ter usado o DocFacil.");
          localStorage.removeItem("token"); // Limpa a sessão
          navigate("/"); // Manda para a Home pública
        } else {
          alert("Erro ao apagar conta. Tente novamente.");
        }
      } catch (erro) {
        console.error(erro);
        alert("Erro de conexão.");
      }
    }
  };

  return (
    <div className={styles.pageBackground}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2>⚙️ Configuração da Conta</h2>
          <p>Gerencie os seus dados pessoais e segurança.</p>
        </div>

        <div className={styles.cardConfig}>
          <form onSubmit={handleSalvar}>
            <h3 className={styles.subTitulo}>Dados Pessoais</h3>

            <div className={styles.grupoInput}>
              <label>Email (Não editável)</label>
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
                placeholder="O seu nome..."
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                className={styles.input}
              />
            </div>

            <hr className={styles.divisor} />

            <h3 className={styles.subTitulo}>Alterar Password</h3>
            <p className={styles.avisoPequeno}>
              Deixe em branco se não quiser alterar.
            </p>

            <div className={styles.row}>
              <div className={styles.grupoInput}>
                <label>Nova Password</label>
                <input
                  type="password"
                  placeholder="Nova senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={styles.input}
                />
              </div>

              <div className={styles.grupoInput}>
                <label>Confirmar Password</label>
                <input
                  type="password"
                  placeholder="Repita a senha"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={styles.input}
                />
              </div>
            </div>

            <div className={styles.footerAcoes}>
              <span className={styles.status}>{statusMsg}</span>
              <button type="submit" className={styles.botaoSalvar}>
                💾 Guardar Alterações
              </button>
            </div>
          </form>
        </div>

        {/* --- ZONA DE PERIGO (NOVO) --- */}
        <div className={styles.dangerZone}>
          <h3>🚨 Zona de Perigo</h3>
          <p>
            Ao apagar a conta, todos os seus documentos e dados serão removidos
            permanentemente.
          </p>
          <button onClick={handleApagarConta} className={styles.botaoApagar}>
            Apagar Minha Conta
          </button>
        </div>
      </div>
    </div>
  );
}

export default Configuracao;
