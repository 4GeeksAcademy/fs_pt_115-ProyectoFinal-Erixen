import { useEffect, useState } from "react";
import { getPistas, getPistasClub, getReservas } from "../../services/servicesAPI.js";
import { useNavigate, Link, useParams } from "react-router-dom";
import { PageHeader } from "../components/PageHeader";


export const Pistas = () => {

	const navigate = useNavigate()
	const {id} = useParams()
	const [pistas, setPistas] = useState([]);
	console.log(id);
	
	useEffect(() => {
		if (localStorage.getItem("token") == null) {
			navigate("/")
		} else {
			getPistasClub(id).then(
				data => {
					if (Array.isArray(data) && data.length > 0) {
						setPistas(data)
					}
				}
			)
		}
	}, [localStorage.getItem("token")])

	return (

		<>
			<PageHeader
				title="Puedes ver todas nuestras pistas"
				lead="Aqui encontraras todas las pistas de las que disponemos para ti y tus acompañantes, disfruta del encanto de nuestro club."
			/>
			
			<button type="button" onClick={()=>navigate("/crearPista")} class="btn btn-primary">
				Crear pista
			</button>

			<div className="container row d-flex justify-content-center gap-3">
				{pistas?.map(pista => (

					<div className="card mt-3" key={pista.id} style={{ width: "80rem" }}>
						{/* <img src="..." className="card-img-top" alt="..." /> */}
						<div className="card-body">
							<div className="d-flex justify-content-between ">
								<h4 className="card-title">Pista {pista.numero_pista}</h4>
								<h4 className="card-title" style={{ color: "#3374beff" }}>{pista.club_info['nombre']}</h4>
							</div>
							<p className="card-text mb-4">
								Superficie: {pista.superficie === 'cesped'
									? "césped"
									: pista.superficie === 'hormigon'
										? "hormigón"
										: "sintético"}
							</p>
							<Link to={`/calendario-pista/${pista.id}`}>
								<button href="#" className="btn btn-primary boton-padelplus">Consultar horarios disponibles</button>
							</Link>
						</div>
					</div>

				))}
			</div>
		</>

	);
};