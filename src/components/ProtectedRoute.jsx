// Navigate é a ferramenta que redireciona o utilizador (usuario,cliente)
import { Navigate } from 'react-router-dom';

//  O 'children' é a sala ( VIP  <DashboardPage /> ) que estamos a proteger
function ProtectedRoute({ children }) {
    
    // 1. Revistar o localStorage, vá á gaveta secreta ( localStorage ) e leia ( getItem ) a chave ( token ) 
    const token = localStorage.getItem('token');

    // 2. Lógica if/else
    if (!token) {
        // Não ( ! ) tem a chave ( token ) ?, então, expulse-o!
        console.log("Acesso Negado! A chave (token) não existe. A empurrar para /login... ");

        // Desenhe o componete <Navigate>, que empurra o utilizador para a (to) /login
        // 'replace' sígnifica, não o deixes voltar atrás no botao Voltar do navegador
        return <Navigate to="/login" replace />;
    }    
    
    // 3. Sucesso! O utilizador TEM a cheve ( token ), pode entrar.
    // Desenhe a sala Vip o { children } que será o <DashboardPage />
    return children;
}  

export default ProtectedRoute;