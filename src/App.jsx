import { BrowserRouter, Routes, Route} from 'react-router-dom';

import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import LandingPage from './pages/LandingPage.jsx';
import LoginPage from './pages/LoginPage.jsx';

function App() {
  
  return (
    
    <BrowserRouter>
    
    <Header />

    <Routes>
      
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
   
    </Routes>

    <Footer />
    
    </BrowserRouter>
  );
}

export default App;