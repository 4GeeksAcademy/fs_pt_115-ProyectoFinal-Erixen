import { Link } from "react-router-dom";

export const Navbar = () => {

	return (
		<nav className="navbar navbar-expand-md navbar-dark px-2 py-1" style={{ backgroundColor: "#3374beff" }}>
			<div className="container-fluid">
				<Link to="/home" style={{ textDecoration: "none" }}>
					<div className="d-flex align-items-center cursor-pointer ms-3">
						<img src="/src/front/assets/logo_cortado.png" className="my-1" style={{ maxHeight: "40px" }} />
						<a className="navbar-brand text-white ms-1" style={{ fontFamily: "Impact, fantasy" }}>Padel+</a>
					</div>
				</Link>

				<button className="navbar-toggler border-white" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>

				<div className="collapse navbar-collapse" id="navbarSupportedContent">
					<ul className="navbar-nav ms-auto">
						<li className="nav-item m-1">
							<Link to="/home">
								<button type="button" className="btn btn-outline-light" style={{ border: "none" }}>Inicio</button>
							</Link>
						</li>
						<li className="nav-item m-1">
							<Link to="/reservar-pista">
								<button type="button" className="btn btn-outline-light" style={{ border: "none" }}>Reservar pista</button>
							</Link>
						</li>
						<li className="nav-item m-1">
							<Link to="/clubes">
								<button type="button" className="btn btn-outline-light" style={{ border: "none" }}>Clubes</button>
							</Link>
						</li>
						<li className="nav-item m-1">
							<Link to="/sobre-nosotros">
								<button type="button" className="btn btn-outline-light" style={{ border: "none" }}>Sobre nosotros</button>
							</Link>
						</li>
						<li className="nav-item dropdown m-1" style={{ paddingLeft: "12px", paddingRight: "12px" }}>
							<img src="/src/front/assets/default_profile.jpg" className="dropdown-toggle" style={{ maxWidth: "37px", borderRadius: "25px" }} role="button" data-bs-toggle="dropdown" aria-expanded="false" />

							<ul className="dropdown-menu dropdown-menu-end">
								<li>
									<Link to="/profile/<int:user_id>" style={{ textDecoration: "none" }}>
										<button className="dropdown-item">Perfil</button>
									</Link>
								</li>
								<li>
									<Link to="/reservas/<int:user_id>" style={{ textDecoration: "none" }}>
										<button className="dropdown-item">Mis reservas</button>
									</Link>
								</li>
								<li><hr className="dropdown-divider" /></li>
								<li>
									<Link to="/" style={{ textDecoration: "none" }}>
										<button className="dropdown-item" style={{ color: "red" }} onClick={() => { localStorage.removeItem('token') }}>Cerrar sesión</button>
									</Link>
								</li>
							</ul>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
};