import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import LandingPage from "./pages/LandingPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegistoPage from "./pages/RegistoPage.jsx";
import DashboardLayout from "./components/DashboardLayout.jsx";
import MeusDocumentos from "./components/MeusDocumentos.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />

      <Header />

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registo" element={<RegistoPage />} />
        <Route
          path="/dashboard" // Isto "diz" ao "Porteiro": "Quando alguém tentar ir para /dashboard, primeiro 'chame' o <ProtectedRoute />. Só 'desenhe' o <DashboardPage /> SE o 'Segurança' o 'devolver' (o return children)."
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <MeusDocumentos />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
