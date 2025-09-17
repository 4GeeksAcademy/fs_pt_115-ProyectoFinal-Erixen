import { useState } from "react"
import { createUser } from "../../services/servicesAPI.js";

export const UserSignUpModal = ({ show, handleClose }) => {
    if (!show) {
        return null;
    }

    const [newUser, setNewUser] = useState({
        nombre: "",
        apellidos: "",
        email: "",
        password: "",
        telefono: ""
    })

    function onInputChange(event) {
        if (event.target.id == "inputNombre") {
            setNewUser({ ...newUser, nombre: event.target.value });
        } else if (event.target.id == "inputApellidos") {
            setNewUser({ ...newUser, apellidos: event.target.value });
        } else if (event.target.id == "inputEmail") {
            setNewUser({ ...newUser, email: event.target.value });
        } else if (event.target.id == "inputPassword") {
            setNewUser({ ...newUser, password: event.target.value });
        } else if (event.target.id == "inputTelefono") {
            setNewUser({ ...newUser, telefono: event.target.value });
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await createUser(newUser);

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
                        <h5 className="modal-title">Regístrate</h5>
                        <button type="button" className="btn-close" onClick={handleClose}></button>
                    </div>
                    <div className="modal-body">
                        <form className="row" onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label className="form-label">Nombre</label>
                                <input type="text" className="form-control" id="inputNombre" onChange={onInputChange} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Apellidos</label>
                                <input type="text" className="form-control" id="inputApellidos" onChange={onInputChange} />
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
                                <label className="form-label">Teléfono</label>
                                <input type="tel" className="form-control" id="inputTelefono" onChange={onInputChange} />
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
