import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPista, getReserva, getUser } from "../../services/servicesAPI";
import { useParams } from "react-router-dom";


export const ReservasUsuarioInfo = () => {
	const { idReserva } = useParams(); // aquí recuperas el id de la URL

	console.log(idReserva)

	const navigate = useNavigate()

	useEffect(() => {
		if (localStorage.getItem("token") == null) {
			navigate("/")
		}
	}, [localStorage.getItem("token")]);

	useEffect(() => {
		document.body.classList.add("reserva");

		return () => {
			document.body.classList.remove("reserva");
		};
	}, []);

	const [user, setUser] = useState();
	const id = localStorage.getItem("id")

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const UserArray = await getUser(id); // esto devuelve un array
				setUser(UserArray[0]); // me quedo con el objeto dentro
			} catch (error) {
				console.error("Error cargando usuario:", error);
			}
		};

		fetchUser();
	}, []);

	const [reserva, setreserva] = useState();
	const [pista, setpista] = useState();

	useEffect(() => {
		const fetchReserva = async () => {
			try {
				const data = await getReserva(idReserva); // esto devuelve un objeto
				console.log("Reserva recibida:", data);    // inspecciona los datos
				setreserva(data);
				const pista = await getPista(data.id_pista)
				setpista(pista)                           // guarda directamente el objeto
			} catch (error) {
				console.error("Error cargando reserva:", error);
			}
		};

		fetchReserva();
	}, [idReserva]);

	console.log(pista)
	console.log(reserva)


	console.log(user)

	return (
		<>
			{user && reserva && pista && (
				<div className="container" >


					<div className="text-center mt-5">
						<h1 className="text-black ">Hola, {user.nombre} {user.apellidos}! Bienvenido.</h1>
						<h3 style={{ color: "#7d7d7d" }}>Esta es tu reserva en {pista.club_info.nombre}</h3>
					</div>

					<div className="d-flex justify-content-between mt-5 row TextOfReservasInfo pb-3" style={{ backgroundColor: "white", borderRadius: "5px", }}>
						<div className="mt-2 col-4 ms-3">
							
							<p className="">Club de padel:  {pista.club_info.nombre}</p>
							<p className="">Superficie: {pista.superficie}</p>
							<p className="">Hora de inicio: {reserva.hora_inicio}</p>
							<p>direccion: {pista.club_info.direccion}</p>
						</div>

						<div className="mt-2 col-4 me-3">
							<p>Pista: {pista.numero_pista}</p>
							<p>Precio: {pista.precio_hora}€</p>
							<p>Hora de fin: {reserva.hora_fin}</p>
							<p>Fecha de reserva: {reserva.fecha_reserva}</p>
						</div>


						<div class="d-grid gap-2 col-5 mt-3 mx-auto">
							<button class="btn btn-danger" type="button">CANCELAR RESERVA</button>
						</div>
					</div>
				</div>
			)}
		</>
	);
};          