import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../cart/CartContext';
import { useAuth } from '../AuthContext';
import axios from 'axios';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [addToCartMessage, setAddToCartMessage] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Hubo un error al obtener los detalles del producto', error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    setIsAddingToCart(true);
    setAddToCartMessage('');

    try {
      const response = await axios.post('http://localhost:3000/carts', {
        userId: user.id,
        productId: product.id,
        quantity: 1,
      });

      if (response.status === 200) {
        addToCart(response.data);
        setAddToCartMessage('Producto añadido al carrito con éxito');
      }
    } catch (error) {
      console.error('Error al añadir al carrito:', error);
      setAddToCartMessage('Error al añadir el producto al carrito');
    } finally {
      setIsAddingToCart(false);
    }
  };

  if (!product) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="product-details-container">
      <h2>{product.name}</h2>
      <img src={product.image_url} alt={product.name} />
      <p>{product.description}</p>
      <h3>€{product.price}</h3>

      <button
        className="add-to-cart-button"
        onClick={handleAddToCart}
        disabled={isAddingToCart}
      >
        {isAddingToCart ? 'Añadiendo...' : 'Añadir al carrito'}
      </button>

      {addToCartMessage && (
        <p className={addToCartMessage.includes('Error') ? 'error-message' : 'success-message'}>
          {addToCartMessage}
        </p>
      )}
    </div>
  );
};

export default ProductDetails;