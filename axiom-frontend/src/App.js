import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import MainHero from './components/main/MainHero';
import FeaturedProducts from './components/main/FeaturedProducts';
import PromoBanner from './components/main/PromoBanner';
import Header from './components/main/Header';
import Products from './components/products/Products';
import Cart from './components/cart/Cart';
import Register from './components/register/Register';
import ProductDetails from './components/details/ProductDetails';
import { CartProvider } from './components/cart/CartContext';
import { AuthProvider, useAuth } from './components/AuthContext';
import AxiomInfo from './components/info/AxiomInfo';
import './App.css';
import Login from './components/login/Login';

function AppContent() {
  const { loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <CartProvider>
      <div className="App">
        <Header />
        <Routes>
              <Route path="/" element={<Navigate to="/mainAxiom" />} />
              <Route
                path="/mainAxiom"
                element={
                  <>
                    <MainHero />
                    <FeaturedProducts />
                    <PromoBanner />
                  </>
                }
              />
              <Route path="/products" element={<Products />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/products/:id" element={<ProductDetails />} />
              <Route path='/info' element={<AxiomInfo />} />
        </Routes>
      </div>
    </CartProvider>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default App;