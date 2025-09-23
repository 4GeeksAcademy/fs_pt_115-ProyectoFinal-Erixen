import { PageHeader } from "../components/PageHeader"; // 1. Importar
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export const ReservasUsuario = () => {
const [reserva, setreserva] = useState();
	const [pista, setpista] = useState();
	const navigate = useNavigate()

	useEffect(() => {
		if (localStorage.getItem("token") == null) {
			navigate("/")
		}
	}, [localStorage.getItem("token")]);

	

	return (
		<div className="container">
			
			<div className="text-center">
			<h1 className="text-black ">MIS RESERVAS</h1>
			</div>
			<div className="row  d-flex justify-content-around">
				<div className="col-md-3 col-12">
					<div className="card mi-caja-reservas mt-2 " style={{ width: "18rem;" }}>
						<img src="/src/front/assets/imagenERROR.jpg" className="card-img-top boorder border-bottom" alt="..." />
						<div className="card-body">
							<h5 className="card-title">Nombre club</h5>
							<p className="card-text">Fecha de reserva</p>
							<p className="card-text">Horario</p>

						</div>
						<div className="card-body d-flex justify-content-center">
							<a href="#" className="btn btn-primary">VER MAS</a>

						</div>
					</div>
				</div>
				<div className="col-md-3 col-12 mt-2">
					<div className="card mi-caja-reservas" style={{ width: "18rem;" }}>
						<img src="/src/front/assets/imagenERROR.jpg" className="card-img-top boorder border-bottom" alt="..." />
						<div className="card-body">
							<h5 className="card-title">Nombre club</h5>
							<p className="card-text">Fecha de reserva</p>
							<p className="card-text">Horario</p>

						</div>
						<div className="card-body d-flex justify-content-center">
							<Link to={`/reservasInfo/${12}`}>
							<a href="#" className="btn btn-primary">VER MAS</a>
							</Link>
						</div>
					</div>
				</div>
				<div className="col-md-3 col-12 mt-2">
					<div className="card mi-caja-reservas" style={{ width: "18rem;" }}>
						<img src="/src/front/assets/imagenERROR.jpg" className="card-img-top boorder border-bottom" alt="..." />
						<div className="card-body">
							<h5 className="card-title">Nombre club</h5>
							<p className="card-text">Fecha de reserva</p>
							<p className="card-text">Horario</p>

						</div>
						<div className="card-body d-flex justify-content-center">
							<a href="#" className="btn btn-primary">VER MAS</a>

						</div>
					</div>
				</div>
				<div className="col-md-3 col-12 mt-2">
					<div className="card mi-caja-reservas" style={{ width: "18rem;" }}>
						<img src="/src/front/assets/imagenERROR.jpg" className="card-img-top boorder border-bottom" alt="..." />
						<div className="card-body">
							<h5 className="card-title">Nombre club</h5>
							<p className="card-text">Fecha de reserva</p>
							<p className="card-text">Horario</p>

						</div>
						<div className="card-body d-flex justify-content-center">
							<a href="#" className="btn btn-primary">VER MAS</a>

						</div>
					</div>
				</div>

				<div className="col-md-3 col-12 mt-2">
					<div className="card mi-caja-reservas" style={{ width: "18rem;" }}>
						<img src="/src/front/assets/imagenERROR.jpg" className="card-img-top boorder border-bottom" alt="..." />
						<div className="card-body">
							<h5 className="card-title">Nombre club</h5>
							<p className="card-text">Fecha de reserva</p>
							<p className="card-text">Horario</p>

						</div>
						<div className="card-body d-flex justify-content-center">
							<a href="#" className="btn btn-primary">VER MAS</a>

						</div>
					</div>
				</div>
			</div>
		</div>
	);
};              