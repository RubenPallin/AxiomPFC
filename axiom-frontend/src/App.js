import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './components/main/Header';
import MainHero from './components/main/MainHero';
import FeaturedProducts from './components/main/FeaturedProducts';
import PromoBanner from './components/main/PromoBanner';
import Products from './components/products/Products';
import ProductDetails from './components/products/ProductDetails';
import Cart from './components/cart/Cart';

import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Header /> 
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
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;