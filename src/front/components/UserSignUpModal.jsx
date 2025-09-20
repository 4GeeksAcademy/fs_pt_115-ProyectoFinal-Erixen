import { useState } from "react";
import { createUser } from "../../services/servicesAPI.js";
import { z } from "zod";

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
    });
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    // 1. Definimos el esquema de validación con Zod
    const userSchema = z.object({
        nombre: z.string().min(1, "El nombre es obligatorio."),
        apellidos: z.string().min(1, "Los apellidos son obligatorios."),
        email: z.string().email("El formato del correo electrónico no es válido."),
        telefono: z.string().min(1, "El teléfono es obligatorio."),
        password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres."),
    }).refine(data => data.password === confirmPassword, {
        message: "Las contraseñas no coinciden.",
        path: ["confirmPassword"], // Asocia el error al campo de confirmación
    });

    const onInputChange = (event) => {
        const { name, value } = event.target;
        setNewUser({ ...newUser, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(""); // Limpiar errores previos

        // 2. Usamos el esquema para validar los datos
        const result = userSchema.safeParse(newUser);

        if (!result.success) {
            // Zod nos da el primer error encontrado de forma sencilla
            setError(result.error.errors[0].message);
            return;
        }

        // 3. Si la validación es exitosa, enviamos los datos (sin confirmPassword)
        const response = await createUser(result.data);

        if (response.status === 400) {
            setError(response.msg);
        } else {
            alert("¡Registro exitoso!");
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
                            {error && <div className="alert alert-danger">{error}</div>}
                            <div className="mb-3">
                                <label className="form-label">Nombre</label>
                                <input type="text" className="form-control" name="nombre" value={newUser.nombre} onChange={onInputChange} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Apellidos</label>
                                <input type="text" className="form-control" name="apellidos" value={newUser.apellidos} onChange={onInputChange} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Email</label>
                                <input type="email" className="form-control" name="email" value={newUser.email} onChange={onInputChange} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Contraseña</label>
                                <input type="password" className="form-control" name="password" value={newUser.password} onChange={onInputChange} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Confirmar contraseña</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    name="confirmPassword"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Teléfono</label>
                                <input type="tel" className="form-control" name="telefono" value={newUser.telefono} onChange={onInputChange} />
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
