import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { Container, CssBaseline } from "@mui/material";
import Dashboard from "./pages/Dashboard";
import CreateUser from "./pages/CreateUser";
// import { getSeedUsers } from "./data/seeds";
import { getJobs, getUsers } from "./data/handleLocalStorage";

const darkTheme = createTheme({
	palette: {
		mode: "dark",
	},
});

const managerLinks = [
	{ name: "Dashboard", link: "dashboard" },
	{ name: "Create User", link: "create-user" },
];

const modelLinks = [
	{ name: "My Jobs", link: "my-jobs" },
	{ name: "Add Expense", link: "add-expense" },
];

function App() {
	const [authenticatedUser, setAuthenticatedUser] = useState(true);
	const [managerLoggedIn, setManagerLoggedIn] = useState(true);
	const [modelLoggedIn, setModelLoggedIn] = useState(false);
	const [users, setUsers] = useState([]);

	useEffect(() => {
		// if localStorage is empty, dummy data will be used
		console.log("app useEffect");
		setUsers(getUsers());
		getJobs();
	}, []);

	const newUserAdded = (user) => {
		setUsers(getUsers());
	};

	const checkNavBarLinks = () => {
		if (!authenticatedUser) return [];
		if (managerLoggedIn) {
			return managerLinks;
		} else if (modelLoggedIn) {
			return modelLinks;
		}
		return [{ name: "About us", link: "about-us" }];
	};

	return (
		<ThemeProvider theme={darkTheme}>
			<Router>
				<Navbar links={checkNavBarLinks()} loginLink="login" />
				<CssBaseline enableColorScheme />
				<Routes path="/">
					<Route index element={<Home />} />
					<Route path="login" element={<Login />} />
					<Route path="dashboard" element={<Dashboard users={users} />} />
					<Route
						path="create-user"
						element={<CreateUser onNewUser={newUserAdded} />}
					/>
				</Routes>
			</Router>
		</ThemeProvider>
	);
}

export default App;
