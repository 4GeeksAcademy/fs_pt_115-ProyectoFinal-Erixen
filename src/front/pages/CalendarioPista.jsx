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