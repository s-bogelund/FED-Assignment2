import {
	Container,
	List,
	ListItem,
	ListItemText,
	Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useContext, useEffect, useState } from "react";
import CreateJob from "../components/Dashboard/CreateJob";
import JobsList from "../components/Dashboard/JobsList/JobsList";
import EmployeeList from "../components/Dashboard/EmployeeList";
import { bodyContainer, largeBoxStyle } from "../components/styling";
import ChangeJobDialog from "../components/Dashboard/ChangeJobDialog";
import {
	readJobs,
	readUser,
	readUsers,
	updateLocalJobs,
} from "../data/handleLocalStorage";
import AuthContext from "../store/auth-context";
import { v4 as uuid } from "uuid";
import {
	AddModelToJob,
	getJobs,
	RemoveModelFromJob,
} from "../data/jobFetching";
import ExpensesList from "../components/Dashboard/ExpensesList";
import { getExpenses, createExpense } from "../data/expensesFetching";
import { getAllModels } from "../data/modelsFetching";

const Dashboard = (props) => {
	const ctx = useContext(AuthContext);
	const [jobs, setJobs] = useState([]);
	const [models, setModels] = useState([]);
	const [showDialog, setShowDialog] = useState(false);
	const [availableModels, setAvailableModels] = useState([]);
	const [jobToUpdate, setJobToUpdate] = useState(null);
	const [expenses, setExpenses] = useState([]);
	const isManager = ctx.loginState.isManager;

	async function fetchJobs() {
		const backendJobs = await getJobs();
		// console.log("Dashboard jobs:", backendJobs);
		setJobs(backendJobs);
		updateLocalJobs(backendJobs);
	}

	async function fetchModels() {
		const models = await getAllModels();
		// console.log("Dashboard models:", models);
		setModels(models);
	}

	async function fetchExpenses() {
		const expenses = await getExpenses();
		// console.log("Dashboard expenses:", expenses);
		setExpenses(expenses);
	}

	useEffect(() => {
		async function getData() {
			if (isManager) {
				await fetchModels();
				await fetchExpenses();
			}
			await fetchJobs();
		}
		getData();
	}, []);

	useEffect(() => {
		updateLocalJobs(jobs);
	}, [jobs]);

	const addModelToExistingJob = async (model) => {
		setShowDialog(false);
		const modelToAdd = models.find((m) => model.includes(m.email));
		console.log(modelToAdd);
		await AddModelToJob(jobToUpdate, modelToAdd.efModelId);

		console.log("job to update:", jobToUpdate);

		console.log("model:", model);

		await fetchModels();
		await fetchJobs();
	};

	const handleRemoveModelFromJob = async (email, id) => {
		console.log(email, id);
		// looks through jobs to find a job with the correct jobId
		const job = jobs.find((job) => job.jobId === id);
		if (!job) return;
		// uses the email to find the model to remove
		const modelToRemove = job.models.find((model) => model.email === email);
		if (!modelToRemove) return;

		console.log("model to remove", modelToRemove);
		// finds a matching model email in localStorage to find ID for API call
		const modelId = readUsers().find((user) => user.email === email).efModelId;
		console.log("modelId to remove", modelId);

		const success = await RemoveModelFromJob(job.jobId, modelId);
		console.log(success);
		const newJobs = job.models.filter((model) => {
			return model.email !== email;
		});
		await fetchJobs();
		console.log("job after model removed:", newJobs);
		setJobs(readJobs());
	};

	const findAvailableModels = (jobId) => {
		// console.log(jobs);
		// console.log("jobId:", jobId);
		console.log("models:", models);

		const job = jobs?.find((job) => job.jobId === jobId);
		// console.log("job to add models to:", job);
		setJobToUpdate(job.jobId);

		const modelsOnJob = job.models;
		const modelsOnJobEmails = modelsOnJob.map((model) => model.email);
		console.log("models on job:", modelsOnJob);

		setAvailableModels(
			models.filter((model) => !modelsOnJob.includes(model.email))
		);

		// adding models not on job to available models
		const newModels = models.filter((model) => {
			return !modelsOnJobEmails.includes(model.email);
		});

		const availableModelInfo = newModels.map(
			(model) => model.firstName + " " + model.lastName + " - " + model.email
		);
		return availableModelInfo;
	};

	const handleAddModelToJob = (jobId) => {
		console.log(jobId);
		setAvailableModels(findAvailableModels(jobId));
		console.log(availableModels);
		setShowDialog(true);
	};

	const handleDeleteJob = (id) => {
		setJobs(jobs.filter((job) => job.id !== id));
	};

	const handleJobAdded = (newJob) => {
		setJobs((prevJobs) => {
			return [
				...prevJobs,
				{
					id: uuid(),
					key: newJob.customer + newJob.comments + Math.random().toFixed(4),
					customer: newJob.customer,
					startDate: newJob.startDate,
					days: newJob.days,
					location: newJob.location,
					comments: newJob.comments,
				},
			];
		});
	};

	const openAddExpenseDialog = (id) => {
		console.log("id", id);
		setShowDialog(true);
		setJobToUpdate(id);
	};

	const handleAddExpense = (expense) => {
		console.log(expense);
		setShowDialog(false);

		expense = { ...expense, jobId: jobToUpdate };

		const success = createExpense(expense);
		console.log("success:", success);
		if (!success) return;
	};

	return (
		<React.Fragment>
			<Container
				component="main"
				sx={{
					...bodyContainer,
					flexDirection: "column",
					pt: 14,
					pb: 0,
					width: "100%",
				}}
			>
				<Typography variant="h3">
					{isManager ? "Manager " : "Model "}Dashboard
				</Typography>
				<Box
					flexWrap={"wrap"}
					sx={{
						...largeBoxStyle,
						mt: 4,
						maxWidth: "90%",
						"@media (max-width: 1404px)": {
							justifyContent: "center",
							maxWidth: "100%",
							p: 2,
						},
					}}
				>
					{isManager && <CreateJob onNewJob={handleJobAdded} />}
					<JobsList
						jobs={jobs}
						onDeleteJob={handleDeleteJob}
						onAddModel={handleAddModelToJob}
						onRemoveModel={handleRemoveModelFromJob}
						onAddExpense={openAddExpenseDialog}
					/>
					<ChangeJobDialog
						title={isManager ? "Add Model" : "Add Expense"}
						open={showDialog}
						onCancel={() => setShowDialog(false)}
						models={availableModels}
						onModelSelected={addModelToExistingJob}
						onAddExpense={handleAddExpense}
					/>
					{isManager && (
						<EmployeeList
							title={isManager ? "Employee List" : "Models"}
							models={models}
						/>
					)}
					{isManager && <ExpensesList expenses={expenses} models={models} />}
				</Box>
			</Container>
		</React.Fragment>
	);
};

export default Dashboard;
