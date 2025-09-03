import React from "react";

export const SignupModal = ({ show, handleClose, switchToLogin }) => {
    if (!show) {
        return null;
    }

    return (
        <div className="modal" style={{ display: 'block' }} >
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Regístrate</h5>
                        <button type="button" className="btn-close" onClick={handleClose}></button>
                    </div>
                    <div className="modal-body">
                        <form>
                            <div className="mb-3">
                                <label className="form-label">Email</label>
                                <input type="email" className="form-control" id="signupEmail" />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Contraseña</label>
                                <input type="password" className="form-control" id="signupPassword" />
                            </div>
                            <button type="submit" className="btn btn-primary">Crear Cuenta</button>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <p>¿Ya tienes una cuenta?</p>
                        <a href="#" onClick={switchToLogin}>
                            Inicia Sesión
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};
