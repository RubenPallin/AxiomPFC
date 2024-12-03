import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'; // Importar Navigate para redirección
import MainHero from './components/main/MainHero';
import FeaturedProducts from './components/main/FeaturedProducts';
import PromoBanner from './components/main/PromoBanner';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* Redirige automáticamente a /mainAxiom */}
        <Route path="/" element={<Navigate to="/mainAxiom" />} />

        {/* Ruta para /mainAxiom */}
        <Route path="/mainAxiom" element={
          <div className="App">
            <MainHero />
            <FeaturedProducts />
            <PromoBanner />
          </div>
        } />
      </Routes>
    </Router>
  );
}

export default App;