import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import { CartProvider } from './context/CartContext';
import Main from './pages/main';
import Merch from './pages/merch';
import ProductDetail from './pages/ProductDetail';
import News from './pages/news';
import Hiring from './pages/hiring';
import Contact from './pages/contact';
import Games from './pages/games';
import Dashboard from './pages/dashboard';
import GamingNews from './pages/gamingnews';
import Success from './pages/success';
import Soon from './pages/soon';
import AdminLogin from './pages/Adminlogin';
import Game1overview from './pages/games/game1overview';
import Game2overview from './pages/games/game2overview';
import Game3overview from './pages/games/game3overview';
import Game4overview from './pages/games/game4overview';
import Job1 from './pages/jobs/job1';
import Job2 from './pages/jobs/job2';
import Job3 from './pages/jobs/job3';

function App() {
  return (
    <CartProvider>
      <Router>
          <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/admin-login" element={<AdminLogin />} />
              <Route path="/" element={<Main />} />
              <Route path="/Games" element={<Games />} />
              <Route path="/news" element={<News />} />
              <Route path="/merch" element={<Merch />} />
              <Route path="/product/:productId" element={<ProductDetail />} />
              <Route path="/hiring" element={<Hiring />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/gamingnews" element={<GamingNews />} />
              <Route path="/success" element={<Success />} />
              <Route path="soon" element={<Soon />} />
              <Route path="/game1overview" element={<Game1overview />} />
              <Route path="/game2overview" element={<Game2overview />} />
              <Route path="/game3overview" element={<Game3overview />} />
              <Route path="/game4overview" element={<Game4overview />} />
              <Route path="/job1" element={<Job1 />} />
              <Route path="/job2" element={<Job2 />} />
              <Route path="/job3" element={<Job3 />} />
          </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
