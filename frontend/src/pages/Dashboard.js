import { Container } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { seedJobs } from "../seeds/jobs";
import CreateJob from "../components/Dashboard/CreateJob";
import JobsList from "../components/Dashboard/JobsList/JobsList";

const Dashboard = () => {
	const jobs = seedJobs;

	const handleDeleteJob = (id) => {
		console.log("handleDeleteJob called with id: ", id);
	};

	return (
		<React.Fragment>
			<Container component="main" sx={{ background: "primary.dark" }}>
				<Box
					flexWrap={"wrap"}
					sx={{
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
					}}
				>
					<CreateJob />
					<JobsList jobs={jobs} onDeleteJob={handleDeleteJob} />
				</Box>
			</Container>
		</React.Fragment>
	);
};

export default Dashboard;
