import { useEffect } from "react";
import { getReservas } from "../../servicesAPI";
import { PageHeader } from "../components/PageHeader"; // 1. Importar

export const ReservarPista = () => {
    return (
        <div className="text-center">
            {/* 2. Aplicar el estilo homogéneo */}
            <PageHeader 
                title="Reservar Pista" 
                lead="Encuentra y reserva tu pista ideal en segundos." 
            />

            <div className="container">
                <p className="text-dark">Aquí se mostrarán las pistas disponibles para reservar.</p>
            </div>
        </div>
    );
};