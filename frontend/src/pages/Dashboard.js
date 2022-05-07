import { Container } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { seedJobs, seedManagers, seedModels } from "../data/seeds";
import CreateJob from "../components/Dashboard/CreateJob";
import JobsList from "../components/Dashboard/JobsList/JobsList";
import ModelList from "../components/Dashboard/ModelList/ModelList";
import {
	bodyContainer,
	containerStyle,
	largeBoxStyle,
} from "../components/styling";

const Dashboard = () => {
	const [jobs, setJobs] = useState([]);
	const [models, setModels] = useState(seedModels);

	useEffect(() => {
		// if no jobs, create some
		if (!JSON.parse(localStorage.getItem("jobsList"))) {
			console.log("setting local storage");
			localStorage.setItem("jobsList", JSON.stringify(seedJobs));
			setJobs(seedJobs);
			console.log("Seed data used");
		} else setJobs(JSON.parse(localStorage.getItem("jobsList")));
	}, []);

	useEffect(() => {
		localStorage.setItem("jobsList", JSON.stringify(jobs));
	}, [jobs]);

	const handleDeleteJob = (id) => {
		console.log("handleDeleteJob called with id: ", id);
		setJobs(jobs.filter((job) => job.id !== id));
	};

	const modelNames = (models) => {
		let names = [];
		models.forEach((model) => {
			names.push(model.name);
		});
		return names;
	};

	const handleJobAdded = (company, salary, models) => {
		console.log("handleJobAdded called with company: ", company);
		console.log("handleJobAdded called with salary: ", salary);
		console.log("Model: ");
		models.forEach((model) => {
			console.log(model.name);
		});

		setJobs((prevJobs) => {
			return [
				...prevJobs,
				{
					id: Math.random(),
					key: Math.random(),
					company: company,
					salary: salary,
					modelName: modelNames(models),
				},
			];
		});
	};

	return (
		<React.Fragment>
			<Container component="main" sx={bodyContainer}>
				<Box
					flexWrap={"wrap"}
					sx={{
						...largeBoxStyle,
						maxWidth: "90%",
						"@media (max-width: 1404px)": {
							justifyContent: "center",
						},
					}}
				>
					<CreateJob onNewJob={handleJobAdded} />
					<JobsList jobs={jobs} onDeleteJob={handleDeleteJob} />
					<ModelList models={models} />
				</Box>
			</Container>
		</React.Fragment>
	);
};

export default Dashboard;
