import { Container } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import CreateJob from "../components/Dashboard/CreateJob";
import JobsList from "../components/Dashboard/JobsList/JobsList";

const Dashboard = () => {
	const seedJobs = [
		{
			id: 1,
			modelName: ["Kenneth", "Ulven"],
			company: "Assos",
			salary: "1200",
		},
		{
			id: 2,
			modelName: ["Grenen"],
			company: "Gucci",
			salary: "1400",
		},
		{
			id: 3,
			modelName: ["Brian"],
			company: "Assos",
			salary: "1100",
		},
		{
			id: 4,
			modelName: ["Lars"],
			company: "Zalando",
			salary: "900",
		},
	];
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
					<JobsList jobs={seedJobs} onDeleteJob={handleDeleteJob} />
				</Box>
			</Container>
		</React.Fragment>
	);
};

export default Dashboard;
