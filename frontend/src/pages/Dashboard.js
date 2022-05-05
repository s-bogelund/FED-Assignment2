import { Container } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import CreateJob from "../components/Dashboard/CreateJob";
import JobsList from "../components/Dashboard/JobsList";

const Dashboard = () => {
	const tempJobs = [
		{
			id: 1,
			modelName: "Kenneth",
			company: "Assos",
			salary: "100k",
		},
		{
			id: 2,
			modelName: "Grenen",
			company: "Gucci",
			salary: "100k",
		},
		{
			id: 3,
			modelName: "Brian",
			company: "Assos",
			salary: "100k",
		},
		{
			id: 4,
			modelName: "Lars",
			company: "Zalando Og Noget Mere For At Gøre Det Længere",
			salary: "100k",
		},
	];
	const handleDeleteJob = (id) => {
		console.log("handleDeleteJob called with id: ", id);
	};

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
					<JobsList jobs={tempJobs} onDeleteJob={handleDeleteJob} />
				</Box>
			</Container>
		</React.Fragment>
	);
};

export default Dashboard;
