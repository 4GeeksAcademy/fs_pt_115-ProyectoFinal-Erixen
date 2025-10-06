import { PageHeader } from "../components/PageHeader"; // 1. Importar
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { getPista, getReserva, getUser } from "../../services/servicesAPI";



export const ReservasUsuario = () => {
const [reserva, setreserva] = useState();
	const navigate = useNavigate()

	useEffect(() => {
		if (localStorage.getItem("token") == null) {
			navigate("/")
		}
	}, [localStorage.getItem("token")]);

	const [user, setUser] = useState(null);
	const id = localStorage.getItem("id")

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const data = await getUser(id);
				setUser(Array.isArray(data) ? data[0] : data);
				const userTemp = ((Array.isArray(data) ? data[0] : data))
				setreserva(userTemp.reservas || [])
			} catch (error) {
				
			}
		};
		fetchUser();
	}, [id]);


	

	return (
		<>
		<div class="background" style={{ zIndex: "-99" }}>
        <span class="ball"></span>
        <span class="ball"></span>
        <span class="ball"></span>
        <span class="ball"></span>
        <span class="ball"></span>
        <span class="ball"></span>
        <span class="ball"></span>
        <span class="ball"></span>
        <span class="ball"></span>
        <span class="ball"></span>
        <span class="ball"></span>
        <span class="ball"></span>
      </div>
		<div className="container">
			<PageHeader 
			title="Mis Reservas"
			lead="Gestiona tus reservas de pistas de pádel"
			/>
			
			<div className="row  d-flex justify-content-around mt-3">
				{!user ? (
					<div class="loader">
						<div class="square" id="sq1"></div>
						<div class="square" id="sq2"></div>
						<div class="square" id="sq3"></div>
						<div class="square" id="sq4"></div>
						<div class="square" id="sq5"></div>
						<div class="square" id="sq6"></div>
						<div class="square" id="sq7"></div>
						<div class="square" id="sq8"></div>
						<div class="square" id="sq9"></div>
					</div>
				) : !user.reservas || user.reservas.length === 0 ? (
					<p className="text-center">No tienes reservas todavía.</p>
				) : (user.reservas.map((reserva) => (
					<div key={reserva.id} className="col-md-3 col-12 mt-2">
						<div className="card mi-caja-reservas" style={{ width: "18rem;" }}>
							<div className="card-body">
								<h5 className="card-title">Tu reserva del dia {reserva.fecha_reserva}</h5>
								<p className="card-text">Horario: {reserva.hora_inicio} a {reserva.hora_fin}</p>

							</div>
							<div className="card-body d-flex justify-content-center">
								<Link to={`/reservasInfo/${reserva.id}`}>
									<button className="btn btn-primary">VER MAS</button>
								</Link>
							</div>
						</div>
					</div>
				))
				)}

			</div>
		</div >
		</>
	);
};              