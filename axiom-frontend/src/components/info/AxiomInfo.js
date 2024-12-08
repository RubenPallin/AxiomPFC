import React from 'react';
import './AxiomInfo.css';
import logo from '../../assets/logo.png'; // Asegúrate de que la ruta sea correcta


const AxiomInfo = () => {
  return (
    <div className="about-container">
      <div className="about-content">
        {/* Logo de la empresa */}
        <img src={logo} alt="Logo Axiom" className="logo" />
        
        {/* Título */}
        <h1 className='h1_info'>Bienvenido a Axiom</h1>

        {/* Descripción de la empresa */}
        <p className="description">
          Somos una página web emergente que busca ofrecer productos de calidad y un excelente servicio al cliente. En Axiom, nuestro objetivo es crecer y expandirnos, manteniendo siempre nuestros valores de honestidad, innovación y compromiso.
        </p>

        {/* Objetivos de la empresa */}
        <h2>Objetivos de la Empresa</h2>
        <ul className="goals">
          <li>Ampliar nuestra oferta de productos para cubrir las necesidades de nuestros clientes.</li>
          <li>Establecer una base de clientes leales que confíen en nosotros.</li>
          <li>Mejorar constantemente nuestra experiencia de usuario a través de la tecnología y la innovación.</li>
          <li>Expandirnos a nuevos mercados y alcanzar una presencia global.</li>
          <li>Brindar un servicio al cliente excepcional que supere las expectativas.</li>
        </ul>
      </div>
    </div>
  );
};

export default AxiomInfo;