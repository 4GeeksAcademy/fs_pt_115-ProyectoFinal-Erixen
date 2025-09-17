import { useEffect, useState } from "react";
import { getPistas, getReservas } from "../../services/servicesAPI.js";
import { useNavigate } from "react-router-dom";

export const ReservarPista = () => {

	const navigate = useNavigate()
  
	const [pistas, setPistas] = useState([]);

	useEffect(() => {
		if (localStorage.getItem("token") == null) {
			navigate("/")
		} else {
			getPistas().then(
				data => {
					if (Array.isArray(data) && data.length > 0) {
						setPistas(data)
					}
				}
			)
		}
	}, [localStorage.getItem("token")])

	return (
		<div className="container">
			{pistas?.map(pista => (
				<div key={pista.id} className="card mt-3">
					<div className="card-body">
						<h5 className="card-title">Pista número: {pista.numero_pista}</h5>
						<p className="card-text">
							Estado de la pista: {pista.estado_pista} <br />
							Superficie: {pista.superficie === 'cesped'
								? "césped"
								: pista.superficie === 'hormigon'
									? "hormigón"
									: "sintético"}
						</p>
						<a href="#" className="btn btn-primary">Reservar</a>
					</div>
				</div>
			))}
		</div>
	);
};