import {
	AppBar,
	Box,
	Button,
	Container,
	Toolbar,
	Typography,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = (props) => {
	const navigate = useNavigate();

	return (
		<AppBar position="static">
			<Container maxWidth="x1">
				<Toolbar disableGutters sx={{ p: 1 }}>
					<Box
						onClick={() => navigate("/")}
						sx={{
							cursor: "pointer",
						}}
					>
						<Typography variant="h4" sx={{ color: "primary.dark" }}>
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
						<Button onClick={() => navigate(props.loginLink)}>
							<Typography sx={{ color: "primary.dark", fontSize: 16 }}>
								Login
							</Typography>
						</Button>
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	);
};

export default Navbar;
