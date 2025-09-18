import { useEffect, useState } from "react";
import { getPista, getReservas } from "../../services/servicesAPI.js";
import { useNavigate, useParams } from "react-router-dom";

export const CalendarioPista = () => {

    const [pista, setPista] = useState(null)
    const { pista_id } = useParams()

    useEffect(() => {
        getPista(pista_id).then((data) => {
            setPista(data)
            console.log(data);
        })

    }, [])

    if (!pista) {
        return null
    }

    return (
        <div className="container text-dark mt-3">
            <h1>
                Horarios de la pista {pista['numero_pista']} de {' '}
                <span style={{color:'#3374beff'}}>{pista["club_info"]['nombre']}</span>
            </h1>
            Hola, pista {pista['id']}
        </div>
    );
};