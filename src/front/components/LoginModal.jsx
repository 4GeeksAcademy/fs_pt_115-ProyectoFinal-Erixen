import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/servicesAPI.js";
import { z } from "zod";

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

    const [error, setError] = useState("");
    const [newLogin, setNewLogin] = useState({
        email: "",
        password: ""
    })

    // Esquema de validación con Zod
    const loginSchema = z.object({
        email: z.string().email("El formato del correo electrónico no es válido."),
        password: z.string().min(1, "La contraseña es obligatoria."),
    });

    const onInputChange = (event) => {
        const { name, value } = event.target;
        setNewLogin({ ...newLogin, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(""); // Limpiar errores previos

        // Usamos el esquema para validar los datos
        const result = loginSchema.safeParse(newLogin);

        if (!result.success) {
            setError(result.error.errors[0].message);
            return;
        }

        const response = await login(result.data);

        if (response.status === 400 || response.status === 401) {
            setError(response.msg);
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
                        <form className="row" onSubmit={handleSubmit}>
                            {error && <div className="alert alert-danger">{error}</div>}
                            <div className="mb-3">
                                <label className="form-label">Email</label>
                                <input type="email" className="form-control" name="email" value={newLogin.email} onChange={onInputChange} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Contraseña</label>
                                <input type="password" className="form-control" name="password" value={newLogin.password} onChange={onInputChange} />
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
