import { useEffect, useState } from "react";
import { getPista, getReservas } from "../../services/servicesAPI.js";
import { useNavigate, useParams } from "react-router-dom";
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/es';

export const CalendarioPista = () => {

    const localizer = momentLocalizer(moment);
    moment.locale('es');

    const [pista, setPista] = useState(null)
    const { pista_id } = useParams()
    const [eventos, setEventos] = useState([])

    useEffect(() => {

        getPista(pista_id).then((data) => {
            setPista(data)
            console.log(data);

            const eventosFormateados = data['reservas'].map(reserva => ({
                title: "Reservado",
                start: new Date(`${reserva["fecha_reserva"]}T${reserva['hora_inicio']}`),
                end: new Date(`${reserva["fecha_reserva"]}T${reserva["hora_fin"]}`)
            }))

            setEventos(eventosFormateados)

        })

    }, [])

    if (!pista) return null

    return (
        <div className="container text-dark mt-3">
            <h1 className="mb-4 text-center">
                Horarios de la pista {pista['numero_pista']} de {' '}
                <span style={{ color: '#3374beff' }}>{pista["club_info"]['nombre']}</span>
            </h1>

            <div className="mx-auto mb-4" style={{ height: '600px', width: '1000px' }}>
                <Calendar
                    localizer={localizer}
                    events={eventos}
                    startAccessor="start"
                    endAccessor='end'
                    dateFormat='DD/MM/YYYY'
                />
            </div>

        </div>
    );
};