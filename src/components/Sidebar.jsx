// Menu Dashboard
// 1. Trocámos 'Link' por 'NavLink' na importação
import { useNavigate, Link, NavLink } from "react-router-dom";
import styles from "./Sidebar.module.css";

function Sidebar() {
  // Ligar o gps para o Logout
  const navigate = useNavigate();

  // Função sair
  const handleLogout = () => {
    localStorage.removeItem("token");
    alert("Você saiu com sucesso!");
    navigate("/login");
  };

  // Esta função ajuda a escolher a classe CSS certa (Ativo ou Normal)
  const getLinkClass = ({ isActive }) => {
    return isActive ? styles.navLinkAtivo : styles.navLink;
  };

  return (
    <nav className={styles.sidebar}>
      {/* O Logo continua como Link normal pois não precisa de ficar "aceso" */}
      <Link to="/dashboard" className={styles.logo}>
        DocFacil.pt
      </Link>

      <ul className={styles.navList}>
        <li>
          {/* 2. Usamos NavLink e a função getLinkClass */}
          <NavLink to="/dashboard/biblioteca" className={getLinkClass}>
            <span>Biblioteca de Documentos</span>
          </NavLink>
        </li>

        <li>
          {/* 3. IMPORTANTE: Adicionei a propriedade 'end' aqui. 
             Isso impede que este botão acenda quando estás dentro da Biblioteca. 
             Ele só acende se for EXATAMENTE "/dashboard" */}
          <NavLink to="/dashboard" end className={getLinkClass}>
            <span>Meus Documentos</span>
          </NavLink>
        </li>

        <li>
          <NavLink to="/dashboard/config" className={getLinkClass}>
            <span>Configuração</span>
          </NavLink>
        </li>
      </ul>

      {/* O "Rodapé" Footer da Sidebar */}
      <div className={styles.sidebarFooter}>
        <button className={styles.botaoPlanos}>Ver Planos</button>

        {/* O Botão de "Sair" (Logout) */}
        <button onClick={handleLogout} className={styles.botaoSair}>
          <span>Sair</span>
        </button>
      </div>
    </nav>
  );
}

export default Sidebar;
