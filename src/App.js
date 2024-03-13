import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Header from './pages/Header';
import Explication from './pages/Explication';
import Chargement from './pages/Chargement'

function App() {
  return (
    <div>
      <Router>
        <Header />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/analyse" element={<Chargement />} />
          <Route path="/explication/:topic" element={<Explication />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;