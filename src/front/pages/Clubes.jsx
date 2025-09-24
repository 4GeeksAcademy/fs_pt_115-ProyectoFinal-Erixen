import { Link, useNavigate } from "react-router-dom";
import { PageHeader } from "../components/PageHeader"; // 1. Importar
import { useEffect, useState } from "react";
import { getClubs } from "../../services/servicesAPI";
import { map } from "zod";


export const Clubes = () => {

	const navigate = useNavigate()
	const [clubs, setClubs] = useState([]);


	const getClubsFromApi = async () => {
		const clubsApi = await getClubs()
		setClubs(clubsApi)
	}

	useEffect(() => {
		if (localStorage.getItem("token") == null) {
			navigate("/")
		}
	}, [localStorage.getItem("token")]);


	// // FUNCION PARA UN FUTURO PARA CONSEGUIR LOS CLUBS

	useEffect(()=>{
		getClubsFromApi()

	},[])

	return (
		<>
			<PageHeader
				title="Todos los Clubs disponibles"
				lead="Encuentra tu club ideal para pasar el mejor momento de diversion y distracción para ti y tus amigos."
			/>
			<div className="container row mx-auto">
				{/*carousel*/}
				{
						(clubs.map((Club) => (
						<div className="card m-2" style={{ width: "400px", height: "700px" }}>
							<div id="carouselExample" className="carousel slide">
								<div className="carousel-inner">
									<div className="carousel-item active ratio ratio-1x1">
										<img src={Club.imagen} className="d-block w-100" style={{ objectPosition: "center", objectFit: "cover" }} alt="nombre del polideportivo" />
									</div>
									<div className="carousel-item ratio ratio-1x1">
										<img src={Club.imagenDos} className="d-block w-100" style={{ objectPosition: "center", objectFit: "cover" }} alt="nombre del polideportivo" />
									</div>
									<div className="carousel-item ratio ratio-1x1">
										<img src={Club.imagenTres} className="d-block w-100" style={{ objectPosition: "center", objectFit: "cover" }} alt="nombre del polideportivo" />
									</div>
								</div>
								<button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
									<span className="carousel-control-prev-icon" aria-hidden="true"></span>
									<span className="visually-hidden">Previous</span>
								</button>
								<button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
									<span className="carousel-control-next-icon" aria-hidden="true"></span>
									<span className="visually-hidden">Next</span>
								</button>
							</div>
							<div className="card-body">
								<h5 className="card-title">{Club.nombre}</h5>
								<p className="card-text">{Club.descripcion}</p>
							</div>
							<Link to={"/pistas"} className="btn btn-primary m-1">Ver pistas</Link>

						</div>
					))
					)
				}
			</div>
			


		</>
	)
};