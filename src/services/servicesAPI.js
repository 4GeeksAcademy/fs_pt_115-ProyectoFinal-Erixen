//---------------------------------------------------------------------

// Registro de un usuario
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

// Registro de un club
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
		localStorage.setItem("id", res.id);
		return { status: response.status, msg: res.msg };
	} else {
		const res = await response.json();
		return { status: response.status, msg: res.msg };
	}
};

// ---------------------------------------------------------------------------------------

// Obtener todos los usuarios
export const getUsers = async () => {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/users`);

    if (response.ok) {
        const data = await response.json();
        return data;
    } else {
        return { error: { status: response.status, statusText: response.statusText } };
    };
};

// Obtener un usuario concreto
export const getUser = async () => {
	const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/${localStorage.getItem("user_type") == "club" ? "club" : "user"}`,{
		headers: {
			"Authorization": `Bearer ${localStorage.getItem("token")}`
		}
	
	});

	if (response.ok) {
        const data = await response.json();
        return data;
    } else {
        return { error: { status: response.status, statusText: response.statusText } };
    };
}

// Obtener un usuario concreto por id

export const getUserForId = async (userId) => {

const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/users/${userId}`)

if (response.ok){
const data = await response.json()
return data

}
console.log("Usuario no encontrado")

} 



// Modificar usuario
export const updateUser = async (id, updatedDataUser) => {
	const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/users/${id}`, {
		method: "PUT",
		body: JSON.stringify(updatedDataUser),
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

// Eliminar usuario
export const deleteUser = async (id) => {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/users/${id}`, {
        method: "DELETE",
    });

    if (response.ok) {
		const res = await response.json();
		return { status: response.status, msg: res.msg };
	} else {
		const res = await response.json();
		return { status: response.status, msg: res.msg };
	}
};

// ---------------------------------------------------------------------------------------

// Obtener todos los clubes
export const getClubs = async () => {
	const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/clubs`);

    if (response.ok) {
        const data = await response.json();
        return data;
    } else {
        return { error: { status: response.status, statusText: response.statusText } };
    };
}

// Obtener un club concreto
export const getClub = async (id) => {
	const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/clubs/${id}`);

	if (response.ok) {
        const data = await response.json();
        return data;
    } else {
        return { error: { status: response.status, statusText: response.statusText } };
    };
}

// Modificar club
export const updateClub = async (id, updatedDataClub) => {
	const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/clubs/${id}`, {
		method: "PUT",
		body: JSON.stringify(updatedDataClub),
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

// Eliminar club
export const deleteClub = async (id) => {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/clubs/${id}`, {
        method: "DELETE",
    });

    if (response.ok) {
		const res = await response.json();
		return { status: response.status, msg: res.msg };
	} else {
		const res = await response.json();
		return { status: response.status, msg: res.msg };
	}
};

// ---------------------------------------------------------------------------------------

// Obtener todas las pistas
export const getPistas = async () => {
	const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/pistas`);
	
	if (response.ok) {
        const data = await response.json();
        return data;
    } else {
        return { error: { status: response.status, statusText: response.statusText } };
    };
}

// Obtener una pista concreta
export const getPista = async (id) => {
	const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/pistas/${id}`);

	if (response.ok) {
        const data = await response.json();
        return data;
    } else {
        return { error: { status: response.status, statusText: response.statusText } };
    };
}

// Obtener todas las pistas de un club concreto
export const getPistasClub = async (id) => {
	const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/clubs/${id}/pistas`);

	if (response.ok) {
        const data = await response.json();
        return data;
    } else {
        return { error: { status: response.status, statusText: response.statusText } };
    };
}

// Crear pista
export const createPista = async (newPista) => {
	const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/pistas`, {
		method: "POST",
		body: JSON.stringify(newPista),
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

// Modificar pista
export const updatePista = async (id, updatedDataPista) => {
	const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/pistas/${id}`, {
		method: "PUT",
		body: JSON.stringify(updatedDataPista),
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

// Eliminar pista
export const deletePista = async (id) => {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/pistas/${id}`, {
        method: "DELETE",
    });

    if (response.ok) {
		const res = await response.json();
		return { status: response.status, msg: res.msg };
	} else {
		const res = await response.json();
		return { status: response.status, msg: res.msg };
	}
};

// ---------------------------------------------------------------------------------------

// Obtener todas las reservas
export const getReservas = async () => {
	const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/reservas`);
	
	if (response.ok) {
        const data = await response.json();
        return data;
    } else {
        return { error: { status: response.status, statusText: response.statusText } };
    };
}

export const getReserva = async (id) => {
	const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/reservas/${id}`);

	if (response.ok) {
        const data = await response.json();
        return data;
    } else {
        return { error: { status: response.status, statusText: response.statusText } };
    };
}

// Crear reserva
export const createReserva = async (newReserva) => {
	const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/reservas`, {
		method: "POST",
		body: JSON.stringify(newReserva),
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
}

// Modificar reserva
export const updateReserva = async (id, updatedDataReserva) => {
	const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/reservas/${id}`, {
		method: "PUT",
		body: JSON.stringify(updatedDataReserva),
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

// Eliminar reserva
export const deleteReserva = async (id) => {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/reservas/${id}`, {
        method: "DELETE",
    });

    if (response.ok) {
		const res = await response.json();
		return { status: response.status, msg: res.msg };
	} else {
		const res = await response.json();
		return { status: response.status, msg: res.msg };
	}
};

// ---------------------------------------------------------------------------------------

// Obtener todos los mensajes
export const getMensajes = async () => {
	const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/mensajes`);
	
	if (response.ok) {
        const data = await response.json();
        return data;
    } else {
        return { error: { status: response.status, statusText: response.statusText } };
    };
}

// Crear mensaje
export const createMensaje = async (newMensaje) => {
	const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/mensajes`, {
		method: "POST",
		body: JSON.stringify(newMensaje),
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
}