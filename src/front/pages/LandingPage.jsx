import { useState } from "react";
import { GlobalStyles } from "../components/GlobalStyles";
import { UserSignUpModal } from "../components/UserSignUpModal";
import { ClubSignUpModal } from "../components/ClubSignUpModal";

export const LandingPage = () => {
	const [isLeftHovered, setIsLeftHovered] = useState(false);
	const [isRightHovered, setIsRightHovered] = useState(false);

	const columnStyle = {
		transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
		cursor: 'pointer'
	};

	const hoverStyle = {
		transform: 'scale(1.03)',
		boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
		zIndex: 10
	};

	const [showUserSignUpModal, setShowUserSignUpModal] = useState(false);
	const [showClubSignUpModal, setShowClubSignUpModal] = useState(false);

	const handleCloseModals = () => {
		setShowUserSignUpModal(false);
		setShowClubSignUpModal(false);
	};

	return (
		<>
			{/* Componente que aplica estilos globales a la página. */}
			<GlobalStyles />
			<div className="container-fluid vh-100 p-0">
				<div className="row g-0 h-100" style={{ overflow: 'hidden', overflowY: 'auto' }}>
				{/* Columna Izquierda - Registro de Clubes */}
				<div
					className="col-md-6 d-flex flex-column justify-content-center align-items-center text-center p-5"
					style={{
						...columnStyle,
						background: '#f8f9fa',
						...(isLeftHovered && hoverStyle)
					}}
					onMouseEnter={() => setIsLeftHovered(true)}
					onMouseLeave={() => setIsLeftHovered(false)}
				>
					<div className="hero-content">
						<h1 className="hero-title">
							¿Tienes un <span style={{ color: 'var(--color-info)' }}>club de pádel</span>?
						</h1>
						<p className="hero-subtitle">
							Registra tu club en nuestra plataforma, gestiona tus pistas y aumenta tu visibilidad para llegar a más jugadores.
						</p>
						<div style={{ marginTop: '2rem' }}>
							<button className="btn btn-success btn-lg" onClick={() => setShowClubSignUpModal(true)}>
								¡Trabaja con nosotros!
							</button>
						</div>
					</div>
				</div>
				{/* Columna Derecha - Jugadores */}
				<div
					className="col-md-6 d-flex flex-column justify-content-center align-items-center text-center p-5 text-white"
					style={{
						...columnStyle,
						background: '#343a40',
						...(isRightHovered && hoverStyle)
					}}
					onMouseEnter={() => setIsRightHovered(true)}
					onMouseLeave={() => setIsRightHovered(false)}
				>
					<div className="hero-content">
						<h1 className="hero-title">
							Encuentra tu <span style={{ color: 'var(--color-info)' }}>partido de pádel</span> ideal.
						</h1>
						<p className="hero-subtitle">
							Conecta con jugadores de tu nivel, organiza partidos y mejora tu juego. Tu próximo partido está a un solo click de distancia.
						</p>
						<div style={{ marginTop: '2rem' }}>
							<button className="btn btn-primary btn-lg" onClick={() => setShowUserSignUpModal(true)}>
								¡Comenzar a jugar!
							</button>
						</div>
					</div>
				</div>
			</div>
		</div >

			{/* Aquí se renderizan los modales. Se muestran o se ocultan según el estado. */ }
			< UserSignUpModal show = { showUserSignUpModal } handleClose = { handleCloseModals } />
				<ClubSignUpModal show={showClubSignUpModal} handleClose={handleCloseModals} />
		</>
	);
};
