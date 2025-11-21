import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar.jsx";
import styles from "./DashboardLayout.module.css";

function DashboardLayout() {
  return (
    <div className={styles.layoutContainer}>
      {/* Lado Esquerdo: Menu Fixo */}
      <div className={styles.sidebarArea}>
        <Sidebar />
      </div>

      {/* Lado Direito: Conteúdo Variável (Onde as páginas aparecem) */}
      <div className={styles.contentArea}>
        <Outlet />
      </div>
    </div>
  );
}

export default DashboardLayout;
