import 'bootstrap-icons/font/bootstrap-icons.css';

export const Footer = () => {

	return (
		<div>
			<hr className="text-black mb-0" />
			<div className='d-md-flex'>
				<div className="col-12 col-md-6">
					<div className='px-4 py-3'>
						<p className="text-black mb-0 py-1" style={{ fontSize: "20px" }}>Síguenos en nuestras redes sociales!</p>
						<div className='d-flex gap-2 py-1'>
							<button className="btn btn-primary text-black p-0 bg-transparent border-0 socialButton" style={{ fontSize: "40px" }}>
								<i className="bi bi-instagram"></i>
							</button>
							<button className="btn btn-primary text-black p-0 bg-transparent border-0 socialButton" style={{ fontSize: "40px" }}>
								<i className="bi bi-twitter-x"></i>
							</button>
							<button className="btn btn-primary text-black p-0 m-0 bg-transparent border-0 socialButton" style={{ fontSize: "40px" }}>
								<i className="bi bi-facebook"></i>
							</button>
						</div>
					</div>
				</div>

				<div className="col-12 col-md-6 py-3 px-4 d-flex align-items-start flex-column">
					<div className="btn btn-success myButton bg-transparent border-0 text-black ps-2">Declaración de privacidad</div>
					<div className="btn btn-success myButton bg-transparent border-0 text-black ps-2">Información sobre cuentas</div>
					<div className="btn btn-success myButton bg-transparent border-0 text-black ps-2">Condiciones de uso</div>
				</div>

			</div>
			<div className='text-white text-center py-2' style={{ backgroundColor: "#3374beff" }}>
				Padel+ S.L 2025 <i className="bi bi-c-circle"></i>  Todos los derechos reservados
			</div>
		</div>
	)
};

