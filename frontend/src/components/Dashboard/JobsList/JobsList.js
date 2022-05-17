import {
	Box,
	Container,
	List,
	ListItem,
	Stack,
	Typography,
} from "@mui/material";
import React from "react";
import { containerStyle } from "../../styling";
import Job from "./Job";

const JobsList = (props) => {
	// console.log("JobsList props:", props);
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
					gridTemplateColumns: "4% 15% 21% 29% 14% 10%",
				}}
			>
				<Typography sx={{ gridColumn: 1, placeSelf: "center" }} variant="h7">
					ID
				</Typography>
				<Typography sx={{ gridColumn: 2, placeSelf: "center" }} variant="h7">
					Customer
				</Typography>
				<Typography sx={{ gridColumn: 3, placeSelf: "center" }} variant="h7">
					Models Assigned
				</Typography>
				<Typography
					sx={{ gridColumn: 4, placeSelf: "center", pr: "5%" }}
					variant="h7"
				>
					Location
				</Typography>
				<Typography
					sx={{ gridColumn: 5, placeSelf: "start", paddingLeft: 3.2 }}
					variant="h7"
				>
					Days
				</Typography>
				<Typography
					sx={{ gridColumn: 6, placeSelf: "center", pr: 1 }}
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
