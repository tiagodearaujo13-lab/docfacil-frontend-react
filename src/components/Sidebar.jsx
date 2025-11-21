import { useState } from "react";
import { useNavigate, Link, NavLink } from "react-router-dom";
import styles from "./Sidebar.module.css";

function Sidebar() {
  const navigate = useNavigate();
  const [menuAberto, setMenuAberto] = useState(false);

  const handleLogout = () => {
    // Lógica de logout
    localStorage.removeItem("token");
    navigate("/login");
  };

  const getLinkClass = ({ isActive }) => {
    return isActive ? styles.navLinkAtivo : styles.navLink;
  };

  // Função para fechar o menu automaticamente quando clica num link (no telemóvel)
  const fecharMenu = () => setMenuAberto(false);

  return (
    <nav className={styles.sidebar}>
      {/* --- CABEÇALHO MOBILE (Logo + Botão Menu) --- */}
      <div className={styles.mobileHeader}>
        <Link to="/dashboard" className={styles.logo} onClick={fecharMenu}>
          DocFacil.pt
        </Link>

        {/* O Botão Hambúrguer (Só aparece no telemóvel) */}
        <button
          className={styles.hamburger}
          onClick={() => setMenuAberto(!menuAberto)}
        >
          {menuAberto ? "✖" : "☰"}
        </button>
      </div>

      {/* --- A LISTA DE LINKS --- */}
      <div
        className={`${styles.menuContainer} ${
          menuAberto ? styles.mostrarMenu : ""
        }`}
      >
        <ul className={styles.navList}>
          {/* NOVO LINK: INÍCIO */}
          <li>
            <NavLink
              to="/dashboard"
              end // 'end' garante que este link só fica ativo na raiz exata
              className={getLinkClass}
              onClick={fecharMenu}
            >
              <span>🏠 Início</span>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/dashboard/biblioteca"
              className={getLinkClass}
              onClick={fecharMenu}
            >
              <span>📚 Biblioteca</span>
            </NavLink>
          </li>

          {/* LINK ATUALIZADO: MEUS DOCUMENTOS */}
          <li>
            <NavLink
              to="/dashboard/meus-documentos"
              className={getLinkClass}
              onClick={fecharMenu}
            >
              <span>📂 Meus Documentos</span>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/dashboard/config"
              className={getLinkClass}
              onClick={fecharMenu}
            >
              <span>⚙️ Configuração</span>
            </NavLink>
          </li>
        </ul>

        <div className={styles.sidebarFooter}>
          <button className={styles.botaoPlanos}>Ver Planos</button>
          <button onClick={handleLogout} className={styles.botaoSair}>
            <span>Sair</span>
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Sidebar;
