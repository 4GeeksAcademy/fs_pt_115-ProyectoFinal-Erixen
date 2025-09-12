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
                        <form className="row">
                            <div className="mb-3 col-6">
                                <label className="form-label">Nombre</label>
                                <input type="password" className="form-control" id="signupPassword" />
                            </div>
                            <div className="mb-3 col-6">
                                <label className="form-label">Apellido</label>
                                <input type="password" className="form-control" id="signupPassword" />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Email</label>
                                <input type="email" className="form-control" id="signupEmail" />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Contraseña</label>
                                <input type="password" className="form-control" id="signupPassword" />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Telefono</label>
                                <input type="password" className="form-control" id="signupPassword" />
                            </div>
                            <button type="submit" className="btn btn-primary ">Crear Cuenta</button>
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
