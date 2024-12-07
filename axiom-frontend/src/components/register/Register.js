import React, { useState } from "react";
import axios from "axios";
import "./Register.css";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "El nombre es requerido";
    if (!formData.email.trim()) newErrors.email = "El email es requerido";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email inválido";
    if (!formData.password) newErrors.password = "La contraseña es requerida";
    else if (formData.password.length < 6) newErrors.password = "La contraseña debe tener al menos 6 caracteres";
    if (!formData.phone.trim()) newErrors.phone = "El teléfono es requerido";
    else if (!/^\d{9,}$/.test(formData.phone)) newErrors.phone = "Teléfono inválido (mínimo 9 dígitos)";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Limpiar el error del campo cuando el usuario empieza a escribir
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError("");

    if (validateForm()) {
      setLoading(true);
      try {
        const response = await axios.post("http://localhost:3000/auth/register", formData);
        console.log("Usuario registrado con éxito:", response.data);
        // Redirigir al usuario a la página de login o mostrar un mensaje de éxito
        window.location.href = "/login";
      } catch (err) {
        if (err.response && err.response.data && err.response.data.message) {
          setServerError(err.response.data.message);
        } else {
          setServerError("Ocurrió un error durante el registro. Por favor, intente nuevamente.");
        }
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="register-container">
      <div className="form-wrapper">
        <h2>Registro</h2>
        <form onSubmit={handleSubmit} className="register-form">
          {serverError && <div className="error-message">{serverError}</div>}
          <div className="input-group">
            <label htmlFor="name">Nombre</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            {errors.name && <span className="error-message">{errors.name}</span>}
          </div>
          <div className="input-group">
            <label htmlFor="email">Correo Electrónico</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>
          <div className="input-group">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            {errors.password && <span className="error-message">{errors.password}</span>}
          </div>
          <div className="input-group">
            <label htmlFor="phone">Número de Teléfono</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
            {errors.phone && <span className="error-message">{errors.phone}</span>}
          </div>
          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? "Registrando..." : "Registrarse"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
