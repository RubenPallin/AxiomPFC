import { useNavigate } from 'react-router-dom';
import './MainHero.css';

function MainHero() {
  const navigate = useNavigate(); 

  const handleClick = () => {
    navigate('/products'); 
  };

  return (
    <div className="hero-section">
      <div className="hero-content">
        <h1>Explora la Nueva Colección</h1>
        <p>Ropa que inspira tu estilo de vida</p>
        <button onClick={handleClick}>Comprar Ahora</button>
      </div>
    </div>
  );
}

export default MainHero;