import {
	AppBar,
	Box,
	Button,
	Container,
	Toolbar,
	Typography,
} from "@mui/material";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../store/auth-context";

const Navbar = (props) => {
	const authContext = useContext(AuthContext);
	const navigate = useNavigate();

	console.log(props.links);
	return (
		<AppBar
			enableColorOnDark
			position="fixed"
			sx={{ backgroundColor: "rgba(8,22,36,0.85)" }}
		>
			<Container maxWidth="x1">
				<Toolbar disableGutters sx={{ p: 1 }}>
					<Box
						onClick={() => navigate("/")}
						sx={{
							cursor: "pointer",
						}}
					>
						<Typography
							variant="h4"
							sx={{ color: "#007fff", fontWeight: "bold" }}
						>
							Jægerne
						</Typography>
					</Box>
					<Box
						sx={{
							display: "flex",
							marginTop: 0.5,
							marginX: 3,
						}}
					>
						{props.links.map((link) => (
							<Button
								key={link.name}
								onClick={() => navigate(link.link)}
								sx={{
									my: 2,
									px: 2,
									color: "primary.dark",
									display: "block",
								}}
							>
								<Typography sx={{ fontWeight: 550 }}>{link.name}</Typography>
							</Button>
						))}
					</Box>
					<Box
						sx={{
							flexGrow: 1,
							display: "flex",
							justifyContent: "flex-end",
						}}
					>
						{!authContext.isLoggedin && (
							<Button onClick={() => navigate(props.loginLink)}>
								<Typography sx={{ color: "#007fff", fontWeight: "bold" }}>
									Login
								</Typography>
							</Button>
						)}
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	);
};

export default Navbar;
