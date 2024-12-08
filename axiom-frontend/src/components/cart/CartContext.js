import React, { useState, useEffect, createContext, useContext } from 'react';
import axios from 'axios';
import { useAuth } from '../AuthContext';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchCartItems(user.id);
    }
  }, [user]);

  const fetchCartItems = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:3000/carts/${userId}`);
      setCartItems(response.data);
    } catch (error) {
      console.error('Error al obtener el carrito:', error);
    }
  };

  const addToCart = (item) => {
    setCartItems(prevItems => [...prevItems, item]);
  };

  const removeFromCart = async (cartItemId) => {
    try {
      await axios.delete(`http://localhost:3000/carts/${cartItemId}`);
      setCartItems(prevItems => prevItems.filter(item => item.id !== cartItemId));
    } catch (error) {
      console.error('Error al eliminar del carrito:', error);
    }
  };

  const updateCartItemQuantity = async (cartItemId, newQuantity) => {
    try {
      await axios.patch(`http://localhost:3000/carts/${cartItemId}`, { quantity: newQuantity });
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
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateCartItemQuantity }}>
      {children}
    </CartContext.Provider>
  );
};

// Exporta el hook useCart
export const useCart = () => {
  return useContext(CartContext);
};