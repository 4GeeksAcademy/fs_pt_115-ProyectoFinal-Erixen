import { useEffect, useState } from "react";
import { getPistas, getReservas } from "../../services/servicesAPI.js";
import { useNavigate, Link } from "react-router-dom";
import { PageHeader } from "../components/PageHeader";


export const Pistas = () => {

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

		<>
			<PageHeader
				title="Puedes ver todas nuestras pistas"
				lead="Aqui encontraras todas las pistas de las que disponemos para ti y tus acompañantes, disfruta del encanto de nuestro club."
			/>
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

				{/* <!-- Button trigger modal --> */}
				<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
				  Crear pista
				</button>

				{/* <!-- Modal --> */}
				<div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
				  <div class="modal-dialog">
				    <div class="modal-content">
				      <div class="modal-header">
				        <h1 class="modal-title fs-5" id="staticBackdropLabel">Crear pista</h1>
				      </div>
				      <div class="modal-body">

				      </div>
				      <div class="modal-footer">
				        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
				        <button type="submit" class="btn btn-primary" onSubmit={()=> setPistas()}>Añadir pista</button>
				      </div>
				    </div>
				  </div>
				</div>
			</div>
		</>

	);
};