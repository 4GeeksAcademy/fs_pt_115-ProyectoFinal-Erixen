import { useEffect, useState } from "react";
import { getPistas, getReservas } from "../../services/servicesAPI.js";
import { useNavigate, Link } from "react-router-dom";


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
        <div className="container d-flex justify-content-center gap-3">
            {pistas?.map(pista => (

				<div className="card mt-3" key={pista.id} style={{ width: "800px" }}>
					{/* <img src="..." className="card-img-top" alt="..." /> */}
					<div className="card-body">
						<div className="d-flex justify-content-between ">
							<h4 className="card-title">Pista {pista.numero_pista}</h4>
							<h4 className="card-title text-end" style={{ color: "#3374beff" }}>{pista.club_info['nombre']}</h4>
						</div>
						<p className="card-text mb-4">
							Superficie: {pista.superficie === 'cesped'
								? "césped"
								: pista.superficie === 'hormigon'
									? "hormigón"
									: "sintético"}
						</p>
						<Link to={`/calendario-pista/${pista.id}`}>
							<button href="#" className="btn btn-primary boton-padelplus">Consultar horarios disponibles</button>
						</Link>
					</div>
				</div>

            ))}
        </div>
    );
};