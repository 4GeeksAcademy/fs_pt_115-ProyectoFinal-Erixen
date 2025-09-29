import React from 'react';
import { useEffect, useState } from "react";
import { createMensaje } from "../../services/servicesAPI.js";
import { useNavigate } from "react-router-dom";

export const ContactUs = () => {

    const navigate = useNavigate();

    // Estilos en línea para los inputs del formulario
    const inputStyle = {
        border: 'none',
        borderBottom: '1px solid #ced4da', // Gris claro de Bootstrap
        borderRadius: '0',
        backgroundColor: 'transparent',
        boxShadow: 'none', // Intenta remover el resplandor de foco
    };

    const id = localStorage.getItem("id");
    const userType = localStorage.getItem("user_type");

    const [newMensaje, setNewMensaje] = useState({
        [userType === "user" ? "id_usuario" : "id_club"]: id,
        texto: ""
    });

    function onInputChange(e) {
        setNewMensaje({ ...newMensaje, texto: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await createMensaje(newMensaje);

        if (response.status === 201) {
            setNewMensaje({
                [userType === "user" ? "id_usuario" : "id_club"]: id,
                texto: ""
            });

            alert("Su mensaje ha sido enviado con éxito, ¡gracias!");
        } else {
            alert("Error al enviar el mensaje, inténtelo de nuevo.");
        }
    };

    useEffect(() => {
        if (localStorage.getItem("token") == null) {
            navigate("/")
        }
    }, [localStorage.getItem("token")]);

    return (
        <>
            {/* ENCABEZADO */}
            <div className="TitleContactUs container-fluid"
                style={{
                    background: '#3374beff', // Color
                    backgroundImage: 'url("RaquetasPadelJc.jpg")', // Imagen de fondo
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundBlendMode: 'multiply',
                    padding: '3rem',
                    color: 'white',
                    borderBottomLeftRadius: '30px',
                    borderBottomRightRadius: '30px',
                }}
            >
                <div className="col-md-6 text-start">
                    <h1 className="fw-bold">¿Tienes una duda? Estamos al otro lado de la red.</h1>
                    <p className="pt-2 fs-5">Rellena el formulario y te contactaremos para confirmar tu reserva o resolver cualquier duda.</p>
                </div>
            </div>

            {/* SECCIÓN DEL FORMULARIO (Diseño de dos columnas) */}
            <div className="container my-5">
                <div className="row align-items-center py-4">

                    {/* Columna Izquierda: Información de Contacto */}
                    <div className="col-md-5 pe-md-5">
                        <h2 className="fw-bold mb-4 text-secondary">
                            También puedes encontrarnos directamente a través de estos canales:
                        </h2>
                        <div className="mb-3 text-secondary">
                            <strong className="d-block">Email:</strong>
                            <a href="mailto:contacto@padelplus.com" className="text-dark text-decoration-none">contacto@padelplus.com</a>
                        </div>
                        <div className="mb-3 text-secondary">
                            <strong className="d-block">Teléfono:</strong>
                            <a href="tel:+34000000000" className="text-dark text-decoration-none">+34 000 000 000</a>
                        </div>
                        <div>
                            <strong className="d-block text-secondary">Dirección:</strong>
                            <span className="text-dark">Calle Ficticia, 123, 28080, Madrid, España</span>
                        </div>
                    </div>

                    {/* Columna Derecha: Formulario */}
                    <div className="col-md-7 ps-md-5">
                        <form onSubmit={handleSubmit}>
                            {/* Campo Mensaje */}
                            <div className="form-floating mb-4 text-primary">
                                <textarea
                                    className="form-control"
                                    id="message"
                                    placeholder="Tu mensaje"
                                    style={{ ...inputStyle, height: '200px' }}
                                    value={newMensaje.texto}
                                    onChange={onInputChange}
                                    required
                                ></textarea>
                                <label htmlFor="message">Deja aquí tu mensaje (500 caracteres máximo)</label>
                            </div>

                            {/* Botón de Enviar */}
                            <button
                                type="submit"
                                className="btn w-100 fw-bold text-uppercase"
                                style={{ backgroundColor: '#3374beff', color: 'white', padding: '1rem' }}
                            >
                                Enviar Mensaje
                            </button>
                        </form>
                    </div>

                </div>
            </div>
        </>
    );
};