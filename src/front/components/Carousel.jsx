import React from 'react';
import { Link } from 'react-router-dom';

export const Carousel = () => {
    return (
        <div id="carouselExampleCaptions" className="carousel slide mb-5" data-bs-ride="carousel">
            <div className="carousel-indicators">
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
            </div>
            <div className="carousel-inner">
                {/* --- Slide 1 (Este ya estaba bien) --- */}
                <div className="carousel-item active">
                    <img src="src/front/assets/PadelImage1Jc.jpg" className="d-block w-100" alt="Pista de Padel 1" style={{ objectFit: 'cover', maxHeight: '400px' }} />
                    <div className="carousel-caption d-none d-md-block bg-dark bg-opacity-50 p-3 rounded">
                        <h5>Club Padel Central</h5>
                        <p>Las mejores pistas y ambiente para tu juego.</p>
                        <Link to="/clubes/1" className="btn btn-info btn-sm">Ver Club</Link>
                    </div>
                </div>

                {/* --- Slide 2 (Aquí estaba el error) --- */}
                <div className="carousel-item">
                    <img src="src/front/assets/ChanchaPadelImageJc.jpg" className="d-block w-100" alt="Pista de Padel 2" style={{ objectFit: 'cover', maxHeight: '400px' }} />
                    <div className="carousel-caption d-none d-md-block bg-dark bg-opacity-50 p-3 rounded">
                        {/* Contenido que faltaba */}
                        <h5>Club Padel Pro</h5>
                        <p>Reserva tu pista y empieza a competir.</p>
                        <Link to="/clubes/2" className="btn btn-warning btn-sm">Ver Club</Link>
                    </div> {/* <-- AQUÍ ESTÁ EL CIERRE QUE FALTABA */}
                </div> {/* <-- Y EL CIERRE DEL ITEM DEL CARRUSEL */}
                
                {/* Puedes agregar un tercer slide si quieres, siguiendo el mismo patrón */}
                <div className="carousel-item">
                    <img src="src/front/assets/RaquetasPadelJc.jpg" className="d-block w-100" alt="Pista de Padel 2" style={{ objectFit: 'cover', maxHeight: '400px' }} />
                    <div className="carousel-caption d-none d-md-block bg-dark bg-opacity-50 p-3 rounded">
                        {/* Contenido que faltaba */}
                        <h5>Club Padel Pro</h5>
                        <p>Reserva tu pista y empieza a competir.</p>
                        <Link to="/clubes/2" className="btn btn-warning btn-sm">Ver Club</Link>
                    </div> {/* <-- AQUÍ ESTÁ EL CIERRE QUE FALTABA */}
                </div> {/* <-- Y EL CIERRE DEL ITEM DEL CARRUSEL */}
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    );
};