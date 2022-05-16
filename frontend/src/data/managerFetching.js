export const getAllManagers = async () => {
	var url = `https://localhost:7181/api/Managers`;
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
			alert("Server returned: " + response.statusText);
		}
	} catch (err) {
		alert("Error: " + err);
	}
	return response;
};

export const addManager = async (manager) => {
	var url = `https://localhost:7181/api/Managers`;
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
			alert("Server returned: " + response.statusText);
		}
	} catch (err) {
		alert("Error: " + err);
	}
	if (response) console.log("Manager added: ", response);
	return response;
};

export const getManager = async (managerId) => {
	var url = `https://localhost:7181/api/Managers/${managerId}`;
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
			alert("Server returned: " + response.statusText);
		}
	} catch (err) {
		alert("Error: " + err);
	}
	return response;
};
