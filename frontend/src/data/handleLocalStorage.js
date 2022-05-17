import { getSeedUsers, seedJobs } from "./seeds";

export const readUsers = (role) => {
	let users = JSON.parse(localStorage.getItem("users"));
	if (!users) {
		// updating localStorage with seed data
		localStorage.setItem("users", JSON.stringify(getSeedUsers("all")));
		return getSeedUsers("all");
	}
	if (!role) {
		// console.log("returning all users");
		return users;
	}

	return users.filter((user) => user.role.toLowerCase() === role.toLowerCase());
};

export const readJobs = () => {
	let jobs = JSON.parse(localStorage.getItem("jobs"));
	if (!jobs) {
		localStorage.setItem("jobs", JSON.stringify(seedJobs));
		return seedJobs;
	}
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
