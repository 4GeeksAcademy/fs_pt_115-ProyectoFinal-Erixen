import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getUser } from "../../services/servicesAPI";

export const ReservasUsuarioInfo = () => {

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




	return (
		<div className="container" >

			<div className="text-center mt-5">
				<h1 className="text-black ">Hola, Nombre! Bienvenido.</h1>
				<h3 style={{ color: "#7d7d7d" }}>Esta es tu reserva en Nombre club</h3>
			</div>

			<div className="d-flex justify-content-between mt-5 TextOfReservasInfo" style={{backgroundColor: "white",borderRadius: "5px",}}>
				<div className="mt-2 ms-3">
					<p className="">Club de padel:</p>
					<p className="">Superficie:</p>
					<p className="">Hora de inicio:</p>
				</div>

				<div className="mt-2 me-3">
					<p>Pista:</p>
					<p>Precio:</p>
					<p>Hora de fin:</p>
				</div>
			</div>

		</div>
	);
};          