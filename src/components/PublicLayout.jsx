import { Outlet } from "react-router-dom";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";

function PublicLayout() {
  return (
    <>
      <Header />
      {/* O Outlet é onde o React vai encaixar a LandingPage, Login ou Registo */}
      <Outlet />
      <Footer />
    </>
  );
}

export default PublicLayout;
