import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'; // Importar Navigate para redirección
import MainHero from './components/main/MainHero';
import FeaturedProducts from './components/main/FeaturedProducts';
import PromoBanner from './components/main/PromoBanner';
import Header from './components/main/Header';
import Products from './components/products/Products';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Header /> {/* Colocamos la cabecera arriba */}

        <Routes>
          {/* Redirige automáticamente a /mainAxiom */}
          <Route path="/" element={<Navigate to="/mainAxiom" />} />

          {/* Ruta para /mainAxiom */}
          <Route path="/mainAxiom" element={
            <div>
              <MainHero />
              <FeaturedProducts />
              <PromoBanner />
            </div>
          } />
          <Route path="/products" element={<Products />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;