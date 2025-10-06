import { useEffect, useState } from "react";
import { getClub, getUserForId, updateClub, updateUser } from "../../services/servicesAPI";
import { Link } from "react-router-dom";


export const Profile = () => {
  const [user, setUser] = useState();
  const [club, setClub] = useState();
  const id = localStorage.getItem("id")
  const tipoDeUsuario = localStorage.getItem("user_type")




  useEffect(() => {
    const fetchData = async () => {
      if (tipoDeUsuario === "user") {
        const data = await getUserForId(id);
        if (data) {
          setUser(data);
        }
      } else if (tipoDeUsuario === "club") {
        const data = await getClub(id);
        if (data) {
          setClub(data);
        }
      }
    };

    if (id && tipoDeUsuario) {
      fetchData();
    }
  }, [id, tipoDeUsuario]);


  useEffect(() => {
    if (tipoDeUsuario == "user") {
      if (user) {
        setInputNombre(user.nombre ?? "");
        setInputApellidos(user.apellidos ?? "");
        setInputEmail(user.email ?? "");
        setInputTelefono(user.telefono ?? "");
      }
    } else if (tipoDeUsuario == "club") {
      if (club) {
        setInputNombre(club.nombre ?? "");
        setInputDireccion(club.direccion ?? "");
        setInputEmail(club.email ?? "");
        setInputTelefono(club.telefono ?? "");
        setInputHoraApertura(club.hora_apertura ?? "");
        setInputHoraDeCierre(club.hora_cierre ?? "");

        setInputImagen1(club.imagen ?? "");
        setInputimagenDos(club.imagenDos ?? "");
        setInputimagenTres(club.imagenTres ?? "");
        setInputDescripcion(club.descripcion ?? "");
      }
    }
  }, [user, club]);




  const [ModoEdicion, SetModoEdicion] = useState(false)
  const [inputNombre, setInputNombre] = useState("")
  const [inputApellidos, setInputApellidos] = useState("")
  const [inputTelefono, setInputTelefono] = useState("")
  const [inputEmail, setInputEmail] = useState("")

  const handleInputNombre = (e) => { setInputNombre(e.target.value) }
  const handleInputApellidos = (e) => { setInputApellidos(e.target.value) }
  const handleInputEmail = (e) => { setInputEmail(e.target.value) }
  const handleInputTelefono = (e) => { setInputTelefono(e.target.value) }


  // para clubs
  const [inputDireccion, setInputDireccion] = useState("")
  const [inputHoraApertura, setInputHoraApertura] = useState("")
  const [inputHoraDeCierre, setInputHoraDeCierre] = useState("")
  const [inputImagen1, setInputImagen1] = useState("")
  const [inputimagenDos, setInputimagenDos] = useState("")
  const [inputimagenTres, setInputimagenTres] = useState("")
  const [inputDescripcion, setInputDescripcion] = useState("")

  const handleInputDirerccion = (e) => { setInputDireccion(e.target.value) }
  const handleInputHoraDeApertura = (e) => { setInputHoraApertura(e.target.value) }
  const handleInputHoraDeCierre = (e) => { setInputHoraDeCierre(e.target.value) }
  const handleInputImagen1 = (e) => { setInputImagen1(e.target.value) }
  const handleInputimagenDos = (e) => { setInputimagenDos(e.target.value) }
  const handleInputimagenTres = (e) => { setInputimagenTres(e.target.value) }
  const handleInputDescripcion = (e) => { setInputDescripcion(e.target.value) }



  return (
    <>
      <div class="background" style={{ zIndex: "-99" }}>
        <span class="ball"></span>
        <span class="ball"></span>
        <span class="ball"></span>
        <span class="ball"></span>
        <span class="ball"></span>
        <span class="ball"></span>
        <span class="ball"></span>
        <span class="ball"></span>
        <span class="ball"></span>
        <span class="ball"></span>
        <span class="ball"></span>
        <span class="ball"></span>
      </div>

      {tipoDeUsuario == "user" && (
        user && (

          <div className="container mi-caja mt-5 p-1 pb-2" style={{ borderRadius: "10px",}}>
            
            <div className="d-flex justify-content-between">
              <div className="Spacer No borrar"></div>
              <img src="default_profile.jpg" className="ms-3" style={{ maxWidth: "150px", maxHeight: "200px", borderRadius: "100px", objectFit: "cover", }} />
              <img onClick={() => SetModoEdicion(prev => !prev)} src="public/engranaje.png" style={{ width: "20px", height: "20px" }} />
            </div>

            <div className="d-flex text-center justify-content-center mt-2" >
              <h2 className="px-2 mt-1" style={{ borderRadius: "10px", fontFamily: "Lexend Peta" }}>INFORMACION DE USUARIO</h2>
            </div>
            <div className="">
              {!ModoEdicion &&
                <div className="row m-0 d-flex flex-colum justify-content-around">
                  <div className=" col-12 col-md-12 align-items-center" >
                    <div className="" style={{ borderRadius: "10px" }}>
                      <div className="d-flex justify-content-center mx-auto align-items-center" >
                        <h3 className="mt-2" >{user.nombre}</h3>
                        <h3  className="ms-2 mt-2">{user.apellidos}</h3>
                      </div>
                    </div>
                  </div>
                  <div className=" col-12 col-md-12 align-items-center" >
                    <div className="" style={{ borderRadius: "10px" }}>
                      <div className="d-flex flex-column align-items-center">
                        <h3 className="mt-2" >{user.email}</h3>
                      </div>
                      <div className="d-flex flex-column align-items-center">
                        <h3 className="mt-2" >{user.telefono}</h3>
                      </div>
                    </div>
                  </div>
                  <div className=" col-md-10 mt-2 align-items-center" id="divAcederReservas" style={{ borderRadius: "10px" }}>
                    <div className="mt-2 align-items-center" >
                      <div>
                        <div className="d-flex flex-column align-items-center" >
                          <h2 className="mt-1" >MIS RESERVAS</h2>
                        </div>
                        <div className="d-flex flex-column pb-2 align-items-center">
                          <Link to={`/reservas/${id}`}>
                          <button type="button"  className="btn btn-outline-primary btn-lg">ACCEDER</button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              }
              {ModoEdicion &&
                <div className="row m-0 d-flex justify-content-around">
                  <div className="mt-2 col-12 col-md-12 align-items-center" >
                    <div className="pb-2" style={{ borderRadius: "10px" }}>
                      <div className="d-flex flex-column align-items-center" style={{width: "auto"}} >
                        <label htmlFor="nombre"><h3>NOMBRE:</h3></label>
                        <input className="form-control text-center border-0" placeholder={user.nombre} type="text" value={inputNombre} style={{ backgroundColor: "transparent", color: "black" }} onChange={(e) => handleInputNombre(e)} id="nombre" />

                        <label htmlFor="Apellidos"><h3>APELLIDOS:</h3></label>
                        <input className="form-control text-center border-0" placeholder={user.apellidos} style={{ backgroundColor: "transparent", color: "black" }} type="text" value={inputApellidos} onChange={(e) => handleInputApellidos(e)} id="Apellidos" />
                      </div>
                    </div>
                  </div>
                  <div className="mt-2 col-12 col-md-12 align-items-center" >
                    <div className="pb-2" style={{ borderRadius: "10px" }}>
                      <div className="d-flex flex-column align-items-center" style={{width: "auto"}}  >
                        <label htmlFor="Email"><h3>EMAIL:</h3></label>
                        <input className="form-control text-center border-0" placeholder={user.email} type="text" value={inputEmail} style={{ backgroundColor: "transparent", color: "black" }} onChange={(e) => handleInputEmail(e)} id="Email" />

                        <label htmlFor="Telefono"><h3>TELEFONO:</h3></label>
                        <input className="form-control text-center border-0" placeholder={user.telefono} type="tel" value={inputTelefono} style={{ backgroundColor: "transparent", color: "black" }} onChange={(e) => handleInputTelefono(e)} id="Telefono" />
                      </div>
                    </div>
                  </div>
                  <div className="mt-2 d-flex justify-content-center">
                    <button

                      type="button"
                      onClick={async () => {
                        const updatedDataUser = {
                          nombre: (inputNombre ?? "").trim() || (user?.nombre ?? ""),
                          apellidos: (inputApellidos ?? "").trim() || (user?.apellidos ?? ""),
                          email: (inputEmail ?? "").trim() || (user?.email ?? ""),
                          telefono: (((inputTelefono ?? "") || (user?.telefono ?? "")).toString().replace(/\D/g, "")) // elimina cualquier letra
                        };

                        const result = await updateUser(id, updatedDataUser);
                        

                        if (result.error) {
                          alert(`Error al actualizar:${result.error.message}`);
                          
                        } else {
                          // actualiza el estado local para que la UI refleje los cambios
                          setUser(prev => ({ ...prev, ...updatedDataUser }));
                          SetModoEdicion(false); // opcional: salir del modo edición
                          alert("Usuario actualizado correctamente");
                          
                        }
                      }}
                      className="btn btn-outline-primary btn-lg"
                    >
                      Guardar Cambios
                    </button>

                  </div>
                </div>
              }
            </div>
          </div >
        )
      )}
      {tipoDeUsuario == "club" && (
        club && (
          <div className="container mi-caja mt-5 p-1 pb-2" id="FondoMegatop" style={{ borderRadius: "10px", }}>
            <div className="d-flex justify-content-between">
              <div className="Spacer No borrar"></div>
              <img src="default_profile.jpg" className="ms-3" style={{ maxWidth: "150px", maxHeight: "200px", borderRadius: "100px", objectFit: "cover", }} />
              <i onClick={() => SetModoEdicion(prev => !prev)}
                style={{ cursor: "pointer" }} className="fa-solid fa-gear" />
            </div>
            <div className="d-flex text-center justify-content-center mt-2" >
              <h2 className="px-2" style={{ borderRadius: "10px" }}>INFORMACION DE CLUB</h2>
            </div>
            <div className="">
              {!ModoEdicion &&
                <div className="row m-0 d-flex flex-colum justify-content-around">

                  <div className=" col-12 col-md-12 align-items-center" >
                    <div className="" style={{ borderRadius: "10px" }}>
                      <div className="d-flex justify-content-center mx-auto align-items-center" >
                        <h3>{club.nombre}</h3>
                      </div>
                      <div className="d-flex justify-content-center mx-auto align-items-center">
                        <h3 className="ms-2">{club.direccion}</h3>
                      </div>
                    </div>
                  </div>
                  <div className=" col-12 col-md-12 align-items-center" >
                    <div className="" style={{ borderRadius: "10px" }}>
                      <div className="d-flex flex-column align-items-center">
                        <h3>{club.email}</h3>
                      </div>
                      <div className="d-flex flex-column align-items-center">
                        <h3>{club.telefono}</h3>
                      </div>
                    </div>
                  </div>
                  <div className=" col-12 col-md-12 align-items-center" >
                    <div className="" style={{ borderRadius: "10px" }}>
                      <div className="d-flex flex-column align-items-center">
                        <h3>{club.hora_apertura}</h3>
                      </div>
                      <div className="d-flex flex-column align-items-center">
                        <h3>{club.hora_cierre}</h3>
                      </div>
                    </div>
                  </div>
                 
                  <div class="accordion text-center " id="accordionExample">
                    <div class="accordion-item text-center">
                      <h2 class="accordion-header text-center">
                        <button class="accordion-button text-center mx-auto" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                          <span className="mx-auto me-2">ACABA DE PERSONALIZAR TU CLUB</span>
                        </button>
                      </h2>
                      <div id="collapseOne" class="accordion-collapse text-center mx-auto collapse" data-bs-parent="#accordionExample">
                        <div class="accordion-body  text-center mx-auto">
                          <div className=" col-md-10 mt-2  text-center mx-auto align-items-center" id="divAcederReservas" style={{ borderRadius: "10px" }}>
                            <div className="mt-2 align-items-center text-center" >
                              <div>
                                <div className="d-flex text-center flex-column pb-2 align-items-center">
                                  <h2 className="mt-2 text-center">PON IMAGENES</h2>
                                  <label className="mt-2" htmlFor="Imagen1"><h3>IMAGEN 1:</h3></label>
                                  <input className="form-control text-center border-0" placeholder={club.imagenTres} style={{ backgroundColor: "transparent", color: "black" }} type="text" value={inputImagen1} onChange={(e) => handleInputImagen1(e)} id="Imagen1" />
                                  <label htmlFor="imagenDos"><h3>IMAGEN 2:</h3></label>
                                  <input className="form-control text-center border-0" placeholder={club.imagenDos} style={{ backgroundColor: "transparent", color: "black" }} type="text" value={inputimagenDos} onChange={(e) => handleInputimagenDos(e)} id="imagenDos" />
                                  <label htmlFor="imagenTres"><h3>IMAGEN 3:</h3></label>
                                  <input className="form-control text-center border-0" placeholder={club.imagenTres} style={{ backgroundColor: "transparent", color: "black" }} type="text" value={inputimagenTres} onChange={(e) => handleInputimagenTres(e)} id="imagenTres" />
                                  <label htmlFor="DescripcionDeClub"><h3>DESCRIBE TU CLUB:</h3></label>
                                  <div className="form-floating mb-4 text-primary">
                                    <textarea
                                      className="form-control"
                                      id="DescripcionDeClub"
                                      placeholder="Cuentanos como es tu club"
                                      style={{ backgroundColor: "transparent", color: "black" }}
                                      value={inputDescripcion}
                                      onChange={(e) => handleInputDescripcion(e)}
                                      required
                                    ></textarea>
                                  </div>
                                  <button

                                    type="button"
                                    onClick={async () => {
                                      const updatedDataIMGS = {
                                        imagen: (inputImagen1 ?? "").trim() || (club?.imagen ?? ""),
                                        imagenDos: (inputimagenDos ?? "").trim() || (club?.imagenDos ?? ""),
                                        imagenTres: (inputimagenTres ?? "").trim() || (club?.imagenTres ?? ""),
                                        descripcion: (inputDescripcion ?? "").trim() || (club?.descripcion ?? ""),
                                        // LOS PONGO PARA NO TOCAR BACK-END YA QUE SON NECESARIOS PARA PODER MODIFICAR
                                        nombre: (inputNombre ?? "").trim() || (club?.nombre ?? ""),
                                        direccion: (inputDireccion ?? "").trim() || (club?.direccion ?? ""),
                                        hora_apertura: (inputHoraApertura ?? "").trim() || (club?.hora_apertura ?? ""),
                                        hora_cierre: (inputHoraDeCierre ?? "").trim() || (club?.hora_cierre ?? ""),
                                        email: (inputEmail ?? "").trim() || (club?.email ?? ""),
                                        telefono: (((inputTelefono ?? "") || (club?.telefono ?? "")).toString().replace(/\D/g, "")) // elimina cualquier letra
                                      };

                                      const result = await updateClub(id, updatedDataIMGS);
                                      

                                      if (result.error) {
                                        alert(`Error al actualizar:${result.error.message}`);
                                        
                                      } else {
                                        // actualiza el estado local para que la UI refleje los cambios
                                        setClub(prev => ({ ...prev, ...updatedDataIMGS }));
                                        SetModoEdicion(false); // opcional: salir del modo edición
                                        alert("Club actualizado correctamente");
                                        
                                      }
                                    }}
                                    className="btn btn-outline-primary btn-lg"
                                  >
                                    Guardar Cambios
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              }
              {ModoEdicion &&
                <div className="row m-0 d-flex justify-content-around">
                  <div className="mt-2 col-12 col-md-12 align-items-center" >
                    <div className="pb-2" style={{ borderRadius: "10px" }}>
                      <div className="d-flex flex-column align-items-center" >
                        <label htmlFor="nombre"><h3>NOMBRE:</h3></label>
                        <input className="form-control text-center border-0" placeholder={club.nombre} type="text" value={inputNombre} style={{ backgroundColor: "transparent", color: "black" }} onChange={(e) => handleInputNombre(e)} id="nombre" />

                        <label htmlFor="Direccion"><h3>DIRECCION:</h3></label>
                        <input className="form-control text-center border-0" placeholder={club.direccion} style={{ backgroundColor: "transparent", color: "black" }} type="text" value={inputDireccion} onChange={(e) => handleInputDirerccion(e)} id="Direccion" />
                      </div>
                    </div>
                  </div>
                  <div className="mt-2 col-12 col-md-12 align-items-center" >
                    <div className="pb-2" style={{ borderRadius: "10px" }}>
                      <div className="d-flex flex-column align-items-center" >
                        <label htmlFor="Email"><h3>EMAIL:</h3></label>
                        <input className="form-control text-center border-0" placeholder={club.email} type="text" value={inputEmail} style={{ backgroundColor: "transparent", color: "black" }} onChange={(e) => handleInputEmail(e)} id="Email" />

                        <label htmlFor="Telefono"><h3>TELEFONO:</h3></label>
                        <input className="form-control text-center border-0" placeholder={club.telefono} type="tel" value={inputTelefono} style={{ backgroundColor: "transparent", color: "black" }} onChange={(e) => handleInputTelefono(e)} id="Telefono" />
                      </div>
                    </div>
                  </div>
                  <div className="mt-2 col-12 col-md-12 align-items-center" >
                    <div className="pb-2" style={{ borderRadius: "10px" }}>
                      <div className="d-flex flex-column align-items-center" >
                        <label htmlFor="HoraDeApertura"><h3>HORA DE APERTURA:</h3></label>
                        <input className="form-control text-center border-0" placeholder={club.hora_apertura} type="time" value={inputHoraApertura} style={{ backgroundColor: "transparent", color: "black" }} onChange={(e) => handleInputHoraDeApertura(e)} id="HoraDeApertura" />

                        <label htmlFor="HoraDeCierre"><h3>HORA DE CIERRE:</h3></label>
                        <input className="form-control text-center border-0" placeholder={club.hora_cierre} style={{ backgroundColor: "transparent", color: "black" }} type="time" value={inputHoraDeCierre} onChange={(e) => handleInputHoraDeCierre(e)} id="HoraDeCierre" />
                      </div>
                    </div>
                  </div>
                  <div className="mt-2 d-flex justify-content-center">
                    <button

                      type="button"
                      onClick={async () => {
                        const updatedDataUser = {
                          nombre: (inputNombre ?? "").trim() || (club?.nombre ?? ""),
                          direccion: (inputDireccion ?? "").trim() || (club?.direccion ?? ""),
                          hora_apertura: (inputHoraApertura ?? "").trim() || (club?.hora_apertura ?? ""),
                          hora_cierre: (inputHoraDeCierre ?? "").trim() || (club?.hora_cierre ?? ""),
                          email: (inputEmail ?? "").trim() || (club?.email ?? ""),
                          telefono: (((inputTelefono ?? "") || (club?.telefono ?? "")).toString().replace(/\D/g, "")), // elimina cualquier letra
                          imagen: (inputImagen1 ?? "").trim() || (club?.imagen ?? ""),
                          imagenDos: (inputimagenDos ?? "").trim() || (club?.imagenDos ?? ""),
                          imagenTres: (inputimagenTres ?? "").trim() || (club?.imagenTres ?? ""),
                          descripcion: (inputDescripcion ?? "").trim() || (club?.descripcion ?? "")
                        };

                        const result = await updateClub(id, updatedDataUser);
                       

                        if (result.error) {
                          alert(`Error al actualizar:${result.error.message}`);
                          
                        } else {
                          // actualiza el estado local para que la UI refleje los cambios
                          setClub(prev => ({ ...prev, ...updatedDataUser }));
                          SetModoEdicion(false); // opcional: salir del modo edición
                          alert("Club actualizado correctamente");
                          
                        }
                      }}
                      className="btn btn-outline-primary btn-lg"
                    >
                      Guardar Cambios
                    </button>

                  </div>
                </div>
              }
            </div>
          </div >
        )

      )}
    </>
  );
};
