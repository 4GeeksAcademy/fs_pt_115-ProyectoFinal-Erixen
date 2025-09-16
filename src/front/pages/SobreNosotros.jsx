import React from "react"; // Asegúrate de tener React importado
import profilePic from "../assets/default_profile.jpg";

// 1.objeto con la información
const creatorInfo = {
    name: "Erixen",
    title: "Colectivo de Desarrolladores Full-Stack",
    bio: "Erixen es un colectivo de desarrolladores y entusiastas, mezcla de habilidades en desarrollo de software y diseño de experiencias de usuario. El objetivo de Erixen es simple: crear soluciones tecnológicas que mejoren la experiencia de los jugadores.",
    image: profilePic
};

export const SobreNosotros = () => {
    return (
        <div className="text-center text-dark">
            <div style={{
                    	background: '#3374beff', // Color
						padding: '3rem',
						color: 'white',
						borderBottomLeftRadius: '30px', 
						borderBottomRightRadius: '30px',
						marginBottom: '2rem'
                }}>
            <h1>Sobre Nosotros</h1>
            <p className="lead">Conoce más sobre el equipo y el propósito de nuestro proyecto.</p>
            </div>

            <div className="row mt-5">
                <div className="col-md-6">
                    <h2>Nuestra Misión</h2>
                    <p>
                        ¿Pádel? Menos líos, más juego. Olvídate de organizar. Solo abre la app, reserva y a disfrutar en la pista.
                    </p>
                </div>
                <div className="col-md-6">
                    <h2>Nuestra Visión</h2>
                    <p>
                        Pádel para todos. Así de simple. Queremos que cualquiera pueda jugar. Fácil, divertido y a tu alcance. ¡Únete a la comunidad!
                    </p>
                </div>
            </div>
            
            <div className="row mt-5 justify-content-center">
                <div className="col-lg-8">
                    <h2 className="mb-4">El Creador</h2>
                    {/* 2. usamos las props del objeto */}
                    <img src={creatorInfo.image} alt="Logo de Erixen" className="img-fluid rounded-circle mb-3" style={{width: "150px", height: "150px"}} />
                    <h4>{creatorInfo.name}</h4>
                    <p className="text-muted">{creatorInfo.title}</p>
                    <p>{creatorInfo.bio}</p>
                </div>
            </div>
        </div>
    );
};