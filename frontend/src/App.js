import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import React, { useEffect, useReducer, useState } from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { Container, CssBaseline } from "@mui/material";
import Dashboard from "./pages/Dashboard";
import CreateUser from "./pages/CreateUser";
// import { getSeedUsers } from "./data/seeds";
import { getJobs, getUsers, getUser } from "./data/handleLocalStorage";
import AuthContext from "./store/auth-context";

const darkTheme = createTheme({
	palette: {
		mode: "dark",
	},
});

const managerLinks = [
	{ name: "Dashboard", link: "dashboard" },
	{ name: "Create User", link: "create-user" },
];

const modelLinks = [{ name: "Dashboard", link: "dashboard" }];

const loginReducer = (state, action) => {
	switch (action.type) {
		case "LOGIN":
			console.log(
				"Is this a manager: ",
				action.payload.role.toLowerCase() === "manager"
			);
			localStorage.setItem("user", JSON.stringify(action.payload));
			// localStorage.setItem("token", action.payload.token); // not implemented yet
			return {
				...state,
				isLoggedIn: true,
				user: action.payload,
				isManager: action.payload.role.toLowerCase() === "manager",
				// token: action.payload.token,
			};
		case "LOGOUT":
			localStorage.removeItem("user");
			return {
				...state,
				isLoggedIn: false,
				user: null,
				// token: null
			};
		default:
	}

	console.log(state);
	return state;
};

function App() {
	const [users, setUsers] = useState([]);
	const [navbarLinks, setNavbarLinks] = useState([]);

	const [loginState, dispatchLogin] = useReducer(loginReducer, {
		isLoggedIn: false,
		isManager: false,
		user: {},
	});
	useEffect(() => {
		// if localStorage is empty, dummy data will be used
		setUsers(getUsers());
		getJobs();
		const currentUser = getUser();
		console.log("currentUser: ", currentUser);

		if (currentUser) {
			console.log("On load useEffect called");
			checkNavBarLinks(currentUser);
			dispatchLogin({ type: "LOGIN", payload: currentUser });
		}

		console.log(loginState);
	}, []);

	useEffect(() => {
		console.log("loginState useEffect called");
		const user = getUser();
		return checkNavBarLinks(user);
	}, [loginState]);

	const newUserAdded = (user) => {
		setUsers(getUsers());
	};

	const checkNavBarLinks = (user) => {
		if (!user) {
			setNavbarLinks([]);
			return;
		}

		const role = user.role;

		if (role.toLowerCase() === "manager") {
			setNavbarLinks(managerLinks);
		} else {
			return setNavbarLinks(modelLinks);
		}
	};

	const handleAuthentication = (user) => {
		if (user) dispatchLogin({ type: "LOGIN", payload: user });
		else dispatchLogin({ type: "LOGOUT" });
	};

	const handleLogout = () => {
		console.log("handleLogout called");
		dispatchLogin({ type: "LOGOUT" });
	};

	return (
		<ThemeProvider theme={darkTheme}>
			<Router>
				<AuthContext.Provider
					value={{
						loginState,
						dispatchLogin,
					}}
				>
					<Navbar
						links={navbarLinks}
						loginLink="login"
						onLogout={handleLogout}
					/>
					<CssBaseline enableColorScheme />
					<Routes path="/">
						<Route index element={<Home />} />
						<Route
							path="login"
							element={<Login onLogin={handleAuthentication} />}
						/>

						{loginState.isLoggedIn && (
							<Route path="dashboard" element={<Dashboard users={users} />} />
						)}
						{loginState && (
							<Route
								path="create-user"
								element={<CreateUser onNewUser={newUserAdded} />}
							/>
						)}
					</Routes>
				</AuthContext.Provider>
			</Router>
		</ThemeProvider>
	);
}

export default App;
