import React, { useState, useEffect } from "react";
import { GlobalStyles } from "../components/GlobalStyles";
import { LoginModal } from "../components/LoginModal";
import { SignupModal } from "../components/SignupModal";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Footer } from "../components/Footer";

export const LandingPage = () => {
	// Estados para controlar la visibilidad de los modales de login y registro.
	const [showLoginModal, setShowLoginModal] = useState(false);
	const [showSignupModal, setShowSignupModal] = useState(false);

	// Función para cerrar ambos modales.
	const handleCloseModals = () => {
		setShowLoginModal(false);
		setShowSignupModal(false);
	};

	// Función para cambiar del modal de login al de registro.
	const switchToSignup = (e) => {
		e.preventDefault();
		setShowLoginModal(false);
		setShowSignupModal(true);
	};

	// Función para cambiar del modal de registro al de login.
	const switchToLogin = (e) => {
		e.preventDefault();
		setShowSignupModal(false);
		setShowLoginModal(true);
	};

	return (
		<>
			{/* Componente que aplica estilos globales a la página. */}
			<GlobalStyles />
			<div className="app-container">
				<header className="header">
					<h1 className="header-title">Padel+</h1>
					{/* Botones en el header para abrir los modales. */}
					<div className="header-actions">
						<button onClick={() => setShowLoginModal(true)} className="btn btn-outline-info">
							Iniciar Sesión
						</button>
						<button onClick={() => setShowSignupModal(true)} className="btn btn-primary">
							Regístrate
						</button>
					</div>
				</header>

				<main className="main-content">
					{/* Formas para el fondo. */}
					{/* Los elementos del fondo animado se han eliminado de aqui, ahora estan en layout con la finalidad de que sean globales;(PENDIENTE)*/}

					<div className="hero-content">
						{/* Contenido principal de la landing page. */}
						<h1 className="hero-title">
							Encuentra tu <span style={{ color: 'var(--color-info)' }}>pareja de padel</span> ideal.
						</h1>
						<p className="hero-subtitle">
							Conecta con jugadores de tu nivel, organiza partidos y mejora tu juego. Tu próximo partido está a un solo clic de distancia.
						</p>
						<div style={{ marginTop: '2rem' }}>
							{/* Botón para buscar un partido. redirecciona a home*/}
							<a href="/home" target="_blank" rel="noopener noreferrer">
								<button className="btn btn-primary btn-lg">
									Buscar Partido
								</button>
							</a>
						</div>
					</div>
				</main>
			</div>

			{/* Aquí se renderizan los modales. Se muestran o se ocultan según el estado. */}
			<LoginModal show={showLoginModal} handleClose={handleCloseModals} switchToSignup={switchToSignup} />
			<SignupModal show={showSignupModal} handleClose={handleCloseModals} switchToLogin={switchToLogin} />
		</>
	);
};

