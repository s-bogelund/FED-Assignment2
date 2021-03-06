import address from "./api-address";

export const getJobs = async () => {
	var url = `${address}api/Jobs`;
	let response = false;
	try {
		response = await fetch(url, {
			method: "Get",
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

// returns response or "false" if unsuccessful
export const createJob = async (job) => {
	var url = `${address}api/Jobs`;
	let response = false;
	try {
		response = await fetch(url, {
			method: "POST",
			body: JSON.stringify(job),
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

export const getJobInfo = async (jobId) => {
	var url = `${address}api/Jobs/${jobId}`; //change this
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
		}
	} catch (err) {
		console.log("Error: " + err);
	}
	return response;
};

export const deleteJob = async (jobId) => {
	var url = `${address}api/Jobs/${jobId}`; //change this
	let response = false;
	try {
		response = await fetch(url, {
			method: "DELETE",
			headers: new Headers({
				Authorization: "Bearer " + localStorage.getItem("token"),
				"Content-Type": "application/json",
			}),
		});
		if (response.ok) {
			console.log("Ok response:", response);
			response = await response.json();
		} else {
			console.log("Not ok response: ", response);
		}
	} catch (err) {
		console.log("Error: " + err);
	}
	return response;
};

export const updateJob = async (jobId, updatedJob) => {
	var url = `${address}api/Jobs/${jobId}`;
	let response = false;
	try {
		response = await fetch(url, {
			method: "PUT",
			body: JSON.stringify(updatedJob),
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
		}
	} catch (err) {
		console.log("Error: " + err);
	}
	return response;
};

export const AddModelToJob = async (jobId, modelId) => {
	var url = `${address}api/Jobs/${jobId}/model/${modelId}`;
	let response = false;
	try {
		response = await fetch(url, {
			method: "POST",
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
		}
	} catch (err) {
		console.log("Error: " + err);
	}
	return response;
};

export const RemoveModelFromJob = async (jobId, modelId) => {
	var url = `${address}api/Jobs/${jobId}/model/${modelId}`;
	let response = false;
	try {
		response = await fetch(url, {
			method: "DELETE",
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
		}
	} catch (err) {
		console.log("Error: " + err);
	}
	return response;
};
