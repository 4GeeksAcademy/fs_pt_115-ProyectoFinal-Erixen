import { Outlet, useLocation } from "react-router-dom";
import ScrollToTop from "../components/ScrollToTop";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";

// Base component that maintains the navbar and footer throughout the page and the scroll to top functionality.
export const Layout = () => {
    const location = useLocation();
    return (
        <ScrollToTop>
            {/* la navbar no se mostrara en la landing page,pero si en las demas, 
            esa la funcion del hook useLocation */}
            {location.pathname !== "/" && <Navbar />}
            {/* Elementos del fondo animado */}
            <div className="animated-bg-shape animate-blob" style={{ top: '-5%', left: '-10%', backgroundColor: '#8ECAE6', zIndex: -1 }}></div>
            <div className="animated-bg-shape animate-blob" style={{ bottom: '-10%', right: '-10%', backgroundColor: '#FFB703', zIndex: -1 }}></div>
            <div className="animated-bg-shape animate-blob" style={{ bottom: '5%', left: '20%', backgroundColor: '#FB8500', zIndex: -1 }}></div>

            <main style={{ position: 'relative', zIndex: 1 }}>
                <Outlet />
            </main>
            <Footer />
        </ScrollToTop>
    )
}