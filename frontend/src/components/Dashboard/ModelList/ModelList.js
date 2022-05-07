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
import React from "react";
import { containerStyle } from "../../styling";

const ModelList = (props) => {
	// function createData(name, email, phone, address) {
	// 	return { name, email, phone, address };
	// }

	// const rows = props.models.map((model) => {
	// 	return createData(model.name, model.email, model.phone, model.address);
	// });

	return (
		<Container
			maxWidth="xxl"
			sx={{
				...containerStyle,
				flexDirection: "column",
			}}
		>
			<Box sx={{ display: "flex", justifyContent: "center" }}>
				<Typography variant="h5">Models</Typography>
			</Box>
			<Table>
				<TableHead>
					<TableRow>
						<TableCell>Model Name</TableCell>
						<TableCell align="center">Email</TableCell>
						<TableCell align="center">Phone</TableCell>
						<TableCell align="center">Address</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{props.models.map((model) => (
						<TableRow
							key={model.name}
							sx={{
								"&:last-child td, &:last-child th": { border: 0 },
							}}
						>
							<TableCell component="th" scope="row" sx={{ width: "25%" }}>
								{model.name}
							</TableCell>
							<TableCell align="center" sx={{ width: "25%" }}>
								{model.email}
							</TableCell>
							<TableCell align="center" sx={{ width: "25%" }}>
								{model.phone}
							</TableCell>
							<TableCell align="center" sx={{ width: "25%" }}>
								{model.address}
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</Container>
	);
};

export default ModelList;
