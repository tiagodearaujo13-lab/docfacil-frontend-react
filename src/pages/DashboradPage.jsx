import { useNavigate } from 'react-router-dom';
import styles from './Page.module.css';

function DashboardPage() {
    
   // Ligar a função navigate 
   const navigate = useNavigate();
  
   // A função de 'Sair'
   const handleLogout = () => {

    console.log("A deita fora a chave mestra (token)...");
    
    // Esviziar a gaveta Secreta
    localStorage.removeItem('token');

    alert("Você saiu com sucesso!");
    
    // Empurrar o utilizador de volta para a pagina de login
    navigate('/login');
   }
    
    
    
    return(
        <div className={styles.pageContainer}>
            <div style={{color: '#1a202c', textAlign: 'center'}}>
                <h1>Dashboard</h1>
                <p>Se Aparecer, deu certo!</p>

                <br />
                 {/* O BOTÃO DE 'SAIR' */}
                 <button 
                 onClick={handleLogout}
                 className={styles.botaoLaranja}
                 >
                    Sair (Logout)
                 </button>
            </div>
        </div>
    );
}

export default DashboardPage;