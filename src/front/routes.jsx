// Import necessary components and functions from react-router-dom.

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { Layout } from "./pages/Layout";
import { Home } from "./pages/Home";
import { Profile } from "./pages/Profile";
import { LandingPage } from "./pages/LandingPage";
import { Clubes } from "./pages/Clubes";
import { ReservasUsuario } from "./pages/ReservasUsuario";
import { Pistas } from "./pages/Pistas";
import { SobreNosotros } from "./pages/SobreNosotros";
import { ContactUs } from "./pages/ContactUs";
import { ReservasUsuarioInfo } from "./pages/ReservasUsuarioInfo";
import { CalendarioPista } from "./pages/CalendarioPista";
import { CrearPista } from "./pages/CrearPista";
export const router = createBrowserRouter(
  createRoutesFromElements(
    // CreateRoutesFromElements function allows you to build route elements declaratively.
    // Create your routes here, if you want to keep the Navbar and Footer in all views, add your new routes inside the containing Route.
    // Root, on the contrary, create a sister Route, if you have doubts, try it!
    // Note: keep in mind that errorElement will be the default page when you don't get a route, customize that page to make your project more attractive.
    // Note: The child paths of the Layout element replace the Outlet component with the elements contained in the "element" attribute of these child paths.

    // Root Route: All navigation will start from here.
    <Route path="/" element={<Layout />} errorElement={<h1>Not found!</h1>} >

      {/* Nested Routes: Defines sub-routes within the BaseHome component. */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/home" element={<Home />} />
      <Route path="/clubes" element={<Clubes />} />
      <Route path="/pistas/:id" element={<Pistas />} />
      <Route path="/sobre-nosotros" element={<SobreNosotros />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/reservas/:user_id" element={<ReservasUsuario />} />
        <Route path="/reservasInfo/:idReserva" element={<ReservasUsuarioInfo />} />
      <Route path="/contacto" element={<ContactUs />} />
      <Route path="/calendario-pista/:pista_id" element={<CalendarioPista />} />
      <Route path="/crearPista" element={<CrearPista />} />
    </Route>
  )
);

//añadido aqui ruta para crear pista linea 42;