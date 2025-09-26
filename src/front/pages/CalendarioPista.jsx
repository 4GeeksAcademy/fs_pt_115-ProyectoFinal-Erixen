import { useEffect, useState } from "react";
import { createReserva, getPista, getReservas } from "../../services/servicesAPI.js";
import { useNavigate, useParams } from "react-router-dom";
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/dist/locale/es'
import { id } from "zod/locales";

export const CalendarioPista = () => {

    const localizer = momentLocalizer(moment);
    moment.locale('es');

    const [pista, setPista] = useState(null)
    const { pista_id } = useParams()
    const [eventos, setEventos] = useState([])
    const [FechaVisible, setFechaVisible] = useState(new Date())
    const [vista, setVista] = useState('month')
    const [modalVisible, setModalVisible] = useState(false)
    const [modalDosVisible, setModalDosVisible] = useState(false)
    const [celdaSeleccionada, setCeldaSeleccionada] = useState({})
    const [mensajeReserva, setMensajeReserva] = useState("")
    const [confirmacionReserva, setConfirmacionReserva] = useState("")
    // const [fechaReserva, setFechaReserva] = useState("")
    // const [horaInicio, setHoraInicio] = useState("")
    // const [horaFin, setHoraFin] = useState("")

    const id = localStorage.getItem("id")

    const fechaMinimaReserva = new Date()
    const fechaMaximaReserva = new Date(fechaMinimaReserva)
    fechaMaximaReserva.setDate(fechaMaximaReserva.getDate() + 14)

    const estiloReservas = (event) => {
        return {
            style: {
                backgroundColor: '#bd2727ff',
                border: '#bd2727ff'
            }
        }
    }

    const estaDisponible = (date) => {
        const dateSinHoras = new Date(date.getFullYear(), date.getMonth(), date.getDate())
        const minDateSinHoras = new Date(
            fechaMinimaReserva.getFullYear(),
            fechaMinimaReserva.getMonth(),
            fechaMinimaReserva.getDate()
        )
        const maxDateSinHoras = new Date(
            fechaMaximaReserva.getFullYear(),
            fechaMaximaReserva.getMonth(),
            fechaMaximaReserva.getDate()
        )

        return dateSinHoras >= minDateSinHoras && dateSinHoras <= maxDateSinHoras
    }

    const estaReservado = (date) => {
        return eventos.some(evento => {
            const inicio = new Date(evento.start)
            const fin = new Date(evento.end)
            return date >= inicio && date < fin
        })
    }

    const celdasPersonalizadas = ({ children, value }) => {
        const disponible = estaDisponible(value)

        return (
            <div className="rbc-day-bg">
                <button
                    style={{
                        width: '100%',
                        height: '100%',
                        border: "none",
                        backgroundColor: disponible ? "#2e832dff" : "#adadad"
                    }}
                    disabled={!disponible}
                    onClick={() => {
                        if (!disponible) return;
                        setFechaVisible(value)
                        setVista('day')
                    }}
                >
                    {children}
                </button>
            </div>
        )
    }

    const celdasHorasPersonalizadas = ({ children, value }) => {
        const disponible = estaDisponible(value)
        const reservado = estaReservado(value)

        return (
            <div className="rbc-time-slot">
                <button
                    style={{
                        width: "100%",
                        height: "100%",
                        border: "none",
                        backgroundColor: disponible
                                ? "#2e832dff"
                                : "#adadadff",
                        cursor: disponible && !reservado
                            ? "pointer"
                            : "default"
                    }}
                    onClick={() => {
                        if (!disponible) return;

                        const inicio = moment(value);
                        const fin = moment(value).add(30, "minutes");

                        // Guardamos inicio y fin en el estado para el botón de reservar
                        setCeldaSeleccionada({ inicio, fin });

                        // Usamos directamente inicio y fin para mostrar el mensaje
                        setMensajeReserva(`¿Está seguro de que quiere reservar la pista el día ${inicio.format("DD/MM/YYYY")} de ${inicio.format("HH:mm")} a ${fin.format("HH:mm")}?`);
                        setConfirmacionReserva(`Se ha reservado la pista el dia ${inicio.format("DD/MM/YYYY")} de ${inicio.format("HH:mm")} a ${fin.format("HH:mm")} con éxito`);

                        setModalVisible(true);

                        console.log(value);
                    }}
                >
                    {children}
                </button>
            </div>
        )
    }

    const [recarga, setRecarga] = useState(true)

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

    }, [recarga])

    if (!pista) return null

    return (
        <div className="container text-dark mt-3">

            <h1 className="mb-4 text-center">
                Horarios de la pista {pista['numero_pista']} de {' '}
                <span style={{ color: '#3374beff' }}>{pista["club_info"]['nombre']}</span>
            </h1>

            <div className="mx-auto mb-4" style={{ height: '600px', width: '1000px' }}>
                <Calendar
                    date={FechaVisible}
                    localizer={localizer}
                    events={eventos}
                    startAccessor="start"
                    endAccessor='end'
                    dateFormat='DD/MM/YYYY'
                    view={vista}
                    step={30}
                    timeslots={1}
                    onView={(view) => {
                        setVista(view)
                        if (view == 'month' || view == 'week') {
                            setFechaVisible(new Date())
                        }
                    }}
                    onNavigate={(date) => setFechaVisible(date)}
                    messages={{
                        today: 'Hoy',
                        previous: 'Anterior',
                        next: 'Siguiente',
                        month: 'Mes',
                        week: 'Semana',
                        day: 'Día'
                    }}
                    components={{
                        dateCellWrapper: celdasPersonalizadas,
                        timeSlotWrapper: celdasHorasPersonalizadas
                    }}
                    eventPropGetter={estiloReservas}
                />
            </div>

            {modalVisible && (
                <div className="modal show d-block" tabIndex="-1">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Reservar Pista</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setModalVisible(false)}></button>
                            </div>
                            <div className="modal-body">
                                <p>{mensajeReserva}</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => setModalVisible(false)}>Close</button>
                                <button
                                    type="button"
                                    className="btn btn-primary boton-padelplus-reserva"
                                    onClick={async () => {
                                        const { inicio, fin } = celdaSeleccionada

                                        console.log(celdaSeleccionada);
                                        setModalDosVisible(true)
                                        setModalVisible(false)

                                        try {
                                            const response = await createReserva({
                                                fecha_reserva: inicio.format("YYYY-MM-DD"),
                                                hora_inicio: inicio.format("HH:mm"),
                                                hora_fin: fin.format("HH:mm"),
                                                id_pista: pista.id,
                                                id_usuario: id
                                            });

                                            if (response.status === 200 || response.status === 201) {
                                                console.log("Reserva creada: ", response.msg);
                                            } else {
                                                console.error("Error creando reserva: ", response.msg);
                                            }
                                        } catch (err) {
                                            console.error("Error en la petición:", err);
                                        }
                                            
                                        setRecarga(prev => !prev)
                                    }}
                                >
                                    Reservar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {modalDosVisible && (
                <div className="modal show d-block" tabIndex="-1">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Reservar Pista</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                    onClick={() => setModalDosVisible(false)}
                                ></button>
                            </div>
                            <div className="modal-body">
                                <p>{confirmacionReserva}</p>
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    data-bs-dismiss="modal"
                                    onClick={() => {
                                        setModalDosVisible(false)
                                    }}
                                >Cerrar</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};