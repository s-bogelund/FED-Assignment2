import address from './api-address';

export const getAllManagers = async () => {
	var url = `${address}api/Managers`;
	let response = false;
	try {
		response = await fetch(url, {
			method: "GET",
			headers: new Headers({
				Authorization: "Bearer " + localStorage.getItem("token"),
				"Content-Type": "application/json",
			}),
		});
		if (response.ok) {
			console.log("Ok response:");
			response = await response.json();
			console.log(response);
		} else {
			console.log("Not ok response: ", response);
			console.log("Server returned: " + response.statusText);
		}
	} catch (err) {
		console.log("Error: " + err);
	}
	return response;
};

export const addManager = async (manager) => {
	var url = `${address}api/Managers`;
	let response = false;
	try {
		response = await fetch(url, {
			method: "POST",
			body: JSON.stringify(manager),
			headers: new Headers({
				Authorization: "Bearer " + localStorage.getItem("token"),
				"Content-Type": "application/json",
			}),
		});
		if (response.ok) {
			console.log("Ok response:");
			response = await response.json();
			console.log(response);
		} else {
			console.log("Not ok response: ", response);
			console.log("Server returned: " + response.statusText);
		}
	} catch (err) {
		console.log("Error: " + err);
	}
	if (response) console.log("Manager added: ", response);
	return response;
};

export const getManager = async (managerId) => {
	var url = `${address}api/Managers/${managerId}`;
	let response = false;
	try {
		response = await fetch(url, {
			method: "GET",
			headers: new Headers({
				Authorization: "Bearer " + localStorage.getItem("token"),
				"Content-Type": "application/json",
			}),
		});
		if (response.ok) {
			console.log("Ok response:");
			response = await response.json();
			console.log(response);
		} else {
			console.log("Not ok response: ", response);
			console.log("Server returned: " + response.statusText);
		}
	} catch (err) {
		console.log("Error: " + err);
	}
	return response;
};
