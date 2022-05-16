export const getExpenses = async () => {
	var url = `https://localhost:7181/api/Expenses`;
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
			alert("Server returned: " + response.statusText);
		}
	} catch (err) {
		alert("Error: " + err);
	}
	return response;
};

export const createExpense = async (expense) => {
	var url = `https://localhost:7181/api/Expenses`;
	let response = false;
	try {
		response = await fetch(url, {
			method: "POST",
			body: JSON.stringify(expense),
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

export const getExpense = async (expenseId) => {
	var url = `https://localhost:7181/api/Expenses/${expenseId}`;
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

export const changeExpense = async (expenseId, expense) => {
	var url = `https://localhost:7181/api/Expenses/${expenseId}`;
	let response = false;
	try {
		response = await fetch(url, {
			method: "PUT",
			body: JSON.stringify(expense),
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

export const deleteExpense = async (expenseId) => {
	var url = `https://localhost:7181/api/Expenses/${expenseId}`;
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
			alert("Server returned: " + response.statusText);
		}
	} catch (err) {
		alert("Error: " + err);
	}
	return response;
};

export const getModelExpenses = async (modelId) => {
	var url = `https://localhost:7181/api/Expenses/model/${modelId}`;
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
			alert("Server returned: " + response.statusText);
		}
	} catch (err) {
		alert("Error: " + err);
	}
	return response;
};
