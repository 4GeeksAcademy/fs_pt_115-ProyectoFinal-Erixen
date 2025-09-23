import { Link, useNavigate } from "react-router-dom";
import { PageHeader } from "../components/PageHeader"; // 1. Importar
import { useEffect, useState } from "react";
import { getPistas, getClubs } from "../../services/servicesAPI";


export const Clubes = () => {

	const navigate = useNavigate()
	const [clubs, setClubs] = useState([]);
	const [nombreClub, setNombreclub] = useState("");
	const [imagenesClub, setImagenesClub] = useState("");
	const [imagenesClubDos, setImagenesClubDos] = useState("");
	const [imagenesClubTres, setImagenesClubTres] = useState("");
	const [descripcionClub, setDescripcionClub] = useState("");



	const getClubsFromApi = async () => {
		const clubsApi = await getClubs()
		setClubs(clubsApi)
	}

	// useEffect(() => {
	// 	if (localStorage.getItem("token") == null) {
	// 		navigate("/")
	// 	}
	// }, [localStorage.getItem("token")]);


	// // FUNCION PARA UN FUTURO PARA CONSEGUIR LAS PISTAS

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
				<div className="card m-2" style={{ width: "400px", height: "700px" }}>
					<div id="carouselExample" className="carousel slide">
						<div className="carousel-inner">
							<div className="carousel-item active ratio ratio-1x1">
								<img src="src/front/assets/1.webp" className="d-block w-100" style={{ objectPosition: "center", objectFit: "cover" }}/>
							</div>
							<div className="carousel-item ratio ratio-1x1">
								<img src="src/front/assets/2.webp" className="d-block w-100" style={{ objectPosition: "center", objectFit: "cover" }}/>
							</div>
							<div className="carousel-item ratio ratio-1x1">
								<img src="src/front/assets/3.webp" className="d-block w-100" style={{ objectPosition: "center", objectFit: "cover" }}/>
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
						<h5 className="card-title">{clubs.nombre}Club SUMA</h5>
						<p className="card-text">{clubs.descripcion}Un polideportivo perfecto para poder pasar una tarde con amigos disfrutando de todas nuestras instalaciones
							y eligiendo jugar en la pista que mas te guste, si quieres consultar todas nuestras pistas haz click en el siguiente boton.</p>
					</div>
					<Link to={"/pistas"} className="btn btn-primary m-1">Ver pistas</Link>

				</div>

				{/* plantilla de crear club */}
				<div className="card m-2" data-bs-toggle="modal" data-bs-target="#crearClubModal" style={{ width: "400px", height: "700px" }}>
					<div className="ratio ratio-1x1">
						<img src="src/front/assets/cruceta2.png" style={{ objectFit: "cover", objectPosition: "center" }} />
					</div>
				</div>
			</div>


			{/* esto va a ser la seccion donde se desplegara el boton de ver pistas EN PROCESO NO TOCAR POR EL MOMENTO  No se ve, ver en que esta fallando*/}
			<div className="modal fade" id="crearClubModal" tabIndex="-1" aria-labelledby="crearClubModalLabel" aria-hidden="true">
				<div className="modal-dialog modal-lg" >
					<div className="modal-content" >
						<div className="modal-header">
							<h5 className="modal-title" id="crearClubModalLabel">Crear nuevo club</h5>
						</div>
						<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
					</div>
					<div className="modal-body">
						<form>
							<div className="Nombre del polideportivo row m-3">
								<label className="mb-1" htmlFor="Name" placeholder="Nombre del club">Nombre del polideportivo</label>
								<input type="text" id="Name" value={nombreClub}></input>
							</div>
							<div className="imagenes row m-3">
								<label for="imagenes" className="mb-3">Inserta imagenes del club</label>
								<input type="file" id="imagenes" placeholder="Obligatoria" value={imagenesClub}></input>
								<input type="file" id="imagenes" placeholder="Opcional" value={imagenesClubDos}></input>
								<input type="file" id="imagenes" placeholder="Opcional" value={imagenesClubTres}></input>
							</div>
							<div className="description row m-3">
								<label className="mb-1" htmlFor="description">Descripcion del club</label>
								<input type="text" id="description" placeholder="Descripcion del club" value={descripcionClub}></input>
							</div>
						</form>
						<div className="modal-footer">
							<button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
							<button type="submit" className="btn btn-primary">Guardar club</button>
						</div>
					</div >
				</div>
			</div>
		</>
	)
};


// faltantes:

// -en el modals de club necesito mi parametro de imagenes 
// -parametro de descripcion




// Idea de jhon en vez de integrar el boton de crear club clásico la idea es tener esa opción pero en una forma de 
// tarjeta con el link que te lleve a crear el club (la idea es hacer que ese link sea como un modal que utilizamos en crear usuario) y una vez que se cree el club que siga apareciendo la opcion de crear 
// otro club.

