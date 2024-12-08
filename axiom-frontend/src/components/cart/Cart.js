import React, { useEffect } from 'react';
import { useCart } from './CartContext';
import { useAuth } from '../AuthContext';
import './Cart.css';

const Cart = () => {
  const { cartItems, removeFromCart, updateCartItemQuantity, fetchCartItems } = useCart();
  const { user } = useAuth();

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

  const handleQuantityChange = async (itemId, newQuantity) => {
    try {
      await updateCartItemQuantity(itemId, newQuantity);
      await fetchCartItems(); // Actualizar el carrito después de cambiar la cantidad
    } catch (error) {
      console.error('Error al actualizar la cantidad:', error);
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
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
                <img src={item.image_url} alt={item.name} />
                <div>
                  <h3>{item.name}</h3>
                  <p>Precio: €{item.price}</p>
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
            <button className="checkout-button">Proceder al pago</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;