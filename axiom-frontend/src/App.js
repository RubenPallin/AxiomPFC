import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import MainHero from './components/main/MainHero';
import FeaturedProducts from './components/main/FeaturedProducts';
import PromoBanner from './components/main/PromoBanner';
import Header from './components/main/Header';
import Products from './components/products/Products';
import Cart from './components/cart/Cart';
import Register from './components/register/Register';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
      {!['/login', '/register'].includes(window.location.pathname) && <Header />}
        
        <Routes>
          <Route path="/" element={<Navigate to="/mainAxiom" />} />
          <Route
            path="/mainAxiom"
            element={
              <div>
                <MainHero />
                <FeaturedProducts />
                <PromoBanner />
              </div>
            }
          />
          <Route path="/products" element={<Products />} />
          <Route
            path="/cart"
            element={
                <Cart />
            }
          />

          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;