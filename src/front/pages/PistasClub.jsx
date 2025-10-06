import { useEffect, useState } from "react";
import { deletePista, getPistas, getPistasClub, getReservas } from "../../services/servicesAPI.js";
import { useNavigate, Link, useParams } from "react-router-dom";
import { PageHeader } from "../components/PageHeader";
import { CrearPista } from "./CrearPista.jsx";
import Swal from "sweetalert2";


export const PistasClub = () => {

    const navigate = useNavigate()
    const { id } = useParams()
    const [pistas, setPistas] = useState([]);
    const tipoDeUsuario = localStorage.getItem("user_type");
    const clubId = localStorage.getItem("id")
    const buttomCreate = tipoDeUsuario == "club" && clubId == id;
    const buttomDelete = tipoDeUsuario == "club" && clubId == id;

    // ---FUNCIÓN PARA CARGAR PISTAS (REUTILIZACIÓN) ---
    const fetchPistas = () => {
        getPistasClub(id)
            .then(data => {
                if (Array.isArray(data) && data.length > 0) {
                    setPistas(data);
                } else {
                    setPistas([]); // Si no hay pistas, asegura que el estado esté vacío
                }
            })
            .catch(error => console.error("Error al cargar pistas:", error));
        }

        const deleteField = async (pistaId, numeroPista) => {

            const result = await Swal.fire({
                title: `¿Estás seguro de eliminar la Pista ${numeroPista}?`,
                text: "¡Esta acción es irreversible!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Sí, eliminar',
                cancelButtonText: 'Cancelar'
            })

            if (result.isConfirmed) {
                try {
                    await deletePista(pistaId);

                    await Swal.fire('¡Eliminada!', `La Pista ${numeroPista} ha sido eliminada.`, 'success');

                    // 2. ¡CRUCIAL! Vuelve a cargar la lista de pistas para actualizar la UI
                    fetchPistas();

                } catch (error) {
                    console.error("Error al eliminar la pista:", error);
                    Swal.fire('Error', 'No se pudo eliminar la pista.', 'error');
                }
            }


        }


        useEffect(() => {
            if (localStorage.getItem("token") == null) {
                navigate("/")
            } else {
                fetchPistas();
            }
        }, [localStorage.getItem("token")])

        console.log(pistas[id]);


        return (

            <>
                <PageHeader
                    title="Puedes ver todas nuestras pistas"
                    lead="Aqui encontraras todas las pistas de las que disponemos para ti y tus acompañantes, disfruta del encanto de nuestro club."
                />
                {buttomCreate && (
                    <div class="d-grid gap-2 col-6 mx-auto">
                        <button class="btn btn-outline-primary " type="button" onClick={() => navigate(`/crearPista/${id}`)}>
                            Crear pista
                        </button>
                    </div>
                )}

                <div className="container row d-flex justify-content-center gap-3">
                    {pistas?.map(pista => (

                        <div className="card mt-3" key={pista.id} style={{ width: "80rem" }}>
                            {/* <img src="..." className="card-img-top" alt="..." /> */}
                            <div className="card-body">
                                <div className="d-flex justify-content-between ">
                                    <h4 className="card-title">Pista {pista.numero_pista}</h4>
                                    <h4 className="card-title" style={{ color: "#3374beff" }}>{pista.club_info['nombre']}</h4>
                                </div>
                                <p className="card-text mb-4">
                                    Superficie: {pista.superficie === 'cesped'
                                        ? "césped"
                                        : pista.superficie === 'hormigon'
                                            ? "hormigón"
                                            : "sintético"}
                                </p>
                                <div className="row">
                                    <Link className="col-md-6" to={`/calendario-pista/${pista.id}`}>
                                        <button href="#" className="btn btn-primary boton-padelplus">Consultar horarios disponibles</button>
                                    </Link>
                                    { buttomDelete &&(
                                    <div className="delete-Field col justify-content-end align-item-start d-flex m-1">
                                        <button className="btn btn-outline-danger" onClick={() => deleteField(pista.id, pista.numero_pista)}><i class="fa-regular fa-trash-can"></i></button>
                                    </div>
                                    )}
                                </div>
                            </div>
                        </div>

                    ))}
                </div>
            </>

        );
    };