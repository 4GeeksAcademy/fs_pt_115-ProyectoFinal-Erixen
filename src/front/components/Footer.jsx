import 'bootstrap-icons/font/bootstrap-icons.css';

export const Footer = () => {

	return (
		<div>

			<div className="div d-flex">
				<div className="footer mt-auto py-3 bg-light d-flex justify-content-evenly w-50 flex-column">
					<div className="btn btn-success myButton bg-transparent border-0 text-black">Declaración de privacidad</div>
					<div className="btn btn-success myButton bg-transparent border-0 text-black">Información sobre cuentas</div>
					<div className="btn btn-success myButton bg-transparent border-0 text-black">Condiciones de uso</div>
				</div>
				<div className="bg-light w-50 py-3 ps-2">
					<div className='mx-auto'>
						<p className="text-black ps-1 mb-0" style={{ fontSize: "20px" }}>Síguenos en nuestras redes sociales!</p>
						<div className='d-flex'>
							<btn className="btn btn-primary m-1 text-black p-0 me-2 bg-transparent border-0" style={{ fontSize: "40px" }}>
								<i class="bi bi-instagram"></i>
							</btn>
							<btn className="btn btn-primary m-1 text-black p-0 me-2 bg-transparent border-0" style={{ fontSize: "40px" }}>
								<i class="bi bi-twitter-x"></i>
							</btn>
							<btn className="btn btn-primary m-1 text-black p-0 m-0 bg-transparent border-0" style={{ fontSize: "40px" }}>
								<i class="bi bi-facebook"></i>
							</btn>
						</div>
					</div>
				</div>
			</div>
			<div className='bg-dark text-white text-center py-2'>
				Padel+ S.L 2018 <i class="bi bi-c-circle"></i>  Todos los derechos reservados
			</div>
		</div>
	)
};

