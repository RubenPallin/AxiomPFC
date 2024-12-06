import { useState } from 'react';
import ProductsList from './ProductsList';
import './Products.css';

function Products() {
  const [selectedCategoryId, setSelectedCategoryId] = useState(null); // Ninguna categoría seleccionada por defecto

  const handleCategorySelect = (categoryId) => {
    setSelectedCategoryId(categoryId); // Cambiar la categoría seleccionada
  };

  return (
    <div className="products-page">
        <ProductsList categoryId={selectedCategoryId} />
    </div>
  );
}

export default Products;