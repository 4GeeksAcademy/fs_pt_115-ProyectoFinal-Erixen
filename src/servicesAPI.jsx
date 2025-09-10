
//`${import.meta.env.VITE_BACKEND_URL}/api/signup` ==> aqui lo que vamos a hacer es importar la variable que lleva la url del backend.

//---------------------------------------------------------------------
//USERS

//Funciona
export const getUsers = async () => {
	const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/users`);
	const data = await response.json();
	return data;


}

//Funciona
export const getUser = async (id) => {
	const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/users/${id}`);

	if (!response.ok) {
		console.log("There's not user, create one");
		createUser();
		return null;
	}

	const data = await response.json();
	return data;
}

export const createUser = async () => {
	const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/users`,{
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
	return data;
}

export const deleteUser = async (id) => {
	const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/users/${id}`, {
		method: "DELETE"
	});

	if (!response.ok) {
		console.log("There's not user to delete");
		return null;
	}

	const data = await response.json();
	return data;
}
//---------------------------------------------------------------------
// CLUBS

export const getclubs = async () => {
	const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/clubs`);
	const data = await response.json();
	return data;
}

export const getclub = async (id) => {
	const response = await fetch(`https://silver-rotary-phone-wv5697xw6vc9xpg-3001.app.github.dev/api/clubs/${id}`);

	if (!response.ok) {
		console.log("There's not club, create one");
		return null;
	}

	const data = await response.json();
	return data;
}

export const createclub = async () => {
	const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/clubs`, {
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
	return data;
}
//---------------------------------------------------------------------
// PISTAS

export const getpistas = async () => {
	const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/pistas`);
	const data = await response.json();
	return data;
}

export const getpista = async (id) => {
	const response = await fetch(`https://silver-rotary-phone-wv5697xw6vc9xpg-3001.app.github.dev/api/pistas/${id}`);

	if (!response.ok) {
		console.log("There's not pista, look for another.");
		return null;
	}

	const data = await response.json();
	return data;

}

//---------------------------------------------------------------------
// RESERVAS

export const getreservas = async () => {
	const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/reservas`);
	const data = await response.json();
	return data;
}

export const getreserva = async (id) => {
	const response = await fetch(`https://silver-rotary-phone-wv5697xw6vc9xpg-3001.app.github.dev/api/reservas/${id}`);

	if (!response.ok) {
		console.log("There's not reserva, look for another.");
		return null;
	}

	const data = await response.json();
	return data;

}

export const createReserva = async () => {
	const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/reservas`, {
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
	return data;
}

