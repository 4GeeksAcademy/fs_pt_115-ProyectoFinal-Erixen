import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {

	const navigate = useNavigate();

	return (

		<nav className="navbar navbar-expand-lg bg-body-tertiary navbar-dark p-0" >
			<div className="container-fluid p-2 " style={{ backgroundColor: "#013047" }}>
				<div onClick={() => navigate("/Home")} style={{ cursor: "pointer", maxWidth: "85px" }} className="d-flex align-items-center">
					<img src="/imgs/logo_cortado.png" className="mt-1 my-1" style={{ maxWidth: "20px", maxHeight: "100px" }} />
					<a className="navbar-brand ms-1" href="#" style={{ color: "white", fontFamily: "DM Serif Text" }}>Padel+</a>
				</div>
				<div className="d-flex me-2">
					<a className="nav-link active" aria-current="page" href="#" style={{ color: "white" }}>Home</a>

					<a className="nav-link active ms-2" href="#" style={{ color: "white" }}>Link</a>
					<a className="nav-link active ms-2" href="#" style={{ color: "white" }}>Link</a>
				</div>
				<img src="/imgs/pepaPig.jpg" onClick={() => navigate("/profile/<int:user_id>")} className="nav-link" style={{ maxWidth: "50px", maxHeight: "100px", borderRadius: "100px", cursor: "pointer" }} />
			</div>
		</nav>

	);
};