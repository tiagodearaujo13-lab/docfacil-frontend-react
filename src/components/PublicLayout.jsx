import { Outlet } from "react-router-dom";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import CookieBanner from "./CookieBanner.jsx"; // <--- IMPORTAR

function PublicLayout() {
  return (
    <>
      <Header />
      {/* O Outlet é onde o React vai encaixar a LandingPage, Login ou Registo */}
      <Outlet />
      <Footer />

      {/* O Banner fica aqui, flutuando sobre tudo */}
      <CookieBanner />
    </>
  );
}

export default PublicLayout;
