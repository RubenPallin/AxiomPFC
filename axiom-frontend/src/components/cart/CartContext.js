import React, { useState, useEffect, createContext, useContext, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../config/axiosConfig';
import { useAuth } from '../AuthContext';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  const fetchCartItems = useCallback(async () => {
    if (loading) return;
    
    if (!user) {
      console.log('No user logged in');
      return;
    }
    
    try {
      const response = await axios.get(`/carts/${user.id}`);
      console.log('Cart items:', response.data);
      setCartItems(response.data);
    } catch (error) {
      console.error('Error al obtener el carrito:', error);
    }
  }, [user, loading]);

  useEffect(() => {
    fetchCartItems();
  }, [fetchCartItems]);

  const addToCart = async (item) => {
    if (!user) {
      console.log('No user logged in');
      navigate('/login');
      return;
    }

    try {
      const response = await axios.post('/carts', {
        userId: user.id,
        productId: item.id,
        quantity: 1,
      });
      console.log('Added to cart:', response.data);
      await fetchCartItems();
    } catch (error) {
      console.error('Error al añadir al carrito:', error);
    }
  };

  const removeFromCart = async (cartItemId) => {
    try {
      await axios.delete(`/carts/${cartItemId}`);
      setCartItems(prevItems => prevItems.filter(item => item.id !== cartItemId));
    } catch (error) {
      console.error('Error al eliminar del carrito:', error);
    }
  };

  const updateCartItemQuantity = async (cartItemId, newQuantity) => {
    try {
      await axios.patch(`/carts/${cartItemId}`, { quantity: newQuantity });
      setCartItems(prevItems =>
        prevItems.map(item =>
          item.id === cartItemId ? { ...item, quantity: newQuantity } : item
        )
      );
    } catch (error) {
      console.error('Error al actualizar la cantidad:', error);
    }
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateCartItemQuantity, fetchCartItems }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};