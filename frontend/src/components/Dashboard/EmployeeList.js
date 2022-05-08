import {
	Box,
	Container,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { getUsers } from "../../data/handleLocalStorage";
import { containerStyle } from "../styling";
import { v4 as uuid } from "uuid";

const EmployeeList = (props) => {
	const [models, setModels] = useState(props.models);

	useEffect(() => {
		console.log(props.models);
		setModels(props.models);
	}, [props.models]);

	return (
		<Container
			maxWidth="xxl"
			sx={{
				...containerStyle,
				flexDirection: "column",
			}}
		>
			<Box sx={{ display: "flex", justifyContent: "center" }}>
				<Typography variant="h5">{props.title}</Typography>
			</Box>
			<Table>
				<TableHead>
					<TableRow>
						<TableCell>Model Name</TableCell>
						<TableCell align="center">Email</TableCell>
						<TableCell align="center">Phone</TableCell>
						<TableCell align="center">Address</TableCell>
						<TableCell align="center">Role</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{models.map((model) => (
						<TableRow
							key={uuid()}
							sx={{
								"&:last-child td, &:last-child th": { border: 0 },
							}}
						>
							<TableCell component="th" scope="row" sx={{ width: "10%" }}>
								{model.name}
							</TableCell>
							<TableCell align="center" sx={{ width: "10%" }}>
								{model.email}
							</TableCell>
							<TableCell align="center" sx={{ width: "10%" }}>
								{model.phone}
							</TableCell>
							<TableCell align="center" sx={{ width: "10%" }}>
								{model.address}
							</TableCell>
							<TableCell align="center" sx={{ width: "10%" }}>
								{model.role}
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</Container>
	);
};

export default EmployeeList;
