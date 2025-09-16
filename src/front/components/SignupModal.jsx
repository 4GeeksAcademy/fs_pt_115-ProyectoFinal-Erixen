import { useState } from "react"
import { createUser } from "../../services/servicesAPI.js";

export const SignupModal = ({ show, handleClose, switchToLogin }) => {
    if (!show) {
        return null;
    }

    const [newRegister, setNewRegister] = useState({
        nombre: "",
        apellidos: "",
        email: "",
        password: "",
        telefono: "",
        rol: ""
    })

    function onInputChange(event) {
        if (event.target.id == "inputNombre") {
            setNewRegister({ ...newRegister, nombre: event.target.value });
        } else if (event.target.id == "inputApellidos") {
            setNewRegister({ ...newRegister, apellidos: event.target.value });
        } else if (event.target.id == "inputEmail") {
            setNewRegister({ ...newRegister, email: event.target.value });
        } else if (event.target.id == "inputPassword") {
            setNewRegister({ ...newRegister, password: event.target.value });
        } else if (event.target.id == "inputTelefono") {
            setNewRegister({ ...newRegister, telefono: event.target.value });
        } else if (event.target.id == "inputRol") {
            setNewRegister({ ...newRegister, rol: event.target.value });
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await createUser(newRegister);

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
                            <div className="mb-3">
                                <label className="form-label">Rol</label>
                                <select className="form-select" defaultValue="" id="inputRol" onChange={onInputChange}>
                                    <option value="" disabled>Selecciona un rol</option>
                                    <option value="USER">Jugador</option>
                                    <option value="CLUB">Club</option>
                                </select>
                            </div>
                            <button type="submit" className="btn btn-primary">Crear Cuenta</button>
                        </form>
                    </div>
                    <div className="modal-footer d-flex justify-content-center">
                        <p className="align-middle">¿Ya tienes una cuenta?</p>
                        <a href="#" onClick={switchToLogin}>
                            Inicia Sesión
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};
