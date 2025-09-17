import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/servicesAPI.js";

// Este es el modal para que los usuarios inicien sesión.
// Recibe tres props:
// - show: un boolean para saber si se debe mostrar o no.
// - handleClose: función para cerrarlo (haciendo clic en la 'x').

export const LoginModal = ({ show, handleClose }) => {
    // Si la prop 'show' es falsa, el componente no renderiza nada. Así de simple.
    if (!show) {
        return null;
    }

    const navigate = useNavigate()

    const [newLogin, setNewLogin] = useState({
        email: "",
        password: ""
    })

    function onInputChange(event) {
        if (event.target.id == "inputEmail") {
            setNewLogin({ ...newLogin, email: event.target.value });
        } else if (event.target.id == "inputPassword") {
            setNewLogin({ ...newLogin, password: event.target.value });
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await login(newLogin);

        if (response.status === 400) {
            const errorMsg = response.msg
            alert(errorMsg)
        } else {
            navigate("/home");
            handleClose();
        }
    };

    return (
        <div className="modal" style={{ display: 'block' }} >
            <div className="modal-dialog">
                <div className="modal-content">
                    {/* header del modal con el título y el botón de cerrar. */}
                    <div className="modal-header">
                        <h5 className="modal-title">Iniciar sesión</h5>
                        <button type="button" className="btn-close" onClick={handleClose}></button>
                    </div>
                    {/* body del modal, formulario. */}
                    <div className="modal-body">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label className="form-label">Email</label>
                                <input type="email" className="form-control" id="inputEmail" onChange={onInputChange} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Contraseña</label>
                                <input type="password" className="form-control" id="inputPassword" onChange={onInputChange} />
                            </div>
                            <div>
                                <button type="submit" className="btn btn-primary">Iniciar sesión</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};
