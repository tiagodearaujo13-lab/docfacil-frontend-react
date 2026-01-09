import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop.jsx";

// Layouts
import PublicLayout from "./components/PublicLayout.jsx";
import DashboardLayout from "./components/DashboardLayout.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

// Páginas Públicas
import LandingPage from "./pages/LandingPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegistoPage from "./pages/RegistoPage.jsx";
import Contacto from "./pages/Contacto.jsx"; // <--- NOVO
import Termos from "./pages/Termos.jsx"; // <--- NOVO
import Privacidade from "./pages/Privacidade.jsx"; // <--- NOVO
import RecuperarSenha from "./pages/RecuperarSenha.jsx";
import NovaSenha from "./pages/NovaSenha.jsx";
import NotificationBar from "./components/NotificationBar.jsx";

// Páginas do Dashboard (Privadas)
import DashboardHome from "./pages/DashboardHome.jsx";
import MeusDocumentos from "./pages/MeusDocumentos.jsx";
import Biblioteca from "./pages/Biblioteca.jsx";
import Configuracao from "./pages/Configuracao.jsx";
import Editor from "./pages/Editor.jsx";
import Planos from "./pages/Planos.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />{" "}
      {/* Garante que ao mudar de página, o scroll vai para o topo */}
      <NotificationBar />
      <Routes>
        {/* GRUPO 1: Rotas Públicas (Com Header e Footer da Landing Page) */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/registo" element={<RegistoPage />} />
          <Route path="/recuperar-senha" element={<RecuperarSenha />} />
          <Route path="/recuperar-senha" element={<RecuperarSenha />} />
          <Route path="/nova-senha" element={<NovaSenha />} />

          {/* Novas Páginas Legais e Suporte */}
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/termos" element={<Termos />} />
          <Route path="/privacidade" element={<Privacidade />} />
        </Route>

        {/* GRUPO 2: Rotas do Dashboard (Protegidas por Login) */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardHome />} />
          <Route path="biblioteca" element={<Biblioteca />} />
          <Route path="meus-documentos" element={<MeusDocumentos />} />
          <Route path="config" element={<Configuracao />} />
          <Route path="editor/:id" element={<Editor />} />
          <Route path="admin" element={<AdminDashboard />} />

          {/* Nova Página de Subscrição Interna */}
          <Route path="planos" element={<Planos />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
