import { Link } from "react-router-dom";
export const Home = () => {
	return (
		<div>
			{/* Hero Section */}
			<div className="container-fluid bg-dark text-white p-5 text-center">
				<div className="container">
					<h1 className="display-4">Reserva tu pista de pádel en segundos</h1>
					<p className="lead">
						Encuentra horarios disponibles, elige tu pista favorita y prepárate para jugar.
					</p>
					<hr className="my-4" />
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
			<div className="container my-5">
				<div className="row">
					
				</div>
			</div>
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
	);
};