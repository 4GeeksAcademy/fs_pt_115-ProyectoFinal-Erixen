import React, { useState } from "react";
import { useEffect } from "react";

export const ServicesAPI = () => {

	//---------------------------------------------------------------------
	// VAMOS A CREAR LOS STATES PARA GUARDAR LA INFORMACION DE LA API
	
	const [users, setusers] = useState([]);
	const [user, setuser] = useState(null);

	const [clubs, setClubs] = useState([]);
	const [club, setClub] = useState(null);

	const [pistas, setPistas] = useState([]);	

	const [reservas, setreservas] = useState([]);
	const [reserva, setreserva] = useState(null);
	



    //---------------------------------------------------------------------
	// VAMOS A CREAR LAS FUNCIONES PARA HACER PETICIONES A LA API
	// USERS

	const getUsers = async () => {
		const response = await fetch("http://localhost:3001/api/users");
		const data = await response.json();
		setusers(data);
		return data;
		
		
	}

	const getUser = async (id) => {
		const response = await fetch(`http://localhost:3001/api/users/${id}`);
		
		if(!response.ok){
			console.log("There's not user, create one");
			return null;
		}

		const data = await response.json();
		setuser(data);
		return data;
	}

    const createUser = async () => {
        const response = await fetch("http://localhost:3001/api/users", {
            method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				name: "New Name ",
				email: "New Email ",
				password: "New Password"
			})
        })
		const data = await response.json();
		setuser((prev) => [...prev, data]);
		return data;
    }    

	//---------------------------------------------------------------------
	// CLUBS
	const getclubs = async () => {
		const response = await fetch("http://localhost:3001/api/clubs");
		const data = await response.json();
		setClubs(data);
		return data;
	}

	const getclub = async (id) => {
		const response = await fetch(`http://localhost:3001/api/clubs/${id}`);
		
		if(!response.ok){
			console.log("There's not club, create one");
			return null;
		}

		const data = await response.json();
		setClub(data);
		return data;
	}
	
	const createclub = async () => {
		const response = await fetch("http://localhost:3001/api/clubs", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				email: "New Email ",
				password: "New Password",
				Cif: "New CIF"
			})
		})
		const data = await response.json();
		setClub((prev) => [...prev, data]);
		return data;		
	}
    //---------------------------------------------------------------------
	// PISTAS
	const getpistas = async () => {
		const response = await fetch("http://localhost:3001/api/pistas");
		const data = await response.json();
		setPistas(data);
		return data;
	}

	const getpista = async (id) => {
		const response = await fetch(`http://localhost:3001/api/pistas/${id}`);
		
		if(!response.ok){
			console.log("There's not pista, look for another.");
			return null;
		}

		const data = await response.json();
		setPistas(data);
		return data;

	}
    
	//---------------------------------------------------------------------
	// RESERVAS
	const getreservas = async () => {
		const response = await fetch("http://localhost:3001/api/reservas");
		const data = await response.json();
		setreservas(data);
		return data;
	}

	const getreserva = async (id) => {
		const response = await fetch(`http://localhost:3001/api/reservas/${id}`);
		
		if(!response.ok){
			console.log("There's not reserva, look for another.");
			return null;
		}

		const data = await response.json();
		setreserva(data);
		return data;

	}

	//---------------------------------------------------------------------
	
	
	return ({
		<>
		</>
	});
