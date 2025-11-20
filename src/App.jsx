import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegistoPage from "./pages/RegistoPage.jsx";
import DashboardLayout from "./components/DashboardLayout.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import MeusDocumentos from "./components/MeusDocumentos.jsx";
import Biblioteca from "./components/Biblioteca.jsx";
import Configuracao from "./components/Configuracao.jsx";
import PublicLayout from "./components/PublicLayout.jsx";

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

        {/* GRUPO 2: Rotas do Dashboard (SEM Header e Footer globais, só com Sidebar) */}

        {/* Rota: /dashboard -> Meus Documentos */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <MeusDocumentos />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        {/* Rota: /dashboard/biblioteca -> Biblioteca */}
        <Route
          path="/dashboard/biblioteca"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Biblioteca />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        {/* Rota: /dashboard/config -> Configuração */}
        <Route
          path="/dashboard/config"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Configuracao />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
