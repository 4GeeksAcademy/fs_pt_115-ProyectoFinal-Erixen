import { GlobalStyles } from "../components/GlobalStyles";

export const LandingPage = () => {

	return (
		<>
			{/* Componente que aplica estilos globales a la página. */}
			<GlobalStyles />
			<div className="app-container">
				<main className="main-content">
					{/* Formas para el fondo. */}
					{/* Los elementos del fondo animado se han eliminado de aqui, ahora estan en layout con la finalidad de que sean globales;(PENDIENTE)*/}

					<div className="hero-content">
						{/* Contenido principal de la landing page. */}
						<h1 className="hero-title">
							Encuentra tu <span style={{ color: 'var(--color-info)' }}>pareja de padel</span> ideal.
						</h1>
						<p className="hero-subtitle">
							Conecta con jugadores de tu nivel, organiza partidos y mejora tu juego. Tu próximo partido está a un solo clic de distancia.
						</p>
						<div style={{ marginTop: '2rem' }}>
							{/* Botón para buscar un partido. redirecciona a home*/}
							<a href="/home" target="_blank" rel="noopener noreferrer">
								<button className="btn btn-primary btn-lg">
									Buscar Partido
								</button>
							</a>
						</div>
					</div>
				</main>
			</div>
		</>
	);
};

