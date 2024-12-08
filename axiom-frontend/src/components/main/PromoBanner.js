import { useNavigate } from 'react-router-dom';
import './PromoBanner.css';

function PromoBanner() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/descuentos'); // Redirige a la ruta que desees, por ejemplo "/descuentos"
  };

  return (
    <div className="promo-banner">
      <div className="promo-content">
        <h2 className='h2_promo'>Oferta Exclusiva</h2>
        <p>20% de descuento en tu primer pedido</p>
        <button onClick={handleClick}>Descubre Más</button>
      </div>
    </div>
  );
}

export default PromoBanner;