export const readUsers = (role) => {
	let users = JSON.parse(localStorage.getItem("users"));
	if (!users) return;

	// was made to fetch either managers or models - no longer relevant
	if (!role) {
		return users;
	}

	return users.filter((user) => user.role.toLowerCase() === role.toLowerCase());
};

export const readJobs = () => {
	let jobs = JSON.parse(localStorage.getItem("jobs"));
	if (!jobs) return;

	return jobs;
};

export const updateLocalJobs = (jobs) => {
	localStorage.setItem("jobs", JSON.stringify(jobs));
};

export const updateLocalUsers = (users) => {
	localStorage.setItem("users", JSON.stringify(users));
};

export const saveUserToLocal = (user) => {
	let users = JSON.parse(localStorage.getItem("users"));
	users.push(user);
	localStorage.setItem("users", JSON.stringify(users));
};

export const readUser = () => {
	let user = JSON.parse(localStorage.getItem("user"));
	if (!user) return false;

	// console.log(user);
	return user;
};
