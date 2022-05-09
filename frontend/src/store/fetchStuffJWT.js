export async function loginRequest() {
	let url = "https://localhost:44368/api/account/login";
	try {
		let response = await fetch(url, {
			method: "POST",
			body: JSON.stringify(this.form), // Assumes data is in an object called form
			headers: new Headers({
				"Content-Type": "application/json",
			}),
		});
		if (response.ok) {
			let token = await response.json();
			localStorage.setItem("token", token.jwt);
			// Change view to some other component
			// …
		} else {
			alert("Server returned: " + response.statusText);
		}
	} catch (err) {
		alert("Error: " + err);
	}
	return;
}

// check if user is logged in (This might need testing. Should it return a bool?)
const isLoggedIn = () => {
	let loggedIn = false;
	var url = "https://yourUrl"; //change this
	fetch(url, {
		method: "GET", // Or DELETE
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
		.catch((error) => alert("Something bad happened: " + error));

	return loggedIn;
};

// post or put
const postOrPut = (action) => {
	let successful = false;
	var url = "https://yourUrl";
	fetch(url, {
		method: `${action}`, // post or PUT
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
