export async function loginRequest(user) {
	let url = "https://localhost:7181/api/account/login";
	try {
		let response = await fetch(url, {
			method: "POST",
			body: JSON.stringify(user),
			headers: new Headers({
				"Content-Type": "application/json",
			}),
		});
		if (response.ok) {
			let token = await response.json();
			localStorage.setItem("token", token.jwt);
			console.log("Ok response: ", response);
			return { ...user, token: token.jwt };
		} else {
			console.log("Not ok response: ", response);
			// alert("Server returned: " + response.statusText);
			return false;
		}
	} catch (err) {
		alert("Error: " + err);
		return false;
	}
}

// check if user is logged in (This might need testing. Should it return a bool?)
const isLoggedIn = (action) => {
	let loggedIn = false;
	var url = "https://yourUrl"; //change this
	fetch(url, {
		method: action, // Or DELETE
		credentials: "include",
		headers: {
			Authorization: "Bearer " + localStorage.getItem("token"),
			"Content-Type": "application/json",
		},
	})
		.then((responseJson) => {
			this.response = responseJson;
			loggedIn = true;
		})
		.catch((error) => alert("Something bad happened:", error));

	return loggedIn;
};
export const getJobsBackend = async (token) => {
	var url = "https://localhost:7181/api/Jobs"; //change this
	let response = null;
	try {
		response = await fetch(url, {
			method: "Get",
			headers: new Headers({
				Authorization: "Bearer " + token,
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
			return false;
		}
	} catch (err) {
		alert("Error: " + err);
		return false;
	}
	return response;
};

// post or put
const postOrPut = (action) => {
	let successful = false;
	var url = "https://yourUrl";
	fetch(url, {
		method: action, // post or PUT
		body: JSON.stringify(this.form), // assumes your data is in a
		// form object on your instance.
		credentials: "include",
		headers: {
			Authorization: "Bearer " + localStorage.getItem("token"),
			"Content-Type": "application/json",
		},
	})
		.then((responseJson) => {
			this.response = responseJson;
			successful = true;
		})
		.catch((error) => alert("Something bad happened: " + error));

	return successful;
};
