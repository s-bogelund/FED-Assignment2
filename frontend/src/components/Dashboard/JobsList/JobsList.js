import { Container, List, ListItem, Stack, Typography } from "@mui/material";
import React from "react";
import { containerStyle } from "../../styling";
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
			sx={{ ...containerStyle, paddingBottom: 4, paddingTop: 2 }}
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
