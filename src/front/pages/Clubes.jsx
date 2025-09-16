import { useNavigate } from "react-router-dom";
import { PageHeader } from "../components/PageHeader"; // 1. Importar
import { useEffect, useState } from "react";
import { getPistas, getClubs } from "../../services/servicesAPI";


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


	//FUNCION PARA UN FUTURO PARA CONSEGUIR LAS PISTAS
	
	// useEffect(()=>{
	// 	getClubsFromApi()
	// 		
	// },[])

	return (
		<>
			<div className="container">
				{/*carousel*/}
				<div className="card mt-2" style={{ width: "400px", height: "700px" }}>
					<div id="carouselExample" className="carousel slide">
						<div className="carousel-inner">
							<div className="carousel-item active ratio ratio-1x1">
								<img src="src/front/assets/1.webp" className="d-block w-100" alt="nombre del polideportivo" />
							</div>
							<div className="carousel-item ratio ratio-1x1">
								<img src="src/front/assets/2.webp" className="d-block w-100" alt="nombre del polideportivo" />
							</div>
							<div className="carousel-item ratio ratio-1x1">
								<img src="src/front/assets/3.webp" className="d-block w-100" alt="nombre del polideportivo" />
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
						<h5 className="card-title">Polideportivo SUMA</h5>
						<p className="card-text">Un polideportivo perfecto para poder pasar una tarde con amigos disfrutando de todas nuestras instalaciones
							y eligiendo jugar en la pista que mas te guste, si quieres consultar todas nuestras pistas haz click en el siguiente boton.</p>
					</div>
					<button className="btn btn-primary m-1"> Ver pistas </button>
					
					{/* esto va a ser la seccion donde se desplegara el boton de ver pistas EN PROCESO NO TOCAR POR EL MOMENTO */}
					<div className="conteiner-fluid border">
						<div className="img">
							<img src=""/>
						</div>
					</div>

				</div>
			</div>
		</>
	)
};