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
	const renderJobList = () => {
		const jobs = props.jobs.map((job) => {
			return (
				<Job
					id={job.id}
					key={job.id}
					models={job.modelName}
					company={job.company}
					salary={job.salary}
					onDeleteJob={props.onDeleteJob}
					onAddModel={props.onAddModel}
					onRemoveModel={props.onRemoveModel}
				/>
			);
		});
		return jobs;
	};

	return (
		<Container
			maxWidth="lg"
			sx={{
				...containerStyle,
				paddingBottom: 4,
				paddingTop: 2,
				flexGrow: 0,
				width: "50%",
				minWidth: "580px",
			}}
		>
			<Typography
				sx={{ display: "flex", justifyContent: "center", marginBottom: 2 }}
				variant="h5"
			>
				Jobs Overview
			</Typography>
			<Box
				fullWidth
				sx={{
					display: "grid",
					gridTemplateColumns: "1.5fr 1.4fr .8fr .2fr",
				}}
			>
				<Typography sx={{ gridColumn: 1, placeSelf: "center" }} variant="h6">
					Models Assigned
				</Typography>
				<Typography
					sx={{ gridColumn: 2, placeSelf: "center", paddingLeft: "6%" }}
					variant="h6"
				>
					Company
				</Typography>
				<Typography sx={{ gridColumn: 3, placeSelf: "center" }} variant="h6">
					Pay
				</Typography>
			</Box>

			{renderJobList()}
		</Container>
	);
};

export default JobsList;
