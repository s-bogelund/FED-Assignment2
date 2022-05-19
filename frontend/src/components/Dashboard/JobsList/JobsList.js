import {
	Box,
	Container,
	List,
	ListItem,
	Stack,
	Typography,
} from "@mui/material";
import React, { useContext } from "react";
import AuthContext from "../../../store/auth-context";
import { containerStyle } from "../../styling";
import Job from "./Job";

const JobsList = (props) => {
	const ctx = useContext(AuthContext);
	const isManager = ctx.loginState.isManager;
	const renderJobList = () => {
		const jobs = props.jobs.map((job) => {
			return (
				<Job
					jobId={job.jobId}
					key={job.jobId}
					models={job.models}
					customer={job.customer}
					startDate={job.startDate}
					days={job.days}
					location={job.location}
					comments={job.comments}
					onDeleteJob={props.onDeleteJob}
					onAddModel={props.onAddModel}
					onRemoveModel={props.onRemoveModel}
					onAddExpense={props.onAddExpense}
				/>
			);
		});
		return jobs;
	};

	const templateColumns = () => {
		if (isManager) {
			return "4% 15% 21% 29% 14% 10%";
		} else return "5% 10% 20% 20% 20% 20%";
	};

	return (
		<Container
			sx={{
				...containerStyle,
				paddingBottom: 4,
				paddingTop: 2,
				flexGrow: 1,
			}}
		>
			<Typography
				sx={{
					display: "flex",
					justifyContent: "center",
					mb: 5,
					mt: 2,
				}}
				variant="h5"
			>
				Jobs Overview
			</Typography>
			<Box
				fullWidth
				sx={{
					mb: 0,
					display: "grid",
					gridTemplateColumns: templateColumns(),
				}}
			>
				<Typography sx={{ gridColumn: 1, placeSelf: "center" }} variant="h7">
					ID
				</Typography>
				<Typography
					sx={{
						gridColumn: isManager ? 2 : "2 / span 2",
						placeSelf: "center",
						pr: !isManager ? 6 : 0,
					}}
					variant="h7"
				>
					Customer
				</Typography>
				{isManager && (
					<Typography sx={{ gridColumn: 3, placeSelf: "center" }} variant="h7">
						Models Assigned
					</Typography>
				)}
				<Typography
					sx={{
						gridColumn: 4,
						placeSelf: "center",
						pr: isManager ? "5%" : "35%",
					}}
					variant="h7"
				>
					Location
				</Typography>
				<Typography
					sx={{
						gridColumn: 5,
						placeSelf: "start",
						paddingLeft: isManager ? 3.2 : 4,
					}}
					variant="h7"
				>
					Days
				</Typography>
				<Typography
					sx={{ gridColumn: 6, placeSelf: "center", pr: isManager ? 1 : 4 }}
					variant="h7"
				>
					Comments
				</Typography>
			</Box>

			{renderJobList()}
		</Container>
	);
};

export default JobsList;
