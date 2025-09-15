import { Link } from "react-router-dom";
import { Carousel } from "../components/Carousel";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Home = () => {

	const navigate = useNavigate()

	useEffect(() => {
		if (localStorage.getItem("token") == null) {
			navigate("/")
		}
	}, [localStorage.getItem("token")]);

	return (
		<div className="main-content">
			<div className="hero-content">
				{/* Hero Section */}
				<div 
					style={{
						background: '#3374beff', // Color
						padding: '3rem',
						color: 'white',
						borderBottomLeftRadius: '30px', 
						borderBottomRightRadius: '30px',
						marginBottom: '2rem'
					}}
				>
					<div className="text-center">
						<h1 className="display-4">Reserva tu pista de pádel en segundos</h1>
						<p className="lead">
							Encuentra horarios disponibles, elige tu pista favorita y prepárate para jugar.
						</p>
						<hr className="my-4" style={{ borderColor: 'white' }} />
						<p>
							¿Listo para el partido?
						</p>
						{/* Este botón debería llevar a la página de reservas */}
						<Link className="btn btn-primary btn-lg" to="/reservar-pista" role="button">
							¡Reservar ahora!
						</Link>
					</div>
				</div>

				{/* Carrusel Section */}
				<Carousel />

				{/* body section */}
				<div className="container my-5">
					<div className="row text-center">
						<div className="col-md-4 mb-4">
							<div className="card h-100">
								<div className="card-body">
									<h5 className="card-title">Encuentra Clubes</h5>
									<p className="card-text">Explora los clubes de pádel cercanos y encuentra el lugar perfecto para tu próximo partido.</p>
									<Link to="/clubes" className="btn btn-outline-primary">Ver Clubes</Link>
								</div>
							</div>
						</div>
						<div className="col-md-4 mb-4">
							<div className="card h-100">
								<div className="card-body">
									<h5 className="card-title">Gestiona tus Reservas</h5>
									<p className="card-text">Accede a tu historial de reservas, y gestiona tus partidos con facilidad.</p>
									<Link to="/reservas/1" className="btn btn-outline-primary">Mis Reservas</Link>
								</div>
							</div>
						</div>
						<div className="col-md-4 mb-4">
							<div className="card h-100">
								<div className="card-body">
									<h5 className="card-title">Tu Perfil</h5>
									<p className="card-text">Mantén tu información actualizada y gestiona tu perfil de jugador.</p>
									<Link to="/profile/1" className="btn btn-outline-primary">Mi Perfil</Link>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};