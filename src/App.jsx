import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegistoPage from "./pages/RegistoPage.jsx";
import DashboardLayout from "./components/DashboardLayout.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import PublicLayout from "./components/PublicLayout.jsx";

// Páginas do Dashboard
import DashboardHome from "./pages/DashboardHome.jsx"; // <--- NOVO IMPORT
import MeusDocumentos from "./pages/MeusDocumentos.jsx"; // Nota: Verifique se moveu para 'pages' ou mantenha 'components'
import Biblioteca from "./pages/Biblioteca.jsx";
import Configuracao from "./pages/Configuracao.jsx";
import Editor from "./pages/Editor.jsx";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />

      <Routes>
        {/* GRUPO 1: Rotas Públicas (Com Header e Footer) */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/registo" element={<RegistoPage />} />
        </Route>

        {/* GRUPO 2: Rotas do Dashboard (Protegidas) */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          {/* Rota Padrão: VISÃO GERAL (Dashboard Home) */}
          <Route index element={<DashboardHome />} />

          {/* Rota: BIBLIOTECA */}
          <Route path="biblioteca" element={<Biblioteca />} />

          {/* Rota: MEUS DOCUMENTOS (Agora tem o seu próprio caminho) */}
          <Route path="meus-documentos" element={<MeusDocumentos />} />

          {/* Rota: CONFIGURAÇÃO */}
          <Route path="config" element={<Configuracao />} />

          {/* Rota: EDITOR */}
          <Route path="editor/:id" element={<Editor />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
