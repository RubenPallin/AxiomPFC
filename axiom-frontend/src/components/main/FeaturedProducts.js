import './FeaturedProducts.css';

const products = [
  { id: 1, name: "Sudadera Oversized", price: "49.99€", image: "/path/to/product1.jpg" },
  { id: 2, name: "Camiseta Básica", price: "29.99€", image: "/path/to/product2.jpg" },
  { id: 3, name: "Pantalón Jogger", price: "59.99€", image: "/path/to/product3.jpg" },
  { id: 4, name: "Chaqueta Corta", price: "79.99€", image: "/path/to/product4.jpg" }
];

function FeaturedProducts() {
  return (
    <div className="featured-products">
      <h2>Productos Destacados</h2>
      <div className="product-grid">
        {products.map((product) => (
          <div className="product-card" key={product.id}>
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p>{product.price}</p>
            <button>Añadir al Carrito</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FeaturedProducts;