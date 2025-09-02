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
		const response = await fetch("https://silver-rotary-phone-wv5697xw6vc9xpg-3001.app.github.dev/api/users");
		const data = await response.json();
		setusers(data);
		return data;
		
		
	}

	const getUser = async (id) => {
		const response = await fetch(`https://silver-rotary-phone-wv5697xw6vc9xpg-3001.app.github.dev/api/users/${id}`);
		
		if(!response.ok){
			console.log("There's not user, create one");
			return null;
		}

		const data = await response.json();
		setuser(data);
		return data;
	}

    const createUser = async () => {
        const response = await fetch("https://silver-rotary-phone-wv5697xw6vc9xpg-3001.app.github.dev/api/users", {
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
		const response = await fetch("https://silver-rotary-phone-wv5697xw6vc9xpg-3001.app.github.dev/api/clubs");
		const data = await response.json();
		setClubs(data);
		return data;
	}

	const getclub = async (id) => {
		const response = await fetch(`https://silver-rotary-phone-wv5697xw6vc9xpg-3001.app.github.dev/api/clubs/${id}`);
		
		if(!response.ok){
			console.log("There's not club, create one");
			return null;
		}

		const data = await response.json();
		setClub(data);
		return data;
	}
	
	const createclub = async () => {
		const response = await fetch("https://silver-rotary-phone-wv5697xw6vc9xpg-3001.app.github.dev/api/clubs", {
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
		const response = await fetch("https://silver-rotary-phone-wv5697xw6vc9xpg-3001.app.github.dev/api/pistas");
		const data = await response.json();
		setPistas(data);
		return data;
	}

	const getpista = async (id) => {
		const response = await fetch(`https://silver-rotary-phone-wv5697xw6vc9xpg-3001.app.github.dev/api/pistas/${id}`);
		
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
		const response = await fetch("https://silver-rotary-phone-wv5697xw6vc9xpg-3001.app.github.dev/api/reservas");
		const data = await response.json();
		setreservas(data);
		return data;
	}

	const getreserva = async (id) => {
		const response = await fetch(`https://silver-rotary-phone-wv5697xw6vc9xpg-3001.app.github.dev/api/reservas/${id}`);
		
		if(!response.ok){
			console.log("There's not reserva, look for another.");
			return null;
		}

		const data = await response.json();
		setreserva(data);
		return data;

	}

	const createReserva = async () => {
		const response = await fetch("https://silver-rotary-phone-wv5697xw6vc9xpg-3001.app.github.dev/api/reservas", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				fecha: "2024-06-30",
				hora: "10:00",
				userId: 1,
				pistaId: 1
			})
		})
		const data = await response.json();
		setreserva((prev) => [...prev, data]);
		return data;		
	}

	//---------------------------------------------------------------------
	
	
	return (
		<>
			<h1>Servicios API</h1>

			<button onClick={getUsers}>Get Users</button>
			<button onClick={() => getUser(1)}>Get User 1</button>
			<button onClick={() => createUser}>Registrarse</button>
			<button onClick={getClubs}>Get Clubs</button>
			<button onClick={() => getClub(1)}>Get Club 1</button>
			<button onClick={() => createclub}>Registro Club</button>
			<button onClick={getPistas}>Get Pistas</button>
			<button onClick={()=> getpista(1)}>Get Pistas</button>
			<button onClick={getreservas}>Get Reservas</button>
			<button onClick={()=> getreserva(1)}>Get Pistas</button>
			<button onClick={() => createReserva}>Reservar</button>
		</>
	)
}