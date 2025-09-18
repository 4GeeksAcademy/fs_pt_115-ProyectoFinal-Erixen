//---------------------------------------------------------------------

// SignUp de un usuario
export const createUser = async (newUser) => {
	const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/users`, {
		method: "POST",
		body: JSON.stringify(newUser),
		headers: {
			"Content-Type": "application/json"
		}
	})

	if (response.ok) {
		const res = await response.json();
		return { status: response.status, msg: res.msg };
	} else {
		const res = await response.json();
		return { status: response.status, msg: res.msg };
	}
};

// SignUp de un club
export const createClub = async (newClub) => {
	const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/clubs`, {
		method: "POST",
		body: JSON.stringify(newClub),
		headers: {
			"Content-Type": "application/json"
		}
	})

	if (response.ok) {
		const res = await response.json();
		return { status: response.status, msg: res.msg };
	} else {
		const res = await response.json();
		return { status: response.status, msg: res.msg };
	}
};

// Login
export const login = async (newLogin) => {
	const response = await fetch(
		`${import.meta.env.VITE_BACKEND_URL}/api/login`,
		{
			method: "POST",
			body: JSON.stringify(newLogin),
			headers: {
				"Content-Type": "application/json",
			},
		});

	if (response.ok) {
		const res = await response.json();
		localStorage.setItem("token", res.token);
		localStorage.setItem("user_type", res.user_type);
		return { status: response.status, msg: res.msg };
	} else {
		const res = await response.json();
		return { status: response.status, msg: res.msg };
	}
};

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

export const getClubs = async () => {
	const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/clubs`);
	const data = await response.json();
	return data;
}

export const getClub = async (id) => {
	const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/clubs/${id}`);

	if (!response.ok) {
		console.log("There's not club, create one");
		return null;
	}

	const data = await response.json();
	return data;
}

//---------------------------------------------------------------------
// PISTAS

export const getPistas = async () => {
	const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/pistas`);
	const data = await response.json();

	console.log(data);

	return data;
}

export const getPista = async (id) => {
	const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/pistas/${id}`);

	if (!response.ok) {
		console.log("There's not pista, look for another.");
		return null;
	}

	const data = await response.json();

	// console.log(data);
	

	return data;

}

//---------------------------------------------------------------------
// RESERVAS

export const getReservas = async () => {
	const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/reservas`);
	const data = await response.json();
	console.log(data);
	return data;
}

export const getReserva = async (id) => {
	const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/reservas/${id}`);

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

