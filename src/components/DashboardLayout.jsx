import Sidebar from "./Sidebar.jsx";
import styles from "./DashboardLayout.module.css";

// children vai ser o menu lateral o menu principal do dashboard
function DashboardLayout({ children }) {
  return (
    <div className={styles.layout}>
      <div className={styles.sidebar}>
        <Sidebar />
      </div>

      <div className={styles.mainContent}>{children}</div>
    </div>
  );
}

export default DashboardLayout;
