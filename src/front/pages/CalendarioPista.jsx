import { useEffect, useState } from "react";
import { createReserva, getPista, getReservas } from "../../services/servicesAPI.js";
import { useNavigate, useParams } from "react-router-dom";
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/dist/locale/es'

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
    const [celdaSeleccionada, setCeldaSeleccionada] = useState(null)
    const [mensajeReserva, setMensajeReserva] = useState("")
    const [confirmacionReserva, setConfirmacionReserva] = useState("")

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

        return (
            <div className="rbc-time-slot">
                <button
                    style={{
                        width: "100%",
                        height: "100%",
                        border: "none",
                        backgroundColor: disponible ? "#2e832dff" : "#adadad"
                    }}
                    onClick={() => {
                        if (!disponible) return;
                        setCeldaSeleccionada(value)
                        setModalVisible(true)
                        const fechaReserva = moment(value)
                        const fechaFinReserva = moment(value).add(30, "minutes")

                        setMensajeReserva(`¿Está seguro de que quiere reservar la pista el día ${fechaReserva.format("DD/MM/YYYY")} de ${fechaReserva.format("HH:mm")} a ${fechaFinReserva.format("HH:mm")}?`)
                        setConfirmacionReserva(`Se ha reservado la pista el dia ${fechaReserva.format("DD/MM/YYYY")} de ${fechaReserva.format("HH:mm")} a ${fechaFinReserva.format("HH:mm")} con éxito`)
                        console.log(value);
                    }}
                >
                    {children}
                </button>
            </div>
        )
    }

    useEffect(() => {

        getPista(pista_id).then((data) => {
            setPista(data)
            // console.log(data);

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
                    <div className="modal-dialog">
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
                                    onClick={() => {
                                        console.log(celdaSeleccionada);
                                        setModalDosVisible(true)
                                        setModalVisible(false)
                                        createReserva({
                                            "fecha_reserva": "2025-09-27",
                                            "hora_fin": "22:00",
                                            "hora_inicio": "21:00",
                                            "id_pista": 2,
                                            "id_usuario": 1
                                        })
                                            .then(response => {
                                                if (response.status === 200 || response.status === 201) {
                                                    console.log("Reserva creada:", response.msg);
                                                } else {
                                                    console.error("Error creando reserva:", response.msg);
                                                }
                                            });
                                        console.log("reserva creada");
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
                    <div className="modal-dialog">
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
                                >
                                    Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};