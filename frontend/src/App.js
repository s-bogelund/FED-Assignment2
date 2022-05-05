import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import React from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { CssBaseline } from "@mui/material";
import Dashboard from "./pages/Dashboard";

const darkTheme = createTheme({
	palette: {
		mode: "dark",
	},
});

const managerLinks = [
	{ name: "Dashboard", link: "dashboard" },
	{ name: "Create Model", link: "create-model" },
	{ name: "Create Manager", link: "create-manager" },
];
const modelLinks = [
	{ name: "My Jobs", link: "my-jobs" },
	{ name: "Add Expense", link: "add-expense" },
];

function App() {
	const [authenticatedUser, setAuthenticatedUser] = React.useState(true);
	const [managerLoggedIn, setManagerLoggedIn] = React.useState(true);
	const [modelLoggedIn, setModelLoggedIn] = React.useState(false);

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
				<CssBaseline enableColorScheme />
				<Navbar links={checkNavBarLinks()} loginLink="login" />
				<Routes path="/">
					<Route index element={<Home />} />
					<Route path="login" element={<Login />} />
					<Route path="dashboard" element={<Dashboard />} />
				</Routes>
			</Router>
		</ThemeProvider>
	);
}

export default App;
