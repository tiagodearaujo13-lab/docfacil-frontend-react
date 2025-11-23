import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./DashboardHome.module.css";

function DashboardHome() {
  const [nome, setNome] = useState("Utilizador");
  const [stats, setStats] = useState({ totalDocs: 0, plano: "Grátis" });
  const [recentes, setRecentes] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const carregarDados = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        // 1. Buscar Nome do Utilizador
        const resPerfil = await fetch(
          "https://meu-backend-api-rohr.onrender.com/perfil",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (resPerfil.ok) {
          const dataPerfil = await resPerfil.json();
          setNome(dataPerfil.nome || "Utilizador");
        }

        // 2. Buscar Documentos para Estatísticas
        const resDocs = await fetch(
          "https://meu-backend-api-rohr.onrender.com/meus-documentos",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (resDocs.ok) {
          const lista = await resDocs.json();

          // Calcular Estatísticas
          setStats({
            totalDocs: lista.length,
            plano: "Grátis", // Futuramente virá do backend
          });

          // Pegar os últimos 3 documentos
          const ultimos = lista.sort((a, b) => b.id - a.id).slice(0, 3);
          setRecentes(ultimos);
        }
      } catch (erro) {
        console.error("Erro ao carregar dashboard:", erro);
      } finally {
        setCarregando(false);
      }
    };

    carregarDados();
  }, []);

  const getIcone = (tipo) => {
    if (tipo?.includes("imobiliario") || tipo?.includes("cpcv")) return "🏠";
    if (tipo?.includes("trabalho")) return "👔";
    if (tipo?.includes("veiculo")) return "🚗";
    return "📄";
  };

  return (
    <div className={styles.pageBackground}>
      <div className={styles.container}>
        {/* --- SECÇÃO DE BOAS-VINDAS --- */}
        <div className={styles.welcomeCard}>
          <div>
            <h1>Olá, {nome}! 👋</h1>
            <p>Bem-vindo ao seu painel de controlo jurídico.</p>
          </div>
          <div className={styles.dataHoje}>
            {new Date().toLocaleDateString("pt-PT", {
              weekday: "long",
              day: "numeric",
              month: "long",
            })}
          </div>
        </div>

        {/* --- GRID DE ESTATÍSTICAS --- */}
        <div className={styles.statsGrid}>
          {/* CARTÃO CLICÁVEL: DOCUMENTOS CRIADOS */}
          <div
            className={styles.statCard}
            onClick={() => navigate("/dashboard/meus-documentos")}
            style={{ cursor: "pointer" }} // O cursor muda para indicar que é clicável
          >
            <span className={styles.statIcon}>📂</span>
            <div className={styles.statInfo}>
              <h3>{stats.totalDocs}</h3>
              <p>Documentos Criados</p>
            </div>
          </div>

          <div className={styles.statCard}>
            <span className={styles.statIcon}>⭐</span>
            <div className={styles.statInfo}>
              <h3>{stats.plano}</h3>
              <p>Plano Atual</p>
            </div>
            <button
              className={styles.btnUpgrade}
              onClick={() => navigate("/dashboard/planos")}
            >
              Upgrade
            </button>
          </div>

          <div className={styles.statCard}>
            <span className={styles.statIcon}>🚀</span>
            <div className={styles.statInfo}>
              <h3>Ativo</h3>
              <p>Estado da Conta</p>
            </div>
          </div>
        </div>

        {/* --- AÇÕES RÁPIDAS E RECENTES --- */}
        <div className={styles.contentRow}>
          {/* Lado Esquerdo: Criar Novo */}
          <div className={styles.actionSection}>
            <h3>O que deseja fazer hoje?</h3>
            <div className={styles.actionButtons}>
              <Link
                to="/dashboard/biblioteca"
                className={styles.btnActionPrimary}
              >
                + Criar Novo Documento
              </Link>
              <Link
                to="/dashboard/config"
                className={styles.btnActionSecondary}
              >
                ⚙️ Editar Meu Perfil
              </Link>
            </div>
          </div>

          {/* Lado Direito: Recentes */}
          <div className={styles.recentSection}>
            <div className={styles.sectionHeader}>
              <h3>Trabalhos Recentes</h3>
              <Link
                to="/dashboard/meus-documentos"
                className={styles.linkVerTodos}
              >
                Ver todos
              </Link>
            </div>

            {carregando ? (
              <p>A carregar...</p>
            ) : recentes.length === 0 ? (
              <div className={styles.emptyRecents}>
                <p>Ainda não tem documentos.</p>
              </div>
            ) : (
              <div className={styles.recentList}>
                {recentes.map((doc) => (
                  <div
                    key={doc.id}
                    className={styles.recentItem}
                    onClick={() => navigate(`/dashboard/editor/${doc.id}`)}
                  >
                    <span className={styles.miniIcon}>
                      {getIcone(doc.tipo_documento)}
                    </span>
                    <div className={styles.recentInfo}>
                      <h4>{doc.titulo}</h4>
                      <span>{doc.tipo_documento}</span>
                    </div>
                    <span className={styles.arrow}>→</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardHome;
