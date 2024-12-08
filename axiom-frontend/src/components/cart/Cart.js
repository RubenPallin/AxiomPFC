import { useCart } from './CartContext';
import './Cart.css';

const Cart = () => {
  const { cartItems, removeFromCart, updateCartItemQuantity } = useCart();

  const handleRemove = (itemId) => {
    removeFromCart(itemId);
  };

  const handleQuantityChange = (itemId, newQuantity) => {
    updateCartItemQuantity(itemId, newQuantity);
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

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