export const getAllModels = async () => {
	var url = `https://localhost:7181/api/Models`;
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
			response = await response.json();
			console.log("Ok response:", response);
		} else {
			console.log("Not ok response: ", response);
			console.log("Server returned: " + response.statusText);
		}
	} catch (err) {
		console.log("Error: " + err);
	}
	return response;
};

export const addModel = async (model) => {
	var url = `https://localhost:7181/api/Models`;
	let response = false;
	try {
		response = await fetch(url, {
			method: "POST",
			body: JSON.stringify(model),
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

export const getModel = async (modelId) => {
	var url = `https://localhost:7181/api/Models/${modelId}`;
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
			response = await response.json();
			console.log("Ok response:", response);
		} else {
			console.log("Not ok response: ", response);
			console.log("Server returned: " + response.statusText);
		}
	} catch (err) {
		console.log("Error: " + err);
	}
	return response;
};

export const getModelWithJobs = async (modelId) => {
	var url = `https://localhost:7181/api/Models/${modelId}/jobs`;
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
			response = await response.json();
			console.log("Ok response:", response);
		} else {
			console.log("Not ok response: ", response);
			console.log("Server returned: " + response.statusText);
		}
	} catch (err) {
		console.log("Error: " + err);
	}
	return response;
};
