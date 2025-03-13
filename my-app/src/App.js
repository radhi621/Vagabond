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
function App() {
  return (
    <Router>
        <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/" element={<Main />} />
            <Route path="/Games" element={<Games />} />
            <Route path="/news" element={<News />} />
            <Route path="/merch" element={<Merch />} />
            <Route path="/hiring" element={<Hiring />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/gamingnews" element={<GamingNews />} />
        </Routes>
    </Router>
);
}

export default App;
