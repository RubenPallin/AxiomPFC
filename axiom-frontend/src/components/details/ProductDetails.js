import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../cart/CartContext';
import { useAuth } from '../AuthContext';
import axios from '../config/axiosConfig';
import './ProductDetails.css';

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
        const response = await axios.get(`/products/${id}`);
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
      console.log('Adding to cart:', { product, user });
      await addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image_url: product.image_url
      });
      setAddToCartMessage('Producto añadido al carrito con éxito');
    } catch (error) {
      console.error('Error al añadir al carrito:', error);
      setAddToCartMessage('Error al añadir el producto al carrito');
    } finally {
      setIsAddingToCart(false);
    }
  };

  if (!product) {
    return <div className="product-details-container">Cargando...</div>;
  }

  return (
    <div className="product-details-container">
      <div className="product-image-container">
        <img src={product.image_url} alt={product.name} className="product-image" />
      </div>
      <div className="product-info">
        <h2 className="product-name">{product.name}</h2>
        <p className="product-description">{product.description}</p>
        <h3 className="product-price">€{product.price.toFixed(2)}</h3>
        <button
          className="add-to-cart-button"
          onClick={handleAddToCart}
          disabled={isAddingToCart}
        >
          {isAddingToCart ? 'Añadiendo...' : 'Añadir al carrito'}
        </button>
        {addToCartMessage && (
          <p className={`message ${addToCartMessage.includes('Error') ? 'error-message' : 'success-message'}`}>
            {addToCartMessage}
          </p>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;

