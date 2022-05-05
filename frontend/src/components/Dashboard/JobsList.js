import { Container, List, ListItem, Stack } from "@mui/material";
import React from "react";
import Job from "./Job";

const JobsList = () => {
	return (
		<Container maxWidth="xs">
			<Stack spacing={2} maxWidth="xs">
				<Job name="Simon Bøgelund" company="Microsoft" salary="12" />
			</Stack>
		</Container>
	);
};

export default JobsList;
