import { Container, List, ListItem, Stack, Typography } from "@mui/material";
import React from "react";
import Job from "./Job";

const JobsList = (props) => {
	console.log("JobsList Props: ", props);

	const renderList = () => {
		console.log("renderList called : ", props.jobs);
		const jobs = props.jobs.map((job) => {
			return (
				<Job
					id={job.id}
					key={job.id}
					models={job.modelName}
					company={job.company}
					salary={job.salary}
					onDeleteJob={props.onDeleteJob}
					isHeader={false}
				/>
			);
		});
		return jobs;
	};

	return (
		<Container
			maxWidth="sm"
			sx={{
				display: "flex",
				flexDirection: "column",
				margin: 2,
				paddingTop: 2,
				paddingBottom: 3,
				paddingRight: 0,
				border: "2px solid rgba(160, 160, 160, 0.1)",
				borderRadius: 4,
				boxShadow: "0 0 13px rgba(255, 255, 255, 0.15)",
				backgroundColor: "rgba(255, 255, 255, 0.15)",
			}}
		>
			<Typography
				sx={{ display: "flex", justifyContent: "center" }}
				variant="h5"
			>
				Jobs Overview
			</Typography>
			<Job
				isHeader={true}
				models={["Models"]}
				company="Company"
				salary="Salary "
			/>

			{renderList()}
		</Container>
	);
};

export default JobsList;
