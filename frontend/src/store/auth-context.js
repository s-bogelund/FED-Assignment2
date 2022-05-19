import { createContext } from "react";

const AuthContext = createContext({
	isLoggedIn: false,

	setLoggedIn: (value) => {
		this.isLoggedIn = value;
	},
});

export default AuthContext;
