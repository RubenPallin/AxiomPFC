import './FeaturedProducts.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

function FeaturedProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Llamar al endpoint de productos destacados
    axios.get("http://localhost:3000/products/destacados")
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('Error al obtener productos:', error);
      });
  }, []);

  return (
    <div className="featured-products">
      <h2>Productos Destacados</h2>
      <div className="product-grid">
        {products.map((product) => (
          <div className="product-card" key={product.id}>
            <img src={product.image_url} alt={product.name} />
            <h3>{product.name}</h3>
            <p>{product.price}€</p>
            <button>Añadir al Carrito</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FeaturedProducts;