import { createContext } from "react";

const AuthContext = createContext({
	isLoggedIn: false,

	setLoggedIn: (value) => {
		console.log("setLoggedIn");
		this.isLoggedIn = value;
	},
});

export default AuthContext;
