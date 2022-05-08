import { getSeedUsers, seedJobs } from "./seeds";

export const getUsers = (role) => {
	let users = JSON.parse(localStorage.getItem("users"));
	if (!users) {
		// updating localStorage with seed data
		localStorage.setItem("users", JSON.stringify(getSeedUsers("all")));
		return getSeedUsers("all");
	}
	if (!role) {
		console.log("returning all users");
		return users;
	}

	return users.filter((user) => user.role.toLowerCase() === role.toLowerCase());
};

export const getJobs = () => {
	let jobs = JSON.parse(localStorage.getItem("jobs"));
	if (!jobs) {
		localStorage.setItem("jobs", JSON.stringify(seedJobs));
		return seedJobs;
	}
	return jobs;
};

export const updateJobs = (jobs) => {
	localStorage.setItem("jobs", JSON.stringify(jobs));
};

export const updateUsers = (users) => {
	localStorage.setItem("users", JSON.stringify(users));
};

export const saveUser = (user) => {
	let users = JSON.parse(localStorage.getItem("users"));
	users.push(user);
	localStorage.setItem("users", JSON.stringify(users));
};

export const getUser = () => {
	let user = JSON.parse(localStorage.getItem("user"));
	if (!user) return false;

	console.log(user);
	return user;
};
