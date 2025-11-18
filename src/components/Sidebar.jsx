// Menu Dashboard
import { useNavigate, Link } from 'react-router-dom';
import styles from './Sidebar.module.css';

function Sidebar() {
    // Ligar o gps para o Logout
    const navigate = useNavigate();

    // Função sair
    const handleLogout = () => {

        localStorage.removeItem('token');
        alert("Você saiu com sucesso!");
        navigate('/login');
    };

    return (
        
        <nav className={styles.sidebar}>
            {/* O Logo (que clicado, leva para o Dashboard) */}
            <Link to="/dashboard" className={styles.logo}>
            DocFacil.pt
            </Link>
             
            <ul className={styles.navList}>
                <li>
                   
                    <Link to="/dashboard/biblioteca" className={styles.navLink}>
                    <span>Biblioteca de Documentos</span>
                    </Link>
                </li>
            
                <li>
                   <Link to="/dashboard" className={styles.navLinkAtivo}>
                          <span>Meus Documentos</span>
                   </Link>
                </li>          
                <li>
                    <Link to="/dashboard/config" className={styles.navLink}>
                    <span>Configuração</span>
                    </Link>
                </li>
            </ul>
            
            {/* O "Rodapé" Footer da Sidebar */}
            <div className={styles.sidebarFooter}>
                
                <button className={styles.botaoPlanos}>
                   Ver Planos
                </button>

                {/* O Botão de "Sair" (Logout) */}
                <button onClick={handleLogout} className={styles.botaoSair}>
                    <span>Sair</span>
                </button>
            
            </div>
        </nav>
    );
}

export default Sidebar;