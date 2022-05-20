import {
	Alert,
	Box,
	Button,
	Container,
	CssBaseline,
	Snackbar,
	TextField,
	Typography,
} from "@mui/material";
import React, { useState, useReducer, useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { bodyContainer, largeBoxStyle } from "../components/styling";
import { loginRequest } from "../api/login";
import { getUsers } from "../api/localStorageHandler";
import jwt_decode from "jwt-decode";
import AuthContext from "../store/auth-context";

const emailReducer = (state, action) => {
	if (action.type === "SET_EMAIL") {
		return {
			value: action.payload,
			isValid: action.payload.includes("@") && action.payload.includes("."),
		};
	}
	if (action.type === "INPUT_BLUR") {
		return {
			value: state.value,
			isValid: state.value.includes("@") && state.value.includes("."),
		};
	}

	return state;
};

const passwordReducer = (state, action) => {
	if (action.type === "SET_PASSWORD") {
		return {
			value: action.payload,
			isValid: action.payload.length > 5,
		};
	}
	if (action.type === "INPUT_BLUR") {
		return {
			value: state.value,
			isValid: state.value.length > 5,
		};
	}
	return state;
};

const toastReducer = (state, action) => {
	if (action.type === "SET_TOAST") {
		return {
			open: true,
			message: action.payload,
			severity: action.severity,
		};
	}
	if (action.type === "CLOSE_TOAST") {
		return {
			open: false,
		};
	}
	return state;
};

const Login = (props) => {
	const navigate = useNavigate();
	const authContext = useContext(AuthContext);
	const [emailState, dispatchEmail] = useReducer(emailReducer, {
		value: "",
		isValid: false,
	});

	const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
		value: "",
		isValid: false,
	});
	const [toastState, dispatchToast] = useReducer(toastReducer, {
		open: false,
		message: "",
		severity: "",
	});

	const handleLoginSubmit = async (event) => {
		event.preventDefault();
		if (!isValidFormat()) return;

		if (!isValidFormat) return;

		let user = { email: emailState.value, password: passwordState.value };
		user = await loginRequest(user);

		// if the login failed
		validateInfo(user);
		if (!user) return;

		const token = jwt_decode(user.token);

		let role = "Model";
		if (JSON.stringify(token).toLowerCase().includes("manager")) {
			role = "Manager";
		}

		user = { ...user, role: role, token: user.token };

		navigate("/dashboard");
		props.onLogin(user);

		dispatchEmail({ type: "SET_EMAIL", payload: "" });
		dispatchPassword({ type: "SET_PASSWORD", payload: "" });
	};

	return (
		<Container component="main" sx={bodyContainer}>
			<CssBaseline />
			<Box
				sx={{
					...largeBoxStyle,
					flexDirection: "column",
					mt: "-4rem",
				}}
			>
				<Typography variant="h3" color="inherit">
					Login
				</Typography>
				<Box component="form" onSubmit={handleLoginSubmit} sx={{ mt: 1 }}>
					<TextField
						autoFocus
						fullWidth
						margin="normal"
						onInput={(event) =>
							dispatchEmail({ type: "SET_EMAIL", payload: event.target.value })
						}
						value={emailState.value}
						onBlur={(event) => dispatchEmail({ type: "INPUT_BLUR" })}
						required
						id="email"
						label="Email Address"
						name="email"
					/>
					<TextField
						fullWidth
						margin="normal"
						onInput={(event) =>
							dispatchPassword({
								type: "SET_PASSWORD",
								payload: event.target.value,
							})
						}
						onBlur={(event) => dispatchPassword({ type: "INPUT_BLUR" })}
						value={passwordState.value}
						required
						id="password"
						label="Password"
						name="password"
					/>
					<Button type="submit" fullWidth variant="contained" sx={{ mt: 4 }}>
						<Typography variant="h6">Sign In</Typography>
					</Button>
				</Box>
			</Box>
			<Snackbar
				open={toastState.open}
				autoHideDuration={2500}
				onClose={() => dispatchToast({ type: "CLOSE_TOAST" })}
			>
				<Alert
					onCancel={() => dispatchToast({ type: "CLOSE_TOAST" })}
					severity={toastState.severity}
					sx={{
						width: "100%",
						fontWeight: "bold",
						fontSize: "1.2rem",
					}}
				>
					{toastState.message}
				</Alert>
			</Snackbar>
		</Container>
	);

	// validation functions
	function isValidFormat() {
		if (!emailState.isValid && !passwordState.isValid) {
			dispatchToast({
				type: "SET_TOAST",
				payload: "Please enter a valid email and password",
				severity: "error",
			});
			return false;
		}
		if (passwordState.isValid && !emailState.isValid) {
			dispatchToast({
				type: "SET_TOAST",
				payload: "Please enter a valid email",
				severity: "error",
			});
			return false;
		}
		if (!passwordState.isValid && emailState.isValid) {
			dispatchToast({
				type: "SET_TOAST",
				payload: "Please enter a valid password",
				severity: "error",
			});
			return false;
		}
		return true;
	}

	function validateInfo(user) {
		if (!user) {
			dispatchToast({
				type: "SET_TOAST",
				payload: "The information could not be validated",
				severity: "error",
			});
			return false;
		}
		if (user.password === passwordState.value) {
			dispatchToast({
				type: "SET_TOAST",
				payload: "Login Successful",
				severity: "success",
			});
			return true;
		}
	}
};
export default Login;
