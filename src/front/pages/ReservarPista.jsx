import { useEffect } from "react";
import { getReservas } from "../services/servicesAPI";
import { PageHeader } from "../components/PageHeader"; // 1. Importar
import { useNavigate } from "react-router-dom";

export const ReservarPista = () => {
  
	const navigate = useNavigate()

	useEffect(() => {
		if (localStorage.getItem("token") == null) {
			navigate("/")
		} else {
			getReservas()
		}
	},[localStorage.getItem("token")])
  
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