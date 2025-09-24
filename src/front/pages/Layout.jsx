import { Outlet, useLocation } from "react-router-dom";
import ScrollToTop from "../components/ScrollToTop";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";

// Base component that maintains the navbar and footer throughout the page and the scroll to top functionality.
export const Layout = () => {
    const location = useLocation();
    const isLandingPage = location.pathname === "/";

    if (isLandingPage) {
        // Para la LandingPage, no queremos el contenedor principal ni el footer
        return (
            <>
                <Navbar />
                <Outlet />
            </>
        );
    } else {
        // Para el resto de las páginas, mantenemos la estructura original
        return (
            <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                <ScrollToTop>
                    <Navbar/>
                    <main style={{ flex: 1, width: '100%', padding: '0 1rem' }}>
                        <div style={{ maxWidth: '1400px', margin: '0 auto', width: '100%' }}>
                            <Outlet />
                        </div>
                    </main>
                    <Footer />
                </ScrollToTop>
            </div>
        )
    }
}