
import { useNavigate } from "react-router-dom";
import { PageHeader } from "../components/PageHeader"; // 1. Importar

export const Clubes = () => {
    const navigate = useNavigate();


    return (
        <div className="text-center">
            {/* 2. Usar el componente con su título y descripción */}
            <PageHeader 
                title="Nuestros Clubes" 
                lead="Explora los mejores lugares para jugar y reservar tu pista." 
            />
            
            <div className="container">
                {/* Aquí va el contenido futuro de la lista de clubes */}
                <p className="text-dark">Próximamente: ¡Aquí verás la lista de clubes disponibles!</p>
            </div>
        </div>
    );
};