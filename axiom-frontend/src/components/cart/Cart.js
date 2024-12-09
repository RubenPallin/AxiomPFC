import React, { useEffect, useState } from 'react';
import { useCart } from './CartContext';
import { useAuth } from '../AuthContext';
import './Cart.css';

const Cart = () => {
  const { cartItems, removeFromCart, updateCartItemQuantity, fetchCartItems } = useCart();
  const { user } = useAuth();
  const [paymentMessage, setPaymentMessage] = useState('');

  useEffect(() => {
    if (user) {
      fetchCartItems(user.id);
    }
  }, [user, fetchCartItems]);

  const handleRemove = async (itemId) => {
    try {
      await removeFromCart(itemId);
    } catch (error) {
      console.error('Error al eliminar el producto del carrito:', error);
    }
  };

  // Función que simula el pago
  const handleProceedToPayment = () => {
    setPaymentMessage('Pago ficticio realizado!');
  };

  const handleQuantityChange = async (itemId, newQuantity) => {
    try {
      await updateCartItemQuantity(itemId, newQuantity);
      await fetchCartItems(); // Actualizar el carrito después de cambiar la cantidad
    } catch (error) {
      console.error('Error al actualizar la cantidad:', error);
    }
  };

  // Calcular el precio total
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0).toFixed(2);
  };

  if (!user) {
    return <p>Por favor, inicia sesión para ver tu carrito.</p>;
  }

  return (
    <div className="cart">
      <h2>Carrito de Compras</h2>
      {cartItems.length === 0 ? (
        <p>Tu carrito está vacío</p>
      ) : (
        <>
          <ul className="cart-items">
            {cartItems.map((item) => (
              <li key={item.id} className="cart-item">
                <img src={item.product.image_url} alt={item.product.name} className="product-image" />
                <div>
                  <h3>{item.product.name}</h3>
                  <p>Precio: €{item.product.price}</p>  {/* Muestra el precio */}
                  <div>
                    <label>
                      Cantidad:
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                      />
                    </label>
                  </div>
                  <button onClick={() => handleRemove(item.id)}>Eliminar</button>
                </div>
              </li>
            ))}
          </ul>
          <div className="cart-total">
            <h3>Total: €{calculateTotal()}</h3>
            <button onClick={handleProceedToPayment}>Proceder al pago</button>
            {paymentMessage && <div className="payment-message">{paymentMessage}</div>}
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;