import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { useCart } from '../cart/CartContext';
import './ProductsList.css';

function ProductsList() {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const { addToCart } = useCart(); // Trae la función del contexto
  const navigate = useNavigate();
  const { user } = useAuth();  // Accede al estado del usuario desde el contexto

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
    const url = selectedCategory
      ? `http://localhost:3000/products/category/${selectedCategory}`
      : 'http://localhost:3000/products';

    axios.get(url)
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('Error al obtener productos:', error);
      });
  }, [selectedCategory]);

  // Lógica para añadir al carrito
  const handleAddToCart = async (product) => {
    if (!user) {
      // Si el usuario no está logueado, redirige al login
      navigate('/login');
      return;
    }

    try {
      // Llamada a la API de backend para añadir el producto al carrito
      const response = await axios.post('http://localhost:3000/carts', {
        userId: user.id,  // Asumiendo que tienes un ID de usuario
        productId: product.id,
        quantity: 1, // Si quieres añadir una cantidad personalizada, modifica esto
      });

      if (response.status === 200) {
        console.log(`Producto ${product.name} añadido al carrito`);
        addToCart(product);  // Si usas un contexto de carrito también, puedes llamar esta función
      }
    } catch (error) {
      console.error('Error al añadir al carrito:', error);
    }
  };

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
            <Link to={`/products/${product.id}`} key={product.id} style={{ textDecoration: 'none', color: 'inherit' }}>
              <div
                className="product-card"
                style={{ padding: '20px', border: '1px solid #ddd', textAlign: 'center', position: 'relative' }}
              >
                <img src={product.image_url} alt={product.name} style={{ maxWidth: '100%', height: 'auto' }} />
                <h3>{product.name}</h3>
                <p>{product.price}€</p>
                <button
                  style={{ backgroundColor: '#f04f23', color: 'white', padding: '10px 20px', border: 'none', cursor: 'pointer' }}
                  onClick={(e) => {
                    e.stopPropagation(); // Evita que el clic del botón interfiera con el enlace
                    handleAddToCart(product);
                  }}
                >
                  Añadir al Carrito
                </button>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductsList;