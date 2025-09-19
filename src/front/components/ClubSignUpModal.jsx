import { useState } from "react"
import { createClub } from "../../services/servicesAPI.js";

export const ClubSignUpModal = ({ show, handleClose }) => {
    if (!show) {
        return null;
    }

    const [newClub, setNewClub] = useState({
        nombre: "",
        email: "",
        password: "",
        direccion: "",
        telefono: "",
        hora_apertura: "",
        hora_cierre: ""
    })

    function onInputChange(event) {
        if (event.target.id == "inputNombre") {
            setNewClub({ ...newClub, nombre: event.target.value });
        } else if (event.target.id == "inputEmail") {
            setNewClub({ ...newClub, email: event.target.value });
        } else if (event.target.id == "inputPassword") {
            setNewClub({ ...newClub, password: event.target.value });
        } else if (event.target.id == "inputDireccion") {
            setNewClub({ ...newClub, direccion: event.target.value });
        } else if (event.target.id == "inputTelefono") {
            setNewClub({ ...newClub, telefono: event.target.value });
        } else if (event.target.id == "inputHoraApertura") {
            setNewClub({ ...newClub, hora_apertura: event.target.value });
        } else if (event.target.id == "inputHoraCierre") {
            setNewClub({ ...newClub, hora_cierre: event.target.value });
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await createClub(newClub);

        if (response.status === 400) {
            const errorMsg = response.msg
            alert(errorMsg)
        } else {
            handleClose();
        }
    };

    return (
        <div className="modal" style={{ display: 'block' }} >
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">¡Regístrate y añade tus pistas!</h5>
                        <button type="button" className="btn-close" onClick={handleClose}></button>
                    </div>
                    <div className="modal-body">
                        <form className="row" onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label className="form-label">Nombre del club</label>
                                <input type="text" className="form-control" id="inputNombre" onChange={onInputChange} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Email</label>
                                <input type="email" className="form-control" id="inputEmail" onChange={onInputChange} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Contraseña</label>
                                <input type="password" className="form-control" id="inputPassword" onChange={onInputChange} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Dirección</label>
                                <input type="text" className="form-control" id="inputDireccion" onChange={onInputChange} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Teléfono</label>
                                <input type="tel" className="form-control" id="inputTelefono" onChange={onInputChange} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Hora de apertura</label>
                                <input type="time" className="form-control" id="inputHoraApertura" onChange={onInputChange} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Hora de cierre</label>
                                <input type="time" className="form-control" id="inputHoraCierre" onChange={onInputChange} />
                            </div>
                            <div>
                                <button type="submit" className="btn btn-primary">Crear cuenta</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};
