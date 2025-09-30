import React, { useState } from 'react';
import { Navigate } from 'react-big-calendar';
import { PageHeader } from "../components/PageHeader";
import { file } from 'zod';
import { createPista } from '../../services/servicesAPI';

export const CrearPista = () => {

  
  const [numeropista, setnumeroPista] = useState ("");
  const [preciohora, setprecioHora] = useState ("");
  const [superficie, setSuperficie] = useState ("");
  const [estado, setEstado] = useState ("");

  const createPistaForApi = async ()=>{
    const pistaClub = await createPista();
    setPistas(pistaClub);

  }


  return (
    <>

      <div className='bg-primary bg-opacity-25 mt-5 rounded-top-5'>
        <PageHeader
        title="Creando tu nueva pista"
        
      />

        <div className='titulo p-3'>
          <h1 className=''>Como Club aqui tienes el proceso para poder añadir tantas pistas como tengas.</h1>
        </div>
        <form className='p-3'onSubmit={createPistaForApi}>
          <label className='mb-3 mt-3' htmlFor='numero de pista'>Introduce el numero de pista</label>
          <input type='text' 
          className='form-control mb-5' 
          id='numero de pista' 
          placeholder='introduce el numero de la pista' 
          value={numeropista}
          onChange={e.target.value}
          required
          />
          <label className='form-label mb-3' htmlFor='superficie'>Seleciona tipo de superficie</label>
          <input className='form-control mb-2'
          list='optionSuperficie' 
          id='superficie' 
          placeholder='tipo de superficie' 
          value={superficie}
          onChange={e.target.value}
          required />
          <datalist id='optionSuperficie'>
            <option value="Cesped."/>
            <option value="Hormigon."/>
            <option value="Sintetico."/>
          </datalist>
          <label className='form-label mb-3 ' htmlFor='precio pista'>Precio Hora.</label>
          <input type="text" 
          className='form-control mb-2' 
          id='precio pista'
          value={preciohora}
          onChange={e.target.value}
          />
          <label className='form-label mb-3' htmlFor='estado'>Seleciona estado de la pista</label>
          <input className='form-control mb-2' 
          list='optionEstado' 
          id='estado' 
          placeholder='Estado de la pista' 
          value={estado}
          onChange={e.target.value}
          required />
          <datalist id='optionEstado'>
            <option value="Libre."/>
            <option value="Mantenimiento."/>
          </datalist>
          <div className='d-flex justify-content-center align-items-center'>
            <button className='btn btn-outline-primary mt-3' type='submit' >Guardar pista.</button>
          </div>
        </form>
      </div>
    </>
  )
}

// RECORDATORIO IMPORTANTE:

// YA NO SE PUEDE TOCAR BACKEND, AL NO TENER LA OPCION DE IMAGEN LA CARTA SE QUEDARA SIMPLE CON SOLO TEXT.