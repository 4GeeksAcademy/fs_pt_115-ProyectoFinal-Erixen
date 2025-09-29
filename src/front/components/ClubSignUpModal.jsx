import { useState } from "react"
import { createClub } from "../../services/servicesAPI.js";
import { z } from "zod";
import Swal from 'sweetalert2';

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


    const [confirmPassword, setConfirmPassword] = useState("");

    // 1. Definimos el esquema de validación con Zod
    const clubSchema = z.object({
        nombre: z.string().min(3, "El nombre del club es obligatorio."),
        email: z.string().email("El formato del correo electrónico no es válido."),
        password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres."),
        direccion: z.string().min(5, "La dirección es obligatoria."),
        telefono: z.string().min(8, "El teléfono es obligatorio."),
        hora_apertura: z.string().regex(/^([0-1]\d|2[0-3]):([0-5]\d)$/, "El formato de la hora de apertura no es válido (HH:MM)."),
        hora_cierre: z.string().regex(/^([0-1]\d|2[0-3]):([0-5]\d)$/, "El formato de la hora de cierre no es válido (HH:MM)."),
    }).refine(data => data.password === confirmPassword, {
        message: "Las contraseñas no coinciden.",
        path: ["confirmPassword"], // Asocia el error al campo de confirmación
    });

    const onInputChange = (event) => {
        const { name, value } = event.target;
        setNewClub({ ...newClub, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // 2. Usamos el esquema para validar los datos
        const result = clubSchema.safeParse(newClub);

        if (!result.success) {
            // Mostramos el error de validación con SweetAlert
            Swal.fire({
                icon: 'error',
                title: 'Error de validación',
                text: result.error.errors[0].message,
            });
            return;
        }

        // 3. Si la validación es exitosa, enviamos los datos
        const response = await createClub(result.data);

        if (response.status === 400 || response.status === 409) {
            Swal.fire({
                icon: 'error',
                title: 'Error en el registro',
                text: response.msg,
            });
        } else {
            Swal.fire({
                icon: 'success',
                title: '¡Registro de club exitoso!',
                text: 'Ya puedes iniciar sesión con tu nueva cuenta de club.',
                timer: 2000,
                showConfirmButton: false
            });
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
                                <input type="text" className="form-control" name="nombre" value={newClub.nombre} onChange={onInputChange} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Email</label>
                                <input type="email" className="form-control" name="email" value={newClub.email} onChange={onInputChange} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Contraseña</label>
                                <input type="password" className="form-control" name="password" value={newClub.password} onChange={onInputChange} />
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
                                <label className="form-label">Dirección</label>
                                <input type="text" className="form-control" name="direccion" value={newClub.direccion} onChange={onInputChange} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Teléfono</label>
                                <input type="tel" className="form-control" name="telefono" value={newClub.telefono} onChange={onInputChange} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Hora de apertura</label>
                                <input type="time" className="form-control" name="hora_apertura" value={newClub.hora_apertura} onChange={onInputChange} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Hora de cierre</label>
                                <input type="time" className="form-control" name="hora_cierre" value={newClub.hora_cierre} onChange={onInputChange} />
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
