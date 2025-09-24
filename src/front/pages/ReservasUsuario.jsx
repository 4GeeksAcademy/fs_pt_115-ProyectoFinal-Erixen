import { PageHeader } from "../components/PageHeader"; // 1. Importar
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { getPista, getReserva, getUser } from "../../services/servicesAPI";



export const ReservasUsuario = () => {
const [reserva, setreserva] = useState();
	const [pista, setpista] = useState();
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
				setReserva(userTemp.reservas || [])
			} catch (error) {
				console.error("Error cargando usuario:", error);
			}
		};
		fetchUser();
	}, [id]);






	console.log(user)
	console.log(pista)

	

	return (
		<div className="container">

			<div className="text-center mt-3">
				<h1 className="text-black ">MIS RESERVAS</h1>
			</div>
			<div className="row  d-flex justify-content-around mt-3">

				{!user ? (
					<p className="text-center">Cargando reservas...</p>
				) : !user.reservas || user.reservas.length === 0 ? (
					<p className="text-center">No tienes reservas todavía.</p>
				) : (user.reservas.map((reserva) => (
					<div key={reserva.id} className="col-md-3 col-12 mt-2">
						<div className="card mi-caja-reservas" style={{ width: "18rem;" }}>
							<img src="/src/front/assets/imagenERROR.jpg" className="card-img-top boorder border-bottom" alt="..." />
							<div className="card-body">
								<h5 className="card-title">Reserva en {}</h5>
								<p className="card-text">Fecha de reserva: {reserva.fecha_reserva}</p>
								<p className="card-text">Horario: {reserva.hora_inicio} a {reserva.hora_fin}</p>

							</div>
							<div className="card-body d-flex justify-content-center">
								<Link to={`/reservasInfo/${reserva.id}`}>
									<a href="#" className="btn btn-primary">VER MAS</a>
								</Link>
							</div>
						</div>
					</div>
				))
				)}

			</div>
		</div >
	);
};              