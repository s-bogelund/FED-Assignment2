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
	Tooltip,
	Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { readUsers, updateLocalUsers } from "../../data/handleLocalStorage";
import { containerStyle, hoverEffect } from "../styling";
import { v4 as uuid } from "uuid";
import { getAllModels, getModel } from "../../data/modelsFetching";

const nameHover = {
	...hoverEffect,
	"&:hover": {
		backgroundColor: "#f5f5f504",
	},
};

const EmployeeList = (props) => {
	const [models, setModels] = useState(props.models);
	const [hoverName, setHoverName] = useState("");
	const [hoverModel, setHoverModel] = useState("");

	// console.log(props);

	useEffect(() => {
		setModels(props.models);
		updateLocalUsers(props.models);
	}, [props.models]);

	useEffect(() => {
		const models = readUsers();
		// find the model with the same name as the one in the state
		if (hoverName.length < 1) return;
		const model = models?.find(
			(model) =>
				hoverName.includes(model.firstName) &&
				hoverName.includes(model.lastName)
		);

		const ignoredAttrs = [
			"firstname",
			"lastname",
			"addres",
			"email",
			"comments",
			"phoneno",
		];

		const printModelKeyValuePairs = (obj) => {
			//ugly - sorry
			let result = "";
			for (const [key, value] of Object.entries(obj)) {
				if (key.toString().toLowerCase().includes(ignoredAttrs[0])) continue;
				if (key.toString().toLowerCase().includes(ignoredAttrs[1])) continue;
				if (key.toString().toLowerCase().includes(ignoredAttrs[2])) continue;
				if (key.toString().toLowerCase().includes(ignoredAttrs[3])) continue;
				if (key.toString().toLowerCase().includes(ignoredAttrs[4])) continue;
				if (key.toString().toLowerCase().includes(ignoredAttrs[5])) continue;
				result += `${key}: ${value}`;
				result += ", ";
			}
			return <Typography variant="body2">{result}</Typography>;
		};

		setHoverModel(printModelKeyValuePairs(model));
	}, [hoverName]);

	const handleNameHover = (event) => {
		setHoverName(event.target.innerText);
	};

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
						<TableCell align="center">Comments</TableCell>
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
							<Tooltip placement="right" title={hoverModel}>
								<TableCell
									component="th"
									scope="row"
									sx={{ width: "10%", cursor: "pointer", ...nameHover }}
									onMouseEnter={handleNameHover}
								>
									{model.firstName + " " + model.lastName}
								</TableCell>
							</Tooltip>
							<TableCell align="center" sx={{ width: "10%" }}>
								{model.email}
							</TableCell>
							<TableCell align="center" sx={{ width: "10%" }}>
								{model.phoneNo}
							</TableCell>
							<TableCell align="center" sx={{ width: "10%" }}>
								{model.addresLine1}
							</TableCell>
							<TableCell align="center" sx={{ width: "25%" }}>
								{model.comments}
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</Container>
	);
};

export default EmployeeList;
