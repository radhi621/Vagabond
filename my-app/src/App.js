import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Main from './pages/main';
import Merch from './pages/merch';
import News from './pages/news';
import Hiring from './pages/hiring';
import Contact from './pages/contact';
import Games from './pages/games';

function App() {
  return (
    <Router>
        <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/Games" element={<Games />} />
            <Route path="/news" element={<News />} />
            <Route path="/merch" element={<Merch />} />
            <Route path="/hiring" element={<Hiring />} />
            <Route path="/contact" element={<Contact />} />
        </Routes>
    </Router>
);
}

export default App;
