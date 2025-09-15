import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Clubes = () => {

	const navigate = useNavigate()

	useEffect(() => {
		if (localStorage.getItem("token") == null) {
			navigate("/")
		}
	}, [localStorage.getItem("token")]);

	return (
		<div className="container">
            <h1 className="text-black">Lista de clubes con su info</h1>
		</div>
	);
};