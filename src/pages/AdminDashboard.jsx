import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./AdminDashboard.module.css";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalDocs: 0,
    activeSubs: 0,
  });
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // ✅ CORREÇÃO: A função é criada PRIMEIRO
  const fetchDados = async () => {
    const token = localStorage.getItem("token");
    try {
      // 1. Buscar Estatísticas
      const resStats = await fetch(
        `${import.meta.env.VITE_API_URL}/admin/stats`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (resStats.status === 403) {
        throw new Error("Não autorizado");
      }
      const dataStats = await resStats.json();
      setStats(dataStats);

      // 2. Buscar Usuários
      const resUsers = await fetch(
        `${import.meta.env.VITE_API_URL}/admin/users`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const dataUsers = await resUsers.json();
      setUsers(dataUsers);
    } catch (err) {
      setError("Acesso Negado. Você não é administrador.");
      setTimeout(() => navigate("/dashboard"), 3000);
    } finally {
      setLoading(false);
    }
  };

  // ✅ CORREÇÃO: O useEffect chama a função DEPOIS
  useEffect(() => {
    fetchDados();
  }, []);

  if (loading)
    return (
      <div className={styles.pageBackground}>
        <div className={styles.loading}>
          🔄 A carregar Painel de Controlo...
        </div>
      </div>
    );

  if (error)
    return (
      <div className={styles.pageBackground}>
        <div className={styles.error}>⛔ {error}</div>
      </div>
    );

  return (
    <div className={styles.pageBackground}>
      <div className={styles.container}>
        <h1 className={styles.title}>🔐 Administração DocFacil</h1>

        {/* CARDS DE ESTATÍSTICAS */}
        <div className={styles.statsGrid}>
          <div className={styles.card}>
            <h3>Utilizadores</h3>
            <p className={styles.number}>{stats.totalUsers}</p>
          </div>
          <div className={styles.card}>
            <h3>Documentos Gerados</h3>
            <p className={styles.number}>{stats.totalDocs}</p>
          </div>
          <div className={`${styles.card} ${styles.cardHighlight}`}>
            <h3>Assinaturas Ativas</h3>
            <p className={styles.number}>{stats.activeSubs}</p>
          </div>
        </div>

        {/* TABELA DE UTILIZADORES */}
        <h2 className={styles.subtitle}>Últimos Registos</h2>
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Email</th>
                <th>Plano</th>
                <th>Data Registo</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td className={styles.idColumn}>#{user.id}</td>
                  <td className={styles.nameColumn}>
                    {user.nome || "Sem nome"}
                  </td>
                  <td>{user.email}</td>
                  <td>
                    <span className={`${styles.badge} ${styles[user.plano]}`}>
                      {user.plano ? user.plano.toUpperCase() : "FREE"}
                    </span>
                  </td>
                  <td>{user.data_registo}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
