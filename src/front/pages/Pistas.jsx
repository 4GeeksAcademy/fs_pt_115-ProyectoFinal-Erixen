import { useEffect, useState } from "react";
import { getPistas, getReservas } from "../../services/servicesAPI.js";
import { useNavigate, Link } from "react-router-dom";
import { PageHeader } from "../components/PageHeader.jsx";


export const Pistas = () => {

    const navigate = useNavigate()

    const [pistas, setPistas] = useState([]);

    useEffect(() => {
        if (localStorage.getItem("token") == null) {
            navigate("/")
        } else {
            getPistas().then(
                data => {
                    if (Array.isArray(data) && data.length > 0) {
                        setPistas(data)
                    }
                }
            )
        }
    }, [localStorage.getItem("token")])

    return (
        <>
            <PageHeader

                title="Todas nuestras pistas."
                lead="Si no te bastaba  con ver una, dos o incluso tres pistas no hay problema, aquí veras todas las pistas de hay para tu disposición independientemente del club que sea."

            />
            <div className="container d-flex justify-content-center gap-3">
                {pistas && pistas.length > 0 ? (
                    pistas.map(pista => (
                        <div className="card mt-3" key={pista.id} style={{ width: "800px" }}>
                            <div className="card-body">
                                <div className="d-flex justify-content-between ">
                                    <h4 className="card-title">Pista {pista.numero_pista}</h4>
                                    <h4 className="card-title text-end" style={{ color: "#3374beff" }}>
                                        {pista.club_info['nombre']}
                                    </h4>
                                </div>
                                <p className="card-text mb-4">
                                    Superficie:{' '}
                                    {pista.superficie === 'cesped'
                                        ? 'césped'
                                        : pista.superficie === 'hormigon'
                                            ? 'hormigón'
                                            : 'sintético'}
                                </p>
                                <Link to={`/calendario-pista/${pista.id}`}>
                                    <button className="btn btn-primary boton-padelplus">
                                        Consultar horarios disponibles
                                    </button>
                                </Link>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-12 mt-5 p-5 text-center">
                        <h2 className="text-dark mb-3">Aún no hay pistas registradas.</h2>
                        <p className="lead">Vuelve pronto, ¡esperamos tener nuevas pistas para ti!</p>
                    </div>
                )}
            </div>
        </>
    );
};