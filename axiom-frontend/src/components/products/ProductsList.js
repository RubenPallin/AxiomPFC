import { useState, useEffect } from 'react';
import axios from 'axios';
import './ProductsList.css';


function ProductsList() {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const categories = [
    { id: null, name: 'All Products' },
    { id: 1, name: 'Camisetas' },
    { id: 2, name: 'Jerseys' },
    { id: 3, name: 'Sudaderas' },
    { id: 4, name: 'Pantalones' },
    { id: 5, name: 'Chaquetas' },
    { id: 6, name: 'Accesorios' },
    { id: 7, name: 'Calzado' }
  ];

  useEffect(() => {
    // Llamada inicial a todos los productos cuando la página se carga
    const url = selectedCategory
      ? `http://localhost:3000/products/category/${selectedCategory}`
      : 'http://localhost:3000/products'; // Si no hay categoría, mostrar todos los productos

    axios.get(url)
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('Error al obtener productos:', error);
      });
  }, [selectedCategory]); // Vuelve a obtener los productos cuando cambie la categoría seleccionada

  return (
    <div className="products-list-container" style={{ display: 'flex' }}>
      {/* Menú lateral de categorías */}
      <div className="categories-menu" style={{ width: '200px', padding: '20px', borderRight: '1px solid #ddd' }}>
        <h3>Categorías</h3>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {categories.map(category => (
            <li
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              style={{
                padding: '10px',
                cursor: 'pointer',
                backgroundColor: selectedCategory === category.id ? '#f04f23' : 'transparent',
                color: selectedCategory === category.id ? 'white' : 'black'
              }}
            >
              {category.name}
            </li>
          ))}
        </ul>
      </div>

      {/* Contenedor de productos */}
      <div className="products-container" style={{ flex: 1, padding: '20px' }}>
        <h2>{selectedCategory ? `Productos de ${categories.find(c => c.id === selectedCategory).name}` : 'Todos los Productos'}</h2>
        <div className="product-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
          {products.map(product => (
            <div className="product-card" key={product.id} style={{ padding: '20px', border: '1px solid #ddd', textAlign: 'center' }}>
              <img src={product.image_url} alt={product.name} style={{ maxWidth: '100%', height: 'auto' }} />
              <h3>{product.name}</h3>
              <p>{product.price}€</p>
              <button style={{ backgroundColor: '#f04f23', color: 'white', padding: '10px 20px', border: 'none', cursor: 'pointer' }}>Añadir al Carrito</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductsList;