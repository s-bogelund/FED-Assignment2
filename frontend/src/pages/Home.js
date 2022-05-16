import { Container, CssBaseline, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useContext } from "react";
import { bodyContainer } from "../components/styling";
import AuthContext from "../store/auth-context";

const Home = () => {
	const authCtx = useContext(AuthContext);
	const isLoggedIn = authCtx.loginState.isLoggedIn;
	const user = authCtx.loginState.user;

	const homeHeader = () => {
		// console.log(user);
		if (!isLoggedIn) {
			return "You are not logged in!";
		}
		if (isLoggedIn) {
			return `Hello ${user.firstName ? user.firstName : user.email}!`;
		}
	};
	const homeBody = () => {
		if (!isLoggedIn) return "Please login to use this application";
		if (authCtx.loginState.isManager)
			return "Go to dashboard to manage your team";

		return "Go to dashboard to view your jobs and add expenses";
	};

	return (
		<Container component="main" sx={bodyContainer}>
			<CssBaseline />
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					mt: -55,
					alignItems: "center",
				}}
			>
				<Typography variant="h3">{homeHeader()}</Typography>
				<Typography sx={{ mt: 3 }} variant="h5">
					{homeBody()}
				</Typography>
			</Box>
		</Container>
	);
};

export default Home;
