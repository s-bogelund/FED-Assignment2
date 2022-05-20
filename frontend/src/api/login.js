import address from "./api-address";

export async function loginRequest(user) {
	let url = `${address}api/account/login`;
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
			// console.log("Server returned: " + response.statusText);
			return false;
		}
	} catch (err) {
		console.log("Error: " + err);
		return false;
	}
}
