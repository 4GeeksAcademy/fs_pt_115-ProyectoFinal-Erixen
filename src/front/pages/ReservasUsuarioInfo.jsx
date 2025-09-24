import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { deleteReserva, getPista, getReserva, getUser } from "../../services/servicesAPI";
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

	function useIsMobile(maxWidth = 770) {
		const [isMobile, setIsMobile] = useState(window.innerWidth <= maxWidth);

		useEffect(() => {
			const handleResize = () => setIsMobile(window.innerWidth <= maxWidth);
			window.addEventListener("resize", handleResize);
			return () => window.removeEventListener("resize", handleResize);
		}, [maxWidth]);

		return isMobile;
	}


	const isMobile = useIsMobile(770);

	return (
		<>
			{user && reserva && pista && (
				!isMobile ? (

					<div className="container" >


						<div className=" text-center mt-5">
							<h1 className="text-black ">Hola, {user.nombre}! Bienvenido.</h1>
							<h3 style={{ color: "#7d7d7d" }}>Esta es tu reserva en {pista.club_info.nombre}</h3>
						</div>

						<div className="d-flex justify-content-between mt-5 row TextOfReservasInfo pb-3 text-center text-md-start" style={{ backgroundColor: "white", borderRadius: "5px", }}>
							<div className="mt-2 col-12 col-md-4  ms-md-3">

								<p className="ReservaInfo">Club de padel:  {pista.club_info.nombre}</p>
								<p className="ReservaInfo">Superficie: {pista.superficie}</p>
								<p className="ReservaInfo">Hora de inicio: {reserva.hora_inicio}</p>
								<p className="ReservaInfo">direccion: {pista.club_info.direccion}</p>
							</div>

							<div className="mt-2 col-12 col-md-4">
								<p className="ReservaInfo">Numero de pista: {pista.numero_pista}</p>
								<p className="ReservaInfo">Precio/hora: {pista.precio_hora}€</p>
								<p className="ReservaInfo">Hora de fin: {reserva.hora_fin}</p>
								<p className="ReservaInfo">Fecha de reserva: {reserva.fecha_reserva}</p>
							</div>


							<div class="d-grid gap-2 col-5 mt-3 mx-auto">
								<button class="btn btn-danger" type="button">CANCELAR RESERVA</button>
							</div>
						</div>
					</div>
				) : (
					<div className="container" >


						<div className=" text-center mt-5">
							<h1 className="text-black ">Hola, {user.nombre}! Bienvenido.</h1>
							<h3 style={{ color: "#7d7d7d" }}>Esta es tu reserva en {pista.club_info.nombre}</h3>
						</div>

						<div className="d-flex justify-content-between mt-5 row TextOfReservasInfo pb-3 text-center text-md-start" style={{ backgroundColor: "white", borderRadius: "5px", }}>
							<div className="mt-2 col-12 col-md-4  ms-md-3" style={{display: "flex",flexDirection: "column"}}>
								
								<p className="ReservaInfo mx-auto">Club de padel:  </p>
								<p className="borderInfoUsuario mx-auto">{pista.club_info.nombre}</p>
								<p className="ReservaInfo mt-3  mx-auto">Superficie: </p>
								<p className="borderInfoUsuario mx-auto">{pista.superficie}</p>
								<p className="ReservaInfo mt-3 mx-auto">Hora de inicio:</p>
								<p className="borderInfoUsuario mx-auto"> {reserva.hora_inicio}</p>
								<p className="ReservaInfo mx-auto mt-2">direccion: </p>
								<p className="borderInfoUsuario mx-auto">{pista.club_info.direccion}</p>
							</div>

							<div className="mt-3 col-12 col-md-4">
								<p className="ReservaInfo mt-3  mx-auto">Numero de pista:</p>
								<p className="borderInfoUsuario mx-auto">{pista.numero_pista}</p>
								<p className="ReservaInfo mt-3  mx-auto">Precio/hora:</p>
								<p className="borderInfoUsuario mx-auto">{pista.precio_hora}€</p>
								<p className="ReservaInfo mt-3  mx-auto">Hora de fin:</p>
								<p className="borderInfoUsuario mx-auto">{reserva.hora_fin}</p>
								<p className="ReservaInfo mt-3  mx-auto">Fecha de reserva:</p>
								<p className="borderInfoUsuario mx-auto">{reserva.fecha_reserva}</p>
							</div>


							<div class="d-grid gap-2 col-5 mt-3 mx-auto">
								<button class="btn btn-danger" type="button">CANCELAR RESERVA</button>
							</div>
						</div>
					</div>
				)
			)}
		</>
	);
};          