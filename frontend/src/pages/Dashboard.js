import { Container, List, ListItem, ListItemText } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import CreateJob from "../components/Dashboard/CreateJob";
import JobsList from "../components/Dashboard/JobsList/JobsList";
import ModelList from "../components/Dashboard/ModelList";
import {
	bodyContainer,
	containerStyle,
	largeBoxStyle,
} from "../components/styling";
import AddModelDialog from "../components/Dashboard/AddModelDialog";
import { getJobs, getUsers, updateJobs } from "../data/handleLocalStorage";

const Dashboard = () => {
	const [jobs, setJobs] = useState([]);
	const [models, setModels] = useState(getUsers("model"));
	const [showAddDialog, setShowAddDialog] = useState(false);
	const [availableModels, setAvailableModels] = useState([]);
	const [jobToUpdate, setJobToUpdate] = useState(null);

	useEffect(() => {
		setJobs(getJobs());
	}, []);

	useEffect(() => {
		updateJobs(jobs);
	}, [jobs]);

	const addModelToExistingJob = (model) => {
		setShowAddDialog(false);

		const newJobs = jobs.map((job) => {
			if (job.id === jobToUpdate) {
				job.modelName.push(model);
			}
			return job;
		});
		setJobs(newJobs);
	};

	const handleRemoveModelFromJob = (model, id) => {
		console.log(model, id);
		const newJobs = jobs.map((job) => {
			if (job.id === id) {
				job.modelName = job.modelName.filter((m) => m !== model);
			}
			return job;
		});
		setJobs(newJobs);
	};

	const findAvailableModels = (jobId) => {
		const job = jobs.find((job) => job.id === jobId);
		setJobToUpdate(job.id);

		const availableModels = models.filter((model) => {
			return !job.modelName.includes(model.name);
		});

		const availableModelNames = availableModels.map((model) => model.name);
		return availableModelNames;
	};

	const handleAddModelToJob = (jobId) => {
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
						onRemoveModel={handleRemoveModelFromJob}
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
