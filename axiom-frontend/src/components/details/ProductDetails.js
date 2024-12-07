import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

function ProductDetails() {
  const { id } = useParams(); // Capturar el ID desde la URL
  const [product, setProduct] = useState(null);

  useEffect(() => {
    // Obtener los detalles del producto por ID
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:3000/products/${id}`);
        if (!response.ok) throw new Error('Error al obtener los detalles del producto');
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    try {
      const response = await fetch('http://localhost:3000/carts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: 1, // Sustituir con el ID real del usuario autenticado
          productId: product.id,
          quantity: 1,
        }),
      });

      if (!response.ok) throw new Error('Error al añadir el producto al carrito');
      alert('Producto añadido al carrito');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  if (!product) return <p>Cargando...</p>;

  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p>Precio: ${product.price}</p>
      <p>Categoría: {product.category}</p>
      <img src={product.image_url} alt={product.name} />
      <button onClick={handleAddToCart}>Comprar Producto</button>
    </div>
  );
}

export default ProductDetails;