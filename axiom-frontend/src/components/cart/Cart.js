import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Cart.css';

const Cart = () => {
  const userId = 1; // Reemplazar con el ID del usuario autenticado
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Cargar los productos del carrito al iniciar
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get(`/cart/${userId}`);
        setCartItems(response.data);
      } catch (error) {
        console.error('Error al cargar el carrito:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, [userId]);

  // Eliminar un producto del carrito
  const handleRemove = async (cartItemId) => {
    try {
      await axios.delete(`/cart/${cartItemId}`);
      setCartItems(cartItems.filter((item) => item.id !== cartItemId));
    } catch (error) {
      console.error('Error al eliminar el producto:', error);
    }
  };

  // Finalizar la compra
  const handleCheckout = async () => {
    try {
      await axios.post(`/cart/checkout/${userId}`);
      alert('Compra realizada con éxito');
      setCartItems([]); // Vaciar el carrito
    } catch (error) {
      console.error('Error al finalizar la compra:', error);
    }
  };

  if (loading) return <p>Cargando carrito...</p>;

  return (
    <div className="cart">
      <h2>Carrito de Compras</h2>
      {cartItems.length === 0 ? (
        <p>Tu carrito está vacío</p>
      ) : (
        <div>
          <ul className="cart-items">
            {cartItems.map((item) => (
              <li key={item.id} className="cart-item">
                <img src={item.product.image} alt={item.product.name} />
                <div>
                  <p>{item.product.name}</p>
                  <p>Cantidad: {item.quantity}</p>
                  <button onClick={() => handleRemove(item.id)}>Eliminar</button>
                </div>
              </li>
            ))}
          </ul>
          <button className="checkout-button" onClick={handleCheckout}>
            Comprar ahora
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;