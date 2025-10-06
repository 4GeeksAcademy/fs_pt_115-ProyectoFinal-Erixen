import { Link } from "react-router-dom";
import { Carousel } from "../components/Carousel";
import { PageHeader } from "../components/PageHeader";
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

				<PageHeader
					title="Reserva tu pista de pádel en segundos"
					lead="Encuentra horarios disponibles, elige tu pista favorita y prepárate para jugar"
				/>

				{/* Carrusel Section */}
				<Carousel />

				{/* body section */}
				<div className="container my-5">
					<div className="row text-center">
						<div className="col-sm-12 col-md-6 col-lg-3 mb-4">
							<div className="card h-100">
								{/* deberia aplicar un efectivo de hover a las cards de aqui embaixo */}
								<div className="card-body">
									<h5 className="card-title">Encuentra clubes</h5>
									<p className="card-text">Explora los clubes de pádel cercanos y encuentra el lugar perfecto para tu próximo partido.</p>
									<Link to="/clubes" className="btn btn-outline-primary boton-padelplus">Ver clubes</Link>
								</div>
							</div>
						</div>
						<div className="col-sm-12 col-md-6 col-lg-3 mb-4">
							<div className="card h-100">
								{/* deberia aplicar un efectivo de hover a las cards de aqui embaixo */}
								<div className="card-body">
									<h5 className="card-title">Predicción del clima</h5>
									<p className="card-text">Consulta el tiempo que hará en tu ciudad durante los próximos 7 días antes de reservar pista.</p>
									<Link to="/clima" className="btn btn-outline-primary boton-padelplus">Ver clima</Link>
								</div>
							</div>
						</div>
						<div className="col-sm-12 col-md-6 col-lg-3 mb-4">
							<div className="card h-100">
								<div className="card-body">
									<h5 className="card-title">Gestiona tus reservas</h5>
									<p className="card-text">Accede a tu historial de reservas de pistas, y gestiona tus partidos con facilidad.</p>
									<Link to="/reservas/<int:user_id>" className="btn btn-outline-primary boton-padelplus">Mis reservas</Link>
								</div>
							</div>
						</div>
						<div className="col-sm-12 col-md-6 col-lg-3 mb-4">
							<div className="card h-100">
								<div className="card-body">
									<h5 className="card-title">Tu Perfil</h5>
									<p className="card-text">Mantén tu información actualizada y gestiona tu perfil de jugador.</p>
									<Link to="/profile" className="btn btn-outline-primary boton-padelplus">Mi Perfil</Link>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};