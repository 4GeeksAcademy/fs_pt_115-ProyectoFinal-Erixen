import { useState } from "react";

export const Profile = () => {

	const [ModoEdicion, SetModoEdicion] = useState(false)



	const [inputNombre, setInputNombre] = useState("")
	const [inputApellidos, setInputApellidos] = useState("")
	const [inputTelefono, setInputTelefono] = useState("")
	const [inputEmail, setInputEmail] = useState("")

	const handleInputNombre = (e) => {
		setInputNombre(e.target.value)
	}

	const handleInputApellidos = (e) => {
		setInputApellidos(e.target.value)
	}

	const handleInputEmail = (e) => {
		setInputEmail(e.target.value)
	}
	const handleInputTelefono = (e) => {
		setInputTelefono(e.target.value)
	}

	return (
		<div className="container mt-4 p-1 pb-2" style={{ backgroundColor: "#013047", borderRadius: "10px" }}>
			<div className="d-flex justify-content-between">
				<div className="Spacer No borrar"></div>
				<img src="/imgs/pepaPig.jpg" className="" style={{ maxWidth: "150px", maxHeight: "200px", borderRadius: "100px", objectFit: "cover", }} />
				<i onClick={() => SetModoEdicion(true)} class="fa-solid fa-gear" />
			</div>

			<div className="d-flex justify-content-center mt-2" >
				<h3 className="px-2" style={{ backgroundColor: "#FC8500", borderRadius: "10px" }}>INFORMACION DE USUARIO</h3>
			</div>

			<div className="">
				{!ModoEdicion &&
					<div className="row m-0 d-flex justify-content-around">
						<div className="mt-2 col-12 col-md-5 align-items-center" >

							<div style={{ backgroundColor: "#FC8500", borderRadius: "10px" }}>
								<div className="d-flex flex-column align-items-center" >
									<h4>NOMBRE:</h4>
									<h6 className="ms-2">ME GUSTA EL PENE</h6>
								</div>

								<div className="d-flex flex-column align-items-center">
									<h4>APELLIDOS:</h4>
									<h6 className="ms-2">ME GUSTA EL PENE</h6>
								</div>
							</div>
						</div>
						<div className="mt-2 col-12 col-md-5 align-items-center" >
							<div style={{ backgroundColor: "#FC8500", borderRadius: "10px" }}>
								<div className="d-flex flex-column align-items-center">
									<h4>EMAIL:</h4>
									<h6 className="ms-2">ME GUSTA EL PENE</h6>
								</div>

								<div className="d-flex flex-column align-items-center">
									<h4>TELEFONO:</h4>
									<h6 className="ms-2">ME GUSTA EL PENE</h6>
								</div>
							</div>
						</div>
						<div className="border col-md-10 mt-2 align-items-center" id="divAcederReservas" style={{borderRadius: "10px"}}>
							<div className="mt-2 align-items-center" >

								<div>
									<div className="d-flex flex-column align-items-center" >
										<h2 className="mt-1" style={{ fontFamily: "DM Serif Text" }}>MIS RESERVAS</h2>
									</div>

									<div className="d-flex flex-column align-items-center">
										<button type="button" style={{ fontFamily: "DM Serif Text" }} class="btn btn-primary btn-lg">ACCEDER</button>
									</div>
								</div>
							</div>

						</div>
					</div>
				}

				{ModoEdicion &&
					<div className="row m-0 d-flex justify-content-around">
						<div className="mt-2 col-12 col-md-5 align-items-center" >

							<div className="pb-2" style={{ backgroundColor: "#FC8500", borderRadius: "10px" }}>
								<div className="d-flex flex-column align-items-center" >
									<label for="nombre"><h4>NOMBRE:</h4></label>
									<input className="form-control text-center"
										placeholder="Introducir Nombre"
										type="text"
										value={inputNombre}
										style={{ backgroundColor: "transparent", color: "white" }}
										onChange={(e) => handleInputNombre(e)}
										id="nombre"
									/>
								</div>

								<div className="d-flex flex-column align-items-center">
									<label for="Apellidos"><h4>APELLIDOS:</h4></label>
									<input className="form-control text-center"
										placeholder="Introducir Nombre"
										style={{ backgroundColor: "transparent", color: "white" }}
										type="text"
										value={inputApellidos}
										onChange={(e) => handleInputApellidos(e)}
										id="Apellidos"
									/>
								</div>
							</div>
						</div>
						<div className="mt-2 col-12 col-md-5 align-items-center" >
							<div className="pb-2" style={{ backgroundColor: "#FC8500", borderRadius: "10px" }}>

								<div className="d-flex flex-column align-items-center" >
									<label for="Email"><h4>EMAIL:</h4></label>
									<input className="form-control text-center"
										placeholder="Introducir Email"
										type="text"
										value={inputEmail}
										style={{ backgroundColor: "transparent", color: "white" }}
										onChange={(e) => handleInputEmail(e)}
										id="Email"
									/>
								</div>

								<div className="d-flex flex-column align-items-center">
									<label for="Telefono"><h4>TELEFONO:</h4></label>
									<input className="form-control text-center"
										placeholder="Introducir Telefono"
										type="text"
										value={inputTelefono}
										style={{ backgroundColor: "transparent", color: "white" }}
										onChange={(e) => handleInputTelefono(e)}
										id="Telefono"
									/>
								</div>
							</div>
						</div>
						<div className="mt-2 d-flex justify-content-center">
							<button type="button" class="btn btn-primary btn-lg">Guardar Cambios</button>
						</div>
					</div>

				}
			</div>


		</div>
	);
};