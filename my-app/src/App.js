import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Main from './pages/main';
import Merch from './pages/merch';
import News from './pages/news';
import Hiring from './pages/hiring';
import Contact from './pages/contact';
import Games from './pages/games';
import Dashboard from './pages/dashboard';
import GamingNews from './pages/gamingnews';
import Success from './pages/success';
import Soon from './pages/soon';
import AdminLogin from './pages/Adminlogin';
function App() {
  return (
    <Router>
        <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="/" element={<Main />} />
            <Route path="/Games" element={<Games />} />
            <Route path="/news" element={<News />} />
            <Route path="/merch" element={<Merch />} />
            <Route path="/hiring" element={<Hiring />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/gamingnews" element={<GamingNews />} />
            <Route path="/success" element={<Success />} />
            <Route path="soon" element={<Soon />} />
        </Routes>
    </Router>
);
}

export default App;
