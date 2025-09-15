import { useEffect } from "react";
import { getReservas } from "../../services/servicesAPI.js";
import { useNavigate } from "react-router-dom";

export const ReservarPista = () => {

	const navigate = useNavigate()

	useEffect(() => {
		if (localStorage.getItem("token") == null) {
			navigate("/")
		} else {
			getReservas()
		}
	},[localStorage.getItem("token")])

	return (
		<div className="container">
			<h1 className="text-black">Vista donde aparezcan las pistas disponibles</h1>
		</div>
	);
};