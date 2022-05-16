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
import { getJobs } from "../data/jobFetching";
import ExpensesList from "../components/Dashboard/ExpensesList";
import { getExpenses } from "../data/expensesFetching";
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
		console.log("Dashboard jobs:", backendJobs);
		setJobs(backendJobs);
		updateLocalJobs(backendJobs);
	}

	async function fetchModels() {
		const models = await getAllModels();
		console.log("Dashboard models:", models);
		setModels(models);
	}

	async function fetchExpenses() {
		const expenses = await getExpenses();
		console.log("Dashboard expenses:", expenses);
		setExpenses(expenses);
	}

	useEffect(() => {
		async function getData() {
			if (!isManager) {
				setModels(readUsers("model"));
				console.log(readJobs());
				const jobs1 = await fetchJobs();
				console.log("jobs1", jobs1);
				const jobsList = jobs.filter((job) =>
					job.modelName.includes(readUser().name)
				);

				console.log("jobsList:", jobsList);
				if (jobsList) setJobs(jobsList);
			}

			if (isManager) {
				fetchJobs();
				fetchModels();
				fetchExpenses();
				// const users = readUsers();
				// const sortedUsers = (users) => {
				// 	const models = users.filter(
				// 		(user) => user.role.toLowerCase() === "model"
				// 	);
				// 	const managers = users.filter(
				// 		(user) => user.role.toLowerCase() === "manager"
				// 	);
				// 	return [...managers, ...models];
				// };
				// setJobs(readJobs());
			}
		}
		getData();
	}, []);

	useEffect(() => {
		updateLocalJobs(jobs);
	}, [jobs]);

	const addModelToExistingJob = (model) => {
		setShowDialog(false);

		const newJobs = jobs.map((job) => {
			if (job.id === jobToUpdate) {
				job.modelName.push(model);
			}
			return job;
		});

		setModels(readUsers());
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
		const job = jobs?.find((job) => job.id === jobId);
		setJobToUpdate(job.id);

		const availableModels = models.filter((model) => {
			return !job?.modelName?.includes(model?.name);
		});

		const availableModelNames = availableModels.map((model) => model.name);
		return availableModelNames;
	};

	const handleAddModelToJob = (jobId) => {
		setAvailableModels(findAvailableModels(jobId));
		setShowDialog(true);
	};

	const handleDeleteJob = (id) => {
		setJobs(jobs.filter((job) => job.id !== id));
	};

	const modelNames = (models) => {
		let names = [];
		models.forEach((model) => {
			names.push(model.name);
		});
		return names;
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

		const newJobs = jobs.map((job) => {
			if (job.id === jobToUpdate) {
				job.salary = +job.salary + +expense.expense;
			}
			return job;
		});
		setJobs(newJobs);
	};

	return (
		<React.Fragment>
			<Container
				component="main"
				sx={{ ...bodyContainer, flexDirection: "column", pt: 14, pb: 0 }}
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
					<EmployeeList
						title={isManager ? "Employee List" : "Models"}
						models={models}
					/>
					<ExpensesList expenses={expenses} models={models} />
				</Box>
			</Container>
		</React.Fragment>
	);
};

export default Dashboard;
