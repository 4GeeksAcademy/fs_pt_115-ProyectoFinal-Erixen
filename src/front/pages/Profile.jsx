import { useEffect, useState } from "react";
import { getUser } from "../../services/servicesAPI";

export const Profile = () => {
  const [ModoEdicion, SetModoEdicion] = useState(false)
  const [inputNombre, setInputNombre] = useState("")
  const [inputApellidos, setInputApellidos] = useState("")
  const [inputTelefono, setInputTelefono] = useState("")
  const [inputEmail, setInputEmail] = useState("")

  const handleInputNombre = (e) => { setInputNombre(e.target.value) }
  const handleInputApellidos = (e) => { setInputApellidos(e.target.value) }
  const handleInputEmail = (e) => { setInputEmail(e.target.value) }
  const handleInputTelefono = (e) => { setInputTelefono(e.target.value) }

  const [user, setUser] = useState();
  const id = localStorage.getItem("id")
  
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const UserArray = await getUser(id); // esto devuelve un array
        setUser(UserArray[0]); // me quedo con el objeto dentro
      } catch (error) {
        console.error("Error cargando usuario:", error);
      }
    };

    fetchUser();
  }, []);



  console.log(user)

  return (
    <>
      {user && (
        <div className="container mi-caja mt-4 p-1 pb-2" id="FondoMegatop" style={{ borderRadius: "10px", maxWidth: "500px" }}>
          <div className="d-flex justify-content-between">
            <div className="Spacer No borrar"></div>
            <img src="/src/front/assets/default_profile.jpg" className="ms-3" style={{ maxWidth: "150px", maxHeight: "200px", borderRadius: "100px", objectFit: "cover", }} />
            <i onClick={() => SetModoEdicion(true)} style={{ cursor: "pointer" }} class="fa-solid fa-gear" />
          </div>
          <div className="d-flex text-center justify-content-center mt-2" >
            <h3 className="px-2" style={{ borderRadius: "10px" }}>INFORMACION DE USUARIO</h3>
          </div>
          <div className="">
            {!ModoEdicion &&
              <div className="row m-0 d-flex flex-colum justify-content-around">
                <div className=" col-12 col-md-12 align-items-center" >
                  <div className="" style={{ borderRadius: "10px" }}>
                    <div className="d-flex justify-content-center mx-auto align-items-center" >
                      <h4>{user.nombre}</h4>
                      <h4 className="ms-2">{user.apellidos}</h4>
                    </div>
                  </div>
                </div>
                <div className=" col-12 col-md-12 align-items-center" >
                  <div className="" style={{ borderRadius: "10px" }}>
                    <div className="d-flex flex-column align-items-center">
                      <h4>{user.email}</h4>
                    </div>
                    <div className="d-flex flex-column align-items-center">
                      <h4>{user.telefono}</h4>
                    </div>
                  </div>
                </div>
                <div className=" col-md-10 mt-2 align-items-center" id="divAcederReservas" style={{ borderRadius: "10px" }}>
                  <div className="mt-2 align-items-center" >
                    <div>
                      <div className="d-flex flex-column align-items-center" >
                        <h2 className="mt-1" style={{ fontFamily: "DM Serif Text" }}>MIS RESERVAS</h2>
                      </div>
                      <div className="d-flex flex-column pb-2 align-items-center">
                        <button type="button" style={{ fontFamily: "DM Serif Text" }} class="btn btn-outline-primary btn-lg">ACCEDER</button>
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
                      <label for="nombre"><h4>NOMBRE:</h4></label>
                      <input className="form-control text-center border-0" placeholder={user.nombre} type="text" value={inputNombre} style={{ backgroundColor: "transparent", color: "black" }} onChange={(e) => handleInputNombre(e)} id="nombre" />

                      <label for="Apellidos"><h4>APELLIDOS:</h4></label>
                      <input className="form-control text-center border-0" placeholder={user.apellidos} style={{ backgroundColor: "transparent", color: "black" }} type="text" value={inputApellidos} onChange={(e) => handleInputApellidos(e)} id="Apellidos" />
                    </div>
                  </div>
                </div>
                <div className="mt-2 col-12 col-md-12 align-items-center" >
                  <div className="pb-2" style={{ borderRadius: "10px" }}>
                    <div className="d-flex flex-column align-items-center" >
                      <label for="Email"><h4>EMAIL:</h4></label>
                      <input className="form-control text-center border-0" placeholder={user.email} type="text" value={inputEmail} style={{ backgroundColor: "transparent", color: "black" }} onChange={(e) => handleInputEmail(e)} id="Email" />

                      <label for="Telefono"><h4>TELEFONO:</h4></label>
                      <input className="form-control text-center border-0" placeholder={user.telefono} type="number" value={inputTelefono} style={{ backgroundColor: "transparent", color: "black" }} onChange={(e) => handleInputTelefono(e)} id="Telefono" />
                    </div>
                  </div>
                </div>
                <div className="mt-2 d-flex justify-content-center">
                  <button type="button" class="btn btn-outline-primary btn-lg">Guardar Cambios</button>
                </div>
              </div>
            }
          </div>
        </div>
      )}
    </>
  );
};
