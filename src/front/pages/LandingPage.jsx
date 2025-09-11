import { GlobalStyles } from "../components/GlobalStyles";

export const LandingPage = () => {

	return (
		<>
			{/* Componente que aplica estilos globales a la página. */}
			<GlobalStyles />
			<div className="app-container">
				<main className="main-content">
					{/* Formas para el fondo. */}
					{/* a lo simple, buscar recursos para luego, interacion de click con el background*/}
					<div className="animated-bg-shape animate-blob" style={{ top: '-5%', left: '-10%', backgroundColor: '#8ECAE6' }}></div>
					<div className="animated-bg-shape animate-blob" style={{ bottom: '-10%', right: '-10%', backgroundColor: '#FFB703' }}></div>
					<div className="animated-bg-shape animate-blob" style={{ bottom: '5%', left: '20%', backgroundColor: '#FB8500' }}></div>

					<div className="hero-content">
						{/* Contenido principal de la landing page. */}
						<h1 className="hero-title">
							Encuentra tu <span style={{ color: 'var(--color-info)' }}>pareja de padel</span> ideal.
						</h1>
						<p className="hero-subtitle">
							Conecta con jugadores de tu nivel, organiza partidos y mejora tu juego. Tu próximo partido está a un solo clic de distancia.
						</p>
						<div style={{ marginTop: '2rem' }}>
							<button className="btn btn-primary btn-lg">
								Buscar Partido
							</button>
						</div>
					</div>
				</main>
			</div>
		</>
	);
};

