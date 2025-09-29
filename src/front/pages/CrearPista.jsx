import React, { useState } from 'react';
import { Navigate } from 'react-big-calendar';
import { PageHeader } from "../components/PageHeader";
import { file } from 'zod';

export const CrearPista = () => {

  
  const [numeropista, setnumeroPista] = useState ("");
  const [imagen, setImagen] = useState (file[0]);
  const [imagenpistaDos, setImagenpistaDos] = useState (file[0]);
  const [imagenpistaTres, setImagenpistaTres] = useState (file[0]);
  return (
    <>

      <div className='bg-primary bg-opacity-25 mt-5 rounded-top-5'>
        <PageHeader
        title="Creando tu nueva pista"
        
      />

        <div className='titulo p-3'>
          <h1 className=''>Como Club aqui tienes el proceso para poder añadir tantas pistas como tengas.</h1>
        </div>
        <form className='p-3'>
          <label className='mb-3 mt-3' htmlFor='numero de pista'>Introduce el numero de pista</label>
          <input type='text' className='form-control mb-5' id='numero de pista' placeholder='introduce el numero de la pista' required></input>
          <label className='mb-3' htmlFor='imagenes'>Seleciona las imagenes de tu pista</label>
          <input type="file" className='imagen form-control mb-2' required />
          <input type="file" className='imagenpistaDos form-control mb-2' />
          <input type="file" className='imagenpistaTres form-control mb-2' />
          <div className='d-flex justify-content-center align-items-center'>
            <button className='btn btn-outline-primary mt-3' type='submit' >Guardar pista.</button>
          </div>
        </form>
      </div>
    </>
  )
}

// RECORDATORIO IMPORTANTE:

// EN EL BACKEND NECESITAMOS LO QUE ES PARA LA PISTA TRES OPCIONES DE IMAGEN QUE SE PUEDAN REGISTRAR Y SE PUEDAN GUARDAR