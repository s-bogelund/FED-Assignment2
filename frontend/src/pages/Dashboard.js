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
	getJobs,
	getUser,
	getUsers,
	updateJobs,
} from "../data/handleLocalStorage";
import AuthContext from "../store/auth-context";

const Dashboard = (props) => {
	const ctx = useContext(AuthContext);
	const [jobs, setJobs] = useState([]);
	const [usersToShow, setUsersToShow] = useState([]);
	const [showDialog, setShowDialog] = useState(false);
	const [availableModels, setAvailableModels] = useState([]);
	const [jobToUpdate, setJobToUpdate] = useState(null);
	const isManager = ctx.loginState.isManager;

	useEffect(() => {
		if (!isManager) {
			console.log("not a manager");
			setUsersToShow(getUsers("model"));
			console.log(getJobs());
			const jobs = getJobs();
			console.log("jobs", jobs);
			const jobsList = jobs.filter((job) =>
				job.modelName.includes(getUser().name)
			);

			console.log("jobsList:", jobsList);
			if (jobsList) setJobs(jobsList);
		}

		if (isManager) {
			const users = getUsers();
			const sortedUsers = (users) => {
				const models = users.filter(
					(user) => user.role.toLowerCase() === "model"
				);
				const managers = users.filter(
					(user) => user.role.toLowerCase() === "manager"
				);
				return [...managers, ...models];
			};
			setUsersToShow(sortedUsers(users));
			setJobs(getJobs());
		}
	}, []);

	useEffect(() => {
		updateJobs(jobs);
	}, [jobs]);

	const addModelToExistingJob = (model) => {
		setShowDialog(false);

		const newJobs = jobs.map((job) => {
			if (job.id === jobToUpdate) {
				job.modelName.push(model);
			}
			return job;
		});

		setUsersToShow(getUsers());
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

		const availableModels = usersToShow.filter((model) => {
			return !job.modelName.includes(model.name);
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
						models={usersToShow}
					/>
				</Box>
			</Container>
		</React.Fragment>
	);
};

export default Dashboard;
