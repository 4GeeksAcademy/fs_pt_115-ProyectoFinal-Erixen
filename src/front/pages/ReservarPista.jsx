import { useEffect } from "react";
import { getReservas } from "../../servicesAPI";

export const ReservarPista = () => {

	useEffect(() => {
		getReservas()},[])

	return (
		<div className="container">
			<h1 className="text-black">Vista donde aparezcan las pistas disponibles</h1>
		</div>
	);
};