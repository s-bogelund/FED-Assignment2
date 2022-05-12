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
