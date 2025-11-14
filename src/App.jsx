import { BrowserRouter, Routes, Route} from 'react-router-dom';

import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import LandingPage from './pages/LandingPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import RegistoPage from './pages/RegistoPage.jsx';
import ScrollToTop from './components/ScrollToTop.jsx';

function App() {
  
  return (
    
    <BrowserRouter>

      <ScrollToTop />
    
       <Header />

       <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registo" element={<RegistoPage />} />
       </Routes>

       <Footer />
    
    </BrowserRouter>
  );
}

export default App;