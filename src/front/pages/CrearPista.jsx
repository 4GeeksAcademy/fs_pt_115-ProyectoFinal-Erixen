import React from 'react'
import { PageHeader } from '../components/PageHeader'

export const CrearPista = () => {
  return (
    <div>
      <PageHeader
        title=""
      
      />
      <h1 className='mb-5'>Estoy en proceso de mi formulario tenme un poco de paciencia "PROFESORES".</h1>
      <div className="container m-2">
        <div className="row">
          <form>
            <div className="imagen">
              <label className='mb-1' htmlFor='imagen'>Inserte enlace de la imagen.</label>
              <input className='form-control mb-3' type='text' id='imagen' placeholder='Obligatoria'required></input>
            </div>
            <div className="imagenDos">
              <label className='mb-1' htmlFor='imagenDos'>Inserte segunda imagen.</label>
              <input className='form-control mb-3' type='text' id='imagenDos' placeholder='Opcional'></input>
            </div>
            <div className="imagenTres">
              <label className='mb-1' htmlFor='imagenTres'>Inserte tercera imagen.</label>
              <input className='form-control mb-3' type='text' id='imagenTres' placeholder='Opcional'></input>
            </div>
            <div className='Numero de pista'>
              <label className='mb-1' htmlFor='numeropista'>Numero de la pista.</label>
              <input className='form-control mb-3' type='text' id='numeropista' placeholder='indica el numero de la pista' required></input> 
            </div>

          </form>

        </div>
      </div>
    </div>
  )
}

