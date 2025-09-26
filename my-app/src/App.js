import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import { CartProvider } from './context/CartContext';
import Main from './pages/main';
import Merch from './pages/merch';
import ProductDetail from './pages/ProductDetail';
import News from './pages/news';
import NewsDetail from './pages/NewsDetail';
import Hiring from './pages/hiring';
import JobDetail from './pages/JobDetail';
import Contact from './pages/contact';
import Games from './pages/games';
import GameDetail from './pages/GameDetail';
import Wishlist from './pages/Wishlist';
import Dashboard from './pages/dashboard';
import GamingNews from './pages/gamingnews';
import Success from './pages/success';
import Soon from './pages/soon';
import AdminLogin from './pages/Adminlogin';

function App() {
  return (
    <CartProvider>
      <Router>
          <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/admin-login" element={<AdminLogin />} />
              <Route path="/" element={<Main />} />
              <Route path="/Games" element={<Games />} />
              <Route path="/games/:id" element={<GameDetail />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/news" element={<News />} />
              <Route path="/news/:id" element={<NewsDetail />} />
              <Route path="/merch" element={<Merch />} />
              <Route path="/merch/:id" element={<ProductDetail />} />
              <Route path="/product/:productId" element={<ProductDetail />} />
              <Route path="/hiring" element={<Hiring />} />
              <Route path="/jobs/:id" element={<JobDetail />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/gamingnews" element={<GamingNews />} />
              <Route path="/success" element={<Success />} />
              <Route path="soon" element={<Soon />} />
          </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
