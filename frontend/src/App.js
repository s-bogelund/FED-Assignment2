import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import React from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { CssBaseline } from "@mui/material";

const darkTheme = createTheme({
	palette: {
		mode: "dark",
	},
});

const navLinks = [
	{ name: "Create Model", link: "create-model" },
	{ name: "Create Manager", link: "create-manager" },
	{ name: "Create Job", link: "create-job" },
	{ name: "Add Model", link: "add-model" },
];

function App() {
	const checkNavBarLinks = () => {
		if (navLinks.length) {
			return navLinks;
		} else {
			return [];
		}
	};

	// 	<ThemeProvider theme={darkTheme}>
	// 	<Router>
	// 		<Navbar links={checkNavBarLinks()} loginLink="login" />
	// 		<Routes path="/">
	// 			<Route index element={<Home />} />
	// 			<Route path="login" element={<Login />} />
	// 		</Routes>
	// 	</Router>
	// </ThemeProvider>

	return (
		<ThemeProvider theme={darkTheme}>
			<Router>
				<CssBaseline enableColorScheme />
				<Navbar links={checkNavBarLinks()} loginLink="login" />
				<Routes path="/">
					<Route index element={<Home />} />
					<Route path="login" element={<Login />} />
				</Routes>
			</Router>
		</ThemeProvider>
	);
}

export default App;
