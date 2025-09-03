import React from "react";
import { SignupModal } from "./SignupModal";
// IMPORTANTE: esta estructura debe servir como modelo para el SignupModal


// Este es el modal para que los usuarios inicien sesión.
// Recibe tres props:
// - show: un boolean para saber si se debe mostrar o no.
// - handleClose: función para cerrarlo (haciendo clic en la 'x').
// - switchToSignup: función para cambiar al modal de registro.
export const LoginModal = ({ show, handleClose, switchToSignup }) => {
    // Si la prop 'show' es falsa, el componente no renderiza nada. Así de simple.
    if (!show) {
        return null;
    }

    return (
        <div className="modal" style={{ display: 'block' }} >
            <div className="modal-dialog">
                <div className="modal-content">
                    {/* heaader del modal con el título y el botón de cerrar. */}
                    <div className="modal-header">
                        <h5 className="modal-title">Iniciar Sesión</h5>
                        <button type="button" className="btn-close" onClick={handleClose}></button>
                    </div>
                    {/* body del modal, formulario. */}
                    <div className="modal-body">
                        <form>
                            <div className="mb-3">
                                <label className="form-label">Email</label>
                                <input type="email" className="form-control" id="loginEmail" />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Contraseña</label>
                                <input type="password" className="form-control" id="loginPassword" />
                            </div>
                            <button type="submit" className="btn btn-primary">Iniciar Sesión</button>
                        </form>
                    </div>
                    {/* Pie del modal, con el enlace para ir a registrarse si no tienes cuenta. */}
                    <div className="modal-footer">
                        <p>¿No tienes una cuenta?</p>
                        <a href="#" onClick={switchToSignup}>
                            Regístrate
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};
