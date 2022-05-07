import { Container, List, ListItem, ListItemText } from "@mui/material";
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
import AddModelDialog from "../components/Dashboard/AddModelDialog";

const Dashboard = () => {
	const [jobs, setJobs] = useState([]);
	const [models, setModels] = useState(seedModels);
	const [showAddDialog, setShowAddDialog] = useState(false);
	const [availableModels, setAvailableModels] = useState([]);
	const [jobToUdate, setJobToUpdate] = useState(null);

	useEffect(() => {
		// if no jobs, create some
		if (
			!JSON.parse(localStorage.getItem("jobsList")) ||
			!JSON.parse(localStorage.getItem("jobsList")).length
		) {
			console.log("setting local storage");
			localStorage.setItem("jobsList", JSON.stringify(seedJobs));
			setJobs(seedJobs);
			console.log("Seed data used");
		} else {
			console.log("Using local storage");
			setJobs(JSON.parse(localStorage.getItem("jobsList")));
		}
	}, []);

	useEffect(() => {
		localStorage.setItem("jobsList", JSON.stringify(jobs));
	}, [jobs, availableModels]);

	const addModelToExistingJob = (model) => {
		setShowAddDialog(false);

		const newJobs = jobs.map((job) => {
			if (job.id === jobToUdate) {
				job.modelName.push(model);
			}
			return job;
		});
		setJobs(newJobs);
	};

	const findAvailableModels = (jobId) => {
		const job = jobs.find((job) => job.id === jobId);

		const availableModels = models.filter((model) => {
			return !job.modelName.includes(model.name);
		});

		const availableModelNames = availableModels.map((model) => model.name);
		setJobToUpdate(jobId);
		return availableModelNames;
	};

	const handleAddModelToJob = (jobId) => {
		console.log("handleAddModelToJob called with jobId: ", jobId);
		setAvailableModels(findAvailableModels(jobId));
		setShowAddDialog(true);
	};

	const handleDeleteJob = (id) => {
		setJobs(jobs.filter((job) => job.id !== id));
	};

	// const renderListOfModels = (availableModels) => {
	// 	const models = availableModels.map((model) => {
	// 		return (
	// 			<ListItem
	// 				key={model.id}
	// 				button
	// 				onClick={() => handleAddModelToJob(model.id)}
	// 			>
	// 				<ListItemText primary={model.name} secondary={model.description} />
	// 			</ListItem>
	// 		);
	// 	});
	// 	return models;
	// };

	const modelNames = (models) => {
		let names = [];
		models.forEach((model) => {
			names.push(model.name);
		});
		return names;
	};

	const handleJobAdded = (company, salary, models) => {
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
					<JobsList
						jobs={jobs}
						onDeleteJob={handleDeleteJob}
						onAddModel={handleAddModelToJob}
					/>
					<AddModelDialog
						open={showAddDialog}
						onCancel={() => setShowAddDialog(false)}
						models={availableModels}
						onModelSelected={addModelToExistingJob}
					/>
					<ModelList models={models} />
				</Box>
			</Container>
		</React.Fragment>
	);
};

export default Dashboard;
