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


	// FUNCION PARA UN FUTURO PARA CONSEGUIR LAS PISTAS

	useEffect(()=>{
		getClubsFromApi()
			
	},[])

	return (
		<>
			<PageHeader
				title="Clubes"
				lead="Encuentra tu club ideal"
			/>
			<div className="container row mx-auto">
				{/*carousel*/}
				<div className="card mt-2" style={{ width: "400px", height: "700px" }}>
					<div id="carouselExample" className="carousel slide">
						<div className="carousel-inner">
							<div className="carousel-item active ratio ratio-1x1">
								<img src="src/front/assets/1.webp" className="d-block w-100" style={{ objectPosition: "center", objectFit: "cover" }} alt="nombre del polideportivo" />
							</div>
							<div className="carousel-item ratio ratio-1x1">
								<img src="src/front/assets/2.webp" className="d-block w-100" style={{ objectPosition: "center", objectFit: "cover" }} alt="nombre del polideportivo" />
							</div>
							<div className="carousel-item ratio ratio-1x1">
								<img src="src/front/assets/3.webp" className="d-block w-100" style={{ objectPosition: "center", objectFit: "cover" }} alt="nombre del polideportivo" />
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
				</div>
			</div>
				{/* esto va a ser la seccion donde se desplegara el boton de ver pistas EN PROCESO NO TOCAR POR EL MOMENTO */}
			<div className="container-fluid border text-primary d-flex row p-2 m-1">
					<form>
						<div className="Nombre del polideportivo row m-3">
							<label className="mb-1" for="Name" placeholder="Nombre del club">Nombre del polideportivo</label>
							<input type="text" id="Name"></input>
						</div>
						<div className="imagenes row m-3">
							<label for="imagenes" className="mb-3">Inserta imagenes del club</label>
							<input type="file" id="imagenes" placeholder="Obligatoria"></input>
							<input type="file" id="imagenes" placeholder="Opcional"></input>
							<input type="file" id="imagenes" placeholder="Opcional"></input>
						</div>
						<div className="description row m-3">
							<label className="mb-1" for="description">Descripcion del club</label>
							<input type="text" id="description" placeholder="Descripcion del club"></input>
						</div>
					</form>

				</div>

				<div className="container justify-content-center align-item-center d-flex mx-auto">
					<button className="btn btn-primary">Crear Club.</button>
			</div>
			


		</>
	)
};


// faltantes:

// -en el modals de club necesito mi parametro de imagenes 
// -parametro de descripcion




// Idea de jhon en vez de integrar el boton de crear club clásico la idea es tener esa opción pero en una forma de 
// tarjeta con el link que te lleve a crear el club y una vez que se cree el club que siga apareciendo la opcion de crear 
// otro club.

