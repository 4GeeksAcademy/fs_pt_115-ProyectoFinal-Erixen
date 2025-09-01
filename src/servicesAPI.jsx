export const ServicesAPI = () => {

    
	const getUsers = async () => {
		const response = await fetch("http://localhost:3001/api/users");
		const data = await response.json();
		console.log(data);
		
		// me falta crear la funcion de seteo del usuarios UseState
	}

	const getUser = async (id) => {
		const response = await fetch(`http://localhost:3001/api/users/${id}`);
		if(!response.ok){
			console.log("There's not user, create one");
			return
		}

		const data = await response.json();
		// me falta crear la funcion de seteo del usuario UseState}
		console.log(data);
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
    }    

	//---------------------------------------------------------------------

	const getclubs = async () => {
		const response = await fetch("http://localhost:3001/api/clubs");
		const data = await response.json();
		
	}

	const getclub = async (id) => {
		const response = await fetch(`http://localhost:3001/api/clubs/${id}`);
		if(!response.ok){
			console.log("There's not club, create one");
			return
		}

		const data = await response.json();
		console.log(data);
		
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
		console.log(data);
		
	}
    //---------------------------------------------------------------------
    return (
        
        <div className="container"></div>

    );
}