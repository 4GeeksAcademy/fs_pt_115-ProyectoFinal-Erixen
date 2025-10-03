import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-big-calendar';
import { PageHeader } from "../components/PageHeader";
import { file, set } from 'zod';
import { createPista, getPistasClub } from '../../services/servicesAPI';
import { id } from 'zod/locales';
import { useNavigate, useParams } from "react-router-dom";
import { PistasClub } from './PistasClub';
import Swal from 'sweetalert2';

export const CrearPista = () => {

  const Navigate = useNavigate()

  const { id_club } = useParams()
  const [numeropista, setNumeroPista] = useState("");
  const [preciohora, setPrecioHora] = useState("");
  const [superficie, setSuperficie] = useState("");
  const [estado, setEstado] = useState("");



  const createPistaForApi = async (e) => {
    e.preventDefault();

    const newPista = {
      id_club: id_club,
      numero_pista: numeropista,
      precio_hora: preciohora,
      superficie: superficie,
      estado_pista: estado
    }

    try {
      const response = await createPista(newPista)
      console.log("Pista creada con exito!", response)

      setNumeroPista("")
      setEstado("")
      setPrecioHora("")
      setSuperficie("")

      await Swal.fire({
        icon: 'success',
        title: '¡Pista Creada!',
        text: `La Pista ${newPista.numero_pista} ha sido añadida.`,
        showConfirmButton: false,
        timer: 1500
      });

      Navigate(`/pistas/${id_club}`)

    } catch (err) {

      console.error("ERROR");

      const errorMessage = "Comprueba que todos los campos esten rellenos."
      Swal.fire({
        icon: 'error',
        title: 'Error de Guardado',
        text: errorMessage,
        confirmButtonText: 'Entendido'
      });

    }
  }


  useEffect(() => {
    if (localStorage.getItem("token") == null) {
      Navigate("/")
    }
  }, [localStorage.getItem("token")]);


  return (
    <>

      <div className='bg-primary bg-opacity-25 mt-5 rounded-top-5'>
        <PageHeader
          title="Creando tu nueva pista"

        />

        <div className='titulo p-3'>
          <h1 className=''>Como Club aqui tienes el proceso para poder añadir tantas pistas como tengas.</h1>
        </div>
        <form className='p-3' onSubmit={createPistaForApi}>
          <label className='mb-3 mt-3' htmlFor='numero de pista'>Introduce el numero de pista</label>
          <input type='number'
            className='form-control mb-5'
            id='numero de pista'
            placeholder='introduce el numero de la pista'
            value={numeropista}
            onChange={(e) => { setNumeroPista(e.target.value) }}
            required
          />
          <label className='form-label mb-3' htmlFor='superficie'>Seleciona tipo de superficie</label>
          <input className='form-control mb-2'
            list='optionSuperficie'
            id='superficie'
            placeholder='tipo de superficie'
            value={superficie}
            onChange={(e) => { setSuperficie(e.target.value) }}
            required />
          <datalist id='optionSuperficie'>
            <option value="CESPED" /> cambiar
            <option value="HORMIGON" />
            <option value="SINTETICO" />
          </datalist>
          <label className='form-label mb-3 ' htmlFor='precio pista'>Precio Hora.</label>
          <input type="text"
            className='form-control mb-2'
            id='precio pista'
            placeholder='Precio de pista, ej 10'
            value={preciohora}
            onChange={(e) => { setPrecioHora(e.target.value) }}
          />
          <label className='form-label mb-3' htmlFor='estado'>Seleciona estado de la pista</label>
          <input className='form-control mb-2'
            list='optionEstado'
            id='estado'
            placeholder='Estado de la pista'
            value={estado}
            onChange={(e) => { setEstado(e.target.value) }}
            required />
          <datalist id='optionEstado'>
            <option value="LIBRE" />
            <option value="MANTENIMIENTO" />
          </datalist>
          <div className='d-flex justify-content-center align-items-center'>
            <button className='btn btn-outline-primary mt-3' type='submit' >Guardar pista.</button>
          </div>
        </form>
      </div>
    </>
  )
}