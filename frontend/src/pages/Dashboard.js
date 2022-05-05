import { Container } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import CreateJob from "../components/Dashboard/CreateJob";
import JobsList from "../components/Dashboard/JobsList";

const Dashboard = () => {
	return (
		<React.Fragment>
			<Container component="main">
				<Box
					flexWrap={"wrap"}
					sx={{
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
					}}
				>
					<CreateJob />
					<JobsList />
				</Box>
			</Container>
		</React.Fragment>
	);
};

export default Dashboard;
