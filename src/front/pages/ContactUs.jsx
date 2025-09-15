import React from 'react';

export const ContactUs = () => {

    // Estilos en línea para los inputs del formulario
    const inputStyle = {
        border: 'none',
        borderBottom: '1px solid #ced4da', // Gris claro de Bootstrap
        borderRadius: '0',
        backgroundColor: 'transparent',
        boxShadow: 'none', // Intenta remover el resplandor de foco
    };

    return (
        <>
            {/* ENCABEZADO */}
            <div className="TitleContactUs container-fluid"
                style={{
                    background: '#3374beff', // Color
                    backgroundImage: 'url("/src/front/assets/RaquetasPadelJc.jpg")', // Imagen de fondo
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
            <div className="container">
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
                            <span className="text-dark">Calle Ficticia 123, 28080 Madrid, España</span>
                        </div>
                    </div>

                    {/* Columna Derecha: Formulario */}
                    <div className="col-md-7 ps-md-5 mt-5">
                        <form>
                            {/* Campo Nombre */}
                            <div className="form-floating mb-4 text-primary">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="name"
                                    placeholder="Nombre completo"
                                    style={inputStyle}
                                    required
                                />
                                <label htmlFor="name">Nombre completo</label>
                            </div>

                            {/* Campo Email */}
                            <div className="form-floating mb-4 text-primary">
                                <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    placeholder="Correo electrónico"
                                    style={inputStyle}
                                    required
                                />
                                <label htmlFor="email">Correo electrónico</label>
                            </div>

                            {/* Campo Mensaje */}
                            <div className="form-floating mb-4 text-primary">
                                <textarea
                                    className="form-control"
                                    id="message"
                                    placeholder="Tu mensaje"
                                    style={{ ...inputStyle, height: '150px' }}
                                    required
                                ></textarea>
                                <label htmlFor="message">Tu mensaje</label>
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