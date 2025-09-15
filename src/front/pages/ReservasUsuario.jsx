import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const ReservasUsuario = () => {

	const navigate = useNavigate()

	useEffect(() => {
		if (localStorage.getItem("token") == null) {
			navigate("/")
		}
	}, [localStorage.getItem("token")]);

	return (
		<div className="container">
            <h1 className="text-black">Reservas hechas por el usuario</h1>
		</div>
	);
};