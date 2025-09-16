import { PageHeader } from "../components/PageHeader"; // 1. Importar

export const ReservasUsuario = () => {
    return (
        <div className="text-center">
            {/* 2. Reutilizar el encabezado */}
            <PageHeader 
                title="Mis Reservas" 
                lead="Aquí puedes gestionar todas tus pistas reservadas." 
            />

            <div className="container">
                <p className="text-dark">Aquí se mostrará el historial de reservas del usuario.</p>
            </div>
        </div>
    );
};